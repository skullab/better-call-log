import { ILoggerMessage, Severity } from "../core/logger";
import { ITransportOptions, Transport } from "./transport";
import axios, { AxiosRequestConfig } from "axios";

export interface IHttpTransportOptions extends ITransportOptions, AxiosRequestConfig {}

export class HttpTransport extends Transport {
	private axiosConfig: AxiosRequestConfig;
	constructor(options: IHttpTransportOptions) {
		super(options);
		this.axiosConfig = options;
	}

	transportLog(message: ILoggerMessage): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				let severity: Severity = this.getSeverity(message.prival);
				if (!this.isFireable(severity)) return resolve(false);
				const formattedMessage = this.formatter?.format(message);
				const payload =
					this.axiosConfig.method?.toLowerCase() === "post"
						? { data: { log: formattedMessage } }
						: { params: { log: JSON.stringify(formattedMessage) } };
				const { status } = await axios(Object.assign({}, this.axiosConfig, payload));
				if (status < 200 || status >= 300) {
					return resolve(false);
				}
				return resolve(true);
			} catch (e: any) {
				reject(e);
			}
		});
	}
}
