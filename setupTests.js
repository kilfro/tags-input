import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'
import { configure } from 'enzyme'

configure({ adapter: new Adapter() })

global.window = new JSDOM('<!doctype html><html><body></body></html>').window
global.document = window.document
