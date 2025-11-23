import { loadProjects } from "../api";
import ProjectsClient from "./ProjectsClient";

export async function generateMetadata() {
  const projects = await loadProjects();
  const projectCount = projects.length;
  
  return {
    title: "Projects",
    description: "Archive of Artwork (2011–Present)",
    openGraph: {
      title: "Projects",
      description: "Archive of Artwork (2011–Present)",
      url: "projects",
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

async function IndexPage() {
  const projects = await loadProjects();
  return <ProjectsClient projects={projects} />;
}

export default IndexPage;
