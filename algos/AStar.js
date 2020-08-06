// var this.heap = new Minthis.heap();
class AStar {
  constructor() {
    this.visited = [];
    this.distance = [];
    this.cost = [];
    this.prev = [];
    this.heap = new MinHeap();
    this.default();
  }
  start(startNode) {
    let startIdx = getIndex(startNode);
    this.heap.insert(startIdx, 0);
    this.visited[startIdx] = true;
    this.distance[startIdx] = 1;
    this.aStarUtil();
  }
  aStarUtil() {
    let poppedMinNode = this.heap.extractMin();
    let minNode = boxes[poppedMinNode.idx];
    let idx = poppedMinNode.idx;
    let checkForRightMost = (idx + 1) % length == 0,
      checkForLeftMost = idx % length == 0;

    if (endIdx == idx) {
      drawShortestPath(this.prev);
      this.heap.reset();
      started = false;
      return;
    }
    if (minNode != start && minNode != end) {
      minNode.classList.add("visited");
      minNode.classList.add("animate");
      minNode.style.animationDelay = `${delay}s`;
      minNode.style.transitionDelay = `${delay}s`;
    }
    //check for left box
    if (!checkForLeftMost) {
      this.processNode(idx, idx - 1, this.distance[idx]);
    }
    //check for right box
    if (!checkForRightMost) {
      this.processNode(idx, idx + 1, this.distance[idx]);
    }
    //check for top box
    this.processNode(idx, idx - length, this.distance[idx]);
    //check for bottom box
    this.processNode(idx, idx + length, this.distance[idx]);
    if (!(endIdx == idx) && this.heap.length() > 0) {
      window.requestAnimationFrame(() => {
        this.aStarUtil();
      });
    } else {
      started = false;
    }
  }
  processNode(parentIdx, idx, parentdistance) {
    if (
      boxes[idx] &&
      !this.visited[idx] &&
      !boxes[idx].classList.contains("wall")
    ) {
      let heuristic =
        Math.abs(grid[idx].row - grid[endIdx].row) +
        Math.abs(grid[idx].col - grid[endIdx].col);
      let newdistance = 1 + parentdistance + heuristic;
      if (newdistance < this.distance[idx] + heuristic) {
        this.distance[idx] = newdistance - heuristic;
        this.cost[idx] = heuristic; // cost should not be changed it is 1 always
        this.visited[idx] = true;
        this.prev[idx] = parentIdx;
        this.heap.insert(idx, heuristic);
      }
    }
  }
  default() {
    for (let i = 0; i < boxes.length; i++) {
      this.visited[i] = false;
      this.distance[i] = Infinity;
      this.cost[i] = 1;
      this.prev[i] = null;
    }
  }
}
