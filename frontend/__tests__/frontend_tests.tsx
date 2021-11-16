import Home from '../src/pages/Home/Home';
import { render } from '@testing-library/react';
import { BreakfastDiningTwoTone } from '@mui/icons-material';


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
jest.mock('../src/hooks/useAuth', () => {
  return jest.fn(() => {
    return {
      user: {
        id: "0",
        email: "admin@test.com",
        firstName: "admin",
        lastName: "test",
        position: "Managerial Manager",
        createdDate: Date(),
        isManager: true
      },
      login: () => undefined,
      logout: () => undefined
    }
  });
})
  
describe('Home Page', () => {
  test("Check for welcome home", ()=>{
    const container = render(<Home />);
    const header = container.getByRole('heading');
    expect(header.innerHTML).toEqual("Welcome home!");
  });

  test('Checks it has a paragraph and breaks between statements', () =>{
    const { getByTestId } = render(<Home />);
    const paragraph = getByTestId('paragraph');
    expect(paragraph.getElementsByTagName('br')).toHaveLength(5);
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