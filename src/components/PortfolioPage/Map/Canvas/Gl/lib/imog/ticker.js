class Ticker {
  constructor() {
    this._tickList = { default: [] };
    this._tickListFixed = { default: [] };
    this._labels = ['default'];
    this.remove = this.remove.bind(this);

    this._defineFunctions();
  }

  _defineFunctions() {
    const prefixes = ['ms', 'moz', 'webkit', 'o'];
    let i = prefixes.length;

    if (process.env.isNuxt && !process.client) return;
    while (--i > -1 && (typeof window !== `undefined`) && !window.requestAnimationFrame) {
      window.requestAnimationFrame =
        window[prefixes[i] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[prefixes[i] + 'CancelAnimationFrame'] ||
        window[prefixes[i] + 'CancelRequestAnimationFrame'];
    }

    let accum = 0;
    const fixedDt = 5;

    this._tickHandler = (ms) => {
      const dt = ms - this._lastMs;
      this._lastMs = ms;
      this._requestId = (typeof window !== `undefined` ) && window.requestAnimationFrame(this._tickHandler);
      const time = this.time;

      accum += dt;
      let i = 0;
      while (accum >= dt) {
        if (i >= 10) {
          accum = 0;
          break;
        }
        this._labels.forEach((label) => {
          this._tickListFixed[label].forEach((callback) =>
            callback(fixedDt / 1000)
          );
        });
        accum -= fixedDt;
        i++;
      }

      this._labels.forEach((label) => {
        this._tickList[label].forEach((callback) => callback(dt / 1000));
      });
    };
  }

  get time() {
    return performance.now();
  }

  _start() {
    if (process.env.isNuxt && !process.client) return;

    this.running = true;
    this._lastMs = this.time;
    this._requestId = (typeof window !== `undefined` ) && window.requestAnimationFrame(this._tickHandler);
  }

  _stop() {
    if (process.env.isNuxt && !process.client) return;

    this.running = false;
    window.cancelAnimationFrame(this._requestId);
  }

  add(callback, label = 'default') {
    if (!this.running) {
      this._start();
    }
    if (!this._tickList[label]) {
      console.warn('Label does not Exist');
      return;
    }
    this._tickList[label].push(callback);
  }

  addFixed(callback, label = 'default') {
    if (!this.running) {
      this._start();
    }
    if (!this._tickList[label]) {
      console.warn('Label does not Exist');
      return;
    }
    this._tickListFixed[label].push(callback);
  }

  remove(callback, label = 'default') {
    if (!this._tickList[label]) {
      console.warn('Label does not Exist');
      return;
    }
    const index = this._tickList[label].indexOf(callback);
    if (index >= 0) {
      this._tickList[label].splice(index, 1);
    }
  }

  removeFixed(callback, label = 'default') {
    if (!this._tickListFixed[label]) {
      console.warn('Label does not Exist');
      return;
    }
    const index = this._tickListFixed[label].indexOf(callback);
    if (index >= 0) {
      this._tickListFixed[label].splice(index, 1);
    }
  }

  once(callback, label = 'default') {
    const wrap = (time) => {
      callback(time);
      this.remove(wrap, label);
    };
    this.add(wrap, label);
  }

  addLabel(labelName) {
    if (this._tickList[labelName]) {
      console.warn('Label Already Exists');
      return;
    }
    this._labels.push(labelName);
    this._tickList[labelName] = [];
    this._tickListFixed[labelName] = [];
  }
}

export { Ticker };

const ticker = new Ticker();

export default ticker;
