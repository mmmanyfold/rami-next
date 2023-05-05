import React from "react";
import "./index.scss";

function Project({ title, slug, tags, year, thumbnail }) {
  return (
    <div className="item">
      <a href={"/" + slug} className="title">
        <img src={thumbnail} alt={title} />
      </a>
      <div className="caption">
        <a href={"/" + slug} className="title">
          {title}
        </a>
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>
              <a href={"/index/" + tag}>{tag}</a>,{" "}
            </span>
          ))}
          <a href={"/index/" + year}>{year}</a>
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid({ projects }) {
  return (
    <div className="grid">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  );
}

export default ProjectsGrid;
