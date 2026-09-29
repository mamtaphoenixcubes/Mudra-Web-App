import WorksHero from "../../components/WhatareMudras/WorksHero";
import MudrasExpress from "../../components/WhatareMudras/MudrasExpress";
import WhyMudrasMatter from "../../components/WhatareMudras/WhyMudrasMatter";
import BridgeBalance from "../../components/WhatareMudras/BridgeBalance";

export default function WhatareMudras() {
  return (
    <main className="w-full bg-white text-gray-900 min-h-screen">
      <WorksHero />
      <hr className="w-full border-t border-gray-200" />
      <MudrasExpress />
      <hr className="w-full border-t border-gray-200" />
      <WhyMudrasMatter />
      <hr className="w-full border-t border-gray-200" />
      <BridgeBalance />
    </main>
  );
}