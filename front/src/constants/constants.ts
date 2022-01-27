export const formLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export const errorMessages: {[key: string]: string} = {
    USERNAME_TAKEN: 'Użytkownik o podanej nazwie już istnieje',
    EMAIL_TAKEN: 'Użytkownik o podanym emailu już istnieje',
    PASSWORD_TOO_SIMPLE: 'Hasło jest zbyt proste',
    INVALID_CREDENTIALS: 'Błędne hasło lub nazwa użytkownika',
    NOT_UNIQUE_NAME: 'Nazwa już została zajęta',
};

export const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb'];
export const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

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
