"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "../button/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setLoginModal } from "@/store/slices/modals";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useFormStatus } from "react-dom";
import { LoadingOutlined } from "@ant-design/icons";

type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

function LoginBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={style.btn}>
      {pending ? <LoadingOutlined spin /> : "შესვლა"}
    </Button>
  );
}

const Login: React.FC = ({}) => {
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data?.remember) {
      let maxAge = 30 * 24 * 60 * 60;
      Cookies.set("remember", "true", { expires: maxAge });
    }

    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      remember: data?.remember ? true : false,
    });

    if (response?.error) {
      setLoginError(response.error);
    }

    if (!response?.error && response?.status === 200) {
      router.replace("/");
      router.refresh();
      dispatch(setLoginModal(false));
    }
  };

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
          {errors.username && (
            <p className={style.error}>{errors.username.message}</p>
          )}
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
          {errors.password && (
            <p className={style.error}>{errors.password.message}</p>
          )}
        </div>
        {loginError && <p className={style.mainErr}>{loginError}</p>}

        <div className={style.forgot}>
          <label>
            <input type="checkbox" {...register("remember")} />
            დამიმახსოვრე
          </label>

          <Link
            href={"/forgotPassword"}
            onClick={() => dispatch(setLoginModal(false))}
          >
            დაგავიწყდა პაროლი?
          </Link>
        </div>

        <LoginBtn />
      </form>

      <div className={style.createCont}>
        <Link href="/signup" onClick={() => dispatch(setLoginModal(false))}>
          ან დარეგისტრირდი
        </Link>
      </div>
    </section>
  );
};

export default Login;
