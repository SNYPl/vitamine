"use client";
import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "@/store/slices/modals";

interface LoginModalProps {
  Children: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = ({ Children }) => {
  const dispatch = useDispatch();
  const loginModal = useSelector((state: any) => state.modalReducer.loginModal);

  const handleCancel = () => {
    dispatch(setLoginModal(false));
  };

  return (
    <>
      <Modal
        open={loginModal}
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
