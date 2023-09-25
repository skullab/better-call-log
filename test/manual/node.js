import BetterCall from "../../dist/better-call-log.umd.cjs";
const logger = new BetterCall.Logger({
	severities: [BetterCall.Severity.DEBUG],
	// formatter: new BetterCall.SyslogFormatter(),
	formatter: new BetterCall.ANSIFormatter(),
	transports: [
		// new BetterCall.FileTransport({ filename: "log.txt", formatter: new BetterCall.StringFormatter() }),
		new BetterCall.ConsoleTransport(),
	],
});
// logger.watch('*','*',(message)=>{
//     console.log(message.stack);
// })
logger.setTimezone('Europe/Rome');
logger.setTag('TEST')
logger.emergency("hello");
logger.alert("hello");
logger.group('test')
logger.critical("hello group");
logger.error("hello group");
logger.warn("hello group");
logger.notice("hello group");
logger.end();
logger.info("hello");
logger.debug("hello",logger);
