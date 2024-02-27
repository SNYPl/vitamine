import styles from "./page.module.css";
import LoginModal from "@/components/login/loginModal/LoginModal";
import LoginComponent from "@/components/login/Login";

export default function Login() {
  return <LoginModal Children={<LoginComponent />} />;
}
