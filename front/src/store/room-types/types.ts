import { BaseItem, ValidationErrorItem } from '@generics/generics';

export interface RoomType extends BaseItem {
    color: string;
}

export interface RoomTypeErrorResponse {
    [key: string]: ValidationErrorItem;
    name: ValidationErrorItem;
}
