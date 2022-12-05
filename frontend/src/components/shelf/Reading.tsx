import React, { useEffect, useReducer } from "react";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChangeShelf from "../ChangeShelf";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "../../App";
import FavoriteBook from "../FavoriteBook";
import CardActions from "@material-ui/core/CardActions";


function Reading() {
  const {userID} = useGlobalContext();
  const {refreshNumber} = useGlobalContext();
  const [reducerValue, forceUpdate] = useReducer(x => x +1,0)

  const fetchData: () => any = async() =>{
    const URL =`http://localhost:3001/api/${userID}/shelves/2`;
    const response = await axios.get(URL);
    return response;
  }
  const {data,refetch} = useQuery( ["reading"], fetchData,{enabled: false});

  useEffect(() => {
    refetch();
  }, [refetch, refreshNumber])
  
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">Reading</h1>

      <Grid container spacing={3}>
        {data?.data[0].books.map((book: any) => (
          <Card
            id={book.id}
            key={book.id}
            sx={{ width: 160, position: "relative", margin: "20px" }}
          >
            <CardMedia component="img" height="50" image={book.cover_url} />
            <div className="bottom-0 bg-blue-50 h-5"></div>
            <CardActions disableSpacing>
              <FavoriteBook Book={book.id}></FavoriteBook>

              <ChangeShelf onChange={forceUpdate}Book={book.id}/>
            </CardActions>

          </Card>
        ))}
      </Grid>
      <div className="w-full h-8 bg-blue-50"></div>
    </div>
  );
}

export default Reading;
