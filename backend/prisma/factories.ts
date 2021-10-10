import { PrismaClient, Employee, Candidate, JobPost, Referral } from '@prisma/client'
import faker from 'faker'
const prisma = new PrismaClient()

// Copied from https://medium.com/@KevinBGreene/typescript-modeling-required-fields-with-mapped-types-f7bf17688786
// Allows you to choose which fields to require from an existing interface
// Usage: RequireFields<Interface, 'required_key_1, | 'required_key_2' | ...>
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & {
  [P in K]-?: T[P]
}

// In case we want to use our own job titles
// const possiblePositions = ['Software Engineer', 'Software Developer', 'DevOps', 'Data Analyst', 'HR', 'Assistant to the Regional Manager']
// const position = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]

export const createEmployee = async (employeeData?: Partial<Employee>) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName, 'ukg.com')
  const password = faker.internet.password()
  const position = faker.name.jobTitle()
  const isManager = faker.datatype.boolean()

  const defaultData = {
    email,
    password,
    firstName,
    lastName,
    position,
    isManager,
  }

  const res = await prisma.employee.create({
    data: Object.assign(defaultData, employeeData),
  })

  return res
}

export const createCandidate = async (candidateData?: Partial<Candidate>) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName, 'ukg.com')
  const phone = faker.phone.phoneNumber()

  const defaultData = {
    email,
    firstName,
    lastName,
    phone,
  }

  const res = await prisma.candidate.create({
    data: Object.assign(defaultData, candidateData),
  })

  return res
}

export const createJobPost = async (jobPostData: RequireFields<JobPost, 'hiringManagerId'>) => {
  const title = faker.name.jobTitle()
  const position = faker.name.jobTitle() // Idk what we're expecting this field to be
  const description = faker.lorem.paragraphs(2)
  const minYearsExperience = faker.datatype.number(10)
  const salary = faker.datatype.number(150000)
  const openings = faker.datatype.number(3)

  const defaultData = {
    title,
    position,
    description,
    minYearsExperience,
    salary,
    openings,
  }

  const res = await prisma.jobPost.create({
    data: Object.assign(defaultData, jobPostData),
  })

  return res
}

export const createReferral = async (referralData: RequireFields<Referral, 'employeeId' | 'candidateId' | 'jobPostId'>) => {
  const candidateDescription = faker.lorem.paragraphs()
  const resumeFilePath = faker.internet.url()

  const defaultData = {
    candidateDescription,
    resumeFilePath,
  }

  const res = await prisma.referral.create({
    data: Object.assign(defaultData, referralData),
  })

  return res
}