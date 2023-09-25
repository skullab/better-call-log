import { Formatter } from "./formatter";
import { ILoggerMessage, Severity } from "../core/logger";

export class SimpleFormatter extends Formatter {
	format(message: ILoggerMessage): string | any[] {
		return [
			`${message.timestamp} ${Severity[message.prival - Math.trunc(message.prival / 8) * 8]} ${message.app_name}${
				message.tag && message.tag != "" ? "::" + message.tag : ""
			} ` + (message.args.length > 0 ? ":" : ""),
			...message.args,
		];
	}
}
