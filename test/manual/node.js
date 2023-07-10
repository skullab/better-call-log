import BetterCall from "../../dist/better-call-log.umd.cjs";
const logger = new BetterCall.Logger();
logger.watch('*','*',(message)=>{
    console.log(message.stack);
})
logger.debug('test');