import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  id: string;
  title: string;
};

/**
 * Autoplaying YouTube embed. Browsers only allow autoplay when muted, so the
 * player starts muted and exposes an "unmute" control for the visitor.
 */
export function YouTubeEmbed({ id, title }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${id}&enablejsapi=1`;

  const command = (func: string) => {
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  };

  useEffect(() => {
    // keep playback going if the browser paused it during hydration
    const t = window.setTimeout(() => command("playVideo"), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const toggleSound = () => {
    if (muted) {
      command("unMute");
      command("setVolume");
      command("playVideo");
      setMuted(false);
    } else {
      command("mute");
      setMuted(true);
    }
  };

return (
    <div className="relative aspect-[9/16] w-full bg-black">
      <iframe
        ref={frame}
        src={src}
        title={title}
        className="h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn sound on" : "Mute video"}
className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-bold text-white backdrop-blur transition-all hover:bg-brand active:scale-95"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {muted ? "Tap for sound" : "Sound on"}
      </button>
    </div>
  );
}
