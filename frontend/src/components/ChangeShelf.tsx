import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import TopicIcon from "@mui/icons-material/Topic";
import { blue } from "@mui/material/colors";
import { DialogContent } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const shelves = ["Reading", "To Read", "Completed"];

export interface ChangeShelfProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
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
          {shelves.map((shelf) => (
            <ListItem
              button
              onClick={() => handleListItemClick(shelf)}
              key={shelf}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <TopicIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={shelf} />
            </ListItem>
          ))}
        </DialogContent>
        <ListItem autoFocus button onClick={() => handleListItemClick("")}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add shelf" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function ChangeShelf() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(shelves[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        size="medium"
        sx={{ position: "absolute", bottom: 0, right: 0 }}
        onClick={handleClickOpen}
      >
        <div className="bg-blue-50 w-full rounded-full ">
          <MoreHorizIcon />
        </div>
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
