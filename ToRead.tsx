import React, { useEffect, useReducer } from "react";
import { Card, CardMedia, Grid } from "@mui/material";
import ChangeShelf from "../ChangeShelf";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "../../App";
import FavoriteBook from "../FavoriteBook";
import CardActions from "@material-ui/core/CardActions";

function ToRead() {
  const { userID } = useGlobalContext();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const { refreshNumber, setRefreshNumber } = useGlobalContext();

  const fetchData: () => any = async () => {
    const URL = `http://localhost:3001/api/${userID}/shelves/1`;
    const response = await axios.get(URL);
    return response;
  };
  const { data, refetch } = useQuery(["toRead"], fetchData, { enabled: false });

  useEffect(() => {
    refetch();
  }, [refetch, refreshNumber]);

  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">To Read</h1>

      <Grid container spacing={3}>
        {data?.data[0].books.map((book: any) => (
          <Card
            id={book.id}
            key={book.id}
            sx={{
              width: 120,
              height: 200,
              position: "relative",
              margin: "20px",
            }}
          >
            <CardMedia
              component="img"
              className="h-40"
              image={book.cover_url}
            />
            <div className="inline-flex">
              <FavoriteBook Book={book.id}></FavoriteBook>
              <ChangeShelf onChange={forceUpdate} Book={book.id} />
            </div>
          </Card>
        ))}
      </Grid>
      <div className="w-full h-8 bg-blue-50"></div>
    </div>
  );
}

export default ToRead;
