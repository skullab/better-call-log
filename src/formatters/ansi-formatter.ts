import { Color } from "../core/color";
import { ILoggerMessage, Severity } from "../core/logger";
import { Formatter } from "./formatter";

export interface IANSIStyle {
	background: Color;
	foreground: Color;
}

export interface IANSIStyleGroup {
	[key: string]: IANSIStyle;
	emergency: IANSIStyle;
	alert: IANSIStyle;
	critical: IANSIStyle;
	error: IANSIStyle;
	warning: IANSIStyle;
	notice: IANSIStyle;
	info: IANSIStyle;
	debug: IANSIStyle;
}

export class ANSIFormatter extends Formatter {
	protected styles: IANSIStyleGroup;
	protected carriageReturn: string | boolean;
	constructor(styles?: IANSIStyleGroup, carriageReturn?: string | boolean) {
		super();
		this.styles = Object.assign(this.getDefaultStyles(), styles ?? {});
		this.carriageReturn =
			carriageReturn === false ? false : typeof carriageReturn == "string" ? carriageReturn : "\r\n ↳";
	}
	getDefaultStyles(): IANSIStyleGroup {
		return {
			emergency: {
				background: Color.BgRed,
				foreground: Color.FgBlack,
			},
			alert: {
				background: Color.BgRed,
				foreground: Color.FgBlack,
			},
			critical: {
				background: Color.BgRed,
				foreground: Color.FgBlack,
			},
			error: {
				background: Color.BgRed,
				foreground: Color.FgBlack,
			},
			warning: {
				background: Color.BgYellow,
				foreground: Color.FgBlack,
			},
			notice: {
				background: Color.BgBlack,
				foreground: Color.FgWhite,
			},
			info: {
				background: Color.BgBlue,
				foreground: Color.FgWhite,
			},
			debug: {
				background: Color.BgCyan,
				foreground: Color.FgBlack,
			},
		};
	}
	format(message: ILoggerMessage): string | any[] {
		const severity: Severity = this.getSeverity(message.prival);
		const severityName = Severity[severity].toLowerCase();
		const style = this.styles[severityName];
		let _f = [
			`${style.background}${style.foreground} ${message.timestamp} ${severityName.toUpperCase()} ${message.app_name}${
				message.tag ? "::" + message.tag : ""
			} ${Color.Reset}`,
			...message.args,
		];
		if(this.carriageReturn !== false && typeof this.carriageReturn == 'string'){
			_f.splice(1,0,this.carriageReturn);
		}
		return _f;
	}
}
