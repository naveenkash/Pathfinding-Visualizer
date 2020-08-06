class DepthFirstSearch {
  constructor() {
    this.stack = [];
    this.found = false;
    this.visited = [];
    this.prev = [];
    this.tempArr = [];
  }
  start(startNode) {
    this.stack.push(startNode);
    this.loopDfs();
  }
  loopDfs() {
    if (this.stack.length > 0 && !this.found) {
      this.depthFirstSearchUtil(this.stack.pop());
      setTimeout(() => {
        this.loopDfs();
      }, 30);
    }
  }

  depthFirstSearchUtil(at) {
    let idx = getIndex(at);
    if (this.visited[idx] || this.found) {
      return;
    }
    this.visited[idx] = true;
    let checkForRightMost = (idx + 1) % length == 0,
      checkForLeftMost = idx % length == 0;

    if (endIdx == idx) {
      this.found = true;
      drawShortestPath(this.prev);
      started = false;
      return;
    }

    if (at != start && at != end) {
      at.classList.add("visited");
      at.classList.add("animate");
      at.style.animationDelay = `${delay}s`;
      at.style.transitionDelay = `${delay}s`;
    }

    //check for top box
    this.processNode(idx, idx - length);
    //check for right box
    if (!checkForRightMost) {
      this.processNode(idx, idx + 1);
    }
    //check for bottom box
    this.processNode(idx, idx + length);
    //check for left box
    if (!checkForLeftMost) {
      this.processNode(idx, idx - 1);
    }
    for (let i = this.tempArr.length - 1; i >= 0; i--) {
      if (!this.found) {
        const currentStartBox = this.tempArr[i];
        this.stack.push(currentStartBox);
      } else {
        started = false;
      }
    }
    this.tempArr = [];
  }

  processNode(parentIdx, idx) {
    if (
      boxes[idx] &&
      !this.visited[idx] &&
      !boxes[idx].classList.contains("wall")
    ) {
      this.tempArr.push(boxes[idx]);
      this.prev[idx] = parentIdx;
    }
  }

  default() {
    this.stack = [];
    this.tempArr = [];
    this.found = false;
    for (let i = 0; i < boxes.length; i++) {
      this.visited[i] = false;
      this.prev[i] = null;
    }
  }
}
