// import React from 'react'

// const Button = ({name}) => {
//   return (
//     <div className='bg-gray-200 px-5 m-2 rounded-lg '>
//         {name}
//     </div>
//   )
// }

// export default Button

import React from "react";
import { useNavigate } from "react-router";

const Button = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search?q=${encodeURIComponent(name)}`);
  };

  return (
    <button 
      className="bg-gray-200 px-5 m-2 rounded-lg cursor-pointer hover:bg-gray-300 transition"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
