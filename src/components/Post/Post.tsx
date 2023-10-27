import "./Post.css";
import {Avatar, Paper} from '@mui/material';
import { deepPurple} from '@mui/material/colors';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import {Post} from '../../pages/types/Post';
import {useState} from 'react';
import RowComponent from "../RowComponent";
import ColumnComponent from "../ColumnComponent";
import CustomMenu from "../CustomMenu";
import {getUserDetailRequest} from "../../axios/user";


type PostProps = {
    post: Post;
    changePost: (inputPost: Post) => void;
}

const Post = ({post}: PostProps) => {
  const [currentPost] = useState(post);
  const [displayName, setDisplayName] = useState("");
  const createdPostUserId = currentPost.userId;
  const apiUrl = '/api/user/details/' + createdPostUserId;

getUserDetailRequest(apiUrl)
    .then((response) => {
        setDisplayName(response.data.displayName);
    })
    .catch((error) => {
        console.error(error);
    });


    return (
    <Paper elevation={2} sx={{ height: "fit-content", width: "70%" }}>
      <div style={{ display: "flex", flexDirection: "column", padding: 15, gap: 20}}>
        <RowComponent>
          <RowComponent>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{displayName?.charAt(0)}</Avatar>
            <ColumnComponent style={{ marginLeft: 15 }}>
              <span style={{ fontSize: 15, fontWeight: 600}}>{displayName}</span>
            </ColumnComponent>
          </RowComponent>
          <CustomMenu />
        </RowComponent>

        <div style={{ textAlign: "left"}}>
          {currentPost.description}
        </div>

       <RowComponent>
          <RowComponent style={{gap: 10, justifyContent: "flex-end", width: "100%" }}>
<div className="option-style">
                            <IosShareOutlinedIcon/>
                            Share
                        </div>
                    </RowComponent>
                </RowComponent>
            </div>
        </Paper>
    )
}

export default Post;