import React from 'react'
import { TextField } from '@material-ui/core'

type PropsType = {
	type: string
	inputProps: any
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	color: 'primary' | 'secondary' | undefined
}

export const Input: React.FC<PropsType> = ({
	type,
	inputProps,
	value,
	onChange,
	placeholder,
	color,
}) => {
	return (
		<TextField
			type={type}
			inputProps={inputProps}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			color={color}
		/>
	)
}
