import type { Component, JSXElement } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Image } from '~/components/Image'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'

export const WelcomePage = () => (
  <>
    <section class="layout-section text-center">
      <Card
        variant="black"
        class="items-center gap-12"
      >
        <h3 class="text-3xl font-bold">
          Build That Rico Culo – Track Your Way to Glory!
        </h3>
        <span class="text-8xl">🍑</span>
        <p class="text-lg text-current/80">
          Ready to sculpt, sweat, and shine? RicoCulo is your fitness BFF. From
          squats to sprints, we’ve got your progress covered!
        </p>
        <h3 class="text-xl font-bold">
          Your journey to a glorious gluteus (and beyond) starts here!
        </h3>
        <Link
          class={buttonVariants()}
          href={InternalLink.signUp}
        >
          Join now
        </Link>
      </Card>
    </section>

    <section class="layout-section">
      <Card class="gap-12">
        <h3 class="text-3xl font-bold">Getting Started is Easy</h3>
        <div class="flex flex-col gap-8">
          <Step
            step={1}
            title="Set Up Your Profile"
            description="Tell us about your goals – muscle gains, cardio kings, or overall fitness vibes."
          />
          <Step
            step={2}
            title="Select Your Workout Plan"
            description="From beginner to advanced, we’ve got routines to suit your level."
          />
          <Step
            step={3}
            title="Start Tracking Your Workouts"
            description="Log every squat, sprint, and curl. Watch your progress, one rep at a time!"
          />
        </div>
      </Card>
    </section>

    <section class="layout-section">
      <Card
        class="gap-12 bg-black backdrop-blur-none"
        variant="black"
      >
        <h3 class="text-3xl font-bold">Why RicoCulo Rocks</h3>
        <Feature
          imgSrc="/images/homepage/1.jpg"
          title="Choose Your Workout Plan"
          description="From cardio to strength training, RicoCulo tailors plans to your fitness goals. Whether it’s burning calories or building muscle, we’ve got you covered."
        />
        <Feature
          imgSrc="/images/homepage/2.jpg"
          title="Customize Your Workouts"
          description="Add your favorite exercises, adjust difficulty levels, and make each session your own."
        />
        <Feature
          imgSrc="/images/homepage/3.jpg"
          title="Track Your Workout Sessions"
          description="Keep a detailed log of every session. See trends, improve consistency, and watch your progress soar!"
        />
        <Feature
          imgSrc="/images/homepage/4.jpg"
          title="Stay Motivated Every Day"
          description="RicoCulo keeps you inspired by reminding you of today’s workouts, sharing progress insights, and cheering you on every step of the way."
        />
      </Card>
    </section>

    <section class="layout-section text-center">
      <Card
        variant="black"
        class="items-center gap-12"
      >
        <h3 class="text-3xl font-bold">Start Your Journey Today!</h3>
        <span class="text-8xl">🍑</span>
        <p class="text-lg text-current/80">
          Don’t wait for Monday. RicoCulo is here, ready to track your sweat,
          celebrate your gains, and keep you laughing.
        </p>
        <Link
          class={buttonVariants()}
          href={InternalLink.signUp}
        >
          Join for free
        </Link>
      </Card>
    </section>
  </>
)

type StepProps = {
  title: JSXElement
  description: JSXElement
  step: number
}

const Step: Component<StepProps> = props => (
  <div class="flex flex-1 shrink-0 items-center gap-6 rounded-2xl bg-white px-8 py-3 shadow-sm">
    <span class="text-xl font-bold">{props.step}</span>
    <div class="flex flex-col">
      <h3 class="text-xl font-bold text-black/80">{props.title}</h3>
      <span class="text-black/50">{props.description}</span>
    </div>
  </div>
)

type FeatureProps = {
  title: JSXElement
  description: JSXElement
  imgSrc: string
}

const Feature: Component<FeatureProps> = props => (
  <div class="flex items-center gap-6 not-even:flex-row-reverse not-even:text-right">
    <Image
      img={{
        src: props.imgSrc,
        class: 'object-cover object-center'
      }}
      wrapper={{
        class: 'rounded-2xl overflow-hidden flex-1 aspect-video'
      }}
    />
    <div class="flex flex-1 flex-col">
      <h3 class="text-xl font-bold">{props.title}</h3>
      <span class="text-current/50">{props.description}</span>
    </div>
  </div>
)
