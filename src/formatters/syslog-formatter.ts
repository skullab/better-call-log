import { Formatter } from "./formatter";
import { ILoggerMessage } from "../core/logger";

export class SyslogFormatter extends Formatter {
	format(message: ILoggerMessage): string | any[] {
		return message.syslog_msg;
	}
}
