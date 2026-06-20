# RBTree-Visualizer

RBTree-Visualizer is a web application that helps users understand how Red-Black Trees work. It provides a visual representation of tree insertions, balancing operations, rotations, and recoloring steps.

## Features

* Visualize Red-Black Tree insertions
* Automatic balancing after insertion
* Display left and right rotations
* Show recoloring operations
* Workflow panel explaining each step
* Upload a file containing multiple values
* Clear and reset the tree

## Technologies Used

* HTML
* CSS
* JavaScript
* D3.js

## How It Works

1. Enter a value and insert it into the tree.
2. The value is added following Binary Search Tree rules.
3. The application checks for Red-Black Tree violations.
4. Rotations and recoloring are applied when needed.
5. The updated tree and workflow steps are displayed.

## Usage

### Manual Insertion

* Enter a number in the input field.
* Click the Insert button.
* View the updated tree and workflow logs.

### File Upload

Create a text file containing space-separated numbers:

```text
10 20 30 15 25 5
```

Upload the file, and the values will be inserted automatically.

### Clear Tree

Click the Clear button to remove all nodes and workflow logs.

## Project Structure

```text
RBTree-Visualizer/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Example

Input:

```text
10 20 30
```

Output Operations:

```text
Insert 10
Root becomes black

Insert 20
No violation

Insert 30
Rotation performed
Tree balanced
```

## Future Improvements

* Delete operation visualization
* Search operation visualization
* Step-by-step animation controls
* Dark mode
* AVL Tree comparison

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/RBTree-Visualizer.git
```

Open `index.html` in any modern web browser.

## Author

Ashish Bharti
