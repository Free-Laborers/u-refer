import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {Referral} from "../../interfaces/Referral"

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

const test_ref = [{
    id: "12",
    createdDate: new Date(),
    status: "OPEN",
    firstName: "John",
    lastName: "Doe"
  },
  {
    id: "34",
    createdDate: new Date(),
    status: "CLOSED",
    firstName: "Jane",
    lastName: "Doe"
  }]

export default function TableView(props: TableViewProps) {
    const [ rows, setRows ] = useState<GridRow[]>(test_ref);
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
                pageSize={5}
            />
        </div>
    );
}