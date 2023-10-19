import { useState } from "react";
import "./HomePage.css";
import Post from './Post';
import charityFinder from "../../assets/charityFinder.png";

const postArray: Post[] = [
  {
    id: 0,
    user: "Diana",
    location: "Woburn",
    time: "19 hrs ago",
    photo: ["https://www.w3schools.com/images/lamp.jpg", "https://robohash.org/$10?set=set2&size=180x180"],
    content: "Can someone please recommend a good place to get a remote car starter installed on a subaru.  And what is the better unit (brand) and features to get.",
    Liked: 0,
    youLiked: false,
    comments: [],
  },
  {
    id: 1,
    user: "Ken",
    avator: charityFinder,
    location: "Toronto",
    time: "1 day ago",
    photo: [],
    content: "I’m searching for leave removal in the frond and backyard old plants removal, does anyone have any suggestions?",
    Liked: 4,
    youLiked: true,
    comments: [""],
  },
];

const HomePage = () => {
  const [postList, setPostList] = useState<Post[]>(postArray);

  const postChange = (inputPost: Post) => {
    const tempArray = postList.map(item => {
      if (item.id === inputPost.id) return inputPost;
      return item;
    });
    setPostList(tempArray);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingBottom: 50}}>
      {
        postList.map(item => <Post post={item} changePost={(e: Post) => postChange(e)}/>)
      }
    </div>
  )
}

export default HomePage;