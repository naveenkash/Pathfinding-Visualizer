let stack = [];
let found = false;
function depthFirstSearch(box) {
  stack.push(box);
  loopDfs();
}

function loopDfs() {
  if (stack.length > 0 && !found) {
    depthFirstSearchUtil(stack.pop());
    setTimeout(() => {
      loopDfs();
    }, 30);
  }
}

function depthFirstSearchUtil(at) {
  let arr = [];
  let idx = getIndex(at);
  if (visited[idx] || found) {
    return;
  }
  visited[idx] = true;
  let checkForRightMost = (idx + 1) % length == 0,
    checkForLeftMost = idx % length == 0;

  if (endIdx == idx) {
    found = true;
    drawShortestPath();
    return;
  }

  if (at != start && at != end) {
    at.classList.add("visited");
    at.classList.add("animate");
    at.style.animationDelay = `${delay}s`;
    at.style.transitionDelay = `${delay}s`;
  }

  //check if top box exist and if already visied
  if (
    boxes[idx - length] &&
    !visited[idx - length] &&
    !boxes[idx - length].classList.contains("wall")
  ) {
    arr.push(boxes[idx - length]);
    prev[idx - length] = idx;
  }
  //check if right box exist and if already visied
  if (
    boxes[idx + 1] &&
    !visited[idx + 1] &&
    !checkForRightMost &&
    !boxes[idx + 1].classList.contains("wall")
  ) {
    arr.push(boxes[idx + 1]);
    prev[idx + 1] = idx;
  }
  //check if bottom box exist and if already visied
  if (
    boxes[idx + length] &&
    !visited[idx + length] &&
    !boxes[idx + length].classList.contains("wall")
  ) {
    arr.push(boxes[idx + length]);
    prev[idx + length] = idx;
  }
  //check if left box exist and if already visied
  if (
    boxes[idx - 1] &&
    !visited[idx - 1] &&
    !checkForLeftMost &&
    !boxes[idx - 1].classList.contains("wall")
  ) {
    arr.push(boxes[idx - 1]);
    prev[idx - 1] = idx;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (!found) {
      const currentStartBox = arr[i];
      stack.push(currentStartBox);
    }
  }
}
