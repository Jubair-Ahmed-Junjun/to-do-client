import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../../assets/images/signup.jpg';
import auth from '../../firebase.init.js';
import Navbar from '../Shared/Navbar';
import Social from './Social';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, userInput, loadingInput, errorInput] =
    useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  const onSubmit = async (data) => {
    console.log(data);
    setName(data.name);
    await createUserWithEmailAndPassword(data.email, data.password);
    const { data: tokenData } = await axios.post(
      'https://secret-castle-68433.herokuapp.com/login',
      {
        email: data.email,
      }
    );
    localStorage.setItem('token', tokenData.token);
  };
  console.log(user);

  useEffect(() => {
    if (user) {
      user.displayName = name;
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <section className="my-10">
        <div style={{ maxWidth: '1024px' }} className="container mx-auto px-4">
          <div className="md:flex">
            <img
              className="w-full md:w-1/2 hidden md:block rounded-xl mr-6 shadow-xl"
              src={registerImg}
              alt=""
            />

            <div class="card w-full md:w-1/2 bg-base-100 shadow-lg mr-2">
              <div class="card-body">
                <h2 class="card-title mx-auto text-4xl">Register</h2>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-control w-full">
                    <label class="">
                      <span class="text-secondary font-semibold text-lg">
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      class="input input-bordered w-full"
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Name is Required !!!',
                        },
                      })}
                    />
                    <label class="level font-bold">
                      {errors.name?.type === 'required' && (
                        <span className="label-text-alt text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </label>
                  </div>

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
                          message: 'Email is Required !!!',
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
                          message: 'Password is Required !!!',
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
                    Already have an account?{' '}
                    <Link
                      className="btn-link text-purple-500 font-semibold"
                      to="/login"
                    >
                      Login Now
                    </Link>
                  </p>

                  <input
                    className="btn btn-accent my-3 w-full tracking-wider capitalize text-xl"
                    value="Register"
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

export default Register;
