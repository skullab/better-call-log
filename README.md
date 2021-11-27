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
### Common
```js
const b = new BetterCall();
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
b.timeEnd('my process');
```
