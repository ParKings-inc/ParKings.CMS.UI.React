import React from "react";
import TariffTableComponent from "./TariffTableComponent";



const TariffCreateForm = (props) => {
  return (
    <>
      <TariffTableComponent garageId={props.garageId} />
    </>
  );
};

export default TariffCreateForm;
