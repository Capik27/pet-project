import React, { useContext, useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  setDoc,
  doc,
  query,
  serverTimestamp,
  collection,
  orderBy,
} from "firebase/firestore";
//-----------------------
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Box,
  Typography,
} from "@mui/material";
//-----------------------------
import { Context } from "../index.js";
import { ChatLoader } from "./Loader.js";
import {
  BG_CHAT_COLOR,
  CHAT_MY_MSG_BG_COLOR,
  CHAT_OTHER_MSG_BG_COLOR,
  CHAT_MIN_WIDTH,
  CHAT_COMPONENT_HEIGHT,
  CHAT_MARGIN,
} from "../utils/consts";
import { datasort, getDateFromMessage } from "../utils/datamethods";

export const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const chatWindow = useRef(null);
  const inputWindow = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [sendLoading, setSendLoading] = useState(false);

  const msgCollection = collection(firestore, "messages");
  const queryMsg = query(msgCollection, orderBy("createdAt"));
  const [messages, loading, error] = query(
    useCollectionData(queryMsg, orderBy("createdAt"))
  );

  useEffect(() => {
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    if (!inputValue) inputWindow.current.select();
  }, [messages, sendLoading]);

  const messagesList = messages
    ? messages.map(
        (message, index) =>
          message.createdAt && (
            <Paper
              className="msgAnimation"
              variant="outlined"
              key={index}
              style={{
                width: "fit-content",
                height: "min-content",
                minWidth: CHAT_MIN_WIDTH,
                display: "inline-flex",
                alignSelf: user.uid === message.uid ? "flex-end" : "flex-start",
                backgroundColor:
                  user.uid === message.uid
                    ? CHAT_MY_MSG_BG_COLOR
                    : CHAT_OTHER_MSG_BG_COLOR,
                flexDirection: "column",
                padding: "0 5px",
              }}
            >
              <Typography variant="subtitle2" component="div">
                {user.uid === message.uid
                  ? user.displayName
                  : message.displayName}
                <Typography
                  variant="caption"
                  component="span"
                  style={{
                    color: "black",
                    marginLeft: 6,
                  }}
                >
                  {getDateFromMessage(message)}
                </Typography>
              </Typography>
              <Typography variant="body2" component="span">
                {message.text}
              </Typography>
            </Paper>
          )
      )
    : [];

  const sendMessage = async (e) => {
    e.preventDefault();
    setSendLoading(true);

    const msgRef = doc(collection(firestore, "messages"));
    await setDoc(msgRef, {
      uid: user.uid,
      displayName: user.displayName,
      text: inputValue,
      createdAt: serverTimestamp(),
    }).then(() => {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
      setInputValue("");
      setSendLoading(false);
    });
  };

  const handleInputValueChange = (e) => {
    let val = e.target.value;
    setInputValue(val);
  };

  return (
    <Container>
      <Grid
        container
        gap={1}
        direction={"column"}
        className="chat_dinamicHeight"
        style={{
          maxWidth: 700,
          margin: `${CHAT_MARGIN}px auto`,
          flexWrap: "nowrap",
        }}
      >
        <Paper
          ref={chatWindow}
          variant="outlined"
          style={{
            width: "100%",
            flexGrow: 1,
            minHeight: 128,
            overflowY: "auto",
            overflowX: "hidden",
            background: BG_CHAT_COLOR,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: 4,
              height: "100%",
            }}
          >
            {loading && <ChatLoader />}
            {messages && messagesList}
            {messages && (
              <div
                style={{
                  borderTop: `1px solid ${BG_CHAT_COLOR}`,
                  opacity: "0",
                }}
              />
            )}
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
          </div>
        </Paper>
        <Box
          component="form"
          noValidate
          style={{
            display: "flex",
            width: "99%",
            justifyContent: "center",
            alignSelf: "center",
            gap: CHAT_MARGIN,
          }}
          autoComplete="off"
          onSubmit={sendMessage}
        >
          <TextField
            focused
            fullWidth
            inputRef={inputWindow}
            disabled={sendLoading}
            color="warning"
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={handleInputValueChange}
          />
          <LoadingButton
            type="submit"
            onClick={sendMessage}
            loadingPosition="center"
            endIcon={<SendIcon />}
            loading={sendLoading}
            disabled={!inputValue}
            color="warning"
            variant="contained"
            style={{ lineHeight: 1 }}
          >
            Send
          </LoadingButton>
        </Box>
      </Grid>
    </Container>
  );
};

// window.innerHeight - 100,
