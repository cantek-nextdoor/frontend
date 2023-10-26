import { useEffect, useState } from "react";
import Post from '../../components/Post/Post';
import { getAllPostRequest } from "../../axios/home";
import postDummyData from "./PostDummyData.json";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { category } from "../types/Post";
import RowComponent from "../../components/RowComponent";

const HomePage = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<category>(category.all);

  useEffect(() => {
    getAllPostRequest()
      .then(response => {
        if (Array.isArray(response.data)) {
          // Store the data array in the state
          const tempArray = response.data;
          setPostList(tempArray);
        } else {
          console.error('Response does not contain an array of Post data.');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []); // The empty dependency array ensures this runs only once

  useEffect(() => {
    const temp = postDummyData.dummyPost;
    if (filteredCategory === category.all) setPostList(temp);
    else {    
      setPostList(temp.filter(item => item.categories === filteredCategory))
    }
  }, [filteredCategory]);

  const postChange = (inputPost: Post) => {
    const tempArray = postList.map(item => {
      if (item.postId === inputPost.postId) return inputPost;
      return item;
    });
    setPostList(tempArray);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        paddingBottom: 50,
      }}
    >
      <RowComponent style={{ width: "70%", justifyContent: "flex-start", gap: 20 }}>
        <span style={{ fontSize: 26 }}>Filter:</span>
        <FormControl style={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filteredCategory}
            label="Age"
            onChange={(e) => setFilteredCategory(e.target.value as category)}
          >
            {
              Object.values(category).map(item => <MenuItem value={item}>{item}</MenuItem>)
            }
          </Select>
        </FormControl>
      </RowComponent>
      {postList.map((post) => (
        <Post post={post} changePost={(e: Post) => postChange(e)} key ={post.postId}/>
      ))}
    </div>
  );
};

export default HomePage;
