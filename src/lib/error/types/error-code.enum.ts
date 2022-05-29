export enum ThothErrorCodeEnum {
	/**
	 * Etc
	 */
	UNKNOWN = "UNKNOWN",
	/**
	 * Params
	 */
	INVALID_PARAM = "INVALID_PARAM",
	INVALID_PARAM_TYPE = "INVALID_PARAM_TYPE",
	MISSING_PARAM = "MISSING_PARAM",
	/**
	 * Execution order
	 */
	INVALID_EXECUTION_ORDER = "INVALID_EXECUTION_ORDER",
	/**
	 * Decorators
	 */
	MISSING_DECORATOR = "MISSING_DECORATOR",
	DUPLICATED_ENTITY = "DUPLICATED_ENTITY",
	DUPLICATED_COLUMN = "DUPLICATED_COLUMN",
	/**
	 * Entity
	 */
	ENTITY_ERROR = "ENTITY_ERROR",
	/**
	 * Column
	 */
	COLUMN_ERROR = "COLUMN_ERROR",
	/**
	 * Automation
	 */
	AUTOMATION_FAILED = "AUTOMATION_FAILED",
	/**
	 * Plugin
	 */
	NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
	/**
	 * Database
	 */
	OPERATION_FAILED = "OPERATION_FAILED",
}
