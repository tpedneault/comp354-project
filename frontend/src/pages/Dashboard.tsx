import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { Button, ButtonGroup } from "@material-ui/core";
import Shelf from "../components/shelf";
import Container from "@mui/material/Container";
import { margin } from "@mui/system";

function Dashboard() {
  return (
    <>
      <Container maxWidth="xl">
        <div className="flex min-w-full bg-gray-100 justify-around items-center py-2 mt-4">
          <div className="flex-initial text-3xl pl-3 font-bold">My Books</div>
          <div className="flex-initial">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button className="px-20">Add Book</Button>
              <Button className="px-20">Add Shelf</Button>
            </ButtonGroup>
          </div>
          <div className="flex-initial">
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  Search
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </div>
        </div>

        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} >
          <Shelf></Shelf>
        </Box>
        
      </Container>
    </>
  );
}
export default Dashboard;
