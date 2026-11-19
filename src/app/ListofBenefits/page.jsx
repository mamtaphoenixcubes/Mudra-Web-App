"use client";

import { useSearchParams } from "next/navigation";

import ListofBenefitsHero from "../../components/ListofBenefits/ListofBenefitsHero";
import NidraBenefits from "../../components/ListofBenefits/NidraBenefits";
import Howmudramayhelp from "../../components/ListofBenefits/Howmudramayhelp";

export default function ListofBenefits() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isHowMudraMayHelp =
    type?.toLowerCase() === "howmudramayhelp";

  return (
    <main>
      <ListofBenefitsHero />

      {isHowMudraMayHelp ? (
        <Howmudramayhelp />
      ) : (
        <NidraBenefits />
      )}
    </main>
  );
}