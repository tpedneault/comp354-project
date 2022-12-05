import React, { useEffect, useReducer } from "react";
import { Button, Card, CardMedia, Grid } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChangeShelf from "../ChangeShelf";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FavoriteBook from "../FavoriteBook";
import { useGlobalContext } from "../../App";
import CardActions from "@material-ui/core/CardActions";

function Recommended() {
  const [reducerValue, forceUpdate] = useReducer(x => x +1,0)
  const {userID} = useGlobalContext();
  const {refreshNumber, setRefreshNumber} = useGlobalContext();

  const recommended: () => any = async() =>{
    const URL =`http://localhost:3001/api/${userID}/recommendations`;
    const response = await axios.get(URL);
    return response;
  }
  const {data:getRecommended, refetch,isLoading,isError,isSuccess} = useQuery( ["recommended"], recommended,{enabled: false});
  
  useEffect(() => {
    refetch();
  }, [refreshNumber])
  console.log(getRecommended);
  if(isLoading){
    return <div>loading...</div>
  }
  if(isError){
    return <div>error</div>
  }
  if(isSuccess){
    if(getRecommended?.data !== ""){
      return (
        <div className="w-full mt-10">
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-4">Recommended</h1>
    
          <Grid container spacing={3}>
            {getRecommended?.data.map((book: any) => (
              <Card
                id={book.id}
                key={book.id}
                sx={{ width: 160, position: "relative", margin: "20px" }}
              >
                <CardMedia component="img" height="140" image={book.cover_url} />
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
  }
  return(
    <div></div>
  );
}


export default Recommended;
