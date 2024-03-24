"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import ParamInfo from "../shopPage/paramInfo/ParamInfo";
import ProfileImage from "./profileImage/ProfileImage";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation } from "react-query";
import { useSession } from "next-auth/react";

type Inputs = {
  username: string | null;
  email: string | null;
  password: string;
  repeatPassword: string;
};

const Profile = ({ user }: { user: any }) => {
  const [usernameInput, setUsernameInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const { data: session, update } = useSession();

  const [imageUrl, setImageUrl] = useState<string | null>(user?.image);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<Inputs>({
    defaultValues: {
      username: session?.user?.name || user?.username,
      email: user?.email,
      password: "defaultPassword",
      repeatPassword: "defaultPassword",
    },
  });

  const editProfileInfo = useMutation(
    (data: any) => axios.post(`/api/editProfile`, { ...data }),
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

  const {
    error,
    data,
    isLoading,
    isError,
    isSuccess,
    status,
  } = editProfileInfo;

  const editedState =
    touchedFields.username ||
    touchedFields.password ||
    imageUrl !== user?.image ||
    usernameInput ||
    passwordInput;

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const editedFields = {
      username: touchedFields.username ? data?.username : null,
      password: touchedFields.password ? data?.password : null,
      image: imageUrl !== user?.image ? imageUrl : null,
    };

    const nonNullEditedFields = Object.fromEntries(
      Object.entries(editedFields).filter(([_, value]) => value !== null)
    );

    if (Object.keys(nonNullEditedFields).length === 0) {
      return;
    }
    editProfileInfo.mutate(nonNullEditedFields);
  };

  useEffect(() => {
    if (status === "success") {
      update({ name: data?.data.name });
      setUsernameInput(false);
      setPasswordInput(false);
    }
  }, [status]);

  return (
    <section className={`${style.profile}`}>
      <ParamInfo />
      <h2>ჩემი პროფილი</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={`${style.editForm}`}>
        <ProfileImage setImageUrl={setImageUrl} imageUrl={imageUrl} />
        <section className={`${style.profileInputs}`}>
          <div className={`${style.input}`}>
            <div className={`${style.inputCont}`}>
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
                disabled={!usernameInput}
                style={{
                  border: errors.username ? "1px solid red" : "",
                  cursor: !usernameInput ? "not-allowed" : "Text",
                  borderColor: !usernameInput ? "#d9d9d9" : "#f79823",
                }}
              />
            </div>
            <div
              onClick={() => setUsernameInput(!usernameInput)}
              className={style.editBtn}
            >
              შეცვლა
            </div>
          </div>
          {errors.username && (
            <p className={style.error}>{errors.username.message}</p>
          )}

          <div className={`${style.input}  ${style.emailInput}`}>
            <label htmlFor="emailInput">ელ.ფოსტა</label>
            <input
              type="text"
              placeholder="ელ.ფოსტა"
              value={user?.email}
              disabled
              style={{ cursor: "not-allowed" }}
            />
          </div>

          <div className={`${style.passwordInputs}`}>
            <div className={`${style.input} ${style.password}`}>
              <div className={`${style.inputCont}`}>
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
                  disabled={!passwordInput}
                  style={{
                    border: errors.password ? "1px solid red" : "",
                    cursor: !passwordInput ? "not-allowed" : "Text",
                    borderColor: !passwordInput ? "#d9d9d9" : "#f79823",
                  }}
                />
              </div>
              <div
                onClick={() => {
                  setPasswordInput(!passwordInput);
                }}
                className={style.editBtn}
              >
                შეცვლა
              </div>
            </div>
            {errors.password && (
              <p className={style.error}>{errors.password.message}</p>
            )}
            {passwordInput && (
              <div className={`${style.input} ${style.repeatPassword}`}>
                <div className={`${style.inputCont}`}>
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
                    style={{
                      border: errors.password ? "1px solid red" : "",
                      cursor: !passwordInput ? "not-allowed" : "Text",
                      borderColor: !passwordInput ? "#d9d9d9" : "#f79823",
                    }}
                  />
                  {errors.repeatPassword && (
                    <p className={style.error}>
                      {errors.repeatPassword.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        <Button className={style.btn} disabled={!editedState}>
          {isLoading ? <LoadingOutlined spin /> : "შენახვა"}{" "}
        </Button>
        <p style={{ color: "green", fontSize: "18px" }}>
          {isSuccess ? "პროფილი წარმატებით განახლდა" : ""}
        </p>
        <p style={{ color: "red", fontSize: "18px" }}>
          {isError ? "შეცდომა, თავიდან სცადეთ" : ""}
        </p>
      </form>
    </section>
  );
};

export default Profile;
