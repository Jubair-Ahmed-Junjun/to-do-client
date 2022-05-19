import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { MdCloseFullscreen } from 'react-icons/md';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'My Task', path: '/myTask' },
    { id: 3, name: 'Add Task', path: '/addTask' },
  ];
  return (
    <section
      style={{ maxWidth: '1024px' }}
      className="container px-2 mx-auto pt-1 sticky top-0 z-30"
    >
      <div className="navbar bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] rounded-full text-gray-100 flex">
        <div className="flex justify-between items-center w-full mx-3">
          <div
            className={`drawer ml-0 -mt-1 rounded-r lg:hidden absolute left-0 top-0 bg-accent z-50 ${
              drawerOpen ? 'w-2/3 sm:w-1/2' : 'hidden'
            } `}
          >
            <div className="drawer-side rounded mx-auto mt-5">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 overflow-y-auto bg-accent text-base-content w-full">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link className="text-white" to={link.path}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {user ? (
                <button
                  onClick={() => signOut(auth)}
                  className="w-full btn btn-accent  my-2"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    className="w-full btn btn-accent text-white my-2"
                    to="/login"
                  >
                    LogIn
                  </Link>
                  <Link
                    className="w-full btn bg-white hover:bg-gray-100 outline-none border-0 text-accent"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <Link
            to="/"
            className="font-bold normal-case text-2xl flex items-center"
          >
            <span className="text-accent">Task Calc.</span>
          </Link>

          <div className="lg:hidden">
            <label className="btn btn-circle swap swap-rotate">
              <input type="checkbox" />

              <MdCloseFullscreen
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="swap-on fill-current"
                size={30}
              />
              <AiOutlineMenuUnfold
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="swap-off fill-current"
                size={30}
              />
            </label>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {navLinks.map((link) => (
              <li key={link.id} className="mr-1">
                <Link className="text-[16px] font-semibold" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <button
              onClick={() => {
                toast.success(`Good Bye ${user.displayName}`);
                signOut(auth);
              }}
              className="btn btn-outline text-lg rounded-full capitalize mr-2"
              to="/login"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link className="btn btn-accent mr-2" to="/login">
                LogIn
              </Link>
              <Link
                className="btn bg-white hover:bg-gray-100 outline-none border-0 text-accent mr-2"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
