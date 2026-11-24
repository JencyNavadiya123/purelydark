import LegalPage from "./LegalPage";

const sections = [
  { heading: "Acceptance of Terms", body: "By accessing and using the PurelyDark website, you agree to be bound by these terms and conditions and our privacy policy." },
  { heading: "Orders & Pricing", body: "All prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to limit order quantities." },
  { heading: "Shipping & Delivery", body: "We aim to dispatch orders within 1–2 business days. Delivery times vary by destination. Risk passes to you upon delivery. Temperature-sensitive shipping may be delayed in extreme weather." },
  { heading: "Returns & Refunds", body: "As a perishable product, chocolate cannot be returned once delivered unless it arrives damaged or faulty. Contact us within 14 days and we will arrange a replacement or refund." },
  { heading: "Intellectual Property", body: "All content on this site — text, imagery, logos and designs — is the property of PurelyDark and may not be reproduced without written permission." },
  { heading: "Limitation of Liability", body: "PurelyDark shall not be liable for any indirect or consequential loss arising from the use of our products or website, to the extent permitted by law." },
  { heading: "Governing Law", body: "These terms are governed by the laws of France. Any disputes shall be subject to the exclusive jurisdiction of the courts of Paris." },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      label="The terms that govern your use of our website and services."
      breadcrumb={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]}
      intro="Please read these terms carefully before placing an order with PurelyDark."
      sections={sections}
      seed={14}
    />
  );
}
