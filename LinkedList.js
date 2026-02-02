class Node {
  constructor(value) {
      this.value = value;
      this.next = null;
  }
}


class LinkedList {
  constructor() {
      this.head = null;
  }

  // Add a node to the end of the list
  addNode(value) {
      const newNode = new Node(value);

      if (!this.head) {
          this.head = newNode;
          return;
      }

      let curr = this.head;
      while (curr.next) {
          curr = curr.next;
      }
      curr.next = newNode;
  }

  // Remove all nodes with value > x
  removeNodes(x) {
      while (this.head && this.head.value > x) {
          this.head = this.head.next;
      }

      let curr = this.head;

      while (curr && curr.next) {
          if (curr.next.value > x) {
              curr.next = curr.next.next;
          } else {
              curr = curr.next;
          }
      }
  }

  // Print the linked list
  print() {
      let curr = this.head;
      let result = [];

      while (curr) {
          result.push(curr.value);
          curr = curr.next;
      }

      console.log(result.join(" "));
  }
}


function removeNodesGreaterThanX(head, x) {
  // Remove from head
  while (head && head.value > x) {
      head = head.next;
  }

  let curr = head;

  while (curr && curr.next) {
      if (curr.next.value > x) {
          curr.next = curr.next.next;
      } else {
          curr = curr.next;
      }
  }

  return head;
}



// Create linked list
const list = new LinkedList();

[10, 5, 12, 7, 3, 9, 10].forEach(v => list.addNode(v));

console.log("Original list:");
list.print();

// Remove nodes greater than 7
list.removeNodes(7);

console.log("After removing values > 7:");
list.print();


let head = new Node(10);
head.next = new Node(5);
head.next.next = new Node(12);
head.next.next.next = new Node(7);
head.next.next.next.next = new Node(3);
head.next.next.next.next.next = new Node(9);
head.next.next.next.next.next.next = new Node(10);

head = removeNodesGreaterThanX(head, 7);

console.log("Standalone function result:");
let curr = head;
let output = [];
while (curr) {
  output.push(curr.value);
  curr = curr.next;
}
console.log(output.join(" "));