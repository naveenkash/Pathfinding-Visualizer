let length = 40,
  start_btn = document.querySelector(".start_btn"),
  clear_path = document.querySelector(".clear"),
  clear_board = document.querySelector(".clear_board"),
  wrapper = document.querySelector(".box_wrapper"),
  delay = 0.01,
  algoSelect = document.querySelector(".agi-info"),
  mazeSelect = document.querySelector(".maze-info"),
  dropDownUl = document.querySelector(".dropdown-algo ul"),
  dropDown = document.querySelector(".dropdown-algo"),
  mazeUl = document.querySelector(".dropdown-maze ul"),
  maze = document.querySelector(".dropdown-maze"),
  algoLabel = document.querySelector(".agi-info label"),
  mazeLabel = document.querySelector(".maze-info label"),
  dropDownItemsAlgo = document.querySelectorAll(".dropdown-algo ul li"),
  dropDownItemsMaze = document.querySelectorAll(".dropdown-maze ul li"),
  draggedStart = null,
  currentStart = null,
  draggedEnd = null,
  currentEnd = null,
  whichNodeToMove = null,
  algorithms = {
    bfs: function () {
      const breadth = new BreadthFirstSearch();
      breadth.start(start);
      currentAlgo["algo"] = breadth;
    },
    djs: function () {
      const dijk = new Dijkstra();
      dijk.start(start);
      currentAlgo["algo"] = dijk;
    },
    dfs: function () {
      const depth = new DepthFirstSearch();
      depth.start(start);
      currentAlgo["algo"] = depth;
    },
    astar: function () {
      const as = new AStar();
      as.start(start);
      currentAlgo["algo"] = as;
    },
  },
  selected = false,
  grid = [],
  whichAlgo = "",
  currentAlgo = {},
  path = [],
  started = false;
function createBoxes() {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let box = document.createElement("div"),
        atr = document.createAttribute("class");
      atr.value = "box";
      box.setAttributeNode(atr);
      wrapper.appendChild(box);
      grid.push({ row: i + 1, col: j + 1 });
    }
  }
}
createBoxes();

let boxes = document.querySelectorAll(".box"),
  start = null,
  end = null,
  endIdx = 0,
  startIdx = 0,
  mouseDown = false;

for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  box.setAttribute("data-idx", i);
  if (i == 285) {
    startIdx = i;
    box.classList.add("start");
    start = box;
  }
  if (i == 1310) {
    endIdx = i;
    box.classList.add("end");
    end = box;
  }
}

function getIndex(node) {
  return parseInt(node.getAttribute("data-idx"));
}

let openDropDown = false;
let openMaze = false;

document.addEventListener("click", function (event) {
  if (!dropDown.contains(event.target) && openDropDown) {
    openDropDown = !openDropDown;
    dropDownUl.style.display = "none";
    document.querySelector(".algo-info span").innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
  if (!maze.contains(event.target) && openMaze) {
    openMaze = !openMaze;
    mazeUl.style.display = "none";
    document.querySelector(".maze-info span").innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
});

algoSelect.addEventListener("click", function (e) {
  e.stopPropagation();
  openDropDown = !openDropDown;
  if (openDropDown) {
    dropDownUl.style.display = "block";
    document.querySelector(".agi-info span").innerHTML =
      '<i class="fas fa-chevron-up"></i>';
  } else {
    dropDownUl.style.display = "none";
    document.querySelector(".agi-info span").innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
});

mazeSelect.addEventListener("click", function (e) {
  openMaze = !openMaze;
  if (openMaze) {
    mazeUl.style.display = "block";
    document.querySelector(".maze-info span").innerHTML =
      '<i class="fas fa-chevron-up"></i>';
  } else {
    mazeUl.style.display = "none";
    document.querySelector(".maze-info span").innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
});

for (let j = 0; j < dropDownItemsAlgo.length; j++) {
  const dropDownItem = dropDownItemsAlgo[j];
  dropDownItem.addEventListener("click", function () {
    algoLabel.innerText = dropDownItem.innerText;
    selected = true;
    whichAlgo = dropDownItem.id;
  });
}

for (let j = 0; j < dropDownItemsMaze.length; j++) {
  const dropDownItem = dropDownItemsMaze[j];
  dropDownItem.addEventListener("click", function () {
    mazeLabel.innerText = dropDownItem.innerText;
    if (!started) {
      if (dropDownItem.id == "randome-maze") {
        reset();
        clearBoard();
        let rdm = createRandomNumber(100, boxes.length / 2);
        for (let i = 0; i < rdm; i++) {
          let rdmIdx = createRandomNumber(0, boxes.length - 1);
          if (boxes[rdmIdx] !== start && boxes[rdmIdx] !== end) {
            boxes[rdmIdx].classList.add("wall");
          }
        }
      }
    }
  });
}

function createRandomNumber(min, max) {
  return Math.floor(Math.floor(Math.random() * max) + min);
}

wrapper.addEventListener("mousedown", function (event) {
  event.preventDefault();
  event.stopPropagation();
  if (!started) {
    dragNodes();
    if (
      !event.target.classList.contains("start") &&
      !event.target.classList.contains("end") &&
      !event.target.classList.contains("wall") &&
      !event.target.contains(wrapper)
    ) {
      event.target.classList.add("wall");
    } else if (event.target.classList.contains("wall")) {
      event.target.classList.remove("wall");
    }
  }
});

document.addEventListener("mousemove", function (event) {
  if (!started) {
    setCurrentBoxIfMouseOutOfContainer();
  }
});

wrapper.addEventListener("mouseover", function (event) {
  event.preventDefault();
  if (!started) {
    moveNodesOnDrag();
  }
});

wrapper.addEventListener("mouseup", function (event) {
  event.preventDefault();
  event.stopPropagation();
  if (!started) {
    setNodeWhenMouseLifted();
  }
});

function setCurrentBoxIfMouseOutOfContainer() {
  if (mouseDown && event.target.contains(wrapper)) {
    mouseDown = false;
    // set current node to start if mouse move of wrapper while being pressed
    if (whichNodeToMove == "start") {
      let startNode = document.querySelector(".start");
      draggedStart = startNode;
      start = startNode;
      let idx = parseInt(startNode.getAttribute("data-idx"));
      startIdx = idx;
    } else if (whichNodeToMove == "end") {
      let endNode = document.querySelector(".end");
      draggedEnd = endNode;
      end = endNode;
      let idx2 = parseInt(endNode.getAttribute("data-idx"));
      endIdx = idx2;
    }
    whichNodeToMove = "";
  }
}

function dragNodes() {
  mouseDown = true;
  if (event.target.classList.contains("start")) {
    draggedStart = event.target;
    whichNodeToMove = "start";
  }
  if (event.target.classList.contains("end")) {
    draggedEnd = event.target;
    whichNodeToMove = "end";
  }
}

function setNodeWhenMouseLifted() {
  if (mouseDown) {
    let node = event.target;
    if (whichNodeToMove == "start") {
      if (!event.target.classList.contains("end")) {
        node.classList.add("start");
      }
      draggedStart = node;
      start = node;
      let idx = parseInt(start.getAttribute("data-idx"));
      startIdx = idx;
    }

    if (whichNodeToMove == "end") {
      if (!event.target.classList.contains("start")) {
        node.classList.add("end");
      }
      draggedEnd = node;
      end = node;
      let idx = parseInt(end.getAttribute("data-idx"));
      endIdx = idx;
    }
  }
  whichNodeToMove = "";
  mouseDown = false;
}

function moveNodesOnDrag() {
  if (mouseDown) {
    if (whichNodeToMove == "start") {
      if (
        !event.target.classList.contains("end") &&
        !event.target.classList.contains("start") &&
        !event.target.classList.contains("wall") &&
        event.target != currentStart &&
        event.target != wrapper
      ) {
        if (currentStart) {
          currentStart.classList.remove("start");
        }
        event.target.classList.add("start");
        currentStart = event.target; // the current element we are on
        draggedStart.classList.remove("start");
      }
    } else if (whichNodeToMove == "end") {
      if (
        !event.target.classList.contains("start") &&
        !event.target.classList.contains("end") &&
        !event.target.classList.contains("wall") &&
        event.target != currentEnd &&
        event.target != wrapper
      ) {
        if (currentEnd) {
          currentEnd.classList.remove("end");
        }
        event.target.classList.add("end");
        currentEnd = event.target; // the current element we are on
        draggedEnd.classList.remove("end");
      }
    } else {
      if (
        !event.target.classList.contains("start") &&
        !event.target.classList.contains("end") &&
        !event.target.classList.contains("wall") &&
        !event.target.contains(wrapper)
      ) {
        event.target.classList.add("wall");
      } else if (event.target.classList.contains("wall")) {
        event.target.classList.remove("wall");
      }
    }
  }
}

start_btn.addEventListener("click", () => {
  if (!selected) {
    algoLabel.innerText = "Pick An Algorithm";
    return;
  }
  if (started) return;
  if (currentAlgo.algo) reset();
  algorithms[whichAlgo](start);
  started = true;
});

clear_path.addEventListener("click", () => {
  if (!started) {
    if (currentAlgo.algo) reset();
  }
});
clear_board.addEventListener("click", () => {
  clearBoard();
});
function clearBoard() {
  if (!started) {
    if (currentAlgo.algo) reset();
    let walls = document.querySelectorAll(".box_wrapper .wall");
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      wall.classList.remove("wall");
    }
  }
}
function reset() {
  let visited_nodes = document.querySelectorAll(".box_wrapper .visited");
  let shortest_path = document.querySelectorAll(".box_wrapper .shortest_path");
  for (let i = 0; i < visited_nodes.length; i++) {
    let box = visited_nodes[i];
    removeStyle(box);
  }
  for (let i = 0; i < shortest_path.length; i++) {
    const box = shortest_path[i];
    removeStyle(box);
  }
  if (currentAlgo.algo) {
    currentAlgo.algo.default();
  }
  path = [];
  end.style.backgroundImage = "url(./assets/aim.svg)";
  started = false;
}

function removeStyle(box) {
  box.classList.remove("visited");
  box.classList.remove("shortest_path");
  box.classList.remove("animate");
  box.style = "";
}

function drawShortestPath(prev) {
  // print path when node found
  for (let i = endIdx; i < prev.length; i = prev[i]) {
    if (i == startIdx) {
      path.push(i);
      break;
    }
    path.push(i); // path we took get to end node and reverse it to print
  }
  path.reverse();
  loopPath();
  started = false;
}
function loopPath() {
  if (path.length > 0) {
    setTimeout(() => {
      const idx = path[0];
      boxes[idx].classList.add("shortest_path");
      path.shift();
      loopPath();
    }, 50);
  }
}
