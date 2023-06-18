import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const loginResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (loginResult.error) {
        //cos jak błąd
      }
    } catch (error) {
      //znowu błąd
    }
  };

  return (
    <Layout title={'Login'}>
      <div className="flex w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-auto justify-center w-fit h-fit mt-12 bg-indigo-100 p-12 rounded-xl shadow-lg shadow-indigo-900"
        >
          <h1 className="text-3xl font-bold justify-center mx-auto w-fit mb-10">
            Login
          </h1>
          <div className="relative w-[300px]">
            <label htmlFor="email" className="mr-2 text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="absolute inset-y-0 right-0 rounded-md shadow-sm"
            ></input>
          </div>
          {errors.email && (
            <span style={{ color: 'red' }} className=" justify-end text-end">
              *Email is mandatory{' '}
            </span>
          )}
          <div className="relative mt-4 w-[300px]">
            <label htmlFor="password" className="mr-2 text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="absolute inset-y-0 right-0 rounded-md shadow-sm"
            ></input>
          </div>
          {errors.password && (
            <span style={{ color: 'red' }} className=" justify-end text-end">
              *Password is mandatory{' '}
            </span>
          )}
          <div className="flex mt-8">
            <button className="mx-auto w-full text-xl font-bold border rounded-xl border-indigo-950 bg-indigo-900 hover:bg-indigo-700 px-4 py-2 text-white">
              Log in
            </button>
          </div>
          <div className="flex mt-4">Not yet registered?</div>
          <Link href="register" className="font-bold">
            Register here
          </Link>
        </form>
      </div>
    </Layout>
  );
}
