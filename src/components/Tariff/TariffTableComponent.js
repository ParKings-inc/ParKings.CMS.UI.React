import React from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import CustomEditor from "../Scheduler/CustomEditor";

const TariffTableComponent = () => {

  function onConfirm(e){
    console.log(e)
  }

  return (
    <>
      <Scheduler
        view="week"
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 9,
          endHour: 17,
          step: 60,
          navigation: true,
        }}
        fields={[
          {
            name: "Description",
            type: "input",
            default: "Default Value...",
            config: { label: "Details", multiline: false, rows: 4 },
          },
        ]}
        events={[]}
      />
    </>
  );
};

export default TariffTableComponent;
