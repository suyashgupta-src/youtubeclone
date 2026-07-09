import React from "react";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
 

  if (!isMenuOpen) return null;

 

  return (
    <div className="p-5 shadow-lg w-48 h-screen bg-white top-0 left-0 fixed mt-14">
      <ul>
        <ListItem query = "Home" />
        <ListItem query = "Javascript" />
        <ListItem query = "ReactJs" />
        <ListItem query = "NodeJs" />
        
      </ul>

      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <ListItem query = "Deep Learning" />
        <ListItem query = "Web Development" />
        <ListItem query = "MongoDB" />
        <ListItem query = "AI Agent" />
      </ul>

      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <ListItem query = "Animations" />
        <ListItem query = "AI" />
        <ListItem query = "Genrative AI" />
        <ListItem query = "Machine Learning" />
      </ul>
    </div>
  );
};

export default Sidebar;
