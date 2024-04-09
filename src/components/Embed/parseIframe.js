/* eslint-disable no-param-reassign */
import { parse } from 'node-html-parser'

export default function parseYoutubeIframe(
  html,
  playOnPopup,
  imageIframe,
  hidePlayerIcon
) {
  let htmlParse
  let iframeList = []
  const parseHtml = parse(html)
  const iframes = parseHtml.querySelectorAll('iframe')
  const youtube_parser = url => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : false
  }
  if (iframes && iframes.length) {
    // parseYoutubeIframe for lazy load
    Array.from(iframes).forEach((iframe, index) => {
      const url = iframe.getAttribute('src')?.replace(/\/$/, '')
      const idYoutube = youtube_parser(url)
      const title = iframe.getAttribute('title')
      const iframeBg =
        imageIframe || `https://i.ytimg.com/vi_webp/${idYoutube}/sddefault.webp`
      if (playOnPopup) {
        iframeList.push(iframe)
        const itemPopup = `<div data-id="${index}" class="embed-popup-target ${
          hidePlayerIcon ? 'hide-player-icon' : ''
        }"><span class="embed-popup-target-overlay"><span class="embed-popup-target-icon"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="28" viewBox="0 0 23 28" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.976562 13.7469V25.0549C0.976562 26.6431 2.73876 27.5977 4.0691 26.7301L21.4079 15.4222C22.6178 14.6331 22.6178 12.8608 21.4079 12.0717L4.0691 0.763819C2.73876 -0.103793 0.976562 0.850786 0.976562 2.43904V13.7469Z" fill="white"/>
        </svg></span></span><img src=${iframeBg} alt='${title}'></div>`
        iframe.replaceWith(itemPopup)

        return
      }
      iframe.setAttribute(
        'srcdoc',
        `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}span.icon-play{width: 60px;height:60px;display: inline-flex;align-items:center;justify-content:center;background:#037DD6;border-radius: 100%}img,span.overlay{position:absolute;width:100%;top:0;bottom:0;margin:auto}span.overlay{text-align:center;font:48px/1.5 sans-serif;color:white;width: 100%;height: 100%;display: inline-flex;align-items: center;justify-content: center;background: rgba(0,0,0,0.5);transition: background 300ms ease;}span:hover{background: rgba(0,0,0,0.3)!important;}</style><a href=${url}?autoplay=1><img src=${iframeBg} alt='${title}'><span class="overlay"><span class="icon-play"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="28" viewBox="0 0 23 28" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.976562 13.7469V25.0549C0.976562 26.6431 2.73876 27.5977 4.0691 26.7301L21.4079 15.4222C22.6178 14.6331 22.6178 12.8608 21.4079 12.0717L4.0691 0.763819C2.73876 -0.103793 0.976562 0.850786 0.976562 2.43904V13.7469Z" fill="white"/>
        </svg></span></span></a>`
      )
    })
    htmlParse = parseHtml.toString()
  }

  return { htmlString: htmlParse, iframeList }
}
