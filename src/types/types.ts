export interface DashboardData {
  posts: Post[];
  comments: Comment[];
  albums: Album[];
  photos: Photo[];
  users: User[];
}

export interface Post {
  id: number;
  title: string;
}

export interface Comment {
  id: number;
  name: string;
}

export interface Album {
  id: number;
  title: string;
}

export interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

export interface User {
  id: number;
  name: string;
}