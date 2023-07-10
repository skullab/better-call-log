import { ILoggerMessage, Severity } from "../core/logger";
import { Formatter } from "./formatter";

export class StringFormatter extends Formatter {
	format(message: ILoggerMessage): string | any[] {
		let toString: string =
			`${message.timestamp} ${Severity[message.prival - Math.trunc(message.prival / 8) * 8]} ${message.app_name}${
				message.tag && message.tag != "" ? "::" + message.tag : ""
			} ` + (message.args.length > 0 ? ":" : "");
		let argsToString: string[] = [];
		message.args.forEach((a: any) => {
			argsToString.push(JSON.stringify(a));
		});
		return toString + " " + argsToString.join(" ");
	}
}
