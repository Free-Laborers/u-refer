
/* beforeEach((done) =>{
    //conect to the database
});
*/

/* afterEach((done) =>{
    //
});*/

describe("Simple basic tests", ()=>{
    test("1=1", () =>{
        expect(1).toBe(1);
    });

    test("Should appear", () =>{
        expect("Free Laborers").toContain("Free");
    });
});

