//import statments
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Login from '../src/pages/Login/Login';
import Home from '../src/pages/Home/Home';
import { shallow } from "enzyme";
import useAuth from '../src/hooks/useAuth';
import {BrowserRouter} from 'react-router-dom';
//import { Home } from '@mui/icons-material';
//import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import { render, screen } from '@testing-library/react';
//configure({ adapter: new Adapter() });


//tests
describe("Simple test", ()=>{
    it('1==1', ()=>{
        expect(1).toBe(1);
    });
    
    it("contains frontend", ()=>{
        expect("this is frontend tests").toContain("frontend");
    });
});

//Home Page
describe("Home Page", ()=>{
  let container: HTMLDivElement;
  beforeEach(()=>{
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<BrowserRouter>
                     <Home />
                    </BrowserRouter>, container);
  });

  afterEach(()=>{
    ReactDOM.unmountComponentAtNode(container);
  });
  
  test("Check for welcome home", ()=>{
    const link = container.querySelectorAll('h1');
    expect(link).toHaveLength(1);
    document.body.removeChild(container);
    container.remove();
  });

  test('Checks it has a paragraph and breaks between statements', () =>{
    const paragraph = container.querySelectorAll('p');
    expect(paragraph).toHaveLength(1); //only one paragraph element
    const breaks = container.querySelectorAll('br');
    expect(breaks).toHaveLength(5); //this says that there should be 5 breaks
  });
});

//Login Page
/*
having trouble with this one

describe('Login Page', () => {
  let container: HTMLDivElement;
  const useAuthMock = jest.mock('../src/hooks/useAuth', () => ({
    useClientRect: () => [300, 200, jest.fn()]
  }));
  beforeEach(()=>{
    //jest.spyOn(useAuth, 'useClientRect').mockImplementation(() => ([100, 200, jest.fn()]));
    //useAuthMock.mock
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });

  afterEach( ()=>{
    document.body.removeChild(container);
    container.remove();
  });

  test('Renders correctly initial document', () =>{
    const submitButton = container.querySelectorAll('button');
    expect(submitButton).toHaveLength(0);
  });
});
 */

//Job Feed

//Job Feed Creation