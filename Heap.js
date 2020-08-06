class MinHeap {
  constructor() {
    this.list = [];
  }
  insert(idx, priority) {
    this.list.push({ idx, value: priority });
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.length() - 1;
    while (index >= 1) {
      let element = this.list[index],
        parentIndex = Math.floor((index - 1) / 2),
        parent = this.list[parentIndex];
      if (this.list[parentIndex].value > this.list[index].value) {
        this.list[index] = parent;
        this.list[parentIndex] = element;
        index = parentIndex;
      } else {
        return;
      }
    }
  }
  extractMin() {
    if (this.length() == 0) {
      return null;
    }
    let min = this.list[0];
    if (this.length() > 1) {
      this.list[0] = this.list.pop();
      this.heapifyDown(0);
    } else {
      this.list = [];
    }
    return min;
  }

  heapifyDown(index) {
    let left = 2 * index + 1,
      right = 2 * index + 2,
      length = this.length(),
      smallest = index;

    if (left < length && this.list[left].value < this.list[smallest].value) {
      smallest = left;
    }
    if (right < length && this.list[right].value < this.list[smallest].value) {
      smallest = right;
    }

    if (smallest !== index) {
      let temp = this.list[smallest];
      this.list[smallest] = this.list[index];
      this.list[index] = temp;
      this.heapifyDown(smallest);
    }
  }
  length() {
    return this.list.length;
  }
  reset() {
    this.list = [];
  }
}
