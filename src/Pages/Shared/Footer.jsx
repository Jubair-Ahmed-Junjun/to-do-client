import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
import { GrTwitter } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const Footer = () => {
  const Year = new Date().getFullYear();
  const navLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'My Task', path: '/myTask' },
    { id: 3, name: 'Add Task', path: '/addTask' },
  ];
  return (
    <>
      <div className="bg-black">
        <div style={{ maxWidth: '1200px' }} className="mx-auto">
          <div className="container px-4 md:px-0 mx-auto py-5">
            <div className="sm:flex justify-between ">
              <div className="text-white">
                <Link to="/" className="text-base-100 text-3xl font-bold">
                  Task Calc.
                </Link>
                <p className="mt-5">&copy; {Year} All rights reserved.</p>
                <p>
                  Developed by{' '}
                  <a
                    href="https://github.com/iinaamasum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-red-500">iinaamasum</span>
                  </a>
                </p>
              </div>
              <div className="block my-8 sm:my-10 order-last md:order-none sm:hidden md:block">
                <div className="text-white flex justify-center items-center">
                  <a
                    href="https://www.facebook.com/iinaamasum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsFacebook
                      size={40}
                      className="mr-3 cursor-pointer hover:text-slate-300"
                    />
                  </a>
                  <a
                    href="https://github.com/iinaamasum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillGithub
                      size={40}
                      className="mr-3 cursor-pointer hover:text-slate-300"
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/iinaamasum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsLinkedin
                      size={40}
                      className="mr-3 cursor-pointer hover:text-slate-300"
                    />
                  </a>
                  <a
                    href="https://twitter.com/iinaamasum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GrTwitter
                      size={40}
                      className="mr-3 cursor-pointer hover:text-slate-300"
                    />
                  </a>
                </div>
              </div>

              <div className="order-none md:order-last">
                <h4 className="text-blue-500 text-xl my-2">Shortcuts links</h4>
                <div className="flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      className="mr-0 md:mr-10 text-md font-semibold text-gray-400 hover:text-red-800 transition-all duration-150 ease-in-out"
                      to={link.path}
                      key={link.id}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
