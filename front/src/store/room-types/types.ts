import { BaseItem, ValidationErrorItem } from '@generics/generics';

export interface BaseRoomType extends BaseItem {
    name: string;
    color: string;
}

export interface RoomType extends BaseRoomType {
    created: string;
}

export interface RoomTypeErrorResponse {
    [key: string]: ValidationErrorItem;
    name: ValidationErrorItem;
}
