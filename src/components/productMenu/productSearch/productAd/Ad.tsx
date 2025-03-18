"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

interface SpecialOffer {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  buttonText: string;
  linkUrl: string;
  isActive: boolean;
  badgeText: string;
}

const Ad: React.FC = () => {
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActiveOffer = async () => {
      try {
        const response = await axios.get('/api/specialOffers/active');
        if (response.data && response.data.offer) {
          setOffer(response.data.offer);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching special offer:", error);
        setLoading(false);
      }
    };

    fetchActiveOffer();
  }, []);

  // If no active offer is found or still loading, don't render anything
  if (loading || !offer) return null;

  return (
    <section className={style.adBanner}>
      <div className={style.adContent}>
        <div className={style.adText}>
          <h2>{offer.title}</h2>
          <h3>{offer.subtitle}</h3>
          <p>{offer.description}</p>
          <Link href={offer.linkUrl}>
            <button className={style.adButton}>{offer.buttonText}</button>
          </Link>
        </div>
        <div className={style.adImageContainer}>
          <Image
            src={offer.imageUrl}
            alt={offer.title}
            width={350}
            height={250}
            className={style.adImage}
          />
        </div>
      </div>
      {offer.badgeText && <div className={style.adBadge}>{offer.badgeText}</div>}
    </section>
  );
};

export default Ad;
