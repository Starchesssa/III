
import {
  makeScene2D,
  Circle,
  Rect,
  Txt,
  Layout,
  Line,
  Node,
  Path,
} from '@motion-canvas/2d';
import {
  createRef,
  all,
  chain,
  waitFor,
  waitUntil,
  linear,
  easeInOutCubic,
  easeOutCubic,
  easeInCubic,
  Vector2,
} from '@motion-canvas/core';

// --- Reusable Components and Theming ---
const THEME = {
  bg: '#141414',
  text: '#E0E0E0',
  success: '#42A5F5',
  failure: '#EF5350',
  highlight: '#FFCA28',
  accent: '#00D4C9',
};

const GlowRect = (props: any) => (
  <Rect shadowOffset={[0, 0]} shadowBlur={20} shadowColor={props.fill} {...props} />
);

const GlowCircle = (props: any) => (
  <Circle shadowOffset={[0, 0]} shadowBlur={20} shadowColor={props.fill} {...props} />
);

// --- Main Animation Scene ---
export default makeScene2D(function* (view) {
  // Scene setup
  view.fill(THEME.bg);
  view.fontFamily('Arial, sans-serif');
  view.fontWeight(600);
  view.fontSize(48);

  // [00:00] 10 Tries, 9 Failures, 1 Success
  yield* waitUntil(0.5);
  const items: Rect[] = [];
  const itemContainer = createRef<Layout>();
  view.add(
    <Layout ref={itemContainer} layout gap={20} opacity={0} />,
  );

  for (let i = 0; i < 10; i++) {
    const ref = createRef<Rect>();
    items.push(ref());
    itemContainer().add(
      <Rect ref={ref} width={80} height={80} fill={THEME.text} radius={10} />,
    );
  }
  yield* all(itemContainer().opacity(1, 0.5), itemContainer().y(0, 0.5));

  yield* waitUntil(2.8);
  for (let i = 0; i < 9; i++) {
    yield* items[i].fill(THEME.failure, 0.15);
  }

  yield* waitUntil(4.2);
  const successItem = items[9];
  yield* all(
    successItem.fill(THEME.highlight, 0.3),
    successItem.scale(1.2, 0.3).to(1, 0.3)
  );

  // [00:06] Visualizing the reward vs. cost
  yield* waitUntil(6);
  const failureCostBar = createRef<Rect>();
  const successRewardBar = createRef<GlowRect>();
  yield* all(
    view.zoom(0.8, 1),
    itemContainer().y(-200, 1),
    ...items.map(item => item.scale(0, 0.5, easeInCubic)),
  );
  itemContainer().remove();

  view.add(
    <Layout layout direction={'column'} gap={40} opacity={0}>
      <Layout alignItems={'center'}>
        <Txt text={'FAILURES COST'} fill={THEME.failure} opacity={0.7} fontSize={40} marginRight={20}/>
        <Rect ref={failureCostBar} height={50} width={0} fill={THEME.failure} radius={10}/>
      </Layout>
      <Layout alignItems={'center'}>
        <Txt text={'SUCCESS REWARD'} fill={THEME.highlight} fontSize={40} marginRight={20}/>
        <GlowRect ref={successRewardBar} height={50} width={0} fill={THEME.highlight} radius={10}/>
      </Layout>
    </Layout>
  );

  yield* view.children()[0].opacity(1, 0.5);
  yield* all(
    failureCostBar().width(90, 0.5),
    successRewardBar().width(900, 2, easeOutCubic),
    view.x(-400, 2, easeOutCubic)
  );

  // [00:10] Amazon's Philosophy
  yield* waitUntil(10);
  yield* all(view.opacity(0, 0.5), view.x(0, 0.5), view.zoom(1, 0.5));
  view.removeChildren();
  view.opacity(1);

  const lightbulbPath = createRef<Path>();
  const pathData = 'M 0 -200 L 0 -50 C 0 0, -30 0, -30 30 C -30 60, 30 60, 30 30 C 30 0, 0 0, 0 -50 M -20 70 L 20 70 M -20 85 L 20 85';
  view.add(
    <Path ref={lightbulbPath} data={pathData} stroke={THEME.highlight} lineWidth={8} lineCap={'round'} scale={2} opacity={0} shadowColor={THEME.highlight}/>
  );
  yield* all(
    lightbulbPath().opacity(1, 0.5),
    lightbulbPath().shadowBlur(30, 1.5).to(10, 1).to(30, 1)
  );

  // [00:15] Amazon Fire Phone Failure
  yield* waitUntil(15.5);
  yield* all(view.opacity(0, 0.5), view.zoom(1.2, 0.5));
  view.removeChildren();
  view.opacity(1).zoom(1);

  const phone = createRef<Rect>();
  const phoneContainer = createRef<Layout>();
  view.add(
    <Layout ref={phoneContainer} layout direction="column" gap={20} opacity={0}>
        <Txt text={'Fire Phone'} fill={THEME.text} />
        <Rect ref={phone} width={200} height={400} radius={30} stroke={THEME.text} lineWidth={8}>
            <Rect width={160} height={300} fill={'#222'} stroke={THEME.text} lineWidth={4} radius={10}/>
        </Rect>
    </Layout>
  );

  yield* phoneContainer().opacity(1, 0.5);
  
  yield* waitUntil(21.5);
  const crack = createRef<Line>();
  phone().add(
      <Line ref={crack} points={[[-80, -150], [0, -50], [-50, 100], [80, 200]]} stroke={THEME.failure} lineWidth={8} end={0} lineCap="round" />
  );
  yield* all(crack().end(1, 0.5), view.shake({x: 10, y: 10}, 0.5));

  // [00:27] Financial Loss and Stock Drop
  yield* waitUntil(27.5);
  const lossText = createRef<Txt>();
  yield* all(phoneContainer().y(-200, 1), view.zoom(1.2, 1));
  view.add(
    <Txt ref={lossText} text={'-$170M'} fill={THEME.failure} fontSize={100} y={100} opacity={0} fontWeight={700} />
  );
  yield* lossText().opacity(1, 0.5);

  yield* waitUntil(32.5);
  const stockGraph = createRef<Line>();
  const stockText = createRef<Txt>();
  yield* all(phoneContainer().position([-400, -200], 1), lossText().position([400, -200], 1));
  const stockNode = createRef<Node>();
  view.add(
      <Node ref={stockNode} y={150} opacity={0}>
          <Txt text={'AMZN Stock'} fill={THEME.text} y={-100} fontSize={40}/>
          <Line ref={stockGraph} points={[[-300, 0], [-150, -50], [0, -20], [50, -80], [200, 20], [300, -150]]} stroke={THEME.failure} lineWidth={8} end={0} lineCap="round"/>
          <Txt ref={stockText} text={'-8%'} fill={THEME.failure} position={[350, -150]} opacity={0} />
      </Node>
  );
  yield* all(
    stockNode().opacity(1, 0.5),
    stockGraph().end(1, 1),
    chain(waitFor(0.8), stockText().opacity(1, 0.3))
  );

  // [00:38] The story transitions
  yield* waitUntil(38.5);
  yield* all(view.opacity(0, 0.7), view.zoom(0.8, 0.7), view.rotation(30, 0.7));
  view.removeChildren();
  view.opacity(1).zoom(1).rotation(0);

  yield* waitUntil(40.5);
  const techOrbs: Circle[] = [];
  const crackedPhoneRef = createRef<Node>();
  view.add(
    <Node ref={crackedPhoneRef} scale={0.5}>
        <Rect width={200} height={400} radius={30} stroke={THEME.text} lineWidth={8} opacity={0.5}/>
        <Line points={[[-80, -150], [0, -50], [-50, 100], [80, 200]]} stroke={THEME.failure} lineWidth={8} lineCap="round"/>
    </Node>
  );
  
  const orbContainer = createRef<Node>();
  view.add(<Node ref={orbContainer} />);
  const animations = [];
  for (let i = 0; i < 5; i++) {
    const orb = createRef<GlowCircle>();
    techOrbs.push(orb());
    orbContainer().add(<GlowCircle ref={orb} size={20} fill={THEME.accent} />);
    animations.push(orb().position(Vector2.fromDegrees(i * (360/5) + 30).scale(300), 1.5, easeOutCubic));
  }
  yield* all(crackedPhoneRef().scale(0, 1), ...animations);

  // [00:46] The birth of Amazon Echo
  yield* waitUntil(46);
  const alexaRing = createRef<Circle>();
  const echoContainer = createRef<Layout>();
  yield* all(
    ...techOrbs.map(orb => orb.position(new Vector2(0, -150), 1, easeInCubic)),
    view.zoom(1.5, 1),
    view.rotation(360, 2)
  );
  orbContainer().remove();

  view.add(
      <Layout ref={echoContainer} layout direction="column" gap={20} opacity={0}>
          <Txt text={'Amazon Echo'} fill={THEME.text} />
          <Rect width={150} height={300} fill={THEME.text} radius={75}>
              <Circle ref={alexaRing} size={130} stroke={THEME.accent} lineWidth={10} y={-140} endAngle={0} shadowColor={THEME.accent}/>
          </Rect>
      </Layout>
  );
  yield* all(
    echoContainer().opacity(1, 0.5),
    alexaRing().endAngle(360, 1),
    alexaRing().shadowBlur(30, 1.5, linear).to(0, 1.5, linear).to(30, 1.5, linear).to(0, 1.5, linear)
  );

  // [00:51] Market Domination
  yield* waitUntil(51.5);
  yield* all(echoContainer().y(-250, 1), view.zoom(1, 1));

  const pieChart = createRef<Node>();
  const slice60 = createRef<Path>();
  const pctText = createRef<Txt>();
  view.add(
      <Node ref={pieChart} y={150} opacity={0}>
          <Txt text={'Market Share'} fill={THEME.text} y={-220} fontSize={40}/>
          <Path fill={THEME.failure} data={'M 0 0 L 150 0 A 150 150 0 1 1 -116.3 95.1 Z'}/>
          <Path ref={slice60} fill={THEME.accent} data={'M 0 0'}/>
          <Txt ref={pctText} text={'0%'} fill={THEME.bg} fontSize={60} fontWeight={700} />
      </Node>
  );
  yield* pieChart().opacity(1, 0.5);
  yield* slice60().tween(2, value => {
      const angle = 360 * 0.6 * easeOutCubic(value);
      const x = 150 * Math.cos(angle * (Math.PI / 180));
      const y = 150 * Math.sin(angle * (Math.PI / 180));
      slice60().data(`M 0 0 L 150 0 A 150 150 0 ${angle <= 180 ? 0 : 1} 1 ${x} ${y} Z`);
      pctText().text(`${Math.round(60 * easeOutCubic(value))}%`);
      pctText().position(Vector2.fromDegrees(angle / 2).scale(80));
  });

  // [00:57] Failure as the Cost of Entry
  yield* waitUntil(57);
  yield* all(view.opacity(0, 0.7), view.scale(1.2, 0.7));
  view.removeChildren();
  view.opacity(1).scale(1);

  const finalRewardBar = createRef<GlowRect>();
  const finalContainer = createRef<Layout>();
  view.add(
      <Layout ref={finalContainer} layout direction="column" gap={30} x={-600}>
          <Layout layout direction="row" alignItems="center">
              <Txt text={"Failure Cost\n(-$170M)"} fill={THEME.failure} fontSize={36} />
              <Rect width={100} height={40} fill={THEME.failure} marginLeft={20} radius={10}/>
          </Layout>
          <Layout layout direction="row" alignItems="center">
              <Txt text={"Invention Reward\n(Multi-Billion $)"} fill={THEME.accent} fontSize={36} />
              <GlowRect ref={finalRewardBar} width={0} height={80} fill={THEME.accent} marginLeft={20} radius={10}/>
          </Layout>
      </Layout>
  );
  yield* all(
    finalRewardBar().width(1200, 2, easeOutCubic),
    finalContainer().x(0, 2, easeOutCubic)
  );

  // [01:04] The Final Message: Experimentation
  yield* waitUntil(64);
  yield* all(view.opacity(0, 0.7), view.rotation(-20, 0.7), view.zoom(1.5, 0.7));
  view.removeChildren();
  view.opacity(1).rotation(0).zoom(1);
  
  const startPoint = new Vector2(-800, 0);
  const paths = [
    { points: [startPoint, new Vector2(-500, -200), new Vector2(-300, -250)], color: THEME.failure, isSuccess: false },
    { points: [startPoint, new Vector2(-400, 200), new Vector2(-200, 250)], color: THEME.failure, isSuccess: false },
    { points: [startPoint, new Vector2(-600, 100), new Vector2(-400, 50), new Vector2(-200, 150)], color: THEME.failure, isSuccess: false },
    { points: [startPoint, new Vector2(-500, 0), new Vector2(-100, 0), new Vector2(300, -100), new Vector2(800, 0)], color: THEME.success, isSuccess: true }
  ];

  function* drawPath({points, color, isSuccess}: (typeof paths)[0]) {
    const path = createRef<Path>();
    view.add(
        <Path ref={path} stroke={color} lineWidth={isSuccess ? 12 : 8} lineCap={'round'} shadowColor={color} shadowBlur={isSuccess ? 20 : 0} />
    );
    yield* path().data(
      points.reduce((d, p) => `${d} L ${p.x} ${p.y}`, `M ${points[0].x} ${points[0].y}`),
      1.5,
      easeInOutCubic
    );
  }

  yield* all(
    drawPath(paths[0]),
    drawPath(paths[1]),
    drawPath(paths[2]),
    chain(waitFor(0.5), drawPath(paths[3]))
  );
  
  yield* waitFor(3);
});
