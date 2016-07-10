function StartMoveToRoot2Animation() {
  var graph = cytoscape({
    container: $('#cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: defaultTreeStyle,

    elements: {
        nodes: [
          { data: { id: 'g' } },
          { data: { id: 'f', treepos: 'left' }, },
          { data: { id: 'e', treepos: 'left' }, },
          { data: { id: 'd', treepos: 'left' }, },
          { data: { id: 'c', treepos: 'left' }, },
          { data: { id: 'b', treepos: 'left' }, },
          { data: { id: 'a', treepos: 'left' }, },
          { data: { id: 'A', treepos: 'left' }, classes: 'subtree' },
          { data: { id: 'B', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'C', treepos: 'right' }, classes: 'subtree' },
          { data: { id: 'D', treepos: 'right' }, classes: 'subtree' },
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
          { data: { id: 'aA', source: 'a', target: 'A' } },
          { data: { id: 'aB', source: 'a', target: 'B' } },
          { data: { id: 'bC', source: 'b', target: 'C' } },
          { data: { id: 'cD', source: 'c', target: 'D' } },
          { data: { id: 'dE', source: 'd', target: 'E' } },
          { data: { id: 'eF', source: 'e', target: 'F' } },
          { data: { id: 'fG', source: 'f', target: 'G' } },
          { data: { id: 'gH', source: 'g', target: 'H' } },
        ]
    },

    layout: {
      name: 'tree',
    }
  });

  //animate(move2root(graph.$('#a')));
  function* anim() {
    yield* move2root(graph.$('#a'));
    yield* move2root(graph.$('#b'));
    yield* move2root(graph.$('#c'));
    yield* move2root(graph.$('#d'));
    yield* move2root(graph.$('#e'));
    yield* move2root(graph.$('#f'));
    yield* move2root(graph.$('#g'));

  }
  animate(anim());
}
