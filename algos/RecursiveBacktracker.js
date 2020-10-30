class RecursiveBacktracker {
  constructor() {
    this.boxes = boxes;
    this.delay = 0;
    this.backtrackerDelay = 0.015;
  }
  async start(node) {
    started = true;
    await this.delayRecursiveCall(this.createMaze(node));
    started = false;
  }
  async createMaze(node) {
    const idx = getIndex(node),
      ranDir = this.generateRandomDirections();

    for (let i = 0; i < ranDir.length; i++) {
      const twoNodeLeft = idx - 2,
        twoNodeBottom = idx + length * 2,
        twoNodeTop = idx - length * 2,
        twoNodeRight = idx + 2,
        checkForRightMost = grid[idx].col + 2 > length,
        checkForLeftMost = grid[idx].col - 2 < 1,
        checkForLastRow = grid[idx].row + 2 > length,
        checkTopRow = grid[idx].row - 2 < 1;

      const dir = ranDir[i],
        oneNodeTop = twoNodeTop + length,
        oneNodeRight = twoNodeRight - 1,
        oneNodeBottom = twoNodeBottom - length,
        oneNodeLeft = twoNodeLeft + 1;

      // Up
      if (dir == 1) {
        if (!checkTopRow) {
          if (this.isBoxValid(twoNodeTop)) {
            this.boxes[twoNodeTop].classList.add("wall");
            this.isBoxValid([oneNodeTop])
              ? this.boxes[oneNodeTop].classList.add("wall")
              : "";
            await this.delayRecursiveCall(
              this.createMaze(this.boxes[twoNodeTop])
            );
          }
        }
      }

      // Right
      if (dir == 2) {
        if (!checkForRightMost) {
          if (this.isBoxValid(twoNodeRight)) {
            this.boxes[twoNodeRight].classList.add("wall");
            this.isBoxValid([oneNodeRight])
              ? this.boxes[oneNodeRight].classList.add("wall")
              : "";
            await this.delayRecursiveCall(
              this.createMaze(this.boxes[twoNodeRight])
            );
          }
        }
      }

      // Down
      if (dir == 3) {
        if (!checkForLastRow) {
          if (this.isBoxValid(twoNodeBottom)) {
            this.boxes[twoNodeBottom].classList.add("wall");
            this.isBoxValid([oneNodeBottom])
              ? this.boxes[oneNodeBottom].classList.add("wall")
              : "";
            await this.delayRecursiveCall(
              this.createMaze(this.boxes[twoNodeBottom])
            );
          }
        }
      }

      // Left
      if (dir == 4) {
        if (!checkForLeftMost) {
          if (this.isBoxValid(twoNodeLeft)) {
            this.boxes[twoNodeLeft].classList.add("wall");
            this.isBoxValid(oneNodeLeft)
              ? this.boxes[oneNodeLeft].classList.add("wall")
              : "";
            await this.delayRecursiveCall(
              this.createMaze(this.boxes[twoNodeLeft])
            );
          }
        }
      }
    }
  }

  /**
   * Delay the recursive call to visualize algorithms slowly
   */
  async delayRecursiveCall(cb) {
    await new Promise(async (resolve) => {
      await cb;
      setTimeout(() => {
        resolve();
      }, this.delay);
    });
    this.delay += this.backtrackerDelay;
  }

  /**
   * Check if wall is valid to go
   * @return Boolean
   */
  isBoxValid(index) {
    return (
      !this.boxes[index].classList.contains("wall") &&
      !this.boxes[index].classList.contains("start") &&
      !this.boxes[index].classList.contains("end")
    );
  }

  /**
   * Generate an array with random directions 1-4
   * @return Array containing 4 directions in random order
   */
  generateRandomDirections() {
    let randoms = [];
    for (let i = 0; i < 4; i++) {
      randoms.push(i + 1);
    }
    return this.shuffle(randoms);
  }

  /**
   * Shuffle array
   * @return Shuffled array
   */
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
