export default function getWebpImage(url, quality = 80) {
  if (!url) return ''
  if (url.includes('.svg')) {
    return url
  }
  return `${url}?q=${quality}&fm=webp`
}
