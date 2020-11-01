import React from 'react'
import { TagItem } from './TagItem'

const tagsListBlock = {
    display: "flex",
    flexWrap: "wrap",
}

export const TagsList = ({ values, onRemove, TagItemWrapper }) => (
    <div style={tagsListBlock}>
        {values.map(v => <TagItem key={v} value={v} onRemove={onRemove} TagItemWrapper={TagItemWrapper} />)}
    </div>
)