import React, { useState, useMemo } from 'react';
import CourseFilter from '../CourseFilter';
import PostCard from './PostCard';

export default function PostList({ posts, onDelete, onUpdate }) {
  const [selectedCourse, setSelectedCourse] = useState('');

  const filteredPosts = useMemo(() => {
    if (!selectedCourse) return posts;
    return posts.filter(post => post.course === selectedCourse);
  }, [posts, selectedCourse]);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <CourseFilter selectedCourse={selectedCourse} onChange={setSelectedCourse} />

      {filteredPosts.length > 0 ? (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay publicaciones para este curso.
        </p>
      )}
    </div>
  );
}
