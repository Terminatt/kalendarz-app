export const FORM_LAYOUT = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export const VALIDATION_ERROR_MESSAGES: {[key: string]: string} = {
    USERNAME_TAKEN: 'Użytkownik o podanej nazwie już istnieje',
    EMAIL_TAKEN: 'Użytkownik o podanym emailu już istnieje',
    PASSWORD_TOO_SIMPLE: 'Hasło jest zbyt proste',
    INVALID_CREDENTIALS: 'Błędne hasło lub nazwa użytkownika',
    NOT_UNIQUE_NAME: 'Nazwa już została zajęta',
};

export const DAY_NAMES = ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb'];
export const DAY_NAMES_FULL = ['Niedziela', 'Poniedzialek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
export const MONTH_NAMES = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
export const WORKING_HOURS = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

export enum Month {
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER,
}

export const PAGE_SIZE = 10;

export const DEBOUNCE_TIME = 350; // miliseconds

export enum RequestErrorType {
    RELATED_OBJECT = 'RELATED_OBJECT'
}
