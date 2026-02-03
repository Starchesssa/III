import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Video = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          border: "6px solid black",
          padding: 50,
          boxShadow: "12px 12px 0 black",
          background: "#f4f4f4",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 52, fontWeight: 900 }}>
          NEO-BRUTAL VIDEO
        </h1>

        <div
          style={{
            marginTop: 30,
            padding: "14px 30px",
            border: "4px solid black",
            boxShadow: "6px 6px 0 black",
            fontSize: 22,
            fontWeight: 700,
            display: "inline-block",
          }}
        >
          CLICK ENERGY
        </div>
      </div>
    </AbsoluteFill>
  );
};
