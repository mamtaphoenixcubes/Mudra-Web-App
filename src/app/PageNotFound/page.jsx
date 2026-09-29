import Lookingforsomething from "../../components/PageNotFound/Lookingforsomething";
import NotFoundHero from "../../components/PageNotFound/NotFoundHero";


export default function PageNotFound() {
  return (
    <main>
      <NotFoundHero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Lookingforsomething />
    </main>
  );
}