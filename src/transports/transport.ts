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
	severities?: Severity | Severity[];
	formatter?: ILoggerFormatter;
}

export interface IGroupOptions {
	label: string;
	collapsed: boolean;
}
export interface Groupable {
	group(options: IGroupOptions): void;
	groupEnd(): void;
}

export abstract class Transport implements ILoggerTransport {
	name?: string;
	severities?: Severity[] | undefined;
	formatter?: ILoggerFormatter | undefined;
	constructor(options?: ITransportOptions) {
		this.name = options?.name;
		this.formatter = options?.formatter;
		this.severities =
			options?.severities && Array.isArray(options.severities)
				? options?.severities
				: options?.severities && !Array.isArray(options.severities)
				? [options.severities]
				: undefined;
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
	isFireableMessage(message: ILoggerMessage): boolean {
		return this.isFireable(this.getSeverity(message.prival));
	}
	abstract transportLog(message: ILoggerMessage): Promise<boolean>;
}
