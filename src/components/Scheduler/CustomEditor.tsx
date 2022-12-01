import type {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { useState } from "react";

import {
  TextField,
  Button,
  DialogActions,
  Switch,
  FormControlLabel,
  Input,
} from "@mui/material";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { start } from "repl";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
  eventSetter: any;
}
const CustomEditor = ({ scheduler, eventSetter }: CustomEditorProps) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    repetitive: event?.repetitive || false,
    startDateTime: event?.startDateTime || scheduler.state.start.value,
    endDateTime: event?.endDateTime || scheduler.state.end.value,
    startTime: event?.startTime || scheduler.state.start.value,
    endTime: event?.endTime || scheduler.state.start.value,
    selectedDay: event?.selectedDay || scheduler.state.start.value,
    price: event?.price || 1.5,
  });

  const handleChange = (value: any, name: string) => {
    console.log(value);
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    // Your own validation

    try {
      scheduler.loading(true);

      if (state.repetitive) {
        console.log(state.endTime - state.startTime);
        if (state.endTime - state.startTime < 3599999) {
          alert("Time selected less than an hour");
          return;
        }
      } else {
        if (state.endDateTime - state.startDateTime < 3599999) {
          alert("Time selected less than an hour");
          return;
        }
      }

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        res({
          event_id: Math.random(),
          repetitive: state.repetitive,
          title: "€" + state.price,

          start: !state.repetitive
            ? new Date(dayjs(state.startDateTime).format("YYYY/MM/DD HH:mm"))
            : new Date(
                new Date(
                  dayjs(state.selectedDay).format("YYYY/MM/DD HH:mm")
                ).setTime(state.startTime)
              ),

          end: !state.repetitive
            ? new Date(dayjs(state.endDateTime).format("YYYY/MM/DD HH:mm"))
            : new Date(
                new Date(
                  dayjs(state.endDateTime).format("YYYY/MM/DD HH:mm")
                ).setTime(state.endTime)
              ),
        });
      })) as ProcessedEvent;
      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      eventSetter(added_updated_event, event);

      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  return (
    <div>
      <div style={{ padding: "4rem" }}>
        <h2>Set tariff</h2>

        <FormControlLabel
          control={
            <Switch
              checked={state.repetitive}
              onChange={(e) => handleChange(e.target.checked, "repetitive")}
            />
          }
          label="Repetitive rule"
        />
        <br></br>
        <br />
        <FormControlLabel
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            margin: "0",
            display: "flex",
          }}
          control={
            <Input
              type="number"
              value={state.price}
              onChange={(newvalue) => {
                handleChange(newvalue.target.value, "price");
              }}
            ></Input>
          }
          label="Price"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {state.repetitive === false ? (
            <>
              <br />
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start time"
                ampm={false}
                value={state.startDateTime}
                onChange={(newValue: any) => {
                  handleChange(newValue, "startDateTime");
                }}
              />
              <br />
              <br />
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End time"
                ampm={false}
                value={state.endDateTime}
                minDate={state.startDateTime}
                onChange={(newValue: any) => {
                  handleChange(newValue, "endDateTime");
                }}
              />
            </>
          ) : (
            <>
              <br />
              <TimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start time"
                ampm={false}
                value={new Date(state.startTime)}
                onChange={(newValue: any) => {
                  handleChange(newValue, "startTime");
                }}
              />
              <br />
              <br />
              <TimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End time"
                ampm={false}
                value={new Date(state.endTime)}
                onChange={(newValue: any) => {
                  handleChange(newValue, "endTime");
                }}
              />
            </>
          )}
        </LocalizationProvider>
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

export default CustomEditor;
