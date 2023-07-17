# Docs

```js
const canvas = new Canvas({
  options: {
    domElement: canvasWrapper.current,
    handleReady: () => {
      console.log('Canvas Loaded')
    },
    handleHotspotFocus: ({ name }) => {
      console.log('Canvas hotspot focus', { name })
    },
    handleHotspotUnfocus: () => {
      console.log('Canvas hotspot unfocus')
    },
  },
})

canvas.start() // goes from intro state to interactive map
canvas.enable() // enables interactions in the map
canvas.disable() // disables interactions in the map
canvas.pauseRendering() // pauses the rendering of the webgl renderer
canvas.resumeRendering() // resumes the rendering of the webgl renderer

canvas.focusHotspot({ name: 'Bridge' }) // goes to focus mode: centers hotspot in map + fades out the rest of the map

canvas.getActiveHotspotPinPosition() // => {x, y} position in pixels from center of screen
```
