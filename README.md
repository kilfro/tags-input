# @kilfro/tags-input

> 

[![Build Status](https://travis-ci.org/kilfro/tags-input.svg?branch=master)](https://travis-ci.org/kilfro/tags-input) [![NPM](https://img.shields.io/npm/v/@kilfro/tags-input.svg)](https://www.npmjs.com/package/@kilfro/tags-input) 

## Install

```bash
npm install --save @kilfro/tags-input
```

## Usage

```jsx
import React, { useState } from 'react'
import TagsInput from '@kilfro/tags-input'

const Example = () => {
  const [tags, setTags] = useState([])

  return(
    <TagsInput values={tags} onChange={setTags} />
  )
}
```

## Props

Name | Type | Default | Description
--- | --- | --- | ---
values | array | | List of values
onChange | function | | Callback function to change values
TagItemWrapper | component | | Custom wrapper for tags. [More info](#custom-tag-wrapper)
placeholder | string | | Placeholder for input field
autoPasted | boolean | false | Automatically splitting pasted string to tags by splitter. [More info](#pasting-from-the-clipboard)
splitter | string | ```' '``` | String for autosplit long string to tags
inputStyle | object | | Inline styles for input field
inputClassName | string | | Class names for input field
tagsPosition| `'top' | 'bottom'`| `'bottom'` | Use to change position of tags list

## Custom tag wrapper 

You can use prop `TagItemWrapper` to change tag item wrapper. Your custom component has to implement two props: 
* `children` as tag values;
* `removeHandler` as callback function to remove tag.

Example:

```jsx
import React, { useState } from 'react'
import TagsInput from '@kilfro/tags-input'

const MyWrapper = ({ children, removeHandler }) => {
    const style = {
        margin: 5,
        backgroundColor: 'gray',
        fontWeight: 'bold',
        color: 'white',
    }

    return (
        <button style={style} onClick={removeHandler}>{children}</button>
    )
}

const Example = () => {
  const [tags, setTags] = useState([])

  return(
    <TagsInput 
      values={tags} 
      onChange={setTags} 
      TagItemWrapper={MyWrapper}
    />
  )
}
```
## Pasting from the clipboard

If prop `autoPasted` is `true`, input will split pasted string and add new values automatically.
You can also change splitter (by default this is `space`) using prop `splitter`.

## Key events

Tag input handles some key events:
* `Enter` - add typed value;
* `Esc` - clear input;
* `ArrowUp` - change typed value to upper case;
* `ArrowDown` - change typed value to lowwer case.

## License

MIT © [Kirill Frolov](https://github.com/kilfro)
