import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'

export default IMOG.Component('Cursor', {
  props() {
    return {
      hovering: false,
      grabbing: false,
      grabbable: false,
      computed: props => {
        if (props.grabbing) return 'grabbing'
        if (props.hovering) return 'pointer'
        if (props.grabbable) return 'grab'
        return 'default'
      },
    }
  },

  hooks: {
    'set:computed'(v) {
      this.$renderer.domElement.style.cursor = v
    },
  },
})
