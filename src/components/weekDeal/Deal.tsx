"use client";

import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";

const Deal: React.FC = ({}) => {
  const countdownLast = 100000000;

  return (
    <section className={`${style.deal}`}>
      <div className={`${style.dealImg} upDown`}>
        <Image src={"/images/dale/1.png"} alt="img" width={450} height={330} />
      </div>
      <article className={`${style.dealInfo}`}>
        <h2 className={`${style.title}`}>
          <span>Dale</span> of the week
        </h2>

        <p className={`${style.price}`}>
          $19.00<span>/ Package</span>
        </p>
        <p className={`${style.info}`}>
          Lorem ipsum dolor sit amet, consectetur adipisiing elit, sed do
          eiusmod tempor incididunt ut labore et
        </p>
        <Countdown
          date={Date.now() + countdownLast}
          renderer={({ days, hours, minutes, seconds }) => {
            return (
              <div className={`${style.time}`}>
                <div className={`${style.timeItem}`}>
                  <h4>{zeroPad(days)}</h4> <span>days</span>
                </div>
                <div className={`${style.timeItem}`}>
                  <h4>{zeroPad(hours)}</h4> <span>hr</span>
                </div>
                <div className={`${style.timeItem}`}>
                  <h4>{zeroPad(minutes)}</h4> <span>min</span>
                </div>
                <div className={`${style.timeItem}`}>
                  <h4>{zeroPad(seconds)}</h4> <span>sec</span>
                </div>
              </div>
            );
          }}
        />
        <Link href="#" className={`${style.shopBtn}`}>
          Shop Now
        </Link>
      </article>
    </section>
  );
};

const MemoizedDeal = React.memo(Deal);

export default MemoizedDeal;
