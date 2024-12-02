import React from 'react';
import { Link } from 'react-router-dom';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Footer } from '../components/home/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-github-dark">
      <HomeNavbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};