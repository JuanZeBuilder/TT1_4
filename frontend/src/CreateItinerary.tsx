import {useState, MouseEvent, ChangeEvent, FormEvent} from "react";
// for items in popover
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

// for popover
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// for posting changes
import axios from "axios"

const CreateItinerary = () => {
    const [destination, setDestination] = useState('');
    const [budget, setBudget] = useState<number>();
    const [country, setCountry] = useState('');
    
    // popover
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    }

    // submitting new itinerary
    const handleSubmit = (e) => {
        e.preventDefault();
        const itinerary = {destination, budget, country};
        axios.post("http://127.0.0.1:3000/", itinerary).then((response)=>{
            console.log(response.status, response.data.token);
        })
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <div className = "create">
            <Button aria-describedby={id} variant = "contained" onClick={handleClick}>
                Create New Itinerary
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}>
                <div style ={{
                    width: '1000px',
                    height: '400px'
                }}>
                {/* <FormControl fullWidth> */}
                <div>
                <TextField fullWidth
                required
                id="destination-required"
                label="Destination"
                value={destination}
                onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                    setDestination(event.target.value)
                }}
                />
                </div>
                <div>
                <NumberInput
                required
                id="budget-required"
                value= {budget}
                onChange={(event, val) =>setBudget(val)}
                />
                </div>
                <div>
                <TextField fullWidth
                required
                id="country-required"
                label="Country"
                value={country}
                onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                    setCountry(event.target.value)
                }}
                />
                </div>
                {/* </FormControl> */}
                </div>
                <Button aria-describedby={id} variant = "contained" onClick={handleSubmit}>
                Submit
            </Button>
            </Popover>
        </div>
    )
}



export default CreateItinerary