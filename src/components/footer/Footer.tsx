import React from "react";
import style from "./style.module.scss";
import Image from "next/image";
import Socials from "../header/topNav/socials/Socials";
import FooterLink from "./links/FooterLink";
import Link from 'next/link';
import styles from './footer.module.scss';

const Footer: React.FC = ({}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#88c74a" fillOpacity="0.2" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={styles.footerContainer}>
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <img src="/images/vitvitLogo.png" alt="Vitvit Logo" />
                <h3>VitVit</h3>
              </div>
              <p className={styles.footerDescription}>
                პრემიუმ ხარისხის ვიტამინები და საკვები დანამატები თქვენი ჯანსაღი ცხოვრების წესის მხარდასაჭერად.
              </p>
              <div className={styles.socialIcons}>
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
               
              </div>
            </div>
            
            <div className={styles.footerColumn}>
              <h4>სწრაფი გადასვლა</h4>
              <ul>
                <li><Link href="/">მთავარი</Link></li>
                <li><Link href="/shop">შემოთავაზებები</Link></li>
                <li><Link href="/about">ჩვენს შესახებ</Link></li>
                <li><Link href="/contact">კონტაქტი</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h4>ექაუნთი</h4>
              <ul>
                <li><Link href="/login">შესვლა</Link></li>
                <li><Link href="/signup">რეგისტრაცია</Link></li>
                <li><Link href="/cart">კალათა</Link></li>
                <li><Link href="/wishlist">სურვილები</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h4>კონტაქტი</h4>
              <address className={styles.footerAddress}>
                <p><i className="fas fa-phone-alt"></i> +1 234 567 8900</p>
                <p><i className="fas fa-envelope"></i> vitamine.vitvit@gmail.com</p>
              </address>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <div className={styles.copyright}>
              <p>&copy; {currentYear} VitVit. All rights reserved.</p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
