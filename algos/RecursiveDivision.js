class RecursiveMaze {
  constructor() {
    this.visited = [];
    this.boxes = boxes;
    console.log(grid);
    this.default();
  }
  start(node) {
    // requestAnimationFrame(() => {
    this.createMaze(node);
    // });
  }
  createMaze(node) {
    let idx = getIndex(node);
    let ranDir = this.generateRandomDirections();
    for (let i = 0; i < ranDir.length; i++) {
      let left = idx - 2,
        bottom = idx + length * 2,
        top = idx - length * 2,
        right = idx + 2;
      let checkForRightMost = grid[idx] && grid[idx].col + 2 > length,
        checkForLeftMost = grid[idx] && grid[idx].col - 2 < 1,
        checkForLastRow = grid[idx] && grid[idx].row + 2 > length,
        checkTopRow = grid[idx] && grid[idx].row - 2 < 1;

      this.visited[idx] = true;
      const dir = ranDir[i];

      // Up
      if (dir == 1) {
        if (!checkTopRow) {
          if (this.boxes[top].classList.contains("wall")) {
            this.boxes[top].classList.remove("wall");
            this.boxes[top + length].classList.remove("wall");
            this.createMaze(this.boxes[top]);
          }
        }
      }
      // Right
      if (dir == 2) {
        if (!checkForRightMost) {
          if (this.boxes[right].classList.contains("wall")) {
            this.boxes[right].classList.remove("wall");
            this.boxes[right - 1].classList.remove("wall");
            this.createMaze(this.boxes[right]);
          }
        }
      }
      // Down
      if (dir == 3) {
        if (!checkForLastRow) {
          if (this.boxes[bottom].classList.contains("wall")) {
            this.boxes[bottom].classList.remove("wall");
            this.boxes[bottom - length].classList.remove("wall");
            this.createMaze(this.boxes[bottom]);
          }
        }
      }
      // Left
      if (dir == 4) {
        if (!checkForLeftMost) {
          if (this.boxes[left].classList.contains("wall")) {
            this.boxes[left].classList.remove("wall");
            this.boxes[left + 1].classList.remove("wall");
            this.createMaze(this.boxes[left]);
          }
        }
      }
    }
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
  default() {
    for (let i = 0; i < this.boxes.length; i++) {
      let box = this.boxes[i];
      if (!box.classList.contains("start") || !box.classList.contains("end")) {
        box.classList.add("wall");
      }
      this.visited[i] = false;
    }
    document.querySelector(".end").classList.remove("wall");
  }
}
