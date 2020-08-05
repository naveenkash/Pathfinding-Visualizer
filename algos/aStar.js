var heap = minHeap();
function aStar(box) {
  heap.insert(box);
  let startIdx = getIndex(box);
  visited[startIdx] = true;
  distance[startIdx] = 1;
  aStarUtil();
}

function aStarUtil() {
  let minNode = heap.extractMin();
  let idx = getIndex(minNode);
  let checkForRightMost = (idx + 1) % length == 0,
    checkForLeftMost = idx % length == 0;

  if (endIdx == idx) {
    drawShortestPath();
    heap.reset();
    return;
  }
  if (minNode != start && minNode != end) {
    minNode.classList.add("visited");
    minNode.classList.add("animate");
    minNode.style.animationDelay = `${delay}s`;
    minNode.style.transitionDelay = `${delay}s`;
  }
  if (!checkForLeftMost) {
    processNode(idx, idx - 1, distance[idx]);
  }
  if (!checkForRightMost) {
    processNode(idx, idx + 1, distance[idx]);
  }
  if (boxes[idx - length]) {
    processNode(idx, idx - length, distance[idx]);
  }
  if (boxes[idx + length]) {
    processNode(idx, idx + length, distance[idx]);
  }

  if (!(endIdx == idx) && heap.length()) {
    window.requestAnimationFrame(aStarUtil);
  }
}

function processNode(prevIdx, idx, parentDistance) {
  if (boxes[idx] && !visited[idx] && !boxes[idx].classList.contains("wall")) {
    let heuristic =
      Math.abs(grid[idx].row - grid[endIdx].row) +
      Math.abs(grid[idx].col - grid[endIdx].col);
    let newDistance = 1 + parentDistance + heuristic;
    if (newDistance < distance[idx] + heuristic) {
      distance[idx] = newDistance;
      cost[idx] = heuristic; // cost should not be changed it is 1 always
      visited[idx] = true;
      prev[idx] = prevIdx;
      heap.insert(boxes[idx]);
    }
  }
}
