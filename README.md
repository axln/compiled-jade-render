# compiled-jade-render

This tiny Jade wrapper for Express allows to eliminate a significant delay required to compile Jade templates when they rendered for the first time after your application is started.

## Installation

via npm:

```bash
$ npm install compiled-jade-render
```

## Jade template compilation

The template compilation is usually used for browser rendering but nothing stops us from using it on the server to speed up initial responses.

To compile Jade templates, you first need to install Jade as a console command:

```bash
$ npm install -g jade
```
Then you can compile Jade templates to plain .js files:

```bash
jade --client template.jade
```
or in production case:

```bash
jade --client --no-debug template.jade
```

> Note: Probably it's not a good idea to do it manually, so I use Jade file watcher in WebStorm with a slightly modified command (`--client` and `--no-debug` added), bacause by default Jade watcher compile .jade into .html.

Jade will generate a `template.js` file with a function which requires a single param (locals) and depends on [Jade runtime](https://github.com/jadejs/jade):

```javascript
function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  // more rendering code here
}
```

Such js. files can be used in Express as templates for generating HTML.

## Express Configuration

Just use the wrapper as an alternative template engine:

```js
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'js');
app.engine('js', require('compiled-jade-render'));
```
## Benchmarks

In my case this wrapper allowed to reduce initial (right after lauch of the application) page generation time from approx. 450 ms to 10 ms. Subsequent requests were processed during 1-2 ms due the Node cache and opitimizations.

## License

ISC
