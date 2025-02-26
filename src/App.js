import React, { useState, useEffect } from 'react';
import './App.scss';
import config from './data/config.json';
import enLocale from './data/locales/en.json';
import zhLocale from './data/locales/zh.json';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiJuejin } from 'react-icons/si';
import { 
  SiReact, SiPython, SiDocker, SiJavascript, SiNodedotjs,
  SiMongodb, SiGit, SiMysql, SiRedis
} from 'react-icons/si';

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
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('locale', locale);
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [locale, theme]);

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
    'Python': <SiPython />,
    'Docker': <SiDocker />,
    'JavaScript': <SiJavascript />,
    'Node.js': <SiNodedotjs />,
    'MongoDB': <SiMongodb />,
    'Git': <SiGit />,
    'MySQL': <SiMysql />,
    'Redis': <SiRedis />
  };

  return (
    <>
      <div className="theme-controls">
        <button className="language-toggle" onClick={toggleLocale}>
          {locale === 'zh' ? 'EN' : '中'}
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

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
              <div className="portfolio-card">
                <div className="card-icon">🏆</div>
                <div className="card-content">
                  <h3>{t.achievements.patent.title}</h3>
                  <p>{t.achievements.patent.desc}</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="card-icon">📚</div>
                <div className="card-content">
                  <h3>{t.achievements.articles.title}</h3>
                  <p>{t.achievements.articles.desc}</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="card-icon">🎯</div>
                <div className="card-content">
                  <h3>{t.achievements.opensource.title}</h3>
                  <p>{t.achievements.opensource.desc}</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="card-icon">🎓</div>
                <div className="card-content">
                  <h3>{t.achievements.certification.title}</h3>
                  <p>{t.achievements.certification.desc}</p>
                </div>
              </div>
            </div>

            <div className="projects-grid">
              {config.projects.map(project => (
                <a 
                  key={project.id} 
                  href={project.demoUrl || project.githubUrl} 
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
  );
}

export default App; 