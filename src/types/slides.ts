export interface SlideInfo {
  index: number;
  filename: string;
}

export interface SlideMapping {
  order: string[];
  slides: {
    [id: string]: SlideInfo;
  };
}
