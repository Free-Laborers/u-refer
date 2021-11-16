import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
//@ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";

interface GridRow {
  status: string;
  firstName: string;
  lastName: string;
  createdDate: Date;
}

interface TableViewProps {
  jobPostID: string;
  referrals: Referral[];
}

const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 250,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 250,
  },
  {
    field: "createdDate",
    headerName: "Date Created",
    type: "dateTime",
    width: 250,
  },
];

export default function DataTable(props: TableViewProps) {
  const [rows, setRows] = useState<GridRow[]>([]);

  useEffect(() => {
    fetch("referral/jobs/" + props.jobPostID)
      .then((data) => data.json())
      .then((json) => setRows(json));
  }, [props.jobPostID]);
  console.log(props.jobPostID);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid columns={columns} rows={rows} pageSize={5} />
    </div>
  );
}
