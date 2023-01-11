import React, { useState, useEffect } from "react";
import { Select, MenuItem, Drawer, TextField } from "@mui/material";
import MapCanvasComponent from "../components/garage-map-overview/MapCanvasComponent";
import { getAllGarage } from "../services/GarageService";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { getAllSpaceStates, putSpace } from "../services/SpaceService";
import { HubConnectionBuilder } from "@microsoft/signalr";

const GarageOverviewPage = () => {
  const [garageid, setGarageId] = useState("");
  const [garages, setGarages] = useState([]);
  const [Floors, setFloors] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [spaceString, setSpaceString] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [rerenderCounter, setRerenderCounter] = useState(0);
  const [spaceStates, setSpaceStates] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    getAllGarage()
      .then((data) => {
        setGarages(data);
      })
      .catch((error) => {});

    getAllSpaceStates().then((data) => {
      console.log(data);
      setSpaceStates(data);
    });
  }, []);

  function assingFloors(floors) {
    console.log(floors);
    setFloors(floors);
  }

  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);

  async function PutStatus(e) {
    let data = {
      id: selectedSpace.id,
      garageID: selectedSpace.garageID,
      floor: selectedSpace.floor,
      row: selectedSpace.row,
      spot: selectedSpace.spot,
      typeId: selectedSpace.typeId,
      statusId: e.target.value,
    };
    console.log(selectedSpace);
    await putSpace(data);
    await setSelectedStatus(e.target.value);
    await setRerenderCounter((e) => {
      return e + 1;
    });
  }

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
            style={{ width: "100%", height: "10%" }}
            onChange={(e) => {
              setSpaceString(e.target.value);
            }}
          ></TextField>
          <br></br>
          <br></br>
          <Select
            value={selectedStatus}
            style={{ width: "100%", height: "10%" }}
            onChange={(e) => {
              PutStatus(e);
            }}
          >
            {spaceStates.map((state) => {
              return (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <MapCanvasComponent
          garageId={garageid}
          floorSetter={assingFloors}
          floorSelection={selectedFloor}
          selectedSpot={spaceString}
          selectedSpotStatus={setSelectedStatus}
          rerenderCounter={rerenderCounter}
          spaceSetter={setSelectedSpace}
        />
      </div>
    </>
  );
};

export default GarageOverviewPage;
