import {createReducer, on} from "@ngrx/store";
import {addUsers, getUsers} from "./user.action";
import {StoreInterface} from "../interfaces/store.interface";

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
