interface CornerDecorationProps {
  src: string;
  corner: "bottom-left" | "bottom-right";
  size?: number;
}

export default function CornerDecoration({ src, corner, size = 110 }: CornerDecorationProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="no-print"
      style={{
        position: "absolute",
        bottom: 0,
        [corner === "bottom-right" ? "right" : "left"]: 0,
        width: size,
        height: size,
        objectFit: "contain",
        pointerEvents: "none",
        mixBlendMode: "multiply",
        opacity: 0.85,
        zIndex: 0,
      }}
    />
  );
}
