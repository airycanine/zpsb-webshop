import { Action } from "redux";
import { Customer } from "./CustomerInfo";

export enum TagsActionStatuses {
  GET_TAGS_PENDING = "GET_TAGS_PENDING",
  GET_TAGS_SUCCESSFUL = "GET_TAGS_SUCCESSFUL",
  GET_TAGS_FAILED = "GET_TAGS_FAILED",
  GET_TAGS_NOT_TRIGGERED_YET = "GET_TAGS_NOT_TRIGGERED_YET",
}

export interface TagsActionDispatch extends Action<TagsActionStatuses> {
  payload: Partial<Tag> | Partial<Tag[]>;
}
export interface Tag {
  name: string;
}

export interface TagsReducer {
  tags: Tag[];
  lastStatus: string;
}
