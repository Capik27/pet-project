import React, { useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
//-----------------------
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Box, Typography } from "@mui/material";
//-----------------------------
import { Centered } from "./Centered";
import { Context } from "../index.js";
import { getDateStringKey } from "./../utils/datamethods";
import { ChatLoader } from "./Loader.js";

export default function Calendar() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [saved, setSaved] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notelist, notelistLoading, notelistError] = useDocumentData(
    doc(firestore, "calendars", user.uid)
  );
  const [notetext, setNotetext] = useState(
    notelist ? notelist[getDateStringKey(date)] : ""
  );

  async function updateNotetextState() {
    const docRef = doc(firestore, "calendars", user.uid);
    const docSnap = await getDoc(docRef);
    const list = docSnap.data();
    const msg = list[getDateStringKey(date)];
    if (msg) {
      setNotetext(msg);
    } else {
      setNotetext("");
    }
  }

  useEffect(() => {
    updateNotetextState();
  }, [date]);

  async function submitNote(e) {
    e.preventDefault();
    setSendLoading(true);
    setSaved("saved");
    const timer = setTimeout(() => {
      setSaved("");
      clearTimeout(timer);
    }, 800);

    const docRef = collection(firestore, "calendars");
    const id = user.uid;
    const newNote = {
      [getDateStringKey(date)]: notetext,
    };
    await setDoc(doc(docRef, id), newNote, { merge: true });
    setSendLoading(false);
  }

  const handleChangeNote = (e) => {
    setNotetext(e.target.value);
  };

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  return (
    <Centered>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField color="warning" {...params} />}
        />
      </LocalizationProvider>
      {notelistLoading && <ChatLoader style={{ marginTop: 40 }} />}
      {notelist && (
        <Box
          component="form"
          noValidate
          style={styles.form}
          autoComplete="off"
          onSubmit={submitNote}
        >
          <TextField
            fullWidth
            value={notetext}
            disabled={sendLoading}
            onChange={handleChangeNote}
            color="warning"
            id="outlined-multiline-static"
            label="Note"
            multiline
            rows={4}
          />
          <LoadingButton
            type="submit"
            onClick={submitNote}
            loadingPosition="center"
            endIcon={<SendIcon />}
            loading={sendLoading}
            disabled={!notetext || notelist[getDateStringKey(date)] == notetext}
            color="warning"
            variant="contained"
          >
            Edit
          </LoadingButton>
        </Box>
      )}
      {saved && (
        <Typography
          variant="h6"
          component="span"
          className="msgSavedAnimation"
          style={styles.saved}
        >
          {saved}
        </Typography>
      )}
    </Centered>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    gap: 8,
  },
  saved: {
    color: "#ed6c02",
  },
};
