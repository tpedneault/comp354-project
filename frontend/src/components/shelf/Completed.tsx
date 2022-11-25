import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChangeShelf from "../ChangeShelf";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Completed() {
  const {data: getCompleted} = useQuery( ["completed"], async() =>{
    const response = await axios.get("http://localhost:3001/books");
    return response;
  });
  
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">Completed</h1>

      <Grid container spacing={3}>
        {getCompleted?.data.map((book: any) => (
          <Card
            id={book.id}
            key={book.id}
            sx={{ width: 150, position: "relative", margin: "20px" }}
          >
            <CardMedia component="img" height="140" image={book.cover_url} />
            <div className="bottom-0 bg-blue-50 h-5"></div>
            <Button
              size="medium"
              sx={{ position: "absolute", bottom: 0, left: 0 }}
            >
              <div className="bg-blue-50 w-full rounded-full">
                <FavoriteBorderOutlinedIcon />
              </div>
            </Button>
            <ChangeShelf />
          </Card>
        ))}
      </Grid>
      <div className="w-full h-8 bg-blue-50"></div>
    </div>
  );
}

Completed.propTypes = {};

export default Completed;
