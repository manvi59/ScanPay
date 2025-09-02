import Link from "next/link";
import "../termsandconditions/terms.css";
export default function page() {
  return (
    <div className="termsContainer">
      <h1 className="title">Privacy Policy</h1>

      <section>
        <h3>What type of personal information do we collect?</h3>
        <p>We may collect the following information from you:</p>
        <p>
          1. Lax Park by VPNE does not collect any information from your device
          without your explicit consent.
          <br />
          2. Information you provide via the Service, Contact Us, or
          communication (e.g., name, phone, license plate, email, etc.).
          <br />
        </p>
        <p>
          Global Payments Integrated, a PCI DSS validated third-party provider,
          handles payment data. VPNE does not store it.
        </p>
      </section>

      <section>
        <h3>How is personal information used?</h3>
        <p>
          We use your info to improve service, send updates, process refunds,
          personalize experience, and more.
        </p>
        <p>
          We may disclose info in a merger, legal case, or as otherwise allowed
          under this policy.
        </p>
      </section>

      <section>
        <h3>Sensitive Personal Information</h3>
        <p>
          Please do not send sensitive data (e.g., racial, religious, health, or
          criminal info) unless explicitly required.
        </p>
      </section>

      <section>
        <h3>Who do we share the information with?</h3>
        <p>
          Your info may be shared with service providers, in legal matters, or
          during mergers—but only as necessary and under protection.
        </p>
      </section>

      <section>
        <h3>Data Storage and Retention</h3>
        <p>
          We retain your data only as long as necessary or legally required,
          following clear criteria.
        </p>
      </section>

      <section>
        <h3>Security</h3>
        <p>
          We implement reasonable safeguards and limit access to personal info
          to only necessary personnel or vendors.
        </p>
      </section>

      <section>
        <h3>User Rights</h3>
        <p>
          You may request access, correction, or deletion of your data. Email:{" "}
          <Link href="#">LaxPark@vpne.com</Link>.
        </p>
      </section>

      <section>
        <h3>Cookie Notice</h3>
        <p>
          We use cookies and tracking tools to analyze traffic and improve your
          experience. Info includes IP, browser, location, and usage patterns.
        </p>
      </section>

      <section>
        <h3>Links to Third Party Websites or Services</h3>
        <p>
          We are not responsible for privacy practices of third-party websites
          or services linked from the Service.
        </p>
      </section>

      <section>
        <h3>Communications from the Service</h3>
        <p>
          You may receive updates via email. You can unsubscribe via link or
          email <Link href="#">LaxPark@vpne.com</Link>.
        </p>
      </section>

      <section>
        <h3>Testimonials</h3>
        <p>
          We may publish reviews/comments you submit. Contact us if published
          without consent.
        </p>
      </section>

      <section>
        <h3>Legal Disclosures</h3>
        <p>
          We may disclose data if required by law or to protect our rights or
          respond to legal processes.
        </p>
      </section>

      <section>
        <h3>Updates and Changes to the Privacy Policy</h3>
        <p>
          We may change this Privacy Policy and will notify you of updates.
          Continued use implies consent.
        </p>
      </section>

      <section>
        <h3>Governing Law and Jurisdiction</h3>
        <p>
          This agreement is governed by California law. You consent to
          jurisdiction in California, USA.
        </p>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          For any questions, email us at <Link href="#">LaxPark@vpne.com</Link>.
        </p>
      </section>
    </div>
  );
}
