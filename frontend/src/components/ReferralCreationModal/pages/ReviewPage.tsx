import { Typography, Box } from "@mui/material";
import React from "react";

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
  resumeFilePath: string;
}

export default function ReviewPage(props: ReviewPageProps) {
  const { name, email, phone, recommendation, resumeFilePath } = props;
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
        <FieldDisplay text={recommendation || "*Required"} />
      </ReviewSection>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>Documents</Typography>
        <FieldDisplay text={resumeFilePath || "*Required"} />
      </ReviewSection>
    </Box>
  );
}
