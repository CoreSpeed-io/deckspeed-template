// Standard paper sizes in millimeters
export const PAPER_SIZES = {
  "A4": { width: 210, height: 297 },
  "A3": { width: 297, height: 420 },
  "A5": { width: 148, height: 210 },
  "LETTER": { width: 215.9, height: 279.4 },
  "LEGAL": { width: 215.9, height: 355.6 },
  "TABLOID": { width: 279.4, height: 431.8 },
  "PRESENTATION": { width: 254, height: 190.5 }, // 4:3 aspect ratio
  "WIDE": { width: 320, height: 180 }, // 16:9 aspect ratio
} as const;

export type PaperSize = keyof typeof PAPER_SIZES;
export type Orientation = "portrait" | "landscape";

export interface SlideMetadata {
  title: string;
  description: string;
}

export interface DeckMetadata {
  title: string;
  description: string;
  author: string;
  paperSize: PaperSize;
  orientation: Orientation;
  order: {
    [id: string]: number;
  };
}
