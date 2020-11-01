import React from 'react'

const tagItemWrapper = {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    margin: 5,
}
const tagItemRemoveButton = {
    padding: 5,
    cursor: 'pointer',
    color: '#f22',
}

export const DefaultItemWrapper = ({ children, removeHandler }) => (
    <div style={tagItemWrapper}>
        {children}
        <span onClick={removeHandler} style={tagItemRemoveButton}>✕</span>
    </div>
)