import React, { useState, useEffect, useRef } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import CustomEditor from "../Scheduler/CustomEditor";
import PricingService from "../../services/PricingService";

const TariffTableComponent = (props) => {
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  let selected = useRef({});
  let EventsRef = useRef({});
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
  }, [displayEvents]);

  useEffect(() => {
    console.log(props.garageId)
    if (events !== undefined && props.garageId !== undefined) {
      let dEvents = events.filter((event) => {
        return event.garageID === props.garageId.id;
      })

      dEvents.forEach(event => {
        if (event.repetitive === true) {
          console.log("recurring")
          for (let index = 1; index < 52; index++) {
            let newEvent = {
              event_id: event.event_id,
              title: event.title,
              start: new Date(new Date(event.start).setDate(new Date(event.start).getDate() + (index * 7))),
              end: new Date(new Date(event.end).setDate(new Date(event.end).getDate() + (index * 7))),
              allDay: false,
              repetitive: true,
              color: "orange"
            }
            dEvents.push(newEvent);
          }
        }
      });

      selected.current = props.garageId;

      setDisplayEvents(dEvents);
    }
  }, [props.garageId, events]);

  function addEvent(e, action) {
    if (!action) {
      PricingService.createTariff(selected.current.id, e).then(() => {
        fetchEvents();
      });
    } else {
      console.log(action);
      if (!action.repetitive) {
        PricingService.putTariff(action.event_id, e, selected.current.id).then(() => {
          fetchEvents();
        });
      } else {
        console.log(EventsRef.current)
        let editableEvent = EventsRef.current.find(event => {
          console.log(event.event_id)
          return event.event_id === action.event_id;
        })

        editableEvent.start = new Date(new Date(editableEvent.start).setHours(new Date(e.start).getHours()));
        editableEvent.end = new Date(new Date(editableEvent.start).setHours(new Date(e.end).getHours()));
        PricingService.putTariff(action.event_id, editableEvent, selected.current.id).then(() => {
          fetchEvents();
        });
      }

    }
  }

  function deleteEvent(id) {
    PricingService.deleteTariff(id).then((data) => {
      fetchEvents();
    });
  }

  function fetchEvents() {
    PricingService.getTariff().then((data) => {
      let newEvents = [];
      data.forEach(price => {

        let newEvent = {
          event_id: price.id,
          title: price.price,
          start: new Date(price.startingTime),
          end: new Date(price.endingTime),
          repetitive: price.recurring,
          garageID: price.garageID,
          color: price.recurring ? "orange" : "#2196f3"
        }
        newEvents.push(newEvent);
      });
      EventsRef.current = newEvents;
      setEvents(newEvents);
    });
  }

  return (
    <>
      <Scheduler
        draggable={false}
        view="week"
        onDelete={(e) => {
          deleteEvent(e);
        }}
        customEditor={(scheduler) => (
          <CustomEditor eventSetter={addEvent} scheduler={scheduler} />
        )}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: selected.current === {} ? 9 : new Date(selected.current.openingTime).getHours(),
          endHour: selected.current === {} ? 17 : new Date(selected.current.closingTime).getHours(),
          step: 60,
          navigation: true,
        }}

        events={displayEvents}
      />
    </>
  );
};

export default TariffTableComponent;
