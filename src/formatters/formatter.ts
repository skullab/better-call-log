import { ILoggerFormatter, ILoggerMessage, Severity } from "../core/logger";
import { ConsoleLevel } from "../transports/transport";

export abstract class Formatter implements ILoggerFormatter {
	getSeverity(prival: number): Severity {
		return prival - Math.trunc(prival / 8) * 8;
	}
	severityToConsoleLevel(severity: Severity): ConsoleLevel {
		switch (severity) {
			case Severity.EMERGENCY:
			case Severity.ALERT:
			case Severity.CRITICAL:
			case Severity.ERROR:
				return ConsoleLevel.error;
			case Severity.WARNING:
				return ConsoleLevel.warn;
			case Severity.NOTICE:
				return ConsoleLevel.log;
			case Severity.INFO:
				return ConsoleLevel.info;
			case Severity.DEBUG:
			default:
				return ConsoleLevel.debug;
		}
	}
	abstract format(message: ILoggerMessage): string | any[];
}
