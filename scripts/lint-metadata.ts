import * as fs from "node:fs";
import * as path from "node:path";
import Ajv from "ajv";
import type { ErrorObject } from "ajv";

interface DeckMetadata {
  title: string;
  description: string;
  author: string;
  paperSize: string;
  orientation: string;
  order: {
    [key: string]: number;
  };
}

const slidesDir = path.join(process.cwd(), "src", "slides");
const metadataPath = path.join(slidesDir, "metadata.json");
const schemaPath = path.join(process.cwd(), "scripts", "metadata.schema.json");

function printError(message: string, details?: string) {
  console.error(`❌ ${message}${details ? `\n   ${details}` : ""}`);
}

function lintMetadata(): void {
  const errors: string[] = [];

  // Check if metadata.json exists
  if (!fs.existsSync(metadataPath)) {
    printError("metadata.json not found", `Expected location: ${metadataPath}`);
    process.exit(1);
  }

  // Check if schema file exists
  if (!fs.existsSync(schemaPath)) {
    printError(
      "metadata.schema.json not found",
      `Expected location: ${schemaPath}`,
    );
    process.exit(1);
  }

  // Parse metadata.json
  let metadata: DeckMetadata;
  try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  } catch (error) {
    printError(
      "Invalid JSON format in metadata.json",
      (error as Error).message,
    );
    process.exit(1);
  }

  // Parse schema
  let schema: object;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  } catch (error) {
    printError(
      "Invalid JSON format in metadata.schema.json",
      (error as Error).message,
    );
    process.exit(1);
  }

  try {
    // Validate against schema
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(metadata);

    if (!valid && validate.errors) {
      validate.errors.forEach((error: ErrorObject) => {
        errors.push(`${error.instancePath} ${error.message}`);
      });
    }

    // Get all TSX files in the slides directory
    const slideFiles = fs.readdirSync(slidesDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file);

    // Additional validation for slide files
    const slideIds = Object.keys(metadata.order || {});

    // Check that each slide ID has a corresponding TSX file
    slideIds.forEach((slideId) => {
      const expectedFilename = `${slideId}.tsx`;
      if (!slideFiles.includes(expectedFilename)) {
        errors.push(
          `Slide with ID "${slideId}" does not have a corresponding file "${expectedFilename}"`,
        );
      }
    });

    // Check for TSX files that aren't referenced in metadata
    slideFiles.forEach((file: string) => {
      // Skip metadata.schema.json
      if (file === "metadata.schema.json") return;

      const slideId = file.replace(".tsx", "");
      if (!slideIds.includes(slideId)) {
        errors.push(
          `TSX file "${file}" exists in slides directory but is not referenced in metadata.json`,
        );
      }
    });

    // Report results
    if (errors.length > 0) {
      console.error("\n🔍 Found issues in metadata.json:");
      errors.forEach((error) => printError(error));
      process.exit(1);
    } else {
      console.log("✅ Deckspeed metadata validation passed");
    }
  } catch (error) {
    printError(
      "An unexpected error occurred while validating metadata.json",
      (error as Error).message,
    );
    process.exit(1);
  }
}

// Run the linter
lintMetadata();
