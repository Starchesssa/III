import { AbsoluteFill } from "remotion";
import { Button } from "neobrutal-ui";

export const Video = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          border: "5px solid black",
          padding: 40,
          boxShadow: "8px 8px 0 black",
          background: "#f4f4f4",
        }}
      >
        <h1 style={{ fontSize: 48, marginBottom: 30 }}>
          Neo-Brutal UI
        </h1>

        <Button>CLICK ME</Button>
      </div>
    </AbsoluteFill>
  );
};
