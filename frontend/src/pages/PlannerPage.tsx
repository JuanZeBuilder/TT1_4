// Planner.tsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { callOpenAPI } from "../helper/openAI";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Itinerary } from "../model/Itinerary";
import { getAllItineraries, getAllItinerary } from "../api/getAllItineraries";

const PlannerPage: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [plannedItineraryText, setPlannedItineraryText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [itinerariesList, setItineriesList] = useState<Itinerary[]>([]);
  const { isLoggedIn, user, webToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/home");
      return;
    }

    getItineries();
  }, []);

  const getItineries = async () => {
    if (user == null) return;

    const list = await getAllItineraries(user.id, webToken);
    // const list = [
    //   {
    //     title: "Sightseeing in Singapore",
    //     budget: 500,
    //     country: "Singapore",
    //     destinations: [
    //       "Marina Bay Sands",
    //       "Gardens by the Bay",
    //       "Sentosa Island",
    //     ],
    //   },
    //   {
    //     title: "Singapore Adventure",
    //     budget: 800,
    //     country: "Singapore",
    //     destinations: ["Universal Studios Singapore", "Singapore Zoo"],
    //   },
    // ];
    console.log(list);
    setItineriesList(list);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setIsCopied(false); // Reset the copied state when selecting a new itinerary
    setPlannedItineraryText("");
  };

  const planItinerary = async () => {
    // Add your API call logic here
    // You can use selectedItinerary to fetch the details of the selected itinerary
    setPlannedItineraryText("Loading...");

    const text = await callOpenAPI(itinerariesList[selectedValue]);

    setPlannedItineraryText(text);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(plannedItineraryText);
    setIsCopied(true);
  };

  return (
    <div>
      <Navbar path="planner" />
      <Box style={{ marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3">AI Planner</Typography>
        <Typography>
          Effortlessly plan your dream itinerary within your budget using our
          intuitive and free service in one minute.
        </Typography>
      </Box>
      {isLoggedIn && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          minHeight="100vh"
          style={{
            marginTop: "20px",
            maxWidth: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography>Choose an Itinerary</Typography>
          <FormControl>
            <Select
              value={selectedValue}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Select" }}
            >
              <MenuItem value="" disabled>
                Select an itinerary
              </MenuItem>
              {itinerariesList.map((itinerary, index) => (
                <MenuItem key={index} value={index}>
                  {itinerary.title} - {itinerary.country} - {itinerary.destinations.join(", ")}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={planItinerary}
              style={{ marginTop: "20px" }}
            >
              Help Me Plan!
            </Button>
          </FormControl>
          <Box>
            {plannedItineraryText && (
              <Box style={{ marginTop: "20px" }}>
                <Typography variant="body1">{plannedItineraryText}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCopyToClipboard}
                  disabled={isCopied} // Disable the button when it's already clicked
                  style={{ marginTop: "10px" }}
                >
                  {isCopied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default PlannerPage;
