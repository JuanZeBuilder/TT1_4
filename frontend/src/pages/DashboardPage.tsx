import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {
    DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams
} from '@mui/x-data-grid';

// columns header
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "budget",
    headerName: "Budget (SGD)",
    type: "number",
    width: 150,
  },
  {
    field: "country",
    headerName: "Country",
    width: 110,
  },
  {
    field: "destinations",
    headerName: "Destinations",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <IconButton aria-label="delete">
        <EditIcon />
        {/* todo: pop out */}
      </IconButton>
    ),
  },
];

// actual data
const rows = [
  { id: 1, title: "Snow", budget: "Jon", country: 14 },
  { id: 2, title: "Lannister", budget: "Cersei", country: 31 },
  { id: 3, title: "Lannister", budget: "Jaime", country: 31 },
  { id: 4, title: "Stark", budget: "Arya", country: 11 },
  { id: 5, title: "Targaryen", budget: "Daenerys", country: null },
  { id: 6, title: "Melisandre", budget: null, country: 150 },
  { id: 7, title: "Clifford", budget: "Ferrara", country: 44 },
  { id: 8, title: "Frances", budget: "Rossini", country: 36 },
  { id: 9, title: "Roxie", budget: "Harvey", country: 65 },
];

export default function DashboardPage() {
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<GridRowSelectionModel>([]);

  const handleDelete = () => {
    setDeleting(true);

    for (const id of selected) {
      toast(id);
      //   axios
      //     .get(`/`) // todo
      //     .then(() => {
      //       toast(`Plan with ID ${id} deleted`);
      //     })
      //     .catch((err) => {
      //       toast("Something went wrong");
      //     });
    }
    setDeleting(false);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h4" sx={{ margin: "8px 0" }}>
        Plans
      </Typography>
      <Stack spacing={2} direction="row" sx={{ margin: "4px 0" }}>
        <Button startIcon={<AddIcon />}>New Plan</Button>
        <LoadingButton
          startIcon={<DeleteIcon />}
          loading={deleting}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(params) => setSelected(params)} // todo: delete
      />
    </Box>
  );
}
