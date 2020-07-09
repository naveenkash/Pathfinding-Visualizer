function breadthFirstSearch(box) {
  let indx = box.getAttribute("data-idx"),
    idx = parseInt(indx);
  //push node that is clicked
  queue.push(boxes[idx]);
  breadthFirstSearchUtil();
}

function breadthFirstSearchUtil() {
  let currentStartBox = queue.shift(),
    indx = currentStartBox.getAttribute("data-idx"),
    idx = parseInt(indx); // convert string number to number
  let checkForRightMost = (idx + 1) % length == 0,
    checkForLeftMost = idx % length == 0;
  if (endIdx == idx) {
    for (let i = endIdx; i < prev.length; i = prev[i]) {
      if (i == startIdx) {
        return;
      }
      if (i != endIdx) {
        boxes[i].style.background = "yellow";
      }
      // path.push(i); // path we took get to end node and  reverse it to print
    }
    return;
  }
  if (currentStartBox != start && currentStartBox != end) {
    currentStartBox.style.background = `#cb6bff`;
  }
  currentStartBox.classList.add("animate");
  currentStartBox.style.animationDelay = `${delay}s`;
  currentStartBox.style.transitionDelay = `${delay}s`;

  //check if left box exist and if already visied
  if (boxes[idx - 1] && !visited[idx - 1] && !checkForLeftMost) {
    queue.push(boxes[idx - 1]);
    visited[idx - 1] = true;
    prev[idx - 1] = idx;
  }
  //check if right box exist and if already visied
  if (boxes[idx + 1] && !visited[idx + 1] && !checkForRightMost) {
    queue.push(boxes[idx + 1]);
    visited[idx + 1] = true;
    prev[idx + 1] = idx;
  }
  //check if top box exist and if already visied
  if (boxes[idx - length] && !visited[idx - length]) {
    queue.push(boxes[idx - length]);
    visited[idx - length] = true;
    prev[idx - length] = idx;
  }
  //check if bottom box exist and if already visied
  if (boxes[idx + length] && !visited[idx + length]) {
    queue.push(boxes[idx + length]);
    visited[idx + length] = true;
    prev[idx + length] = idx;
  }

  setTimeout(() => {
    if (!(endIdx == idx)) {
      breadthFirstSearchUtil();
    }
  }, delay);
}
