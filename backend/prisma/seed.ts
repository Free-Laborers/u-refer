import { createEmployee, createCandidate, createJobPost, createReferral } from "./factories"


const main = async () => {
  // TODO
  // Add seed data (using the factories)
  // Note that certain factories have dependent fields (e.g. to create a job post, you must use the ID of an existing manger for the hiringManagerId)
  for (let i = 0; i < 10; ++i) {
    console.log(i)
    const m = await createEmployee({isManager: true})
    const e = await createEmployee({isManager: true})
    for(let i = 0; i < 3; ++i){
      createJobPost({hiringManagerId: m.id})
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
