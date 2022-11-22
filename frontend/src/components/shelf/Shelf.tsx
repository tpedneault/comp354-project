import React from 'react'
import { useQuery } from "react-query";
import axios from "axios";
function Shelf() {
    const { isLoading, error, data, isFetching } = useQuery(["repoData"], () => axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data)
  );
  if (isLoading) return "Loading...";
  return (
    <>
        <div>Shelf</div>
    </>
  )
}

export default Shelf;