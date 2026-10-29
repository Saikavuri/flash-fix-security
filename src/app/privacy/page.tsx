import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { business, formattedAddress } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we handle the personal information you share with us through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="What we collect when you use this website, why we collect it, and what we do with it."
        image="/images/pages/contact.jpg"
      />

      <section className="bg-white">
        <div className="shell py-section">
          <div className="mx-auto max-w-prose">
            <Reveal>
              <p className="text-[16px] leading-relaxed text-ink-600">
                This policy applies to {business.legalName} (&ldquo;we&rdquo;) and to
                the website operated by us. It covers information you submit through
                our enquiry form or share over WhatsApp, email or phone.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                What we collect
              </h2>
              <ul className="mt-4 space-y-2.5 text-[16px] leading-relaxed text-ink-600">
                <li>
                  <strong className="font-medium text-ink-800">Contact details</strong>{" "}
                  — your name, phone number, and email address if you provide one.
                </li>
                <li>
                  <strong className="font-medium text-ink-800">
                    Property information
                  </strong>{" "}
                  — the property type, area, approximate camera count and any details
                  you include about your requirement.
                </li>
                <li>
                  <strong className="font-medium text-ink-800">
                    Technical information
                  </strong>{" "}
                  — standard server logs such as IP address, browser type and pages
                  visited, used to keep the site running and secure.
                </li>
              </ul>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                Why we collect it
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                We use your details only to respond to your enquiry, prepare a
                quotation, arrange a site visit, and provide installation, repair or
                maintenance services you have asked for. We do not sell your
                information.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                How long we keep it
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                Enquiry records are retained for as long as needed to service your
                request and to meet legal and accounting obligations, after which
                they are deleted. If you ask us to delete your information sooner,
                we will do so.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                CCTV recordings
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                Footage recorded by the systems we install is stored on the
                recorder or NVR at your property. We do not receive, view or retain
                your camera footage unless you explicitly ask us to retrieve
                specific recordings during a support visit, and we handle that
                footage in confidence.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                Sharing
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                We share information only with service providers who help us
                deliver our services (for example hosting and email delivery), and
                where the law requires it. We do not share your details for
                marketing by third parties.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                Your rights
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                You can ask to see the information we hold about you, ask us to
                correct it, or ask us to delete it. Contact us using the details
                below and we will respond.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                Cookies
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
                This site does not use advertising cookies or cross-site tracking.
                If any analytics or operational cookies are introduced in future,
                this policy will be updated before they are set.
              </p>

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-[-0.006em] text-ink-950">
                Contact
              </h2>
              <address className="mt-4 text-[16px] not-italic leading-relaxed text-ink-600">
                {business.legalName}
                <br />
                {formattedAddress}
                <br />
                <a
                  href={`mailto:${business.email}`}
                  className="text-electric-600 underline underline-offset-4"
                >
                  {business.email}
                </a>
              </address>

              <p className="mt-12 border-t border-ink-950/10 pt-6 font-mono text-[12px] text-ink-400">
                Last updated: replace with your policy date.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
