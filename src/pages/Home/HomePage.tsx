import {useEffect, useState} from "react";
import Post from '../../components/Post/Post';
import {getAllPostRequest} from "../../axios/home";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {category} from "../types/Post";
import {useUserStore} from "../../zustand/user";
import RowComponent from "../../components/RowComponent";

const HomePage = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [displayPostList, setDisplayPostList] = useState<any[]>([])
  const [filteredCategory, setFilteredCategory] = useState<category>(category.all);
  const userPostalCode = useUserStore((state) => state.postalCode);

  useEffect(() => {

    getAllPostRequest(userPostalCode, 1)
      .then(response => {
        if (Array.isArray(response.data)) {
          // Store the data array in the state
          const tempArray = response.data;
          setPostList(tempArray);
          setDisplayPostList(tempArray)
        } else {
          console.error('Response does not contain an array of Post data.');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []); // The empty dependency array ensures this runs only once

  useEffect(() => {
    if (filteredCategory === category.all) {
      setDisplayPostList(postList);
    }
    else {    
      setDisplayPostList(postList.filter(item => item.categories === filteredCategory))
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
            key={"selectedItem"}
            label="Age"
            onChange={(e) => setFilteredCategory(e.target.value as category)}
          >
            {
              Object.values(category).map(item => <MenuItem value={item}>{item}</MenuItem>)
            }
          </Select>
        </FormControl>
      </RowComponent>
      {displayPostList.map((post) => (
        <Post post={post} changePost={(e: Post) => postChange(e)} key ={post.postId}/>
      ))}
    </div>
  );
};

export default HomePage;
