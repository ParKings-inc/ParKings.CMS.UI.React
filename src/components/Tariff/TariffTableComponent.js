import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import CustomEditor from "../Scheduler/CustomEditor";
import PricingService from "../../services/PricingService";

const TariffTableComponent = (props) => {
  const [events, setEvents] = useState([]);
  const [refreshPage, setRefresh] = useState(false);

  useEffect(() => {
    if (refreshPage === true) {
      setRefresh(false);
      console.log("refresh");
    }
  }, [refreshPage]);

  useEffect(() => {
    PricingService.getTariff();
  }, [props.garageId]);

  function addEvent(e, action) {
    console.log(e);

    setEvents((events) => {
      let newEvents = events;
      if (!action) {
        newEvents.push(e);
        PricingService.createTariff(props.garageId, e);
      } else {
        newEvents.forEach((element, i) => {
          if (element.id === e.id) {
            console.log("found event");
            newEvents[i] = e;
          }
        });
      }
      setRefresh(true);
      return newEvents;
    });
  }

  function deleteEvent(id) {
    console.log(id);
    setEvents((events) => {
      let newEvents = events;
      console.log(newEvents);
      newEvents.forEach((element, i) => {
        if (element.event_id === id) {
          console.log(id);
          newEvents.splice(i, 1);
          console.log(newEvents);
        }
      });
      setRefresh(true);
      return newEvents;
    });
  }

  return (
    <>
      <Scheduler
        view="week"
        onDelete={(e) => {
          deleteEvent(e);
        }}
        onConfirm={(e) => {
          console.log(e);
        }}
        customEditor={(scheduler) => (
          <CustomEditor eventSetter={addEvent} scheduler={scheduler} />
        )}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 9,
          endHour: 17,
          step: 60,
          navigation: true,
        }}
        events={Array.isArray(events) ? (events.length > 0 ? events : []) : []}
      />
    </>
  );
};

export default TariffTableComponent;
