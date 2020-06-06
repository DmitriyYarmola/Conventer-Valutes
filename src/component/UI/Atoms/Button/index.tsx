import React from 'react'
import { Button as ButtonMU} from '@material-ui/core'


type PropsType = {
    content: string
    variant: "text" | "outlined" | "contained" | undefined
    color: "inherit" | "primary" | "secondary" | "default" | undefined
}

export const Button:React.FC<PropsType> = ({content, variant, color}) => {
    return (
        <ButtonMU variant={variant} color={color}>{content}</ButtonMU>
    )
}