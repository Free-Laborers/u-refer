import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NoMatch() {
  const homeURL = localStorage.getItem('authorization') ? '/jobs' : '/login';

  // you can change to go back if u want using useHistory i think.

  return (
    <>
      <Typography>Error: page not found.</Typography>
      <Link to={homeURL}>Go Home</Link>
    </>
  )
}