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
export const MONTH_NAMES = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

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
