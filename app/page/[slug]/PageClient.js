"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { RichTextCollection } from "../../../components/notion";
import NavArrows from "../../../components/NavArrows";
import "../../../components/ProjectAside/index.scss";
import "../../../components/ProjectView/index.scss";

const ProjectContent = dynamic(() => import("../../../components/ProjectContent"), {
  ssr: false,
});

export default function PageClient({ pageData }) {
  const router = useRouter();

  if (!pageData) {
    return null;
  }

  const { name, project, misc, blocks } = pageData;
  const hasProject = Boolean(project.id);

  return (
    <div className="page-content">
      <aside>
        {hasProject ? (
          <div>
            <sup>({project.id})</sup>
            <a href={project.slug ? `/${project.slug}` : ""}>
              <h1 className="title">{project.title}</h1>
            </a>
            <div className="meta">
              <RichTextCollection objects={project.medium} />
              <div className="tags">
                {project.tags?.length &&
                  project.tags.map((tag) => (
                    <span key={tag}>
                      <a href={"/projects/" + tag}>{tag}</a>,{" "}
                    </span>
                  ))}
                {project.year && (
                  <a href={"/projects/" + project.year}>{project.year}</a>
                )}
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <h1 className="title" style={{ marginTop: 12 }}>
            {name}
          </h1>
        )}

        <div className="links">
          {hasProject && name}
          {misc && (
            <>
              <hr />
              {typeof misc === "string" ? misc : <RichTextCollection objects={misc} />}
            </>
          )}
        </div>
      </aside>

      <section className="content">
        <ProjectContent blocks={blocks} />
      </section>

      {Boolean(project.slug) && (
        <NavArrows 
          onLeftClick={() => router.push("/" + project.slug)}
        />
      )}
    </div>
  );
}

