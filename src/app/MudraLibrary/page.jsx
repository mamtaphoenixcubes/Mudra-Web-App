
import { Suspense } from "react";
import PopularMudras from "../../components/MudraLibrary/Popularmudras";
import MudraLibraryHero from "../../components/MudraLibrary/MudraLibraryHero";
import FullPowerofMudras from "../../components/MudraLibrary/FullPowerofMudras";

export default function MudraLibrary() {
  return (
    <main className="w-full bg-white">
      <MudraLibraryHero />
      <hr className="w-full border-t border-gray-200" />
      <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading mudras...</div>}>
        <PopularMudras />
      </Suspense>
      <hr className="w-full border-t border-gray-200" />
      <FullPowerofMudras />
    </main>
  );
}