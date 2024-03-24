"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Rate } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

type Inputs = {
  username: string;
  email: string;
  message: string;
};

const Form = ({ id, user }: { id: string; user: any }) => {
  const [rate, setRate] = useState(0);
  const [rateError, setRateError] = useState("");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { username: user?.user?.username, email: user?.user?.email },
  });

  const sendReview = useMutation(
    (data: Inputs) => axios.post(`/api/review`, { ...data }),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries("getSupplementByCategory");
        return data;
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        return error;
      },
    }
  );

  const { error, isLoading, isError, isSuccess } = sendReview;

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    const allData = {
      ...data,
      rate: rate,
      id: id,
      image: user?.user?.image,
      date: Date.now(),
    };
    if (rate === 0) {
      setRateError("მიუთითეთ რეიტინგი");
      return;
    }

    sendReview.mutate(allData);
  };

  return (
    <article className={`${style.form}`}>
      <h2>დაამატე განხილვა</h2>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`${style.formInputs}`}
      >
        <div className={`${style.nameInputs}`}>
          <input
            type="text"
            placeholder="სახელი"
            {...register("username", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.username ? "1px solid red" : "" }}
          />

          <input
            type="text"
            placeholder="ელ.ფოსტა"
            disabled
            {...register("email", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.username ? "1px solid red" : "" }}
          />
        </div>
        <div className={`${style.rate}`}>
          <p>
            რეიტინგი :{" "}
            <Rate
              allowHalf
              onChange={(e) => {
                setRate(e);
                setRateError("");
              }}
            />
          </p>
          {rateError ? (
            <p style={{ color: "red", marginTop: "4px" }}>მიუთითეთ რეიტინგი</p>
          ) : (
            ""
          )}
        </div>
        <textarea
          {...register("message", {
            required: {
              value: true,
              message: "გრაფა ცარიელია",
            },
          })}
          placeholder="შეტყობინება.."
          className={`${style.textAreaInput}`}
          rows={6}
          style={{ borderColor: errors.message?.message ? "red" : "" }}
        />
        <p
          style={{
            color: "green",
            fontSize: "18px",
            paddingLeft: "8px",
            marginBottom: "8px",
          }}
        >
          {isSuccess ? "განხილვა წარმატებით დაემატა" : ""}
        </p>
        <p
          style={{
            color: "red",
            fontSize: "18px",
            paddingLeft: "8px",
            marginBottom: "8px",
          }}
        >
          {isError ? "შეცდომაა, თავიდან სცადეთ" : ""}
        </p>

        <button type="submit" className={`${style.submitBtn}`}>
          {isLoading ? <LoadingOutlined spin /> : "დამატება"}{" "}
        </button>
      </form>
    </article>
  );
};

export default Form;
