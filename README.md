![alt BetterCallLogo](https://raw.githubusercontent.com/skullab/better-call-log/master/src/images/better_call_log_logo.png)

# An Attractive better console

### Build
```bash
npm run build
```
### For Browser
```html
<script src="node_modules/better-call-log/dist/better-call-log-browser.js"></script>
```
### For NodeJS
```js
const BetterCall = require('better-call-log-node') ;
```
## Common
```js
// Simple console wrapper usage
const b = new BetterCall.Log();
b.clear();
b.info('TEST');
b.log('TEST');
b.debug('TEST');
b.warn('TEST');
b.error('TEST');
b.trace();
b.table({a:1,b:2,c:3},'MY TABLE');
b.time('my process');
b.log('test');
b.timeLog('my process');
b.assert(true,'hello');
b.assert(false,'hello again');
b.timeEnd('my process');
```

## Here's what you will see
In the browser<br>
![alt browser-results](https://raw.githubusercontent.com/skullab/better-call-log/master/src/images/browser_results.png)

In NodeJS<br>
![alt nodejs-results](https://raw.githubusercontent.com/skullab/better-call-log/master/src/images/nodejs_results.png)
## Advanced
```js
const b = new BetterCall.Log(name?: string, options?: BetterCallOptions);
```
BetterCall LOG is written in Typescript<br>
The <em>BetterCallOptions</em> class has the default following properties

```typescript
public level:BetterCallLevel = BetterCallLevel.ALL ;
public ignoreAssert:boolean = false;
public style:BetterCallStyle = typeof window !== 'undefined' ? new BetterCallStyleCSS() : new BetterCallStyleANSI;
public showTimestamp:boolean = true;
public compactMode:boolean = false;
public compactCollapsed:boolean = false;
```
You can create an options object like this
```js
const options = new BetterCall.Options();
options.level = BetterCall.Level.WARNING;
options.ignoreAssert = true;
options.style = new BetterCall.StyleANSI();
options.compactMode = true;
options.compactCollapsed = true;
```
or change the default options like this
```js
const b = new BetterCall.Log();
b.options.level = BetterCall.Level.WARNING;
b.options.compactMode = true;
...
```
### Levels
You can declare a log level with the <em>level</em> option.<br>
Available log levels are :

```js
INFO       = 0b00000010,
LOG        = 0b00000100,
DEBUG      = 0b00001000,
WARNING    = 0b00010000,
ERROR      = 0b00100000,
OFF        = 0b00000000, 
ALL        = 0b11111111,
```
It's possible to concatenate several levels

```js
const b = new BetterCall.Log();
b.level(BetterCall.Level.DEBUG | BetterCall.Level.WARNING);
// or in subtraction
b.level(BetterCall.Level.ALL ^ BetterCall.Level.INFO);
```
## Styles
BetterCall LOG has 2 styles in bundle
- BetterCallStyleCSS
- BetterCallStyleANSI

You can change style option like this
```js
const b = new BetterCall.Log();
b.options.style = new BetterCall.StyleCSS();
b.options.style = new BetterCall.StyleANSI();
```
> By default, in browser it's used <em>BetterCallStyleCSS</em>, while in NodeJS it's used BetterCallStyleANSI

## Static usage

BetterCall can be used statically like this
```js
BetterCall.Log.warn('Attention please, this is not a test of the emergency broadcast system')
// or
const c = BetterCall.Log;
c.info('hello static world !');
// get the singleton instance
BetterCall.Log.getInstance();
```
