import axios from 'axios';
import { Album, Comment, DashboardData, Photo, Post, User } from '@/types/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getDashboardData(): Promise<Partial<DashboardData>> {
  try {
    const [postsResponse, commentsResponse, albumsResponse, photosResponse, usersResponse] = await Promise.allSettled([
      axios.get<Post[]>(`${API_BASE_URL}/posts`),
      axios.get<Comment[]>(`${API_BASE_URL}/comments`),
      axios.get<Album[]>(`${API_BASE_URL}/albums`),
      axios.get<Photo[]>(`${API_BASE_URL}/photos`),
      axios.get<User[]>(`${API_BASE_URL}/users`),
    ]);

    return {
      posts: postsResponse.status === 'fulfilled' ? postsResponse.value.data.slice(0, 5) : undefined,
      comments: commentsResponse.status === 'fulfilled' ? commentsResponse.value.data.slice(0, 5) : undefined,
      albums: albumsResponse.status === 'fulfilled' ? albumsResponse.value.data.slice(0, 5) : undefined,
      photos: photosResponse.status === 'fulfilled' ? photosResponse.value.data.slice(0, 6) : undefined,
      users: usersResponse.status === 'fulfilled' ? usersResponse.value.data.slice(0, 5) : undefined,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}
