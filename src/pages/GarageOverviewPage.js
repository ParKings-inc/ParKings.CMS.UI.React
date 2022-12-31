import React, { useState, useEffect } from "react";
import { Select, MenuItem, Drawer, TextField } from "@mui/material";
import MapCanvasComponent from "../components/garage-map-overview/MapCanvasComponent";
import { getAllGarage } from "../services/GarageService";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const GarageOverviewPage = () => {
  const [garageid, setGarageId] = useState("");
  const [garages, setGarages] = useState([]);
  const [Floors, setFloors] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [spaceString, setSpaceString] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [rerenderCounter, setRerenderCounter] = useState(0);

  useEffect(() => {
    getAllGarage()
      .then((data) => {
        setGarages(data);
      })
      .catch((error) => {});
  }, []);

  function assingFloors(floors) {
    console.log(floors);
    setFloors(floors);
  }

  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);

  return (
    <>
      <div>GarageOverviewPage</div>
      <br></br>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "1%" }}>
          <h2>Garage selector</h2>
          <Select
            style={{ width: "100%", height: "10%" }}
            value={garageid}
            title="Garage selector"
            onChange={(e) => {
              setGarageId(e.target.value);
            }}
          >
            {Array.isArray(garages)
              ? garages.length > 0
                ? garages.map((garage) => {
                    return (
                      <MenuItem key={garage.id} value={garage.id}>
                        {garage.name}
                      </MenuItem>
                    );
                  })
                : null
              : null}
          </Select>
          <br></br>
          <h2>Floor</h2>
          <Select
            style={{ width: "100%", height: "10%" }}
            value={selectedFloor}
            title="Garage selector"
            onChange={(e) => {
              setSelectedFloor(e.target.value);
            }}
          >
            {Array.isArray(Floors)
              ? Floors.length > 0
                ? Floors.map((floor) => {
                    return (
                      <MenuItem key={floor} value={floor}>
                        {floor}
                      </MenuItem>
                    );
                  })
                : null
              : null}
          </Select>
          <h2>Enable/Disable Spaces</h2>
          <p>Space string</p>
          <TextField
            onChange={(e) => {
              setSpaceString(e.target.value);
            }}
          ></TextField>
          <Button
            style={{ marginTop: "5%" }}
            variant="contained"
            onClick={(e) => {
              setRerenderCounter((e) => {
                return rerenderCounter + 1;
              });
            }}
          >
            {selectedStatus === 3 ? "Enable" : "Disable"}
          </Button>
        </div>
        <MapCanvasComponent
          garageId={garageid}
          floorSetter={assingFloors}
          floorSelection={selectedFloor}
          selectedSpot={spaceString}
          selectedSpotStatus={setSelectedStatus}
          rerenderCounter={rerenderCounter}
        />
      </div>
    </>
  );
};

export default GarageOverviewPage;
