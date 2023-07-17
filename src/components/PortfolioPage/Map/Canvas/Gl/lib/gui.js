import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'

import { Pane } from 'tweakpane'
const pane = new Pane()

pane.element.parentElement.style.zIndex = 10

IMOG.inject('gui', pane)
