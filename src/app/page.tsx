"use client";

import { FC } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Album, Comment, DashboardData, Photo, Post, User } from '@/types/types';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ErrorMessage: FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error:</strong>
    <span className="block sm:inline"> {message}</span>
  </div>
);

const LoadingMessage: FC = () => (
  <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative" role="alert">
    Loading...
  </div>
);

const Section: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white p-4 rounded-md shadow-md">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    {children}
  </section>
);

const CRMDashboard: FC = () => {
  const { data, error } = useSWR<DashboardData>('/api/bff/dashboard', fetcher);

  if (error) return <ErrorMessage message="Failed to fetch dashboard data" />;
  if (!data) return <LoadingMessage />;

  return (
    <div className="crm-dashboard bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">BFF Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Posts Section */}
        <Section title="Posts">
          {!data.posts ? (
            <ErrorMessage message="Failed to load posts." />
          ) : (
            <ul>
              {data.posts.map((post: Post) => (
                <li key={post.id} className="text-gray-600 hover:text-gray-800">
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Comments Section */}
        <Section title="Comments">
          {!data.comments ? (
            <ErrorMessage message="Failed to load comments." />
          ) : (
            <ul>
              {data.comments.map((comment: Comment) => (
                <li key={comment.id} className="text-gray-600 hover:text-gray-800">
                  {comment.name}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Albums Section */}
        <Section title="Albums">
          {!data.albums ? (
            <ErrorMessage message="Failed to load albums." />
          ) : (
            <ul>
              {data.albums.map((album: Album) => (
                <li key={album.id} className="text-gray-600 hover:text-gray-800">
                  {album.title}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Photos Section */}
        <Section title="Photos">
          {!data.photos ? (
            <ErrorMessage message="Failed to load photos." />
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo: Photo) => (
                <div key={photo.id} className="photo-item">
                  <img src={photo.thumbnailUrl} alt={photo.title} className="rounded-md" />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Users Section */}
        <Section title="Users">
          {!data.users ? (
            <ErrorMessage message="Failed to load users." />
          ) : (
            <ul>
              {data.users.map((user: User) => (
                <li key={user.id} className="text-gray-600 hover:text-gray-800">
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
};

export default CRMDashboard;
