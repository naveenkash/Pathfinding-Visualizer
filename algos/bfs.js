function breadthFirstSearch(box) {
  //push node that is clicked
  queue.push(box);
  breadthFirstSearchUtil();
}

function breadthFirstSearchUtil() {
  let currentStartBox = queue.shift(),
    idx = getIndex(currentStartBox); // convert string number to number
  let checkForRightMost = (idx + 1) % length == 0,
    checkForLeftMost = idx % length == 0;
  if (endIdx == idx) {
    drawShortestPath();
    started = false;
    return;
  }
  if (currentStartBox != start && currentStartBox != end) {
    currentStartBox.classList.add("visited");
    currentStartBox.classList.add("animate");
    currentStartBox.style.animationDelay = `${delay}s`;
    currentStartBox.style.transitionDelay = `${delay}s`;
  }
  //check if left box exist and if already visied
  if (
    boxes[idx - 1] &&
    !visited[idx - 1] &&
    !checkForLeftMost &&
    !boxes[idx - 1].classList.contains("wall")
  ) {
    queue.push(boxes[idx - 1]);
    visited[idx - 1] = true;
    prev[idx - 1] = idx;
  }
  //check if right box exist and if already visied
  if (
    boxes[idx + 1] &&
    !visited[idx + 1] &&
    !checkForRightMost &&
    !boxes[idx + 1].classList.contains("wall")
  ) {
    queue.push(boxes[idx + 1]);
    visited[idx + 1] = true;
    prev[idx + 1] = idx;
  }
  //check if top box exist and if already visied
  if (
    boxes[idx - length] &&
    !visited[idx - length] &&
    !boxes[idx - length].classList.contains("wall")
  ) {
    queue.push(boxes[idx - length]);
    visited[idx - length] = true;
    prev[idx - length] = idx;
  }
  //check if bottom box exist and if already visied
  if (
    boxes[idx + length] &&
    !visited[idx + length] &&
    !boxes[idx + length].classList.contains("wall")
  ) {
    queue.push(boxes[idx + length]);
    visited[idx + length] = true;
    prev[idx + length] = idx;
  }
  if (!(endIdx == idx) && queue.length) {
    window.requestAnimationFrame(breadthFirstSearchUtil);
  } else {
    started = false;
  }
}
