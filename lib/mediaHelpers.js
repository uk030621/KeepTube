// lib/mediaHelpers.js

export function isYouTubeUrl(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  const shortIdRegex = /^[a-zA-Z0-9_-]{11}$/; // Handles 11-char video IDs
  return youtubeRegex.test(url) || shortIdRegex.test(url);
}
