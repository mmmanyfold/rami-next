"use client";
import { useEffect, useState } from "react";
import ProjectView from "../../../components/ProjectView";
import { loadProjects } from "../../api";
import { usePathname, useRouter } from "next/navigation";
import NavArrows from "../../../components/NavArrows";

function TranscriptPage() {
  const [project, setProject] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const projectSlug = pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadProjects();
      setProject(projects.find((p) => p?.slug === projectSlug));
    };
    fetchData();
  }, []);

  return (
    <>
      {project && (
        <>
          <ProjectView
            project={project}
            blocks={project.transcript.blocks}
            view="Transcript"
          />
          <NavArrows 
            onLeftClick={() => router.push("/" + projectSlug)}
          />
        </>
      )}
    </>
  );
}

export default TranscriptPage;
