import React, { CSSProperties, Fragment } from 'react';
import 'src/components/Tile.scss';

export interface TileProps {
    row: number;
    col: number;
    color: string;
    onClick: (col: number, row: number) => void;
}

export const Tile: React.FC<TileProps> = (props) => {
    const inlineStyle: CSSProperties = {
        backgroundColor: props.color,
    };

    const onTileClick = (): void => {
        props.onClick(props.col, props.row)
    }

    return (
        <div className="tile" style={inlineStyle} onClick={ onTileClick } >
            <Fragment>{props.children}</Fragment>
        </div>
    );
}

