import { DefaultTypes } from "../../../types/types";
import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MoreThan = (value: DefaultTypes) =>
	new FindOperator({
		type: "moreThan",
		values: [value],
	});