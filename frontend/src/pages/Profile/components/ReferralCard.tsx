import { Box, Button, Paper, Typography } from "@mui/material";
import ValueWithLabel from "../../../components/ValueWithLabel";
// @ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";

interface ReferralCardProps {
    referral: Referral;
}

export default function ReferralCard(props: ReferralCardProps){
    const { referral } = props;
    const ReferralCardContent = referral ? (
    <Box height="100%" display="flex" flexDirection="column" overflow = "auto">
        <Box flexGrow={1}>
          <Box mb={3} display="flex">
                <Typography flexGrow={1} variant="h6">{
                //@ts-ignore 
                referral?.JobPost?.title}
                </Typography>
            </Box>
            <ValueWithLabel label="Name of Referred" value={
            //@ts-ignore 
            referral?.Candidate?.firstName + " " + referral?.Candidate?.lastName} />
            <ValueWithLabel label="Email" value={
            //@ts-ignore 
            referral?.Candidate?.email} />
            <ValueWithLabel label="Pronouns" value={
            //@ts-ignore 
            referral?.Candidate?.pronoun || "N/A"} />
            <ValueWithLabel label="Phone" value={
            //@ts-ignore 
            referral?.Candidate?.phone || "N/A"} />
            <ValueWithLabel label="Reason for Referral" value={
            referral?.description + referral?.description + referral?.description} />
            <ValueWithLabel label="Resume File Path" value={
            referral?.resumeFilePath || "N/A"} />
        </Box>
        <Button variant="contained" color="primary">
            Edit/Delete
      </Button>
    </Box>
    ) : (
    <Typography variant="subtitle1" component="h2" align="center">
        Click on a referral for more details!
        Then, you can click on a job title for more details about the job!
    </Typography>
    );

    
    return (
        <Paper sx={{ p: 2, height: "100%" }}>
            {ReferralCardContent}
        </Paper>
    );
}
