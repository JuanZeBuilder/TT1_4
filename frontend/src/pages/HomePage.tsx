// HomePage.tsx

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Box } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar path="home" />

      <Box style={{ marginLeft: "20px" }}>
        <h1>Welcome to TT24 Itinery Planner Group 4!</h1>
        <p style={{maxWidth: "1000px"}}>
          With the opening of borders, more are seen travelling. One key
          preparation for a trip would be to plan out an itinerary. Factor in
          travel destination and preference, expenses should be tabulated and
          spent within a given budget.
        </p>
        <p style={{maxWidth: "1000px"}}>
          Get started by logging in!
        </p>
      </Box>
    </div>
  );
};

export default HomePage;
