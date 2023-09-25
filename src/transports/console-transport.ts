import { ILoggerMessage, Severity } from "../core/logger";
import { ConsoleLevel, Groupable, IGroupOptions, Transport } from "./transport";

export class ConsoleTransport extends Transport implements Groupable {
	protected incomingGroup:IGroupOptions|undefined;
	private grouping:boolean = false;
	private ending:boolean = false;
	group(options: IGroupOptions): void {
		this.incomingGroup = options;
	}
	groupEnd(): void {
		this.ending = true;
	}
	transportLog(message: ILoggerMessage): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				let severity: Severity = this.getSeverity(message.prival);
				if (!this.isFireable(severity)) return resolve(false);
				let args = this.formatter?.format(message);
				let level = this.severityToConsoleLevel(severity);
				if(this.incomingGroup && ! this.grouping){
					if(this.incomingGroup.collapsed){
						console.groupCollapsed(this.incomingGroup.label);
					}else{
						console.group(this.incomingGroup.label);
					}
					this.grouping = true;
				}
				if(this.ending){
					console.groupEnd();
					this.incomingGroup = undefined;
					this.grouping = false;
					this.ending = false;
				}
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
