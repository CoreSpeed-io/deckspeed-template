const fs = require("fs");
const path = require("path");

const metadataPath = path.join(process.cwd(), "src", "slides", "metadata.json");
const slidesDir = path.dirname(metadataPath);

// Define required fields for top-level and each slide
const topLevelRequiredFields = ["title", "description", "order"];
const slideRequiredFields = ["index", "title", "description", "filename"];

function lintMetadata() {
  if (!fs.existsSync(metadataPath)) {
    console.error("Error: metadata.json not found at", metadataPath);
    process.exit(1);
  }

  let metadata;
  try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  } catch (error) {
    console.error("Error: Invalid JSON format in metadata.json");
    process.exit(1);
  }

  let hasErrors = false;

  // Get all TSX files in the slides directory
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => file);

  // Create a set of all filenames referenced in metadata
  const referencedFiles = new Set();
  if (metadata.slides) {
    Object.values(metadata.slides).forEach(slide => {
      referencedFiles.add(slide.filename);
    });
  }

  // Check for TSX files that aren't referenced in metadata
  slideFiles.forEach(file => {
    if (!referencedFiles.has(file)) {
      console.error(`Error: TSX file "${file}" exists in slides directory but is not referenced in metadata.json`);
      hasErrors = true;
    }
  });

  // Validate top-level required fields
  topLevelRequiredFields.forEach((field) => {
    if (metadata[field] === undefined) {
      console.error(`Error: Missing required field "${field}"`);
      hasErrors = true;
    }
  });

  // Check that 'order' is an array
  if (!Array.isArray(metadata.order)) {
    console.error('Error: "order" should be an array');
    hasErrors = true;
  }

  // If slides exist, validate slide details and cross-check IDs between order and slides
  if (metadata.slides && typeof metadata.slides === "object") {
    // Validate that every slide ID in the order exists in the slides object
    metadata.order.forEach((slideId) => {
      if (!metadata.slides[slideId]) {
        console.error(`Error: Slide with id "${slideId}" not found in slides`);
        hasErrors = true;
      } else {
        slideRequiredFields.forEach((field) => {
          if (metadata.slides[slideId][field] === undefined) {
            console.error(
              `Error: Slide with id "${slideId}" is missing required field "${field}"`
            );
            hasErrors = true;
          }
        });

        // Validate that the file referenced in the slide exists.
        // We assume the file path is relative to the directory containing metadata.json.
        const slideFilePath = path.join(slidesDir, metadata.slides[slideId].filename);
        if (!fs.existsSync(slideFilePath)) {
          console.error(
            `Error: File "${metadata.slides[slideId].filename}" for slide "${slideId}" does not exist at ${slideFilePath}`
          );
          hasErrors = true;
        }
      }
    });

    // Validate that every slide in the slides object is referenced in the order array
    Object.keys(metadata.slides).forEach((slideId) => {
      if (!metadata.order.includes(slideId)) {
        console.error(`Error: Slide with id "${slideId}" is present in slides but not referenced in order`);
        hasErrors = true;
      }
    });
  } else if (metadata.order.length > 0) {
    // If there are slides referenced in order but no slides provided, that's an error.
    console.error("Error: 'order' is not empty but 'slides' is missing or invalid");
    hasErrors = true;
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log("metadata.json passed validation ✅");
  }
}

// Run the linter
lintMetadata();
