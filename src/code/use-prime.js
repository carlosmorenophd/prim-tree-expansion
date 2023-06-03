const usePrim = () => {
  const primMST = (graph) => {
    const result = primMSTImplementation(graph);
    console.log(result);
    result.forEach((element) => {
      element[2] = graph[element[0]][element[1]];
    });
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

  return {
    primMST,
  };
};

export { usePrim };
