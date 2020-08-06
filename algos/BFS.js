class BreadthFirstSearch {
  constructor() {
    this.queue = [];
    this.visited = [];
    this.prev = [];
  }
  start(start) {
    this.queue.push(getIndex(start));
    this.bfsUtil();
  }
  bfsUtil() {
    let idx = this.queue.shift(); // convert string number to number
    let currentStartBox = boxes[idx];
    let checkForRightMost = (idx + 1) % length == 0,
      checkForLeftMost = idx % length == 0;
    if (endIdx == idx) {
      drawShortestPath(this.prev);
      started = false;
      return;
    }
    if (currentStartBox != start && currentStartBox != end) {
      currentStartBox.classList.add("visited");
      currentStartBox.classList.add("animate");
      currentStartBox.style.animationDelay = `${delay}s`;
      currentStartBox.style.transitionDelay = `${delay}s`;
    }

    //check for left box
    if (!checkForLeftMost) {
      this.processNode(idx, idx - 1);
    }
    //check for right box
    if (!checkForRightMost) {
      this.processNode(idx, idx + 1);
    }
    //check for top box
    this.processNode(idx, idx - length);
    //check for bottom box
    this.processNode(idx, idx + length);

    if (!(endIdx == idx) && this.queue.length) {
      window.requestAnimationFrame(() => {
        this.bfsUtil();
      });
    } else {
      started = false;
    }
  }
  processNode(parentIdx, idx) {
    if (
      boxes[idx] &&
      !this.visited[idx] &&
      !boxes[idx].classList.contains("wall")
    ) {
      this.queue.push(idx);
      this.visited[idx] = true;
      this.prev[idx] = parentIdx;
    }
  }
  default() {
    for (let i = 0; i < boxes.length; i++) {
      this.visited[i] = false;
      this.prev[i] = null;
    }
    this.queue = [];
  }
}
