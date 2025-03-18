import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Our terms and conditions outline the rules, guidelines, and agreements for using our website and services.',
};

const TermsPage = () => {
  return (
    <main className={styles.termsContainer}>
      <div className="container">
        <div className={styles.termsContent}>
          <h1 className={styles.termsTitle}>Terms and Conditions</h1>
          <div className={styles.lastUpdated}>Last Updated: July 1, 2023</div>
          
          <section className={styles.termsSection}>
            <h2>Introduction</h2>
            <p>
              Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.
            </p>
          </section>
          
          <section className={styles.termsSection}>
            <h2>License to Use</h2>
            <p>
              Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from our website for your own personal use subject to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from this website</li>
              <li>Sell, rent, or sub-license material from this website</li>
              <li>Reproduce, duplicate, or copy material from this website</li>
              <li>Redistribute content from our website, unless content is specifically made for redistribution</li>
            </ul>
          </section>
          
          <section className={styles.termsSection}>
            <h2>User Account</h2>
            <p>
              If you create an account on our website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
            </p>
            <p>
              We may, at our sole discretion, delete your account at any time without notice if we believe that you have violated these Terms and Conditions.
            </p>
          </section>
          
          <section className={styles.termsSection}>
            <h2>User Content</h2>
            <p>
              Our website may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the legality, reliability, and appropriateness of any content you post on the website.
            </p>
            <p>
              By posting content on our website, you grant us the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
            </p>
          </section>
          
          <section className={styles.termsSection}>
            <h2>Prohibited Activities</h2>
            <p>
              You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p>As a user of the website, you agree not to:</p>
            <ul>
              <li>Systematically retrieve data or other content from the website to create or compile, directly or indirectly, a collection, compilation, database, or directory</li>
              <li>Make any unauthorized use of the website, including collecting usernames and/or email addresses of users by electronic or other means</li>
              <li>Use the website to advertise or offer to sell goods and services</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the website</li>
              <li>Engage in unauthorized framing of or linking to the website</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
              <li>Interfere with, disrupt, or create an undue burden on the website or the networks or services connected to the website</li>
              <li>Attempt to impersonate another user or person</li>
              <li>Upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>
          
          <section className={styles.termsSection}>
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall we be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation, damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, the service.
            </p>
            <p>
              To the maximum extent permitted by applicable law, we assume no liability or responsibility for any:
            </p>
            <ul>
              <li>Errors, mistakes, or inaccuracies of content</li>
              <li>Personal injury or property damage, of any nature whatsoever, resulting from your access to and use of our service</li>
              <li>Unauthorized access to or use of our secure servers and/or any and all personal information stored therein</li>
              <li>Interruption or cessation of transmission to or from the service</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our service by any third party</li>
              <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available through the service</li>
            </ul>
          </section>
          
          <section className={styles.termsSection}>
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>
          
          <section className={styles.termsSection}>
            <h2>Changes to These Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the website.
            </p>
          </section>
          
          <section className={styles.termsSection}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className={styles.contactInfo}>
              <p>By email: terms@yourcompany.com</p>
              <p>By phone: +1 (555) 123-4567</p>
              <p>By mail: 123 Terms Street, Your City, YC 12345, Country</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsPage; 