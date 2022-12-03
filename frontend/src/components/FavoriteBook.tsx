import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as React from 'react';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useGlobalContext } from "../App";
import { useEffect, useRef } from 'react';

export interface BookFavoriteProps {
    Book: string
  }

function FavoriteBook({Book}: BookFavoriteProps) {
    const {userID} = useGlobalContext();
    const {refreshNumber, setRefreshNumber} = useGlobalContext();
    const {toUnfavorite, setToUnfavorite} = useGlobalContext();
    const needToFavorite = useRef(false);


    const isFavorite: () => any = async() =>{
      const URL =`http://localhost:3001/api/${userID}/isFavorited/${Book}`;
      const response = await axios.get(URL);
      return response;
    }
    const {data:isFavoriteData, refetch:checkFavorite} = useQuery( ["isFavorite"], isFavorite,{enabled: false});
    

    const fetchData: () => any = async() =>{
        const URL =`http://localhost:3001/api/${userID}/favoriteBook/${Book}`;
        const response = await axios.get(URL);
        return response;
    }
      const {data,refetch} = useQuery( ["favoriteBook"], fetchData,{enabled: false});

      const deleteFavorite: () => any = async() =>{
        const URL =`http://localhost:3001/api/${userID}/unFavoriteBook/${Book}`;
        const response = await axios.get(URL);
        return response;
      }
      const {data:isDeleted, refetch:unFavorite} = useQuery( ["unfavorite"], deleteFavorite,{enabled: false});
      
      useEffect(() => {
        if (needToFavorite.current){
          if(isFavoriteData?.data.length === 0){
            console.log(Book);
            refetch();
            console.log("putting favorites");
          }
          else{
            console.log(Book)
            unFavorite();
            console.log("deleting favorites");
          }
          needToFavorite.current = false;
          setRefreshNumber(refreshNumber + 1);
        }
      }, [isFavoriteData]);

      const handleOnClick = () => {
        needToFavorite.current=true;
        checkFavorite();
        
      }

      return(
        <Button
        onClick={handleOnClick}
            size="medium"
            sx={{ position: "flex", bottom: 0, left: 0 }}
      >
            <div className="bg-blue-50 w-full rounded-full">
            <FavoriteBorderOutlinedIcon />
            </div>
      </Button>
      );
}
export default FavoriteBook;