import { ILoggerMessage, Severity } from "../core/logger";
import { Transport,ITransportOptions } from "./transport";

export interface IIndexedDBTransportOptions extends ITransportOptions{
	dbName:string;
	objectName:string;
	dbVersion?:number;
}
export class IndexedDBTransport extends Transport {
	private dbName: string;
	private objectName: string;
	private dbVersion: number | undefined;
	constructor(options:IIndexedDBTransportOptions) {
		super(options);
		this.dbName = options.dbName;
		this.objectName = options.objectName;
		this.dbVersion = options.dbVersion;
	}
	transportLog(message: ILoggerMessage): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const severity = this.getSeverity(message.prival);
			if (!this.isFireable(severity)) return resolve(false);
			const content = this.formatter?.format(message);
			const level = Severity[severity];
			if (!window["indexedDB"]) return resolve(false);
			try {
				const dbRequest = window.indexedDB.open(this.dbName, this.dbVersion);
				dbRequest.onupgradeneeded = (event: any) => {
					const db = event.target.result;
					db.createObjectStore(this.objectName, { autoIncrement: true });
				};
				dbRequest.onsuccess = (event: any) => {
					const db = event.target.result;
					const transaction = db.transaction([this.objectName], "readwrite");
					const objectStoreRequest = transaction
						.objectStore(this.objectName)
						.add({ level: level, timestamp: message.timestamp, content: content });
					objectStoreRequest.onsuccess = () => {
						resolve(true);
					};
				};
			} catch (e: any) {
				reject(e);
			}
		});
	}
}
