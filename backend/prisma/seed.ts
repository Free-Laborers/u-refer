import { PrismaClient } from '@prisma/client'
import faker from 'faker'
const prisma = new PrismaClient()

// In case we want to use our own job titles
const possiblePositions = [
  'Software Engineer',
  'Software Developer',
  'DevOps',
  'Data Analyst',
  'HR',
  'Assistant to the Regional Manager',
]

const createEmployee = async () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName, 'ukg')
  const password = faker.internet.password()
  // Chooses random position
  // const position = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]
  const position = faker.name.jobTitle()
  const isManager = faker.datatype.boolean()

  prisma.employee.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      position,
      isManager
    }
  })
}

const main = async () => {

  for(let i = 0; i < 10; ++i){
    createEmployee()
  }
  
}


main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
