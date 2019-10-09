export function getVideoId(youtubeUrl: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = youtubeUrl.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  } else {
    return null
  }
}

export function getYoutubeEmbedLink(youtubeUrl: string): string {
  const videoId = getVideoId(youtubeUrl)
  return `https://www.youtube.com/embed/${videoId}?modestbranding=1`
}

export function getYoutubeThumbnail(videoUrl: string): string {
  const videoId = getVideoId(videoUrl)
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}
