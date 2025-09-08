
import {makeProject} from '@motion-canvas/core';
import {
  Circle,
  Gradient,
  Grid,
  Img,
  Layout,
  Line,
  Node,
  Rect,
  SVG,
  Txt,
  View2D,
} from '@motion-canvas/2d';
import {
  all,
  chain,
  createRef,
  createSignal,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  linear,
  loop,
  spring,
  tween,
  waitFor,
} from '@motion-canvas/core/lib/flow';
import {Vector2} from '@motion-canvas/core/lib/types';
import {BBox, Spacing, Color} from '@motion-canvas/core/lib/types';

// Asset Imports (placeholders - will create shapes in code)
// It's better to create SVGs in code for this kind of project.

// --- CONFIG ---
const Colors = {
  BG: '#141414',
  TEXT: '#E0E0E0',
  AMAZON_ORANGE: '#FF9900',
  ALEXA_BLUE: '#34aadc',
  FAILURE_RED: '#E53E3E',
  SUCCESS_GREEN: '#48BB78',
  GRAY: '#A0AEC0',
};

const Fonts = {
  main: {
    family: 'Inter',
    size: 48,
    weight: 600,
    color: Colors.TEXT,
  },
  kinetic: {
    family: 'Inter',
    size: 72,
    weight: 800,
    color: Colors.TEXT,
  },
};

// --- SCENE ---
export default makeProject({
  scenes: [
    {
      name: 'AmazonInventionScene',
      size: [1920, 1080],
      scene: function* (view: View2D) {
        view.fill(Colors.BG);

        // --- Refs for scene elements ---
        const camera = createRef<View2D>();
        view.add(<View2D ref={camera} clip width="100%" height="100%" />);

        // --- Reusable Kinetic Text Component ---
        function* KineticText(
          textRef: any,
          text: string,
          color = Colors.AMAZON_ORANGE,
          yPos = 0,
        ) {
          textRef().text(text).fill(color).position.y(yPos).opacity(0).scale(0.8);
          yield* all(
            textRef().opacity(1, 0.3),
            textRef().scale(1, 0.4, easeOutCubic),
          );
          yield* waitFor(0.5);
          yield* all(
            textRef().opacity(0, 0.3),
            textRef().scale(1.2, 0.4, easeInCubic),
          );
          textRef().position.y(1200); // move offscreen
        }

        // --- SENTENCE 1: Imagine you try something 10 times. Nine times you fail...
        const attemptsContainer = createRef<Node>();
        const attempts: Rect[] = [];
        const attemptSize = 80;
        const attemptGap = 40;
        const totalWidth = 10 * attemptSize + 9 * attemptGap;

        camera().add(
          <Node ref={attemptsContainer} y={-100}>
            {Array.from({length: 10}).map((_, i) => (
              <Rect
                ref={ref => attempts.push(ref)}
                width={attemptSize}
                height={attemptSize}
                x={i * (attemptSize + attemptGap) - totalWidth / 2 + attemptSize / 2}
                fill={Colors.GRAY}
                radius={10}
              />
            ))}
          </Node>,
        );

        const kineticTextRef = createRef<Txt>();
        camera().add(
          <Txt ref={kineticTextRef} {...Fonts.kinetic} y={150} opacity={0} />,
        );
        
        yield* camera().scene().camera.zoom(1.2, 0);
        yield* all(
          camera().scene().camera.zoom(1, 1),
          KineticText(kineticTextRef, '10 times'),
        );

        yield* waitFor(0.1);

        for (let i = 0; i < 9; i++) {
          yield* attempts[i].fill(Colors.FAILURE_RED, 0.1);
        }
        yield* KineticText(kineticTextRef, '9 times you fail');
        
        // --- SENTENCE 2: ...but the one time you succeed, you earn 100 times more...
        const successCube = attempts[9];
        const failureCost = createSignal(1);
        const successGain = createSignal(1);

        const failureCostIndicator = createRef<Rect>();
        const successGainIndicator = createRef<Rect>();
        
        camera().add(
          <Layout layout direction="column" gap={30} y={150} opacity={0}>
              <Txt text={"FAILURES' COST"} {...Fonts.main} fill={Colors.FAILURE_RED} />
              <Rect ref={failureCostIndicator} height={40} fill={Colors.FAILURE_RED} width={()=> 100 * failureCost()} />
          </Layout>
        );
        
        camera().add(
          <Layout layout direction="column" gap={30} y={300} opacity={0}>
              <Txt text={"SUCCESS'S REWARD"} {...Fonts.main} fill={Colors.SUCCESS_GREEN} />
              <Rect ref={successGainIndicator} height={40} fill={Colors.SUCCESS_GREEN} width={()=> 100 * successGain()} />
          </Layout>
        );

        yield* all(
            ...attempts.slice(0, 9).map(cube => cube.position.y(50, 0.5)),
            successCube.position.y(-50, 0.5),
            successCube.fill(Colors.SUCCESS_GREEN, 0.5),
            failureCostIndicator().parent().opacity(1, 0.5),
            successGainIndicator().parent().opacity(1, 0.5),
        )

        yield* all(
          successGain(100, 2, easeInOutCubic),
          successCube.scale(4, 2, easeInOutCubic),
          spring(camera().scene().camera.rotation, -5, 1, 0.5),
        );
        yield* waitFor(1.5);

        // --- SENTENCE 3: This is how Amazon sees invention.
        yield* all(
            attemptsContainer().opacity(0, 0.5),
            failureCostIndicator().parent().opacity(0, 0.5),
            successGainIndicator().parent().opacity(0, 0.5),
            spring(camera().scene().camera.rotation, 0, 1, 0.5),
            camera().scene().camera.zoom(1.5, 1)
        );
        
        const amazonLogoSVG = `
            <svg width="400" height="120" viewBox="0 0 400 120">
                <path d="M66.4,89.2c-5.9,0-10.3-1.6-13.2-4.9c-2.9-3.2-4.4-7.8-4.4-13.8V40.2h15.2v28.8c0,3.4,0.6,5.8,1.7,7.1s2.8,2,5,2c2.2,0,3.9-0.7,5-2s1.7-3.7,1.7-7.1V40.2h15.2v30.4c0,6-1.5,10.5-4.4,13.8C81.8,87.6,77.4,89.2,71.5,89.2H66.4z"/>
                <path d="M125.1,87.7V40.2h15.2v6.4h0.4c2.6-5.1,7.2-7.6,13.8-7.6c8.9,0,13.4,5.9,13.4,17.7v23.5H152.7v-22c0-4.6-1.1-7.6-3.4-9.1c-2.3-1.5-5.3-2.2-9-2.2c-4.9,0-8.8,1.7-11.7,5v28.3H125.1z"/>
                <path d="M211.5,87.7V66.2h-21.7v21.5h-15.2V40.2h15.2v20.2h21.7V40.2h15.2v47.5H211.5z"/>
                <path d="M259.6,89.2c-5.9,0-10.3-1.6-13.2-4.9c-2.9-3.2-4.4-7.8-4.4-13.8V40.2h15.2v28.8c0,3.4,0.6,5.8,1.7,7.1c1.1,1.3,2.8,2,5,2s3.9-0.7,5-2s1.7-3.7,1.7-7.1V40.2h15.2v30.4c0,6-1.5,10.5-4.4,13.8C269.8,87.6,265.4,89.2,259.6,89.2z"/>
                <path d="M309,87.7l-12-25.5h-0.4l-12,25.5h-16.2L282.4,36h19.5l14.1,51.8H309z"/>
                <path d="M367.6,45.9c-5.1-4.8-11.8-7.2-20.1-7.2c-12.7,0-22.3,4.4-28.8,13.3c-6.5,8.9-9.7,20.5-9.7,35c0,15.2,3.4,27.2,10.3,36c6.9,8.8,16.7,13.2,29.4,13.2c7.6,0,14.3-2.1,20.1-6.4c5.8-4.3,9.4-10.3,10.8-18.1h-15.6c-0.9,3.4-2.5,6-4.8,7.9c-2.3,1.9-5.1,2.8-8.5,2.8c-6.4,0-11.5-2.2-15.4-6.5c-3.9-4.3-5.8-10.5-5.8-18.4c0-7.8,1.9-14,5.8-18.4c3.9-4.4,8.9-6.6,15.4-6.6c3.6,0,6.5,0.8,8.8,2.5c2.3,1.7,3.8,4.2,4.4,7.5h15.9C377.9,56.5,372.7,50.7,367.6,45.9z"/>
            </svg>
        `;
        const amazonLogo = createRef<SVG>();
        camera().add(
          <SVG ref={amazonLogo} svg={amazonLogoSVG} scale={2} opacity={0} />,
        );
        yield* all(
            amazonLogo().opacity(1, 0.8),
            amazonLogo().scale(1.5, 0.8, easeOutCubic)
        );

        yield* KineticText(kineticTextRef, "Invention", Colors.TEXT);

        // --- SENTENCE 4: They believe you must fail to invent.
        const crack = createRef<Line>();
        amazonLogo().add(<Line ref={crack} points={[[-150, 40], [-100, -20], [-50, 50]]} stroke={Colors.BG} lineWidth={4} start={1} end={1}/>)
        yield* all(
            crack().end(0, 0.5, easeInCubic),
            KineticText(kineticTextRef, "Fail to invent")
        );
        
        // --- SENTENCE 5: Let's look at the Amazon Fire Phone.
        const phone = createRef<Node>();
        camera().add(
            <Node ref={phone} scale={0} opacity={0}>
                <Rect width={300} height={600} radius={30} fill={'#2D3748'} />
                <Rect width={270} height={480} radius={10} fill={'#1A202C'} />
                <Circle width={10} y={-270} fill={Colors.GRAY} />
            </Node>
        );

        yield* all(
            amazonLogo().position.y(-300, 1),
            amazonLogo().scale(0.8, 1),
            camera().scene().camera.zoom(1.2, 1),
            phone().opacity(1, 1),
            phone().scale(1, 1, easeOutCubic)
        );

        const firePhoneText = createRef<Txt>();
        camera().add(<Txt ref={firePhoneText} text={"Fire Phone"} {...Fonts.main} opacity={0} y={400}/>);
        yield* firePhoneText().opacity(1, 0.5);
        yield* waitFor(0.5);

        // --- SENTENCE 6: In 2014, Amazon launched it after spending millions.
        const yearText = createRef<Txt>();
        const moneyText = createRef<Txt>();
        camera().add(<Txt ref={yearText} text={"2014"} {...Fonts.kinetic} fill={Colors.AMAZON_ORANGE} opacity={0} scale={0.5} x={-400} />);
        camera().add(<Txt ref={moneyText} text={"MILLIONS $$"} {...Fonts.kinetic} fill={Colors.SUCCESS_GREEN} opacity={0} scale={0.5} x={400} />);
        
        yield* all(
            yearText().opacity(1, 0.4), yearText().scale(1, 0.4),
            moneyText().opacity(1, 0.4), moneyText().scale(1, 0.4),
        );
        yield* waitFor(1.5);
        
        // --- SENTENCE 7: The result was a disaster.
        const disasterText = createRef<Txt>();
        camera().add(<Txt ref={disasterText} text={"DISASTER"} {...Fonts.kinetic} fill={Colors.FAILURE_RED} scale={3} opacity={0} />);
        
        yield* all(
            yearText().opacity(0, 0.3),
            moneyText().opacity(0, 0.3),
            firePhoneText().opacity(0, 0.3),
            disasterText().opacity(1, 0.3),
            spring(camera().scene().camera.shake, {x:10, y:10}, 0.5, 0.2),
            phone().rotation(15, 0.5),
            phone().find<Rect>('Rect').fill(Colors.FAILURE_RED, 0.5)
        );
        yield* waitFor(1);

        // --- SENTENCE 8: They were left with so many unsold phones... loss of $170 million.
        yield* all(
            disasterText().opacity(0, 0.5),
            phone().opacity(0, 0.5),
            amazonLogo().opacity(0, 0.5),
            camera().scene().camera.zoom(0.5, 1.5),
            camera().scene().camera.position([0, -500], 1.5)
        );

        const phoneGrid = createRef<Grid>();
        const phoneCopies: Node[] = [];
        camera().add(
            <Grid ref={phoneGrid} spacing={150} width={4000} height={4000}>
            { Array.from({length: 20 * 20}).map(()=> (
                <Node ref={node => phoneCopies.push(node)} scale={0.8} opacity={0.5}>
                    <Rect width={300} height={600} radius={30} fill={'#4A5568'} />
                </Node>
            ))}
            </Grid>
        );

        const lossText = createRef<Txt>();
        const lossValue = createSignal(0);
        camera().add(<Txt ref={lossText} {...Fonts.kinetic} fill={Colors.FAILURE_RED} text={()=>`-$${lossValue().toFixed(0)} Million`} />);

        yield* all(
            loop(20, i => all(...phoneCopies.slice(i*20, (i+1)*20).map(p => p.opacity(0.5, 0.1)))),
            lossValue(170, 2, linear),
        );
        yield* waitFor(2);

        // --- SENTENCE 9: ...Amazon's stock price dropped by about 8%.
        const stockChart = createRef<Line>();
        const stockPath = [
            Vector2.left.scale(500),
            new Vector2(-300, -50),
            new Vector2(-100, 20),
            Vector2.zero,
        ]
        const finalStockPoint = new Vector2(200, 150);

        camera().add(
            <Node y={200} opacity={0}>
                <Line
                    ref={stockChart}
                    points={stockPath}
                    lineWidth={12}
                    stroke={Colors.GRAY}
                    end={0}
                />
                <Txt text={"AMZN Stock"} {...Fonts.main} position={[-400, -150]}/>
            </Node>
        );

        yield* all(
            phoneGrid().opacity(0, 1),
            lossText().opacity(0, 1),
            camera().scene().camera.position([0,0], 1),
            stockChart().parent().opacity(1, 1)
        );
        
        yield* stockChart().end(1, 1.5, linear);
        
        stockChart().points([...stockPath, finalStockPoint]);
        yield* stockChart().end(stockPath.length / (stockPath.length + 1), 0.5, easeInCubic);
        
        const dropText = createRef<Txt>();
        camera().add(<Txt ref={dropText} text={"- 8%"} {...Fonts.kinetic} fill={Colors.FAILURE_RED} position={[300, 100]} opacity={0} />)
        yield* dropText().opacity(1, 0.3);
        yield* waitFor(1);
        
        // --- SENTENCE 10: It was a public and financial failure.
        yield* all(
            stockChart().parent().scale(0.7, 1),
            stockChart().parent().position([-400, -150], 1),
            dropText().scale(0.7, 1),
            dropText().position([-50, -200], 1),
            lossText().position([400, 0], 1),
            lossText().scale(0.8, 1),
            lossText().opacity(1, 1)
        );

        const failureMontageText = createRef<Txt>();
        camera().add(<Txt ref={failureMontageText} text={"A TOTAL FAILURE"} {...Fonts.kinetic} y={300} scale={0.8} opacity={0} />);
        yield* failureMontageText().opacity(1, 0.5);
        yield* waitFor(1);

        // --- SENTENCE 11: But the story doesn't end there.
        const transitionRect = createRef<Rect>();
        camera().add(<Rect ref={transitionRect} width={2500} height={2500} fill={Colors.TEXT} opacity={0} />);

        yield* all(
            failureMontageText().text("But...", 0.3).fill(Colors.BG),
            transitionRect().opacity(1, 0.7),
        );
        yield* waitFor(0.5);

        // Clear failure visuals
        stockChart().parent().remove();
        dropText().remove();
        lossText().remove();
        failureMontageText().remove();

        // --- SENTENCE 12: The small team and the technology... were used to create something new
        const teamNode = createRef<Node>();
        const techNode = createRef<Node>();
        camera().add(
            <Node ref={teamNode} opacity={0}>
                <Txt text={"Small Team"} {...Fonts.main} y={-100}/>
                {/* Simple team representation */}
                <Circle x={-60} width={40} height={80} fill={Colors.ALEXA_BLUE}/>
                <Circle x={0} width={40} height={80} fill={Colors.ALEXA_BLUE}/>
                <Circle x={60} width={40} height={80} fill={Colors.ALEXA_BLUE}/>
            </Node>
        );
        camera().add(
            <Node ref={techNode} opacity={0}>
                <Txt text={"Fire Phone Tech"} {...Fonts.main} y={-100}/>
                {/* Simple tech representation */}
                <Rect x={-80} width={20} height={120} fill={Colors.GRAY} rotation={-30}/>
                <Rect x={0} width={20} height={120} fill={Colors.GRAY} rotation={10}/>
                <Rect x={80} width={20} height={120} fill={Colors.GRAY} rotation={45}/>
            </Node>
        );

        yield* all(
            transitionRect().opacity(0, 0.5),
            camera().scene().camera.zoom(1, 0.5)
        );

        yield* all(
            teamNode().opacity(1, 0.5), teamNode().position.x(-300, 0.5),
            techNode().opacity(1, 0.5), techNode().position.x(300, 0.5),
        );
        yield* waitFor(1.5);

        // --- SENTENCE 13: ...the Amazon Echo, powered by Alexa.
        const echo = createRef<Node>();
        camera().add(
            <Node ref={echo} scale={0} opacity={0}>
                <Rect width={200} height={450} radius={100} fill={'#2D3748'}/>
                <Rect y={-180} width={200} height={90} radius={{topLeft: 100, topRight: 100}} fill={Colors.ALEXA_BLUE} />
                <Circle y={-180} width={180} height={70} stroke={Colors.BG} lineWidth={10}/>
            </Node>
        );
        
        yield* all(
            teamNode().opacity(0, 0.5), teamNode().position.x(0, 0.5),
            techNode().opacity(0, 0.5), techNode().position.x(0, 0.5),
            echo().opacity(1, 1),
            echo().scale(1.2, 1, easeOutCubic)
        );

        const echoText = createRef<Txt>();
        camera().add(<Txt ref={echoText} text={"Amazon Echo"} {...Fonts.kinetic} y={350} opacity={0} />);
        yield* echoText().opacity(1, 0.5);
        yield* waitFor(1);
        
        // --- SENTENCE 14: The Echo was a massive success.
        const successText = createRef<Txt>();
        camera().add(<Txt ref={successText} text={"MASSIVE SUCCESS"} {...Fonts.kinetic} fill={Colors.SUCCESS_GREEN} scale={2} opacity={0} />);
        
        yield* all(
            echoText().opacity(0, 0.5),
            successText().opacity(1, 0.5),
            echo().find<Rect>('Rect').fill(Colors.SUCCESS_GREEN, 0.5)
        );
        yield* waitFor(1);

        // --- SENTENCE 15: It quickly captured over 60% of the smart speaker market...
        yield* all(
            successText().opacity(0, 0.5),
            echo().opacity(0, 0.5),
        );

        const pieChart = createRef<Circle>();
        const pieSlice = createRef<Circle>();
        const pieLabel = createRef<Txt>();

        camera().add(
            <Node>
                <Txt text={"Smart Speaker Market"} {...Fonts.main} y={-300} opacity={0} ref={pieLabel}/>
                <Circle
                    ref={pieChart}
                    size={400}
                    fill={Colors.GRAY}
                    opacity={0}
                />
                <Circle
                    ref={pieSlice}
                    size={400}
                    fill={Colors.ALEXA_BLUE}
                    angle={0}
                    endAngle={createSignal(0)}
                    opacity={0}
                />
            </Node>
        );

        yield* all(
            pieChart().opacity(1, 0.5),
            pieSlice().opacity(1, 0.5),
            pieLabel().opacity(1, 0.5)
        );

        const sixtyPercentText = createRef<Txt>();
        camera().add(<Txt ref={sixtyPercentText} {...Fonts.kinetic} text={"60%"} opacity={0}/>);
        
        yield* all(
            pieSlice().endAngle(360 * 0.6, 1.5, easeInOutCubic),
            sixtyPercentText().opacity(1, 1.5),
        );
        yield* waitFor(1.5);
        
        // --- SENTENCE 16: That $170 million loss ... became the cost of entry for a multi-billion dollar business...
        yield* all(
            pieChart().parent().opacity(0, 1),
            sixtyPercentText().opacity(0, 1),
            camera().scene().camera.zoom(1.2, 1)
        );

        const costText = createRef<Txt>();
        const keySVG = `<svg viewBox="0 0 24 24"><path fill="${Colors.AMAZON_ORANGE}" d="M16.7,6.3C16.3,5.9,16.3,5.2,16.7,4.8l2.8-2.8c0.4-0.4,1-0.4,1.4,0l2.8,2.8c0.4,0.4,0.4,1,0,1.4l-2.8,2.8c-0.4,0.4-1,0.4-1.4,0L16.7,6.3z M15,9c-0.6,0-1,0.4-1,1v1H2c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-2h10v1c0,0.6,0.4,1,1,1s1-0.4,1-1V10C16,9.4,15.6,9,15,9z"/></svg>`;
        const key = createRef<SVG>();
        const businessText = createRef<Txt>();

        camera().add(<Txt ref={costText} text={"$170M Loss"} {...Fonts.main} fill={Colors.FAILURE_RED} x={-400} opacity={0} />);
        camera().add(<SVG ref={key} svg={keySVG} scale={0} x={0} />);
        camera().add(<Txt ref={businessText} text={"Multi-Billion $$ Business"} {...Fonts.main} fill={Colors.SUCCESS_GREEN} x={450} opacity={0} />);

        yield* costText().opacity(1, 0.5);
        yield* costText().scale(0, 0.7, easeInCubic);
        yield* key().scale(6, 0.7, easeOutCubic);
        yield* key().x(200, 1);
        yield* all(
            key().opacity(0, 0.5),
            businessText().opacity(1, 0.5)
        );
        yield* waitFor(2);

        // --- SENTENCE 17: ...if you aren't failing, you aren't experimenting enough to find the next big thing.
        yield* all(
            businessText().opacity(0, 0.5),
            camera().scene().camera.zoom(1, 0.8),
        );
        
        const finalFailures: Circle[] = [];
        const finalSuccess = createRef<Txt>();
        camera().add(<Txt text={"?"} {...Fonts.kinetic} scale={8} opacity={0} fill={Colors.AMAZON_ORANGE} ref={finalSuccess}/>);
        
        yield* loop(5, i => (
            <Circle ref={ref => finalFailures.push(ref)} size={60} fill={Colors.FAILURE_RED} x={-600 + i*150} y={Math.random()*400 - 200} />
        ));

        yield* all(
            ...finalFailures.map(f => all(
                f.position(finalSuccess().position(), 1),
                f.opacity(0, 1)
            )),
            finalSuccess().opacity(1, 1).wait(0.5),
        )

        const finalQuote1 = createRef<Txt>();
        const finalQuote2 = createRef<Txt>();
        camera().add(<Txt ref={finalQuote1} {...Fonts.main} text={"If you aren't failing..."} y={250} opacity={0} />);
        camera().add(<Txt ref={finalQuote2} {...Fonts.main} text={"...you aren't experimenting."} y={320} opacity={0} />);

        yield* finalQuote1().opacity(1, 1);
        yield* finalQuote2().opacity(1, 1);

        yield* waitFor(3);
      },
    },
  ],
});
