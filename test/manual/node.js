import BetterCall from "../../dist/better-call-log.umd.cjs";
const logger = new BetterCall.Logger({
	severities: [BetterCall.Severity.DEBUG],
	formatter: new BetterCall.SyslogFormatter,
	transports: [
		// new BetterCall.FileTransport({ filename: "log.txt", formatter: new BetterCall.StringFormatter() }),
		new BetterCall.ConsoleTransport(),
	],
});
// logger.watch('*','*',(message)=>{
//     console.log(message.stack);
// })
logger.debug("test", { abc: 123 });
