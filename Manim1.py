
from manim import *
from manim.mobject.geometry.indicators 
import Checkmark, Cross

class AmazonInvention(MovingCameraScene):
    def construct(self):
        self.camera.background_color = "#1E2127"
        
        # 00:00 - 00:09
        self.wait(0.5)
        title = Text("Imagine you try something 10 times...", font_size=36)
        self.play(Write(title))
        self.wait(1)
        self.play(FadeOut(title))

        boxes = VGroup(*[Square(side_length=1, color=BLUE) for _ in range(10)]).arrange_in_grid(2, 5, buff=0.5)
        self.play(Create(boxes))
        self.wait(0.5)

        failures = boxes[:9]
        success = boxes[9]
        
        crosses = VGroup()
        for box in failures:
            cross = Cross(box, stroke_color=RED, stroke_width=8)
            crosses.add(cross)
        
        self.play(
            *[box.animate.set_fill(RED, opacity=0.5) for box in failures],
            Create(crosses),
            run_time=1.5
        )
        self.wait(0.5)
        
        check = Checkmark(success, color=GREEN, stroke_width=8)
        self.play(
            success.animate.set_fill(GREEN, opacity=0.5),
            Create(check)
        )
        self.wait(0.5)

        reward_text = Text("100x Reward", font_size=48, color=YELLOW).next_to(success, DOWN, buff=1)
        self.play(
            FadeOut(*failures, *crosses),
            self.camera.frame.animate.move_to(success.get_center()).scale(0.7),
            success.animate.scale(2),
            check.animate.scale(2),
            Write(reward_text)
        )
        self.wait(1)

        # 00:09 - 00:15
        self.play(FadeOut(success, check, reward_text))
        amazon_logo = SVGMobject("images/amazon_logo.svg").scale(0.5)
        philosophy_text = Text("Amazon's Philosophy:", font_size=36).next_to(amazon_logo, UP)
        fail_text = Text("You must fail to invent.", font_size=40, color=YELLOW).next_to(amazon_logo, DOWN)
        self.play(FadeIn(amazon_logo), Write(philosophy_text))
        self.play(Write(fail_text))
        self.wait(1.5)
        
        # 00:15 - 00:23
        self.play(FadeOut(amazon_logo, philosophy_text, fail_text))
        
        fire_phone = SVGMobject("images/fire_phone.svg").scale(0.8)
        fire_phone_title = Text("The Amazon Fire Phone", font_size=40).to_edge(UP)
        self.play(FadeIn(fire_phone), Write(fire_phone_title))
        
        year_text = Text("2014", font_size=32).next_to(fire_phone, LEFT, buff=1)
        cost_text = Text("Cost: Millions", font_size=32).next_to(fire_phone, RIGHT, buff=1)
        self.play(Write(year_text), run_time=1.5)
        self.play(Write(cost_text), run_time=1.5)

        disaster_text = Text("DISASTER", font_size=60, color=RED)
        crack = Line(fire_phone.get_corner(DL), fire_phone.get_corner(UR), color=WHITE, stroke_width=4)
        self.play(
            FadeOut(year_text, cost_text),
            Create(crack),
            FadeIn(disaster_text, scale=2)
        )
        self.wait(1)

        # 00:23 - 00:31
        self.play(FadeOut(fire_phone, crack), disaster_text.animate.to_edge(UP).scale(0.7))
        
        unsold_phones = SVGMobject("images/phone_box.svg").scale(0.3)
        pile = VGroup(*[unsold_phones.copy().shift(DOWN*i*0.2 + RIGHT*i*0.1) for i in range(10)])
        pile.center()
        
        loss_text = Text("Loss: $170,000,000", font_size=48, color=RED).to_edge(DOWN)
        
        self.play(FadeIn(pile, lag_ratio=0.2))
        self.wait(1)
        self.play(Write(loss_text), run_time=2)
        self.wait(1.5)

        # 00:31 - 00:38
        self.play(FadeOut(pile, disaster_text, loss_text))
        
        stock_chart = VGroup()
        axes = Axes(
            x_range=[0, 10, 2],
            y_range=[80, 100, 5],
            x_length=8,
            y_length=5,
            axis_config={"color": BLUE},
        ).add_coordinates()
        
        graph = axes.plot(lambda x: 95 - 2*x if x>5 else 95, x_range=[0, 7], color=WHITE)
        drop_text = Text("-8%", color=RED, font_size=36).next_to(graph.get_end(), RIGHT)
        
        stock_chart.add(axes, graph, drop_text)
        stock_title = Text("Stock Price Drop", font_size=36).to_edge(UP)

        self.play(Write(stock_title), Create(axes))
        self.play(Create(graph), run_time=2)
        self.play(Write(drop_text))
        self.wait(2)
        
        # 00:38 - 00:49
        self.play(FadeOut(stock_chart, stock_title))
        
        story_text = Text("But the story doesn't end there...", font_size=36, color=YELLOW)
        self.play(Write(story_text))
        self.wait(1)
        self.play(FadeOut(story_text))
        
        broken_phone = fire_phone.copy().set_opacity(0.4)
        broken_phone.add(crack.copy())
        
        team_icon = SVGMobject("images/team.svg", color=WHITE).scale(0.5)
        tech_icon = SVGMobject("images/tech.svg", color=WHITE).scale(0.5)
        plus = Tex("+").scale(1.5)
        
        from_failure = VGroup(team_icon, plus, tech_icon).arrange(RIGHT).next_to(broken_phone, UP, buff=0.5)

        echo = SVGMobject("images/amazon_echo.svg").scale(0.8)
        arrow = Arrow(from_failure.get_right(), echo.get_left(), buff=1, color=YELLOW)
        echo.next_to(arrow, RIGHT, buff=1)

        self.play(FadeIn(broken_phone))
        self.play(broken_phone.animate.shift(LEFT*3.5))
        self.play(FadeIn(from_failure))
        self.play(Create(arrow))
        self.play(FadeIn(echo))
        
        alexa_logo = SVGMobject("images/alexa_logo.svg").scale(0.3).next_to(echo, DOWN)
        self.play(FadeIn(alexa_logo))
        self.wait(1)

        # 00:49 - 00:56
        self.play(FadeOut(broken_phone, from_failure, arrow))
        
        echo_group = VGroup(echo, alexa_logo)
        self.play(echo_group.animate.move_to(ORIGIN).scale(1.2))
        
        success_text = Text("MASSIVE SUCCESS", font_size=54, color=GREEN).next_to(echo_group, UP)
        self.play(Write(success_text))
        
        pie = Pie(
            [60, 40],
            colors=[GREEN, BLUE],
            radius=2
        ).next_to(echo_group, LEFT, buff=1.5)
        pie_label = Text(">60% Market Share", font_size=32).next_to(pie, DOWN)

        self.play(
            echo_group.animate.shift(RIGHT * 3),
            success_text.animate.shift(RIGHT * 3)
        )
        self.play(FadeIn(pie, pie_label), run_time=2)
        self.wait(1.5)

        # 00:56 - 01:03
        self.play(FadeOut(echo_group, success_text, pie, pie_label))
        
        loss_text_again = Text("$170M Loss", font_size=40, color=RED).shift(LEFT*4)
        cost_text_again = Text("$170M Cost of Entry", font_size=40, color=YELLOW).shift(LEFT*4)
        
        business_text = Text("Multi-Billion $ Business", font_size=48, color=GREEN).shift(RIGHT*4)
        arrow_transform = Arrow(LEFT, RIGHT, buff=2, color=WHITE)
        
        self.play(Write(loss_text_again))
        self.play(Transform(loss_text_again, cost_text_again), Create(arrow_transform))
        self.play(Write(business_text))
        self.wait(3)

        # 01:03 - 01:10
        final_group = VGroup(loss_text_again, arrow_transform, business_text)
        self.play(FadeOut(final_group))
        
        final_text1 = Text("If you aren't failing,", t2c={"failing": RED}, font_size=40)
        final_text2 = Text("you aren't experimenting enough", t2c={"experimenting": YELLOW}, font_size=40)
        final_text3 = Text("to find the next big thing.", t2c={"next big thing": GREEN}, font_size=40)
        
        final_quote = VGroup(final_text1, final_text2, final_text3).arrange(DOWN)
        self.play(Write(final_quote))
        
        final_logo = SVGMobject("images/amazon_logo.svg").scale(0.4).next_to(final_quote, DOWN, buff=1)
        self.play(FadeIn(final_logo))
        self.wait(3)
