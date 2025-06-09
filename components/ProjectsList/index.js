"use client";
import { useState, useEffect, useContext } from "react";
import { LayoutContext } from "@/app/layout";
import ProjectsGrid from "../ProjectsGrid";
import RowsIcon from "../../icon/RowsIcon";
import GridIcon from "../../icon/GridIcon";
import "./index.scss";

function ProjectsList({ projects }) {
  const [innerWidth, setInnerWidth] = useState(0);
  const { projectsView, setProjectsView } = useContext(LayoutContext);

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="projects-list">
      <div className="header">
        <div
          role="button"
          className={projectsView === "list" ? "active" : ""}
          onClick={() => setProjectsView("list")}
        >
          <span>TEXT</span>
          <RowsIcon style={{ marginTop: "-2px", marginLeft: "4px" }} />
        </div>
        <div
          role="button"
          className={projectsView === "gallery" ? "active" : ""}
          onClick={() => setProjectsView("gallery")}
        >
          <GridIcon style={{ marginTop: "-2px", marginRight: "4px" }} />
          <span>GALLERY</span>
        </div>
      </div>

      {projectsView === "list" ? (
        <ul className="plain-list" style={{ padding: "0 0.35rem" }}>
          {!!projects?.length ? (
            projects.map(({ id, title, slug, year, tags }) => {
              const [first, ...rest] = title.split(",");

              return (
                <li key={id}>
                  <div className="title">
                    <sup className="middle">({id})</sup>
                    <a href={`/${slug}`}>
                      {innerWidth < 820 ? (
                        <h1 className="title-text">{title}</h1>
                      ) : (
                        <h1 className="title-text">
                          <span>{`${first}${rest.length ? ", " : ""}`}</span>
                          {rest.length ? (
                            <span>{rest.join(",").substr(1)}</span>
                          ) : null}
                        </h1>
                      )}
                    </a>
                  </div>
                  <div className="tags">
                    {tags.map((tag) => (
                      <div key={tag}>
                        <a href={`/projects/${tag}`}>{tag}</a>
                      </div>
                    ))}
                    <div>
                      <a href={`/projects/${year}`}>{year}</a>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li></li>
          )}
        </ul>
      ) : projectsView === "gallery" ? (
        <ProjectsGrid projects={projects} />
      ) : null}
    </div>
  );
}

export default ProjectsList;
