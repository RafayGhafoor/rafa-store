"use client"

interface Video {
  type: "youtube" | "tiktok" | "shorts"
  id?: string
  url?: string
}

interface VideoEmbedProps {
  video: Video
}

export function VideoEmbed({ video }: VideoEmbedProps) {
  if (!video) return null

  switch (video.type) {
    case "youtube":
      return video.id ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}`}
            title="Product Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        </div>
      ) : null

    case "tiktok":
      return video.url ? (
        <div className="flex justify-center">
          <blockquote className="tiktok-embed" cite={video.url} data-unique-id="123456789" data-embed-type="video">
            <section>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                View on TikTok
              </a>
            </section>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      ) : null

    case "shorts":
      return video.url ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?start=0`}
            title="Product Shorts"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        </div>
      ) : null

    default:
      return null
  }
}
