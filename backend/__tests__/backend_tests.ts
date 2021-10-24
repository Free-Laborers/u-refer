/*temporary place for resources:
https://jestjs.io/docs/mock-functions 
https://www.prisma.io/docs/guides/testing/unit-testing 
https://jestjs.io/docs/more-resources 
https://www.npmjs.com/package/jest-mock-extended 
https://stackoverflow.com/questions/54116070/how-can-i-unit-test-non-exported-functions 

Trying to figure this one out at the moment
https://medium.com/@vittorioguerriero/typescript-mock-for-real-b15147fddd92 
*/


//import files to be used in testing
import {employeeRouterFunctions} from "../routes/employeeRouters";
//import { employeeControllersFunctions } from "../controllers/employeeControllers";
//import { createMock } from 'ts-auto-mock';
//import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended'
//import { PrismaClient } from '@prisma/client'
//import prisma from '../client'
//import { EmployeeInsert } from "../interfaces/employeeInterface";

/*
//mocking the database
jest.mock('../client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  }));

beforeEach(() => {
  mockReset(prismaMock)
})

const prismaMock = (prisma as unknown) as MockProxy<PrismaClient>

//testing the database mock
test('no tes error', () => {

    const spyEmployeeExists = jest.spyOn(prismaMock.employee, 'findUnique');
  
    console.log({spyEmployeeExists})
  })
*/

//mocking the interfaces
//const employeeInsertMock: EmployeeInsert = createMock<EmployeeInsert>();
/*const employeeInsertMock: EmployeeInsert = {
    id: '', email: '', password: '', firstName: '',
    lastName: '', pronoun: '', position: '', createdDate: new Date(10/23/21),
    isManager: false
};*/

//seperate functions from their export
const {insertClauseBuilder } = employeeRouterFunctions;
const {whereClauseBuilder} = employeeRouterFunctions;

//mock the functions here
const whereClauseBuilderMock = jest.fn(whereClauseBuilder);
const insertClauseBuilderMock = jest.fn(insertClauseBuilder);


//Actual Unit Tests
describe("Simple basic tests", ()=>{
    test("1=1", () =>{
        expect(1).toBe(1);
    });

    test("Should appear", () =>{
        expect("Free Laborers").toContain("Free");
    });
});

describe("Employee Router Tests", ()=> {
    beforeEach(()=>{
        whereClauseBuilderMock.mockClear();
        insertClauseBuilderMock.mockClear();
    });

    describe("WhereClauseBuilderFunction", ()=>{
        test("whereClauseBuilderTest", ()=> {
            let query = {
                id: "1",
                email: "test@gmail.com",
                password: "pass",
                firstName: "firstName",
                lastName: "lastName",
                pronoun: "She/Her",
                position: "manager",
                date: "12345",
                isManager: "true"
            }
            let result = whereClauseBuilderMock(query);
            expect(whereClauseBuilderMock.mock.calls.length).toBe(1);
            expect(result.id).toBe(query.id);
            expect(result.email).toBe(query.email);
            expect(result.password).toBe(query.password);
            expect(result.firstName).toBe(query.firstName);
            expect(result.lastName).toBe(query.lastName);
            expect(result.pronoun).toBe(query.pronoun);
            expect(result.position).toBe(query.position);
            expect(result.createDate).toBe(query.date);
            expect(result.isManager).toBe(true);
        });
    
        test("whereClauseBuilder test no manager field", ()=> {
            let query = {
                id: "1",
                email: "test@gmail.com",
                password: "pass",
                firstName: "firstName",
                lastName: "lastName",
                pronoun: "She/Her",
                position: "manager",
                date: "12345",
            }
            let result = whereClauseBuilderMock(query);
            expect(whereClauseBuilderMock.mock.calls.length).toBe(1);
            expect(result.id).toBe(query.id);
            expect(result.email).toBe(query.email);
            expect(result.password).toBe(query.password);
            expect(result.firstName).toBe(query.firstName);
            expect(result.lastName).toBe(query.lastName);
            expect(result.pronoun).toBe(query.pronoun);
            expect(result.position).toBe(query.position);
            expect(result.createDate).toBe(query.date);
            expect(result.isManager).toBe(undefined);
        }); 
    });

    describe("InsertClauseBuilder", ()=>{
        const query ={id: 1, email: "test@test.com", 
        password: "Welcome1", firstName:"John", lastName: "Doe",
        pronoun: "He/Him", position:"Software Engineer", date:"10/01/2021",
        isManager: "false"};
        let result = insertClauseBuilderMock(query);
        expect(insertClauseBuilderMock.mock.calls.length).toBe(1);
        expect(result.id).toBe(query.id);
        expect(result.email).toBe(query.email);
        expect(result.password).toBe(query.password);
        expect(result.firstName).toBe(query.firstName);
        expect(result.lastName).toBe(query.lastName);
        expect(result.pronoun).toBe(query.pronoun);
        expect(result.position).toBe(query.position);
        expect(result.createDate).toBe(query.date);
        expect(result.isManager).toBe(false);
    });
});
