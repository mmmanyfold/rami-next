import { loadProjects } from "../api";
import ProjectClient from "./ProjectClient";

export async function generateMetadata({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const project = projects.find((p) => p?.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title}`;
  const mediumText = project.medium?.map(m => m.plain_text).join('') || '';
  const description = mediumText || "Archive of Artwork (2011–Present)";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: slug,
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

async function ProjectPage({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const currentIndex = projects.findIndex((p) => p?.slug === slug);
  const project = projects[currentIndex];

  return <ProjectClient project={project} projects={projects} currentIndex={currentIndex} />;
}

export default ProjectPage;
