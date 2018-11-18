import { HeroHp } from '../components/HeroHp';
import { adjustHp } from '../actions/GameActions';
import { StoreState } from '../types/StoreState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({ hp }: StoreState) {
    console.log("Hp from store: " + hp.toString())
    return {
      hp,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onIncrement: () => dispatch(adjustHp({hp: 10})),
        onDecrement: () => dispatch(adjustHp({hp: -10})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroHp);

