import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChangeShelf from "../ChangeShelf";

const shelfData = [
  {
    img: "cover.webp",
    title: "The Gravity of Us",
    isbn: "Breakfast",
    isFavourite: false,
  },
  {
    img: "cover.webp",
    isbn: "Breakfast",
    isFavourite: false,
  },
  {
    img: "cover.webp",
    isbn: "Breakfast",
    isFavourite: false,
  },
  {
    img: "cover.webp",
    title: "The Gravity of Us",
    isbn: "Breakfast",
    isFavourite: false,
  },
  {
    img: "cover.webp",
    isbn: "Breakfast",
    isFavourite: false,
  },
  {
    img: "cover.webp",
    isbn: "Breakfast",
    isFavourite: false,
  },
];

function Completed() {
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">Completed</h1>

      <Grid container spacing={3}>
        {shelfData.map((book) => (
          <Card
            id={book.isbn}
            sx={{ width: 150, position: "relative", margin: "20px" }}
          >
            <CardMedia component="img" height="140" image={book.img} />
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
