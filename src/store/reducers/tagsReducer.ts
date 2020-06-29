import { Action, Reducer } from "redux";
import { Car, CarActionStatuses, CarsReducer } from "../../interfaces/CarInfo";
import {
  Tag,
  TagsActionStatuses,
  TagsReducer,
} from "../../interfaces/TagsInfo";

export interface TagsActionDispatch extends Action<TagsActionStatuses> {
  payload: Partial<Tag> | Partial<Tag[]>;
}

const initialState: TagsReducer = {
  tags: [
    {
      name: "",
    },
  ],
  lastStatus: TagsActionStatuses.GET_TAGS_NOT_TRIGGERED_YET,
};

export const tagsReducer: Reducer<TagsReducer, TagsActionDispatch> = (
  state: TagsReducer | undefined = initialState,
  action: any
) => {
  switch (action.type) {
    case TagsActionStatuses.GET_TAGS_SUCCESSFUL: {
      return {
        ...state,
        tags: action.payload,
        lastStatus: TagsActionStatuses.GET_TAGS_SUCCESSFUL,
      };
    }
    default:
      return { ...state, lastStatus: action.type };
  }
};
