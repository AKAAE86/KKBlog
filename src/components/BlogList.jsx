import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogList({ posts, locale }) {
  if (!Array.isArray(posts)) {
    return (
      <div className="blog-grid">
        <div className="no-posts">
          {locale === 'zh' ? '加载博客文章出错' : 'Error loading posts'}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="blog-grid">
        <div className="no-posts">
          {locale === 'zh' ? '暂无博客文章' : 'No posts yet'}
        </div>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {posts.map(post => (
        <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card">
          <div className="blog-content">
            <h3>{post.title || 'Untitled'}</h3>
            <p className="blog-description">
              {post.description || 'No description available'}
            </p>
            <div className="blog-meta">
              <span className="blog-date">
                {post.date || 'No date'}
              </span>
              <div className="blog-tags">
                {Array.isArray(post.tags) && post.tags.length > 0 ? (
                  post.tags.map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))
                ) : (
                  <span className="blog-tag">未分类</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 