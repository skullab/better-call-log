import { ILoggerMessage, Severity } from "../core/logger";
import { ConsoleLevel, Transport } from "./transport";

export class ConsoleTransport extends Transport {
	transportLog(message: ILoggerMessage): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				let severity: Severity = this.getSeverity(message.prival);
				if (!this.isFireable(severity)) return resolve(false);
				let args = this.formatter?.format(message);
				let level = this.severityToConsoleLevel(severity);
				if (Array.isArray(args)) {
					console[ConsoleLevel[level]].call(this, ...args);
				} else {
					console[ConsoleLevel[level]].call(this, args);
				}
				return resolve(true);
			} catch (e: any) {
				reject(e);
			}
		});
	}
}
