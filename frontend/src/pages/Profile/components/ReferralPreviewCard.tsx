import { Chip, Paper, Stack, Typography } from "@mui/material";
//@ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";
import ValueWithLabel from "../../../components/ValueWithLabel";

interface ReferralPreviewCardProps {
  referral: Referral;
  onClick;
}

export default function ReferralPreviewCard(props: ReferralPreviewCardProps) {
  const {referral, onClick} = props;
  return(
    <Paper onClick = {onClick} sx={{ mb:2, p: 2, cursor: "pointer" }}>
      <Typography>
        {referral.id}
      </Typography>
      <Stack direction = "row" spacing = {0.5} mb = {2}>
        {
          //@ts-ignore
          referral.Referral.map(r =>(
            <Chip
            label = {r.Tag.name}
            variant = "filled"
            color = "default"
            />
          ))

        }

      </Stack>
      <ValueWithLabel
        sx ={{
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "initial",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }} 
        label = "Description"
        value = {referral?.description}
      />
    </Paper>
  );
}