import { Dispatch } from "redux";
import axios from "axios";
import {
  API_ENDPOINT,
  CARS_POSTFIX,
  CUSTOMERS_POSTFIX,
} from "../../../consts/endpoints";
import { toastr } from "react-redux-toastr";
import {
  Tag,
  TagsActionDispatch,
  TagsActionStatuses,
} from "../../../interfaces/TagsInfo";

export const setTags = (
  tags: Tag[],
  dispatch: Dispatch<TagsActionDispatch>
) => {
  getTagsSuccess(tags, dispatch);
};

const getTagsPending = (dispatch: Dispatch<TagsActionDispatch>) => {
  dispatch({
    type: TagsActionStatuses.GET_TAGS_PENDING,
    payload: {},
  });
};

const getTagsSuccess = (
  Tags: Tag[],
  dispatch: Dispatch<TagsActionDispatch>
) => {
  dispatch({
    type: TagsActionStatuses.GET_TAGS_SUCCESSFUL,
    payload: Tags,
  });
};
const getTagsFailed = (dispatch: Dispatch<TagsActionDispatch>) => {
  dispatch({
    type: TagsActionStatuses.GET_TAGS_FAILED,
    payload: {},
  });
};
