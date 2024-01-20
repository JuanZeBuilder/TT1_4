import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllItineraries, getAllItinerary } from "../api/getAllItineraries";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth } from "../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {
    DataGrid, GridColDef, GridRowSelectionModel, GridToolbar, GridValueGetterParams
} from '@mui/x-data-grid';
import { Itinerary } from "../model/Itinerary";
import Navbar from '../components/Navbar/Navbar';
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
// const rows = [
//   {
//     id: 1,
//     title: "Sightseeing in Singapore",
//     budget: 500,
//     country: "Singapore",
//     destinations: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island"],
//   },
//   {
//     id: 2,
//     title: "Singapore Adventure",
//     budget: 800,
//     country: "Singapore",
//     destinations: ["Universal Studios Singapore", "Singapore Zoo"],
//   },
// ];

export default function DashboardPage() {
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<GridRowSelectionModel>([]);
  const [itinerariesList, setItineriesList] = useState<Itinerary[]>([]);
  const { isLoggedIn, user, webToken } = useAuth();


  useEffect(() => {
    const getItineries = async () => {
      if (user == null) return;
  
      const list = await getAllItineraries(user.id, webToken);

      console.log(list);
      setItineriesList(list);
    };
    getItineries()
  }, [])



  return (
    <Box sx={{ height: 400, width: "100%" }}>
    <Navbar path='dashboard' />
      <Typography variant="h4" sx={{ margin: "8px 0" }}>
        Plans
      </Typography>
      <Stack spacing={2} direction="row" sx={{ margin: "4px 0" }}>
        <Button startIcon={<AddIcon />}>New Plan</Button>
      </Stack>
      <DataGrid
        rows={itinerariesList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
 
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
