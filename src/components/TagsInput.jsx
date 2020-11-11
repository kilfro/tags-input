import { InputField } from './InputField'
import PropTypes from 'prop-types'
import React from 'react'
import { TagsList } from './TagsList'

const tagsInputWrapper = {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
}

export const TagsInput = props => {
    const { tagsPosition, values, onChange, TagItemWrapper, ...inputFieldProps } = props

    const removeHandler = valueToRemove => {
        onChange(values.filter(v => v !== valueToRemove))
    }

    const addNewValues = (...newValues) => {
        const filteredValues = newValues.map(v => v.trim())
            .filter(v => v && !values.find(val => val === v))

        onChange([...values, ...filteredValues])
    }

    return (
        <div style={tagsInputWrapper}>
            <InputField
                addNewValues={addNewValues}
                {...inputFieldProps}
            />
            <TagsList
                values={values}
                onRemove={removeHandler}
                TagItemWrapper={TagItemWrapper}
            />
        </div>
    )
}

TagsInput.propTypes = {
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    splitter: PropTypes.string,
    autoPasted: PropTypes.bool,
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    TagItemWrapper: PropTypes.elementType,
    tagsPosition: PropTypes.oneOf(['bottom', 'top']),
}

TagsInput.defaultProps = {
    splitter: ' ',
    tagsPosition: 'bottom',
}