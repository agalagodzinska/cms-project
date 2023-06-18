import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const router = useRouter();
  const { redirect } = router.query;

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      const registerResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log('onsubmit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      if (registerResult.error) {
        //cos jak błąd
        console.log('error1 ugvcfdfghnjmnhbgvgbhjngvbhjnbghnj');
      }
    } catch (error) {
      console.log('error2 xecrtvbyunbytvcrxectvbyunbytvcrxecrtvbyun');
      //znowu błąd
    }
  };

  return (
    <Layout title={'Register'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-auto justify-center w-fit h-fit my-auto bg-indigo-100 p-12 rounded-xl shadow-lg shadow-indigo-900"
      >
        <h1 className="text-3xl font-bold justify-center mx-auto w-fit mb-10">
          Register
        </h1>
        <div className="relative w-[360px]">
          <label htmlFor="name" className="mr-2 text-xl">
            Name
          </label>
          <input
            type="text"
            className="absolute inset-y-0 right-0 rounded-md shadow-sm"
            id="name"
            {...register('name', {
              required: 'Please enter name',
            })}
          ></input>
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="relative w-[360px] mt-4">
          <label htmlFor="email" className="mr-2 text-xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="absolute inset-y-0 right-0  rounded-md shadow-sm"
          ></input>
          {errors.email && (
            <span style={{ color: 'red' }} className=" justify-end text-end">
              *Email is mandatory{' '}
            </span>
          )}
        </div>

        <div className="relative mt-4 w-[360px]">
          <label htmlFor="password" className="mr-2 text-xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="absolute inset-y-0 right-0  rounded-md shadow-sm"
          ></input>
          {errors.password && (
            <span style={{ color: 'red' }} className=" justify-end text-end">
              *Password is mandatory{' '}
            </span>
          )}
        </div>

        <div className="relative mt-4 w-[360px]">
          <label htmlFor="confirmPassword" className="mr-2 text-xl">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm password',
              validate: (value) => value === getValues('password'),
            })}
            className="absolute inset-y-0 right-0  rounded-md shadow-sm"
          ></input>
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">{'Passwords do not match'}</div>
            )}

          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
        </div>
        <div className="flex mt-8">
          <button className="mx-auto w-full text-xl font-bold border rounded-xl border-indigo-950 bg-indigo-900 hover:bg-indigo-700 px-4 py-2 text-white">
            Register
          </button>
        </div>
        <div className="flex mt-4">Already have an account?</div>
        <Link href="login" className="font-bold">
          Log in
        </Link>
      </form>
    </Layout>
  );
}
