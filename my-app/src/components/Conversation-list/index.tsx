import { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { firebaseDb } from "../../index";
import { NewConversation } from "./new-conversation";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const conversationsCollection = collection(firebaseDb, "conversations");
    const unsubscribe = onSnapshot(conversationsCollection, ({ docs }) =>
      setConversations(
        docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
      )
    );

    return unsubscribe;
  }, []);

  const deleteConversation = (id) => {
    deleteDoc(doc(firebaseDb, "conversations", id)).then(() => navigate("/"));
  };

  return (
    <Paper>
      <List
        sx={{
          bgcolor: "background.paper",
          overflowY: "auto",
          height: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <ListSubheader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Konwersacje <NewConversation />
        </ListSubheader>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            secondaryAction={
              <IconButton
                onClick={() => deleteConversation(conversation.id)}
                edge="end"
                aria-label="Usun konwersacje"
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton component={NavLink} to={conversation.id}>
              <ListItemText>{conversation.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
