
import { collection, addDoc } from "firebase/firestore";
import { useRef } from "react";
import { firebaseDb } from "../../index";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";

export function NewMessage({ id }) {
  const firstInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { user, message } = event.currentTarget.elements;
    addDoc(collection(firebaseDb, "conversations", id, "messages"), {
      createdAt: Date.now(),
      message: message.value,
      user: user.value,
     
    });
    message.value = "";
    firstInputRef.current.focus();
  };

    
  return (
    <Stack sx={{ marginTop: "24px" }} component="form" onSubmit={handleSubmit}>
      <TextField
        autoFocus
        inputRef={firstInputRef}
        fullWidth
        name="message"
        required
        label="Wiadomość"
      />
      <TextField
        sx={{ margin: "24px 0" }}
        fullWidth
        name="author"
        required
        label="Autor"
      />
      <Button variant="outlined" type="submit">
        Dodaj
      </Button>
    </Stack>
  );
}
