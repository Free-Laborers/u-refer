import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Referral } from "../../interfaces/Referral";
import { Modal, Box } from '@mui/material';
import ValueWithLabel from "../../components/ValueWithLabel";


interface GridRow {
    status: string,
    firstName: string,
    lastName: string,
    createdDate: Date
}

interface TableViewProps {
    jobPostID: string
    referrals: Referral[]
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
        width: 250
    }
]

//test data - delete later
const test_rows = [{
    id: "12",
    createdDate: new Date(),
    status: "OPEN",
    firstName: "John",
    lastName: "Doe"
}]
const test_refs = [{
    id: "JohnDoe",
    employeeId: "1234",
    candidateId: "12",
    jobPostId: "test",
    description: "John would be a great fit for this role",
    resumeFilePath: null,
    createdDate: new Date(),
    contactedDate: null,
    finishedDate: null,
    status: "OPEN",
    deletedDate: null,
    Candidate: {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@mail.com",
        phone: "1234567890",
        pronoun: "he/him"
    }
}]

export default function TableView(props: TableViewProps) {
    const [rows, setRows] = useState<GridRow[]>(test_rows);
    const [open, setOpen] = useState(false);
    const [referral, setReferral] = useState<Referral>();
    function handleOpen(ref) {
        setReferral(ref)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    /*
    useEffect(() => {
        fetch('referral/jobs/' + props.jobPostID)
            .then(data => data.json())
            .then(json => setRows(json))
    }, [props.jobPostID]);
    console.log(props.jobPostID);
    */
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                //change handleOpen() parameter to selected referral
                onRowClick={(rowData) => handleOpen(test_refs[0])}
                pageSize={5}
            />

            <Modal
                open={open}
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
        </div>
    );
}