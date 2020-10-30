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
    let idx = getIndex(node);
    let ranDir = this.generateRandomDirections();

    for (let i = 0; i < ranDir.length; i++) {
      let left = idx - 2,
        bottom = idx + length * 2,
        top = idx - length * 2,
        right = idx + 2,
        checkForRightMost = grid[idx].col + 2 > length,
        checkForLeftMost = grid[idx].col - 2 < 1,
        checkForLastRow = grid[idx].row + 2 > length,
        checkTopRow = grid[idx].row - 2 < 1;

      const dir = ranDir[i];

      // Up
      if (dir == 1) {
        if (!checkTopRow) {
          if (this.isBoxValid(top)) {
            this.boxes[top].classList.add("wall");
            this.boxes[top + length].classList.add("wall");
            await this.delayRecursiveCall(this.createMaze(this.boxes[top]));
          }
        }
      }

      // Right
      if (dir == 2) {
        if (!checkForRightMost) {
          if (this.isBoxValid(right)) {
            this.boxes[right].classList.add("wall");
            this.boxes[right - 1].classList.add("wall");
            await this.delayRecursiveCall(this.createMaze(this.boxes[right]));
          }
        }
      }

      // Down
      if (dir == 3) {
        if (!checkForLastRow) {
          if (this.isBoxValid(bottom)) {
            this.boxes[bottom].classList.add("wall");
            this.boxes[bottom - length].classList.add("wall");
            await this.delayRecursiveCall(this.createMaze(this.boxes[bottom]));
          }
        }
      }

      // Left
      if (dir == 4) {
        if (!checkForLeftMost) {
          if (this.isBoxValid(left)) {
            this.boxes[left].classList.add("wall");
            this.boxes[left + 1].classList.add("wall");
            await this.delayRecursiveCall(this.createMaze(this.boxes[left]));
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
      !this.boxes[index].classList.contains("wall")
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
