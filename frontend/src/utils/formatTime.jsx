export default function formatTimestamp(timestamp) {
  if (!timestamp) return ""; // 👈 IMPORTANT

  const messageTime = new Date(timestamp).getTime();
  if (isNaN(messageTime)) return ""; // 👈 extra safety

  const now = Date.now();
  const diff = now - messageTime;

  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;

  return `${Math.floor(diff / 86400000)} days ago`;
}
