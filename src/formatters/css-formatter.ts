import { ILoggerMessage, Severity } from "../core/logger";
import { Formatter } from "./formatter";

export interface ICSSStyle {
	padding?: string;
	"-webkit-padding"?: string;
	border?: string;
	"-webkit-border"?: string;
	"border-radius"?: string;
	background?: string;
	"-webkit-background"?: string;
	color?: string;
	margin?: string;
	"-webkit-margin"?: string;
	font?: string;
	"-webkit-font"?: string;
	line?: string;
	text?: string;
	"-webkit-text"?: string;
	cursor?: string;
}
export interface ICSSStyleGroup {
	[key: string]: ICSSStyle;
	base: ICSSStyle;
	emergency: ICSSStyle;
	alert: ICSSStyle;
	critical: ICSSStyle;
	error: ICSSStyle;
	warning: ICSSStyle;
	notice: ICSSStyle;
	info: ICSSStyle;
	debug: ICSSStyle;
}
export class CSSFormatter extends Formatter {
	protected styles: ICSSStyleGroup;
	constructor(styles?: ICSSStyleGroup) {
		super();
		this.styles = styles ?? this.getDefaultStyles();
	}
	getDefaultStyles(): ICSSStyleGroup {
		return {
			base: {
				padding: "2px 4px",
				"-webkit-padding": "2px 4px",
				"border-radius": "2px",
				margin: "5px",
				"-webkit-margin": "5px",
			},
			emergency: {
				background: "#F54E47",
				color: "#000000",
			},
			alert: {
				background: "#F54E47",
				color: "#000000",
			},
			critical: {
				background: "#F54E47",
				color: "#000000",
			},
			error: {
				background: "#F54E47",
				color: "#000000",
			},
			warning: {
				background: "#EBBA3E",
				color: "#000000",
			},
			notice: {
				background: "#000000",
				color: "#FFFFFF",
			},
			info: {
				background: "#2782C4",
				color: "#D0FFFF",
			},
			debug: {
				background: "#5EEBC2",
				color: "#000000",
			},
		};
	}
	format(message: ILoggerMessage): string | any[] {
		const severity: Severity = this.getSeverity(message.prival);
		const severityName = Severity[severity].toLowerCase();
		const style = Object.assign({ ...this.styles.base }, this.styles[severityName]);
		let cssStyle = "";
		for (const [key, value] of Object.entries(style)) {
			cssStyle += `${key}:${value};`;
		}
		return [
			`%c${message.timestamp} ${severityName.toUpperCase()} ${message.app_name}${
				message.tag ? "::" + message.tag : ""
			}`,
			cssStyle,
			...message.args,
		];
	}
}
