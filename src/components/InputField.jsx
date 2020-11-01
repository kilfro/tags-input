import React from 'react'
import { useInputState } from './useInputState'

const tagsInputField = {
    flex: 1,
    border: 'none',
    borderBottom: 'solid black 1px',
    margin: 5,
    padding: 5,
    outline: 'none',
}

export const InputField = props => {
    const { setValue, reset, ...inputState } = useInputState()
    const { addNewValues, splitter, autoPasted, inputStyle, inputClassName, ...inputProps } = props

    const keyHolder = event => {
        switch (event.key) {
            case 'Enter':
                addNewValues(inputState.value)
                reset()
                break
            case 'Escape':
                reset()
                break
            case 'ArrowUp':
                setValue(prev => prev.toUpperCase())
                break
            case 'ArrowDown':
                setValue(prev => prev.toLowerCase())
                break
            default:
                return
        }
    }

    const onPasteHandler = event => {
        if (autoPasted) {
            event.preventDefault()
            const pastedData = event.clipboardData.getData('text')
            const arr = pastedData.split(splitter)

            addNewValues(...arr)
        }
    }

    return (
        <input
            type='text'
            onKeyDown={keyHolder}
            onPaste={onPasteHandler}
            style={{ ...tagsInputField, ...inputStyle }}
            className={inputClassName}
            {...inputProps}
            {...inputState}
        />
    )
}