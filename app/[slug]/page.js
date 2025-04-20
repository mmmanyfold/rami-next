"use client";
import ProjectView from "../../components/ProjectView";
import Footnotes from "../../components/Footnotes";
import NavArrows from "../../components/NavArrows";
import { loadProjects } from "../api";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ProjectPage() {
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await loadProjects();
      setProjects(projects);
    };
    if (!projects) {
      fetchProjects();
    }
  }, [projects]);

  useEffect(() => {
    if (projects && !!pathname) {
      const idx = projects.findIndex((p) => p?.slug === pathname.slice(1));
      setCurrentIndex(idx);
      setProject(projects[idx]);
    }
  }, [projects, pathname]);

  if (!project) {
    return null;
  }

  const next =
    currentIndex === projects.length - 1
      ? projects[0]
      : projects[currentIndex + 1];
  const prev =
    currentIndex === 0
      ? projects[projects.length - 1]
      : projects[currentIndex - 1];

  return (
    <>
      <ProjectView project={project} blocks={project.blocks} />
      <NavArrows 
        onLeftClick={() => router.push(prev.slug)}
        onRightClick={() => router.push(next.slug)}
      />
      {projects && <Footnotes projects={projects} />}
    </>
  );
}

export default ProjectPage;
