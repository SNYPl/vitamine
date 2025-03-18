import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
};

const PrivacyPolicy = () => {
  return (
    <main className={styles.policyContainer}>
      <div className="container">
        <div className={styles.policyContent}>
          <h1 className={styles.policyTitle}>Privacy Policy</h1>
          <div className={styles.lastUpdated}>Last Updated: July 1, 2023</div>
          
          <section className={styles.policySection}>
            <h2>Introduction</h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              By using our website, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
          </section>
          
          <section className={styles.policySection}>
            <h2>Information We Collect</h2>
            <p>
              We may collect several different types of information for various purposes to provide and improve our service to you:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li><strong>Usage Data:</strong> We may also collect information on how the service is accessed and used. This may include information such as your computer&apos;s Internet Protocol address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</li>
              <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track activity on our service and hold certain information.</li>
            </ul>
          </section>
          
          <section className={styles.policySection}>
            <h2>How We Use Your Information</h2>
            <p>We use the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features of our service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To fulfill any other purpose for which you provide it</li>
            </ul>
          </section>
          
          <section className={styles.policySection}>
            <h2>Disclosure of Your Information</h2>
            <p>We may disclose your personal information in the following situations:</p>
            <ul>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your personal data may be transferred.</li>
              <li><strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
              <li><strong>With Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              <li><strong>With Other Users:</strong> When you share personal information or otherwise interact in public areas with other users, such information may be viewed by all users and may be publicly distributed.</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
          </section>
          
          <section className={styles.policySection}>
            <h2>Security of Your Information</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>
          
          <section className={styles.policySection}>
            <h2>Your Data Protection Rights</h2>
            <p>
              We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data. If you wish to be informed about what personal data we hold about you and if you want it to be removed from our systems, please contact us.
            </p>
            <p>In certain circumstances, you have the following data protection rights:</p>
            <ul>
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right of rectification - the right to have your information corrected if it is inaccurate or incomplete</li>
              <li>The right to object to our processing of your personal data</li>
              <li>The right of restriction - the right to request that we restrict the processing of your personal information</li>
              <li>The right to data portability - the right to be provided with a copy of your personal data in a structured, machine-readable format</li>
              <li>The right to withdraw consent at any time where we relied on your consent to process your personal information</li>
            </ul>
          </section>
          
          <section className={styles.policySection}>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section className={styles.policySection}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className={styles.contactInfo}>
              <p>By email: privacy@yourcompany.com</p>
              <p>By phone: +1 (555) 123-4567</p>
              <p>By mail: 123 Privacy Street, Your City, YC 12345, Country</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy; 