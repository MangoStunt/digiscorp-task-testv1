import {createFeatureSelector, createSelector} from "@ngrx/store";
import {StoreInterface} from "../interfaces/store.interface";

const getUserState = createFeatureSelector<StoreInterface>('users');
export const selectUsers = createSelector(getUserState, (state: StoreInterface) => state.usersList);
