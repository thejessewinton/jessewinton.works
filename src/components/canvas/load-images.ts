export interface CanvasImage {
  src: string
  width: number
  height: number
}

const loadImage = (src: string): Promise<CanvasImage> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () =>
      resolve({ src, width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = src
  })

export const loadImages = (paths: string[]): Promise<CanvasImage[]> =>
  Promise.all(paths.map(loadImage))
