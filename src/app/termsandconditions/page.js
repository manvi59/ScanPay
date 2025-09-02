import Link from "next/link";
import "./terms.css";

export default function page() {
  return (
    <div className="termsContainer">
      <h1 className="title">Terms &amp; Conditions</h1>

      <section>
        <p>
          {`This website/app is provided by Lax Park by VPNE. The terms "we",
          "us", "our" and "Lax Park by VPNE" refer to Lax Park by VPNE...`}
        </p>
      </section>

      <section>
        <p>We may change or otherwise modify the Agreement in the future...</p>
      </section>

      <section>
        <p>You warrant that you possess the legal authority...</p>
      </section>

      <section>
        <h3>Privacy Policy</h3>
        <p>Lax Park by VPNE believes in protecting your privacy...</p>
      </section>

      <section>
        <h3>Third Party Content</h3>
        <p>The Service may contain links to external third-party websites...</p>
      </section>

      <section>
        <h3>Intellectual Property</h3>
        <p>All material, data and information included on the Service...</p>
      </section>

      <section>
        <h3>Limitation On Use</h3>
        <p>
          You agree not to:
          <br />
          (a) access, monitor or copy any content...
          <br />
          (b) take any action that imposes...
          <br />
          (c) {`"frame", "mirror"...`}
          <br />
          (d) attempt to modify...
        </p>
      </section>

      <section>
        <h3>Indemnity</h3>
        <p>You agree to defend and indemnify Lax Park by VPNE...</p>
      </section>

      <section>
        <h3>Notice of Issues</h3>
        <p>
          If you have any complaints... contact us at{" "}
          <Link href="#">Laxpark@vpne.com</Link>
        </p>
      </section>

      <section>
        <h3>Modifications to the Service</h3>
        <p>The content and functionality may be updated...</p>
      </section>

      <section>
        <h3>Warranty Disclaimer</h3>
        <p>
          Though all efforts have been made... Lax Park by VPNE does not
          guarantee...
        </p>
      </section>

      <section>
        <h3>Remedies for Violations</h3>
        <p>Lax Park by VPNE reserves the right to seek all remedies...</p>
      </section>

      <section>
        <h3>Force Majeure</h3>
        <p>Lax Park by VPNE will not be held responsible for delays...</p>
      </section>

      <section>
        <h3>Waiver and Modification</h3>
        <p>Waiver by any party of a breach does not mean future waivers...</p>
      </section>

      <section>
        <h3>Governing Law and Jurisdiction</h3>
        <p>Any dispute will be subject to arbitration in Boston, MA...</p>
      </section>

      <section>
        <h3>Severability</h3>
        <p>If any term is found illegal, the rest shall remain valid...</p>
      </section>

      <section>
        <h3>Entire Agreement</h3>
        <p>
          This Agreement constitutes the full agreement between you and Lax
          Park by VPNE...
        </p>
      </section>

      <section>
        <h3>Contact Information</h3>
        <p>
          For questions, contact <Link href="#">Laxpark@vpne.com</Link>
        </p>
      </section>
    </div>
  );
}
