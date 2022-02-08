import { ResponseError } from '@generics/generics';

export function parseErrorResponse(errorResponse: ResponseError, ERROR_MESSAGES: {[key: string]: string}):
Array<{name: string, errors: string[]}> {
    const entries = Object.entries(errorResponse);
    const errors: Array<{name: string, errors: string[]}> = [];

    // TODO SERVE ARRAY CASE
    entries.forEach((el) => {
        if (el[1] && !Array.isArray(el[1])) {
            errors.push({ name: el[0], errors: [ERROR_MESSAGES[el[1].type]] });
        }
    });

    return errors;
}
