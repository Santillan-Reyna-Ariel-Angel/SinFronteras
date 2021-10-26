import React, { useState, useEffect } from "react";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import Tooltip from "@mui/material/Tooltip";
import { Background } from "./SeatStyles";
//check
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const seatsList = [];

const Seat = () => {
  const [cant, setCant] = useState(27);

  let itemNumber = [];
  const busMap = () => {
    for (let i = 0; i < cant; i++) {
      itemNumber[i] = i + 1;
    }
  };
  //   const SeatsBus = () => {
  //     let seatId = [];
  //     for (let i = 0; i < cant; i++) {
  //       seatId[i] = i + 1;
  //       let seatsData = {
  //         typeSeat: "cama",
  //         id: seatId[i],
  //         status: true,
  //       };
  //       seatsList.push(seatsData);
  //     }
  //   };

  //   useEffect(() => {
  //     SeatsBus();
  //   }, [cant]);
  //   const busMap = () => {
  //     for (let i = 1; i <= cant; i++) {
  //       let seatsData = {
  //         typeSeat: "cama",
  //         id: i,
  //         status: true,
  //       };
  //       seatsList.push(seatsData);
  //     }
  //   };

  return (
    <>
      {busMap()}
      {/* {SeatsBus()} */}
      <Background>
        {itemNumber.map((itemId) => {
          return (
            <Tooltip
              title={
                <>
                  <p>Tipo: {"cama"}</p>
                  <p>N#: {itemId}</p>
                  <p>Precio Rango: {"80bs-90bs"}</p>
                  <p>Estado: {true ? "Libre" : "Ocupado"}</p>
                </>
              }
              arrow
              placement="top"
            >
              <Checkbox
                {...label}
                icon={<EventSeatRoundedIcon fontSize="large" />}
                checkedIcon={<EventSeatRoundedIcon fontSize="large" />}
              />
            </Tooltip>
          );
        })}
      </Background>
    </>
  );
};

export default Seat;
