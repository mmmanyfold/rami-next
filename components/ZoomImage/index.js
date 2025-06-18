"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NavArrows from "../NavArrows";
import X from "../../icon/X";
import { BREAKPOINTS } from "../../config/breakpoints";
import "./index.scss";

const INITIAL_SCALE = 1.5;
const INITIAL_SCALE_MOBILE = 3;

const isMobile = () => {
  return window.innerWidth < BREAKPOINTS.MID;
}

const getContentHeight = () => {
  return window.innerHeight - (isMobile() ? 94 : 118);
}

const getImageAlt = (block) => {
  return block.caption?.map(block => block.plain_text).join();
}

const getInitialZoomScale = () => {
  return isMobile() ? INITIAL_SCALE_MOBILE : INITIAL_SCALE;
}

// Simple debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const ZoomImage = ({ imageBlock, allImageBlocks }) => {
  const [contentHeight, setContentHeight] = useState(getContentHeight());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomImageBlock, setZoomImageBlock] = useState(imageBlock);
  const [zoomMode, setZoomMode] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });
  const [initialScale, setInitialScale] = useState(getInitialZoomScale());

  useEffect(() => {
    function handleResize() {
      setContentHeight(getContentHeight());
      setInitialScale(getInitialZoomScale());
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTransformStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTransformEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e) => {
    const dx = e.clientX - mouseDownPos.x;
    const dy = e.clientY - mouseDownPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 5 && !isDragging) {
      setZoomMode(false);
    }
  };

  const currentZoomIndex = useMemo(() => 
    allImageBlocks.indexOf(zoomImageBlock),
    [allImageBlocks, zoomImageBlock]
  );

  const navCallback = () => {
    setZoomMode(false);
    if (isMobile()) {
      setTimeout(() => {
        setZoomMode(true);
      }, 250);
    }
  };

  const handlePreviousClick = useCallback(() => {
    const prevIndex = (currentZoomIndex - 1 + allImageBlocks.length) % allImageBlocks.length;
    setZoomImageBlock(allImageBlocks[prevIndex]);
    navCallback();
  }, [allImageBlocks, currentZoomIndex])

  const handleNextClick = useCallback(() => {
    const nextIndex = (currentZoomIndex + 1) % allImageBlocks.length;
    setZoomImageBlock(allImageBlocks[nextIndex]);
    navCallback();
  }, [allImageBlocks, currentZoomIndex])

  useEffect(() => {
    const handleKeyDown = debounce((event) => {
      if (event.key === "ArrowLeft" && handlePreviousClick) {
        handlePreviousClick();
      } else if (event.key === "ArrowRight" && handleNextClick) {
        handleNextClick();
      }
    }, 150); // 150ms delay to prevent rapid navigation
    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePreviousClick, handleNextClick]);

  const zoomImage = useMemo(() => (
    <img
      src={zoomImageBlock.file.url}
      alt={getImageAlt(zoomImageBlock)}
      loading="lazy"
      style={{
        height: "100%",
        maxWidth: "100%",
        objectFit: "contain",
      }}
    />
  ), [zoomImageBlock]);

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        setZoomImageBlock(imageBlock);
        // Default to true on mobile.
        setZoomMode(isMobile());
      }}
    >
      <Dialog.Trigger asChild>
        <img
          src={imageBlock.file.url}
          alt={getImageAlt(imageBlock)}
          loading="lazy"
          className="zoom-trigger"
          style={{ width: "100%" }}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="zoom-overlay" />
        <Dialog.Content className="zoom-content">
          <Dialog.Close asChild>
            <div className="close-container">
              <X />
            </div>
          </Dialog.Close>
          {zoomMode ? (
            <div 
              className="zoom-image-container"
              onMouseDown={handleMouseDown}
              onClick={handleClick}
            >
              <TransformWrapper
                onTransformationStart={handleTransformStart}
                onTransformationEnd={handleTransformEnd}
                centerOnInit={true}
                initialScale={initialScale}
                wheel={{ wheelDisabled: true }}
                panning={{ wheelPanning: true }}
              >
                <TransformComponent
                  wrapperStyle={{
                    height: `${contentHeight}px`,
                    margin: "auto",
                  }}
                >
                  {zoomImage}
                </TransformComponent>
              </TransformWrapper>
            </div>
          ) : (
            <div
              className="zoom-thumbnail"
              style={{
                height: `${contentHeight}px`,
              }}
              onClick={() => setZoomMode(true)}
              role="button"
            >
              {zoomImage}
            </div>
          )}
          {allImageBlocks.length > 1 && (
            <NavArrows
              onLeftClick={handlePreviousClick}
              onRightClick={handleNextClick}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ZoomImage;
