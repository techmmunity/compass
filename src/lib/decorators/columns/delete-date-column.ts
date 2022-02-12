import { getOptions } from "../@helpers/get-options";

import { makeColumnDecorator } from "./helpers/make-column-decorator";

import type { DateColumnOptions } from "../types/column-options";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DeleteDateColumn = <ColumnExtraMetadata = any>(
	options?: DateColumnOptions<ColumnExtraMetadata>,
) => {
	const { name, ...metadata } =
		getOptions<DateColumnOptions<ColumnExtraMetadata>>(options);

	return makeColumnDecorator({
		metadata: {
			...metadata,
			databaseName: name,
			autoGenerateOnlyOnEvents: ["delete"],
			autoGenerate: "date",
		},
		acceptedTypes: ["string", "number", "date"],
	});
};
