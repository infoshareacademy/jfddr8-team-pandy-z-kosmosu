// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     IconButton,
//     TextField,
//   } from "@mui/material";
//   import { useNavigate } from "react-router";
//   import { addDoc, collection } from "firebase/firestore";
//   import { firebaseDb } from "../../index";
//   import { useState } from "react";
//   import { Add } from "@mui/icons-material";
  
//   export function NewConversation() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();
  
//     const onConversationCreate = async (event) => {
//       event.preventDefault();
//       const { title } = event.currentTarget.elements;
//       const { id } = await addDoc(collection(firebaseDb, "conversations"), {
//         name: title.value,
//       });
//       navigate(`/${id}`);
//       setIsModalOpen(false);
//     };
  
//     return (
//       <>
//         <IconButton
//           label="Dodaj konwersację"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <Add />
//         </IconButton>
//         <Dialog
//           maxWidth="sm"
//           fullWidth
//           open={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         >
//           <DialogTitle>Rozpocznij konwersację</DialogTitle>
//           <DialogContent>
//             <form onSubmit={onConversationCreate}>
//               <TextField fullWidth name="title" label="Nazwa konwersacji" />
//             </form>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsModalOpen(false)}>Anuluj</Button>
//             <Button variant="contained" type="submit">
//               Rozpocznij
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </>
//     );
//   }
  