import {useState, MouseEvent, ChangeEvent, FormEvent, Fragment} from "react";
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
import axios from "axios"

const CreateItinerary = () => {
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
        console.log(itinerary)
        // axios.post("http://127.0.0.1:3000/", itinerary).then((response)=>{
        //     console.log(response.status, response.data.token);
        // })
        handleClose()
    }
    return (
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
      );
}

export default CreateItinerary