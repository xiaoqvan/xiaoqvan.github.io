/**
 * 处理文章中的图片路径
 * 支持本地路径和远程URL
 */
export function processImagePath(imagePath) {
  if (!imagePath) return ''

  // 如果是完整的URL，直接返回
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // 处理相对路径
  if (imagePath.startsWith('./')) {
    // 将路径转换为基于根目录的路径
    return new URL(`../..${imagePath.substring(1)}`, import.meta.url).href
  }

  // 可能是基于 public 目录的路径
  if (imagePath.startsWith('/')) {
    return imagePath
  }

  // 默认返回原路径
  return imagePath
}
