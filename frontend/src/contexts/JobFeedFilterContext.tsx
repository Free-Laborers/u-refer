import React, { createContext, useContext, useState } from "react";

interface JobFeedFilterContextType {
  searchString: string,
  minSalary: number,
  maxSalary: number, 
  minExperience: number,
  maxExperience: number,
  tags: string[],
  setSearchString: (searchString: string) => any,
  setMinSalary: (minSalary: number) => any,
  setMaxSalary: (maxSalary: number) => any,
  setMinExperience: (minExperience: number) => any,
  setMaxExperience: (maxExperience: number) => any,
  setTags: (tags: string[]) => any
}

const JobFeedFilterContext = createContext<JobFeedFilterContextType>({
  searchString: '',
  minSalary: 0,
  maxSalary: 0, 
  minExperience: 0,
  maxExperience: 0,
  tags: [],
  setSearchString: (x: any) => {},
  setMinSalary: () => {},
  setMaxSalary: () => {},
  setMinExperience: () => {},
  setMaxExperience: () => {},
  setTags: () => {},
})

export const JobFeedFilterContextProvider = ({children}) => {
  // TODO fetch initial values from backend
  const [searchString, setSearchString] = useState('')
  const [minSalary, setMinSalary] = useState(0)
  const [maxSalary, setMaxSalary] = useState(100000)
  const [minExperience, setMinExperience] = useState(0)
  const [maxExperience, setMaxExperience] = useState(10)
  const [tags, setTags] = useState<string[]>([])

  const initialValue = {
    searchString,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
    tags,
    setSearchString,
    setMinSalary,
    setMaxSalary,
    setMinExperience,
    setMaxExperience,
    setTags
  }
  return <JobFeedFilterContext.Provider value={initialValue}>{children}</JobFeedFilterContext.Provider>
}

const useJobFeedFilters = () => {
  return useContext(JobFeedFilterContext)
}

export default useJobFeedFilters