import {status} from "../../components/entities/status";
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

export enum category {
  all = 'all',
  post = 'post',
  activity = 'activity',
  sale = 'sale',
}

export type Post = {
  postId: string;
  title: string;
  imageUrl: string;
  description: string;
  tags: string[];
  points: number;
  userId: string,
  numOfLike: number;
  postedDate: string;
  status: status;
  likedUserList: string[];
  categories: category;
  postalCode?: string;
  latitude?: number,
  longitude?: number,
  eventDateAndTime?: Date;
};
