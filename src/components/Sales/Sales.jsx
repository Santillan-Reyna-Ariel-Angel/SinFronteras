import React from "react";
import TravelSearch from "./TravelSearch/TravelSearch";
// import TravelCards from "./TravelCards/TravelCards";
import Seat from "./Bus/Seat/Seat";

const Sales = () => {
  return (
    <>
      <TravelSearch />
      {/* <TravelCards
        travelSearchData={{
          selectedDestination: "c. santa cruz",
          selectedTravelDate: "30-10-2021",
        }}
      /> */}
      <Seat />
    </>
  );
};

export default Sales;
