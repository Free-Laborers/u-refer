import { Autocomplete, AutocompleteRenderInputParams, Checkbox, FormControlLabel, TextField } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import { useState } from 'react';

// TODO(luna): This could (should) be used elsewhere
// NOTE(luna): This is what i was proposing for how to do the typing and parsing
// over the network
type EmployeeResponse = {
  id: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  pronoun: string | null,
  position: string,
  // This should be parsed
  createdDate: string,
  isManager: boolean,
};
type Employee = Omit<EmployeeResponse, 'createdDate'> & {
  createdDate: Date,
};
type SuggestionResponse = { 'employees': EmployeeResponse[] };
type Suggestion = Employee[];
function parseEmployeeResponse(er: EmployeeResponse): Employee {
  return {
    ...er,
    createdDate: new Date(er.createdDate),
  };
}
function parseSuggestionResponse(sr: SuggestionResponse): Suggestion {
  console.log(sr);
  return sr.employees.map(parseEmployeeResponse);
}

// Names should not be split into first and last, in general. Here we make do
// with our current schema
function fullName(employee: Employee): string {
  return employee.firstName + ' ' + employee.lastName;
}

export default function ReviewPage() {
  const [suggestions, setSuggestions] = useState<Employee[]>([]);
  const [internal, setInternal] = useState<boolean>(false);
  // This is the (only) state that should be lifted up somehow to the owning
  // modal dialogue. This should probably be done by someone who ties together
  // all four steps (or whoever does step 4)
  const [employee, setEmployee] = useState({
    id: null as string | null,
    name: '',
    email: '',
    description: '',
  });
  // For internal employees, we present an autocomplete dialog
  const autocomplete =
    <Autocomplete
      renderInput={function (params: AutocompleteRenderInputParams): React.ReactNode {
        // Much like our non-suggested version, but with an error flag and no onChange
        return <TextField
          required
          // If we've typed stuff and invalidated our employee pick, then
          // indicate that!
          error={employee.id === null}
          margin="normal"
          {...params}
          label="Candidate Name"
        />;
      }}
      options={suggestions.map(fullName)}
      onInputChange={_.debounce((event, value, reason) => {
        // onInputChange fires on selection too. Don't refetch and don't reset
        // employee id
        if (reason === 'input') {
          axios.get<SuggestionResponse>('/employee/suggestion', {
            params: {data: {name: value}},
            headers: { Authorization: localStorage.getItem("authorization") },
          }).then((response) => {
            if (response.status === 200) {
              console.log(response);
              setSuggestions(parseSuggestionResponse(response.data));
            } else {
              console.error('got error response from server when fetching suggestion.');
              console.error(response.status, response.data);
              // Some handling could be done here, but probably not necessary
              // (what to do?)
            }
          });
          // If we've typed a name rather than selected, we have no internal employee
          setEmployee((e) => ({
            ...e,
            name: value,
            id: null,
          }));
        }
      })}
      onChange={(event, value) => {
        const oneEmployee = suggestions.filter((s) => fullName(s) === value);
        if (oneEmployee.length > 1) {
          console.error("TODO(luna): how shall we distinguish people with the exact same name?");
        } else if (oneEmployee.length === 0) {
          console.error('Selected a suggestion which at one time existed, but no longer does (debouncing error?)');
          return;
        }
        const chosen = oneEmployee[0];
        setEmployee({
          id: chosen.id,
          email: chosen.email,
          name: fullName(chosen),
          description: employee.description,
        });
      }}
      value={employee.name}
    />;
  // For external employees, a simple dialog
  const simple = 
    <TextField
      margin="normal"
      required
      fullWidth
      label="Candidate Name"
      autoFocus
      value={employee.name}
      onChange={(event) => setEmployee({...employee, name: event.target.value})}
    />;
  return (
    <>
      <FormControlLabel
        control={<Checkbox
          onChange={(event, value) => {
            setInternal(value);
            // Remove id to mark it's not internal
            if (!value) {
              setEmployee((e) => ({
                ...e,
                id: null,
              }));
            }
          }}
          value={internal}
        />}
        label="This is an internal employee"
      />
      {internal ? autocomplete : simple}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Candidate Email"
        value={employee.email}
        // Set the relevant field and invalidate internal employee
        onChange={(event) => setEmployee({...employee, email: event.target.value, id: null})}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        rows={10}
        label="Why would they be a good fit?"
        value={employee.description}
        onChange={(event) => setEmployee({...employee, description: event.target.value})}
      />
    </>
  );
}
