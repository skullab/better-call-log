import { Logger, LoggerMessage, Severity } from "../src/core/logger";

describe("Logger", () => {
	test("create empty logger", () => {
		const logger = new Logger();
		expect(logger.name).toBe("Logger");
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

	test("null values", async () => {
		const logger = new Logger();
		let response: boolean[] = [];
		response = response.concat(await logger.test(Severity.EMERGENCY, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.ALERT, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.CRITICAL, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.ERROR, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.WARNING, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.NOTICE, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.INFO, undefined, null, undefined));
		response = response.concat(await logger.test(Severity.DEBUG, undefined, null, undefined));
		expect(response).toStrictEqual([true, true, true, true, true, true, true, true]);
	});

	test("setTag & withTag", async () => {
		const logger = new Logger();
		const TAG = "CUSTOM_TAG";
		const TEMPTAG = "CUSTOM_TEMP_TAG";
		logger.setTag(TAG);
		expect(logger.getTag()).toStrictEqual(TAG);
		logger.withTag(TEMPTAG);
		expect(logger.getTag()).toStrictEqual(TEMPTAG);
		expect(logger.getTag()).not.toStrictEqual(TEMPTAG);
		expect(logger.getTag()).toStrictEqual(TAG);
	});

	test("getLastMessage", async () => {
		const logger = new Logger();
		expect(await logger.test(Severity.NOTICE)).toStrictEqual([true]);
		expect(logger.getLastMessage() instanceof LoggerMessage).toBe(true);

		const last = logger.getLastMessage();
		expect(await logger.test(Severity.NOTICE)).toStrictEqual([true]);
		expect(logger.getLastMessage()).not.toStrictEqual(last);
	});

	test("tag & args", async () => {
		const logger = new Logger();

		expect(await logger.testNoTag(Severity.NOTICE)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual("");

		expect(await logger.testNoTag(Severity.NOTICE, "THIS_IS_A_TAG")).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual("THIS_IS_A_TAG");
		expect(logger.getLastMessage()?.args.length).toStrictEqual(0);

		const TAG = "CUSTOM_TAG";
		logger.setTag(TAG);

		expect(await logger.testNoTag(Severity.NOTICE, undefined)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual(TAG);
		expect(logger.getLastMessage()?.args.length).toStrictEqual(1);

		expect(await logger.testNoTag(Severity.NOTICE, "this is not a tag")).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual(TAG);
		expect(logger.getLastMessage()?.args.length).toStrictEqual(1);

		expect(await logger.testNoTag(Severity.NOTICE, undefined, { abc: 123 })).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual(TAG);
		expect(logger.getLastMessage()?.args.length).toStrictEqual(2);

		expect(await logger.testNoTag(Severity.NOTICE, "this is not a tag", { abc: 123 })).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual(TAG);
		expect(logger.getLastMessage()?.args.length).toStrictEqual(2);
	});

	test("expect value", async () => {
		const logger = new Logger();

		expect(await logger.testNoTag(Severity.NOTICE, undefined)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.args[0]).toStrictEqual(undefined);

		expect(await logger.testNoTag(Severity.NOTICE, "TAG", undefined)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.args[0]).not.toStrictEqual("TAG");
		expect(logger.getLastMessage()?.args[0]).toStrictEqual(undefined);

		logger.setTag("TAG");
		expect(await logger.testNoTag(Severity.NOTICE, "hello", undefined)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.args[0]).toStrictEqual("hello");
		expect(logger.getLastMessage()?.args[1]).toStrictEqual(undefined);

		logger.resetTag();
		expect(await logger.testNoTag(Severity.NOTICE, "hello", undefined)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual("hello");
		expect(logger.getLastMessage()?.args[0]).toStrictEqual(undefined);

		expect(await logger.test(Severity.NOTICE, "hello", undefined)).toStrictEqual([true]);
		expect(logger.getLastMessage()?.tag).toStrictEqual("__TEST__");
		expect(logger.getLastMessage()?.args[0]).toStrictEqual("hello");
		expect(logger.getLastMessage()?.args[1]).toStrictEqual(undefined);

		let args = [{ abc: 123 }, undefined, "this is a string"];
		expect(await logger.testNoTag(Severity.NOTICE, "TAG", ...args)).toStrictEqual([true]);
		for (let i = 0; i < args.length; i++) {
			expect(logger.getLastMessage()?.args[i]).toStrictEqual(args[i]);
		}
	});
});
