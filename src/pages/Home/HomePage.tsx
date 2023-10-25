import { useEffect, useState } from "react";
import Post from '../../components/Post/Post';
import { getAllPostRequest } from "../../axios/home";

const HomePage = () => {
  const [postList, setPostList] = useState<Post[]>([]);

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


  const postChange = (inputPost: Post) => {
    const tempArray = postList.map(item => {
      if (item.postId === inputPost.postId) return inputPost;
      return item;
    });
    setPostList(tempArray);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingBottom: 50}}>
      {
        postList.map(post => <Post post={post} changePost={(e: Post) => postChange(e)}/>)
      }
    </div>
  )
}

export default HomePage;