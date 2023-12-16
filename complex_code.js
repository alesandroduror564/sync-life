/* filename: complex_code.js */

// This code is an implementation of a complex data structure called Red-Black Tree.
// It involves various operations like insertion, deletion, searching, and traversal.

class Node {
  constructor(key, value, color) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = color;
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  // Rotate Node left
  rotateLeft(node) {
    const rightChild = node.right;
    node.right = rightChild.left;

    if (rightChild.left)
      rightChild.left.parent = node;

    rightChild.parent = node.parent;

    if (!node.parent)
      this.root = rightChild;
    else if (node === node.parent.left)
      node.parent.left = rightChild;
    else
      node.parent.right = rightChild;

    rightChild.left = node;
    node.parent = rightChild;
  }

  // Rotate Node right
  rotateRight(node) {
    const leftChild = node.left;
    node.left = leftChild.right;

    if (leftChild.right)
      leftChild.right.parent = node;

    leftChild.parent = node.parent;

    if (!node.parent)
      this.root = leftChild;
    else if (node === node.parent.left)
      node.parent.left = leftChild;
    else
      node.parent.right = leftChild;

    leftChild.right = node;
    node.parent = leftChild;
  }

  // Insert a new node into the tree
  insert(key, value) {
    const newNode = new Node(key, value, "red");

    if (!this.root) {
      this.root = newNode;
      newNode.color = "black";
      return;
    }

    let current = this.root;
    while (current) {
      if (key < current.key) {
        if (current.left)
          current = current.left;
        else {
          current.left = newNode;
          newNode.parent = current;
          break;
        }
      } else if (key > current.key) {
        if (current.right)
          current = current.right;
        else {
          current.right = newNode;
          newNode.parent = current;
          break;
        }
      } else {
        current.value = value;
        return;
      }
    }

    this.fixViolations(newNode);
  }

  // Fix violations after insertion
  fixViolations(node) {
    while (node.parent && node.parent.color === "red") {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;
        if (uncle && uncle.color === "red") {
          node.parent.color = "black";
          uncle.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.rotateLeft(node);
          }
          node.parent.color = "black";
          node.parent.parent.color = "red";
          this.rotateRight(node.parent.parent);
        }
      } else {
        const uncle = node.parent.parent.left;
        if (uncle && uncle.color === "red") {
          node.parent.color = "black";
          uncle.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }
          node.parent.color = "black";
          node.parent.parent.color = "red";
          this.rotateLeft(node.parent.parent);
        }
      }
    }

    this.root.color = "black";
  }

  // Find the node with given key
  find(key) {
    let current = this.root;
    while (current) {
      if (key < current.key)
        current = current.left;
      else if (key > current.key)
        current = current.right;
      else
        return current.value;
    }
    return null;
  }

  // Delete the node with given key
  delete(key) {
    let node = this.root;
    while (node) {
      if (key < node.key)
        node = node.left;
      else if (key > node.key)
        node = node.right;
      else
        break;
    }

    if (!node)
      return;

    if (!node.left || !node.right) {
      const child = node.left || node.right;

      if (!node.parent) {
        this.root = child;
        if (child)
          child.parent = null;
      } else {
        if (node === node.parent.left)
          node.parent.left = child;
        else
          node.parent.right = child;

        if (child)
          child.parent = node.parent;
      }

      if (node.color === "black")
        this.deleteFixup(child, node.parent);
    } else {
      const successor = this.minimum(node.right);
      node.key = successor.key;
      node.value = successor.value;
      this.delete(successor.key);
    }
  }

  // Fix violations after deletion
  deleteFixup(node, parent) {
    while (node !== this.root && (!node || node.color === "black")) {
      if (node === parent.left) {
        let sibling = parent.right;
        if (sibling.color === "red") {
          sibling.color = "black";
          parent.color = "red";
          this.rotateLeft(parent);
          sibling = parent.right;
        }

        if ((!sibling.left || sibling.left.color === "black") &&
          (!sibling.right || sibling.right.color === "black")) {
          sibling.color = "red";
          node = parent;
          parent = node.parent;
        } else {
          if (!sibling.right || sibling.right.color === "black") {
            sibling.left.color = "black";
            sibling.color = "red";
            this.rotateRight(sibling);
            sibling = parent.right;
          }
          sibling.color = parent.color;
          parent.color = "black";
          sibling.right.color = "black";
          this.rotateLeft(parent);
          node = this.root;
          break;
        }
      } else {
        let sibling = parent.left;
        if (sibling.color === "red") {
          sibling.color = "black";
          parent.color = "red";
          this.rotateRight(parent);
          sibling = parent.left;
        }

        if ((!sibling.left || sibling.left.color === "black") &&
          (!sibling.right || sibling.right.color === "black")) {
          sibling.color = "red";
          node = parent;
          parent = node.parent;
        } else {
          if (!sibling.left || sibling.left.color === "black") {
            sibling.right.color = "black";
            sibling.color = "red";
            this.rotateLeft(sibling);
            sibling = parent.left;
          }
          sibling.color = parent.color;
          parent.color = "black";
          sibling.left.color = "black";
          this.rotateRight(parent);
          node = this.root;
          break;
        }
      }
    }

    if (node)
      node.color = "black";
  }

  // Get the minimum node in the subtree
  minimum(node) {
    let current = node;
    while (current.left)
      current = current.left;
    return current;
  }

  // Inorder traversal of the tree
  inorderTraversal(node) {
    if (!node)
      return;

    this.inorderTraversal(node.left);
    console.log(node.value);
    this.inorderTraversal(node.right);
  }

  // Preorder traversal of the tree
  preorderTraversal(node) {
    if (!node)
      return;

    console.log(node.value);
    this.preorderTraversal(node.left);
    this.preorderTraversal(node.right);
  }

  // Postorder traversal of the tree
  postorderTraversal(node) {
    if (!node)
      return;

    this.postorderTraversal(node.left);
    this.postorderTraversal(node.right);
    console.log(node.value);
  }
}

// Create a new Red-Black Tree
const rbt = new RedBlackTree();

// Insert some values into the tree
rbt.insert(50, "Hello");
rbt.insert(30, "World");
rbt.insert(20, "I");
rbt.insert(40, "am");
rbt.insert(70, "a");
rbt.insert(60, "complex");
rbt.insert(80, "Red-Black");
rbt.insert(35, "Tree");

// Print the inorder traversal of the tree
console.log("Inorder Traversal:");
rbt.inorderTraversal(rbt.root);

// Print the preorder traversal of the tree
console.log("Preorder Traversal:");
rbt.preorderTraversal(rbt.root);

// Print the postorder traversal of the tree
console.log("Postorder Traversal:");
rbt.postorderTraversal(rbt.root);

// Find a node in the tree
console.log("Find 40:", rbt.find(40));

// Delete a node from the tree
rbt.delete(40);

// Print the inorder traversal again after deletion
console.log("Inorder Traversal after Deletion:");
rbt.inorderTraversal(rbt.root);