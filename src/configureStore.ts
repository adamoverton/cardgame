import { createStore, applyMiddleware } from 'redux';
import {reducer} from 'src/reducers/GameReducer';
import { StoreState } from 'src/types/StoreState';
import thunk from 'redux-thunk';

export const configureStore = (initialState: StoreState) => {
    return createStore<StoreState, any, any, any>(
        reducer as any,
        initialState,
        applyMiddleware(thunk)
    );
};