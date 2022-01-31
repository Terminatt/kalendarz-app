import { BaseItem, ValidationErrorItem } from '@generics/generics';

export interface RoomType extends BaseItem {
    color: string;
}

export interface RoomTypeCreateErrorResponse {
    [key: string]: ValidationErrorItem;
    name: ValidationErrorItem;
}
