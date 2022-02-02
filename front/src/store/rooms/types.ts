import { BaseItem, ValidationErrorItem } from '@generics/generics';
import { RoomType } from '@store/room-types/types';

export interface BaseRoom extends BaseItem {
  floor: string;
}

export interface Room extends BaseRoom {
  type: RoomType;
  created: string;
}

export interface RoomWithTypeId extends BaseRoom {
  type: number;
}

export interface RoomErrorResponse {
  [key: string]: ValidationErrorItem;
  name: ValidationErrorItem;
}
