import Home from '../src/pages/Home/Home';
import { render, screen } from '@testing-library/react';

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
    test("Check for welcome home", () => {
        render(<Home />);
        const header = screen.getByRole('heading');
        expect(header.innerHTML).toEqual("Welcome home!");
    });

    test('Checks it has a paragraph and breaks between statements', () => {
        render(<Home />);
        const paragraph = screen.getByTestId('paragraph');
        expect(paragraph.getElementsByTagName('br')).toHaveLength(5);
    });
});