import {createReducer, on} from "@ngrx/store";
import {StoreInterface} from "../interfaces/store.interface";
import {addUsers, getUsers} from "./user.action";

export const UserStoreState: StoreInterface = {
  usersList: []
};

export const userReducer = createReducer(
  UserStoreState,

  on(addUsers, (state, action) => ({
    usersList: [...action.usersList, ...state.usersList]
  })),

  on(getUsers, state => ({
    ...state
  }))
);
