import { Composition, registerRoot } from "remotion";
import { Video } from "./Video";

registerRoot(() => (
  <Composition
    id="NeoBrutal"
    component={Video}
    durationInFrames={30}
    fps={30}
    width={1080}
    height={1080}
  />
));
