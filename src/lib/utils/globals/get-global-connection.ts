import { DEFAULT_CONNECTION_NAME } from "../../../config";
import { SymbiosisError } from "../../error";

export const getGlobalConnection = (connectionName?: string) => {
	const conName = connectionName || DEFAULT_CONNECTION_NAME;

	if (global.symbiosisConnections) {
		const connection = global.symbiosisConnections[conName];

		if (connection) return connection;

		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Invalid param",
			details: [`Connection "${conName}" not found."`],
		});
	}

	throw new SymbiosisError({
		code: "INVALID_EXECUTION_ORDER",
		origin: "SYMBIOSIS",
		message: "Invalid execution order",
		details: [
			"You must call `setGlobalConnection` before call `getGlobalConnection`. If you are doing this, please check the connection name.",
		],
	});
};