import React, { useState, useEffect } from 'react';
import './App.scss';
import config from './data/config.json';
import enLocale from './data/locales/en.json';
import zhLocale from './data/locales/zh.json';
import { FaGithub, FaLinkedin, FaEnvelope, FaJava, FaLanguage } from 'react-icons/fa';
import { SiLeetcode, SiJuejin, SiAndroid, SiKotlin, SiTypescript, SiSwift, SiGraphql, SiLanguagetool } from 'react-icons/si';
import { 
  SiReact, SiPython, SiDocker, SiJavascript, SiNodedotjs,
  SiMongodb, SiGit, SiMysql, SiRedis
} from 'react-icons/si';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import { loadBlogPosts } from './utils/blogLoader';
import { IoLanguage, IoLanguageOutline } from 'react-icons/io5';

function App() {
  const { personalInfo } = config;
  const [currentSlogan, setCurrentSlogan] = React.useState(0);
  const slogans = [
    "The best way to predict the future is to create it",
    "Innovation distinguishes between a leader and a follower"
  ];

  const [locale, setLocale] = useState(
    localStorage.getItem('locale') || 
    (navigator.language.startsWith('zh') ? 'zh' : 'en')
  );
  const t = locale === 'zh' ? zhLocale : enLocale;

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // 添加博客文章状态
  const [posts, setPosts] = useState([]);

  // 添加当前 tab 状态
  const [activeTab, setActiveTab] = useState(
    window.location.pathname === '/blog' ? 'blog' : 'home'
  );

  useEffect(() => {
    localStorage.setItem('locale', locale);
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [locale, theme]);

  // 修改博客文章加载逻辑
  useEffect(() => {
    console.log('Starting to load blog posts in App...');
    loadBlogPosts({ locale })
      .then(loadedPosts => {
        console.log('Successfully loaded posts:', loadedPosts);
        if (Array.isArray(loadedPosts)) {
          setPosts(loadedPosts);
        } else {
          console.error('Loaded posts is not an array:', loadedPosts);
          setPosts([]);
        }
      })
      .catch(error => {
        console.error('Failed to load posts:', error);
        setPosts([]);
      });
  }, [locale]);

  // 更新路由时同步 tab
  useEffect(() => {
    const handleRouteChange = () => {
      setActiveTab(window.location.pathname === '/blog' ? 'blog' : 'home');
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const toggleLocale = () => {
    setLocale(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 8000); // 8秒切换一次

    return () => clearInterval(timer);
  }, []);

  // 创建一个图标映射对象
  const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    email: <FaEnvelope />,
    leetcode: <SiLeetcode />,
    juejin: <SiJuejin />
  };

  // 定义技术栈图标映射
  const skillIcons = {
    'React': <SiReact />,
    'Android': <SiAndroid />,
    'Java': <FaJava />,
    'JavaScript': <SiJavascript />,
    'Kotlin': <SiKotlin />,
    'TypeScript': <SiTypescript />,
    'Swift': <SiSwift />,
    "GraphQL": <SiGraphql />
  };

  return (
    <Router>
      <div className="theme-controls">
        <button onClick={toggleLocale}>
          <IoLanguageOutline />
        </button>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <nav className="tab-bar">
        <Link 
          to="/" 
          className={`tab-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          {locale === 'zh' ? '主页' : 'Home'}
        </Link>
        <Link 
          to="/blog" 
          className={`tab-item ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          {locale === 'zh' ? '博客' : 'Blog'}
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <div className="slogan-container">
              <h1 className="typewriter">
                {`"${slogans[currentSlogan]}"`.split('').map((char, index) => (
                  <span key={`${currentSlogan}-${index}`}>{char}</span>
                ))}
              </h1>
            </div>
            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src={personalInfo.avatar} alt={personalInfo.name} />
                </div>
                <h1 className="profile-name">{personalInfo.name}</h1>
                <p className="profile-title">{personalInfo.title}</p>
                
                <div className="about-section">
                  <p className="profile-bio">{t.about.bio1}</p>
                  <p className="profile-bio">{t.about.bio2}</p>
                </div>

                <div className="social-links-grid">
                  {personalInfo.social.github && (
                    <a href={personalInfo.social.github} className="social-card" target="_blank" rel="noopener noreferrer">
                      <div className="social-icon">{socialIcons.github}</div>
                    </a>
                  )}

                  {personalInfo.social.linkedin && (
                    <a href={personalInfo.social.linkedin} className="social-card" target="_blank" rel="noopener noreferrer">
                      <div className="social-icon">
                        {socialIcons.linkedin}
                      </div>
                    </a>
                  )}

                  {personalInfo.social.email && (
                    <a href={`mailto:${personalInfo.social.email}`} className="social-card">
                      <div className="social-icon">
                        {socialIcons.email}
                      </div>
                    </a>
                  )}
                </div>
              </div>

              <div className="content-section">
                <section className="skills-section">
                  <h2 className="section-title">{t.sections.skills}</h2>
                  <div className="skills-grid">
                    {personalInfo.skills.map(skill => (
                      <div key={skill} className="skill-card" title={skill}>
                        <div className="skill-icon">{skillIcons[skill]}</div>
                        <span className="skill-name">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="portfolio-section">
                  <h2 className="section-title">{t.sections.achievements}</h2>
                  <div className="card-grid">
                    {Object.keys(t.achievements).map(key => (
                      t.achievements[key].link ? (
                        <a 
                          key={key}
                          href={t.achievements[key].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            display: 'block',
                            color: 'inherit',
                            textDecoration: 'none'
                          }}
                        >
                          <div className="portfolio-card">
                            <div className="card-icon">{t.achievements[key].icon || '🏆'}</div>
                            <div className="card-content">
                              <h3>{t.achievements[key].title}</h3>
                              <p>{t.achievements[key].desc}</p>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <div className="portfolio-card" key={key}>
                          <div className="card-icon">{t.achievements[key].icon || '🏆'}</div>
                          <div className="card-content">
                            <h3>{t.achievements[key].title}</h3>
                            <p>{t.achievements[key].desc}</p>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </section>

                <section className="projects-section">
                  <h2 className="section-title">{t.sections.projects}</h2>
                  <div className="projects-grid">
                    {t.projects.map(project => (
                      <a 
                        key={project.id} 
                        href={project.url} 
                        className="project-card"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <div className="project-image">
                          <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-content">
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        } />
        <Route path="/blog" element={<BlogList posts={posts} locale={locale} />} />
        <Route path="/blog/:slug" element={<BlogPost posts={posts} locale={locale} />} />
      </Routes>
    </Router>
  );
}

export default App; 