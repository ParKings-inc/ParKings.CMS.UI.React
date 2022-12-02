import { Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import TariffCreateForm from "../../../components/Tariff/TariffCreateForm";
import { getAllGarage } from "../../../services/GarageService";

const TariffCreate = () => {
  const [garages, setGarages] = useState([]);
  const [garageid, setGarageId] = useState(0);
  useEffect(() => {
    getAllGarage()
      .then((data) => {
        setGarages(data);
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {

  }, [garageid]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "15%", textAlign: "center" }}>
        <h2>Garage selector</h2>
        <Select
          style={{ width: "80%" }}
          value={garageid}
          onChange={(e) => {
            setGarageId(e.target.value);
          }}
        >
          {Array.isArray(garages)
            ? garages.length > 0
              ? garages.map((garage) => {
                return <MenuItem key={garage.id} value={garage.id}>{garage.name}</MenuItem>;
              })
              : null
            : null}
        </Select>
        <p><b>Default price:</b> € {garages.find((e) => {
          return e.id === garageid
        }) != undefined ? garages.find((e) => {
          return e.id === garageid
        }).normalPrice : null}
        </p>
      </div>
      <div style={{ width: "85%" }}>
        <TariffCreateForm garageId={garages.find((e) => {
          return e.id === garageid;
        })} />
      </div>
    </div >
  );
};

export default TariffCreate;
