import Image from "next/image";
import LayoutThree from "@/components/home-3/Layout";
import SectionHeader from "@/components/essential/SectionHeader";
import CompareMobileClient from "../Compare";
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

export async function getdata(title1, title2) {
  try {
    const res = await fetch(
      `http://localhost:5039/blog_info/${encodeURIComponent(
        title1
      )}/${encodeURIComponent(title2)}`
    );
    const data1 = await res.json();
    return { data1 };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export default async function CompareTable({ params }) {
  const mobileData = await fetchMobiles();
  // Get the 'slug' query parameter
  const { data1 } = await getdata(
    params?.table?.split("-and-")[0],
    params?.table?.split("-and-")[1]
  );
  // Features to compare

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

          {/* Conditionally render the comparison table */}
          {data1.length === 2 && (
            <div className="overflow-x-auto mt-10">
              <table
                className="table-auto border-collapse w-full text-left"
                style={{
                  borderColor: "rgb(65, 86, 73)",
                  border: "1px solid rgb(65, 86, 73)", // Ensure borders are applied to the table as a whole
                }}
              >
                <thead
                  className="bg-gray-200 border-b"
                  style={{ borderColor: "rgb(65, 86, 73)" }}
                >
                  <tr>
                    <th
                      className="border px-4 py-2"
                      style={{
                        borderColor: "rgb(65, 86, 73)",
                        border: "1px solid rgb(65, 86, 73)", // Add border to header cells
                      }}
                    >
                      Feature
                    </th>
                    {data1.map((mobile) => (
                      <th
                        key={mobile.name}
                        className="border px-4 py-2"
                        style={{
                          borderColor: "rgb(65, 86, 73)",
                          border: "1px solid rgb(65, 86, 73)", // Add border to each mobile column header
                        }}
                      >
                        <div className="flex items-center">
                          {mobile.mobile_info.image && (
                            <div className="flex-shrink-0">
                              <Image
                                src={mobile?.mobile_info?.image}
                                alt={mobile.name}
                                width={100}
                                height={120}
                                className="rounded-md mb-2"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          )}
                          <p className="font-medium ml-4">{mobile.name}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data1[0].mobile_info)
                    .filter((key) => key !== "image") // Skip the "image" key
                    .map((key) => (
                      <tr key={key}>
                        {/* Feature Name */}
                        <td
                          className="border px-4 py-2 font-medium"
                          style={{
                            borderColor: "rgb(65, 86, 73)",
                            border: "1px solid rgb(65, 86, 73)", // Add border to feature row
                          }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </td>

                        {/* Mobile Data */}
                        {data1.map((mobile) => (
                          <td
                            style={{
                              borderColor: "rgb(65, 86, 73)",
                              border: "1px solid rgb(65, 86, 73)", // Add border to each cell
                            }}
                            key={mobile.name + key}
                            className="border px-4 py-2"
                          >
                            {/* Check if the value is an object */}
                            {typeof mobile.mobile_info[key] === "object" ? (
                              <ul>
                                {Object.entries(mobile.mobile_info[key]).map(
                                  ([subKey, value]) => (
                                    <li key={subKey}>
                                      <strong>
                                        {subKey.charAt(0).toUpperCase() +
                                          subKey.slice(1)}
                                        :
                                      </strong>{" "}
                                      {value}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              // Render scalar values like strings or numbers
                              mobile.mobile_info[key]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </LayoutThree>
  );
}

// Fetch data based on the names passed in the URL
