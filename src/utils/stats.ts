function getEngagementRate(likes: number, comments: number, followers: number): number {
  return (likes + comments) / followers
}

function getReachPerPost(likes: number, comments: number): number {
  return (likes + comments) * 1.3
}

function getLikesPerPost(likes: number, posts: number): number {
  return likes
}

function getCommentsPerPost(comments: number, posts: number): number {
  return comments
}

// Birthday is "YYYY-MM-DD"
function dateToAge(birthday: string): number {
  const [year, month, day] = birthday.split('-').map(_item => parseInt(_item))
  const birthDate = new Date(year, month - 1, day)
  const ageDifMs = Date.now() - birthDate.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

function yearToAge(birthYear: number): number {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear
  // TODO: separate years in the middle to have a more accurate age guess
  return age
}

export {
  getEngagementRate,
  getReachPerPost,
  getLikesPerPost,
  getCommentsPerPost,
  dateToAge,
  yearToAge,
}
