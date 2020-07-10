let started = false,
  visited = [],
  queue = [],
  length = 40,
  btn = document.querySelector(".start_btn"),
  wrapper = document.querySelector(".box_wrapper"),
  delay = 0.01,
  prev = [],
  algoSelect = document.querySelector(".algo-info"),
  dropDownUl = document.querySelector(".dropdown ul"),
  dropDown = document.querySelector(".dropdown"),
  algoLabel = document.querySelector(".algo-info label"),
  dropDownItems = document.querySelectorAll(".dropdown ul li"),
  draggedStart = null,
  currentStart = null,
  draggedEnd = null,
  currentEnd = null,
  whichNodeToMove = null,
  algorithms = {
    bfs: function (start) {
      breadthFirstSearch(start);
    },
  },
  selected = false,
  whichAlgo = "";
// path = [];
function createBoxes() {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let box = document.createElement("div"),
        atr = document.createAttribute("class");
      atr.value = "box";
      box.setAttributeNode(atr);
      wrapper.appendChild(box);
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

var dragged = null;
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

  visited[i] = false;
  prev[i] = null;
}

let openDropDown = false;
document.addEventListener("click", function (event) {
  if (!dropDown.contains(event.target) && openDropDown) {
    openDropDown = !openDropDown;
    dropDownUl.style.display = "none";
    document.querySelector(".algo-info span").innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
});

algoSelect.addEventListener("click", function (e) {
  e.stopPropagation();
  openDropDown = !openDropDown;
  if (openDropDown) {
    dropDownUl.style.display = "block";
    document.querySelector(".algo-info span").innerHTML =
      '<i class="fas fa-chevron-up"></i>';
  } else {
    dropDownUl.style.display = "none";
    document.querySelector(".algo-info span").innerHTML =
      '<i class="fas fa-chevron-down"></i>';
  }
});

for (let j = 0; j < dropDownItems.length; j++) {
  const dropDownItem = dropDownItems[j];
  dropDownItem.addEventListener("click", function () {
    algoLabel.innerText = dropDownItem.innerText;
    selected = true;
    whichAlgo = dropDownItem.id;
  });
}

wrapper.addEventListener("mousedown", function (event) {
  event.preventDefault();
  event.stopPropagation();
  mouseDown = true;
  if (event.target.classList.contains("start")) {
    draggedStart = event.target;
    whichNodeToMove = "start";
  }
  if (event.target.classList.contains("end")) {
    draggedEnd = event.target;
    whichNodeToMove = "end";
  }
});

document.addEventListener("mousemove", function (event) {
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
});

wrapper.addEventListener("mouseover", function (event) {
  event.preventDefault();
  if (mouseDown) {
    if (whichNodeToMove == "start") {
      if (
        !event.target.classList.contains("end") &&
        !event.target.classList.contains("start") &&
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
        !event.target.classList.contains("wall")
      ) {
        event.target.classList.add("wall");
      } else if (event.target.classList.contains("wall")) {
        event.target.classList.remove("wall");
      }
    }
  }
});

wrapper.addEventListener("mouseup", function (event) {
  event.preventDefault();
  event.stopPropagation();
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
});

btn.addEventListener("click", () => {
  if (!selected) {
    algoLabel.innerText = "Pick An Algorithm";
    return;
  }
  started = true;
  algorithms[whichAlgo](start);
});
