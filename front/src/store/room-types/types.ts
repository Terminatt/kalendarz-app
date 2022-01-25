import { BaseItem, ValidationErrorItem } from '@generics/generics';

export interface RoomType extends BaseItem {
    name: string;
    color: string;
}

export interface RoomTypeCreateErrorResponse {
    [key: string]: ValidationErrorItem;
    name: ValidationErrorItem;
}
