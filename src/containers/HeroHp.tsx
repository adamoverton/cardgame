import {HeroHp} from 'src/components/HeroHp';
import {Actions} from 'src/actions/GameActions';
import {StoreState, BuffName} from 'src/types/StoreState';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

export const mapStateToProps = ({hero}: StoreState) => {
    return {
        hp: hero.hp,
        buffs: hero.buffList,
    };
};

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onIncrement: () => dispatch(Actions.ADJUST_HP({hp: 10})),
    onDecrement: () => dispatch(Actions.ADJUST_HP({hp: -10})),
    onAddBuff: () => dispatch(Actions.ADD_BUFF({buffName: BuffName.BerserkEnergy, value: 1})),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroHp);

