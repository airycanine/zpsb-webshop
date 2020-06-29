import { Dispatch } from "redux";
import { Tag, TagsActionDispatch } from "../../../interfaces/TagsInfo";
import { Customer } from "../../../interfaces/CustomerInfo";
import { setTags } from "./getAllTagsDispatcher";

export class TagActionsDispatcher {
  private readonly dispatch: Dispatch<TagsActionDispatch>;

  constructor(dispatch: Dispatch<TagsActionDispatch>) {
    this.dispatch = dispatch;
  }

  getTags = (tags: Tag[]) => setTags(tags, this.dispatch);
}
