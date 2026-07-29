# Grinbuck Technologies — Site Copy Audit

Verbatim inventory of every user-facing string currently rendered on the live site, captured directly from source on 2026-07-28. Organized by route, in the order a visitor encounters each page top to bottom. This is a capture for review, not a rewrite — phrasing is reproduced exactly as it renders, including anything that reads awkwardly.

Routes covered: `/`, `/grinbuck3d`, `/grinbuck3d/clickit`, `/grinbuck3d/clickit/pilot-kit`, `/grinbuck3d/clickit/quote`, `/grinbuck3d/clickit/shop`, `/grinbuck3d/quote`, `/about`.

---

# Site-wide `<head>` defaults (app/layout.tsx)

These are the fallback `<title>`/meta values Next.js uses unless a page sets its own (every page below does set its own, except where noted).

- Title: Grinbuck Technologies Inc.
- Description: A Victoria, BC-based holding company building and operating independent businesses for the long term.
- OG title: Grinbuck Technologies Inc.
- OG description: A Victoria, BC-based holding company building and operating independent businesses for the long term.
- OG site name: Grinbuck Technologies Inc.
- Twitter title: Grinbuck Technologies Inc.
- Twitter description: A Victoria, BC-based holding company building and operating independent businesses for the long term.

---

# Homepage (`/`)

## Nav
- grinbuck (wordmark logo, links to `#hero`)
- Ventures (anchor to `#ventures`)
- About (route to `/about`)
- Contact (mailto link)

## Hero
- grinbuck (large wordmark, "grin" ink / "buck" green)
- Serious Tech.
- Serious Fun.
- Grinbuck Technologies builds hardware, software, and the trade routes between them, out of Victoria, BC.
- See the ventures → (button, scrolls to `#ventures`)

## Ventures section
- Three Ventures. One Bet on Building. (section eyebrow)

### Venture band 1: Grinbuck3D
- 01 / Manufacturing
- Grinbuck3D
- Additive manufacturing and 3D-print production for clients who need parts fast, precise, and built to spec. We take every job from prototype to production run.
- A real production floor. In-house printing and assembly, built in Victoria, BC.
- Visit Grinbuck3D →

### Venture band 2: tabMonk
- 02 / Fintech
- tabMonk (large heading, "tab" ink / "Monk" green)
- tabMonk tracks income and expenses, sends invoices, and keeps you ready for tax season. Built for personal budgets and small businesses alike.
- Visit tabMonk →

### Venture band 3: QP Quintet
- 03 / International Trade
- QP Quintet
- QP Quintet trades both ways between India and Canada, importing and exporting goods across the Pacific.
- Visit QP Quintet →

## About teaser
- About Grinbuck (eyebrow)
- Independent ventures. One way of building. (heading)
- Grinbuck Technologies is based in Victoria, BC. We build hardware, software, and the trade routes between them.
- Each venture runs on its own, with its own product, team, and customers. What ties them together is how we build it: fast, direct, and without excuses.
- More about us → (links to `/about`)

## Footer
- GRINBUCK (plain-text wordmark, single color, not the two-tone treatment used in nav/hero)
- Victoria, British Columbia · hello@grinbuck.com
- Grinbuck3D (links to `/grinbuck3d`)
- tabMonk (external link)
- QP Quintet (external link)

---

# `/grinbuck3d`

**`<title>`:** Grinbuck3D: Additive manufacturing, Victoria BC
**Meta description:** Additive manufacturing and 3D-print production for clients who need parts fast, precise, and built to spec. From prototype to production run.

## Nav
- grinbuck (wordmark, links to `/`)
- ClickIT (route to `/grinbuck3d/clickit`)
- Home (route to `/`)
- Contact (mailto link)

## Hero
- Manufacturing (eyebrow)
- Grinbuck3D (heading)
- Additive manufacturing and 3D-print production for clients who need parts fast, precise, and built to spec. We take every job from prototype to production run.
- See what we've printed → (small link beside the illustration, external to Etsy)

## Capabilities ("What we do.")
- What we do. (heading)
- Every part starts as a design file and ends as a finished piece. We take it from prototype through production run, designed and assembled in-house.
- Production floor — A real manufacturing floor, not a hobby setup.
- In-house, start to finish — Design, printing, and assembly happen under one roof.
- Prototype to production — Same process for one part or a full run.
- Victoria, BC — Built and shipped from Vancouver Island.

## What we make
- What we make. (heading)
- Alongside client and commercial work, Grinbuck3D designs and produces its own product lines in-house.
- Featured product line (eyebrow, on the ClickIT card)
- ClickIT (card heading)
- Tactile clickers, designed and manufactured in-house. Built for focus and for training. (card description)
- Explore ClickIT → (card link)

## Commercial / B2B
- Prototyping or a production run? (heading)
- If you have a part to prototype or a batch to produce, tell us what you need. We'll quote it.
- Get a quote → (links to `/grinbuck3d/quote`)

## Footer
- © 2026 Grinbuck Technologies Inc.
- hello@grinbuck.com (mailto)

---

# `/grinbuck3d/clickit`

**`<title>`:** ClickIT: Built to help you focus, wherever you need it
**Meta description:** A tactile, pocket-sized clicker for focus. It works by touch, not by sight, so there's nothing to watch and nothing to distract anyone nearby.

## Nav
- grinbuck (wordmark, links to `/`)
- Grinbuck3D (route to `/grinbuck3d`)
- Home (route to `/`)
- Contact (mailto link)

## Hero
- A Grinbuck3D product line (eyebrow)
- Click / IT (large wordmark, "Click" ink / "IT" green)
- The click, engineered properly.
- A click is one of the most versatile behavioural tools ever made. Most people reach for ClickIT to focus. Some use it to train a dog. Same clicker, built properly.
- Shop the clicker → (links to `/grinbuck3d/clickit/quote`)

## The one product
- The Clicker. (heading)
- ABS plastic
- 3D-printed and assembled in Victoria, BC
- Pocket-sized
- Silent or audible
- No batteries, no screen, nothing to charge
- ClickIT ships in two variants: silent and audible. Same clicker, same build, different sound.
- Silent tends to suit focus and quiet spaces. Audible tends to suit training. Neither is locked to one use case: pick whichever fits how you'll use it.

## Focus & self-regulation
- Focus & Regulation (eyebrow)
- For focus. (heading)
- ADHD is now the most commonly diagnosed long-term condition among children and youth in Canada.
- Prevalence rose from 6.7% in 2019 to 8.4% in 2023. Autism rose from 2.0% to 3.0% over the same period.
- One in four Canadian children and youth, more than 1.6 million kids, now has at least one diagnosed long-term condition (Public Health Agency of Canada, Canadian Health Survey on Children and Youth, 2023).
- Fidget spinners answered that need badly enough to get banned.
- At the peak of the craze, about a third of the top 200 US schools banned fidgets outright.
- The research backs the bans, at least for spinners. Studies found they increased distracted behaviour in kids with ADHD and dragged down third-graders' math scores.
- One university lecture study found spinners cut retention substantially for the student using one, and measurably for students sitting nearby.
- The problem is that spinners are visual. They demand hand-eye coordination.
- That pulls the user's eyes, and their neighbours' eyes, off whatever they're supposed to be doing.
- Occupational therapists have always recommended the opposite: something tactile, worked by feel, that never asks to be looked at.
- The other complaint is volume.
- Ask teachers and they're close to unanimous. The fidgets that survive in a classroom are the quiet ones.
- A clicking pen is the textbook example of what not to do.
- ClickIT's clicker is built to the constraint teachers actually name: feedback you can feel without looking, that the room never hears.

### Honesty box
- Most fidget brands would rather you didn't look too closely at the research. ClickIT is built assuming you will.
- What the research actually shows (label)
- The evidence that fidget tools improve attention or grades is weak.
- A controlled classroom study of a leading tactile fidget, the Fidget Cube, found no improvement in on-task behaviour or math productivity. Its authors suggested schools consider phasing fidgets out entirely (Croley, Drevon & Decker, 2022).
- The honest summary across reviews: fidgeting doesn't reliably improve attention.
- At best, for some people in some contexts, it may displace more disruptive habits and support self-regulation (Edutopia, 2024).
- ClickIT doesn't claim to improve focus, attention, grades, or ADHD symptoms. That's not a hedge, it's the point. This isn't a treatment.
- It's a self-regulation tool engineered to be the least disruptive option in the room.
- Teachers already settled this. Fidgets are fine when they're tools, not toys, which means quiet, tactile, and put away when they stop helping.

### Pilot-kit CTA
- Bringing ClickIT to your space?
- Schools, daycares, kindergartens, pediatric dental offices, and children's hospitals are already putting ClickIT to work. If yours could use the same, tell us your unit count and we'll follow up with a custom quote.
- Request a pilot kit → (links to `/grinbuck3d/clickit/pilot-kit`)

## Training (secondary passage)
- It also works for training. (heading)
- People also use ClickIT for dog training and marker-based training more broadly. It's a genuine second use case, not a separate product.
- A clicker is an event marker. The sound is short and identical every time, and unlike a spoken word, it lands at the exact instant a behaviour happens.
- Paired consistently with a reward, that sound becomes a conditioned reinforcer. The animal learns the click itself means "that, right there, was correct."

### Timeline
- 01 / 1951 — B.F. Skinner introduces the clicker as a conditioned reinforcer, in "How to Teach Animals" (Scientific American).
- 02 — Marian and Keller Breland commercialize clicker training.
- 03 — Refined on dolphins in marine mammal parks through the 1950s and 60s.
- 04 — Karen Pryor popularizes clicker training beyond the marine mammal world.
- 05 — TAGteach adapts the same marker principle for people.
- 06 — Today: ClickIT builds the mechanism into one pocket tool.

### Training beats
- The breadth is what makes this interesting. Dogs and horses, obviously, but also zoos and aquariums, where accredited facilities use marker training so animals take part voluntarily in their own veterinary care: elephants presenting a foot for a pedicure, voluntary blood draws, tortoises and storks stepping onto a scale, macaws, primates, reptiles. Laboratory animal welfare programs use it too, and so do shelter and rescue rehabilitation programs.
- The human branch is called TAGteach, Teaching with Acoustical Guidance. It's the same marker principle applied to people, and it shows up in elite gymnastics and dance, professional golf instruction, yoga, orthopedic surgical technique, emergency nursing, physical therapy and gait retraining, speech therapy, special education and mainstream classrooms, and workplace safety training. A click can mark a body position a learner can't see themselves, toes pointed, back straight, at the exact moment it's correct, which spoken feedback always arrives too late for.

### Training honesty aside
- The training literature is mixed on whether a clicker actually outperforms other consistent markers, a verbal "yes," a whistle. We're not claiming it does.
- What's true and well documented is the consistency and the timing precision. This is the tool the field standardized on.

### Training CTA
- Training your dog? The same clicker works.
- Shop it → (links to `/grinbuck3d/clickit/quote`)

## Who it's for
- Who it's for. (heading)
- Institutions and classrooms — Schools, Daycares & kindergartens, Pediatric dental offices, Children's hospitals, OT clinics, Offices
- Training and behavior work — Dog trainers & owners, Obedience clubs, Shelters, Stables, Veterinary practices, Coaches & instructors

## Closing CTA
- Shop the clicker → (primary card, links to `/grinbuck3d/clickit/quote`)
- For personal use, training, or a bulk order. (card subtext)
- Ordering for a school, clinic, or institution? Request a pilot kit → (secondary inline link, links to `/grinbuck3d/clickit/pilot-kit`)

## Sources & further reading
- Sources & further reading. (heading)
- Public Health Agency of Canada: chronic conditions in childhood, prevalence
- Scientific American: "Fidget Toys Aren't Just Hype" (2017)
- Edutopia: "Do Fidgets Help Students Focus?" (2024)
- Croley, Drevon & Decker: Fidget Cube classroom study, Behavior Analysis in Practice (2022)
- Fidget devices and disruptive behaviour in students with autism, Contemporary School Psychology (2025)

## Footer
- © 2026 Grinbuck Technologies Inc.
- hello@grinbuck.com (mailto)

---

# `/grinbuck3d/clickit/pilot-kit`

**`<title>`:** Request a ClickIT pilot kit: Grinbuck3D
**Meta description:** Request a custom ClickIT pilot kit quote for your school, daycare, or institution.

## Nav
- grinbuck (wordmark, links to `/`)
- ClickIT (route to `/grinbuck3d/clickit`)
- Home (route to `/`)
- Contact (mailto link)

## Hero / intro
- ClickIT / Pilot Kit Request (eyebrow)
- Bring ClickIT to your space. (heading)
- Tell us about your institution and how many units you'd need.
- We'll follow up with a custom quote based on your unit count and institution. This is a quote request, not a free program.

## Form fields
- Institution name (required, text)
- Institution type (required, select: School, Daycare, Kindergarten, Pediatric dental office, Children's hospital, Other)
- Tell us what kind of institution (text, shown only if "Other" selected)
- Contact name (required, text)
- Contact email (required, email)
- Estimated unit count / class or group size (required, text; placeholder: "e.g. 25 students across two classrooms")
- Silent or audible? (required, select: Silent, Audible)
- Anything else we should know? (textarea, optional)
- Choose one (default/disabled option shown in every select)
- Request a quote (submit button label)
- Sending... (submit button label while pending)

## Submission outcomes
- Please fill in every required field with a valid email address. (validation error)
- Thanks. We've received your request and will follow up with a custom quote based on your unit count and institution. (success)
- Something went wrong sending your request. Please try again, or email us directly at hello@grinbuck.com. (generic send failure)

## Footer
- © 2026 Grinbuck Technologies Inc.
- hello@grinbuck.com (mailto)

---

# `/grinbuck3d/clickit/quote`

**`<title>`:** Shop ClickIT: Grinbuck3D
**Meta description:** Order ClickIT: personal purchase, dog training, bulk order, or a retail and wholesale enquiry.

## Nav
- grinbuck (wordmark, links to `/`)
- ClickIT (route to `/grinbuck3d/clickit`)
- Home (route to `/`)
- Contact (mailto link)

## Hero / intro
- ClickIT / Shop (eyebrow)
- Shop the clicker. (heading)
- Whatever you're looking for, personal use, dog training, or a bulk order, tell us what you need.
- We'll follow up directly.

## Form fields
- Name (required, text)
- Email (required, email)
- What are you looking for? (required, select: Personal purchase, Bulk order, Retail or wholesale inquiry, Other)
- Tell us more (text, shown only if "Other" selected)
- Quantity, if applicable (text, optional)
- Silent or audible? (required, select: Silent, Audible)
- Anything else we should know? (textarea, optional)
- Choose one (default/disabled option shown in every select)
- Send request (submit button label)
- Sending... (submit button label while pending)

## Submission outcomes
- Please fill in every required field with a valid email address. (validation error)
- Thanks. We've received your request and will get back to you shortly. (success)
- Something went wrong sending your request. Please try again, or email us directly at hello@grinbuck.com. (generic send failure)

## Footer
- © 2026 Grinbuck Technologies Inc.
- hello@grinbuck.com (mailto)

---

# `/grinbuck3d/clickit/shop`

Placeholder "coming soon" page. Not currently linked from anywhere in the live navigation or CTAs (all shop-intent CTAs point to `/grinbuck3d/clickit/quote` instead) — see note in the flagged-items list below.

**`<title>`:** ClickIT Shop: Coming soon
**Meta description:** The ClickIT shop is coming soon.

## Nav
- grinbuck (wordmark, links to `/`)
- ClickIT (route to `/grinbuck3d/clickit`)
- Home (route to `/`)
- Contact (mailto link)

## Body
- Coming soon. (heading)
- The ClickIT shop isn't open yet. Check back soon.

(No footer on this page.)

---

# `/grinbuck3d/quote`

**`<title>`:** Get a manufacturing quote: Grinbuck3D
**Meta description:** Request a quote from Grinbuck3D for prototyping or a production run.

## Nav
- grinbuck (wordmark, links to `/`)
- ClickIT (route to `/grinbuck3d/clickit`)
- Home (route to `/`)
- Contact (mailto link)

## Hero / intro
- Grinbuck3D / Production Enquiry (eyebrow)
- Get a quote. (heading)
- Tell us about the part and the run, prototype or production.
- We'll follow up with a quote.

## Form fields
- Company or name (required, text)
- Email (required, email)
- Project type (required, select: Prototype, Production run, Not sure yet)
- Part description (required, textarea; placeholder: "What are you trying to build?")
- Estimated quantity (text, optional)
- Target deadline (text, optional; placeholder: "Optional")
- Anything else we should know? (textarea, optional)
- Choose one (default/disabled option shown in every select)
- Get a quote (submit button label)
- Sending... (submit button label while pending)

## Submission outcomes
- Please fill in every required field with a valid email address. (validation error)
- Thanks. We've received your request and will follow up with a quote. (success)
- Something went wrong sending your request. Please try again, or email us directly at hello@grinbuck.com. (generic send failure)

## Footer
- © 2026 Grinbuck Technologies Inc.
- hello@grinbuck.com (mailto)

---

# `/about`

**`<title>`:** About our team — Grinbuck Technologies Inc.
**Meta description:** Meet the founders of Grinbuck Technologies — Sarshad Abubaker and Kavita Uttam.

*(Out of scope for editing per prior passes; included here only for a complete inventory.)*

## Nav
- grinbuck (wordmark, links to `/`)
- Home (route to `/`)
- Contact (mailto link)

## Body
- About our team (heading)

### Sarshad Abubaker
- Founder & CEO
- Sarshad Abubaker
- Sarshad is a software developer and entrepreneur with over a decade of experience across enterprise engineering, academic research, and building companies of his own. He spent nearly a decade at Latitude Geographics (later VertiGis North America) as a software developer, designing and shipping features for the company's flagship HTML5 web mapping application and API, solving complex architectural problems and keeping the platform stable across browsers, operating systems, and hardware. Before that, he was a research assistant and teaching assistant at the University of Victoria, researching finite-automata cryptography, social networks, and smart grid security, and co-authoring two peer-reviewed academic papers. He also contributed security architecture to a Nokia University Relations project on privacy-preserving smartphone applications. He holds a Master's in Computer Science from the University of Victoria and a Master's in Information Technology from De Montfort University (UK), where he was named Best IT Master's Student. His interest in emerging technology runs deeper than software alone — between 2017 and 2018 he ran his own cryptocurrency mining operation, and he's remained a keen follower of the space since.
- Victoria, BC · MSc Computer Science, University of Victoria · MSc IT, De Montfort University

### Kavita Uttam
- Co-Founder & Director
- Kavita Uttam
- Kavita built her career in healthcare operations across 17 years in clinical leadership and nuclear medicine safety, work that leaves no room for error. She has served as Assistant Supervisor and Radiation Safety Officer in nuclear medicine, roles built on rigorous clinical operations, team leadership, and stakeholder management. Her professional path has also included customer service experience at JPMorgan Chase. She holds a BSc in Biology from UBC, honours training in Nuclear Medicine from BCIT, and advanced technical certifications in CT, PET, and RSO from CAMRT. Having lived in multiple countries and attended schools around the world, she brings deep cultural fluency and a naturally social, inclusive mindset. This global perspective, combined with a compassionate, intuitive approach built through years in patient care, shapes how she builds inclusive environments and connects with diverse teams and clients.
- Victoria, BC · BSc Biology, UBC · Honours, Nuclear Medicine, BCIT

(No footer on this page.)
