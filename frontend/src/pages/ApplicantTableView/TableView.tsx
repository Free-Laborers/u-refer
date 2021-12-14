import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Modal, Box, Typography } from '@mui/material';
import ValueWithLabel from "../../components/ValueWithLabel";
import Referral from "../../interfaces/Referral";
import useAxios from "axios-hooks";
import { Redirect } from "react-router";

// interface GridRow {
//     status: string,
//     firstName: string,
//     lastName: string,
//     createdDate: string
// }

interface TableViewProps {
    jobPostID: string
}

const columns: GridColDef[] = [
    {
        field: 'status',
        headerName: "Status",
        width: 150
    },
    {
        field: 'firstName',
        headerName: "First Name",
        width: 250
    },
    {
        field: 'lastName',
        headerName: "Last Name",
        width: 250
    },
    {
        field: 'createdDate',
        headerName: "Date Created",
        type: 'dateTime',
        width: 225
    }
]

export default function TableView(props: TableViewProps) {
    const [{ data, error }] = useAxios<Referral[]>({
        url: "/referral/jobPost/" + props.jobPostID,
        headers: {
            Authorization: localStorage.getItem('authorization')
        }
    });
    const [referral, setReferral] = useState<Referral>();
    const handleClose = () => setReferral(undefined);

    if (error) {
        return <Redirect to='/jobs' />;
    }

    return (
        <Box sx={{ mt: 2, height: '100%' }}>
            <Typography variant="h3">
                Referalls:
            </Typography>
            <DataGrid
                columns={columns}
                rows={data ? data.map(ref => {
                    return {
                        id: ref.id,
                        referral: ref,
                        status: ref.status,
                        firstName: ref.Candidate.firstName,
                        lastName: ref.Candidate.lastName,
                        createdDate: new Date(ref.createdDate)
                    }
                }) : []}
                //change handleOpen() parameter to selected referral
                onRowClick={(row) => {
                    setReferral(row.row.referral)
                }}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />

            <Modal
                open={referral !== undefined}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
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
                        referral?.description} />
                    <ValueWithLabel label="Resume File Path" value={
                        referral?.resumeFilePath || "N/A"} />
                </Box>
            </Modal>
        </Box>
    );
}