"use client";
import ProjectView from "../../components/ProjectView";
import CaretLeft from "../../icon/CaretLeft";
import CaretRight from "../../icon/CaretRight";
import "./page.scss";
import Footnotes from "../../components/Footnotes";
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
      <div
        className="desktop arrow left"
        onClick={() => router.push(prev.slug)}
        role="button"
      >
        <CaretLeft />
      </div>
      <div
        className="desktop arrow right"
        onClick={() => router.push(next.slug)}
        role="button"
      >
        <CaretRight />
      </div>

      <div className="mobile-arrows hide-desktop">
        <div
          className="arrow left"
          onClick={() => router.push(prev.slug)}
          role="button"
        >
          <CaretLeft />
        </div>
        <div
          className="arrow right"
          onClick={() => router.push(next.slug)}
          role="button"
        >
          <CaretRight />
        </div>
      </div>

      {projects && <Footnotes projects={projects} />}
    </>
  );
}

export default ProjectPage;
