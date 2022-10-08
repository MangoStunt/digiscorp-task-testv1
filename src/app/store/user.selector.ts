import {StoreInterface} from "../interfaces/store.interface";
import {createFeatureSelector, createSelector} from "@ngrx/store";

const getUserState = createFeatureSelector<StoreInterface>('users');

export const selectUsers = createSelector(getUserState,(state: StoreInterface) => state.usersList);
