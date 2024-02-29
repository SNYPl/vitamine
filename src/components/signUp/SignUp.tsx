"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "../button/Button";
import { createUser } from "@/lib/auth";
import axios, { AxiosError } from "axios";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp: React.FC = ({}) => {
  const [signUpHandler, setSignUpHandler] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const create = await createUser(data);

    // console.log(create);

    try {
      const response = await axios.post(`/api/auth/signup`, { ...data });
    } catch (error) {
      const err = error as AxiosError;

      // Check if error has response property
      if (err.response && err.response.data) {
        console.log("Server error status:", err.response.status);
        console.log("Server error data:", err.response.data);
      }
    }
  };

  return (
    <section className={style.signUp}>
      <h2>რეგისტრაცია</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <div className={`${style.input}`}>
          <label htmlFor="username">სახელი</label>
          <input
            type="text"
            placeholder="სახელი"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
              minLength: {
                value: 6,
                message: "მინიმუმ 6 ასო",
              },
            })}
            style={{ border: errors.username ? "1px solid red" : "" }}
          />
          {errors.username && (
            <p className={style.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={`${style.input}`}>
          <label htmlFor="emailInput">ელ.ფოსტა</label>
          <input
            type="text"
            placeholder="ელ.ფოსტა"
            id="emailInput"
            {...register("email", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "საჭიროა ელ.ფოსტის ფორმატი",
              },
            })}
          />
          {errors.email && (
            <p className={style.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">პაროლი</label>
          <input
            type="password"
            placeholder={"პაროლი"}
            {...register("password", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
              minLength: {
                value: 6,
                message: "მინიმუმ 6 სიმბოლო",
              },
            })}
          />
          {errors.password && (
            <p className={style.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">გაიმეორეთ პაროლი</label>
          <input
            type="password"
            placeholder={"გაიმეორეთ პაროლი"}
            {...register("repeatPassword", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },

              validate: (val) => {
                if (watch("password") !== val) {
                  return "პაროლები არ ემთხვევა";
                }
              },
            })}
          />
          {errors.repeatPassword && (
            <p className={style.error}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <Button type="submit" className={style.btn}>
          რეგისტრაცია
        </Button>
      </form>

      <div className={style.createCont}>
        <Link href="/login">ან გაიარე ავტორიზაცია</Link>
      </div>
    </section>
  );
};

export default SignUp;
