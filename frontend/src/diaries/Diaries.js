import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DiaryItem from "./DiaryItem";

function Diaries() {
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    const data = await axios.get("http://localhost:5000/posts");
    console.log(data);
    setPosts(data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent="center"
      alignItems={"center"}
    >
      {posts &&
        posts.map((item) => (
          <DiaryItem
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            image={item.image}
            id={item._id}
            location={item.location}
            title={item.title}
            key={item._id}
          />
        ))}
    </Box>
  );
}

export default Diaries;
