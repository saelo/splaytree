function animate(steps) {
  var done = false;
  function step() {
      if (!done) {
          var next = steps.next();
          done = next.done;
      }
  }

  // Delete any previous handler
  $('#cy').off('click');
  $('#cy').off('keydown');

  // Run a step of the algorithm for every click or keypress
  $('#cy').on('click', step);

  $(document).keydown(function(e) {
    switch(e.which) {
        case 34:        // presenter
        case 39:        // right arrow key
            step();
            break;
        default:
            return;
    }
    e.preventDefault();
  });
}
