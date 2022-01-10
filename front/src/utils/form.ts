import { ResponseError } from '@generics/generics';
import { Rule } from 'antd/lib/form';

export const getRequiredRule = (): Rule => ({ required: true, message: 'To pole jest wymagane' });

export const getMaxCharRule = (max: number, message: string): Rule => ({ max, message });

export const getMinCharRule = (min: number, message: string): Rule => ({ min, message });

export const getEmailRule = (message: string): Rule => ({ type: 'email', message });

export const getRepeatPasswordRule = (fieldName: string): Rule => ({ getFieldValue }) => ({
    validator: (_, value) => {
        if (getFieldValue(fieldName) === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Dwa podane hasła różnią się od siebie'));
    },
});

export const getNumericPasswordRule = (): Rule => () => ({
    validator: (_, value: string) => {
        const reg = /^\d+$/;
        if (value === '' || (value && !reg.test(value))) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Hasło nie może składać się z samych cyfr'));
    },
});

export const getSpecialCharacterPasswordRule = (): Rule => () => ({
    validator: (_, value: string) => {
        const reg = /(?=.*[!@#$%^&*])/;
        if (value && reg.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Hasło musi zawierać chociaż jeden ze specjalnych symboli !, @, #, $, %, ^, &, *'));
    },
});

export const parseErrorResponse = (errorResponse: ResponseError, errorMessages: {[key: string]: string}): Array<{name: string, errors: string[]}> => {
    const entries = Object.entries(errorResponse);
    const errors: Array<{name: string, errors: string[]}> = [];

    // TODO SERVE ARRAY CASE
    entries.forEach((el) => {
        if (el[1] && !Array.isArray(el[1])) {
            errors.push({ name: el[0], errors: [errorMessages[el[1].type]] });
        }
    });

    return errors;
};
