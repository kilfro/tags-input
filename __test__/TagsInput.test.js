import { InputField } from '../src/components/InputField'
import React from 'react'
import { TagsInput } from '../src/components/TagsInput'
import { TagsList } from '../src/components/TagsList'
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
      tagsPosition: 'bottom',
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

  test('should change tags position', () => {
    const bottomPosition = getComponent({ tagsPosition: 'bottom' })
    expect(bottomPosition.find('div').children().first().type()).toEqual(
      InputField
    )

    const topPosition = getComponent({ tagsPosition: 'top' })
    expect(topPosition.find('div').children().first().type()).toEqual(TagsList)
  })
})
