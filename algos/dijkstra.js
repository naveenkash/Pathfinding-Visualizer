var heap = new MinHeap();
function dijkstra(start) {
  let startIdx = getIndex(start);
  heap.insert(startIdx, 0);
  visited[startIdx] = true;
  distance[startIdx] = 1;
  dijkstraUtil();
}

function dijkstraUtil() {
  let poppedNode = heap.extractMin();
  let minNode = boxes[poppedNode.idx];
  let idx = poppedNode.idx;
  if (distance[idx] >= cost[idx]) {
    let checkForRightMost = (idx + 1) % length == 0,
      checkForLeftMost = idx % length == 0;
    if (endIdx == idx) {
      drawShortestPath();
      heap.reset();
      started = false;
      return;
    }

    if (minNode != start && minNode != end) {
      minNode.classList.add("visited");
      minNode.classList.add("animate");
      minNode.style.animationDelay = `${delay}s`;
      minNode.style.transitionDelay = `${delay}s`;
    }

    //check if left box exist and if already visited
    if (
      boxes[idx - 1] &&
      !visited[idx - 1] &&
      !checkForLeftMost &&
      !boxes[idx - 1].classList.contains("wall")
    ) {
      let newDistance = cost[idx - 1] + distance[idx];
      if (newDistance < distance[idx - 1]) {
        distance[idx - 1] = newDistance;
        cost[idx - 1] = newDistance;
        visited[idx - 1] = true;
        prev[idx - 1] = idx;
        heap.insert(idx - 1, newDistance);
      }
    }
    //check if right box exist and if already visited
    if (
      boxes[idx + 1] &&
      !visited[idx + 1] &&
      !checkForRightMost &&
      !boxes[idx + 1].classList.contains("wall")
    ) {
      let newDistance = cost[idx + 1] + distance[idx];
      if (newDistance < distance[idx + 1]) {
        cost[idx + 1] = newDistance;
        distance[idx + 1] = newDistance;
        visited[idx + 1] = true;
        prev[idx + 1] = idx;
        heap.insert(idx + 1, newDistance);
      }
    }
    //check if top box exist and if already visited
    if (
      boxes[idx - length] &&
      !visited[idx - length] &&
      !boxes[idx - length].classList.contains("wall")
    ) {
      let newDistance = cost[idx - length] + distance[idx];
      if (newDistance < distance[idx - length]) {
        cost[idx - length] = newDistance;
        distance[idx - length] = newDistance;
        visited[idx - length] = true;
        prev[idx - length] = idx;
        heap.insert(idx - length, newDistance);
      }
    }
    //check if bottom box exist and if already visited
    if (
      boxes[idx + length] &&
      !visited[idx + length] &&
      !boxes[idx + length].classList.contains("wall")
    ) {
      let newDistance = cost[idx + length] + distance[idx];
      if (newDistance < distance[idx + length]) {
        cost[idx + length] = newDistance;
        distance[idx + length] = newDistance;
        visited[idx + length] = true;
        prev[idx + length] = idx;
        heap.insert(idx + length, newDistance);
      }
    }

    if (!(endIdx == idx) && heap.length()) {
      window.requestAnimationFrame(dijkstraUtil);
    } else {
      started = false;
    }
  }
}
