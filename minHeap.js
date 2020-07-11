function minHeap() {
  var minheap = [];
  var newObj = {
    minheap: minheap,
  };

  function insert(value) {
    minheap.push(value);
    heapifyUp();
  }

  function heapifyUp() {
    let index = minheap.length - 1;
    while (index >= 0) {
      let element = minheap[index],
        idx = getIndex(element),
        parentIndex = Math.floor(index / 2),
        parent = minheap[parentIndex],
        parentIdx = getIndex(parent);
      if (cost[parentIdx] <= cost[idx]) return;
      minheap[index] = parent;
      minheap[parentIndex] = element;
      index = parentIndex;
    }
  }

  function extractMin() {
    if (length() == 0) {
      return null;
    }
    let min = minheap[0];
    if (length() >= 1) {
      minheap[0] = minheap.pop();
      heapifyDown(0);
    } else {
      minheap = [];
    }
    return min;
  }

  function heapifyDown(index) {
    let left = 2 * index + 1,
      right = 2 * index + 2,
      length = minheap.length,
      smallest = index;

    if (
      left < length &&
      cost[getIndex(minheap[left])] < cost[getIndex(minheap[smallest])]
    ) {
      smallest = left;
    }
    if (
      right < length &&
      cost[getIndex(minheap[right])] < cost[getIndex(minheap[smallest])]
    ) {
      smallest = right;
    }

    if (smallest !== index) {
      let temp = minheap[smallest];
      minheap[smallest] = minheap[index];
      minheap[index] = temp;
      heapifyDown(smallest);
    }
  }

  function length() {
    return minheap.length;
  }

  function reset() {
    minheap = [];
  }
  newObj.length = length;
  newObj.insert = insert;
  newObj.extractMin = extractMin;
  newObj.reset = reset;

  return newObj;
}
