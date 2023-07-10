import BetterCall from "../../dist/better-call-log.umd.cjs";
const logger = new BetterCall.Logger({
	severities: [BetterCall.Severity.DEBUG],
	transports: [new BetterCall.FileTransport({ filename: "log.txt", formatter: new BetterCall.StringFormatter() })],
});
// logger.watch('*','*',(message)=>{
//     console.log(message.stack);
// })
logger.debug("test", { abc: 123 });
