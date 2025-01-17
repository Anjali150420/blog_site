// import TableOfContents from "@/app/components/blog/TableOfContents";
// import Layout from "@/components/Layout";
// import MDXcomponents from "@/components/MDXcomponents";
// import ScrollProgressBar from "@/components/blog/ScrollProgressBar";
// import SharePost from "@/components/blog/SharePost";
// import SectionHeader from "@/components/essential/SectionHeader";
// import PostThree from "@/components/posts/Post-3";
// import allAuthors from "@/data/author.json";
// import allPosts from "@/data/posts.json";
// import { getSuggestedPosts } from "@/libs/functions/getSuggestedPosts";
// import { formatDate } from "@/libs/utils/formatDate";
// import { slugify } from "@/utils/slugify";
// import { MDXRemote } from "next-mdx-remote/rsc";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export async function generateMetadata(props) {
//   const params = await props.params;
//   const slug = params.slug;
//   const currentPost = allPosts.find((post) => post.slug === slug);

//   if (!currentPost) {
//     return notFound();
//   }

//   const { title, desscription, image } = currentPost.frontmatter;

//   return {
//     title: title,
//     description: desscription,
//     openGraph: {
//       images: [{ url: image }],
//     },
//   };
// }

// const BlogDetails = async props => {
//   const params = await props.params;
//   const slug = params.slug;
//   const currentPost = allPosts.find((post) => post.slug === slug);

//   if (!currentPost) {
//     return notFound();
//   }

//   const { title, category, image, date, author, authorImage, readingTime } =
//     currentPost.frontmatter;

//   const content = await currentPost.content;

//   const authorSlug = slugify(author);
//   const currentAuthor = allAuthors.find((author) => author.slug === authorSlug);

//   // get first 3 suggested posts
//   const suggestedPosts = getSuggestedPosts(allPosts, slug, category);

//   return (
//     <Layout>
//       <div id="post-header" className="py-16 sm:py-20 overflow-clip">
//         <div className="container">
//           <div className="row lg:flex-nowrap items-center">
//             <div className="lg:col-6 text-center lg:text-left">
//               <div className="mb-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-4 gap-y-1">
//                 <Link
//                   href={`/category/${slugify(category)}`}
//                   className="uppercase bg-white/10 border border-border rounded-md px-3 py-2 text-sm block text-dark hover:text-white hover:bg-dark transition-all duration-300 w-fit lg:mx-0"
//                 >
//                   {category}
//                 </Link>
//                 <span className="font-extralight opacity-40">—</span>

//                 <p>{formatDate(date)}</p>
//               </div>

//               <h1 className="text-3xl md:text-4xl !leading-relaxed mb-6 text-balance">
//                 {title}
//               </h1>

//               <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-3 gap-y-1 uppercase text-sm text-dark mb-14">
//                 <li>
//                   <Link
//                     href={`/author/${slugify(author)}`}
//                     className="flex items-center hover:text-dark hover:underline transition-all duration-300"
//                   >
//                     <Image
//                       src={authorImage}
//                       alt={`Author of the post - ${author}`}
//                       height={24}
//                       width={24}
//                       className="h-6 w-6 border border-[#ABABAB] rounded-full mr-2 bg-white/40"
//                     />
//                     {author}
//                   </Link>
//                 </li>
//                 <li>•</li>
//                 <li>{readingTime}</li>
//               </ul>
//             </div>
//             <div className="lg:col-8">
//               <div className="relative w-full h-[380px] lg:h-[460px]">
//                 <Image
//                   className="rounded-xl object-cover bg-dark/10"
//                   fill
//                   src={image}
//                   alt={title}
//                   sizes="(max-width: 768px) 400px, (max-width: 1200px) 500px, 700px"
//                 />

//                 {/* prettier-ignore */}
//                 <svg className="absolute bottom-0 left-[96px] md:left-[104px] lg:left-[63px] z-20 rotate-[270deg] w-4 h-4 text-light" width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z" fill="currentColor"></path></svg>
//                 {/* prettier-ignore */}
//                 <svg className="absolute bottom-0 lg:bottom-[71px] left-[95px] md:left-[102px] lg:left-0 z-20 rotate-[270deg] w-4 h-4 text-light" width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z" fill="currentColor"></path></svg>

//                 <div className="bg-[#f6f5ed] border-8 border-light w-24 sm:w-28 absolute -bottom-10 left-3 lg:-left-12 rounded-full p-3 text-[15px] font-bold">
//                   {/* prettier-ignore */}
//                   <svg className="uppercase" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//                     <path id="circlePath" d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0" fill="none" />
//                     <text><textPath href="#circlePath" className="font-light tracking-[0.07em] text-sm">
//                       — scroll down — read more
//                     </textPath></text>
//                   </svg>

//                   {/* prettier-ignore */}
//                   <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1C9 0.447715 8.55228 -2.41412e-08 8 0C7.44772 2.41412e-08 7 0.447715 7 1L9 1ZM7.29289 17.7071C7.68342 18.0976 8.31658 18.0976 8.70711 17.7071L15.0711 11.3431C15.4616 10.9526 15.4616 10.3195 15.0711 9.92893C14.6805 9.53841 14.0474 9.53841 13.6569 9.92893L8 15.5858L2.34315 9.92893C1.95262 9.53841 1.31946 9.53841 0.928933 9.92893C0.538408 10.3195 0.538408 10.9526 0.928933 11.3431L7.29289 17.7071ZM7 1L7 17L9 17L9 1L7 1Z" fill="currentColor"/></svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container hidden lg:block">
//         <div className="row">
//           <div className="col-12 mt-2">
//             <hr className="border-[#DBD8BD]" />
//           </div>
//         </div>
//       </div>

//       <ScrollProgressBar title={title} />

//       <div className="lg:pt-20 pb-16 sm:pb-20 overflow-clip">
//         <div className="container">
//           <div className="row g-6">
//             <div className="lg:col-8 xl:col-9">
//               <div className="block lg:hidden mb-8">
//                 <TableOfContents />
//               </div>
//               <div id="post-content" className="prose content max-w-none">
//                 <MDXRemote source={content} components={MDXcomponents} />
//               </div>

//               <div className="block lg:hidden mt-14 [&_p]:!text-start [&_ul]:!justify-start [&_hr]:!ml-0">
//                 <SharePost title={title} slug={slug} />
//               </div>

//               <div className="border border-[#DBD8BD] mt-10 lg:mt-20 rounded-lg">
//                 <Link
//                   href={`/author/${slugify(author)}`}
//                   className="flex flex-col sm:flex-row gap-y-5 gap-x-6 hover:text-dark transition-all duration-300 p-5 group"
//                 >
//                   <Image
//                     src={currentAuthor.frontmatter.image}
//                     alt={author}
//                     height={128}
//                     width={128}
//                     className="rounded-lg h-28 w-28 bg-white/10 flex-shrink-0 object-cover"
//                   />
//                   <div className="self-center">
//                     <p className="text-2xl mb-2">{author}</p>
//                     <p className="ml-auto opacity-75 mb-4">
//                       {currentAuthor.frontmatter.subtitle}
//                     </p>
//                     <div className="prose max-w-none text-[15px] line-clamp-2">
//                       <MDXRemote source={currentAuthor.content} />
//                     </div>

//                     <p className="inline-flex items-center gap-3 mt-4 group-hover:text-primary transition-all duration-200 underline decoration-[#b4b6b9] group-hover:decoration-primary">
//                       Read Posts of - {author}
//                       {/* prettier-ignore */}
//                       <svg className="relative top-[2px]" width="10" height="10" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33008 17.4023L17.3301 1.40234M17.3301 1.40234H2.93008M17.3301 1.40234V15.8023" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             </div>

//             <div className="lg:col-4 xl:col-3 hidden lg:block">
//               <div className="sticky top-16">
//                 <TableOfContents />
//                 <SharePost title={title} slug={slug} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="pb-16 sm:pb-24">
//         <SectionHeader
//           title="Suggested Posts"
//           buttonLabel="All Posts"
//           buttonLink="/blog"
//         />

//         <div className="container mt-12">
//           <div className="row gy-6">
//             {suggestedPosts.map((post, key) => (
//               <div key={key} className="md:col-6 lg:col-4">
//                 <PostThree post={post} imageHeight={true} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default BlogDetails;

import Head from "next/head";
import Link from "next/link";
import DOMPurify from "dompurify";

// Function to fetch data from the API
export async function getdata() {
  try {
    const res = await fetch("http://localhost:5039/blog/");
    const data1 = await res.json();
    return { data1 };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export default async function BlogDetails({ searchParams }) {
  const slug = searchParams?.slug; // Get the 'slug' query parameter
  const { data1 } = await getdata();

  if (!data1 || data1.length === 0) {
    return <div className="text-white">No data found</div>;
  }

  // Extract the first item
  const mobileData = data1[0];
  const mobileInfo = mobileData.mobile_info;
  const keys = Object.keys(mobileInfo);

  const sanitize = (html) => {
    if (html && typeof window !== "undefined") {
      return DOMPurify.sanitize(html); // Sanitize on the client-side
    }
    return html;
  };

  return (
    <>
      <Head>
        <title>{mobileData.name}</title>
      </Head>

      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        <nav
          className="absolute right-0 w-full flex items-center justify-between md:justify-end px-4 h-16"
          aria-label="Navbar"
        >
          <button className="bg-black hover:bg-white border-black w-36 h-8 py-1 text-white hover:text-black border rounded-md text-sm transition-all">
            Log in with GitHub
          </button>
        </nav>

        <div
          className="min-h-screen pb-20 "
          style={{
            backgroundImage: "url('/images/wave-bg.webp')",
            backgroundSize: "cover", // Ensures the background image covers the entire container
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
            backgroundPosition: "center", // Centers the background image
          }}
        >
          <div>
            <div className="h-48 w-full lg:h-64 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
                <img
                  alt="GitHub Avatar"
                  src="https://avatars.githubusercontent.com/u/280212?v=4"
                  className="transition-all grayscale-0 blur-0 scale-100"
                  // onError={(e) => {
                  //   e.target.onerror = null; // Prevent infinite loop in case of an error
                  //   e.target.src = "/images/default-avatar.png"; // Replace with a fallback image path
                  // }}
                />
              </div>
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="flex min-w-0 flex-1 items-center space-x-2">
                  <h1 className="text-2xl font-semibold text-white truncate">
                    {mobileData.name}
                  </h1>
                  <svg
                    className="w-6 h-6 text-[#0070F3]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 ">
                  <a
                    href="https://github.com/19h"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center px-4 py-2 border border-gray-800 hover:border-white shadow-sm text-sm font-medium rounded-md text-white font-mono bg-black focus:outline-none focus:ring-0 transition-all"
                  >
                    <svg
                      className="mr-3 h-5 w-5 text-white"
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <span>View GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-800">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {keys.map((key) => (
                    <Link
                      href={{ query: { slug: key } }}
                      key={key}
                      scroll={false}
                    >
                      <button
                        className={`border-white text-white whitespace-nowrap py-3 px-1 font-medium text-sm font-mono ${
                          slug === key ? "border-b-2" : ""
                        }`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-white">
            {slug ? (
              <div>
                <h2 className="text-xl font-semibold">
                  {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </h2>
                <div>
                  {typeof mobileInfo[slug] === "object" ? (
                    <ul>
                      {Object.entries(mobileInfo[slug]).map(
                        ([subKey, value]) => (
                          <li key={subKey}>
                            <strong>
                              {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                              :
                            </strong>{" "}
                            {value}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>{mobileInfo[slug]}</p>
                  )}
                </div>
              </div>
            ) : (
              // Fallback to the first key of `mobileInfo` if `slug` is not provided
              <div>
                <h2 className="text-xl font-semibold">
                  {keys[0].charAt(0).toUpperCase() + keys[0].slice(1)}
                </h2>
                <div>
                  {typeof mobileInfo[keys[0]] === "object" ? (
                    <ul>
                      {Object.entries(mobileInfo[keys[0]]).map(
                        ([subKey, value]) => (
                          <li key={subKey}>
                            <strong>
                              {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                              :
                            </strong>{" "}
                            {value}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>{mobileInfo[keys[0]]}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
