//tests
describe("Sample tests", ()=>{
    it('1==1', ()=>{
        expect(1).toBe(1);
    });
    
    it("contains frontend", ()=>{
        expect("this is frontend tests").toContain("frontend");
    });
});

export default 0