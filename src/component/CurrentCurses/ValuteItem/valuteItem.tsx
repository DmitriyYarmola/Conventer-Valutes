import React from 'react'
import './valuteItem.sass'

type PropsType = {
    key: string
    buy: string;
    ccy: string;
    sale: string;
}
export const ValuteItem: React.FC<PropsType> = ({ buy, sale, key, ccy }) => {
    return (
        <div className="valute-item" key={key}>
            <span>{ccy}</span>
            <div className="item-title_buy">Buy: {buy}</div>
            <div className="item-title_sale">Sale: {sale}</div>
        </div>
    )
}