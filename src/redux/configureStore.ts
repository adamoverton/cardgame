import { createStore, applyMiddleware, StoreEnhancer, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { defaultState } from "src/redux/defaultState";
import { composeWithDevTools } from "redux-devtools-extension";
import { StoreState } from "src/redux/StoreState";
import { combineReducers } from "redoodle";
import { createEntityReducer } from "src/redux/EntityReducer";

const composedEnhancers: StoreEnhancer = composeWithDevTools(
    applyMiddleware(thunk),
);

const createStoreReducer = () => {
    return combineReducers<StoreState>({
        entity: createEntityReducer(),
    });
};

export const configureStore = (initialState?: StoreState) => {
    initialState = initialState || defaultState;

    return createStore<StoreState, any, any, any>(
        createStoreReducer() as Reducer<StoreState, any>,
        initialState,
        composedEnhancers,
    );
};