import { InputField } from '../src/components/InputField'
import React from 'react'
import { shallow } from 'enzyme'

describe(InputField, () => {
  const getComponent = (customProps) => {
    const props = {
      addNewValues: () => {},
      autoPasted: false,
      splitter: ' ',
      ...customProps,
    }

    return shallow(<InputField {...props} />)
  }

  test("should add new value by 'Enter' press", () => {
    const addFunction = jest.fn()
    const newValue = 'newValue'
    const component = getComponent({ addNewValues: addFunction })

    component.simulate('change', { target: { value: newValue } })
    component.simulate('keydown', { key: 'Enter' })

    expect(addFunction).toHaveBeenCalledWith(newValue)
  })

  test("should clear input by 'Esc' press", () => {
    const newValue = 'newValue'
    const component = getComponent()

    component.simulate('change', { target: { value: newValue } })
    component.simulate('keydown', { key: 'Escape' })

    expect(component.props().value).toEqual('')
  })

  test("should change value to upper case by 'ArrowUp' press", () => {
    const newValue = 'newValue'
    const component = getComponent()

    component.simulate('change', { target: { value: newValue } })
    component.simulate('keydown', { key: 'ArrowUp' })

    expect(component.props().value).toEqual(newValue.toUpperCase())
  })

  test("should change value to lower case by 'ArrowDown' press", () => {
    const newValue = 'NeWValUe'
    const component = getComponent()

    component.simulate('change', { target: { value: newValue } })
    component.simulate('keydown', { key: 'ArrowDown' })

    expect(component.props().value).toEqual(newValue.toLowerCase())
  })

  test('should do nothig if another keys was pressed', () => {
    const newValue = 'new_value'
    const addFunction = jest.fn()

    const component = getComponent({ addNewValues: addFunction })

    component.simulate('change', { target: { value: newValue } })
    component.simulate('keydown', { key: 'Shift' })

    expect(component.props().value).toEqual(newValue)
    expect(addFunction).not.toHaveBeenCalled()
  })

  test('should add new values by passing', () => {
    const props = {
      addNewValues: jest.fn(),
      autoPasted: true,
    }
    const component = getComponent(props)
    const passedString = 'one two three'
    const event = {
      clipboardData: { getData: jest.fn().mockReturnValueOnce(passedString) },
      preventDefault: () => {},
    }

    component.simulate('paste', event)

    expect(props.addNewValues).toHaveBeenCalledWith(...passedString.split(' '))
  })

  test('should not add new values by passing if this was not switched on', () => {
    const props = {
      addNewValues: jest.fn(),
    }
    const component = getComponent(props)
    const passedString = 'one two three'
    const event = {
      clipboardData: { getData: jest.fn().mockReturnValueOnce(passedString) },
    }

    component.simulate('paste', event)

    expect(props.addNewValues).not.toHaveBeenCalled()
  })
})
