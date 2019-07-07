import { createStore, applyMiddleware } from 'redux';
import { createReducer } from 'src/reducers/GameReducer';
import { StoreState } from 'src/types/StoreState';
import thunk from 'redux-thunk';
import { defaultState } from "src/defaultState";

export const configureStore = (initialState?: StoreState) => {
    initialState = initialState || defaultState;
    return createStore<StoreState, any, any, any>(
        createReducer(),
        initialState,
        applyMiddleware(thunk)
    );
};