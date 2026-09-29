import FaqSection from "../../components/FAQ/Faqsection";
import FAQHero from "../../components/FAQ/FAQHero";

export default function FAQ () {
    return(
        <main>
            <FAQHero/>
             <div className="max-w-10xl mx-auto">
                <hr className="border-t border-gray-300" />
            </div>
            <FaqSection/>
        </main>
    )
}