import React, { useEffect, useRef } from "react";
import styles from "../styles/pages/RevenuePage.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { TextField } from "@mui/material";
import { getRevenue } from "../services/RevenueService";

import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';

const RevenuePage = () => {
  const [date, setDate] = useState();
  const [revenue, setRevenue] = useState(0);

  const latestRevenue = useRef(null);

  latestRevenue.current = revenue;

  const isInitialMount = useRef(true);

  useEffect(() => {
    getRevenue(date).then((e) => {
      console.log(e);
      setRevenue(e.data);
    });
  }, [date]);

  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return
    }

    const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7205/hubs/revenue')
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(result => {
            console.log('Connected!');

            connection.on('ReceiveRevenue', message => {
              console.log("Do refresh")                

                console.log('received revenue', message);

                setRevenue(message);
            });
        })
        .catch(e => console.log('Connection failed: ', e));
    isInitialMount.current = true;
}, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "80vh",
        }}
      >
        <div style={{ width: "50%", textAlign: "center" }}>
          <h1>Revenue</h1>
          <div className={styles.Card}>
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Selected Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <h1>Total revenue selected day:</h1>
            <h1>€{revenue}</h1>
          </div>
        </div>
      </div>
    </>
  );
};


export default RevenuePage;
