import React, { useEffect, useState } from 'react'
type useFetchParams ={
    url:string
}

function useFetch ({url} : useFetchParams) {
    const [data , setData] = useState<number | null | [] | {}>(null)
    useEffect(()=>{
        fetch(url)
        .then((res)=> res.json)
        .then(data => setData(data))
        .catch((e)=> console.log("Error in fetching data", e))
    },[url])
 return [data]
}

export default useFetch