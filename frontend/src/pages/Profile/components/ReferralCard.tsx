import { Box, Button, Paper, styled, Typography } from "@mui/material";
import ValueWithLabel from "../../../components/ValueWithLabel";
// @ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";

interface ReferralCardProps {
    referral: Referral;
}

export default function ReferralCard(props: ReferralCardProps){
    const { referral } = props;
    const ReferralCardContent = referral ? (
    <Box height="100%" display="flex" flexDirection="column">
        <Box flexGrow={1} >
            <Box mb={3} display="flex">
                <Typography flexGrow={1} variant="h6">
                {"Job Title"}
                </Typography>
            </Box>
            <ValueWithLabel label="Name" value={"Fname Lname"} />
            <ValueWithLabel label="Email" value={"email@email.com"} />
            <ValueWithLabel label="Phone" value={"000-000-0000"} />
            <ValueWithLabel label="Reason" value={referral?.description} />
        </Box>
        <Button variant="contained" color="primary" >
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
