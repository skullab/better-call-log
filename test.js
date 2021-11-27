const BetterCall = require('./dist/better-call-log-node') ;

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