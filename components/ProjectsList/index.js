"use client";
import { useState, useEffect } from "react";
import ProjectsGrid from "../ProjectsGrid";
import RowsIcon from "../../icon/RowsIcon";
import GridIcon from "../../icon/GridIcon";
import "./index.scss";

function ProjectsList({ projects }) {
  const [activeView, setActiveView] = useState("gallery");
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const cachedView = JSON.parse(localStorage.getItem("activeView"));
    if (cachedView) {
      setActiveView(cachedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeView", JSON.stringify(activeView));
  }, [activeView]);

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
          className={activeView === "list" ? "active" : ""}
          onClick={() => setActiveView("list")}
        >
          TEXT <span />
          <RowsIcon />
        </div>
        <div
          role="button"
          className={activeView === "gallery" ? "active" : ""}
          onClick={() => setActiveView("gallery")}
        >
          <GridIcon />
          <span /> GALLERY
        </div>
      </div>

      {activeView === "list" ? (
        <ul>
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
      ) : activeView === "gallery" ? (
        <ProjectsGrid projects={projects} />
      ) : null}
    </div>
  );
}

export default ProjectsList;
