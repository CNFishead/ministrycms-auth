import React from "react";
import Head from "next/head";

const Meta = ({ title, description, keywords, url, image }) => (
  <Head>
    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
    {/* <!-- Primary Meta Tags --> */}
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keyword" content={keywords} />
    {/* <!-- Open Graph / Facebook --> */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    {/* <!-- Twitter --> */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />

    {/* VideoJs CSS link */}
  </Head>
);

Meta.defaultProps = {
  title: "Shepherd's CMS",
  description: "Shepherd's CMS is a free, open-source cloud-hosted content management system for churches.",
  keywords: ["Shepherd's CMS", "Shepherd's", "CMS", "Church", "Content Management System", "Church CMS"],
  url: "https://shepherdscms.org",
  image: "https://shepherdscms.org/images/ShepherdsCMS.png",
};

export default Meta;
