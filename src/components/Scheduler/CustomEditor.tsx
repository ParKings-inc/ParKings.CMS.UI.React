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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { start } from "repl";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    repetitive: event?.repetitive || false,
    startTime: event?.startTime || scheduler.state.start.value,
    endTime: event?.endTime || scheduler.state.end.value,
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

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        res({
          event_id: Math.random(),
          repetitive: state.repetitive,
          title: "€" + state.price,
          start: new Date(dayjs(state.startTime).format("YYYY/MM/DD HH:mm")),
          end: new Date(dayjs(state.endTime).format("YYYY/MM/DD HH:mm")),
        });
      })) as ProcessedEvent;

      console.log(added_updated_event);

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
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
        <FormControlLabel
          control={
            <Input
              type="number"
              defaultValue={state.price}
              value={state.price}
              onChange={(newvalue) => {
                handleChange(newvalue.target.value, "price");
              }}
            ></Input>
          }
          label="Price"
        />
        {state.repetitive === false ? (
          <>
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start time"
                ampm={false}
                value={state.startTime}
                onChange={(newValue: any) => {
                  handleChange(newValue, "startTime");
                }}
              />
              <br />
              <br />
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End time"
                ampm={false}
                value={state.endTime}
                minDate={state.startTime}
               
                onChange={(newValue: any) => {
                  handleChange(newValue, "endTime");
                }}
              />
            </LocalizationProvider>
          </>
        ) : (
          <></>
        )}
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

export default CustomEditor;
