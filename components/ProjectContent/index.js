import { RichTextCollection, RichTextObject } from "../notion";
import "./index.scss";

const Block = ({ block }) => {
  switch (block.type) {
    case "code":
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: block.code.rich_text[0].plain_text,
          }}
        />
      );
    case "paragraph":
      return (
        <p>
          <RichTextObject object={block.paragraph.rich_text[0]} />
        </p>
      );
    case "image":
      const caption = block.image.caption;
      return (
        <>
          <img
            src={block.image.file.url}
            style={{ width: "100%" }}
            alt={caption ? caption[0].plain_text : ""}
          />
          {!!caption && <p className="caption">{caption[0].plain_text}</p>}
        </>
      );
    case "video":
      const urlSegments = block.video.external.url.split("/");
      const vimeoId = urlSegments[urlSegments.length - 1];
      return (
        <>
          <div className="video-container">
            <iframe
              title="Project Video"
              src={`https://player.vimeo.com/video/${vimeoId}`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
          {block.video.caption && (
            <p className="video-caption">
              <RichTextCollection objects={block.video.caption} />
            </p>
          )}
        </>
      );
    case "embed":
      return (
        <div className="embed-container">
          <iframe src={block.embed.url} title="Embedded content" />
        </div>
      );
    default:
      return null;
  }
};

function ProjectContent({ blocks }) {
  return (
    <>
      {blocks?.map((block, i) => (
        <Block key={`${block.type}-${i}`} block={block} />
      ))}
    </>
  );
}

export default ProjectContent;
