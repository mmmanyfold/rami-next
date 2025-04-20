import { RichTextCollection } from "../notion";
import LinkWithArrow from "../LinkWithArrow";
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
              project.exhibitionPosters ||
              hasPress) && <hr />}

          <div className="links">
            {isSubview ? (
              view
            ) : (
              <>
                {project.transcript?.uuid && (
                  <>
                    <LinkWithArrow 
                      href={"/" + project.slug + "/transcript"} 
                      text="Transcript"
                    />
                    <br />
                    <br />
                  </>
                )}
                {project.exhibitionGuide && (
                  <>
                    <LinkWithArrow 
                      href={project.exhibitionGuide} 
                      text="Exhibition Guide" 
                      isExternal={true}
                    />
                    <br />
                    <br />
                  </>
                )}
                {project.exhibitionPublication && (
                  <>
                    <LinkWithArrow 
                      href={project.exhibitionPublication} 
                      text="Exhibition Publication" 
                      isExternal={true}
                    />
                    <br />
                    <br />
                  </>
                )}
                {project.exhibitionPosters?.length > 0 && (
                  <>
                    {project.exhibitionPosters.map(({url}, index) => (
                      <>
                        <LinkWithArrow 
                          key={`${index}-${url}`}
                          href={url} 
                          text={`Exhibition Poster ${index + 1}`} 
                          isExternal={true}
                        />
                        <br />
                      </>
                    ))}
                    <br />
                  </>
                )}
                {hasPress && (
                  <>
                    <LinkWithArrow 
                      href={"/" + project.slug + "/press"} 
                      text="Press"
                    />
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
              </>
            )}
          </div>
        </aside>
      )}
    </>
  );
};

export default ProjectAside;
