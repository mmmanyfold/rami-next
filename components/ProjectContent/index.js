"use client";
import { useMemo } from "react";
import { RichTextObject, RichTextCollection } from "../notion";
import ZoomImage from "../ZoomImage";
import VideoDialog from "../VideoDialog";
import "./index.scss";

const Block = ({ block, allImageBlocks }) => {
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
      return (
        <>
          <ZoomImage
            imageBlock={block.image}
            allImageBlocks={allImageBlocks}
          />
          {!!block.image.caption && (
            <div className="caption">
              <RichTextCollection objects={block.image.caption} />
            </div>
          )}
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
              <div className="caption">
                <RichTextCollection objects={block.video.caption} />
              </div>
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
  const allImageBlocks = useMemo(() => {
    return blocks.filter(block => block.type === "image").map(block => block.image);
  }, [blocks])
  
  return (
    <>
      {blocks?.map((block, i) => (
        <Block 
          key={`${block.type}-${i}`} 
          block={block} 
          allImageBlocks={allImageBlocks} 
        />
      ))}
    </>
  );
}

export default ProjectContent;
