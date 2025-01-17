"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CompareMobileClient({ mobileData }) {
  // Variables to store selected values
  const [selectedMobile1, setSelectedMobile1] = useState("");
  const [selectedMobile2, setSelectedMobile2] = useState("");

  // Extract values from the URL on the initial load
  useEffect(() => {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/compare\/([^/]+)-and-([^/]+)/);
    if (match) {
      const [_, mobile1, mobile2] = match;
      setSelectedMobile1(decodeURIComponent(mobile1));
      setSelectedMobile2(decodeURIComponent(mobile2));
    }
  }, []);

  return (
    <div>
      {/* Dropdowns to select mobiles */}
      <div className="flex justify-center space-x-4 my-8">
        {[0, 1].map((index) => (
          <div key={index} className="flex flex-col items-center">
            <label className="font-medium mb-2">Mobile {index + 1}</label>
            <select
              id={`mobile-select-${index}`}
              value={index === 0 ? selectedMobile1 : selectedMobile2}
              onChange={(e) =>
                index === 0
                  ? setSelectedMobile1(e.target.value)
                  : setSelectedMobile2(e.target.value)
              }
              className="border px-4 py-2 rounded bg-white"
            >
              <option value="">Select a Mobile</option>
              {mobileData.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Compare Button */}
      <div className="flex justify-center mt-8">
        <Link
          href={`/compare/${encodeURIComponent(
            selectedMobile1
          )}-and-${encodeURIComponent(selectedMobile2)}`}
        >
          <button
            id="compare-button"
            className="bg-blue-500 text-white py-2 px-6 rounded-md"
            disabled={!selectedMobile1 || !selectedMobile2} // Disable button if both mobiles are not selected
          >
            Compare
          </button>
        </Link>
      </div>
    </div>
  );
}
