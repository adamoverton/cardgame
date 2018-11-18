import { handleActions } from 'redux-actions';

export interface initialStateType {
  hp: number;
}

const initialState = {
  hp: 10,
};

export const reducer = handleActions<initialStateType>(
  {
      ADJUST_HP: (state, action) => {
          return {
              ...state,
              hp: state.hp + action.payload!.hp,
          };
      },
  },
  initialState,
);