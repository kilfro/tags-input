import { DefaultItemWrapper } from '../src/components/DefaultItemWrapper'
import React from 'react'
import { TagItem } from '../src/components/TagItem'
import { shallow } from 'enzyme'

describe(TagItem, () => {
  test('should render default wrapper', () => {
    const component = shallow(
      <TagItem value='Some value' onRemove={() => {}} />
    )

    expect(component.find(DefaultItemWrapper)).toHaveLength(1)
  })

  test('should send item value to default wrapper', () => {
    const value = 'Some text'
    const component = shallow(<TagItem value={value} onRemove={() => {}} />)

    const defaultWrapper = component.find(DefaultItemWrapper)
    expect(defaultWrapper.props().children).toEqual(value)
  })

  test('should send onRemove function to default wrapper', () => {
    const onRemove = jest.fn()
    const value = 'Some text'
    const component = shallow(<TagItem value={value} onRemove={onRemove} />)

    const defaultWrapper = component.find(DefaultItemWrapper)
    defaultWrapper.props().removeHandler()
    expect(onRemove).toHaveBeenCalledWith(value)
  })

  test('should render prop wrapper', () => {
    const PropWrapper = () => {}
    const component = shallow(
      <TagItem
        value='Some value'
        onRemove={() => {}}
        TagItemWrapper={PropWrapper}
      />
    )

    expect(component.find(PropWrapper)).toHaveLength(1)
  })

  test('should send item value to prop wrapper', () => {
    const value = 'Some text'
    const PropWrapper = ({ children }) => <div>{children}</div>
    const component = shallow(
      <TagItem value={value} onRemove={() => {}} TagItemWrapper={PropWrapper} />
    )

    const propWrapper = component.find(PropWrapper)
    expect(propWrapper.props().children).toEqual(value)
  })

  test('should send onRemove function to prop wrapper', () => {
    const onRemove = jest.fn()
    const value = 'Some text'
    const PropWrapper = ({ children, removeHandler }) => (
      <div onClick={removeHandler}>{children}</div>
    )
    const component = shallow(
      <TagItem value={value} onRemove={onRemove} TagItemWrapper={PropWrapper} />
    )

    const propWrapper = component.find(PropWrapper)
    propWrapper.props().removeHandler()
    expect(onRemove).toHaveBeenCalledWith(value)
  })
})
