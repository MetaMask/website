import { gsap } from 'gsap'
import { lerp, distance } from './helpers'

export default class Magnetic {
  constructor({ el }) {
    ;['onMouseLeave', 'onMouseMove', 'onResize', 'onTick'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })

    this.el = el

    // this.el.parentNode.style.border = '1px solid red'

    this.data = {
      tx: { previous: 0, current: 0, amt: 0.1 },
      ty: { previous: 0, current: 0, amt: 0.1 },
    }

    this.state = {
      hover: false,
    }

    this.offsetX = 0
    this.offsetY = 0

    this.el.addEventListener('mouseleave', this.onMouseLeave)
    this.el.addEventListener('mousemove', this.onMouseMove)

    window.addEventListener('resize', this.onResize)
    this.onResize()

    gsap.ticker.add(this.onTick)
  }

  destroy() {
    gsap.ticker.remove(this.onTick)
    window.removeEventListener('resize', this.onResize)
    this.el.removeEventListener('mouseleave', this.onMouseLeave)
    this.el.removeEventListener('mousemove', this.onMouseMove)
  }

  onResize() {
    this.rect = {
      top: this.el.offsetTop,
      left: this.el.offsetLeft,
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
    }
    this.distance = this.el.offsetWidth / 2
  }

  onMouseMove(e) {
    this.offsetX = e.offsetX
    this.offsetY = e.offsetY
  }

  onMouseLeave() {
    this.offsetX = 0
    this.offsetY = 0
  }

  onTick() {
    const dist = distance(
      {
        x: this.offsetX,
        y: this.offsetY,
      },
      {
        x: this.rect.width / 2,
        y: this.rect.height / 2,
      }
    )

    let x = 0
    let y = 0

    if (dist < this.distance) {
      !this.el.classList.contains('magnetic') &&
        this.el.classList.add('magnetic')
      x = (this.offsetX - this.rect.width / 2) * 0.7
      y = (this.offsetY - this.rect.height / 2) * 0.7
    } else {
      this.el.classList.contains('magnetic') &&
        this.el.classList.remove('magnetic')
    }

    this.data.tx.current = x
    this.data.ty.current = y

    for (const key in this.data) {
      this.data[key].previous = lerp(
        this.data[key].previous,
        this.data[key].current,
        this.data[key].amt
      )
    }
    this.el.style.transform = `translate3d(${this.data.tx.previous}px, ${this.data.ty.previous}px, 0)`
  }
}
