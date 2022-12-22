import React, { useEffect } from "react";
import styles from "../styles/pages/RevenuePage.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { TextField } from "@mui/material";
import { getRevenue } from "../services/RevenueService";

const RevenuePage = () => {
  const [date, setDate] = useState();
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getRevenue(date).then((e) => {
      setRevenue(e.data);
    });
  }, [date]);

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
            <h1>{revenue}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenuePage;
