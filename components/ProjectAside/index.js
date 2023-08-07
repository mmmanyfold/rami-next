import { RichTextCollection } from "../notion";
import "./index.scss";

const ProjectAside = ({ project, view }) => {
  const isSubview = view !== "Project";
  const hasPress = Boolean(
    project?.pressExhibitions || project?.pressAdditional
  );

  return (
    <>
      {project && (
        <aside>
          <sup>({project.id})</sup>
          {isSubview ? (
            <a href={"/" + project.slug}>
              <h1 className="title">{project.title}</h1>
            </a>
          ) : (
            <>
              <h1 className="title">{project.title}</h1>
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

                <hr />

                <div className="description">
                  <RichTextCollection objects={project.description} />
                </div>
              </div>
            </>
          )}

          {project.description?.length &&
            (project.transcript?.uuid ||
              project.exhibitionGuide ||
              project.exhibitionPublication ||
              project.miscellaneous ||
              hasPress) && <hr />}

          <div className="links">
            {isSubview ? (
              view
            ) : (
              <>
                {project.transcript?.uuid && (
                  <>
                    <a href={"/" + project.slug + "/transcript"}>Transcript</a>
                    <br />
                    <br />
                  </>
                )}
                {project.exhibitionGuide && (
                  <>
                    <a href={project.exhibitionGuide} target="_blank">
                      Exhibition Guide
                    </a>
                    <br />
                    <br />
                  </>
                )}
                {project.exhibitionPublication && (
                  <>
                    <a href={project.exhibitionPublication} target="_blank">
                      Exhibition Publication
                    </a>
                    <br />
                    <br />
                  </>
                )}
                {project.miscellaneous && (
                  <>
                    <RichTextCollection objects={project.miscellaneous} />
                    <br />
                    <br />
                  </>
                )}
                {hasPress && <a href={"/" + project.slug + "/press"}>Press</a>}
              </>
            )}
          </div>
        </aside>
      )}
    </>
  );
};

export default ProjectAside;
