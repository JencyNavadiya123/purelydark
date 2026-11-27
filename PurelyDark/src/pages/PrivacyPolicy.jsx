import { Database, Workflow, Cookie, Lock, UserCheck, RefreshCw } from "lucide-react";
import LegalPage from "./LegalPage";

const sections = [
  { icon: Database, heading: "Information We Collect", body: "We collect information you provide when placing an order or creating an account — your name, email, shipping address and payment details — as well as anonymous usage data to improve our service." },
  { icon: Workflow, heading: "How We Use Your Information", body: "Your data is used solely to process orders, deliver your chocolate, provide support, and (with your consent) send you news about new collections. We never sell your personal data." },
  { icon: Cookie, heading: "Cookies", body: "We use cookies to remember your cart and wishlist, keep you signed in, and understand how our site is used. You can disable cookies in your browser, though some features may not work." },
  { icon: Lock, heading: "Data Security", body: "All transactions are encrypted using industry-standard SSL. Payment details are processed by PCI-compliant providers and are never stored on our servers." },
  { icon: UserCheck, heading: "Your Rights", body: "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@purelydark.com." },
  { icon: RefreshCw, heading: "Changes to This Policy", body: "We may update this policy from time to time. Material changes will be communicated by email or a notice on our website." },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      label="How we collect, use and protect your information."
      breadcrumb={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
      intro="Your trust matters to us. This policy explains what information we collect and how we keep it safe."
      sections={sections}
      seed={12}
    />
  );
}
