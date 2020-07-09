var started = false,
  visited = [],
  queue = [],
  length = 40,
  btn = document.querySelector(".start"),
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
  startIdx = 0;

for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  box.setAttribute("data-idx", i);
  if (i == 285) {
    startIdx = i;
    box.classList.add("s_node");
    box.setAttribute("draggable", true);
    start = box;
  }
  if (i == 1310) {
    endIdx = i;
    box.classList.add("e_node");
    box.setAttribute("draggable", true);
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

start.addEventListener("dragstart", function (event) {
  event.stopPropagation();
  if (event.target == this) {
    draggedStart = event.target;
  } else {
    draggedStart = event.target.parentNode;
  }
  whichNodeToMove = "start";
});

end.addEventListener("dragstart", function (event) {
  event.stopPropagation();
  if (event.target == this) {
    draggedEnd = event.target;
  } else {
    draggedEnd = event.target.parentNode;
  }
  whichNodeToMove = "end";
});

wrapper.addEventListener("dragover", function (event) {
  event.preventDefault();
});

wrapper.addEventListener("dragenter", function (event) {
  event.preventDefault();
  if (whichNodeToMove == "start") {
    if (
      !event.target.classList.contains("e_node") &&
      event.target.classList.contains("box") &&
      !event.target.classList.contains("s_node")
    ) {
      event.target.classList.add("s_node");
      currentStart = event.target; // the current element we are on
      draggedStart.classList.remove("s_node");
    }
  } else if (whichNodeToMove == "end") {
    if (
      !event.target.classList.contains("e_node") &&
      event.target.classList.contains("box") &&
      !event.target.classList.contains("s_node")
    ) {
      event.target.classList.add("e_node");
      currentEnd = event.target; // the current element we are on
      draggedEnd.classList.remove("e_node");
    }
  }
});

wrapper.addEventListener("dragleave", function (event) {
  event.preventDefault();
  setTimeout(() => {
    if (
      whichNodeToMove == "start" &&
      event.target != currentStart &&
      event.target != draggedStart
    ) {
      event.target.classList.remove("s_node");
    }
    if (
      whichNodeToMove == "end" &&
      event.target != currentEnd &&
      event.target != draggedEnd
    ) {
      event.target.classList.remove("e_node");
    }
  }, 20);
});

wrapper.addEventListener("drop", function (event) {
  event.preventDefault();
  event.stopPropagation();
  let node = event.target;

  if (
    whichNodeToMove == "start" &&
    !event.target.classList.contains("e_node")
  ) {
    node.classList.add("s_node");
    node.setAttribute("draggable", true);
    draggedStart.classList.remove("s_node");
    draggedStart.removeAttribute("draggable");
    draggedStart = node;
    start = node;
    let idx = parseInt(start.getAttribute("data-idx"));
    startIdx = idx;
    start.addEventListener("dragstart", function (event) {
      event.stopPropagation();
      if (event.target == this) {
        draggedStart = event.target;
      } else {
        draggedStart = event.target.parentNode;
      }
      whichNodeToMove = "start";
    });
  }

  if (whichNodeToMove == "end" && !event.target.classList.contains("s_node")) {
    node.classList.add("e_node");
    node.setAttribute("draggable", true);
    draggedEnd.classList.remove("e_node");
    draggedEnd.removeAttribute("draggable");
    draggedEnd = node;
    end = node;
    let idx = parseInt(end.getAttribute("data-idx"));
    endIdx = idx;
    end.addEventListener("dragstart", function (event) {
      event.stopPropagation();
      if (event.target == this) {
        draggedEnd = event.target;
      } else {
        draggedEnd = event.target.parentNode;
      }
      whichNodeToMove = "end";
    });
  }
});

btn.addEventListener("click", () => {
  if (!selected) {
    algoLabel.innerText = "Pick An Algorithm";
    return;
  }
  let algo = algoLabel.innerText;
  algorithms[whichAlgo](start);
});
