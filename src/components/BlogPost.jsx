import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { IoArrowBack } from 'react-icons/io5';

export default function BlogPost({ posts, locale }) {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-post">
        <Link to="/blog" className="back-button">
          <IoArrowBack />
          <span>{locale === 'zh' ? '返回' : 'Back'}</span>
        </Link>
        <div className="not-found">
          {locale === 'zh' ? '文章未找到' : 'Post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <Link to="/blog" className="back-button">
        <IoArrowBack />
        <span>{locale === 'zh' ? '返回' : 'Back'}</span>
      </Link>
      
      <article className="markdown-content">
        <h1>{post.title || 'Untitled'}</h1>
        <div className="post-meta">
          <span className="post-date">{post.date || 'No date'}</span>
          <div className="post-tags">
            {Array.isArray(post.tags) && post.tags.length > 0 ? (
              post.tags.map(tag => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))
            ) : (
              <span className="blog-tag">未分类</span>
            )}
          </div>
        </div>
        {/* 确保 content 是字符串 */}
        {typeof post.content === 'string' ? (
          <ReactMarkdown>{post.content}</ReactMarkdown>
        ) : (
          <p>{locale === 'zh' ? '内容加载错误' : 'Error loading content'}</p>
        )}
      </article>
    </div>
  );
} 