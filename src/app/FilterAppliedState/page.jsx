import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";
import Blogfilterpage from "../../components/FilterAppliedState/Blogfilterpage";

export default function FAQ() {
    return (
        <main>
            <Blogfilterpage />
            <div className="max-w-10xl mx-auto">
                <hr className="border-t border-gray-300" />
            </div>
            <DownloadAppBanner />
        </main>
    )
}