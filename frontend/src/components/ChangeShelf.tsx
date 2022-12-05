import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import TopicIcon from "@mui/icons-material/Topic";
import { blue } from "@mui/material/colors";
import { DialogContent } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../App";
import { useRef } from "react";

enum shelves {
  ToRead = "1",
  Reading = "2",
  Completed = "3",
}

export interface ChangeShelfProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
export interface ShelfChangeProps {
  onChange: () => void;
  Book: string;
}

function SimpleDialog(props: ChangeShelfProps) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        <DialogTitle sx={{ color: "#1976d2" }}>Update shelf</DialogTitle>
        <DialogContent dividers>
          {Object.keys(shelves).map((shelf) => (
            <ListItem
              button
              onClick={() => handleListItemClick(shelf)}
              key={shelf}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: blue[100], color: blue[600], margin: 2 }}
                >
                  <TopicIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={shelf} />
            </ListItem>
          ))}
        </DialogContent>
        <ListItem autoFocus button onClick={() => handleListItemClick("")}>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: blue[100],
                color: blue[600],
                margin: 2,
              }}
            >
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add shelf" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function ChangeShelf({ onChange, Book }: ShelfChangeProps) {
  const { userID } = useGlobalContext();
  const { refreshNumber, setRefreshNumber } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState("");
  const toChangeShelf = useRef(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    if (value === "ToRead") {
      toChangeShelf.current = true;
      setSelectedState(shelves.ToRead);
    } else if (value === "Reading") {
      setSelectedState(shelves.Reading);
      toChangeShelf.current = true;
    } else if (value === "Completed") {
      setSelectedState(shelves.Completed);
      toChangeShelf.current = true;
    }

    if (toChangeShelf.current) {
      setTimeout(function () {
        refetch();
      }, 200);
      setTimeout(function () {
        onChange();
        setRefreshNumber(refreshNumber + 1);
      }, 400);
      toChangeShelf.current = false;
    }
  };

  const fetchData: () => any = async () => {
    const URL = `http://localhost:3001/api/${userID}/changeShelf/${Book}/${selectedState}`;
    const response = await axios.get(URL);
    return response;
  };
  const { data, refetch } = useQuery(["changeShelf"], fetchData, {
    enabled: false,
  });

  return (
    <>
      <Button onClick={handleClickOpen}>
        <div className=" rounded-full ">
          <MoreHorizIcon />
        </div>
      </Button>
      <SimpleDialog
        selectedValue={selectedState}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
