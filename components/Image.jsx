export default function Image({ src, alt = "c4l image" }) {
  return <img src={src} alt={alt} className="mx-auto my-2" />;
}
