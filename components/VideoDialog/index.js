"use client";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import X from "../../icon/X";

const VideoDialog = ({ block }) => {
  const [contentHeight, setContentHeight] = useState(window.innerHeight - 118);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { caption, file } = block;

  useEffect(() => {
    function handleResize() {
      setContentHeight(window.innerHeight - 118);
    }
    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Dialog.Root
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
        }}
      >
        <Dialog.Trigger asChild>
          <video playsInline style={{ width: "100%", cursor: "pointer" }}>
            <source src={file.url} type="video/mp4" />
          </video>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="zoom-overlay" />
          <Dialog.Content className="zoom-content">
            <Dialog.Close asChild>
              <div className="close-container">
                <X />
              </div>
            </Dialog.Close>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: `${contentHeight}px`,
              }}
            >
              <video
                controls
                playsInline
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              >
                <source src={file.url} type="video/mp4" />
              </video>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {!!caption && <p className="caption">{caption[0].plain_text}</p>}
    </>
  );
};

export default VideoDialog;
