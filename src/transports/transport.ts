import { ILoggerFormatter, ILoggerMessage, ILoggerTransport, Severity } from "../core/logger";

export enum ConsoleLevel {
	error = "error",
	warn = "warn",
	log = "log",
	info = "info",
	debug = "debug",
}

export interface ITransportOptions {
	name?: string;
	severities?: Severity[];
	formatter?: ILoggerFormatter;
}

export abstract class Transport implements ILoggerTransport {
	name?: string;
	severities?: Severity[] | undefined;
	formatter?: ILoggerFormatter | undefined;
	constructor(options?: ITransportOptions) {
		this.name = options?.name;
		this.formatter = options?.formatter;
		this.severities = options?.severities;
	}
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
	isFireable(severity: Severity): boolean {
		if (this.severities && severity > Math.max(...this.severities)) {
			return false;
		}
		return true;
	}
	abstract transportLog(message: ILoggerMessage): Promise<boolean>;
}
