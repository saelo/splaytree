# Splay Tree Visualizations

Browser-based visualizations of the [Splay Tree](https://www.cs.cmu.edu/~sleator/papers/self-adjusting.pdf) operations.

## Usage

Start a webserver serving the root directory:

```bash
cd splaytreeviz
python3 -m http.server
```

Now browse to http://localhost:8000

Make sure your browser fully supports [ES6 generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

## Internals

Algorithms are implemented as ES6 generators which [yield](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/yield) between each step of the algorithm, allowing for a sequential (and thus readable) implementation, but stepwise execution. A step function which forwards the produced iterator object is then attached to onclick and keydown listeners for a nice "presentation mode".
