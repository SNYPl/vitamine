"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import { useMutation } from "react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

type Inputs = {
  password: string;
  repeatPassword: string;
};

const ResetPassword: React.FC = ({}) => {
  const param = useSearchParams();
  const userId = param?.get("id");
  const userToken = param?.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const resetPassword = useMutation(
    (data: any) => axios.post(`/api/forgotPassword/reset`, { ...data }),
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

  const { error, data, isLoading, isError, isSuccess, status } = resetPassword;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const allData = { ...data, userId, userToken };
    resetPassword.mutate(allData);
  };

  console.log(isSuccess);

  return (
    <section className={style.forgot}>
      <h2>შეიყვანეთ ახალი პაროლი</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="resetPassword">პაროლი</label>
          <input
            type="password"
            id="resetPassword"
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
          <label htmlFor="repeatRessetPassword">გაიმეორეთ პაროლი</label>
          <input
            type="password"
            id="repeatRessetPassword"
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
        {isSuccess ? (
          <p style={{ color: "green", fontSize: "18px", marginBottom: "6px" }}>
            პაროლი წარმატებით შეიცვალა , შეგიძლიათ გაიაროთ{" "}
            <Link href="/login" style={{ color: "#f79823" }}>
              ავტორიზაცია
            </Link>
          </p>
        ) : (
          ""
        )}

        <p style={{ color: "red", fontSize: "18px", marginBottom: "6px" }}>
          {isError ? "შეცდომა, თავიდან სცადეთ" : ""}
        </p>

        <Button type="submit" className={style.btn}>
          {isLoading ? <LoadingOutlined spin /> : "აღდგენა"}
        </Button>
      </form>
    </section>
  );
};

export default ResetPassword;
