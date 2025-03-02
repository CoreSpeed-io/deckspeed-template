# CoreSpeed Deck Template

A Next.js-based slide deck template that provides a controlled environment for AI coding agents (like Cursor) to generate beautiful, web-based slide decks. Built with real-time preview capabilities and precise formatting controls, this template serves as the development foundation for DeckSpeed - the AI-powered presentation generator by CoreSpeed.

## Purpose

This template provides a structured environment where AI coding agents can develop slide decks with immediate visual feedback:

- Real-time preview of slides as they're generated
- Precise paper format controls with multiple size options
- Clean, predictable architecture for AI-driven development
- Standardized component patterns for consistent results
- Built-in iframe support for seamless integration
- Dynamic routing for multi-page presentations

## Features

- **Multiple Paper Formats**: Supports various standard sizes:
  - ISO (A3, A4, A5)
  - US (Letter, Legal, Tabloid)
  - Presentation (4:3)
  - Wide (16:9)
- **Orientation Control**: Switch between portrait and landscape
- **Responsive Scaling**: Automatically scales to fit any container while maintaining aspect ratio
- **Dynamic Routing**: Direct slide access via URL parameters (e.g., `/1`, `/2`, etc.)
- **AI-Friendly Architecture**: 
  - Clean, predictable structure for AI code generation
  - Standardized component patterns
  - Clear separation of concerns
  - Consistent styling approach
  - Real-time preview via iframe
  - Well-defined boundaries for AI modifications

## Development

### Prerequisites

- Node.js 18.18 or later
- pnpm (recommended) or npm

### Installation

1. Clone the template repository:
```bash
git clone https://github.com/CoreSpeed-io/deckspeed-template.git
cd deckspeed-template
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Main layout for the app
│   ├── page.tsx      # Root page wrapper
│   └── globals.css   # Global styles
├── components/
│   └── SlideLayout.tsx   # Multi-format slide component
├── slides/           # Directory containing all slide components
│   ├── 1.tsx        # First slide
│   ├── 2.tsx        # Second slide
│   └── ...          # Additional slides
└── middleware.ts     # Default page handling
```

## Integration

The template provides a complete development environment for AI-driven slide deck generation:

1. Use this template as the starting point for new deck generation
2. Follow the established component patterns in `src/components`
3. Preview changes in real-time through the built-in iframe support
4. Generate slides using the `SlideLayout` component for consistent formatting
5. Place all slides in the `src/slides` directory with clear naming

### Development Pattern
```tsx
// src/slides/1.tsx
export default function Slide() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Your Beautiful Slide</h1>
    </div>
  );
}
```

### Preview Integration
The template automatically provides preview capabilities through iframe embedding:

```html
<iframe 
  src="http://localhost:3000/{pageNumber}" 
  width="100%" 
  height="100%" 
  frameborder="0"
></iframe>
```

### Supported Paper Formats

| Format | Dimensions (mm) | Aspect Ratio |
|--------|----------------|--------------|
| A4 | 210 × 297 | ~1:1.414 |
| A3 | 297 × 420 | ~1:1.414 |
| A5 | 148 × 210 | ~1:1.414 |
| Letter | 215.9 × 279.4 | ~1:1.294 |
| Legal | 215.9 × 355.6 | ~1:1.647 |
| Tabloid | 279.4 × 431.8 | ~1:1.545 |
| Presentation | 254 × 190.5 | 4:3 |
| Wide | 320 × 180 | 16:9 |

## Technical Details

- Built with Next.js 15 App Router
- Uses Tailwind CSS for styling
- TypeScript for type safety
- Implements dynamic routing for slide navigation
- Supports multiple paper formats and orientations
- Optimized for iframe embedding

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Business Source License 1.1 (BSL).

See the [LICENSE](LICENSE) file for details.

## Related Projects

- [DeckSpeed](https://deckspeed.com) - The AI-powered presentation generator that embeds this template
- [CoreSpeed](https://corespeed.io) - The ultimate AI software delivery acceleration platform
