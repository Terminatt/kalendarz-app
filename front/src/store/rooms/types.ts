import { BaseItem, ValidationErrorItem } from '@generics/generics';
import { RoomType } from '@store/room-types/types';

export interface Room extends BaseItem {
  floor: string;
  type: RoomType;
}

export interface RoomErrorResponse {
  [key: string]: ValidationErrorItem;
  name: ValidationErrorItem;
}
