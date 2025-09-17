import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Home.css";
import profilePic from "../src/assets/profile.jpg"; // Ensure you have your image in assets folder

const Home = () => {
  return (
    <div className="home-container">
      {/* Project Description */}
      <section className="project-description">
        <h1>Welcome to ServiceTrack</h1>
        <p>
          ServiceTrack is a vehicle service management system designed to help
          users keep track of their vehicle maintenance history, receive
          service reminders, and book service appointments seamlessly.
        </p>
        <p>
          With an intuitive interface and powerful features, ServiceTrack
          ensures that you never miss a service date and helps maintain your
          vehicle's health efficiently.
        </p>
        <p>
          Whether you're an individual vehicle owner or a service provider,
          ServiceTrack simplifies maintenance tracking and enhances the
          servicing experience.
        </p>
        <Link to="/vehicles" className="cta-button">Get Started</Link>
      </section>

      {/* Developer Info */}
      <section className="developer-info">
        <h2>Meet the Developer</h2>
        <div className="developer-card">
          <img src={profilePic} alt="Developer" className="developer-photo" />
          <div className="developer-details">
            <h3>Chinthada Bala Krishna Sai</h3>
            <p>Full Stack Developer | MERN Enthusiast</p>
            <p>
              Passionate about building efficient and scalable applications.
              Experienced in React.js, Node.js, MongoDB, and Express.js.
            </p>
            <p>
              I specialize in developing modern web applications that focus on
              performance, user experience, and functionality. Always eager to
              learn and implement the latest technologies.
            </p>
            <div className="social-links">
              <a href="https://github.com/Balakrishnasai712" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/balakrishna-sai-chinthada-9234a6272/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/balakrishnasaichinthada?igsh=MXFtM2ZnMGd1Y205dw==" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;