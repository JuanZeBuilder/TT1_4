import axios from 'axios';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { red } from '@mui/material/colors';

import CreateItinerary from '../CreateItinerary';
import EditItinerary from '../EditItinerary';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
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
      <IconButton aria-label="delete" onClick={setOpen(!open)}>
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
  const [title, setTitle] = useState('');
    const [destination, setDestination] = useState<string[]>([]);
    const [budget, setBudget] = useState<number>();
    const [country, setCountry] = useState('');
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // submitting new itinerary
    const handleSubmit = (e) => {
        e.preventDefault();
        const itinerary = {title, budget, country, destination};
        // console.log(itinerary)
        axios.post("api/itinerary", itinerary).then((response)=>{
            console.log(response.status, response.data.token);
        })
        handleClose()
    }
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
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
      axios.get("/").then(response => {
          const {destination, budget, country } =response.data;
          setDestination(destination);
          setBudget(budget);
          setCountry(country);
  }).catch(function (error: AxiosError) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser 
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }})})
          useEffect(() => {
            if (data) {
              const {title, budget, country, destination } = data;
              setTitle(title);
              setDestination(destination);
              setBudget(budget);
              setCountry(country);
            }
          }, [data]);
          

        const [itineraryid, setItineraryid] = useState('')
    
        const handleDelete = (id: string) => {
            axios.delete(`/api/your-endpoint/${id}`)
                .then(response => {
                console.log('Successfully deleted entry:', response.status);
                // Optionally, perform additional actions after successful deletion
                })
                .catch((error: AxiosError) => {
                console.error('Error deleting entry:', error.message);
                // Handle errors
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                    console.log('Error Status:', error.response.status);
                    console.log('Error Headers:', error.response.headers);
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
                });
        };
  

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h4" sx={{ margin: "8px 0" }}>
        Plans
      </Typography>
      <Stack spacing={2} direction="row" sx={{ margin: "4px 0" }}>
        <Button startIcon={<AddIcon />} onClick={handleClickOpen}>New Plan</Button>
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
      <Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Create New Itinerary
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Create New Itinerary"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Title:
                    <TextField fullWidth
                    required
                    id="title-required"
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                    setTitle(event.target.value)
                    }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogContent> 
              <DialogContentText id="alert-dialog-description">Budget:
              <NumberInput required 
              id="budget-required" 
              value= {budget} 
              onChange={(event, val) =>setBudget(val)}
                />
              </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>Country:
                    <TextField fullWidth
                        required
                        id="country-required"
                        // label="Country"
                        value={country}
                        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        setCountry(event.target.value)
                        }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>Destination:
                    <TextField fullWidth
                    required
                    id="destination-required"
                    // label="Destination"
                    value={destination}
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        const finalarray = event.target.value.split(',');
                        setDestination(finalarray)
                    }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleSubmit} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
        <Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Edit Itinerary
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Stack
                    gap={2}
                    direction={{
                    xs: 'row-reverse',
                    sm: 'row',
                    }}
                    sx={{
                    flexShrink: 0,
                    justifyContent:"space-between"
                    // alignSelf: { xs: 'flex-end', sm: 'center' },
                    }}
                >
                    <DialogTitle id="alert-dialog-title">{"Edit Itinerary"}</DialogTitle>
                    <Button size="small" onClick={()=>handleDelete(itineraryid)}>
                        <DeleteIcon sx={{ color: red[500] }}/>
                    </Button>
                </Stack>
                <DialogContent>
                <DialogContentText>Title:
                    <TextField fullWidth
                    required
                    id="title-required"
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                    setTitle(event.target.value)
                    }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogContent> 
              <DialogContentText id="alert-dialog-description">Budget:
              <NumberInput required 
              id="budget-required" 
              value= {budget} 
              onChange={(event, val) =>setBudget(val)}
                />
              </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>Country:
                    <TextField fullWidth
                        required
                        id="country-required"
                        // label="Country"
                        value={country}
                        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        setCountry(event.target.value)
                        }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>Destination:
                    <TextField fullWidth
                    required
                    id="destination-required"
                    // label="Destination"
                    value={destination}
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        const finalarray = event.target.value.split(',');
                        setDestination(finalarray)
                    }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                    <Button size="small" onClick={handleSubmit} variant="contained">
                    Save Changes
                    </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
    </Box>
  );
}
