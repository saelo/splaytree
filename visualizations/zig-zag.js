function StartZigZagAnimation() {
  var graph = cytoscape({
    container: $('#cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: defaultTreeStyle,

    elements: {
        nodes: [
          { data: { id: 'z' } },
          { data: { id: 'y', treepos: 'left' } },
          { data: { id: 'x', treepos: 'right' }, },
          { data: { id: 'A', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'B', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'C', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'D', treepos: 'right' }, classes: 'subtree' },
        ],

        edges: [
          { data: { id: 'zy', source: 'z', target: 'y' } },
          { data: { id: 'yx', source: 'y', target: 'x' } },
          { data: { id: 'yA', source: 'y', target: 'A' } },
          { data: { id: 'xB', source: 'x', target: 'B' } },
          { data: { id: 'xC', source: 'x', target: 'C' } },
          { data: { id: 'zD', source: 'z', target: 'D' } },
        ]
    },

    layout: {
      name: 'tree',
    }
  });

  animate(zigzag(graph.$('#x')));
}
