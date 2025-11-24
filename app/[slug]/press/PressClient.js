"use client";
import { useRouter } from "next/navigation";
import ProjectAside from "../../../components/ProjectAside";
import CVSection from "../../../components/CVSection";
import NavArrows from "../../../components/NavArrows";

export default function PressClient({ project, pressByYear }) {
  const router = useRouter();

  return (
    <>
      <div className="page-content">
        <ProjectAside
          project={project}
          view="Press"
        />
        <section className="content">
          {pressByYear.years.map((year) => (
            <CVSection
              key={year}
              name={year}
              items={pressByYear.itemsByKey[year]}
              isNested={true}
            />
          ))}
        </section>
      </div>
      <NavArrows 
        onLeftClick={() => router.push("/" + project.slug)}
      />
    </>
  );
}

