"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import Image from "next/image";

interface imgProps {
  imageUrl: string | null | undefined;
  setImageUrl: (url: string) => void;
}

const ProfileImage: React.FC<imgProps> = ({ imageUrl, setImageUrl }) => {
  const [loading, setLoading] = useState(false);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className={style.photo}>
      <Upload
        name="avatar"
        listType="picture-circle"
        className={`avatar-uploader ${style.imgUpload}`}
        showUploadList={false}
        // action="/api/editImage"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="avatar" className={style.img}  fill/>
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default ProfileImage;
