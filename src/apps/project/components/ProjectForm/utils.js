export const extractYoutubeVideoId = (url) => {
  if (url && url !== '') {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2]
    }
    else {
      return null;
    }
  }
  return null;
};
