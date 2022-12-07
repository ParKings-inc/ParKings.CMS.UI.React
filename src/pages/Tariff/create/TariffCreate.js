import { Select, MenuItem, Modal, Box, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TariffCreateForm from "../../../components/Tariff/TariffCreateForm";
import { getAllGarage, putGarage } from "../../../services/GarageService";
import Button from '@mui/material/Button';

const TariffCreate = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


  const [garages, setGarages] = useState([]);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [garageid, setGarageId] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit() {
    let garage = garages.find((e) => {
      return e.id === garageid
    })
    console.log(defaultPrice)
    garage.normalPrice = defaultPrice;
    console.log(garage.normalPrice)
    if (garage == null || garage == undefined) {
      return
    }
    putGarage(garage);
    handleClose();
  }


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
        {garageid !== -1 ? <Button variant="contained" onClick={handleOpen}>Edit default price</Button> : <></>}

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ ...style, width: 200, padding: 5, textAlign: "center" }}>
            <h3>Change default price</h3>
            <TextField label="Default price" onChange={(e) => {
              setDefaultPrice(e.target.value)
            }
            } variant="outlined" style={{ "margin": "20px" }} />
            <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
              <Button variant="contained" onClick={handleClose}>Close</Button>
              <Button variant="contained" onClick={handleSubmit} style={{ "backgroundColor": "green" }}>Submit</Button>
            </div>
          </Box>
        </Modal>
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
