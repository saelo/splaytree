var defaultTreeStyle = cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)',
        'width': 25,
        'height': 25,
        'text-valign': 'center',
        'text-halign': 'left',
      })
    .selector('.subtree')
      .css({
        'shape': 'triangle',
        'width': 35,
        'height': 35,
        'text-valign': 'bottom',
        'text-halign': 'center',
      })
    .selector('edge')
      .css({
        //'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd',
        'curve-style': 'bezier'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        //'transition-property': 'background-color, line-color, target-arrow-color',
        //'transition-duration': '0.00'
      });
