import React from "react";
import TravelSearch from "./TravelSearch/TravelSearch";
import TravelCards from "./TravelCards/TravelCards";

const Sales = () => {
  return (
    <>
      <TravelSearch />
      <TravelCards
        travelSearchData={{
          selectedDestination: "sucre",
          selectedTravelDate: "13-10-2021",
        }}
      />
    </>
  );
};

export default Sales;
