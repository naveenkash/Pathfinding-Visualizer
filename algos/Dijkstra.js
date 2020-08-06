class Dijkstra {
  constructor() {
    this.visited = [];
    this.distance = [];
    this.prev = [];
    this.cost = [];
    this.heap = new MinHeap();
    this.default();
  }
  start(startNode) {
    let startIdx = getIndex(startNode);
    this.heap.insert(startIdx, 0);
    this.visited[startIdx] = true;
    this.distance[startIdx] = 1;
    this.dijkstraUtil();
  }
  dijkstraUtil() {
    let poppedNode = this.heap.extractMin();
    let minNode = boxes[poppedNode.idx];
    let idx = poppedNode.idx;
    if (this.distance[idx] >= this.cost[idx]) {
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
      if (!(endIdx == idx) && this.heap.length()) {
        window.requestAnimationFrame(() => {
          this.dijkstraUtil();
        });
      } else {
        started = false;
      }
    }
  }
  processNode(parentIdx, idx) {
    if (
      boxes[idx] &&
      !this.visited[idx] &&
      !boxes[idx].classList.contains("wall")
    ) {
      let newDistance = this.cost[idx] + this.distance[parentIdx];
      if (newDistance < this.distance[idx]) {
        this.distance[idx] = newDistance;
        this.cost[idx] = newDistance;
        this.visited[idx] = true;
        this.prev[idx] = parentIdx;
        this.heap.insert(idx, newDistance);
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
