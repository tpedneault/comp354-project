import React from 'react'
import axios from "axios";
import {useQuery } from "@tanstack/react-query";
import {ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Grid from '@material-ui/core/Grid';
import BookCard from '../bookCard';
import IBook from '../../data/interfaces/IBook'


function Shelf() {
    const { isLoading, error, data, isFetching } = useQuery(["repoData"],async () => axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data)
  );
  if (isLoading)  {
    return(
      <div>
        <h1>Loading</h1>
      </div>
    );
  } 
  if (error) {
    return(
      <div>
        <h1>Error</h1>
      </div>
    );
  }
  
  return(
    <>
      {data?.pages.filter((p: { data: any[]; }) => p.data.map.name).map((p: { data: IBook[]; }) => p.data.map((book : IBook) => (
            <Grid item style={{ display: 'flex' }} key={`Exhibit-Card:${book.id}`}>
              <BookCard
                title={book.title}
                subheader={book.author_id}
                imgSrc={book.cover_url}
                imgAlt="Book Cover"
              />
            </Grid>
      )))}
            </>
  );

}

export default Shelf;