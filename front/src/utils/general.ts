abstract class GeneralUtils {
    static isNumber(value: unknown): value is number {
        return typeof value === 'number';
    }

    static jestWorkAround() {
        window.matchMedia = (query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        });
    }
}

export default GeneralUtils;
