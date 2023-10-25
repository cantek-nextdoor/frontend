import { status } from "../../components/entities/status";
// export type Post = {
//   id: number,
//   user: string,
//   avator?: string,
//   location: string,
//   time: string,
//   photo: string[],
//   content: string,
//   Liked: number,
//   youLiked: boolean,
//   comments: string[],
// };

export type Post = {
  userId: string,
  postId: string;
  title: string;
  imageUrl: string;
  description: string;
  tags: string[];
  points: number;
  numOfLike: number;
  postedDate: Date;
  eventDate: Date;
  status: status;
  likedUserList: string[];
  youLiked: boolean;
  LikedNum: number;
  avator?: string,
};