import { Typography, Box } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FieldDisplayProps {
  text: string;
}

const FieldDisplay = (props: FieldDisplayProps) => {
  const { text } = props;
  return (
    <Typography sx={{ ml: 2 }} gutterBottom color="GrayText">
      {text}
    </Typography>
  );
};

const DescriptionAccordion = (props: FieldDisplayProps) => {
  const { text } = props;
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          backgroundColor: "#eee",
          boxShadow: "none",
        }} //update pls
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography color="GrayText">
          {text.substring(0, 31) + "..."}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "#eee",
          boxShadow: "none",
        }}
      >
        <Typography color="GrayText">{text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const ReviewSection: React.FC = (props) => {
  const { children } = props;
  return (
    <Box borderRadius={1} paddingX={2} mb={2} paddingY={1} bgcolor="#eee">
      {children}
    </Box>
  );
};

interface ReviewPageProps {
  name: string;
  email: string;
  phone: string;
  recommendation: string;
  resumeFileName: string;
}

export default function ReviewPage(props: ReviewPageProps) {
  const { name, email, phone, recommendation, resumeFileName } = props;
  return (
    <Box>
      <Typography gutterBottom variant="h6">
        Review
      </Typography>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>Personal</Typography>
        <FieldDisplay text={`Name: ${name || "*Required"}`} />
        <FieldDisplay text={`Email: ${email || "*Required"}`} />
        <FieldDisplay text={`Phone: ${phone || "N/A"}`} />
      </ReviewSection>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>Recommendation</Typography>
        <DescriptionAccordion text={recommendation || "*Required"} />
        {/* <FieldDisplay
          text={recommendation.substring(0, 31) + "..." || "*Required"}
        /> */}
      </ReviewSection>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>Documents</Typography>
        <FieldDisplay text={resumeFileName || "*Required"} />
      </ReviewSection>
    </Box>
  );
}
