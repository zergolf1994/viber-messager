"use client"

import React from 'react'
import { Button } from './button'


export const ButtonExample = () => {
    return (
        <div className="space-y-3">
            <ButtonColors />
            <ButtonOutline />
            <ButtonSize />
            <ButtonRadius />
            <ButtonWidthFull />
        </div>
    )
}

const ButtonColors = () => {
    const array = ["primary", "danger", "secondary", "success", "warning"]
    return (
        <div className="flex items-end gap-2">
            {array.map((text) =>
                <Button
                    key={text}
                    colors={text as any}
                >
                    Click Me
                </Button>
            )}
        </div>
    )
}
const ButtonOutline = () => {

    const array = ["primary", "danger", "secondary", "success", "warning"]
    return (
        <div className="flex items-end gap-2">
            {array.map((text) =>
                <Button
                    key={text}
                    colors={text as any}
                    variant="outline"
                >
                    Click Me
                </Button>
            )}
        </div>
    )
}
const ButtonSize = () => {
    const array = ["none", "sm", "md", "lg"]
    return (
        <div className="flex items-end gap-2">
            {array.map((text) =>
                <Button
                    key={text}
                    size={text as any}
                >
                    Click Me
                </Button>
            )}
        </div>
    )

}

const ButtonRadius = () => {

    const array = ["none", "sm", "md", "lg", "full"]
    return (
        <div className="flex items-end gap-2">
            {array.map((text) =>
                <Button
                    key={text}
                    radius={text as any}
                >
                    Click Me
                </Button>
            )}
            {array.map((text) =>
                <Button
                    key={text}
                    radius={text as any}
                    variant="outline"
                >
                    Click Me
                </Button>
            )}
        </div>
    )
}

const ButtonWidthFull = () => {

    const array = ["none", "sm", "md", "lg"]
    return (
        <div className="space-y-2">
            {array.map((text) =>
                <Button
                    key={text}
                    size={text as any}
                    widthFull
                >
                    Click Me
                </Button>
            )}
        </div>
    )
}