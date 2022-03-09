/* eslint-disable no-param-reassign */
import { parse } from 'node-html-parser'

export default function parseYoutubeIframe(html) {
  let htmlParse
  const parseHtml = parse(html)
  const iframes = parseHtml.querySelectorAll('iframe')
  const youtube_parser = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
  }
  if (iframes && iframes.length) {
    // parseYoutubeIframe for lazy load
    Array.from(iframes).forEach(iframe => {
      const url = iframe.getAttribute('src')?.replace(/\/$/, '')
      const idYoutube = youtube_parser(url)
      const title = iframe.getAttribute('title')
      iframe.setAttribute(
        'srcdoc',
        `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;width: 100%;height: 100%;display: inline-flex;align-items: center;justify-content: center;background: rgba(0,0,0,0.3);}</style><a href=${url}?autoplay=1><img src=https://img.youtube.com/vi/${idYoutube}/hqdefault.jpg alt='${title}'><span>▶</span></a>`
      )
    })
    htmlParse = parseHtml.toString()
  }

  return htmlParse
}
