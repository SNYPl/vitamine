"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "../button/Button";
import axios from "axios";
import { useMutation } from "react-query";
import { Spin } from "antd";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // Define the mutation function
  const signUpMutation = useMutation(
    (data: Inputs) => axios.post(`/api/auth/signup`, { ...data }),
    {
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        return error;
      },
    }
  );

  const { error, data, isLoading, isError, isSuccess } = signUpMutation;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signUpMutation.mutate(data);
  };

  if (data?.status === 200 && isSuccess) {
    return (
      <section className={`${style.signUp} ${style.succesSng}`}>
        <p>რეგისტრაცია წარმატებით დასრულდა</p>
        <p>ანგარიშის გასააქტიურებლად, შეამოწმეთ თქვენი ელ.ფოსტა</p>
      </section>
    );
  }

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
        {isError && error?.response?.status === 400 && (
          <p className={style.mainErr}>
            ამ სახელით ან ელ.ფოსტით, უკვე არსებობს ანგარიში
          </p>
        )}
        {isError && error?.response?.status !== 400 && (
          <p className={style.mainErr}>შეცდომაა, მოგვიანებით სცადეთ </p>
        )}

        <Button type="submit" className={style.btn}>
          {isLoading ? <Spin /> : "რეგისტრაცია"}
        </Button>
      </form>

      <div className={style.createCont}>
        <Link href="/login">ან გაიარე ავტორიზაცია</Link>
      </div>
    </section>
  );
};

export default SignUp;
