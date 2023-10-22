import "./Post.css";
import { Avatar, Paper } from '@mui/material';
import { blue, deepPurple } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { Post } from '../../pages/types/Post';
import { useState } from 'react';
import RowComponent from "../RowComponent";
import ColumnComponent from "../ColumnComponent";

type PostProps = {
  post: Post;
  changePost: (inputPost: Post) => void;
}

const Post = ({post, changePost}: PostProps) => {
  const [currentPost, setCurrentPost] = useState(post);
  const likeChange = () => {
    const temp = currentPost;
      if (currentPost.youLiked) {
        temp.youLiked = false;
        temp.Liked = temp.Liked - 1;
      }
      else {
        temp.youLiked = true;
        temp.Liked = temp.Liked + 1;
      }
      setCurrentPost(temp);
      changePost(temp);
  }
    return (
    <Paper elevation={2} sx={{ height: "fit-content", width: "70%" }}>
      <div style={{ display: "flex", flexDirection: "column", padding: 15, gap: 20}}>

        <RowComponent>
          <RowComponent>
            {
              currentPost.avator ?
              <Avatar alt={currentPost.avator} src={currentPost.avator} />
              :
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{currentPost.user.charAt(0)}</Avatar>
            }
            <ColumnComponent style={{ marginLeft: 15 }}>
              <span style={{ fontSize: 15, fontWeight: 600}}>{currentPost.user}</span>
              <span style={{ fontSize: 13 }}>{currentPost.location} • {currentPost.time}</span>
            </ColumnComponent>
          </RowComponent>
          <MoreHorizIcon style={{ cursor: "pointer" }}/>
        </RowComponent>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20}}>
          {currentPost.photo.map((item, index) => <img src={item} alt={`${item} ${index}`} width={300} height={300}/>)}
        </div>

        <div style={{ textAlign: "left"}}>
          {currentPost.content}
        </div>

        <RowComponent>
          {currentPost.Liked === 0 ? 
            <span style={{ color: "#b4b8b5"}}>Be the first to react</span>
            :
            <div style={{ display: "flex", alignItems: "center", gap: 5}}><ThumbUpIcon sx={{ color: blue[500] }}/> {currentPost.Liked}</div>
          }
          
          <RowComponent style={{gap: 10}}>
            {
              currentPost.youLiked ?
              <div
                className="option-style" onClick={likeChange}>
                <ThumbUpIcon sx={{ color: blue[500] }}/>
                <span style={{ color: blue[500] }}>Liked</span>
              </div>
              :
              <div className="option-style" onClick={likeChange}>
                <ThumbUpOutlinedIcon />
                Like
              </div>
            }

            <div className="option-style">
              <ModeCommentOutlinedIcon />
              {currentPost.comments.length === 0 ? "Comment" : currentPost.comments.length === 1 ? "1 Comment" : currentPost.comments.length + ' Comments'}
            </div>

            <div className="option-style">
              <IosShareOutlinedIcon />
              Share
            </div>
          </RowComponent>
        </RowComponent>
      </div>
  </Paper>
  )
}

export default Post;