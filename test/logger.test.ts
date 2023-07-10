import { Logger, Severity } from "../src/core/logger";

describe("Logger", () => {
	test("create empty logger", () => {
		const logger = new Logger();
		expect(logger).toEqual({
			formatter: {},
			name: "Logger",
			previousTag: undefined,
			severities: undefined,
			tag: undefined,
			tagOnce: false,
			transportTarget: undefined,
			transports: [{ formatter: undefined, name: undefined, severities: undefined }],
			watchers: new Map(),
		});
	});

	test("create named logger", () => {
		const name = "my-logger";
		const logger = new Logger({ name: name });
		expect(logger.name).toBe(name);
	});

	test("fire", async () => {
		const logger = new Logger();
		let response: boolean[] = [];
		response = response.concat(await logger.test(Severity.EMERGENCY));
		response = response.concat(await logger.test(Severity.ALERT));
		response = response.concat(await logger.test(Severity.CRITICAL));
		response = response.concat(await logger.test(Severity.ERROR));
		response = response.concat(await logger.test(Severity.WARNING));
		response = response.concat(await logger.test(Severity.NOTICE));
		response = response.concat(await logger.test(Severity.INFO));
		response = response.concat(await logger.test(Severity.DEBUG));
		expect(response).toStrictEqual([true, true, true, true, true, true, true, true]);
	});

	test("severity", async () => {
		const logger = new Logger({
			severities: [Severity.WARNING],
		});
		let response: boolean[] = [];
		response = response.concat(await logger.test(Severity.EMERGENCY));
		response = response.concat(await logger.test(Severity.ALERT));
		response = response.concat(await logger.test(Severity.CRITICAL));
		response = response.concat(await logger.test(Severity.ERROR));
		response = response.concat(await logger.test(Severity.WARNING));
		response = response.concat(await logger.test(Severity.NOTICE));
		response = response.concat(await logger.test(Severity.INFO));
		response = response.concat(await logger.test(Severity.DEBUG));
		expect(response).toStrictEqual([true, true, true, true, true, false, false, false]);
	});

	test("watch", async () => {
		const logger = new Logger();
		logger.watch((message) => {
			expect(message.tag).toStrictEqual("__TEST__");
		});
		await logger.test(Severity.NOTICE);
	});
});
