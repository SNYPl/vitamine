"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "../button/Button";

type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={style.login}>
      <h2>ავტორიზაცია</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <div className={`${style.input}`}>
          <label htmlFor="username">სახელი</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.username ? "1px solid red" : "" }}
          />
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="loginpassword">პაროლი</label>
          <input
            type="password"
            id="loginpassword"
            {...register("password", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={style.forgot}>
          <label>
            <input type="checkbox" {...register("remember")} />
            დამიმახსოვრე
          </label>

          <Link href={"/forgot"}>დაგავიწყდა პაროლი?</Link>
        </div>

        <Button type="submit" className={style.btn}>
          შესვლა
        </Button>
      </form>

      <div className={style.createCont}>
        <Link href="/signup">ან დარეგისტრირდი</Link>
      </div>
    </section>
  );
};

export default Login;
