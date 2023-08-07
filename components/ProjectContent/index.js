import { RichTextObject } from "../notion";
import ZoomImage from "../ZoomImage";
import VideoDialog from "../VideoDialog";
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
          {block.paragraph.rich_text.map((richText) => (
            <RichTextObject key={richText.text.content} object={richText} />
          ))}
        </p>
      );
    case "image":
      const caption = block.image.caption;
      return (
        <>
          <ZoomImage
            src={block.image.file.url}
            alt={caption ? caption[0].plain_text : ""}
            fullWidth={true}
          />
          {!!caption && <p className="caption">{caption[0].plain_text}</p>}
        </>
      );
    case "video":
      if (block.video.type === "external") {
        const urlSegments = block.video.external.url.split("/");
        const vimeoId = urlSegments[urlSegments.length - 1];
        return (
          <>
            <div className="video-container">
              <iframe
                title="Project Video"
                src={`https://player.vimeo.com/video/${vimeoId}`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            {block.video.caption && (
              <p className="caption">{block.video.caption[0].plain_text}</p>
            )}
          </>
        );
      }
      return <VideoDialog block={block.video} />;

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
