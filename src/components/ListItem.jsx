import React from 'react'
import { useNavigate } from "react-router";

const ListItem = ({query}) => {
    const navigate = useNavigate();
    const handleNavigation = (q) => {
        navigate(`/search?q=${q}`);
      };
  return (
    <div>
        <li className="cursor-pointer hover:text-blue-500" onClick={() => handleNavigation(query)}>{query}</li>
    </div>
  )
}

export default ListItem