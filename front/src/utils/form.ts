import { ResponseError } from '@generics/generics';
import { Rule } from 'antd/lib/form';

abstract class FormUtils {
    static getRequiredRule(): Rule {
        return { required: true, message: 'To pole jest wymagane' };
    }

    static getMaxCharRule(max: number, message: string): Rule {
        return { max, message };
    }

    static getMinCharRule(min: number, message: string): Rule {
        return { min, message };
    }

    static getEmailRule(message: string): Rule {
        return { type: 'email', message };
    }

    static getRepeatPasswordRule(fieldName: string): Rule {
        return ({ getFieldValue }) => ({
            validator: (_, value) => {
                if (getFieldValue(fieldName) === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Dwa podane hasła różnią się od siebie'));
            },
        });
    }

    static getNumericPasswordRule(): Rule {
        return () => ({
            validator: (_, value: string) => {
                const reg = /^\d+$/;
                if (value === '' || (value && !reg.test(value))) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Hasło nie może składać się z samych cyfr'));
            },
        });
    }

    static getSpecialCharacterPasswordRule(): Rule {
        return () => ({
            validator: (_, value: string) => {
                const reg = /(?=.*[!@#$%^&*])/;
                if (value && reg.test(value)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Hasło musi zawierać chociaż jeden ze specjalnych symboli !, @, #, $, %, ^, &, *'));
            },
        });
    }

    static parseErrorResponse(errorResponse: ResponseError, errorMessages: {[key: string]: string}): Array<{name: string, errors: string[]}> {
        const entries = Object.entries(errorResponse);
        const errors: Array<{name: string, errors: string[]}> = [];

        // TODO SERVE ARRAY CASE
        entries.forEach((el) => {
            if (el[1] && !Array.isArray(el[1])) {
                errors.push({ name: el[0], errors: [errorMessages[el[1].type]] });
            }
        });

        return errors;
    }
}

export default FormUtils;
