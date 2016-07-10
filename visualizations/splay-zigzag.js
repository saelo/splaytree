function StartSplayZigZagAnimation() {
  var graph = cytoscape({
    container: $('#cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: defaultTreeStyle,

    elements: {
        nodes: [
          { data: { id: 'g' } },
          { data: { id: 'f', treepos: 'left' }, },
          { data: { id: 'e', treepos: 'right' }, },
          { data: { id: 'd', treepos: 'left' }, },
          { data: { id: 'c', treepos: 'right' }, },
          { data: { id: 'b', treepos: 'left' }, },
          { data: { id: 'a', treepos: 'right' }, },
          { data: { id: 'A', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'B', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'C', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'D', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'E', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'F', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'G', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'H', treepos: 'right' }, classes: 'subtree' },
        ],

        edges: [
          { data: { id: 'gf', source: 'g', target: 'f' } },
          { data: { id: 'fe', source: 'f', target: 'e' } },
          { data: { id: 'ed', source: 'e', target: 'd' } },
          { data: { id: 'dc', source: 'd', target: 'c' } },
          { data: { id: 'cb', source: 'c', target: 'b' } },
          { data: { id: 'ba', source: 'b', target: 'a' } },
          { data: { id: 'fA', source: 'f', target: 'A' } },
          { data: { id: 'dB', source: 'd', target: 'B' } },
          { data: { id: 'bC', source: 'b', target: 'C' } },
          { data: { id: 'aD', source: 'a', target: 'D' } },
          { data: { id: 'aE', source: 'a', target: 'E' } },
          { data: { id: 'cF', source: 'c', target: 'F' } },
          { data: { id: 'eG', source: 'e', target: 'G' } },
          { data: { id: 'gH', source: 'g', target: 'H' } },
        ]
    },

    layout: {
      name: 'tree',
    }
  });

  animate(splay(graph.$('#a')));
}
