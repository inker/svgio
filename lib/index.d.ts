export declare const downloadSvgAsPicture: (title: string, root: SVGSVGElement, format: string) => Promise<void>;
export declare const svgToPictureDataUrl: (root: SVGSVGElement, format: string) => Promise<string>;
export declare function svgToDataUrl(root: SVGSVGElement): string;
export declare const svgToCanvas: (root: SVGSVGElement) => Promise<HTMLCanvasElement>;
export declare function svgToPicture(root: SVGSVGElement): Promise<HTMLImageElement>;
export declare function svgToImg(root: SVGSVGElement, appendExternalStyles?: boolean): HTMLImageElement;
