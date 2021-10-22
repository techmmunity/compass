import { cleanObj, getTypeof } from "@techmmunity/utils";
import { EntityManager } from "../../../entity-manager";
import { MetadataUtil } from "../../../utils/metadata-util";
import { shouldAutoGenerate } from "./helpers/should-auto-generate";
import { DatabaseEvents } from "../../types/database-events";
import { BaseConnectionOptions } from "../../../connection/types/connection-options";
import { CustomClass } from "../../types/metadata-type";
import { autoGenerate } from "../helpers/auto-generate";
import { handleCustomMetadata } from "./helpers/handle-custom-metadata";
import { ClassType } from "../../../types/class-type";

interface Injectables {
	entityManager: EntityManager;
	connectionOptions: BaseConnectionOptions;
}

// eslint-disable-next-line import/exports-last
export interface AutoGenerateEntityToDatabaseParams<Entity> {
	entity: CustomClass;
	data: ClassType<Entity>;
	events: Array<DatabaseEvents>;
}

export const recursiveAutoGenerateEntityToDatabase = <Entity>(
	{ entityManager, connectionOptions }: Injectables,
	{ entity, data, events }: AutoGenerateEntityToDatabaseParams<Entity>,
) => {
	if (getTypeof(data) === "undefined") return;

	const entityMetadata = entityManager.getEntityMetadata(entity);

	const result = entityMetadata.columns.reduce((acc, columnMetadata) => {
		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			/*
			 * ALERT: Mutability!
			 * ALERT: Recursive call!
			 */
			handleCustomMetadata<Entity>({
				columnMetadata,
				data,
				entityManager,
				acc,
				connectionOptions,
				events,
			});

			return acc;
		}

		const key = columnMetadata.name as keyof Entity;

		const value = data[key];

		if (getTypeof(value) !== "undefined") {
			acc[key] = value;

			return acc;
		}

		/**
		 * Is AutoGenerated Field
		 */
		if (
			shouldAutoGenerate({
				columnMetadata,
				events,
			})
		) {
			acc[key] = autoGenerate({
				columnMetadata,
				entityMetadata,
				connectionOptions,
				entity,
			});

			return acc;
		}

		return acc;
	}, data);

	return cleanObj(result) as Entity;
};

export const autoGenerateEntityToDatabase = <Entity>(
	{ entityManager, connectionOptions }: Injectables,
	{ entity, data, events }: AutoGenerateEntityToDatabaseParams<Entity>,
): Entity =>
	/**
	 * Make this way so the "return undefined" doesn't compromise the returned type
	 * (Only will return undefined if receive undefined, so it'ns an error)
	 */
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	recursiveAutoGenerateEntityToDatabase(
		{ entityManager, connectionOptions },
		{ entity, data, events },
	)!;
