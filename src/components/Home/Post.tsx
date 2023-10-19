import { Avatar, Paper } from '@mui/material';
import { blue, deepPurple } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { Post } from '../types/Post';
import { useState } from 'react';

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

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            {
              currentPost.avator ?
              <Avatar alt={currentPost.avator} src={currentPost.avator} />
              :
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{currentPost.user.charAt(0)}</Avatar>
            }
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", marginLeft: 15}}>
              <span style={{ fontSize: 15, fontWeight: 600}}>{currentPost.user}</span>
              <span style={{ fontSize: 13 }}>{currentPost.location} • {currentPost.time}</span>
            </div>
          </div>
          <MoreHorizIcon style={{ cursor: "pointer" }}/>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20}}>
          {currentPost.photo.map((item, index) => <img src={item} alt={`${item} ${index}`} width={300} height={300}/>)}
        </div>

        <div style={{ textAlign: "left"}}>
          {currentPost.content}
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          {currentPost.Liked === 0 ? 
            <span style={{ color: "#b4b8b5"}}>Be the first to react</span>
            :
            <div style={{ display: "flex", alignItems: "center", gap: 5}}><ThumbUpIcon sx={{ color: blue[500] }}/> {currentPost.Liked}</div>
          }
          
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10}}>
            {
              currentPost.youLiked ?
              <div
                className="optionStyle" onClick={() => likeChange()}>
                <ThumbUpIcon sx={{ color: blue[500] }}/>
                <span style={{ color: blue[500] }}>Liked</span>
              </div>
              :
              <div className="optionStyle" onClick={() => likeChange()}>
                <ThumbUpOutlinedIcon />
                Like
              </div>
            }

            <div className="optionStyle">
              <ModeCommentOutlinedIcon />
              {currentPost.comments.length === 0 ? "" : ` ${currentPost.comments.length} `}
              Comment
            </div>

            <div className="optionStyle">
              <IosShareOutlinedIcon />
              Share
            </div>
          </div>
        </div>
      </div>
  </Paper>
  )
}

export default Post;