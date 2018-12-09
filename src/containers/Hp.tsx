import {StoreState} from 'src/types/StoreState';
import {connect} from 'react-redux';
import { BaseHp } from 'src/components/BaseHp';

export const mapStateToProps = ({hero}: StoreState) => {
    return {
        hp: hero.hp,
    };
};

export const Hp = connect(mapStateToProps, undefined)(BaseHp);
