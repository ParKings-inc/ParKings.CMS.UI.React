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
      .catch((error) => {});
  }, []);

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
                  return <MenuItem value={garage.id}>{garage.name}</MenuItem>;
                })
              : null
            : null}
        </Select>
      </div>
      <div style={{ width: "85%" }}>
        <TariffCreateForm garageId={garageid} />
      </div>
    </div>
  );
};

export default TariffCreate;
