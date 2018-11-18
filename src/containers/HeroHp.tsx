import {HeroHp} from 'src/components/HeroHp';
import {adjustHp} from 'src/actions/GameActions';
import {StoreState} from 'src/types/StoreState';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

export const mapStateToProps = ({hp}: StoreState) => {
    console.log("Hp from store: " + hp.toString());
    return {
        hp,
    };
};

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onIncrement: () => dispatch(adjustHp({hp: 10})),
    onDecrement: () => dispatch(adjustHp({hp: -10})),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroHp);

