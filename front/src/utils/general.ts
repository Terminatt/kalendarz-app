abstract class GeneralUtils {
    static isNumber(value: unknown): value is number {
        return typeof value === 'number';
    }
}

export default GeneralUtils;
