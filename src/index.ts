import * as core from "./core/logger";
import { Transport } from "./transports/transport";
import { ConsoleTransport } from "./transports/console-transport";
import { IndexedDBTransport } from "./transports/indexeddb-transport";
import { HttpTransport } from "./transports/http-transport";
import { FileTransport } from "./transports/file-transport";
import { SimpleFormatter } from "./formatters/simple-formatter";
import { SyslogFormatter } from "./formatters/syslog-formatter";
import { JSONFormatter } from "./formatters/json-formatter";
import { CSSFormatter } from "./formatters/css-formatter";
import {StringFormatter} from "./formatters/string-formatter";

const BetterCall = Object.assign(
	{
		Transport,
		ConsoleTransport,
		IndexedDBTransport,
		HttpTransport,
		FileTransport,
		SimpleFormatter,
		SyslogFormatter,
		JSONFormatter,
		CSSFormatter,
		StringFormatter,
	},
	core
);

export default BetterCall;
