export type Post = {
  id: number,
  user: string,
  avator?: string,
  location: string,
  time: string,
  photo: string[],
  content: string,
  Liked: number,
  youLiked: boolean,
  comments: string[],
};
