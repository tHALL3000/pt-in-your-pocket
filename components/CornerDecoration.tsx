interface CornerDecorationProps {
  src: string;
  corner: "bottom-left" | "bottom-right";
  size?: number;
}

export default function CornerDecoration({ src, corner, size = 130 }: CornerDecorationProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="no-print"
      style={{
        position: "fixed",
        bottom: "calc(72px + env(safe-area-inset-bottom))",
        [corner === "bottom-right" ? "right" : "left"]: 0,
        width: size,
        height: size,
        objectFit: "contain",
        pointerEvents: "none",
        mixBlendMode: "multiply",
        opacity: 0.8,
        zIndex: 10,
      }}
    />
  );
}
