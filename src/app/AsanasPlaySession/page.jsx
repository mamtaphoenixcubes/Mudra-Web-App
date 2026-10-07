import AsanasPlayHero from "../../components/AsanasPlaySession/AsanasPlayHero";
import UpNextWithMiniAsanasPlayer from "../../components/AsanasPlaySession/UpNextWithMiniAsanasPlayer";


export default function AsanasMeditation() {
    return (
        <main className="w-full bg-white">
            < AsanasPlayHero />
            <hr className="w-full border-t border-gray-200" />
            <UpNextWithMiniAsanasPlayer />
        </main>
    );
}