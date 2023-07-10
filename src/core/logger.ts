import { SimpleFormatter } from "../formatters/simple-formatter";
import { ConsoleTransport } from "../transports/console-transport";

export enum Severity {
	EMERGENCY,
	ALERT,
	CRITICAL,
	ERROR,
	WARNING,
	NOTICE,
	INFO,
	DEBUG,
}

export enum Facility {
	KERN,
	USER,
	MAIL,
	DAEMON,
	AUTH,
	SYSLOG,
	LPR,
	NEWS,
	UUCP,
	CRON,
	AUTHPRIV,
	FTP,
	NTP,
	SECURITY,
	CONSOLE,
	CLOCK_DEAMON,
	LOCAL_0,
	LOCAL_1,
	LOCAL_2,
	LOCAL_3,
	LOCAL_4,
	LOCAL_5,
	LOCAL_6,
	LOCAL_7,
}

export interface ILoggerMessage {
	[key: string]: any;
	syslog_msg: string;
	header: string;
	pri: string;
	prival: number;
	version: string;
	hostname: string;
	app_name: string;
	procid: string;
	msgid: string;
	timestamp: string;
	full_date: string;
	date_fullyear: string;
	date_month: string;
	date_mday: string;
	full_time: string;
	partial_time: string;
	time_hour: string;
	time_minute: string;
	time_second: string;
	time_secfrac: string;
	time_offset: string;
	time_numoffset: string | undefined;
	structured_data: string;
	sd_element: string | undefined;
	msg: string;
	msg_any: string | undefined;
	msg_utf8: string | undefined;

	// NOT STANDARDS
	tag: string | undefined;
	args: any[];
	stack: string[];
}

export class LoggerMessage implements ILoggerMessage {
	static SP: string = String.fromCharCode(32);
	static NILVALUE: string = "-";
	static BOM: string = "BOM";
	static DOUBLE_QUOTE: string = String.fromCharCode(34);
	static PROGRESSIVE_ID: number = 0;
	static ALTERNATIVE_NAME: string = "kevinmccallister";
	syslog_msg: string;
	header: string;
	pri: string;
	prival: number;
	version: string;
	hostname: string;
	app_name: string;
	procid: string;
	msgid: string;
	timestamp: string;
	full_date: string;
	date_fullyear: string;
	date_month: string;
	date_mday: string;
	full_time: string;
	partial_time: string;
	time_hour: string;
	time_minute: string;
	time_second: string;
	time_secfrac: string;
	time_offset: string = "Z";
	time_numoffset: string | undefined;
	structured_data: string;
	sd_element: string | undefined;
	msg: string;
	msg_any: string | undefined;
	msg_utf8: string | undefined;
	utf8_string: string | undefined;
	args: any[];
	tag: string | undefined;
	rawStack: string;
	stack: string[];
	constructor(
		options: {
			prival: number;
			version: string;
			timestamp: string;
			procid?: string;
			msgid?: string;
			app_name?: string;
			hostname?: string;
			tag?: string;
			utf8_string?: string;
			msg_any?: string;
			time_numoffset?: string;
		},
		...args: any[]
	) {
		this.args = args;
		this.tag = options.tag;
		if ((!args || args.length == 0) && typeof this.tag !== "string") {
			args[0] = this.tag;
			this.tag = "";
		}

		this.prival = options.prival;
		this.pri = "<" + this.prival + ">";
		this.version = options.version;
		this.timestamp = options.timestamp;
		this.time_numoffset = options.time_numoffset;
		if (this.time_numoffset && /[+-][0-23]{2}:[0-59]{2}/.test(this.time_numoffset)) {
			this.timestamp = this.timestamp.replace(this.time_offset, "") + this.time_numoffset;
			this.time_offset = this.time_numoffset;
		}
		this.hostname = options.hostname ?? LoggerMessage.NILVALUE;
		this.app_name = options.app_name ?? LoggerMessage.NILVALUE;
		this.procid = options.procid ?? LoggerMessage.NILVALUE;
		this.msgid = options.msgid ?? LoggerMessage.NILVALUE;

		this.header =
			this.pri +
			this.version +
			LoggerMessage.SP +
			this.timestamp +
			LoggerMessage.SP +
			this.hostname +
			LoggerMessage.SP +
			this.app_name +
			LoggerMessage.SP +
			this.procid +
			LoggerMessage.SP +
			this.msgid;

		const sd_elements: string[] = [];
		args.forEach((a) => {
			if (typeof a === "object") {
				for (const [key, value] of Object.entries(a)) {
					let sd_param = key + "=" + LoggerMessage.DOUBLE_QUOTE + value + LoggerMessage.DOUBLE_QUOTE;
					let sd_id =
						(this.app_name && this.app_name != LoggerMessage.NILVALUE
							? this.app_name
							: LoggerMessage.ALTERNATIVE_NAME) +
						"@" +
						++LoggerMessage.PROGRESSIVE_ID;
					let sd_element = "[" + sd_id + LoggerMessage.SP + sd_param + "]";
					sd_elements.push(sd_element);
				}
			}
		});

		this.sd_element = sd_elements.length > 0 ? sd_elements.join("") : undefined;
		this.structured_data = this.sd_element ?? LoggerMessage.NILVALUE;

		this.utf8_string = options.utf8_string ?? this.tag;
		this.msg_any = options.msg_any;
		let msgFromArgs: string[] = [];
		this.args.forEach((a) => {
			if (typeof a === "string") {
				msgFromArgs.push(a);
			}
		});
		if (msgFromArgs.length > 0) {
			this.utf8_string =
				(this.utf8_string ? this.utf8_string + LoggerMessage.SP : "") + msgFromArgs.join(LoggerMessage.SP);
		}
		this.msg_utf8 = this.utf8_string ? LoggerMessage.BOM + this.utf8_string : undefined;
		this.msg = this.msg_utf8 ?? this.msg_any ?? "";

		this.syslog_msg =
			this.header + LoggerMessage.SP + this.structured_data + (this.msg ? LoggerMessage.SP + this.msg : "");

		let dateTime = this.timestamp.split("T");
		let date = dateTime[0].split("-");
		let time = dateTime[1].split(":");
		this.date_fullyear = date[0];
		this.date_month = date[1];
		this.date_mday = date[2];
		this.full_date = date.join("-");
		this.time_hour = time[0];
		this.time_minute = time[1];
		this.time_second = time[2].split(".")[0];
		this.time_secfrac = time[2].split(".")[1].replace(this.time_offset, "");
		this.partial_time = this.time_hour + ":" + this.time_minute + ":" + this.time_second;
		this.full_time = this.partial_time + this.time_offset;

		const __error = new Error("STACK");
		this.rawStack = __error.stack ?? "";
		this.stack = this.rawStack.split("\n");
		if (this.stack[this.stack.length - 1] == "") {
			this.stack.splice(this.stack.length - 1);
		}
	}
	static factory(
		options: {
			severity: Severity;
			facility?: Facility;
			timestamp?: string;
			version?: string;
			hostname?: string;
			app_name?: string;
			procid?: string;
			msgid?: string;
			sd_name?: string;
			param_value?: string;
			tag?: string;
		},
		...args: any[]
	): ILoggerMessage {
		options.facility = options.facility ?? Facility.CONSOLE;
		options.version = options.version ?? Logger.version;
		options.timestamp = options.timestamp ?? new Date().toISOString();
		options.hostname =
			options.hostname ??
			(typeof window !== "undefined"
				? location.hostname
				: typeof process === "object"
				? require("os").hostname()
				: LoggerMessage.NILVALUE);
		options.app_name = options.app_name ?? LoggerMessage.NILVALUE;
		options.procid = options.procid ?? LoggerMessage.NILVALUE;
		options.msgid = options.msgid ?? LoggerMessage.NILVALUE;
		options.sd_name = options.sd_name ?? options.tag ?? LoggerMessage.NILVALUE;
		options.param_value = options.param_value ?? LoggerMessage.NILVALUE;
		options.tag = options.tag ?? "";
		const message: ILoggerMessage = new LoggerMessage(
			{
				prival: options.facility * 8 + options.severity,
				version: options.version,
				timestamp: options.timestamp,
				hostname: options.hostname,
				app_name: options.app_name,
				procid: options.procid,
				msgid: options.msgid,
				tag: options.tag,
			},
			...args
		);
		return message;
	}
}

export interface ILoggerFormatter {
	format(message: ILoggerMessage): string | any[];
}

export interface ILoggerTransport {
	name?: string;
	severities?: Severity[];
	formatter?: ILoggerFormatter;
	transportLog(message: ILoggerMessage): Promise<boolean>;
}

export interface ILoggerListener {
	onLogger(message: ILoggerMessage): void;
}

export interface ILoggerOptions {
	name?: string;
	severities?: Severity[];
	formatter?: ILoggerFormatter;
	transports?: ILoggerTransport[];
}

export interface ILogger {
	readonly name: string;
	severities?: Severity[];
	formatter: ILoggerFormatter;
	transports: ILoggerTransport[];
	emergency(tag?: string, ...args: any[]): void;
	alert(tag?: string, ...args: any[]): void;
	critical(tag?: string, ...args: any[]): void;
	error(tag?: string, ...args: any[]): void;
	err(tag?: string, ...args: any[]): void;
	warning(tag?: string, ...args: any[]): void;
	warn(tag?: string, ...args: any[]): void;
	notice(tag?: string, ...args: any[]): void;
	log(tag?: string, ...args: any[]): void;
	info(tag?: string, ...args: any[]): void;
	debug(tag?: string, ...args: any[]): void;
}

export class Logger implements ILogger {
	readonly name: string;
	severities?: Severity[];
	formatter: ILoggerFormatter;
	transports: ILoggerTransport[];
	private watchers: Map<string, CallableFunction | undefined> = new Map();
	private transportTarget: ILoggerTransport | null | undefined;
	private previousTag: string | undefined;
	private tag: string | undefined;
	private tagOnce: boolean = false;

	constructor(options?: ILoggerOptions) {
		this.name = options?.name ?? "Logger";
		this.severities = options?.severities;
		this.formatter = options?.formatter ?? new SimpleFormatter();
		this.transports = options?.transports ?? [new ConsoleTransport()];
	}
	static get version(): string {
		return "1";
	}
	protected __fire(severity: Severity, tag?: string, ...args: any[]): Promise<boolean[]> {
		return new Promise((resolve, reject) => {
			if (tag && (typeof tag !== "string" || this.tag)) {
				args.unshift(tag);
				tag = this.tag;
				this.tag = this.tagOnce ? this.previousTag : this.tag;
			}

			let message = LoggerMessage.factory({ severity: severity, tag: tag, app_name: this.name }, ...args);
			const __transports = this.transportTarget ? [this.transportTarget] : [...this.transports];
			this.transportTarget = null;
			
			Promise.all(
				__transports.map((transport) => {
					if (!transport.formatter) {
						transport.formatter = this.formatter;
					}
					if (!transport.severities) {
						transport.severities = this.severities;
					}
					return transport.transportLog({ ...message });
				})
			)
				.then((result) => {
					resolve(result);
				})
				.catch((e: any) => {
					reject(e);
				})
				.finally(() => {
					this.__firewatch(tag, severity, message);
				});
		});
	}
	protected __firewatch(tag: string | undefined, severity: Severity | string, message: ILoggerMessage): void {
		let keys: string[] = [`${tag}:${severity}`, `${tag}:*`, `*:${severity}`, "*:*"];
		keys.forEach((key) => {
			if (this.watchers.has(key)) {
				const callback: CallableFunction | undefined = this.watchers.get(key);
				if (callback && typeof callback === "function") {
					setTimeout(() => {
						callback({ ...message });
					}, 0);
				}
			}
		});
	}
	test(severity: Severity): Promise<boolean[]> {
		this.withTag("__TEST__");
		return this.__fire(severity, "called by test function");
	}
	addTransport(transport: ILoggerTransport): void {
		this.transports.push(transport);
	}
	getTransportByName(name: string): ILoggerTransport | null {
		const filter = this.transports.filter((t) => {
			return t.name === name;
		});
		if (!!filter.length) {
			return filter[0];
		}
		return null;
	}
	removeTransport(transport: ILoggerTransport): void {
		let index = this.transports.indexOf(transport);
		if (index != -1) {
			this.transports.splice(index);
		}
	}
	to(target: string | ILoggerTransport): ILogger {
		if (typeof target === "string") {
			this.transportTarget = this.getTransportByName(target);
		} else {
			this.transportTarget = target;
		}
		return this;
	}
	setTag(tag: string, once: boolean = false): ILogger {
		this.previousTag = this.tag;
		this.tag = tag;
		this.tagOnce = once;
		return this;
	}
	withTag(tag: string): ILogger {
		return this.setTag(tag, true);
	}
	watch(tag: string, severity: Severity, callback: (message: ILoggerMessage) => void): void;
	watch(tag: string, severity: string, callback: (message: ILoggerMessage) => void): void;
	watch(tag: string[], severity: Severity[], callback: (message: ILoggerMessage) => void): void;
	watch(callback: (message: ILoggerMessage) => void): void;
	watch(...args: unknown[]) {
		let tags: string[] = [];
		let severities: Severity[] | string[] = [];
		let callback: CallableFunction | undefined = undefined;
		switch (args.length) {
			case 1:
				(tags = ["*"]), (severities = ["*"]), (callback = args[0] as CallableFunction);
				break;
			case 3:
				tags = Array.isArray(args[0]) ? args[0] : [args[0]];
				severities = Array.isArray(args[1]) ? args[1] : typeof args[1] === "string" ? ["*"] : [args[1]];
				callback = args[2] as CallableFunction;
				break;
			default:
				throw new Error("invalid params");
		}
		tags.map((tag) => {
			severities.map((severity) => {
				this.watchers.set(`${tag}:${severity}`, callback);
			});
		});
	}
	emergency(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.EMERGENCY, tag, ...args);
	}
	alert(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.ALERT, tag, ...args);
	}
	critical(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.CRITICAL, tag, ...args);
	}
	error(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.ERROR, tag, ...args);
	}
	err(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.ERROR, tag, ...args);
	}
	warning(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.WARNING, tag, ...args);
	}
	warn(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.WARNING, tag, ...args);
	}
	notice(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.NOTICE, tag, ...args);
	}
	log(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.NOTICE, tag, ...args);
	}
	info(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.INFO, tag, ...args);
	}
	debug(tag?: string | undefined, ...args: any[]): void {
		this.__fire(Severity.DEBUG, tag, ...args);
	}
}