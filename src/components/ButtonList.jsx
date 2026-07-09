import React, { useEffect, useState } from 'react';
import Button from './Button';

const list = [
  "All", "Gaming", "News", "Songs", "Podcasts", "T-series", "Music", "Computer Programming",
  "Romantic", "Live", "Satire", "Game Shows", "Technology", "Science", "Education", "Coding",
  "Movies", "Web Series", "Entertainment", "Motivational", "Comedy", "Sports", "Cricket", "Football",
  "Basketball", "Tennis", "Wrestling", "UFC", "Fitness", "Health", "Nutrition", "Yoga", "Meditation",
  "Self-Improvement", "Mindfulness", "Startup", "Business", "Stock Market", "Investing", "Finance",
  "Cryptocurrency", "Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity",
  "Hacking", "Ethical Hacking", "Space", "Astronomy", "NASA", "Astrophysics", "Cars", "Bikes",
  "Automobile Reviews", "Travel", "Adventure", "Vlogs", "Food", "Cooking", "Recipes", "Street Food",
  "History", "Geography", "Politics", "Economics", "Psychology", "Philosophy", "Mythology", "Horror",
  "Thriller", "Mystery", "Sci-Fi", "Documentaries", "Wildlife", "Nature", "DIY", "Art", "Painting",
  "Photography", "Short Films", "Anime", "Cartoons", "Kids", "Parenting", "Fashion", "Beauty",
  "Makeup", "Skincare", "Hairstyles", "Dance", "Ballet", "Hip-Hop", "Singing", "Instrumental",
  "Guitar", "Piano", "Drums", "Violin", "Orchestra", "Classic Music", "Bollywood", "Hollywood",
  "K-pop", "J-pop", "Stand-up Comedy", "Parodies", "Memes", "ASMR", "Relaxing Music", "White Noise"
];

const getRandomCategories = (arr, num) => {
  //The comparator function () => 0.5 - Math.random() returns a random number between -0.5 and 0.5. This random value determines the "sorting order" between two elements, effectively shuffling them in a seemingly random order.
  let shuffled = [...arr].sort(() => 0.5 - Math.random()); 
  return shuffled.slice(0, num); 
};

const ButtonList = () => {
  const [randomCategories, setRandomCategories] = useState([]);

  useEffect(() => {
    setRandomCategories(getRandomCategories(list, 10)); 
  }, []);

  return (
    <div className='flex flex-wrap mt-20 ml-[35px]'>
      {randomCategories.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;
