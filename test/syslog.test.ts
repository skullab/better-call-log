import { Facility, Logger, Severity } from "../src/core/logger";
import { SyslogFormatter } from "../src/formatters/syslog-formatter";

describe("Syslog", () => {
	test("with no structured data", async () => {
		const logger = new Logger({ formatter: new SyslogFormatter() });
		logger.watch((message) => {
			const prival = Facility.CONSOLE * 8 + Severity.NOTICE;
			const expMsg = `<${prival}>${Logger.version} ${message.timestamp} ${message.hostname} ${message.app_name} - - - BOM__TEST__ called by test function`;
			expect(message.syslog_msg).toBe(expMsg);
		});
		await logger.test(Severity.NOTICE, "called by test function");
	});
});
