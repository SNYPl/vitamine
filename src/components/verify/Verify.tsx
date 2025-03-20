"use client";
import React from "react";
import style from "./style.module.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Verify: React.FC = ({}) => {
  const searchParams = useSearchParams();
  const verify = searchParams?.get("verify");
  const isVerify = verify === "true";

  return (
    <section className={style.verify}>
      <h2>ანგარიშის აქტივაცია</h2>
      {verify === null && (
        <p className={style.titleInf}>
          ანგარიშის გასააქტიურებლად, შეამოწმეთ ელ.ფოსტა
        </p>
      )}

      {verify !== null && isVerify && (
        <>
          <p className={style.titleInf}>თქვენი ანგარიში წარმატებით გააქტურდა</p>
          <p>
            გაიარეთ <Link href="/login">ავტორიზაცია</Link>
          </p>
        </>
      )}

      {verify !== null && isVerify === false && (
        <p className={style.titleInf}>რაღაც შეცდომაა, სცადეთ თავიდან</p>
      )}
    </section>
  );
};

export default Verify;
