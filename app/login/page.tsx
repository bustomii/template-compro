/* eslint-disable @next/next/no-img-element */
"use client";
import { FormEventHandler, useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import InputError from '@/components/InputError';
import Turnstile from 'react-turnstile';

export default function Login() {
    const { data: session, status } = useSession()
    const [errors, setErrors] = useState<any>({});
    const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const result: any = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
            captcha: data.captcha,
        })

        if (result.errors) {
            setErrors(result.errors);
            return;
        } else {
            window.location.href = "/users"
        }
    }

    const [data, setData] = useState({
        email: "",
        password: "",
        captcha: "",
    });

    useEffect(() => {
        if (status === 'authenticated') {
            window.location.href = "/users"
        }
    }, [session, status])



    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-xl sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 relative">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div>
                            <img src="/assets/icons/logo-black.png" alt="Astronacci" className='w-56' />
                        </div>
                        <div className="w-full mt-8">
                            <form onSubmit={submitForm}>
                                <input
                                    id="captcha"
                                    type="hidden"
                                    name="captcha"
                                    value={data.captcha}
                                />

                                <div className="mx-auto max-w-xs">
                                    <input
                                        required
                                        value={data.email}
                                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#F4273A] focus:ring-0 focus:bg-white"
                                        type="email" placeholder="Email"
                                        onChange={(e) => setData({
                                            ...data,
                                            email: e.target.value
                                        })}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                    <input
                                        required
                                        value={data.password}
                                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#F4273A] focus:ring-0 focus:bg-white mt-5"
                                        type="password" placeholder="Password"
                                        onChange={(e) => setData({
                                            ...data,
                                            password: e.target.value
                                        })}
                                    />
                                    <InputError message={errors.password} className="mt-2" />

                                    <div className='w-full flex justify-center mt-4 flex-col items-center'>
                                        <Turnstile sitekey='0x4AAAAAAAVA44kAxMVPF7Me'
                                            onVerify={(token) => {
                                                setData({
                                                    ...data,
                                                    captcha: token
                                                })
                                            }}
                                            theme='light'
                                        />

                                        <InputError message={errors.captcha} className="mt-2" />
                                    </div>
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-[#F4273A] text-gray-100 w-full py-4 rounded-lg hover:bg-[#FFBD51] hover:text-black hover:font-bold transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Sign in
                                        </span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by Astronacci International &nbsp;
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Terms of Service
                                        </a>&nbsp;
                                        and its&nbsp;
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-[#F4273A] bg-opacity-5 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('/assets/images/login.png')`
                        }}>
                    </div>
                </div>
            </div>
        </div>
    )

}