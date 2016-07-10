//
// Binary tree layout and collection extensions.
//

(function() {
  'use strict';

  // registers the extension on a cytoscape lib ref
  var register = function(cytoscape) {
    if (!cytoscape) return;

    // Register tree-specific collection extensions
    cytoscape('collection', 'isRoot', function() { return this.incomers().length == 0; });
    cytoscape('collection', 'isLeftChild', function() { return this.data('treepos') == 'left'; });
    cytoscape('collection', 'isRightChild', function() { return this.data('treepos') == 'right'; });
    cytoscape('collection', 'parent', function() { return this.incomers('node'); });
    cytoscape('collection', 'leftChild', function() { return this.outgoers('node[treepos="left"]'); });
    cytoscape('collection', 'rightChild', function() { return this.outgoers('node[treepos="right"]'); });
    cytoscape('collection', 'parentEdge', function() { return this.incomers('edge'); });


    var defaults = {
      // general layout options
      fit: true,                // For cytoscape, fit the viewport to the resulting layout
      parentDistance: 80,       // Vertical distance to the parent node
      siblingDistance: 60,      // Minimum horizontal distance between siblings
    };

    function TreeLayout(options) {
      var opts = this.options = {};
      for(var i in defaults) { opts[i] = defaults[i]; }
      for(var i in options) { opts[i] = options[i]; }
    }

    TreeLayout.prototype.compute = function() {
      var options = this.options;
      var positions = {};

      // Determine root node
      var root = options.eles.filter(function(i, node) { return node.indegree() == 0; });
      if (root.length !== 1)
          throw Error('Invalid tree: no unique root found');

      // Traverse the tree and compute the position of the current node
      // Basically a DFS that computes the final position in one pass.
      var levels = [];
      function visit(node, minX, level) {
        if (node.length === 0)
            return null;

        var children = node.outgoers('node');
        if (children.length > 2)
            throw Error('Invalid binary tree: node has more than 2 children');
        if (children.length === 2 && children[0].data('treepos') == children[1].data('treepos'))
            throw Error('Invalid binary tree: same tree position for both child nodes of node ' + node.id());

        var x = Math.max(minX, levels[level] || 0);
        var y = level * options.parentDistance;

        var lchild = visit(node.leftChild(), x - (options.siblingDistance / 2), level + 1);
        var rchild = visit(node.rightChild(), x + (options.siblingDistance / 2), level + 1);

        if (lchild && rchild)
            positions[node.id()] = { x: (lchild.x + rchild.x) / 2, y: y };
        else if (lchild)
            positions[node.id()] = { x: (lchild.x + options.siblingDistance) / 2, y: y };
        else if (rchild)
            positions[node.id()] = { x: (rchild.x - options.siblingDistance) / 2, y: y };
        else
            positions[node.id()] = { x: x, y: y };

        levels[level] = positions[node.id()].x + options.siblingDistance;
        return positions[node.id()];
      }

      visit(root, 0, 0);

      return positions;
    }

    TreeLayout.prototype.run = function() {
      var positions = this.compute();
      var options = this.options;
      options.eles.nodes().layoutPositions(this, options, function() {
        return positions[this.id()];
      });

      return this;
    };

    TreeLayout.prototype.runAnimated = function(options) {
      var positions = this.compute();
      var nodes = this.options.eles.nodes();
      var duration = options.duration || 1000;
      var onComplete = options.onComplete;

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.position() != positions[node.id()]) {
          var animation = node.animation({
              position: positions[node.id()],
              duration: duration
          });

          animation.play();
          if (onComplete) {
              animation.promise().then(onComplete);
              onComplete = undefined;
          }
        }
      }

      return this;
    };

    cytoscape('layout', 'tree', TreeLayout);
  };

  if (typeof cytoscape !== 'undefined') {
    register(cytoscape);
  }

})();
