import {useState, MouseEvent, ChangeEvent, FormEvent, Fragment, useEffect} from "react";
// for items in popover
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { red } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

// for popover
import Button from '@mui/material/Button';
// for posting changes
import axios,{AxiosError} from "axios"

const EditItinerary = ()=>{

    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState<string[]>([]);
    const [budget, setBudget] = useState<number>(0);
    const [country, setCountry] = useState('');
    const [open, setOpen] = useState(false);

    const [data, setData] = useState<any>(null);
    // useEffect(()=>{
    //     axios.get("/").then(response => {
            // const {destination, budget, country } =response.data;
            // setDestination(destination);
            // setBudget(budget);
            // setCountry(country);
    // }).catch(function (error: AxiosError) {
    //         if (error.response) {
    //           // The request was made and the server responded with a status code
    //           // that falls out of the range of 2xx
    //           console.log(error.response.data);
    //           console.log(error.response.status);
    //           console.log(error.response.headers);
    //         } else if (error.request) {
    //           // The request was made but no response was received
    //           // `error.request` is an instance of XMLHttpRequest in the browser 
    //           // and an instance of http.ClientRequest in node.js
    //           console.log(error.request);
    //         } else {
    //           // Something happened in setting up the request that triggered an Error
    //           console.log('Error', error.message);
    //         }})})
    
    useEffect(() => {
        setData({
            "title": "Sightseeing in Vietnam",
          "budget": 1000,
          "country": "Vietnam",
          "destination": "Fun times in Vietnam",

        });
      }, []);
      
      useEffect(() => {
        if (data) {
          const {title, budget, country, destination } = data;
          setTitle(title);
          setDestination(destination);
          setBudget(budget);
          setCountry(country);
        }
      }, [data]);
      
    // editing itinerary
    const handleSubmit = (e) => {
        e.preventDefault();
        const itinerary = {title, budget, country, destination};
        axios.post("", itinerary).then((response)=>{
            console.log(response.status, response.data.token);
        })
    }
    const [itineraryid, setItineraryid] = useState('')
    const handleClickOpen = event => {
        setOpen(true); 
        console.log(event.currentTarget.id);
        setItineraryid(event.currentTarget.id);
    };

      const handleClose = () => {
        setOpen(false);
      };

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

    return(
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
      );
}
export default EditItinerary