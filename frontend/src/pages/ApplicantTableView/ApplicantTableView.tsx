import { Box, Button } from "@mui/material";
import TableView from "./TableView";
import PositionCard from "./PositionCard";
import { useHistory } from "react-router-dom";

const ApplicantTableView = (props) => {
  const history = useHistory();
  const { id } = props.match.params;

  return (
    <>
      <Box
        m={2}
        display="grid"
        height="100%"
        gridTemplateRows="auto 1fr auto"
        gridTemplateColumns="1fr 1fr"
        columnGap={2}
      >
        <Box>
          <PositionCard jobPostID={id} />
          <Button onClick={history.goBack} variant="contained" color="primary">Go back</Button>
        </Box>
        <Box>
          <TableView jobPostID={id}></TableView>
        </Box>
      </Box>
    </>
  );
};


export default ApplicantTableView;
