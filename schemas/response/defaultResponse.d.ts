type Response = {
	succes: boolean;
	status: number;
	message: string;
	data: object;
	error: object;
};

declare function defaultOK(message: string, data: object): Response;
declare function defaultCreated(message: string, data: object): Response;
declare function defaultBadRequest(error: object): Response;
declare function defaultUnauthorized(error: object): Response;
declare function defaultForbidden(error: object): Response;
declare function defaultNotFound(error: object): Response;
declare function defaultConflict(error: object): Response;
declare function defaultInternalError(error: object): Response;

export {
	defaultOK,
	defaultCreated,
	defaultBadRequest,
	defaultUnauthorized,
	defaultForbidden,
	defaultNotFound,
	defaultConflict,
	defaultInternalError,
};
