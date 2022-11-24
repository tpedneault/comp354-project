import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const shelfData = [
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
    isbn: "Breakfast",
    isFavourite: false,
  },
];

function Recommended() {
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">Recommended</h1>

      <Grid container spacing={3}>
        {shelfData.map((book) => (
          <Card
            id={book.isbn}
            sx={{ width: 150, position: "relative", margin: "20px" }}
          >
            <CardMedia component="img" height="140" image={book.img} />
          </Card>
        ))}
      </Grid>
      <div className="w-full h-8 bg-blue-50"></div>
    </div>
  );
}

Recommended.propTypes = {};

export default Recommended;
