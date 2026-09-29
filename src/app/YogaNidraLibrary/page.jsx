import UnlockYogaNidra from "../../components/YogaNidraLibrary/UnlockYogaNidra";
import SessionPreviews from "../../components/YogaNidraLibrary/SessionPreviews";
import YogaNidraLibraryHero from "../../components/YogaNidraLibrary/YogaNidraLibraryHero";

export default function whatisyoganidra() {
  return (
    <main className="w-full bg-white">
      <YogaNidraLibraryHero />
      <hr className="w-full border-t border-gray-200" />
      <SessionPreviews />
      <hr className="w-full border-t border-gray-200" />
      <UnlockYogaNidra />
    </main>
  );
}