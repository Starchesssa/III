import { Composition, registerRoot } from "remotion";
import { Video } from "./Video";

registerRoot(() => (
  <Composition
    id="NeoBrutal"
    component={Video}
    durationInFrames={150}
    fps={30}
    width={1080}
    height={1080}
  />
));
