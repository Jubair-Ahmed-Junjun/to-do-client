import React, { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/log.png';
import auth from '../../firebase.init.js';
import Navbar from '../Shared/Navbar';
import Social from './Social';

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [signInWithEmailAndPassword, userLogin, loadingLogin, errorLogin] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.displayName}`);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  return (
    <>
      <Navbar />
      <section className="my-10">
        <div style={{ maxWidth: '1024px' }} className="container mx-auto px-4">
          <div className="md:flex md:flex-row-reverse">
            <img
              className="w-full md:w-1/2 hidden md:block pt-10"
              src={loginImg}
              alt=""
            />

            <div class="card w-full md:w-1/2 bg-base-100 shadow-lg mr-2">
              <div class="card-body">
                <h2 class="card-title mx-auto text-4xl md:my-5">LogIn</h2>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-control w-full">
                    <label class="">
                      <span class="text-secondary font-semibold text-lg">
                        Email
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="example@email.com"
                      class="input input-bordered w-full"
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Email Required !!!',
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          message: 'Invalid Email Provided !!!',
                        },
                      })}
                    />
                    <label class="level font-bold">
                      {errors.email?.type === 'required' && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === 'pattern' && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div class="form-control w-full">
                    <label class="">
                      <span class="text-secondary font-semibold text-lg">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="abcd123$"
                      class="input input-bordered w-full"
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Password Required !!!',
                        },
                        pattern: {
                          value: /(?=.*[!#$%&?^*@~() "])(?=.{8,})/,
                          message:
                            'Password Must be 8 char including a special char !!!',
                        },
                      })}
                    />
                    <label class="level font-bold">
                      {errors.password?.type === 'required' && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                      {errors.password?.type === 'pattern' && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <p className="mt-10">
                    Don't have an account?{' '}
                    <Link
                      className="btn-link text-purple-500 font-semibold"
                      to="/register"
                    >
                      Register Now
                    </Link>
                  </p>
                  <p>
                    Forgot Password?{' '}
                    <Link
                      className="btn-link text-purple-500 font-semibold"
                      to="/resetPass"
                    >
                      Click Here To Reset
                    </Link>
                  </p>

                  <input
                    className="btn btn-accent my-3 w-full tracking-wider capitalize text-xl"
                    value="LogIn"
                    type="submit"
                  />
                </form>
                <div class="divider text-lg font-semibold">Social LogIn</div>
                <Social />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
