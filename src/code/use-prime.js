import dataTree from "data-tree";
import { uid } from "uid";

const usePrim = ({ init }) => {
  const parent = init.parent;
  let tree = [];

  const primMST = (graph) => {
    const result = primMSTImplementation(graph);
    tree.push({
      id: parent,
      name: "Main",
      parent: null,
      source: -1,
      destiny: -1,
      cost: -1,
    });
    result.forEach((element) => {
      element[2] = graph[element[0]][element[1]];
    });
    for (let i = 0; i < graph.length; i++) {
      const children = result.filter((element) => element[0] === i);
      children.forEach((element) => {
        tree.push({
          id: element[1],
          parent: element[0],
          source: element[0],
          destiny: element[1],
          cost: element[2],
        });
      });
    }
    // console.log(tree);
    return result;
  };

  const primMSTImplementation = (graph) => {
    const numVertices = graph.length;
    const visited = Array(numVertices).fill(false);
    const minimumSpanningTree = [];
    let currentNode = 0;
    visited[currentNode] = true;
    while (minimumSpanningTree.length < numVertices - 1) {
      let minWeight = Infinity;
      let nextNode = null;
      for (let i = 0; i < numVertices; i++) {
        if (visited[i]) {
          for (let j = 0; j < numVertices; j++) {
            if (!visited[j] && graph[i][j] !== 0 && graph[i][j] < minWeight) {
              minWeight = graph[i][j];
              nextNode = j;
            }
          }
        }
      }
      minimumSpanningTree.push([currentNode, nextNode]);
      visited[nextNode] = true;
      currentNode = nextNode;
    }
    return minimumSpanningTree;
  };

  const getTree = () => {
    if (tree.length === 0) {
      throw new Error(
        "The merge sort function must be called before get tree function!"
      );
    } else {
      return getTreeImplementation({ toParent, toChild }).export((data) => {
        return createExport(data);
      });
    }
  };

  const createExport = (data) => {
    return {
      name: `${data.values.name}`,
      attributes: {
        tag: `[${data.values.path}] = ${data.values.cost}`,
      },
    };
  };

  const toParent = (child) => {
    return {
      id: child.id,
      type: "Parent",
      name: `${child.source}`,
      path: `${child.source}-${child.destiny}`,
      cost: `${child.cost}`,
    };
  };

  const toChild = (child) => {
    return {
      id: child.id,
      type: "Child",
      name: `${child.source}`,
      path: `${child.source}-${child.destiny}`,
      cost: `${child.cost}`,
    };
  };

  const getTreeImplementation = ({ toParent, toChild }) => {
    let nowParent = parent;
    const oldParent = parent;
    let continueTree = true;
    let panicButton = 0;
    let dataTreeResult = dataTree.create();
    let finishAllLeaf = 1;
    let parentCollectors = [];
    while (continueTree) {
      const nowParentConst = nowParent;
      const children = tree.filter((t) => t.parent === nowParentConst);
      children.forEach((child) => {
        parentCollectors.push(child.id);
        if (child.parent === oldParent) {
          dataTreeResult.insert({
            key: child.id,
            values: toParent(child),
          });
        } else {
          dataTreeResult.insertTo((data) => data.key === nowParentConst, {
            key: child.id,
            values: toChild(child),
          });
        }
      });
      finishAllLeaf = finishAllLeaf + children.length;
      nowParent = parentCollectors.pop();
      if (finishAllLeaf === 0) continueTree = false;
      finishAllLeaf--;

      // Panic button to prevent infinite loop only on dev mode
      if (process.env.NODE_ENV === "development") {
        if (panicButton > 100) {
          console.warn("Panic button activate");
          continueTree = false;
        } else {
          panicButton++;
        }
      }
    }
    return dataTreeResult;
  };

  return {
    primMST,
    getTree,
  };
};

export { usePrim };
