
// src/main.tsx
import {makeScene2D} from '@motion-canvas/2d';
import {
  Circle,
  Grid,
  Layout,
  Line,
  Node,
  Rect,
  SVG,
  Txt,
} from '@motion-canvas/2d/lib/components';
import {
  all,
  chain,
  waitFor,
  sequence,
  delay,
} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, range} from '@motion-canvas/core/lib/utils';
import {
  Color,
  Vector2,
  PossibleVector2,
} from '@motion-canvas/core/lib/types';
import {easeInCubic, easeOutCubic, linear} from '@motion-canvas/core/lib/tweening';

const THEME = {
  bg: '#141414',
  text: '#FFFFFF',
  amazonOrange: '#FF9900',
  success: '#4CAF50',
  failure: '#F44336',
  neutral: '#424242',
  light_neutral: '#616161',
  highlight: '#2196F3',
};

const textStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 72,
  fill: THEME.text,
  letterSpacing: -1,
};

// Helper to create a simple phone shape
const Phone = (props: {ref: any; size: number}) => (
  <Rect ref={props.ref} width={props.size} height={props.size * 2} radius={20} stroke={THEME.light_neutral} lineWidth={8}>
    <Rect
      width={props.size - 20}
      height={props.size * 2 - 20}
      fill={THEME.bg}
      radius={15}
    />
    <Rect
      width={props.size / 2}
      height={8}
      fill={THEME.light_neutral}
      radius={4}
      y={-(props.size) + 20}
    />
  </Rect>
);

export default makeScene2D(function* (view) {
  view.fill(THEME.bg);

  // SCENE 1: 10 Tries Concept (00:00 - 00:09)
  const boxes: Rect[] = [];
  const grid = createRef<Grid>();
  const successText = createRef<Txt>();

  view.add(
    <Grid
      ref={grid}
      width={1200}
      height={240}
      spacing={30}
      layout
    >
      {range(10).map(i => (
        <Rect
          ref={makeRef(boxes, i)}
          width={120}
          height={120}
          radius={20}
          fill={THEME.neutral}
          scale={0}
        />
      ))}
    </Grid>,
  );
  view.add(
    <Txt
      ref={successText}
      {...textStyle}
      fontSize={120}
      text="100x"
      fill={THEME.success}
      opacity={0}
      y={-50}
    />,
  );

  yield* sequence(
    0.1,
    ...boxes.map(box => box.scale(1, 0.3)),
  );
  yield* waitFor(0.8); // "Imagine you try something 10 times"

  yield* all(
    ...boxes.slice(0, 9).map((box, i) =>
      delay(i * 0.05,
        all(
          box.fill(THEME.failure, 0.3),
          box.shake(new Vector2(10, 0), 0.2)
        )
      )
    ),
  ); // "Nine times you fail"
  yield* waitFor(0.5);

  yield* all(
    boxes[9].fill(THEME.success, 0.3),
    boxes[9].scale(1.5, 0.3, easeOutCubic),
  ); // "But the one time you succeed"

  yield* all(
    ...boxes.slice(0, 9).map(box => box.scale(0, 0.5, easeInCubic)),
    boxes[9].position(new Vector2(0, 150), 0.5),
    boxes[9].scale(2, 0.5),
    successText.opacity(1, 0.5),
    successText.scale(1.2, 0.5),
  ); // "you earn 100 times more..."
  yield* waitFor(1.5);

  yield* all(
    grid.opacity(0, 0.5),
    successText.opacity(0, 0.5),
  );
  grid().remove();
  successText().remove();


  // SCENE 2: Amazon's Philosophy (00:09 - 00:15)
  const amazonLogo = createRef<SVG>();
  const philosophyText1 = createRef<Txt>();
  const philosophyText2 = createRef<Txt>();
  const failText = createRef<Txt>();

  view.add(
    <>
      <SVG
        ref={amazonLogo}
        opacity={0}
        scale={1.5}
        svg={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30">
          <path d="M22.8,17.4c-2.3,1.3-4.1,2.3-5.3,3c-1.2,0.7-2.7,1.1-4.4,1.1c-2.4,0-4.3-0.8-5.7-2.3s-2.1-3.6-2.1-6.1c0-2.8,0.8-5,2.3-6.6 S11,4.2,13.6,4.2c1.7,0,3.1,0.4,4.2,1.1c1.1,0.7,2.7,1.9,4.7,3.5l2.5-3.1C22.5,3.6,20.3,2,17.6,0.9C15, -0.3,12-0.3,12-0.3C6.4-0.3,2.6,1.8,0.7,6s-2.1,9.3,0,12.8c1.9,3.5,5.6,5.3,11.2,5.3c2.6,0,5-0.5,7.1-1.6c2.1-1.1,3.9-2.6,5.4-4.6 L22.8,17.4z"/>
          <path d="M43,18.9L43,18.9c-1.3,1.4-2.9,2.1-4.8,2.1c-2.2,0-3.9-0.8-5.1-2.3s-1.8-3.5-1.8-5.9c0-2.6,0.7-4.7,2-6.2c1.3-1.5,3.2-2.3,5.4-2.3 c1.9,0,3.5,0.7,4.6,2.1c1.2,1.4,1.8,3.2,1.8,5.4v0.8h-9.2c0.2,1.6,0.9,2.8,2.1,3.6c1.2,0.8,2.5,1.2,3.9,1.2c1.5,0,2.9-0.3,4.1-1 L43,18.9z M38.2,12.1h5.1c-0.1-1.4-0.6-2.5-1.5-3.3s-2-1.2-3.3-1.2c-1.5,0-2.7,0.5-3.5,1.5S38.1,10.9,38.2,12.1z"/>
          <path d="M48.8,4.5h3.9v16.1h-3.9V4.5z"/>
          <path d="M66.4,18.9L66.4,18.9c-1.3,1.4-2.9,2.1-4.8,2.1c-2.2,0-3.9-0.8-5.1-2.3s-1.8-3.5-1.8-5.9c0-2.6,0.7-4.7,2-6.2c1.3-1.5,3.2-2.3,5.4-2.3 c1.9,0,3.5,0.7,4.6,2.1c1.2,1.4,1.8,3.2,1.8,5.4v0.8h-9.2c0.2,1.6,0.9,2.8,2.1,3.6c1.2,0.8,2.5,1.2,3.9,1.2c1.5,0,2.9-0.3,4.1-1 L66.4,18.9z M61.6,12.1h5.1c-0.1-1.4-0.6-2.5-1.5-3.3s-2-1.2-3.3-1.2c-1.5,0-2.7,0.5-3.5,1.5S61.5,10.9,61.6,12.1z"/>
          <path d="M78,13.4c0-2-0.5-3.6-1.6-4.9c-1.1-1.3-2.6-1.9-4.5-1.9c-1.7,0-3.1,0.5-4.2,1.5s-1.6,2.4-1.6,4.1v7.2h-3.9V7h3.6l0.2,2.2h0.1 c0.8-1.7,2.4-2.6,4.7-2.6c1.8,0,3.3,0.6,4.4,1.8c1.1,1.2,1.7,2.9,1.7,5.1v8.1h-3.9V13.4z"/>
          <path d="M85.4,14.6c0,2.9,1.2,4.3,3.6,4.3c2.4,0,3.6-1.4,3.6-4.3V0h4v14.8c0,4.8-2.6,7.2-7.6,7.2s-7.6-2.4-7.6-7.2V0h4V14.6z"/>
          <path fill="${THEME.amazonOrange}" d="M96.3,10.5c-5,0-9,2.6-9,7.2c0,3,1.8,4.5,4.3,4.5c1.9,0,3-1,3.8-2.3h0.1v1.9h3.7V0.7h-3.7v10.3h-0.1 c-0.8-1.5-2.2-2.3-4.1-2.3c-2,0-3.3,1-3.3,2.8c0,1.5,1,2.4,2.7,2.4c1.9,0,2.8-1,2.8-3.1V10.5z"/>
          <path fill="${THEME.amazonOrange}" d="M94.3,23.3C94.3,23.3,94.3,23.3,94.3,23.3c-2.1-1-3.9-2.5-5.4-4.6c-0.9-1.3-1.5-2.7-1.8-4.1c-0.3-1.4-0.3-2.9-0.1-4.3 c0.3-1.7,0.9-3.4,1.8-4.9c0,0,0,0,0,0c0.1-0.1,0.1-0.2,0.2-0.3c0.8-1.1,1.8-2,3-2.8c0.1,0,0.1-0.1,0.2-0.1C93,6.1,94,6,95,6 c0.7,0,1.5,0.1,2.2,0.4c0.1,0,0.1,0.1,0.2,0.1c4.1,1.6,6.3,5.1,6.3,9.2c0,0.2,0,0.3,0,0.5c-0.2,4.6-3,8.3-7.5,9.4 C95.9,25.7,95.1,25.8,94.3,23.3C94.3,23.3,94.3,23.3,94.3,23.3z M95,8.8c-2.9,0-5.2,2.4-5.2,5.5c0,3,2.3,5.5,5.2,5.5 c2.9,0,5.2-2.4,5.2-5.5C100.2,11.3,97.9,8.8,95,8.8z"/>
        </svg>`}
        fill={THEME.text}
        height={80}
      />
      <Txt ref={philosophyText1} {...textStyle} y={150} opacity={0} text="This is how Amazon sees invention."/>
      <Layout ref={philosophyText2} layout opacity={0} y={50}>
        <Txt {...textStyle} fontSize={96} text="You must "/>
        <Txt ref={failText} {...textStyle} fontSize={96} text="FAIL" fill={THEME.failure}/>
        <Txt {...textStyle} fontSize={96} text=" to invent."/>
      </Layout>
    </>
  );

  yield* amazonLogo().opacity(1, 0.5);
  yield* waitFor(1.5);
  yield* philosophyText1().opacity(1, 0.5);
  yield* waitFor(1);
  yield* all(
    philosophyText1().position.y(0, 0.5),
    philosophyText1().opacity(0, 0.5)
  );
  philosophyText1().remove();

  yield* philosophyText2().opacity(1, 0.5);
  yield* failText().shake(new Vector2(15,0), 0.3);
  yield* waitFor(1.5);
  yield* all(
    philosophyText2().opacity(0, 0.5),
    amazonLogo().opacity(0, 0.5),
  );
  philosophyText2().remove();
  amazonLogo().remove();


  // SCENE 3: The Fire Phone Failure (00:15 - 00:38)
  const title = createRef<Txt>();
  const phone = createRef<Rect>();
  const disasterText = createRef<Txt>();
  const lossText = createRef<Txt>();
  const stockChart = createRef<Line>();
  const stockLabel = createRef<Txt>();

  view.add(
    <>
      <Txt ref={title} {...textStyle} text="The Amazon Fire Phone" y={-450} opacity={0} />
      <Phone ref={phone} size={200} />
      <Txt
        ref={disasterText}
        {...textStyle}
        fontSize={150}
        fill={THEME.failure}
        text="DISASTER"
        opacity={0}
        rotation={-10}
      />
      <Txt
        ref={lossText}
        {...textStyle}
        fontSize={140}
        fill={THEME.failure}
        opacity={0}
        y={200}
      />
      <Line
        ref={stockChart}
        points={[[-600, 100], [-300, -50], [0, 50], [300, 200], [300, 200]]}
        stroke={THEME.highlight}
        lineWidth={10}
        end={0}
        opacity={0}
      />
      <Txt
        ref={stockLabel}
        {...textStyle}
        fontSize={80}
        fill={THEME.failure}
        text="-8%"
        opacity={0}
        position={[450, 300]}
      />
    </>
  );

  phone().scale(0);
  yield* all(
    title().opacity(1, 0.5),
    phone().scale(1, 0.5, easeOutCubic)
  );
  yield* waitFor(3); // spending millions...
  
  yield* all(
    disasterText().opacity(1, 0.1),
    disasterText().scale(1.2, 0.2),
    phone().shake(new Vector2(20,20), 0.3)
  );
  yield* waitFor(0.5);
  yield* disasterText().opacity(0, 0.3);
  disasterText().remove();
  yield* waitFor(0.5);

  const phoneClones: Node[] = [];
  for (let i = 0; i < 50; i++) {
    const clone = phone().clone();
    phoneClones.push(clone);
    view.add(clone);
    clone.position([
      Math.random() * 1600 - 800,
      Math.random() * 800 - 400
    ]);
    clone.opacity(0);
  }
  
  yield* sequence(
    0.02,
    ...phoneClones.map(c => c.opacity(0.3, 0.2))
  );
  yield* waitFor(0.5);
  
  yield* all(
    ...phoneClones.map(c => c.opacity(0, 0.5)),
    phone().position.y(200, 0.5)
  );
  phoneClones.forEach(c => c.remove());

  yield* all(
    lossText().opacity(1, 0.5),
    lossText().tween(2, v => {
      lossText().text(`-$${Math.round(linear(v, 0, 170))} Million`);
    })
  );
  yield* waitFor(1);

  yield* all(
    phone().opacity(0, 0.5),
    lossText().opacity(0, 0.5),
    title().opacity(0, 0.5)
  );
  phone().remove();
  lossText().remove();
  title().remove();

  yield* stockChart().opacity(1, 0.3);
  yield* stockChart().end(0.8, 1);
  yield* all(
    stockChart().points(
      [[-600, 100], [-300, -50], [0, 50], [300, -100], [600, -50]],
      1,
    ),
    stockChart().stroke(THEME.failure, 1),
    stockLabel().opacity(1, 0.5)
  );
  yield* waitFor(2);
  yield* all(
    stockChart().opacity(0, 0.5),
    stockLabel().opacity(0, 0.5)
  );
  stockChart().remove();
  stockLabel().remove();


  // SCENE 4: The Turnaround (00:38 - 01:03)
  const transitionLine = createRef<Line>();
  const storyText = createRef<Txt>();
  const failedPhone = createRef<Rect>();
  const echoDevice = createRef<Layout>();
  const successTitle = createRef<Txt>();
  const marketShareBar = createRef<Rect>();
  const costOfEntry = createRef<Layout>();
  const oldLossText = createRef<Txt>();

  view.add(
    <>
      <Line ref={transitionLine} points={[[-960, 0],[ -960, 0]]} lineWidth={20} stroke={THEME.amazonOrange} end={0}/>
      <Txt ref={storyText} {...textStyle} opacity={0} text="But the story doesn't end there..."/>
      <Phone ref={failedPhone} size={200} opacity={0}/>
      <Layout ref={echoDevice} opacity={0} scale={1.2}>
        <Rect width={150} height={400} fill={THEME.light_neutral} radius={30}/>
        <Circle width={130} height={130} y={-200+25} fill={THEME.bg} />
        <Txt {...textStyle} text="Echo" fontSize={60} y={250}/>
      </Layout>
      <Txt ref={successTitle} {...textStyle} fontSize={120} text="MASSIVE SUCCESS" fill={THEME.success} opacity={0} />
      <Layout opacity={0} ref={costOfEntry} y={150}>
        <Txt ref={oldLossText} {...textStyle} text="-$170 Million" fill={THEME.failure} />
        <Line points={[[-350,0], [350,0]]} stroke={THEME.text} lineWidth={8} end={0}/>
        <Txt {...textStyle} text="Cost of Entry" y={100} fill={THEME.highlight} />
      </Layout>
    </>
  );

  yield* all(
    transitionLine().end(1, 0.3),
    transitionLine().points([[-960,0], [960,0]], 0.3)
  );
  yield* storyText().opacity(1, 0.4);
  yield* waitFor(1);
  yield* all(
    storyText().opacity(0, 0.4),
    transitionLine().opacity(0, 0.4)
  );
  storyText().remove();
  transitionLine().remove();
  
  yield* failedPhone().opacity(1, 0.5);
  // add a crack
  failedPhone().add(<Line points={[[-50, -150], [0,-50], [50, -100], [0, 50]]} stroke={THEME.failure} lineWidth={6}/>)
  yield* waitFor(2);

  yield* all(
    failedPhone().position([-400,0], 1),
    failedPhone().scale(0.8, 1),
    echoDevice().position([400,0], 1),
    echoDevice().opacity(1, 1),
  );
  yield* waitFor(3);

  yield* all(
    failedPhone().opacity(0, 0.5),
    echoDevice().opacity(0, 0.5),
  );
  failedPhone().remove();
  echoDevice().remove();

  yield* successTitle().opacity(1, 0.5);
  yield* waitFor(1);

  const marketShareLayout = createRef<Layout>();
  view.add(
    <Layout ref={marketShareLayout} y={150} opacity={0}>
      <Rect width={800} height={100} fill={THEME.neutral} radius={50}>
        <Rect ref={marketShareBar} width={0} height={100} fill={THEME.highlight} radius={50} offsetX={-1}/>
      </Rect>
      <Txt {...textStyle} text=">60% Market Share" y={120}/>
    </Layout>
  )

  yield* all(
    successTitle().position.y(-150, 0.5),
    marketShareLayout().opacity(1, 0.5)
  );

  yield* marketShareBar().width(800 * 0.6, 1.5);
  yield* waitFor(1.5);

  yield* all(
    successTitle().opacity(0, 0.5),
    marketShareLayout().opacity(0, 0.5),
  );
  successTitle().remove();
  marketShareLayout().remove();

  yield* costOfEntry().opacity(1, 0.5);
  yield* costOfEntry().children()[1].as<Line>().end(1, 0.5);
  yield* waitFor(3);

  yield* costOfEntry().opacity(0, 0.5);
  costOfEntry().remove();


  // SCENE 5: The Final Philosophy (01:03 - 01:09)
  const finalQuote = createRef<Txt>();
  yield view.add(
    <Txt
      ref={finalQuote}
      {...textStyle}
      fontSize={80}
      textAlign={'center'}
      lineHeight={120}
      opacity={0}
    >
      <Txt fill={THEME.failure}>If you aren't FAILING,</Txt>
      {'\n'}you aren't experimenting enough
      {'\n'}to find the <Txt fill={THEME.amazonOrange}>NEXT BIG THING</Txt>.
    </Txt>,
  );

  yield* finalQuote().opacity(1, 1);
  yield* waitFor(5);
  yield* finalQuote().opacity(0, 1);
});
