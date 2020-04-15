import * as React from 'react';
import {PureComponent, ReactNode, Fragment} from 'react';
import 'src/components/Battlefield.scss';
import { BattlefieldTile } from 'src/redux/BattlefieldTypes';
import { Tile } from 'src/components/Tile';
import { connect } from 'react-redux';
import { StoreState } from 'src/redux/StoreState';
import { Entity } from 'src/models/Entity';
import { EntityComponent } from 'src/components/EntityComponent';

export interface BattlefieldProps {
    grid: BattlefieldTile[][];
    entityList: { [key: string]: Entity};
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
        const getEntityForTile = (entityId: string) => {
            if (this.props.entityList[entityId]) {
                return <EntityComponent entity={this.props.entityList[entityId]} smallDisplay={true} showHp={true} />
            } else {
                return <Fragment />
            }
        }

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
                                                        >
                                                        { getEntityForTile(grid[rowIndex][colIndex].entityId) }
                                                    </Tile>
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
        entityList: store.entity.entityList,
    };
};

export const Battlefield = connect<BattlefieldProps>(mapStateToProps)(BaseBattlefield);