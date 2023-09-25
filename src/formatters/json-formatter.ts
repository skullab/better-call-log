import { Formatter } from "./formatter";
import { ILoggerMessage } from "../core/logger";

export interface IJSONFIlter {
	[key: string]: <T>(value: T, formatter: Formatter) => T;
}
export class JSONFormatter extends Formatter {
	protected filter: IJSONFIlter | undefined;
	protected evaluateOnly: string[] | undefined;

	constructor(only?: string[], filter?: IJSONFIlter) {
		super();
		this.filter = filter;
		this.evaluateOnly = only;
	}
	only(evaluateOnly: string[]) {
		this.evaluateOnly = evaluateOnly;
	}
	format(message: ILoggerMessage): string | any[] {
		if (this.evaluateOnly) {
			let messageArray = Object.entries(message);
			for (let [key] of messageArray) {
				delete message[key];
			}
			messageArray = messageArray.filter(([key]) => this.evaluateOnly?.includes(key));
			for (let [key, value] of messageArray) {
				message[key] = value;
			}
		}
		if (this.filter) {
			for (let [key, filter] of Object.entries(this.filter)) {
				if (message[key] && typeof filter === "function") {
					let filterResult = filter(message[key], this);
					if (typeof filterResult === "object" && filterResult["key"] && filterResult["value"]) {
						delete message[key];
						message[filterResult["key"]] = filterResult["value"];
					} else {
						message[key] = filterResult;
					}
				}
			}
		}
		return JSON.stringify(message);
	}
}
