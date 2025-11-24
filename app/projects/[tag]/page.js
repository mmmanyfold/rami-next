import { loadProjects } from "../../api";
import TagClient from "./TagClient";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export async function generateMetadata({ params }) {
  const tag = params.tag;
  const isYear = /^\d{4}$/.test(tag);
  const projects = await loadProjects();
  
  let filtered;
  if (isYear) {
    filtered = projects.filter((p) => p.year === tag);
  } else {
    filtered = projects.filter((p) => p.tags.includes(tag));
  }

  const title = isYear ? tag : capitalize(tag);
  const description = `Archive of Artwork – ${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `projects/${tag}`,
      siteName: "Rami George",
      images: [{
        url: "https://stufff.s3.us-east-1.amazonaws.com/rami-og.png",
        width: 1200,
        height: 630,
        alt: "Rami George",
      }],
      locale: "en_US",
      type: "website",
    },
  };
}

async function TagPage({ params }) {
  const projectsData = await loadProjects();
  const tag = params.tag;
  const isYear = /^\d{4}$/.test(tag);

  let filtered;
  if (isYear) {
    filtered = projectsData.filter((p) => p.year === tag);
  } else {
    filtered = projectsData.filter((p) => p.tags.includes(tag));
  }

  return <TagClient projects={filtered} />;
}

export default TagPage;
