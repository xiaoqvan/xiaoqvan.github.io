export function processImagePath(imagePath, imageFiles) {
  if (!imagePath) return ''

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  if (imagePath.startsWith('./assets/')) {
    const relativePath = imagePath.replace('./', '../../')
    try {
      const imageModule = imageFiles[relativePath]
      if (imageModule) {
        return imageModule.default
      }
    } catch (e) {
      console.error('Failed to load image:', relativePath)
    }
  }
  return imagePath
}
