import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/images/banner.jpg';
import Navbar from '../../Pages/Shared/Navbar';

const Home = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        backgroundImage: `url(${banner})`,
        minHeight: '',
      }}
      className="bg-no-repeat bg-cover bg-center"
    >
      <div
        style={{
          backdropFilter: 'brightness(.6)',
          height: '90vh',
        }}
        className="h-full"
      >
        <Navbar />
        <div className="flex justify-center items-center h-full text-center">
          <div className="">
            <h4 className="text-lg text-gray-300 font-semibold">
              Are you looking for an attractive task manager for your task
              organization? Here is a simple solution for you.
            </h4>
            <h1 className="text-6xl text-white font-bold">Task Calculator</h1>
            <button
              onClick={() => navigate('/addTask')}
              className="btn btn-accent mt-5"
            >
              Manage Your Task Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
