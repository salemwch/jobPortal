import React from 'react';
import Header from '../componenets/header';
import Footer from '../componenets/Footer';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Top 5 Tips to Ace Your Job Interview',
      date: 'March 25, 2025',
      author: 'Salem El-Mechkat',
      excerpt: 'Discover the secrets to impress recruiters and land your dream job. From confidence to communication, we cover it all.',
      image: '/uploads/blog1.jpg',
    },
    {
      title: 'How to Build a Standout CV in 2025',
      date: 'February 10, 2025',
      author: 'Code Whisperer',
      excerpt: 'A powerful CV is your key to opening doors. Learn how to format, write, and present your experiences the smart way.',
      image: '/uploads/blog2.jpg',
    },
    {
      title: 'Why Soft Skills Matter in the Tech World',
      date: 'January 20, 2025',
      author: 'Team JobPortal',
      excerpt: 'Beyond code and design, soft skills like empathy, communication, and leadership are reshaping the tech industry.',
      image: '/uploads/blog3.jpg',
    },
  ];

  return (
    <div>
      <Header />
      <div className="blog-container">
        <h1>Our Blog</h1>
        <p className="blog-subtitle">Insights, tips, and trends to power your career</p>

        <div className="blog-posts">
          {blogPosts.map((post, index) => (
            <div className="blog-card" key={index}>
              <img src={post.image} alt={post.title} />
              <div className="blog-content">
                <h2>{post.title}</h2>
                <p className="blog-meta">
                  {post.date} • By {post.author}
                </p>
                <p>{post.excerpt}</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Blog;
