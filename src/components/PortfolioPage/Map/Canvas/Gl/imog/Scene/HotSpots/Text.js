import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import * as THREE from 'three'
import { Text } from 'troika-three-text'

export default IMOG.Component('Text', {
  options: {
    addTo: '',
  },
  props() {
    return {
      value: 'Text',
    }
  },

  setup({ options }) {
    this.text = new Text()
    this.text.color = 0xffffff
    this.text.material.depthTest = false
    this.text.renderOrder = 9999
    this.text.strokeColor = 0x000000
    this.text.letterSpacing = -0.2
    this.text.strokeWidth = '3%'
    this.text.textAlign = 'center'
    this.text.anchorX = 'center'
    this.text.font =
      'https://fonts.cdnfonts.com/s/100430/PPAir-BlackMono-BF64a4d4815de9f.woff'
    if (options.addTo) options.addTo.add(this.text)
  },

  hooks: {
    'set:value'(v) {
      this.text.text = v
      this.text.sync()
    },
  },
})
