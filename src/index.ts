import { downloadUrl } from 'download.js'

import optimizeSvg from './optimizeSvg'

export const downloadSvgAsPicture = (title: string, root: SVGSVGElement, format: string) =>
  svgToPictureDataUrl(root, format).then(dataURL => downloadUrl(title, dataURL))

export const svgToPictureDataUrl = (root: SVGSVGElement, format: string): Promise<string> =>
  svgToCanvas(root).then(canvas => canvas.toDataURL('image/' + format))

export function svgToDataUrl(root: SVGSVGElement): string {
  return `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(root))}`
}

export const svgToCanvas = (root: SVGSVGElement): Promise<HTMLCanvasElement> =>
  new Promise<HTMLCanvasElement>((resolve, reject) => {
    const img = svgToImg(root, true)
    img.onload = e => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const c2d = canvas.getContext('2d')
      if (!c2d) {
        return reject(new Error('2d context does not exist on canvas'))
      }
      c2d.drawImage(img, 0, 0)
      resolve(canvas)
    }
  })

export function svgToPicture(root: SVGSVGElement): Promise<HTMLImageElement> {
  const dataUrlPromise = svgToPictureDataUrl(root, 'png')
  const img = document.createElement('img')
  img.width = parseInt(root.getAttribute('width') || '') || parseInt(root.style.width || '')
  img.height = parseInt(root.getAttribute('height') || '') || parseInt(root.style.height || '')
  return dataUrlPromise.then(dataUrl => {
    img.src = dataUrl
    return img
  })
}

export function svgToImg(root: SVGSVGElement, appendExternalStyles = false): HTMLImageElement {
  if (appendExternalStyles) {
    root = optimizeSvg(root)
  }
  const img = document.createElement('img')
  img.width = parseInt(root.getAttribute('width') || '') || parseInt(root.style.width || '')
  img.height = parseInt(root.getAttribute('height') || '') || parseInt(root.style.height || '')
  img.src = svgToDataUrl(root)
  return img
}
