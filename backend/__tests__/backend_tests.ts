//imports
import {employeeRouterFunctions} from "../routes/employeeRouters";
import { createMock } from 'ts-auto-mock';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import prisma from "../clientForTesting";

///seperate functions from their export
const { whereClauseBuilder } = employeeRouterFunctions;
const { insertClauseBuilder } = employeeRouterFunctions;
//const { getEmployees } = employeeControllersFunctions;
//const {createOneEmployee} = employeeControllersFunctions;


//mocking the database
//reference: https://www.prisma.io/docs/guides/testing/unit-testing
jest.mock('../clientForTesting', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  }));

const prismaMock = ( prisma as unknown) as MockProxy<PrismaClient>

test('testing the database mock', () => {

    const spyEmployeeExists = jest.spyOn(prismaMock.employee, 'findUnique');
  
    console.log({spyEmployeeExists})
  });

//mock the functions here
const whereClauseBuilderMock = jest.fn(whereClauseBuilder);
const insertClauseBuilderMock = jest.fn(insertClauseBuilder);



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
                date: "2021-08-07",
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
            expect(result.createdDate).toBe(query.date);
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
                date: "2021-11-01",
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
            expect(result.createdDate).toBe(query.date);
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
        expect(result.createdDate).toBe(query.date);
        expect(result.isManager).toBe(false);
    });
});
