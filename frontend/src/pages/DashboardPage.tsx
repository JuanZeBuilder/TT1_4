import axios from 'axios';
import { useEffect, useState } from 'react';
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
    DataGrid, GridColDef, GridRowSelectionModel, GridToolbar, GridValueGetterParams
} from '@mui/x-data-grid';

// columns header
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.05 },
  {
    field: "title",
    headerName: "Title",
    flex: 0.2,
  },
  {
    field: "budget",
    headerName: "Budget (SGD)",
    type: "number",
    flex: 0.1,
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.1,
  },
  {
    field: "destinations",
    headerName: "Destinations",
    sortable: false,
    flex: 0.5,
    valueGetter: (params: GridValueGetterParams) => `${params.value}`,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 0.05,
    sortable: false,
    renderCell: (params) => (
      <IconButton aria-label="delete">
        <EditIcon />
        {/* todo: pop out */}
      </IconButton>
    ),
  },
];

// actual data - hardcoded for now
const rows = [
  {
    id: 1,
    title: "Sightseeing in Singapore",
    budget: 500,
    country: "Singapore",
    destinations: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island"],
  },
  {
    id: 2,
    title: "Singapore Adventure",
    budget: 800,
    country: "Singapore",
    destinations: ["Universal Studios Singapore", "Singapore Zoo"],
  },
];

export default function DashboardPage() {
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<GridRowSelectionModel>([]);
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("api/itinerary/1", {
  //       headers: { Authorization: `Bearer ${ }` },
  //     })
  //     .then((res) => {
  //       setRows(res.data);
  //     })
  //     .catch((err) => {
  //       toast(err || "Something went wrong");
  //     });
  // }, []);

  const handleDelete = () => {
    setDeleting(true);

    for (const id of selected) {
      axios
        .delete(`/api/itinerary/${id}`) // todo
        .then(() => {
          toast(`Plan with ID ${id} deleted`);
        })
        .catch((err) => {
          toast("Something went wrong");
        });
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
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
