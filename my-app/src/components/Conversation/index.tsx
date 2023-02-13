import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { NewMessage } from "./new-message";
import {onSnapshot, collection, query, orderBy} from 'firebase/firestore'
import { firebaseDb } from "../../index";

export function Conversation() {
  const conversationRef = useRef(null);
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const messagesCollection = collection(firebaseDb, "conversations", id, 'messages');
    const orderedQuery = query(messagesCollection, orderBy('createdAt'));
    const unsubscribe = onSnapshot(orderedQuery, data => {
      const newMessages = data.docs.map(doc => {
        const { user, message, createdAt } = doc.data();
        return { id: doc.id, user, message, createdAt };
      });
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, [id]);



  useEffect(() => {
    conversationRef.current.scrollTo(0, conversationRef.current.scrollHeight);
  }, [messages]);

  return (
    <Box
      ref={conversationRef}
      sx={{
        flexBasis: "520px",
        height: "100%",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      {messages.map(({ id, message, user, createdAt }) => (
        <Card key={id}>
          <CardContent>
            <Typography
              sx={{ fontSize: "0.7rem" }}
              color="text.secondary"
              gutterBottom
            >
              Od: {user},{" "}
              {new Intl.DateTimeFormat("pl-PL", {
                timeStyle: "medium",
                dateStyle: "medium",
              }).format(new Date(createdAt))}
            </Typography>
            {message}
          </CardContent>
        </Card>
      ))}
      <Paper sx={{ maxWidth: "520px", margin: "0 auto" }}>
        <NewMessage id={id} />
      </Paper>
    </Box>
  );
}
