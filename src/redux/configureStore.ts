import { createDefaultState } from './defaultState';
import { createStore, applyMiddleware, StoreEnhancer, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { StoreState } from "src/redux/StoreState";
import { combineReducers } from "redoodle";
import { createEntityReducer } from "src/redux/EntityReducer";
import { createTargetingReducer } from "src/redux/TargetingReducer";
import { createBattlefieldReducer } from 'src/redux/BattlefieldReducer';

const composedEnhancers: StoreEnhancer = composeWithDevTools(
    applyMiddleware(thunk),
);

const createStoreReducer = () => {
    return combineReducers<StoreState>({
        entity: createEntityReducer(),
        targeting: createTargetingReducer(),
        battlefield: createBattlefieldReducer(),
    });
};

export const configureStore = (initialState?: StoreState) => {
    const defaultState = createDefaultState();
    initialState = initialState || defaultState;

    return createStore<StoreState, any, any, any>(
        createStoreReducer() as Reducer<StoreState, any>,
        initialState,
        composedEnhancers,
    );
};