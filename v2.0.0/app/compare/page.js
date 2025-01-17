import LayoutThree from "@/components/home-3/Layout";
import SectionHeader from "@/components/essential/SectionHeader";
import CompareMobileClient from "./Compare";

// Function to fetch data server-side
async function fetchMobiles() {
  try {
    const response = await fetch("http://localhost:5039/blog");
    if (!response.ok) {
      throw new Error("Failed to fetch mobile data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mobile data:", error);
    return [];
  }
}

export default async function CompareMobile() {
  // Fetch mobile data server-side
  const mobileData = await fetchMobiles();

  return (
    <LayoutThree>
      <section className="py-16 sm:py-24">
        <div className="container">
          <SectionHeader
            title="Compare Mobiles"
            buttonLabel="Explore More"
            buttonLink="/"
          />
          {/* Pass fetched data to Client Component */}
          <CompareMobileClient mobileData={mobileData} />
        </div>
      </section>
    </LayoutThree>
  );
}
