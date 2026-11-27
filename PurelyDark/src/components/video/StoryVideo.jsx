import ChocolateVideoSection from "./ChocolateVideoSection";

/* Immersive full-width story video — thin wrapper for semantic clarity.
   Autoplays with its poster shown as the background image, so the section is
   filled immediately and the video fades in over it (never blank). */
export default function StoryVideo(props) {
  return <ChocolateVideoSection posterInitial {...props} />;
}
