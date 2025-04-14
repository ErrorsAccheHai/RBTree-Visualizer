const RED = 'red';
const BLACK = 'black';

class Node {
  constructor(value) {
    this.value = value;
    this.color = RED; // Newly inserted nodes are always red
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

let root = null;

// Adds step to workflow div
function logWorkflow(message) {
  const workflowDiv = document.getElementById('workflow');
  const newMessage = document.createElement('p');
  newMessage.textContent = message;
  workflowDiv.appendChild(newMessage);
  workflowDiv.scrollTop = workflowDiv.scrollHeight;  // Auto-scroll to latest message
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  
  logWorkflow(`Left rotation on node ${x.value}`);
}

function rotateRight(x) {
  const y = x.left;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;
  y.right = x;
  x.parent = y;
  
  logWorkflow(`Right rotation on node ${x.value}`);
}

function fixInsert(z) {
  logWorkflow(`Fixing insert for node ${z.value}`);
  
  while (z.parent && z.parent.color === RED) {
    const gp = z.parent.parent;
    if (z.parent === gp.left) {
      const y = gp.right;
      if (y && y.color === RED) {
        // Case 1: Recoloring (Uncle is red)
        z.parent.color = BLACK;
        y.color = BLACK;
        gp.color = RED;
        z = gp; // Push the violation up to the Grandparent
        logWorkflow(`Recoloring: Parent and Uncle are red. GP becomes red.`);
      } else {
        // Case 2: Rotation needed (Uncle is black or null)
        if (z === z.parent.right) {
          z = z.parent;
          rotateLeft(z);
          logWorkflow(`Left-Right case: Rotate left on node ${z.value}`);
        }
        z.parent.color = BLACK;
        gp.color = RED;
        rotateRight(gp);
        logWorkflow(`Left-Left or Right-Right case: Rotate right on node ${gp.value}`);
      }
    } else {
      const y = gp.left;
      if (y && y.color === RED) {
        // Case 1: Recoloring (Uncle is red)
        z.parent.color = BLACK;
        y.color = BLACK;
        gp.color = RED;
        z = gp;
        logWorkflow(`Recoloring: Parent and Uncle are red. GP becomes red.`);
      } else {
        // Case 2: Rotation needed (Uncle is black or null)
        if (z === z.parent.left) {
          z = z.parent;
          rotateRight(z);
          logWorkflow(`Right-Left case: Rotate right on node ${z.value}`);
        }
        z.parent.color = BLACK;
        gp.color = RED;
        rotateLeft(gp);
        logWorkflow(`Left-Left or Right-Right case: Rotate left on node ${gp.value}`);
      }
    }
  }
  root.color = BLACK;
  logWorkflow(`Root is always black.`);
}

function insert(value) {
  let z = new Node(value);
  let y = null;
  let x = root;
  
  // Standard BST insertion
  while (x) {
    y = x;
    if (z.value < x.value) x = x.left;
    else x = x.right;
  }
  
  z.parent = y;
  if (!y) root = z;  // Tree was empty, new node becomes root
  else if (z.value < y.value) y.left = z;
  else y.right = z;
  
  logWorkflow(`Inserted node with value: ${z.value} as a red node.`);
  fixInsert(z); // Fix any violations
  drawTree();
}

function insertValue() {
  const val = parseInt(document.getElementById('value').value);
  if (!isNaN(val)) {
    insert(val);
    document.getElementById('value').value = '';
  }
}

function clearTree() {
  root = null;
  document.getElementById("tree").innerHTML = '';
  document.getElementById('workflow').innerHTML = '';  // Clear workflow logs
}

function drawTree() {
  document.getElementById("tree").innerHTML = '';
  const margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#tree").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const treeLayout = d3.tree().size([width, height]);
  const rootData = d3.hierarchy(buildHierarchy(root));
  const treeData = treeLayout(rootData);

  const link = svg.selectAll(".link")
    .data(treeData.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y));

  const node = svg.selectAll(".node")
    .data(treeData.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  node.append("circle")
    .attr("r", 20)
    .attr("class", d => d.data.color);

  node.append("text")
    .attr("dy", 5)
    .text(d => d.data.value);
}

function buildHierarchy(node) {
  if (!node) return null;
  const result = { value: node.value, color: node.color, children: [] };
  if (node.left) result.children.push(buildHierarchy(node.left));
  if (node.right) result.children.push(buildHierarchy(node.right));
  return result;
}

// Handle file input
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const values = reader.result.trim().split(/\s+/).map(Number);
    values.forEach(v => insert(v));
    drawTree();
  };
  reader.readAsText(file);
});
