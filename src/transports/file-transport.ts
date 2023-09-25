import { ILoggerMessage, Severity } from "../core/logger";
import { ITransportOptions, Transport } from "./transport";
const fs = typeof process === "object" ?  require("fs") : null;

export interface IFileTranportOptions extends ITransportOptions {
	filename: string;
}
export class FileTransport extends Transport {
	protected filename: string;
	constructor(options: IFileTranportOptions) {
		super(options);
		this.filename = options.filename;
	}
	transportLog(message: ILoggerMessage): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				let severity: Severity = this.getSeverity(message.prival);
				if (!this.isFireable(severity)) return resolve(false);
				let formattedMessage: string | any[] | undefined = this.formatter?.format(message);
				let line = (Array.isArray(formattedMessage) ? formattedMessage.join(" ") : formattedMessage) + '\r\n';
				if (line && fs) {
                    fs.appendFile(this.filename,line,(err:any)=>{
                        resolve(err ? false : true);
                    });
				} else {
					resolve(false);
				}
			} catch (e: any) {
				reject(e);
			}
		});
	}
}
