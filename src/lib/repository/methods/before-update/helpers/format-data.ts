import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";

interface HandleDataParams<Entity> {
	data: Entity;
	entityManager: EntityManager;
	entity: CustomClass;
}

export const formatData = <Entity>({
	data,
	entity,
	entityManager,
}: HandleDataParams<Entity>) => {
	const dataWithAutoGeneratedFields =
		entityManager.autoGenerateEntityToDatabase<Entity>({
			events: ["update"],
			entity,
			data,
		});

	const dataInDatabaseFormat = entityManager.convertEntityToDatabase({
		data: dataWithAutoGeneratedFields,
		entity,
	});

	return dataInDatabaseFormat;
};
