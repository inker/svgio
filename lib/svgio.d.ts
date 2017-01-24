export declare function downloadSvgAsPicture(title: string, root: SVGSVGElement, format: string): void;
export declare function svgToPictureDataUrl(root: SVGSVGElement, format: string): Promise<string>;
export declare function svgToCanvas(root: SVGSVGElement): Promise<HTMLCanvasElement>;
export declare function svgToPicture(root: SVGSVGElement): Promise<HTMLImageElement>;
export declare function svgToImg(root: SVGSVGElement, appendExternalStyles?: boolean): HTMLImageElement;
export declare function svgToDataUrl(root: SVGSVGElement): string;
