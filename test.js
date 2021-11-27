const BetterCall = require('./dist/better-call-log') ;

const o = new BetterCall.Options();
o.level = BetterCall.Level.WARNING;
o.ignoreAssert = true;
o.style = new BetterCall.StyleANSI();
o.compactMode = true ;
o.compacttCollapsed = true ;

const b = new BetterCall.Log('my logger');

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

b.group('my label');
b.info('test');
b.groupEnd();