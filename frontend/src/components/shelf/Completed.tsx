import React, { useEffect, useReducer } from "react";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChangeShelf from "../ChangeShelf";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "../../App";

function Completed() {
  const {userID} = useGlobalContext();
  const [reducerValue, forceUpdate] = useReducer(x => x +1,0)
  const {refreshNumber, setRefreshNumber} = useGlobalContext();

  const fetchData: () => any = async() =>{
    const URL =`http://localhost:3001/api/${userID}/shelves/3`;
    const response = await axios.get(URL);
    return response;
  }
  const {data,refetch} = useQuery( ["completed"], fetchData,{enabled: false});

  useEffect(() => {
    refetch();
  }, [refetch, refreshNumber])
  
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">Completed</h1>

      <Grid container spacing={3}>
        {data?.data[0].books.map((book: any) => (
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
            <ChangeShelf Book={book.id} onChange={forceUpdate} />
          </Card>
        ))}
      </Grid>
      <div className="w-full h-8 bg-blue-50"></div>
    </div>
  );
}

export default Completed;
