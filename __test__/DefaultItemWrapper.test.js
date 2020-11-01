import { DefaultItemWrapper } from '../src/components/DefaultItemWrapper'
import React from 'react'
import { shallow } from 'enzyme'

describe(DefaultItemWrapper, () => {
  test('should render item value', () => {
    const value = 'Some value'
    const component = shallow(
      <DefaultItemWrapper removeHandler={() => {}}>{value}</DefaultItemWrapper>
    )

    expect(component.text()).toContain(value)
  })

  test('should call removeHandler by click', () => {
    const value = 'Some value'
    const removeHandler = jest.fn()
    const component = shallow(
      <DefaultItemWrapper removeHandler={removeHandler}>
        {value}
      </DefaultItemWrapper>
    )

    component.find('span').simulate('click')
    expect(removeHandler).toHaveBeenCalled()
  })
})
