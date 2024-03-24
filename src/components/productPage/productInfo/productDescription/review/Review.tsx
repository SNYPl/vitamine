import React from "react";
import style from "./style.module.scss";
import ReviwForm from "./reviewForm/Form";
import Link from "next/link";
import { Rate } from "antd";
import Image from "next/image";

interface Review {
  date: number;
  email: string;
  id: string;
  image: string;
  message: string;
  rate: number;
  username: string;
}

const Review = ({
  id,
  user,
  review,
}: {
  id: string;
  user: any;
  review: Review[];
}) => {
  return (
    <section className={`${style.review}`}>
      <article className={`${style.reviews}`}>
        {review.map((review) => {
          const timestamp = review?.date;
          const date = new Date(timestamp);

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          const formattedDate = `${year}-${month}-${day}`;

          return (
            <div className={`${style.reviewItem}`} key={review?.id}>
              <div className={`${style.img}`}>
                <Image src={review?.image} alt="img" width={70} height={70} />
                <Rate
                  disabled
                  value={review?.rate}
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className={`${style.info}`}>
                <span>{formattedDate}</span>
                <h3>{review?.username}</h3>
                <p>{review?.message}</p>
              </div>
            </div>
          );
        })}
      </article>
      {user?.user ? (
        <ReviwForm id={id} user={user} />
      ) : (
        <p>
          განხვილვის დასატოვებლად, გაიარეთ{" "}
          <Link href="/login" style={{ color: "#f79823" }}>
            ავტორიზაცია
          </Link>
        </p>
      )}
    </section>
  );
};

export default Review;
