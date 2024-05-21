import React from "react";
import getYouTubeId from "get-youtube-id";
// import YouTube from "react-youtube";

export const YoutubePreviewComponent = ({
  value,
}: {
  value: {
    url: string;
  };
}) => {
  const { url } = value;

  if (!url) {
    return null;
  }
  const id = getYouTubeId(url) || undefined;

  /* return <YouTube videoId={id} />; */
  return (
    <img
      styles={{ width: "100%" }}
      src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
      alt=" "
    />
  );
};
