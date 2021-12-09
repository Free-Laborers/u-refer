import { Paper, Typography } from "@mui/material";
//@ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";
import ValueWithLabel from "../../../components/ValueWithLabel";

interface ReferralPreviewCardProps {
  referral: Referral;
  onClick;
}

export default function ReferralPreviewCard(props: ReferralPreviewCardProps) {
  const {referral, onClick} = props;
  console.log(`referral`, referral)
  return(
    <Paper onClick = {onClick} sx={{ mb:2, p: 2, cursor: "pointer" }}>
      <Typography flexGrow={1} variant="h6" lineHeight={2.5}>{
      //@ts-ignore 
      referral?.JobPost?.title}
      </Typography>
      <ValueWithLabel label="Name of Referred" value={
      //@ts-ignore 
      referral?.Candidate?.firstName + " " + referral?.Candidate?.lastName} />
      <ValueWithLabel label="Email" value={
      //@ts-ignore 
      referral?.Candidate?.email} />
      <ValueWithLabel
        sx ={{
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "initial",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }} 
        label = "Reason for referral"
        value = {referral?.description}
      />
    </Paper>
  );
}