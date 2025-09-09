
import {makeScene2D} from '@motion-canvas/2d';
import {
  Circle,
  Icon,
  Layout,
  Line,
  Node,
  Rect,
  Txt,
  View2D,
} from '@motion-canvas/2d/lib/components';
import {all, chain, delay, loop, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, useRandom} from '@motion-canvas/core/lib/utils';
import {
  Color,
  Vector2,
  Vector2d,
} from '@motion-canvas/core/lib/types';
import {easeInOutCubic, linear} from '@motion-canvas/core/lib/tweening';
import {ICONS} from '../components/Icons';

// --- Configuration ---
const THEME = {
  bg: '#111111',
  text: '#e0e0e0',
  primary: '#FF9900', // Amazon Orange
  secondary: '#00A8E1', // Alexa Blue
  success: '#2ECC71',
  fail: '#E74C3C',
};

export default makeScene2D(function* (view) {
  view.fill(THEME.bg);
  const camera = createRef<View2D>();
  view.add(<View2D ref={camera} />);
  
  const random = useRandom();

  // === 0:00 - Intro: 10 Tries, 1 Big Win ===
  const triesContainer = createRef<Node>();
  const tries: Circle[] = [];
  camera().add(
    <Node ref={triesContainer} y={-100} opacity={0}>
      {Array.from({length: 10}).map((_, i) => (
        <Circle
          ref={node => tries.push(node)}
          x={-450 + i * 100}
          width={80}
          height={80}
          fill={THEME.text}
          opacity={0.6}
        />
      ))}
    </Node>,
  );

  yield* triesContainer().opacity(1, 0.5);
  yield* camera().position.y(0, 1);
  yield* waitFor(0.5); // "Imagine you try something 10 times"

  yield* all(
    ...tries.slice(0, 9).map((circle, i) =>
      delay(i * 0.1, circle.fill(THEME.fail, 0.3)),
    ),
  ); // "Nine times you fail..."
  yield* waitFor(0.5);

  const successTry = tries[9];
  yield* all(
    ...tries.slice(0, 9).map(circle => circle.opacity(0.1, 0.5)),
    successTry.fill(THEME.success, 0.5),
    successTry.scale(1.5, 0.5),
    camera().focalPoint(successTry.position(), 1),
    camera().zoom(1.5, 1),
  ); // "...but the one time you succeed"

  const rewardText = createRef<Txt>();
  successTry.add(
    <Txt ref={rewardText} text="100x" scale={0} fill={THEME.bg} fontWeight={700} />,
  );

  yield* all(
    rewardText().scale(0.8, 0.5),
    waitFor(0.8), // "...you earn 100 times more"
  );
  
  yield* all(
    camera().zoom(1, 1),
    camera().position([0, 0], 1),
    camera().focalPoint([0, 0], 1),
    triesContainer().opacity(0, 1),
  );


  // === 0:10 - Amazon's Philosophy ===
  const amazonLogo = createRef<Txt>();
  const philosophyText = createRef<Txt>();
  yield* camera().add(
    <Txt
      ref={amazonLogo}
      text="amazon"
      fontFamily="Poppins"
      fontWeight={700}
      fontSize={80}
      fill={THEME.primary}
      opacity={0}
      y={-50}
    />,
  );
  yield* camera().add(
    <Txt
      ref={philosophyText}
      text="You must fail to invent."
      fontFamily="Poppins"
      fontSize={48}
      fill={THEME.text}
      opacity={0}
      y={50}
    />,
  );

  yield* all(amazonLogo().opacity(1, 0.5), waitFor(1)); // "This is how Amazon sees invention"
  yield* all(philosophyText().opacity(1, 0.5), waitFor(1)); // "You must fail to invent"
  
  yield* all(
    amazonLogo().opacity(0, 0.5),
    philosophyText().opacity(0, 0.5),
    waitFor(0.5)
  );
  amazonLogo().remove();
  philosophyText().remove();


  // === 0:15 - The Fire Phone Failure ===
  const firePhone = createRef<Node>();
  const phoneIcon = createRef<Icon>();
  const phoneTitle = createRef<Txt>();
  const phoneDate = createRef<Txt>();
  const crackLines: Line[] = [];

  camera().add(
    <Node ref={firePhone} scale={0}>
      <Icon
        ref={phoneIcon}
        icon={ICONS.PHONE}
        size={300}
        fill={THEME.text}
      />
      <Txt
        ref={phoneTitle}
        text="Fire Phone"
        y={-220}
        fontSize={60}
        fontWeight={700}
        fill={THEME.text}
      />
      <Txt
        ref={phoneDate}
        text="2014"
        y={220}
        fontSize={40}
        fill={THEME.primary}
      />
      {Array.from({length: 3}).map(() => (
        <Line
          ref={node => crackLines.push(node)}
          stroke={THEME.fail}
          lineWidth={8}
          startArrow={false}
          endArrow={false}
          lineDash={[10, 10]}
          opacity={0}
        />
      ))}
    </Node>,
  );

  yield* all(
    firePhone().scale(1, 0.7, easeInOutCubic),
    camera().zoom(1.2, 1)
  ); // "Let's look at the Amazon Fire Phone"
  yield* waitFor(2); // "...Amazon launched it after spending millions."
  
  yield* phoneIcon().fill(THEME.fail, 0.5); // "The result was a disaster"

  crackLines[0].points([[-80, -120], [80, 100]]);
  crackLines[1].points([[0, -100], [70, -20]]);
  crackLines[2].points([[-60, 110], [40, 130]]);
  yield* all(...crackLines.map(line => line.opacity(1, 0.3)));


  // === 0:23 - Financial Loss ===
  const lossAmount = createRef<Txt>();
  const lossLabel = createRef<Txt>();

  yield* all(
    firePhone().position.x(-400, 1),
    camera().position.x(200, 1)
  );
  
  camera().add(
    <Txt
      ref={lossAmount}
      text="$170M"
      x={400} y={-50}
      fontSize={120} fontWeight={700}
      fill={THEME.fail}
      scale={0}
    />,
  );
  camera().add(
    <Txt
      ref={lossLabel}
      text="LOSS"
      x={400} y={50}
      fontSize={50} fontWeight={400}
      fill={THEME.text}
      opacity={0}
    />
  );
  
  yield* all(
    lossAmount().scale(1, 0.5),
    waitFor(0.2), // "report a loss of..."
  );
  yield* lossLabel().opacity(1, 0.3);
  yield* waitFor(2.5);

  // Stock price drop
  const stockChart = createRef<Line>();
  const stockDropText = createRef<Txt>();
  const points = [
    [0, 0], [100, -20], [200, 0], [300, -40], [400, -10],
    [500, -150]
  ];

  yield* all(
    firePhone().opacity(0, 0.5),
    lossAmount().opacity(0, 0.5),
    lossLabel().opacity(0, 0.5),
    camera().position.x(0, 1)
  );
  firePhone().remove();
  lossAmount().remove();
  lossLabel().remove();

  camera().add(<Line
      ref={stockChart}
      points={points}
      stroke={THEME.fail}
      lineWidth={10}
      end={0}
      x={-250}
  />);
  camera().add(<Txt
      ref={stockDropText}
      text="-8%"
      fill={THEME.fail}
      fontSize={80}
      fontWeight={700}
      x={350}
      opacity={0}
  />);

  yield* all(
    stockChart().end(1, 1.5, linear), // "Amazon's stock price dropped"
    delay(1, stockDropText().opacity(1, 0.5))
  );
  yield* waitFor(2); // "public and financial failure"


  // === 0:38 - The Pivot & Transformation ===
  yield* all(
      stockChart().opacity(0, 0.5),
      stockDropText().opacity(0, 0.5),
      camera().zoom(1, 1)
  );
  stockChart().remove();
  stockDropText().remove();

  const failedPhoneIcon = createRef<Icon>();
  const techBits: Circle[] = [];
  const echoIcon = createRef<Icon>();

  camera().add(<Icon ref={failedPhoneIcon} icon={ICONS.PHONE} size={200} fill={THEME.fail} x={-500} />);
  camera().add(<Icon ref={echoIcon} icon={ICONS.SPEAKER} size={220} fill={THEME.secondary} x={500} opacity={0} />);

  yield* waitFor(1.5); // "The story doesn't end there..."

  for (let i = 0; i < 50; i++) {
    const bit = <Circle width={15} height={15} fill={THEME.primary} x={-500} />;
    camera().add(bit);
    techBits.push(bit);
  }

  yield* all(
    ...techBits.map(bit =>
      bit.position.x(random.nextFloat(-100, 100), 1.5, easeInOutCubic)
      .and(bit.position.y(random.nextFloat(-200, 200), 1.5, easeInOutCubic))
    )
  ); // "...small team and the technology..."

  yield* all(
    failedPhoneIcon().opacity(0, 0.5),
    echoIcon().opacity(1, 1),
    ...techBits.map(bit =>
      bit.position(echoIcon().position(), 1, easeInOutCubic)
    )
  ); // "...were used to create something new"

  techBits.forEach(bit => bit.remove());
  failedPhoneIcon().remove();

  const alexaText = createRef<Txt>();
  echoIcon().add(
    <Txt
      ref={alexaText}
      text="Powered by Alexa"
      fill={THEME.secondary}
      fontSize={32}
      y={180}
      opacity={0}
    />
  );
  yield* alexaText().opacity(1, 0.5); // "The Amazon Echo, powered by Alexa"


  // === 0:49 - Echo's Massive Success ===
  const marketShareChart = createRef<Icon>();
  const marketShareText = createRef<Txt>();

  yield* all(
    echoIcon().position.x(-400, 1),
    alexaText().opacity(0, 1),
    camera().position.x(200, 1)
  );
  alexaText().remove();
  
  camera().add(<Icon ref={marketShareChart} icon={ICONS.CHART} size={250} fill={THEME.success} x={400} scale={0}/>);
  marketShareChart().add(<Txt ref={marketShareText} text=">60%" fill={THEME.bg} fontSize={50} fontWeight={700} opacity={0}/>);

  yield* marketShareChart().scale(1, 0.7);
  yield* waitFor(0.5); // "Echo was a massive success"
  yield* marketShareText().opacity(1, 0.5); // "captured over 60% of the smart speaker market"
  yield* waitFor(2);


  // === 0:56 - Reframing the Loss ===
  yield* all(
    echoIcon().opacity(0, 0.5),
    marketShareChart().opacity(0, 0.5),
    camera().position.x(0, 1)
  );
  echoIcon().remove();
  marketShareChart().remove();

  const oldLoss = createRef<Txt>();
  const costOfEntry = createRef<Txt>();
  const newBusiness = createRef<Txt>();

  camera().add(<Txt ref={oldLoss} text="-$170M Loss" fill={THEME.fail} fontSize={80} />);
  yield* waitFor(1.5); // "That $170 million dollar loss from the phone..."
  
  yield* oldLoss().scale(0, 0.5, easeInOutCubic);
  oldLoss().remove();

  camera().add(<Txt ref={costOfEntry} text="Cost of Entry" fill={THEME.primary} fontSize={80} scale={0} />);
  yield* costOfEntry().scale(1, 0.5); // "...became the cost of entry"
  yield* waitFor(1.5);

  yield* costOfEntry().scale(0, 0.5, easeInOutCubic);
  costOfEntry().remove();

  camera().add(<Txt ref={newBusiness} text="Multi-Billion $ Business" fill={THEME.success} fontSize={90} fontWeight={700} scale={0} />);
  yield* newBusiness().scale(1, 0.7, easeInOutCubic); // "...for a multi-billion dollar business"
  yield* waitFor(2);


  // === 1:04 - Conclusion ===
  const finalText1 = createRef<Txt>();
  const finalText2 = createRef<Txt>();
  
  yield* all(
    newBusiness().opacity(0, 0.5),
    camera().zoom(0.8, 1)
  );
  newBusiness().remove();

  camera().add(<Txt ref={finalText1} text="If you aren't failing," y={-40} fill={THEME.text} fontSize={50} opacity={0}/>);
  camera().add(<Txt ref={finalText2} text="you aren't experimenting enough." y={40} fill={THEME.primary} fontSize={50} fontWeight={700} opacity={0}/>);

  yield* chain(
    finalText1().opacity(1, 0.5),
    waitFor(0.5)
  );
  yield* finalText2().opacity(1, 0.5); // "If you aren't failing, you aren't experimenting enough..."

  yield* waitFor(4); // Hold on final message
});


