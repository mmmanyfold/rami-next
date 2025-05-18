import { RichTextCollection } from "../notion";
import LinkWithArrow from "../LinkWithArrow";
import "./index.scss";

const ProjectAside = ({ project, view }) => {
  const isSubview = view !== "Project";

  const hasLinks = Boolean(
    project.transcript?.uuid ||
    project.exhibitionGuide ||
    project.exhibitionPublication ||
    project.exhibitionPosters ||
    project.pressAdditional
  )

  const shouldShowLastDivider = isSubview || 
    (project.description?.length && 
      (hasLinks || project.miscellaneous));

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

          {shouldShowLastDivider && <hr />}

          <div className="links">
            {isSubview ? (
              view
            ) : (
              <>
                {project.transcript?.uuid && (
                  <div>
                    <LinkWithArrow 
                      href={"/" + project.slug + "/transcript"} 
                      text="Transcript"
                    />
                  </div>
                )}
                {project.exhibitionGuide && (
                  <div>
                    <LinkWithArrow 
                      href={project.exhibitionGuide} 
                      text="Exhibition Guide" 
                      isExternal={true}
                    />
                  </div>
                )}
                {project.exhibitionPublication && (
                  <div>
                    <LinkWithArrow 
                      href={project.exhibitionPublication} 
                      text="Exhibition Publication" 
                      isExternal={true}
                    />
                  </div>
                )}
                {project.exhibitionPosters?.length > 0 && (
                  <div>
                    {project.exhibitionPosters.map(({url}, index) => (
                      <div key={`${index}-${url}`}>
                        <LinkWithArrow 
                          href={url} 
                          text={`Exhibition Poster${index === 0 ? "" : ` ${index + 1}`}`} 
                          isExternal={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {project.pressAdditional && (
                  <div>
                    <LinkWithArrow 
                      href={"/" + project.slug + "/press"} 
                      text="Press"
                    />
                  </div>
                )}
                {project.miscellaneous && (
                  <div>
                    {hasLinks && <br />}
                    <RichTextCollection objects={project.miscellaneous} />
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      )}
    </>
  );
};

export default ProjectAside;
