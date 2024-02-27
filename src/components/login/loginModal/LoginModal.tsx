"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  Children: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = ({ Children }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleCancel = () => {
    setIsModalOpen(false);
    // router.back();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        {Children}
      </Modal>
    </>
  );
};

export default LoginModal;
