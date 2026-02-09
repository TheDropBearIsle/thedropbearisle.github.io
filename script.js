// The Drop Bear Isle — quick config for links + video
const CONFIG = {
  discordUrl: "https://discord.gg/YOUR_INVITE",
  youtubeUrl: "https://www.youtube.com/@YOUR_CHANNEL",
  // Replace with your YouTube video ID (not full URL)
  youtubeVideoId: "dQw4w9WgXcQ",
  // If you want "Sign in / Signup" to go somewhere else for now:
  signinUrl: "signin.html"
};

function setHref(id, url){
  const el = document.getElementById(id);
  if (!el) return;
  el.href = url;
}

function setButtonClick(id, url){
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", () => window.open(url, "_blank", "noopener,noreferrer"));
}

function setYouTubeEmbed(){
  const iframe = document.getElementById("ytEmbed");
  if (!iframe) return;
  const id = (CONFIG.youtubeVideoId || "").trim();
  // basic guard
  if (!id) return;
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1`;
}

function setYear(){
  const el = document.getElementById("year");
  if (!el) return;
  el.textContent = new Date().getFullYear();
}

(function init(){
  setHref("discordLink", CONFIG.discordUrl);
  setHref("youtubeLink", CONFIG.youtubeUrl);
  setHref("signinLink", CONFIG.signinUrl);

  setButtonClick("joinDiscordBtn", CONFIG.discordUrl);
  setButtonClick("watchYoutubeBtn", CONFIG.youtubeUrl);

  setYouTubeEmbed();
  setYear();
})();
