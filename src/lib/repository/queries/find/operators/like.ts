import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Like = (value: string) =>
	new FindOperator<string>({
		type: "like",
		values: [value],
	});