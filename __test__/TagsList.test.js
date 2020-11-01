import React from 'react'
import { TagItem } from '../src/components/TagItem'
import { TagsList } from '../src/components/TagsList'
import { shallow } from 'enzyme'

describe(TagsList, () => {
  test('should render all values', () => {
    const values = ['one', 'two', 'three']
    const component = shallow(<TagsList values={values} />)

    const items = component.find(TagItem)
    expect(items.length).toEqual(values.length)
  })

  test('should send value to every item', () => {
    const values = ['one', 'two', 'three']
    const component = shallow(<TagsList values={values} />)

    const items = component.find(TagItem)
    const itemsValues = items.map((i) => i.props().value)
    expect(values.join(' ')).toEqual(itemsValues.join(' '))
  })

  test('should send onRemove function to every item', () => {
    const props = {
      values: ['one', 'two', 'three'],
      onRemove: jest.fn(),
    }
    const component = shallow(<TagsList {...props} />)
    const items = component.find(TagItem)

    items.forEach((i) => expect(i.props().onRemove).toEqual(props.onRemove))
  })

  test('should send TagItemWrapper function to every item', () => {
    const props = {
      values: ['one', 'two', 'three'],
      TagItemWrapper: ({ children }) => <div>{children}</div>,
    }
    const component = shallow(<TagsList {...props} />)
    const items = component.find(TagItem)

    items.forEach((i) => expect(i.props().TagItemWrapper).toEqual(props.TagItemWrapper))
  })
})
