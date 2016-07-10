function* rotate(edge) {
    var graph = edge.cy();

    // Helper function to create edges
    function Edge(source, target) {
        return {
            data: {
                id: source.id() + target.id(),
                source: source.id(),
                target: target.id()
            }
        };
    }

    var node = edge.target();
    var parent = edge.source();
    var grandparent = parent.parent();

    // Collection of edges that will be removed during the rotation
    var oldedges = edge.add(parent.parentEdge());

    // Highlight edge
    edge.addClass('highlighted');

    yield;

    // Compute new edges
    var newedges = [Edge(node, parent)];
    var leftchild = node.isLeftChild();
    // Connect grandparent to node
    if (!grandparent.empty()) {
        newedges.push(Edge(grandparent, node));
        node.data().treepos = parent.data().treepos;
    }

    // Move child node over to parent if required
    if (leftchild) {
        var child = node.rightChild();
        if (!child.empty()) {
            oldedges = oldedges.add(child.parentEdge());
            newedges.push(Edge(parent, child));
            child.data().treepos = 'left';
        }
        parent.data().treepos = 'right';
    } else {
        var child = node.leftChild();
        if (!child.empty()) {
            oldedges = oldedges.add(child.parentEdge());
            newedges.push(Edge(parent, child));
            child.data().treepos = 'right';
        }
        parent.data().treepos = 'left';
    }

    // Remove old edges
    oldedges.remove();

    // Insert new edges
    graph.add(newedges);

    var edges = node.edgesTo(parent);
    edges.addClass('highlighted');

    // Compute new layout
    var layout = graph.makeLayout({ name: 'tree' });
    layout.runAnimated({
        duration: 800,
        onComplete: function() {
            edges.removeClass('highlighted');
        }
    });

    // Done
    yield;
}

function* zigzig(node) {
    yield* rotate(node.parent().parentEdge());
    yield* rotate(node.parentEdge());
}

function* zigzag(node) {
    yield* rotate(node.parentEdge());
    yield* rotate(node.parentEdge());
}

function* splay(node) {
    while (!node.isRoot()) {
        if (node.parent().isRoot()) {
            yield* rotate(node.parentEdge());
        } else if (node.parent().data('treepos') == node.data('treepos')) {
            yield* zigzig(node);
        } else {
            yield* zigzag(node);
        }
    }
}

function* move2root(node) {
    while (!node.isRoot()) {
        yield* rotate(node.parentEdge());
    }
}
