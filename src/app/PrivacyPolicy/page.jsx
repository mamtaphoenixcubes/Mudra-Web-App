import PrivacyPolicyPage from "../../components/PrivacyPolicy/Privacypolicy";
import PrivacyPolicyHero from "../../components/PrivacyPolicy/PrivacyPolicyHero";


export default function PrivacyPolicy() {
  return (
    <main>
      <PrivacyPolicyHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <PrivacyPolicyPage />
    </main>
  );
}