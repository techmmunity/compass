import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";

interface HandleDataParams {
	data: any;
	entityManager: EntityManager;
	entity: CustomClass;
}

export const formatData = <Entity>({
	data,
	entity,
	entityManager,
}: HandleDataParams) => {
	const dataInEntityFormat = entityManager.convertDatabaseToEntity<Entity>({
		data,
		entity,
	});

	return dataInEntityFormat;
};
