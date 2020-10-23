class ZigZagMaze {
  constructor() {
    this.zigZagDepth = 7;
    this.index = length * this.zigZagDepth;
    this.length = boxes.length;
    this.boxes = boxes;
    this.pushDown = 41;
    this.pushUp = -39;
  }
  /**
   * Create zigzag pattern
   */
  async start() {
    while (this.index < this.length) {
      let currIdx = this.index,
        depth = this.zigZagDepth,
        goUpOrDown = 0,
        len = length,
        push = 0;
      const random = this.random(length);
      while (len--) {
        let timeToDelay = delay;
        await new Promise((resolve) => {
          const BOX_VALID =
            this.boxes[currIdx] &&
            !this.boxes[currIdx].classList.contains("end") &&
            !this.boxes[currIdx].classList.contains("start") &&
            !this.boxes[currIdx].classList.contains("wall");
          // Add wall if box is valid
          if (BOX_VALID) {
            // check if len is not same as random then add wall
            if (random !== len) {
              this.boxes[currIdx].classList.add("wall");
            }
          }
          if (depth == 1) {
            push = this.pushDown;
            goUpOrDown = 1;
          }
          if (depth == this.zigZagDepth) {
            push = this.pushUp;
            goUpOrDown = -1;
          }
          currIdx += push;
          depth += goUpOrDown;
          setTimeout(() => {
            resolve();
          }, timeToDelay);
        });
        timeToDelay += delay;
      }
      this.index += length * this.zigZagDepth;
    }
  }
  /**
   * return {number}
   */
  random(max) {
    return Math.floor(Math.random() * max);
  }
}
