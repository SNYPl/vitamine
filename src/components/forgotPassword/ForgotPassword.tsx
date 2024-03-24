"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import { useMutation } from "react-query";
import axios from "axios";

type Inputs = {
  email: string;
};

const ForgotPassword: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const forgotPassword = useMutation(
    (data: any) => axios.post(`/api/forgotPassword`, { ...data }),
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

  const { error, data, isLoading, isError, isSuccess, status } = forgotPassword;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    forgotPassword.mutate(data);
  };

  return (
    <section className={style.forgot}>
      <h2>პაროლის აღდგენა</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <div className={`${style.input}`}>
          <label htmlFor="email">ელ.ფოსტა</label>
          <input
            type="text"
            id="forgotemail"
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
            style={{ border: errors.email ? "1px solid red" : "" }}
          />
        </div>

        <Button type="submit" className={style.btn}>
          აღდგენა
        </Button>
      </form>
    </section>
  );
};

export default ForgotPassword;
