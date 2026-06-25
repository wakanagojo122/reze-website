/**
 * Parses any YouTube URL (short, watch, embed) and returns a valid embeddable URL with autoplay.
 */
export function getYoutubeEmbedUrl(url: string, autoplay: boolean = true): string {
  if (!url) {
    return "https://www.youtube.com/embed/EPaoHkV0dYw" + (autoplay ? "?autoplay=1" : "");
  }

  // Handle standard embed URL
  if (url.includes("youtube.com/embed/")) {
    const embedId = url.split("youtube.com/embed/")[1]?.split("?")[0];
    if (embedId) {
      return `https://www.youtube.com/embed/${embedId}${autoplay ? "?autoplay=1" : ""}`;
    }
  }

  // Regular expression to extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  const videoId = (match && match[2].length === 11) ? match[2] : null;

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1" : ""}`;
  }

  // Fallback to whatever URL was passed
  return url;
}
