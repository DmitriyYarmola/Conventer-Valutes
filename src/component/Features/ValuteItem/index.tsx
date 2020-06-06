import React from 'react'
import './valuteItem.sass'

type PropsType = {
	key: string
	buy: string
	ccy: string
	sale: string
}
export const ValuteItem: React.FC<PropsType> = ({
	buy,
	sale,
	key,
	ccy,
}) => {
	return (
		<div className='valute-item' key={key}>
			<span>{ccy}</span>
			<div className='item-title_buy'>
				Buy: {Number(buy).toFixed(2)}
			</div>
			<div className='item-title_sale'>
				Sale: {Number(sale).toFixed(2)}
			</div>
		</div>
	)
}
