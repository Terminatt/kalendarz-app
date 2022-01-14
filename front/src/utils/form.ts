import { ResponseError } from '@generics/generics';
import { Rule } from 'antd/lib/form';

export function getRequiredRule(): Rule {
    return { required: true, message: 'To pole jest wymagane' };
}

export function getMaxCharRule(max: number, message: string): Rule {
    return { max, message };
}

export function getMinCharRule(min: number, message: string): Rule {
    return { min, message };
}

export function getEmailRule(message: string): Rule {
    return { type: 'email', message };
}

export function getRepeatPasswordRule(fieldName: string): Rule {
    return ({ getFieldValue }) => ({
        validator: (_, value) => {
            if (getFieldValue(fieldName) === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Dwa podane hasła różnią się od siebie'));
        },
    });
}

export function getNumericPasswordRule(): Rule {
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

export function getSpecialCharacterPasswordRule(): Rule {
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
