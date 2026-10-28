
"use client";

import { useEffect, useState } from "react";
import { elementsService } from "../../services/apiService";

import ImbalanceStates from "../../components/fiveelements/ImbalanceStates";
import FingerMapping from "../../components/fiveelements/Fingermapping";
import FiveHero from "../../components/fiveelements/FiveHero";
import TypeofMudras from "../../components/fiveelements/TypeofMudras";
import BalancetheElements from "../../components/fiveelements/BalancetheElements";

export default function FiveElements() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await elementsService.getElements();
        setElements(response?.data || []);
      } catch (error) {
        console.error("FIVE ELEMENTS API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  return (
    <main>
      <FiveHero elements={elements} loading={loading} />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <FingerMapping elements={elements} loading={loading} />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <ImbalanceStates elements={elements} loading={loading} />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <TypeofMudras elements={elements} loading={loading} />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <BalancetheElements elements={elements} loading={loading} />
    </main>
  );
}
