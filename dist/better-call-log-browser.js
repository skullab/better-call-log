!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("BetterCall",[],e):"object"==typeof exports?exports.BetterCall=e():t.BetterCall=e()}(this,(function(){return(()=>{"use strict";var t,e,s={d:(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},n={};s.d(n,{default:()=>g}),function(t){t[t.INFO=2]="INFO",t[t.LOG=4]="LOG",t[t.DEBUG=8]="DEBUG",t[t.WARNING=16]="WARNING",t[t.ERROR=32]="ERROR",t[t.OFF=0]="OFF",t[t.ALL=255]="ALL"}(t||(t={}));class o{}class r{constructor(t){this.style=null!=t?t:new o}}!function(t){t.Reset="[0m",t.Bright="[1m",t.Dim="[2m",t.Underscore="[4m",t.Blink="[5m",t.Reverse="[7m",t.Hidden="[8m",t.FgBlack="[30m",t.FgRed="[31m",t.FgGreen="[32m",t.FgYellow="[33m",t.FgBlue="[34m",t.FgMagenta="[35m",t.FgCyan="[36m",t.FgWhite="[37m",t.BgBlack="[40m",t.BgRed="[41m",t.BgGreen="[42m",t.BgYellow="[43m",t.BgBlue="[44m",t.BgMagenta="[45m",t.BgCyan="[46m",t.BgWhite="[47m"}(e||(e={}));class i extends r{constructor(){super(),this.style.base=[],this.style.info=[e.BgBlue,e.FgWhite],this.style.log=[e.BgBlack,e.FgWhite],this.style.debug=[e.BgCyan,e.FgBlack],this.style.warn=[e.BgYellow,e.FgBlack],this.style.error=[e.BgRed,e.FgBlack],this.style.trace=[e.BgMagenta,e.FgWhite],this.style.table=[e.BgMagenta,e.FgWhite],this.style.group=[e.BgMagenta,e.FgWhite],this.style.assert=[e.BgMagenta,e.FgWhite]}toString(t){return this.style.base.join("")+(this.style[t]?this.style[t].join(""):"")+"%s"+e.Reset}package(t){return{style:this.toString(t),tag:t.toUpperCase(),order:{style:0,tag:1}}}}class l extends r{constructor(){super(),this.style.base=["padding: 2px 4px","border-radius: 2px"],this.style.debug=["background-color: #5EEBC2","color: #000000"],this.style.error=["background-color: #F54E47","color: #000000"],this.style.info=["background-color: #30A2F5","color: #D0FFFF"],this.style.log=["background-color: #000000","color: #FFFFFF"],this.style.warn=["background-color: #EBBA3E","color: #000000"],this.style.trace=["background-color: #69187D","color: #FFFFFF"],this.style.table=["background-color: #69187D","color: #FFFFFF"],this.style.group=["background-color: #69187D","color: #FFFFFF"],this.style.assert=["background-color: #69187D","color: #FFFFFF"]}toString(t){return this.style.base.join(";")+";"+(this.style[t]?this.style[t].join(";")+";":"")}package(t){return{style:this.toString(t),tag:"%c"+t.toUpperCase(),order:{tag:0,style:1}}}}class a{constructor(){this.level=t.ALL,this.ignoreAssert=!1,this.style="undefined"!=typeof window?new l:new i,this.showTimestamp=!0,this.compactMode=!1,this.compactCollapsed=!1}}class c{constructor(t,e){this.name=null!=t?t:"Better Call LOG",this.options=null!=e?e:new a}static level(t){return c.getInstance().level(t)}level(t){return null!=t&&(this.options.level=t),this.options.level}static getInstance(){return c.instance||(c.instance=new c),c.instance}static isOff(){return c.getInstance().isOff()}isOff(){return!(this.level()|t.OFF)}static assert(...t){return c.getInstance().assert(...t)}assert(...t){if(this.isOff())return;let e=t[0];e&&this.options.ignoreAssert||this.fire("group","ASSERT"),e&&!this.options.ignoreAssert&&console.info("ASSERTION ",...t),console.assert(...t),e&&this.options.ignoreAssert||this.groupEnd()}static clear(){c.getInstance().clear()}clear(){this.isOff()||console.clear()}static count(t){return c.getInstance().count(t)}count(t){this.isOff()||(t=null!=t?t:this.name,console.count(t))}static countReset(t){return c.getInstance().countReset(t)}countReset(t){this.isOff()||(t=null!=t?t:this.name,console.countReset(t))}static debug(...t){return c.getInstance().debug(...t)}debug(...e){this.level()&t.DEBUG&&this.fire("debug",...e)}static dir(t){return c.getInstance().dir(t)}dir(t){this.isOff()||console.dir(t)}static dirxml(t){return c.getInstance().dirxml(t)}dirxml(t){this.isOff()||console.dirxml(t)}static error(...t){return c.getInstance().error(...t)}error(...e){this.level()&t.ERROR&&this.fire("error",...e)}static group(t){return c.getInstance().group(t)}group(t){this.isOff()||(t=null!=t?t:this.name,console.group(t))}static groupCollapsed(t){return c.getInstance().groupCollapsed(t)}groupCollapsed(t){this.isOff()||(t=null!=t?t:this.name,console.groupCollapsed(t))}static groupEnd(t){return c.getInstance().groupEnd(t)}groupEnd(t){if(!this.isOff()){t=null!=t?t:1;for(let e=0;e<t;e++)console.groupEnd()}}static info(...t){return c.getInstance().info(...t)}info(...e){this.level()&t.INFO&&this.fire("info",...e)}static log(...t){return c.getInstance().log(...t)}log(...e){this.level()&t.LOG&&this.fire("log",...e)}static table(t){return c.getInstance().table(t)}table(t,e,s){this.isOff()||(this.fire("group","TABLE",null!=e?e:this.name),console.table(t,s),this.groupEnd())}static time(t){return c.getInstance().time(t)}time(t){this.isOff()||console.time(t)}static timeEnd(t){return c.getInstance().timeEnd(t)}timeEnd(t){this.isOff()||(this.fire("group","TIME END"),console.timeEnd(t),this.groupEnd())}static timeLog(t){return c.getInstance().timeLog(t)}timeLog(t){this.isOff()||(this.fire("group","TIME LOG"),console.timeLog(t),this.groupEnd())}static timeStamp(t){return c.getInstance().timeStamp(t)}timeStamp(t){let e="undefined"!=typeof navigator?navigator.language:"en-EN";return null!=t?t:" "+Intl.DateTimeFormat(e,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).format(new Date)}static trace(...t){return c.getInstance().trace(...t)}trace(...t){this.isOff()||this.fire("trace",...t)}static warn(...t){return c.getInstance().warn(...t)}warn(...e){this.level()&t.WARNING&&this.fire("warn",...e)}fire(t,...e){let s=this.options.style.package(t),n="",o="";for(let t=0;t<10-s.tag.length;t++)n+=" ";let r=this.name.length>20?this.name.substring(0,20)+"...":this.name;for(let t=0;t<25-r.length;t++)o+=" ";let i=[];i[s.order.tag]=s.tag+n+"➤ "+r+o+(this.options.showTimestamp?"➤"+this.timeStamp():""),i[s.order.style]=s.style,i.push("\n↳"),this.options.compactMode&&(i.pop(),this.options.compactCollapsed?console.groupCollapsed.apply(this,i):console.group.apply(this,i)),console[t].apply(this,this.options.compactMode?e:i.concat(e)),this.options.compactMode&&console.groupEnd.call(this)}}c.LEVEL_OFF=0,c.LEVEL_INFO=16,c.LEVEL_LOG=32,c.LEVEL_DEBUG=48,c.LEVEL_WARNING=64,c.LEVEL_ERROR=80;const g={Log:c,Level:t,Options:a,Style:r,StyleANSI:i,StyleCSS:l,StyleObject:o,StylePackage:class{}};return n.default})()}));
//# sourceMappingURL=better-call-log-browser.js.map