import { DefaultItemWrapper } from './DefaultItemWrapper'
import React from 'react'

export const TagItem = ({ value, onRemove, TagItemWrapper = DefaultItemWrapper }) => (
    <TagItemWrapper removeHandler={() => onRemove(value)}>
        {value}
    </TagItemWrapper>
)