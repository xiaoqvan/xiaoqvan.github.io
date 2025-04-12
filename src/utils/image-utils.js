/**
 * 处理图片路径，支持本地资源和网络资源
 * @param {string} imagePath 图片路径
 * @param {Record<string, any>} imageFiles 图片资源映射
 * @returns {string} 处理后的图片路径
 */
export function processImagePath(imagePath, imageFiles) {
  if (!imagePath) return ''

  // 如果是网络图片，直接返回
  if (imagePath.startsWith('http')) {
    return imagePath
  }

  // 如果是相对路径，需要处理
  if (imagePath.startsWith('./') || imagePath.startsWith('../')) {
    // 将 './assets/' 或 '../assets/' 转换为相对于 src 的路径
    const normalizedPath = imagePath.replace(/^\.\.\//g, '')

    // 查找匹配的图片资源
    const resourceKey = Object.keys(imageFiles).find((key) => {
      return key.includes(normalizedPath.replace('assets/', ''))
    })

    if (resourceKey && imageFiles[resourceKey].default) {
      return imageFiles[resourceKey].default
    }
  }

  return imagePath
}

/**
 * 处理 HTML 内容中的图片路径
 * @param {string} html HTML 内容
 * @param {Record<string, any>} imageFiles 图片资源映射
 * @returns {string} 处理后的 HTML 内容
 */
export function processHtmlImagePaths(html, imageFiles) {
  if (!html) return html

  // 处理 <img> 标签中的 src 属性
  return html.replace(/src="(\.\.\/assets\/[^"]+)"/g, (match, path) => {
    const processedPath = processImagePath(path, imageFiles)
    return `src="${processedPath}"`
  })
}

/**
 * 从 HTML 内容中提取第一张图片的路径
 * @param {string} html HTML 内容
 * @returns {string|null} 第一张图片的路径，如果没有则返回 null
 */
export function extractFirstImageFromHtml(html) {
  if (!html) return null

  // 使用正则表达式匹配第一个 <img> 标签的 src 属性
  const match = html.match(/<img[^>]+src="([^"]+)"/i)
  return match ? match[1] : null
}
