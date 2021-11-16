import Home from '../src/pages/Home/Home';
import { render } from '@testing-library/react';

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
});


    
describe('Home Page', () => {
    let container;
    beforeAll(() => {
        container = render(<Home />)
    })

    test("Check for welcome home", () => {
        const header = container.getByRole('heading');
        expect(header.innerHTML).toEqual("Welcome home!");
    });

    test('Checks it has a paragraph and breaks between statements', () => {
        const paragraph = container.getByTestId('paragraph');
        expect(paragraph.getElementsByTagName('br')).toHaveLength(5);
    });
});