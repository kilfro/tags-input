import React from 'react'
import { TagsInput } from '../src/components/TagsInput'
import { mount } from 'enzyme'

describe(TagsInput, () => {
  const getComponent = (customProps) => {
    const props = {
      values: ['one', 'two', 'three'],
      onChange: () => {},
      placeholder: 'Type in here...',
      splitter: ', ',
      autoPasted: true,
      inputStyle: {},
      inputClassName: 'custom-class',
      TagItemWrapper: ({ children, removeHandler }) => (
        <div onClick={removeHandler}>{children}</div>
      ),
      ...customProps,
    }

    return mount(<TagsInput {...props} />)
  }
  test('should render correctly', () => {
    const component = getComponent()

    expect(component).toMatchSnapshot()
  })

  test('should call onChange function correctly when remove item', () => {
    const onChange = jest.fn()
    const component = getComponent({
      onChange,
      TagItemWrapper: undefined,
    })

    component.find('TagItem[value="two"]').find('span').simulate('click')
    expect(onChange).toHaveBeenCalledWith(['one', 'three'])
  })

  test('should call onChange function correctly when new item was added', () => {
    const onChange = jest.fn()
    const component = getComponent({
      onChange,
      autoPasted: false,
    })

    component
      .find('input')
      .simulate('change', { target: { value: 'four' } })
      .simulate('keydown', { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith(['one', 'two', 'three', 'four'])
  })
})
