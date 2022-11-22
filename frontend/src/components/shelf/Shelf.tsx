import React from 'react'
import axios from "axios";
import {useQuery } from "@tanstack/react-query";
import {ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
    <div>
      <h1>{data.name}</h1>
    </div>
  );
}

export default Shelf;