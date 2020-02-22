import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import 'src/components/Battlefield.scss';
import { BattlefieldTile } from 'src/redux/BattlefieldTypes';
import { Tile } from 'src/components/Tile';
import { connect } from 'react-redux';
import { StoreState } from 'src/redux/StoreState';

export interface BattlefieldProps {
    grid: BattlefieldTile[][];
}

const cellStateToColor: { [key: number]: string } = {
    1: "white",
    2: "brown",
    3: "red",
    4: "lightblue",
    5: "darkgrey",
    6: "green",
  };

export class BaseBattlefield extends PureComponent<BattlefieldProps> {
    render(): ReactNode {
        const {
            grid,
        } = this.props;

        return (
            <div className="battlefield">
                <table><tbody>
                {
                    grid.map((column: BattlefieldTile[], colIndex) => {
                        return (
                            <React.Fragment key={colIndex}>
                                <tr>
                                    {column.map((cell, rowIndex) => {
                                        return (
                                            <React.Fragment key = {rowIndex}>
                                                <td>
                                                    <Tile 
                                                        row={rowIndex} 
                                                        col={colIndex} 
                                                        color={cellStateToColor[cell.terrain]} 
                                                        // tslint:disable-next-line:jsx-no-lambda
                                                        onClick={(col: number, row: number) => {
                                                            console.log("Clicked on: " + colIndex + ", " + rowIndex);
                                                        }}
                                                        />
                                                </td>
                                            </React.Fragment>
                                        );
                                    })}
                                </tr>
                            </React.Fragment>
                        );
                    })
                }
                </tbody></table>
            </div>
        );
    }
}

export const mapStateToProps = (store: StoreState) => {
    return {
        grid: store.battlefield.grid,
    };
};

export const Battlefield = connect<BattlefieldProps>(mapStateToProps)(BaseBattlefield);