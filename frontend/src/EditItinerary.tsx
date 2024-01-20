import {useState, MouseEvent, ChangeEvent, FormEvent, Fragment, useEffect} from "react";
// for items in popover
import TextField from '@mui/material/TextField';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// for popover
import Button from '@mui/material/Button';
// for posting changes
import axios,{AxiosError} from "axios"

const EditItinerary = ()=>{

    const [destination, setDestination] = useState('');
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
          "destination": "Fun times in Vietnam",
          "budget": 1000,
          "country": "Vietnam"
        });
        const {destination, budget, country } = data;
        setDestination(destination);
        setBudget(budget);
        setCountry(country);
      }, []);
    // editing itinerary
    const handleSubmit = (e) => {
        e.preventDefault();
        const itinerary = {destination, budget, country};
        axios.post("", itinerary).then((response)=>{
            console.log(response.status, response.data.token);
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
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
            <DialogTitle id="alert-dialog-title">
              {"Edit Itinerary"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Destination:
                    <TextField fullWidth
                    required
                    id="destination-required"
                    value={destination}
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                    setDestination(event.target.value)
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
                        value={country}
                        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        setCountry(event.target.value)
                        }}
                    /> 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleSubmit} autoFocus>
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
}
export default EditItinerary