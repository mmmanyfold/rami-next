"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import NavArrows from "../../components/NavArrows";
import Footnotes from "../../components/Footnotes";

const ProjectView = dynamic(() => import("../../components/ProjectView"), {
  ssr: false,
});

export default function ProjectClient({ project, projects, currentIndex }) {
  const router = useRouter();

  if (!project || !projects) {
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
        onLeftClick={() => router.push("/" + prev.slug)}
        onRightClick={() => router.push("/" + next.slug)}
      />
      {projects && <Footnotes projects={projects} />}
    </>
  );
}
