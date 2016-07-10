function StartRotateAnimation() {
  graph = cytoscape({
    container: $('#cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: defaultTreeStyle,

    elements: {
        nodes: [
          { data: { id: 'y' } },
          { data: { id: 'x', treepos: 'left' }, },
          { data: { id: 'A', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'B', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'C', treepos: 'right' }, classes: 'subtree' },
        ],

        edges: [
          { data: { id: 'yx', source: 'y', target: 'x' } },
          { data: { id: 'xA', source: 'x', target: 'A' } },
          { data: { id: 'xB', source: 'x', target: 'B' } },
          { data: { id: 'yC', source: 'y', target: 'C' } },
        ]
    },

    layout: {
      name: 'tree',
    }
  });

  function* rotations() {
    while (true) {
      yield* rotate(graph.$('#x').parentEdge());
      yield* rotate(graph.$('#y').parentEdge());
    }
  }
  animate(rotations());
}
