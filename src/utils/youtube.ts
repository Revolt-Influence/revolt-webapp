export function getVideoId(youtubeUrl: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = youtubeUrl.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  } else {
    return null
  }
}

export function getYoutubeEmbedLink(videoId: string, autoplay: boolean = false): string {
  return `https://www.youtube.com/embed/${videoId}?modestbranding=1&autoplay=${autoplay ? 1 : 0}`
}

export function getYoutubeThumbnail(videoUrl: string): string {
  const videoId = getVideoId(videoUrl)
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}
