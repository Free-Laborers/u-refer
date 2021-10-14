import * as React from 'react'
import ReactDOM from 'react-dom'
//import App from './App'
describe("Simple test", ()=>{
    it('1==1', ()=>{
        expect(1).toBe(1);
    });
    
    it("contains frontend", ()=>{
        expect("this is frontend tests").toContain("frontend");
    });
});