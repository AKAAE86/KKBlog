import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import config from '../data/config.json';

const Header = () => {
  const { personalInfo } = config;

  return (
    <header className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="header-content"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <motion.img
            src={personalInfo.avatar}
            alt={personalInfo.name}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
            whileHover={{ scale: 1.05 }}
          />
          
          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
            >
              {personalInfo.name}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '1.5rem', color: '#666', marginBottom: '1rem' }}
            >
              {personalInfo.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ maxWidth: '600px', marginBottom: '1.5rem' }}
            >
              {personalInfo.bio}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.social.email}`}
                className="button"
              >
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                简历
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header; 