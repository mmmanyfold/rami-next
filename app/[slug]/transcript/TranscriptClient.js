"use client";
import { useRouter } from "next/navigation";
import ProjectView from "../../../components/ProjectView";
import NavArrows from "../../../components/NavArrows";

export default function TranscriptClient({ project }) {
  const router = useRouter();

  return (
    <>
      <ProjectView
        project={project}
        blocks={project.transcript.blocks}
        view="Transcript"
      />
      <NavArrows 
        onLeftClick={() => router.push("/" + project.slug)}
      />
    </>
  );
}

