import {createAction, props} from "@ngrx/store";
import {UserInterface} from "../interfaces/user.interface";

export const addUsers = createAction('[ADD_USERS] Add Users', props<{ usersList: UserInterface[] }>());
export const getUsers = createAction('[GET_USERS] Get Users');
