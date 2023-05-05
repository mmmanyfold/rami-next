"use client";
import { useState, useEffect } from "react";
import ProjectsList from "../../../components/ProjectsList";
import { loadProjects } from "../../api";
import { useRouter, usePathname } from "next/navigation";

function TagPage() {
  const [projects, setProjects] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await loadProjects();
      const tag = pathname.split("/")[2];
      const isYear = /^\d{4}$/.test(tag);

      let filtered;
      if (isYear) {
        filtered = projectsData.filter((p) => p.year === tag);
      } else {
        filtered = projectsData.filter((p) => p.tags.includes(tag));
      }
      setProjects(filtered);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ProjectsList projects={projects} />
    </div>
  );
}

export default TagPage;
