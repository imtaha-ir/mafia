import SearchIcon from '@mui/icons-material/Search';
import { useState, type SetStateAction } from 'react';
export default function PlayerSearchComponent() {
  const [input,setinput]=useState("");
  const fetchData = (value: any) => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response)=> response . json())
    .then((json)=>{
      console.log(json)
     });
  };
  const handlechange=(value:any)=>{
    setinput(value);
    fetchData(value) 
  }
  return (
    <div>
    <SearchIcon/>
    <input placeholder='Type to search...'
     value={input}
     onChange={(e)=> handlechange(e.target.value)}/> 
    </div>
  )
}