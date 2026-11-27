# CodingVBench

**Rethinking Video Quality Evaluation Beyond Generative Models**

<p align="center">
  <a href="https://openraiser.github.io/CodingVBench/"><img src="https://img.shields.io/badge/Project-Page-1a6fd4" alt="Project page"></a>
  <a href="#gallery"><img src="https://img.shields.io/badge/Gallery-4%20routes-0f8f86" alt="Gallery"></a>
  <img src="https://img.shields.io/badge/Data-coming%20soon-FFB000?logo=huggingface&logoColor=white" alt="Data coming soon">
  <img src="https://img.shields.io/badge/Paper-coming%20soon-lightgrey" alt="Paper coming soon">
</p>

Video benchmarks such as VBench score visual quality and prompt adherence with metrics validated on **pixel**-generated clips. Coding agents now answer the same prompts through executable scene programs, and the two production routes fail in different ways.

> **Same prompt, two routes.** *A person is baby waking up.* The code-rendered baby wakes and stretches; the pixel-generated baby never opens its eyes. VBench native scores them the other way round.

<p>
<a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20baby%20waking%20up-4.mp4"><img src="docs/previews/astra/0127.webp" width="49%" alt="GPT-6 Astra — a person is baby waking up"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20baby%20waking%20up-4.mp4"><img src="docs/previews/h3/0127.webp" width="49%" alt="MiniMax H3 — a person is baby waking up"></a>
</p>

<sub>Left: **GPT-6 Astra** (code) — the baby wakes and stretches, VBench **0**, human label **complete**. Right: **MiniMax H3** (pixels) — the baby stays asleep, VBench **1**, human label **not complete**.</sub>

CodingVBench freezes the videos and varies the evaluator. It pairs **360 matched code-rendered and MiniMax-H3 clips** on 120 VBench prompts, labelled by three annotators for completion and visual preference, with **60 controlled scene-program edits** that remove required behavior or change only hue while the task stays complete. Eight-frame VLM judges reach **92.7% / 93.9%** agreement with human completion labels, versus **71.6%** for native modules.

| | |
| --- | --- |
| Gallery below | Every VBench prompt the four routes were run on, side by side |
| Matched set | 360 videos on 120 VBench prompts (Astra, Opus 5.5, MiniMax-H3), 3 annotators |
| Controlled pairs | 50 behavioral violations + 10 hue-only edits, verified scene programs |
| Judges | Native UMT / GRiT / LAION modules vs frozen 8-frame GPT-6.1-Sol and Claude Sonnet 5.5 |

## Contents

- [Gallery](#gallery)
  - [Human action](#human-action)
  - [Multiple objects](#multiple-objects)
  - [Spatial relationship](#spatial-relationship)
  - [Color](#color)
  - [Object class](#object-class)
  - [Scene](#scene)
  - [Appearance style](#appearance-style)
  - [Temporal style](#temporal-style)
  - [Overall consistency](#overall-consistency)
  - [Subject consistency](#subject-consistency)
  - [Temporal flickering](#temporal-flickering)
- [What the labels mean](#what-the-labels-mean)
- [Results](#results)
- [Release](#release)
- [Citation](#citation)

## Gallery

Every VBench prompt the four routes were run on, one run each. Every clip is a 2-second loop stamped with its route, always in the same order: **MiniMax H3 · GPT-6 Astra · Opus 5.5 · GPT-6.1-Sol**. Prompts from the human-labelled matched set come first in each category and carry the benchmark tag; click any of those to open the full video on the [project page](https://openraiser.github.io/CodingVBench/). Each category opens with a few prompts; the rest are one click away.

Opus 4.8 clips are on the project page but not shown here.

### Human action

**A person is air drumming** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20air%20drumming-0.mp4"><img src="docs/previews/h3/0124.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20air%20drumming-0.mp4"><img src="docs/previews/astra/0124.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20air%20drumming-0.mp4"><img src="docs/previews/opus/0124.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20air%20drumming-0.mp4"><img src="docs/previews/sol/0124.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is arranging flowers** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20arranging%20flowers-0.mp4"><img src="docs/previews/h3/0126.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20arranging%20flowers-0.mp4"><img src="docs/previews/astra/0126.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20arranging%20flowers-0.mp4"><img src="docs/previews/opus/0126.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20arranging%20flowers-0.mp4"><img src="docs/previews/sol/0126.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is baby waking up** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20baby%20waking%20up-4.mp4"><img src="docs/previews/h3/0127.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20baby%20waking%20up-4.mp4"><img src="docs/previews/astra/0127.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20baby%20waking%20up-4.mp4"><img src="docs/previews/opus/0127.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20baby%20waking%20up-4.mp4"><img src="docs/previews/sol/0127.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is bandaging** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20bandaging-4.mp4"><img src="docs/previews/h3/0128.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20bandaging-4.mp4"><img src="docs/previews/astra/0128.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20bandaging-4.mp4"><img src="docs/previews/opus/0128.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20bandaging-4.mp4"><img src="docs/previews/sol/0128.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

<details><summary><b>Show more human action prompts</b></summary>

**A person is bending back** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20bending%20back-0.mp4"><img src="docs/previews/h3/0130.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20bending%20back-0.mp4"><img src="docs/previews/astra/0130.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20bending%20back-0.mp4"><img src="docs/previews/opus/0130.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20bending%20back-0.mp4"><img src="docs/previews/sol/0130.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is bending metal** <sub>· ↻ VBench code↑ H3↓ · no GPT-6.1-Sol clip</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20bending%20metal-0.mp4"><img src="docs/previews/h3/0131.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20bending%20metal-0.mp4"><img src="docs/previews/astra/0131.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20bending%20metal-0.mp4"><img src="docs/previews/opus/0131.webp" width="24%" alt="Opus 5.5"></a></p>

**A person is brushing teeth** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20brushing%20teeth-0.mp4"><img src="docs/previews/h3/0132.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20brushing%20teeth-0.mp4"><img src="docs/previews/astra/0132.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20brushing%20teeth-0.mp4"><img src="docs/previews/opus/0132.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20brushing%20teeth-0.mp4"><img src="docs/previews/sol/0132.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is catching or throwing baseball** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20catching%20or%20throwing%20baseball-0.mp4"><img src="docs/previews/h3/0135.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20catching%20or%20throwing%20baseball-0.mp4"><img src="docs/previews/astra/0135.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20catching%20or%20throwing%20baseball-0.mp4"><img src="docs/previews/opus/0135.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20catching%20or%20throwing%20baseball-0.mp4"><img src="docs/previews/sol/0135.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is cheerleading** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20cheerleading-1.mp4"><img src="docs/previews/h3/0137.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20cheerleading-1.mp4"><img src="docs/previews/astra/0137.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20cheerleading-1.mp4"><img src="docs/previews/opus/0137.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20cheerleading-1.mp4"><img src="docs/previews/sol/0137.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is clay pottery making** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20clay%20pottery%20making-0.mp4"><img src="docs/previews/h3/0139.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20clay%20pottery%20making-0.mp4"><img src="docs/previews/astra/0139.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20clay%20pottery%20making-0.mp4"><img src="docs/previews/opus/0139.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20clay%20pottery%20making-0.mp4"><img src="docs/previews/sol/0139.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is climbing a rope** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20climbing%20a%20rope-1.mp4"><img src="docs/previews/h3/0141.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20climbing%20a%20rope-1.mp4"><img src="docs/previews/astra/0141.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20climbing%20a%20rope-1.mp4"><img src="docs/previews/opus/0141.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20climbing%20a%20rope-1.mp4"><img src="docs/previews/sol/0141.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is cutting watermelon** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20cutting%20watermelon-0.mp4"><img src="docs/previews/h3/0146.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20cutting%20watermelon-0.mp4"><img src="docs/previews/astra/0146.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20cutting%20watermelon-0.mp4"><img src="docs/previews/opus/0146.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20cutting%20watermelon-0.mp4"><img src="docs/previews/sol/0146.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is digging** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20digging-3.mp4"><img src="docs/previews/h3/0148.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20digging-3.mp4"><img src="docs/previews/astra/0148.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20digging-3.mp4"><img src="docs/previews/opus/0148.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20digging-3.mp4"><img src="docs/previews/sol/0148.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is doing laundry** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20doing%20laundry-0.mp4"><img src="docs/previews/h3/0150.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20doing%20laundry-0.mp4"><img src="docs/previews/astra/0150.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20doing%20laundry-0.mp4"><img src="docs/previews/opus/0150.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20doing%20laundry-0.mp4"><img src="docs/previews/sol/0150.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is flying kite** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20flying%20kite-0.mp4"><img src="docs/previews/h3/0157.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20flying%20kite-0.mp4"><img src="docs/previews/astra/0157.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20flying%20kite-0.mp4"><img src="docs/previews/opus/0157.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20flying%20kite-0.mp4"><img src="docs/previews/sol/0157.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is giving or receiving award** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20giving%20or%20receiving%20award-0.mp4"><img src="docs/previews/h3/0160.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20giving%20or%20receiving%20award-0.mp4"><img src="docs/previews/astra/0160.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20giving%20or%20receiving%20award-0.mp4"><img src="docs/previews/opus/0160.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20giving%20or%20receiving%20award-0.mp4"><img src="docs/previews/sol/0160.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is knitting** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20knitting-0.mp4"><img src="docs/previews/h3/0168.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20knitting-0.mp4"><img src="docs/previews/astra/0168.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20knitting-0.mp4"><img src="docs/previews/opus/0168.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20knitting-0.mp4"><img src="docs/previews/sol/0168.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is making bed** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20making%20bed-3.mp4"><img src="docs/previews/h3/0170.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20making%20bed-3.mp4"><img src="docs/previews/astra/0170.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20making%20bed-3.mp4"><img src="docs/previews/opus/0170.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20making%20bed-3.mp4"><img src="docs/previews/sol/0170.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is marching** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20marching-1.mp4"><img src="docs/previews/h3/0172.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20marching-1.mp4"><img src="docs/previews/astra/0172.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20marching-1.mp4"><img src="docs/previews/opus/0172.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20marching-1.mp4"><img src="docs/previews/sol/0172.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is massaging legs** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20massaging%20legs-1.mp4"><img src="docs/previews/h3/0173.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20massaging%20legs-1.mp4"><img src="docs/previews/astra/0173.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20massaging%20legs-1.mp4"><img src="docs/previews/opus/0173.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20massaging%20legs-1.mp4"><img src="docs/previews/sol/0173.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is motorcycling** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20motorcycling-0.mp4"><img src="docs/previews/h3/0175.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20motorcycling-0.mp4"><img src="docs/previews/astra/0175.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20motorcycling-0.mp4"><img src="docs/previews/opus/0175.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20motorcycling-0.mp4"><img src="docs/previews/sol/0175.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is petting animal (not cat)** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20petting%20animal%20%28not%20cat%29-0.mp4"><img src="docs/previews/h3/0177.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20petting%20animal%20%28not%20cat%29-0.mp4"><img src="docs/previews/astra/0177.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20petting%20animal%20%28not%20cat%29-0.mp4"><img src="docs/previews/opus/0177.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20petting%20animal%20%28not%20cat%29-0.mp4"><img src="docs/previews/sol/0177.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is planting trees** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20planting%20trees-0.mp4"><img src="docs/previews/h3/0178.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20planting%20trees-0.mp4"><img src="docs/previews/astra/0178.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20planting%20trees-0.mp4"><img src="docs/previews/opus/0178.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20planting%20trees-0.mp4"><img src="docs/previews/sol/0178.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is playing chess** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20playing%20chess-0.mp4"><img src="docs/previews/h3/0179.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20playing%20chess-0.mp4"><img src="docs/previews/astra/0179.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20playing%20chess-0.mp4"><img src="docs/previews/opus/0179.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20playing%20chess-0.mp4"><img src="docs/previews/sol/0179.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is playing flute** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20playing%20flute-0.mp4"><img src="docs/previews/h3/0181.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20playing%20flute-0.mp4"><img src="docs/previews/astra/0181.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20playing%20flute-0.mp4"><img src="docs/previews/opus/0181.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20playing%20flute-0.mp4"><img src="docs/previews/sol/0181.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is push up** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20push%20up-4.mp4"><img src="docs/previews/h3/0185.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20push%20up-4.mp4"><img src="docs/previews/astra/0185.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20push%20up-4.mp4"><img src="docs/previews/opus/0185.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20push%20up-4.mp4"><img src="docs/previews/sol/0185.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is pushing cart** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20pushing%20cart-0.mp4"><img src="docs/previews/h3/0186.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20pushing%20cart-0.mp4"><img src="docs/previews/astra/0186.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20pushing%20cart-0.mp4"><img src="docs/previews/opus/0186.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20pushing%20cart-0.mp4"><img src="docs/previews/sol/0186.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is riding scooter** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20riding%20scooter-1.mp4"><img src="docs/previews/h3/0190.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20riding%20scooter-1.mp4"><img src="docs/previews/astra/0190.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20riding%20scooter-1.mp4"><img src="docs/previews/opus/0190.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20riding%20scooter-1.mp4"><img src="docs/previews/sol/0190.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is robot dancing** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20robot%20dancing-0.mp4"><img src="docs/previews/h3/0191.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20robot%20dancing-0.mp4"><img src="docs/previews/astra/0191.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20robot%20dancing-0.mp4"><img src="docs/previews/opus/0191.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20robot%20dancing-0.mp4"><img src="docs/previews/sol/0191.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is rock climbing** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20rock%20climbing-0.mp4"><img src="docs/previews/h3/0192.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20rock%20climbing-0.mp4"><img src="docs/previews/astra/0192.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20rock%20climbing-0.mp4"><img src="docs/previews/opus/0192.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20rock%20climbing-0.mp4"><img src="docs/previews/sol/0192.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is rock scissors paper** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20rock%20scissors%20paper-0.mp4"><img src="docs/previews/h3/0193.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20rock%20scissors%20paper-0.mp4"><img src="docs/previews/astra/0193.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20rock%20scissors%20paper-0.mp4"><img src="docs/previews/opus/0193.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20rock%20scissors%20paper-0.mp4"><img src="docs/previews/sol/0193.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is sharpening knives** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20sharpening%20knives-0.mp4"><img src="docs/previews/h3/0199.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20sharpening%20knives-0.mp4"><img src="docs/previews/astra/0199.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20sharpening%20knives-0.mp4"><img src="docs/previews/opus/0199.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20sharpening%20knives-0.mp4"><img src="docs/previews/sol/0199.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is shining shoes** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20shining%20shoes-0.mp4"><img src="docs/previews/h3/0200.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20shining%20shoes-0.mp4"><img src="docs/previews/astra/0200.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20shining%20shoes-0.mp4"><img src="docs/previews/opus/0200.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20shining%20shoes-0.mp4"><img src="docs/previews/sol/0200.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is shooting basketball** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20shooting%20basketball-2.mp4"><img src="docs/previews/h3/0201.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20shooting%20basketball-2.mp4"><img src="docs/previews/astra/0201.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20shooting%20basketball-2.mp4"><img src="docs/previews/opus/0201.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20shooting%20basketball-2.mp4"><img src="docs/previews/sol/0201.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is skydiving** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20skydiving-4.mp4"><img src="docs/previews/h3/0205.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20skydiving-4.mp4"><img src="docs/previews/astra/0205.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20skydiving-4.mp4"><img src="docs/previews/opus/0205.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20skydiving-4.mp4"><img src="docs/previews/sol/0205.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is tai chi** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20tai%20chi-0.mp4"><img src="docs/previews/h3/0213.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20tai%20chi-0.mp4"><img src="docs/previews/astra/0213.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20tai%20chi-0.mp4"><img src="docs/previews/opus/0213.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20tai%20chi-0.mp4"><img src="docs/previews/sol/0213.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is taking a shower** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20taking%20a%20shower-0.mp4"><img src="docs/previews/h3/0214.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20taking%20a%20shower-0.mp4"><img src="docs/previews/astra/0214.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20taking%20a%20shower-0.mp4"><img src="docs/previews/opus/0214.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20taking%20a%20shower-0.mp4"><img src="docs/previews/sol/0214.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is tasting beer** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20tasting%20beer-0.mp4"><img src="docs/previews/h3/0215.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20tasting%20beer-0.mp4"><img src="docs/previews/astra/0215.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20tasting%20beer-0.mp4"><img src="docs/previews/opus/0215.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20tasting%20beer-0.mp4"><img src="docs/previews/sol/0215.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is washing dishes** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20washing%20dishes-0.mp4"><img src="docs/previews/h3/0220.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20washing%20dishes-0.mp4"><img src="docs/previews/astra/0220.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20washing%20dishes-0.mp4"><img src="docs/previews/opus/0220.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20washing%20dishes-0.mp4"><img src="docs/previews/sol/0220.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is writing** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/A%20person%20is%20writing-0.mp4"><img src="docs/previews/h3/0223.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/A%20person%20is%20writing-0.mp4"><img src="docs/previews/astra/0223.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/A%20person%20is%20writing-0.mp4"><img src="docs/previews/opus/0223.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/A%20person%20is%20writing-0.mp4"><img src="docs/previews/sol/0223.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**A person is archery**

<p><img src="docs/previews/h3/0125.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0125.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0125.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0125.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is barbequing**

<p><img src="docs/previews/h3/0129.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0129.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0129.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0129.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is bungee jumping**

<p><img src="docs/previews/h3/0133.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0133.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0133.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0133.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is canoeing or kayaking**

<p><img src="docs/previews/h3/0134.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0134.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0134.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0134.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is catching or throwing frisbee**

<p><img src="docs/previews/h3/0136.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0136.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0136.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0136.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is clapping**

<p><img src="docs/previews/h3/0138.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0138.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0138.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0138.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is cleaning windows**

<p><img src="docs/previews/h3/0140.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0140.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0140.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0140.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is counting money**

<p><img src="docs/previews/h3/0142.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0142.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0142.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0142.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is crawling baby**

<p><img src="docs/previews/h3/0143.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0143.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0143.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0143.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is crying**

<p><img src="docs/previews/h3/0144.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0144.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0144.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0144.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is cutting nails**

<p><img src="docs/previews/h3/0145.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0145.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0145.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0145.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is dancing ballet**

<p><img src="docs/previews/h3/0147.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0147.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0147.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0147.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is doing aerobics**

<p><img src="docs/previews/h3/0149.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0149.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0149.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0149.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is drawing**

<p><img src="docs/previews/h3/0151.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0151.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0151.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0151.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is driving car**

<p><img src="docs/previews/h3/0152.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0152.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0152.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0152.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is dunking basketball**

<p><img src="docs/previews/h3/0153.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0153.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0153.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0153.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is eating watermelon**

<p><img src="docs/previews/h3/0154.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0154.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0154.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0154.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is filling eyebrows**

<p><img src="docs/previews/h3/0155.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0155.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0155.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0155.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is finger snapping**

<p><img src="docs/previews/h3/0156.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0156.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0156.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0156.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is folding clothes**

<p><img src="docs/previews/h3/0158.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0158.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0158.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0158.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is getting a haircut**

<p><img src="docs/previews/h3/0159.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0159.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0159.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0159.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is grooming dog**

<p><img src="docs/previews/h3/0161.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0161.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0161.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0161.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is hugging**

<p><img src="docs/previews/h3/0162.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0162.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0162.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0162.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is hula hooping**

<p><img src="docs/previews/h3/0163.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0163.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0163.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0163.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is ice skating**

<p><img src="docs/previews/h3/0164.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0164.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0164.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0164.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is ironing**

<p><img src="docs/previews/h3/0165.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0165.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0165.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0165.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is jogging**

<p><img src="docs/previews/h3/0166.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0166.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0166.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0166.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is kissing**

<p><img src="docs/previews/h3/0167.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0167.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0167.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0167.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is laughing**

<p><img src="docs/previews/h3/0169.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0169.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0169.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0169.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is making snowman**

<p><img src="docs/previews/h3/0171.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0171.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0171.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0171.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is milking cow**

<p><img src="docs/previews/h3/0174.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0174.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0174.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0174.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is peeling apples**

<p><img src="docs/previews/h3/0176.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0176.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0176.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0176.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is playing controller**

<p><img src="docs/previews/h3/0180.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0180.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0180.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0180.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is playing harp**

<p><img src="docs/previews/h3/0182.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0182.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0182.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0182.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is playing piano**

<p><img src="docs/previews/h3/0183.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0183.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0183.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0183.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is playing trumpet**

<p><img src="docs/previews/h3/0184.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0184.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0184.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0184.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is reading book**

<p><img src="docs/previews/h3/0187.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0187.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0187.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0187.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is riding a bike**

<p><img src="docs/previews/h3/0188.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0188.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0188.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0188.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is riding or walking with horse**

<p><img src="docs/previews/h3/0189.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0189.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0189.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0189.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is roller skating**

<p><img src="docs/previews/h3/0194.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0194.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0194.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0194.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is running on treadmill**

<p><img src="docs/previews/h3/0195.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0195.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0195.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0195.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is sailing**

<p><img src="docs/previews/h3/0196.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0196.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0196.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0196.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is shaking hands**

<p><img src="docs/previews/h3/0197.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0197.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0197.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0197.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is shaking head**

<p><img src="docs/previews/h3/0198.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0198.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0198.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0198.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is shooting goal (soccer)**

<p><img src="docs/previews/h3/0202.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0202.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0202.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0202.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is shuffling cards**

<p><img src="docs/previews/h3/0203.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0203.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0203.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0203.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is skateboarding**

<p><img src="docs/previews/h3/0204.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0204.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0204.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0204.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is smoking**

<p><img src="docs/previews/h3/0206.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0206.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0206.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0206.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is squat**

<p><img src="docs/previews/h3/0207.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0207.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0207.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0207.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is sticking tongue out**

<p><img src="docs/previews/h3/0208.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0208.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0208.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0208.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is stretching leg**

<p><img src="docs/previews/h3/0209.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0209.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0209.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0209.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is strumming guitar**

<p><img src="docs/previews/h3/0210.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0210.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0210.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0210.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is sweeping floor**

<p><img src="docs/previews/h3/0211.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0211.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0211.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0211.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is sword fighting**

<p><img src="docs/previews/h3/0212.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0212.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0212.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0212.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is throwing axe**

<p><img src="docs/previews/h3/0216.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0216.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0216.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0216.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is trimming or shaving beard**

<p><img src="docs/previews/h3/0217.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0217.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0217.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0217.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is tying tie**

<p><img src="docs/previews/h3/0218.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0218.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0218.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0218.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is using computer**

<p><img src="docs/previews/h3/0219.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0219.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0219.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0219.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is washing hands**

<p><img src="docs/previews/h3/0221.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0221.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0221.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0221.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A person is wrestling**

<p><img src="docs/previews/h3/0222.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0222.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0222.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0222.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Multiple objects

**a banana and a keyboard** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20banana%20and%20a%20keyboard-2.mp4"><img src="docs/previews/h3/0425.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20banana%20and%20a%20keyboard-2.mp4"><img src="docs/previews/astra/0425.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20banana%20and%20a%20keyboard-2.mp4"><img src="docs/previews/opus/0425.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20banana%20and%20a%20keyboard-2.mp4"><img src="docs/previews/sol/0425.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a bowl and a remote** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20bowl%20and%20a%20remote-2.mp4"><img src="docs/previews/h3/0490.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20bowl%20and%20a%20remote-2.mp4"><img src="docs/previews/astra/0490.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20bowl%20and%20a%20remote-2.mp4"><img src="docs/previews/opus/0490.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20bowl%20and%20a%20remote-2.mp4"><img src="docs/previews/sol/0490.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a bus and a traffic light** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20bus%20and%20a%20traffic%20light-0.mp4"><img src="docs/previews/h3/0494.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20bus%20and%20a%20traffic%20light-0.mp4"><img src="docs/previews/astra/0494.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20bus%20and%20a%20traffic%20light-0.mp4"><img src="docs/previews/opus/0494.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20bus%20and%20a%20traffic%20light-0.mp4"><img src="docs/previews/sol/0494.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a chair and a couch** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20chair%20and%20a%20couch-0.mp4"><img src="docs/previews/h3/0522.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20chair%20and%20a%20couch-0.mp4"><img src="docs/previews/astra/0522.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20chair%20and%20a%20couch-0.mp4"><img src="docs/previews/opus/0522.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20chair%20and%20a%20couch-0.mp4"><img src="docs/previews/sol/0522.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

<details><summary><b>Show more multiple objects prompts</b></summary>

**a clock and a backpack** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20clock%20and%20a%20backpack-2.mp4"><img src="docs/previews/h3/0525.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20clock%20and%20a%20backpack-2.mp4"><img src="docs/previews/astra/0525.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20clock%20and%20a%20backpack-2.mp4"><img src="docs/previews/opus/0525.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20clock%20and%20a%20backpack-2.mp4"><img src="docs/previews/sol/0525.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a handbag and a tie** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20handbag%20and%20a%20tie-0.mp4"><img src="docs/previews/h3/0583.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20handbag%20and%20a%20tie-0.mp4"><img src="docs/previews/astra/0583.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20handbag%20and%20a%20tie-0.mp4"><img src="docs/previews/opus/0583.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20handbag%20and%20a%20tie-0.mp4"><img src="docs/previews/sol/0583.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a motorcycle and a boat** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20motorcycle%20and%20a%20boat-2.mp4"><img src="docs/previews/h3/0613.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20motorcycle%20and%20a%20boat-2.mp4"><img src="docs/previews/astra/0613.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20motorcycle%20and%20a%20boat-2.mp4"><img src="docs/previews/opus/0613.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20motorcycle%20and%20a%20boat-2.mp4"><img src="docs/previews/sol/0613.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a person and a hair drier** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20person%20and%20a%20hair%20drier-4.mp4"><img src="docs/previews/h3/0624.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20person%20and%20a%20hair%20drier-4.mp4"><img src="docs/previews/astra/0624.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20person%20and%20a%20hair%20drier-4.mp4"><img src="docs/previews/opus/0624.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20person%20and%20a%20hair%20drier-4.mp4"><img src="docs/previews/sol/0624.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a pizza and a tie** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20pizza%20and%20a%20tie-0.mp4"><img src="docs/previews/h3/0645.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20pizza%20and%20a%20tie-0.mp4"><img src="docs/previews/astra/0645.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20pizza%20and%20a%20tie-0.mp4"><img src="docs/previews/opus/0645.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20pizza%20and%20a%20tie-0.mp4"><img src="docs/previews/sol/0645.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a potted plant and a tv** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20potted%20plant%20and%20a%20tv-2.mp4"><img src="docs/previews/h3/0649.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20potted%20plant%20and%20a%20tv-2.mp4"><img src="docs/previews/astra/0649.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20potted%20plant%20and%20a%20tv-2.mp4"><img src="docs/previews/opus/0649.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20potted%20plant%20and%20a%20tv-2.mp4"><img src="docs/previews/sol/0649.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a remote and a keyboard** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20remote%20and%20a%20keyboard-1.mp4"><img src="docs/previews/h3/0672.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20remote%20and%20a%20keyboard-1.mp4"><img src="docs/previews/astra/0672.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20remote%20and%20a%20keyboard-1.mp4"><img src="docs/previews/opus/0672.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20remote%20and%20a%20keyboard-1.mp4"><img src="docs/previews/sol/0672.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a teddy bear and a frisbee** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20teddy%20bear%20and%20a%20frisbee-0.mp4"><img src="docs/previews/h3/0731.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20teddy%20bear%20and%20a%20frisbee-0.mp4"><img src="docs/previews/astra/0731.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20teddy%20bear%20and%20a%20frisbee-0.mp4"><img src="docs/previews/opus/0731.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20teddy%20bear%20and%20a%20frisbee-0.mp4"><img src="docs/previews/sol/0731.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a tennis racket and a bottle** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20tennis%20racket%20and%20a%20bottle-0.mp4"><img src="docs/previews/h3/0735.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20tennis%20racket%20and%20a%20bottle-0.mp4"><img src="docs/previews/astra/0735.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20tennis%20racket%20and%20a%20bottle-0.mp4"><img src="docs/previews/opus/0735.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20tennis%20racket%20and%20a%20bottle-0.mp4"><img src="docs/previews/sol/0735.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a toilet and a hair drier** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20toilet%20and%20a%20hair%20drier-1.mp4"><img src="docs/previews/h3/0744.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20toilet%20and%20a%20hair%20drier-1.mp4"><img src="docs/previews/astra/0744.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20toilet%20and%20a%20hair%20drier-1.mp4"><img src="docs/previews/opus/0744.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20toilet%20and%20a%20hair%20drier-1.mp4"><img src="docs/previews/sol/0744.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a traffic light and a fire hydrant** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20traffic%20light%20and%20a%20fire%20hydrant-0.mp4"><img src="docs/previews/h3/0751.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20traffic%20light%20and%20a%20fire%20hydrant-0.mp4"><img src="docs/previews/astra/0751.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20traffic%20light%20and%20a%20fire%20hydrant-0.mp4"><img src="docs/previews/opus/0751.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20traffic%20light%20and%20a%20fire%20hydrant-0.mp4"><img src="docs/previews/sol/0751.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a truck and a bicycle** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20truck%20and%20a%20bicycle-1.mp4"><img src="docs/previews/h3/0762.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20truck%20and%20a%20bicycle-1.mp4"><img src="docs/previews/astra/0762.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20truck%20and%20a%20bicycle-1.mp4"><img src="docs/previews/opus/0762.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20truck%20and%20a%20bicycle-1.mp4"><img src="docs/previews/sol/0762.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a zebra and a giraffe** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20zebra%20and%20a%20giraffe-2.mp4"><img src="docs/previews/h3/0797.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20zebra%20and%20a%20giraffe-2.mp4"><img src="docs/previews/astra/0797.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20zebra%20and%20a%20giraffe-2.mp4"><img src="docs/previews/opus/0797.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20zebra%20and%20a%20giraffe-2.mp4"><img src="docs/previews/sol/0797.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**an apple and a cell phone** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/an%20apple%20and%20a%20cell%20phone-1.mp4"><img src="docs/previews/h3/0812.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/an%20apple%20and%20a%20cell%20phone-1.mp4"><img src="docs/previews/astra/0812.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/an%20apple%20and%20a%20cell%20phone-1.mp4"><img src="docs/previews/opus/0812.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/an%20apple%20and%20a%20cell%20phone-1.mp4"><img src="docs/previews/sol/0812.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**an elephant and a bear** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/an%20elephant%20and%20a%20bear-0.mp4"><img src="docs/previews/h3/0816.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/an%20elephant%20and%20a%20bear-0.mp4"><img src="docs/previews/astra/0816.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/an%20elephant%20and%20a%20bear-0.mp4"><img src="docs/previews/opus/0816.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/an%20elephant%20and%20a%20bear-0.mp4"><img src="docs/previews/sol/0816.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**broccoli and a backpack** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/broccoli%20and%20a%20backpack-4.mp4"><img src="docs/previews/h3/0857.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/broccoli%20and%20a%20backpack-4.mp4"><img src="docs/previews/astra/0857.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/broccoli%20and%20a%20backpack-4.mp4"><img src="docs/previews/opus/0857.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/broccoli%20and%20a%20backpack-4.mp4"><img src="docs/previews/sol/0857.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**skis and a snowboard** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/skis%20and%20a%20snowboard-0.mp4"><img src="docs/previews/h3/0924.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/skis%20and%20a%20snowboard-0.mp4"><img src="docs/previews/astra/0924.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/skis%20and%20a%20snowboard-0.mp4"><img src="docs/previews/opus/0924.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/skis%20and%20a%20snowboard-0.mp4"><img src="docs/previews/sol/0924.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a backpack and an umbrella**

<p><img src="docs/previews/h3/0423.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0423.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0423.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0423.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a baseball bat and a baseball glove**

<p><img src="docs/previews/h3/0429.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0429.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0429.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0429.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a baseball glove and a skateboard**

<p><img src="docs/previews/h3/0432.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0432.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0432.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0432.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bear and a zebra**

<p><img src="docs/previews/h3/0435.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0435.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0435.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0435.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bicycle and a car**

<p><img src="docs/previews/h3/0447.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0447.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0447.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0447.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bicycle and an airplane**

<p><img src="docs/previews/h3/0448.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0448.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0448.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0448.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bird and a cat**

<p><img src="docs/previews/h3/0454.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0454.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0454.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0454.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a boat and an airplane**

<p><img src="docs/previews/h3/0480.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0480.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0480.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0480.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a book and a clock**

<p><img src="docs/previews/h3/0485.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0485.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0485.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0485.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bottle and a chair**

<p><img src="docs/previews/h3/0487.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0487.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0487.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0487.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cake and a vase**

<p><img src="docs/previews/h3/0499.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0499.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0499.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0499.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car and a motorcycle**

<p><img src="docs/previews/h3/0502.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0502.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0502.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0502.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car and a train**

<p><img src="docs/previews/h3/0503.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0503.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0503.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0503.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a carrot and an umbrella**

<p><img src="docs/previews/h3/0509.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0509.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0509.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0509.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat and a dog**

<p><img src="docs/previews/h3/0513.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0513.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0513.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0513.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cell phone and a book**

<p><img src="docs/previews/h3/0520.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0520.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0520.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0520.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a couch and a potted plant**

<p><img src="docs/previews/h3/0528.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0528.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0528.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0528.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cow and an elephant**

<p><img src="docs/previews/h3/0531.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0531.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0531.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0531.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cup and a couch**

<p><img src="docs/previews/h3/0537.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0537.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0537.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0537.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dog and a horse**

<p><img src="docs/previews/h3/0543.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0543.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0543.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0543.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a donut and a suitcase**

<p><img src="docs/previews/h3/0550.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0550.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0550.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0550.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a fire hydrant and a stop sign** <sub>· no GPT-6 Astra clip</sub>

<p><img src="docs/previews/h3/0556.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/opus/0556.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0556.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a fork and a potted plant**

<p><img src="docs/previews/h3/0559.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0559.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0559.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0559.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a frisbee and skis**

<p><img src="docs/previews/h3/0562.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0562.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0562.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0562.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a giraffe and a bird**

<p><img src="docs/previews/h3/0565.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0565.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0565.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0565.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a hair drier and a toothbrush**

<p><img src="docs/previews/h3/0580.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0580.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0580.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0580.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse and a sheep**

<p><img src="docs/previews/h3/0585.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0585.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0585.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0585.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a hot dog and a handbag**

<p><img src="docs/previews/h3/0592.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0592.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0592.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0592.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a keyboard and a cell phone**

<p><img src="docs/previews/h3/0596.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0596.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0596.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0596.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a kite and a baseball bat**

<p><img src="docs/previews/h3/0598.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0598.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0598.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0598.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a knife and a tv**

<p><img src="docs/previews/h3/0602.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0602.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0602.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0602.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a laptop and a remote**

<p><img src="docs/previews/h3/0605.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0605.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0605.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0605.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a microwave and a frisbee**

<p><img src="docs/previews/h3/0608.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0608.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0608.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0608.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle and a bus**

<p><img src="docs/previews/h3/0614.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0614.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0614.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0614.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a parking meter and a truck**

<p><img src="docs/previews/h3/0621.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0621.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0621.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0621.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person and a sink**

<p><img src="docs/previews/h3/0625.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0625.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0625.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0625.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person and a toilet**

<p><img src="docs/previews/h3/0626.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0626.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0626.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0626.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person and a toothbrush**

<p><img src="docs/previews/h3/0627.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0627.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0627.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0627.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a refrigerator and skis**

<p><img src="docs/previews/h3/0670.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0670.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0670.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0670.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sandwich and a book**

<p><img src="docs/previews/h3/0675.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0675.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0675.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0675.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sheep and a cow**

<p><img src="docs/previews/h3/0699.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0699.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0699.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0699.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sink and a toilet**

<p><img src="docs/previews/h3/0705.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0705.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0705.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0705.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a skateboard and a surfboard**

<p><img src="docs/previews/h3/0708.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0708.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0708.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0708.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a snowboard and a sports ball**

<p><img src="docs/previews/h3/0712.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0712.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0712.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0712.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a spoon and a laptop**

<p><img src="docs/previews/h3/0716.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0716.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0716.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0716.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sports ball and a kite**

<p><img src="docs/previews/h3/0719.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0719.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0719.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0719.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a stop sign and a parking meter**

<p><img src="docs/previews/h3/0722.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0722.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0722.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0722.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a suitcase and a vase**

<p><img src="docs/previews/h3/0725.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0725.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0725.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0725.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a surfboard and a tennis racket**

<p><img src="docs/previews/h3/0727.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0727.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0727.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0727.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a tie and a suitcase**

<p><img src="docs/previews/h3/0738.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0738.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0738.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0738.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toaster and a teddy bear**

<p><img src="docs/previews/h3/0740.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0740.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0740.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0740.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toothbrush and a sink**

<p><img src="docs/previews/h3/0748.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0748.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0748.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0748.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a train and a boat**

<p><img src="docs/previews/h3/0755.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0755.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0755.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0755.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a tv and a laptop**

<p><img src="docs/previews/h3/0768.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0768.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0768.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0768.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a vase and scissors**

<p><img src="docs/previews/h3/0771.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0771.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0771.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0771.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a wine glass and a chair**

<p><img src="docs/previews/h3/0784.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0784.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0784.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0784.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an airplane and a train**

<p><img src="docs/previews/h3/0806.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0806.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0806.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0806.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange and a clock**

<p><img src="docs/previews/h3/0823.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0823.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0823.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0823.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an oven and scissors**

<p><img src="docs/previews/h3/0837.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0837.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0837.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0837.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an umbrella and a handbag**

<p><img src="docs/previews/h3/0841.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0841.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0841.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0841.webp" width="24%" alt="GPT-6.1-Sol"></p>

**scissors and a teddy bear**

<p><img src="docs/previews/h3/0919.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0919.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0919.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0919.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Spatial relationship

**a baseball glove on the right of a tennis racket, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20baseball%20glove%20on%20the%20right%20of%20a%20tennis%20racket%2C%20front%20view-0.mp4"><img src="docs/previews/h3/0433.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20baseball%20glove%20on%20the%20right%20of%20a%20tennis%20racket%2C%20front%20view-0.mp4"><img src="docs/previews/astra/0433.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20baseball%20glove%20on%20the%20right%20of%20a%20tennis%20racket%2C%20front%20view-0.mp4"><img src="docs/previews/opus/0433.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20baseball%20glove%20on%20the%20right%20of%20a%20tennis%20racket%2C%20front%20view-0.mp4"><img src="docs/previews/sol/0433.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a bear on the right of a zebra, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20bear%20on%20the%20right%20of%20a%20zebra%2C%20front%20view-0.mp4"><img src="docs/previews/h3/0439.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20bear%20on%20the%20right%20of%20a%20zebra%2C%20front%20view-0.mp4"><img src="docs/previews/astra/0439.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20bear%20on%20the%20right%20of%20a%20zebra%2C%20front%20view-0.mp4"><img src="docs/previews/opus/0439.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20bear%20on%20the%20right%20of%20a%20zebra%2C%20front%20view-0.mp4"><img src="docs/previews/sol/0439.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a bicycle on the left of a car, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20bicycle%20on%20the%20left%20of%20a%20car%2C%20front%20view-0.mp4"><img src="docs/previews/h3/0451.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20bicycle%20on%20the%20left%20of%20a%20car%2C%20front%20view-0.mp4"><img src="docs/previews/astra/0451.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20bicycle%20on%20the%20left%20of%20a%20car%2C%20front%20view-0.mp4"><img src="docs/previews/opus/0451.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20bicycle%20on%20the%20left%20of%20a%20car%2C%20front%20view-0.mp4"><img src="docs/previews/sol/0451.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a bowl on the left of a bottle, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0491.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0491.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0491.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0491.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more spatial relationship prompts</b></summary>

**a car on the right of a motorcycle, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20car%20on%20the%20right%20of%20a%20motorcycle%2C%20front%20view-0.mp4"><img src="docs/previews/h3/0504.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20car%20on%20the%20right%20of%20a%20motorcycle%2C%20front%20view-0.mp4"><img src="docs/previews/astra/0504.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20car%20on%20the%20right%20of%20a%20motorcycle%2C%20front%20view-0.mp4"><img src="docs/previews/opus/0504.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20car%20on%20the%20right%20of%20a%20motorcycle%2C%20front%20view-0.mp4"><img src="docs/previews/sol/0504.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a couch on the right of a bed, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0529.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0529.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0529.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0529.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cup on the left of a fork, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0538.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0538.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0538.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0538.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a donut on the top of broccoli, front view** <sub>· ↻ VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20donut%20on%20the%20top%20of%20broccoli%2C%20front%20view-1.mp4"><img src="docs/previews/h3/0552.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20donut%20on%20the%20top%20of%20broccoli%2C%20front%20view-1.mp4"><img src="docs/previews/astra/0552.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20donut%20on%20the%20top%20of%20broccoli%2C%20front%20view-1.mp4"><img src="docs/previews/opus/0552.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20donut%20on%20the%20top%20of%20broccoli%2C%20front%20view-1.mp4"><img src="docs/previews/sol/0552.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a fork on the right of a knife, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0560.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0560.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0560.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0560.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a frisbee on the left of a sports ball, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0563.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0563.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0563.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0563.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse on the right of a sheep, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0588.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0588.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0588.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0588.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a knife on the left of a spoon, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0603.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0603.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0603.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0603.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a microwave on the top of an oven, front view** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20microwave%20on%20the%20top%20of%20an%20oven%2C%20front%20view-3.mp4"><img src="docs/previews/h3/0610.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20microwave%20on%20the%20top%20of%20an%20oven%2C%20front%20view-3.mp4"><img src="docs/previews/astra/0610.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20microwave%20on%20the%20top%20of%20an%20oven%2C%20front%20view-3.mp4"><img src="docs/previews/opus/0610.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20microwave%20on%20the%20top%20of%20an%20oven%2C%20front%20view-3.mp4"><img src="docs/previews/sol/0610.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a pizza on the bottom of a donut, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20pizza%20on%20the%20bottom%20of%20a%20donut%2C%20front%20view-3.mp4"><img src="docs/previews/h3/0646.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20pizza%20on%20the%20bottom%20of%20a%20donut%2C%20front%20view-3.mp4"><img src="docs/previews/astra/0646.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20pizza%20on%20the%20bottom%20of%20a%20donut%2C%20front%20view-3.mp4"><img src="docs/previews/opus/0646.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20pizza%20on%20the%20bottom%20of%20a%20donut%2C%20front%20view-3.mp4"><img src="docs/previews/sol/0646.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a sheep on the left of a cow, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20sheep%20on%20the%20left%20of%20a%20cow%2C%20front%20view-3.mp4"><img src="docs/previews/h3/0701.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20sheep%20on%20the%20left%20of%20a%20cow%2C%20front%20view-3.mp4"><img src="docs/previews/astra/0701.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20sheep%20on%20the%20left%20of%20a%20cow%2C%20front%20view-3.mp4"><img src="docs/previews/opus/0701.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20sheep%20on%20the%20left%20of%20a%20cow%2C%20front%20view-3.mp4"><img src="docs/previews/sol/0701.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a snowboard on the bottom of a kite, front view** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20snowboard%20on%20the%20bottom%20of%20a%20kite%2C%20front%20view-1.mp4"><img src="docs/previews/h3/0713.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20snowboard%20on%20the%20bottom%20of%20a%20kite%2C%20front%20view-1.mp4"><img src="docs/previews/astra/0713.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20snowboard%20on%20the%20bottom%20of%20a%20kite%2C%20front%20view-1.mp4"><img src="docs/previews/opus/0713.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20snowboard%20on%20the%20bottom%20of%20a%20kite%2C%20front%20view-1.mp4"><img src="docs/previews/sol/0713.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a spoon on the right of a bowl, front view** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20spoon%20on%20the%20right%20of%20a%20bowl%2C%20front%20view-1.mp4"><img src="docs/previews/h3/0717.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20spoon%20on%20the%20right%20of%20a%20bowl%2C%20front%20view-1.mp4"><img src="docs/previews/astra/0717.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20spoon%20on%20the%20right%20of%20a%20bowl%2C%20front%20view-1.mp4"><img src="docs/previews/opus/0717.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20spoon%20on%20the%20right%20of%20a%20bowl%2C%20front%20view-1.mp4"><img src="docs/previews/sol/0717.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a sports ball on the right of a baseball bat, front view** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20sports%20ball%20on%20the%20right%20of%20a%20baseball%20bat%2C%20front%20view-3.mp4"><img src="docs/previews/h3/0720.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20sports%20ball%20on%20the%20right%20of%20a%20baseball%20bat%2C%20front%20view-3.mp4"><img src="docs/previews/astra/0720.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20sports%20ball%20on%20the%20right%20of%20a%20baseball%20bat%2C%20front%20view-3.mp4"><img src="docs/previews/opus/0720.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20sports%20ball%20on%20the%20right%20of%20a%20baseball%20bat%2C%20front%20view-3.mp4"><img src="docs/previews/sol/0720.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a toothbrush on the left of a sink, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0749.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0749.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0749.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0749.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a traffic light on the left of a fire hydrant, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0752.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0752.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0752.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0752.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a train on the right of a boat, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0757.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0757.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0757.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0757.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck on the right of a bicycle, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20truck%20on%20the%20right%20of%20a%20bicycle%2C%20front%20view-1.mp4"><img src="docs/previews/h3/0763.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20truck%20on%20the%20right%20of%20a%20bicycle%2C%20front%20view-1.mp4"><img src="docs/previews/astra/0763.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20truck%20on%20the%20right%20of%20a%20bicycle%2C%20front%20view-1.mp4"><img src="docs/previews/opus/0763.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20truck%20on%20the%20right%20of%20a%20bicycle%2C%20front%20view-1.mp4"><img src="docs/previews/sol/0763.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a tv on the right of a dining table, front view** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20tv%20on%20the%20right%20of%20a%20dining%20table%2C%20front%20view-1.mp4"><img src="docs/previews/h3/0769.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20tv%20on%20the%20right%20of%20a%20dining%20table%2C%20front%20view-1.mp4"><img src="docs/previews/astra/0769.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20tv%20on%20the%20right%20of%20a%20dining%20table%2C%20front%20view-1.mp4"><img src="docs/previews/opus/0769.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20tv%20on%20the%20right%20of%20a%20dining%20table%2C%20front%20view-1.mp4"><img src="docs/previews/sol/0769.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a zebra on the left of a giraffe, front view** <sub>· VBench both high · no GPT-6.1-Sol clip</sub>

<p><img src="docs/previews/h3/0799.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0799.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0799.webp" width="24%" alt="Opus 5.5"></p>

**an airplane on the left of a train, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/an%20airplane%20on%20the%20left%20of%20a%20train%2C%20front%20view-4.mp4"><img src="docs/previews/h3/0808.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/an%20airplane%20on%20the%20left%20of%20a%20train%2C%20front%20view-4.mp4"><img src="docs/previews/astra/0808.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/an%20airplane%20on%20the%20left%20of%20a%20train%2C%20front%20view-4.mp4"><img src="docs/previews/opus/0808.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/an%20airplane%20on%20the%20left%20of%20a%20train%2C%20front%20view-4.mp4"><img src="docs/previews/sol/0808.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**an apple on the bottom of a sandwich, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/an%20apple%20on%20the%20bottom%20of%20a%20sandwich%2C%20front%20view-3.mp4"><img src="docs/previews/h3/0813.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/an%20apple%20on%20the%20bottom%20of%20a%20sandwich%2C%20front%20view-3.mp4"><img src="docs/previews/astra/0813.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/an%20apple%20on%20the%20bottom%20of%20a%20sandwich%2C%20front%20view-3.mp4"><img src="docs/previews/opus/0813.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/an%20apple%20on%20the%20bottom%20of%20a%20sandwich%2C%20front%20view-3.mp4"><img src="docs/previews/sol/0813.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**an orange on the top of a carrot, front view** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/an%20orange%20on%20the%20top%20of%20a%20carrot%2C%20front%20view-1.mp4"><img src="docs/previews/h3/0832.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/an%20orange%20on%20the%20top%20of%20a%20carrot%2C%20front%20view-1.mp4"><img src="docs/previews/astra/0832.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/an%20orange%20on%20the%20top%20of%20a%20carrot%2C%20front%20view-1.mp4"><img src="docs/previews/opus/0832.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/an%20orange%20on%20the%20top%20of%20a%20carrot%2C%20front%20view-1.mp4"><img src="docs/previews/sol/0832.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**scissors on the left of a teddy bear, front view** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0920.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0920.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0920.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0920.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a banana on the bottom of an apple, front view**

<p><img src="docs/previews/h3/0426.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0426.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0426.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0426.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a banana on the top of an apple, front view**

<p><img src="docs/previews/h3/0427.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0427.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0427.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0427.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a baseball bat on the left of a baseball glove, front view**

<p><img src="docs/previews/h3/0430.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0430.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0430.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0430.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bed on the left of a tv, front view**

<p><img src="docs/previews/h3/0442.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0442.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0442.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0442.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bench on the left of a truck, front view**

<p><img src="docs/previews/h3/0444.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0444.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0444.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0444.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bird on the left of a cat, front view**

<p><img src="docs/previews/h3/0457.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0457.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0457.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0457.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a boat on the left of an airplane, front view**

<p><img src="docs/previews/h3/0481.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0481.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0481.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0481.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bottle on the left of a wine glass, front view**

<p><img src="docs/previews/h3/0488.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0488.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0488.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0488.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bus on the right of a traffic light, front view**

<p><img src="docs/previews/h3/0495.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0495.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0495.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0495.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a carrot on the bottom of a hot dog, front view**

<p><img src="docs/previews/h3/0510.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0510.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0510.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0510.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a carrot on the top of a hot dog, front view**

<p><img src="docs/previews/h3/0511.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0511.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0511.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0511.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat on the right of a dog, front view**

<p><img src="docs/previews/h3/0516.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0516.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0516.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0516.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a chair on the left of a couch, front view**

<p><img src="docs/previews/h3/0523.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0523.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0523.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0523.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a clock on the left of a vase, front view**

<p><img src="docs/previews/h3/0526.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0526.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0526.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0526.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cow on the right of an elephant, front view**

<p><img src="docs/previews/h3/0534.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0534.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0534.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0534.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dining table on the left of a chair, front view**

<p><img src="docs/previews/h3/0541.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0541.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0541.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0541.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dog on the left of a horse, front view**

<p><img src="docs/previews/h3/0546.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0546.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0546.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0546.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a donut on the bottom of broccoli, front view**

<p><img src="docs/previews/h3/0551.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0551.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0551.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0551.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a fire hydrant on the right of a stop sign, front view**

<p><img src="docs/previews/h3/0557.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0557.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0557.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0557.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a giraffe on the right of a bird, front view**

<p><img src="docs/previews/h3/0567.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0567.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0567.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0567.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a hair drier on the right of a toothbrush, front view**

<p><img src="docs/previews/h3/0581.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0581.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0581.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0581.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a hot dog on the bottom of a pizza, front view**

<p><img src="docs/previews/h3/0593.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0593.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0593.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0593.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a hot dog on the top of a pizza, front view**

<p><img src="docs/previews/h3/0594.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0594.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0594.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0594.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a kite on the bottom of a skateboard, front view**

<p><img src="docs/previews/h3/0599.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0599.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0599.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0599.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a kite on the top of a skateboard, front view**

<p><img src="docs/previews/h3/0600.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0600.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0600.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0600.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a microwave on the bottom of an oven, front view**

<p><img src="docs/previews/h3/0609.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0609.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0609.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0609.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle on the left of a bus, front view**

<p><img src="docs/previews/h3/0617.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0617.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0617.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0617.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a parking meter on the right of a bench, front view**

<p><img src="docs/previews/h3/0622.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0622.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0622.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0622.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pizza on the top of a donut, front view**

<p><img src="docs/previews/h3/0647.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0647.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0647.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0647.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a potted plant on the left of a remote, front view**

<p><img src="docs/previews/h3/0650.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0650.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0650.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0650.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a remote on the right of a clock, front view**

<p><img src="docs/previews/h3/0673.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0673.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0673.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0673.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sandwich on the bottom of an orange, front view**

<p><img src="docs/previews/h3/0676.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0676.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0676.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0676.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sandwich on the top of an orange, front view**

<p><img src="docs/previews/h3/0677.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0677.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0677.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0677.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sink on the right of a toilet, front view**

<p><img src="docs/previews/h3/0706.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0706.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0706.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0706.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a skateboard on the bottom of a surfboard, front view**

<p><img src="docs/previews/h3/0709.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0709.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0709.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0709.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a skateboard on the top of a surfboard, front view**

<p><img src="docs/previews/h3/0710.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0710.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0710.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0710.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a snowboard on the top of a kite, front view**

<p><img src="docs/previews/h3/0714.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0714.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0714.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0714.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a stop sign on the left of a parking meter, front view**

<p><img src="docs/previews/h3/0723.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0723.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0723.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0723.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a surfboard on the bottom of skis, front view**

<p><img src="docs/previews/h3/0728.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0728.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0728.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0728.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a surfboard on the top of skis, front view**

<p><img src="docs/previews/h3/0729.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0729.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0729.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0729.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a teddy bear on the right of a potted plant, front view**

<p><img src="docs/previews/h3/0733.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0733.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0733.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0733.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a tennis racket on the left of a frisbee, front view**

<p><img src="docs/previews/h3/0736.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0736.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0736.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0736.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toaster on the bottom of a microwave, front view**

<p><img src="docs/previews/h3/0741.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0741.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0741.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0741.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toaster on the top of a microwave, front view**

<p><img src="docs/previews/h3/0742.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0742.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0742.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0742.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toilet on the left of a hair drier, front view**

<p><img src="docs/previews/h3/0745.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0745.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0745.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0745.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a vase on the right of scissors, front view**

<p><img src="docs/previews/h3/0772.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0772.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0772.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0772.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a wine glass on the right of a cup, front view**

<p><img src="docs/previews/h3/0785.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0785.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0785.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0785.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an apple on the top of a sandwich, front view**

<p><img src="docs/previews/h3/0814.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0814.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0814.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0814.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an elephant on the left of a bear, front view**

<p><img src="docs/previews/h3/0817.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0817.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0817.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0817.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange on the bottom of a carrot, front view**

<p><img src="docs/previews/h3/0831.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0831.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0831.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0831.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an oven on the bottom of a toaster, front view**

<p><img src="docs/previews/h3/0838.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0838.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0838.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0838.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an oven on the top of a toaster, front view**

<p><img src="docs/previews/h3/0839.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0839.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0839.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0839.webp" width="24%" alt="GPT-6.1-Sol"></p>

**broccoli on the bottom of a banana, front view**

<p><img src="docs/previews/h3/0858.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0858.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0858.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0858.webp" width="24%" alt="GPT-6.1-Sol"></p>

**broccoli on the top of a banana, front view**

<p><img src="docs/previews/h3/0859.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0859.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0859.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0859.webp" width="24%" alt="GPT-6.1-Sol"></p>

**skis on the bottom of a snowboard, front view**

<p><img src="docs/previews/h3/0925.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0925.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0925.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0925.webp" width="24%" alt="GPT-6.1-Sol"></p>

**skis on the top of a snowboard, front view**

<p><img src="docs/previews/h3/0926.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0926.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0926.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0926.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Color

**a black car** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20black%20car-1.mp4"><img src="docs/previews/h3/0463.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20black%20car-1.mp4"><img src="docs/previews/astra/0463.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20black%20car-1.mp4"><img src="docs/previews/opus/0463.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20black%20car-1.mp4"><img src="docs/previews/sol/0463.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a blue bowl** <sub>· VBench both high · no GPT-6.1-Sol clip</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20blue%20bowl-0.mp4"><img src="docs/previews/h3/0472.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20blue%20bowl-0.mp4"><img src="docs/previews/astra/0472.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20blue%20bowl-0.mp4"><img src="docs/previews/opus/0472.webp" width="24%" alt="Opus 5.5"></a></p>

**a blue car** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20blue%20car-0.mp4"><img src="docs/previews/h3/0473.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20blue%20car-0.mp4"><img src="docs/previews/astra/0473.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20blue%20car-0.mp4"><img src="docs/previews/opus/0473.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20blue%20car-0.mp4"><img src="docs/previews/sol/0473.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a green bicycle** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20green%20bicycle-1.mp4"><img src="docs/previews/h3/0571.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20green%20bicycle-1.mp4"><img src="docs/previews/astra/0571.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20green%20bicycle-1.mp4"><img src="docs/previews/opus/0571.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20green%20bicycle-1.mp4"><img src="docs/previews/sol/0571.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

<details><summary><b>Show more color prompts</b></summary>

**a green bowl** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20green%20bowl-2.mp4"><img src="docs/previews/h3/0573.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20green%20bowl-2.mp4"><img src="docs/previews/astra/0573.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20green%20bowl-2.mp4"><img src="docs/previews/opus/0573.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20green%20bowl-2.mp4"><img src="docs/previews/sol/0573.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a green clock** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20green%20clock-3.mp4"><img src="docs/previews/h3/0576.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20green%20clock-3.mp4"><img src="docs/previews/astra/0576.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20green%20clock-3.mp4"><img src="docs/previews/opus/0576.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20green%20clock-3.mp4"><img src="docs/previews/sol/0576.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a pink clock** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20pink%20clock-0.mp4"><img src="docs/previews/h3/0641.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20pink%20clock-0.mp4"><img src="docs/previews/astra/0641.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20pink%20clock-0.mp4"><img src="docs/previews/opus/0641.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20pink%20clock-0.mp4"><img src="docs/previews/sol/0641.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a purple chair** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20purple%20chair-1.mp4"><img src="docs/previews/h3/0656.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20purple%20chair-1.mp4"><img src="docs/previews/astra/0656.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20purple%20chair-1.mp4"><img src="docs/previews/opus/0656.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20purple%20chair-1.mp4"><img src="docs/previews/sol/0656.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a purple umbrella** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20purple%20umbrella-2.mp4"><img src="docs/previews/h3/0659.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20purple%20umbrella-2.mp4"><img src="docs/previews/astra/0659.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20purple%20umbrella-2.mp4"><img src="docs/previews/opus/0659.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20purple%20umbrella-2.mp4"><img src="docs/previews/sol/0659.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a white clock** <sub>· VBench both high</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20white%20clock-1.mp4"><img src="docs/previews/h3/0780.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20white%20clock-1.mp4"><img src="docs/previews/astra/0780.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20white%20clock-1.mp4"><img src="docs/previews/opus/0780.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20white%20clock-1.mp4"><img src="docs/previews/sol/0780.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**an orange clock** <sub>· ↻ VBench code↑ H3↓</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/an%20orange%20clock-0.mp4"><img src="docs/previews/h3/0830.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/an%20orange%20clock-0.mp4"><img src="docs/previews/astra/0830.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/an%20orange%20clock-0.mp4"><img src="docs/previews/opus/0830.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/an%20orange%20clock-0.mp4"><img src="docs/previews/sol/0830.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a black bicycle**

<p><img src="docs/previews/h3/0460.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0460.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0460.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0460.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black bird**

<p><img src="docs/previews/h3/0461.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0461.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0461.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0461.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black bowl**

<p><img src="docs/previews/h3/0462.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0462.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0462.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0462.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black cat**

<p><img src="docs/previews/h3/0464.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0464.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0464.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0464.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black chair**

<p><img src="docs/previews/h3/0465.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0465.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0465.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0465.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black clock**

<p><img src="docs/previews/h3/0466.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0466.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0466.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0466.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black suitcase**

<p><img src="docs/previews/h3/0467.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0467.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0467.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0467.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black umbrella**

<p><img src="docs/previews/h3/0468.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0468.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0468.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0468.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a black vase**

<p><img src="docs/previews/h3/0469.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0469.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0469.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0469.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue bicycle**

<p><img src="docs/previews/h3/0470.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0470.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0470.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0470.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue bird**

<p><img src="docs/previews/h3/0471.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0471.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0471.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0471.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue chair**

<p><img src="docs/previews/h3/0474.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0474.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0474.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0474.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue clock**

<p><img src="docs/previews/h3/0475.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0475.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0475.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0475.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue suitcase**

<p><img src="docs/previews/h3/0476.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0476.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0476.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0476.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue umbrella**

<p><img src="docs/previews/h3/0477.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0477.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0477.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0477.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a blue vase**

<p><img src="docs/previews/h3/0478.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0478.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0478.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0478.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a green bird**

<p><img src="docs/previews/h3/0572.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0572.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0572.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0572.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a green car**

<p><img src="docs/previews/h3/0574.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0574.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0574.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0574.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a green chair**

<p><img src="docs/previews/h3/0575.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0575.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0575.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0575.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a green suitcase**

<p><img src="docs/previews/h3/0577.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0577.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0577.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0577.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a green umbrella**

<p><img src="docs/previews/h3/0578.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0578.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0578.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0578.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a green vase**

<p><img src="docs/previews/h3/0579.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0579.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0579.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0579.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink bicycle**

<p><img src="docs/previews/h3/0636.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0636.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0636.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0636.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink bird**

<p><img src="docs/previews/h3/0637.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0637.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0637.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0637.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink bowl**

<p><img src="docs/previews/h3/0638.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0638.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0638.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0638.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink car**

<p><img src="docs/previews/h3/0639.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0639.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0639.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0639.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink chair**

<p><img src="docs/previews/h3/0640.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0640.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0640.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0640.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink suitcase**

<p><img src="docs/previews/h3/0642.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0642.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0642.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0642.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink umbrella**

<p><img src="docs/previews/h3/0643.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0643.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0643.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0643.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a pink vase**

<p><img src="docs/previews/h3/0644.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0644.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0644.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0644.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple bicycle**

<p><img src="docs/previews/h3/0652.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0652.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0652.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0652.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple bird**

<p><img src="docs/previews/h3/0653.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0653.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0653.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0653.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple bowl**

<p><img src="docs/previews/h3/0654.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0654.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0654.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0654.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple car**

<p><img src="docs/previews/h3/0655.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0655.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0655.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0655.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple clock**

<p><img src="docs/previews/h3/0657.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0657.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0657.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0657.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple suitcase**

<p><img src="docs/previews/h3/0658.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0658.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0658.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0658.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a purple vase**

<p><img src="docs/previews/h3/0660.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0660.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0660.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0660.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red bicycle**

<p><img src="docs/previews/h3/0661.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0661.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0661.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0661.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red bird**

<p><img src="docs/previews/h3/0662.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0662.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0662.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0662.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red bowl**

<p><img src="docs/previews/h3/0663.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0663.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0663.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0663.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red car**

<p><img src="docs/previews/h3/0664.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0664.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0664.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0664.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red chair**

<p><img src="docs/previews/h3/0665.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0665.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0665.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0665.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red clock**

<p><img src="docs/previews/h3/0666.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0666.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0666.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0666.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red suitcase**

<p><img src="docs/previews/h3/0667.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0667.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0667.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0667.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red umbrella**

<p><img src="docs/previews/h3/0668.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0668.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0668.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0668.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a red vase**

<p><img src="docs/previews/h3/0669.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0669.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0669.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0669.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white bicycle**

<p><img src="docs/previews/h3/0774.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0774.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0774.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0774.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white bird**

<p><img src="docs/previews/h3/0775.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0775.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0775.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0775.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white bowl**

<p><img src="docs/previews/h3/0776.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0776.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0776.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0776.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white car**

<p><img src="docs/previews/h3/0777.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0777.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0777.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0777.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white cat**

<p><img src="docs/previews/h3/0778.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0778.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0778.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0778.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white chair**

<p><img src="docs/previews/h3/0779.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0779.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0779.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0779.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white suitcase**

<p><img src="docs/previews/h3/0781.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0781.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0781.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0781.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white umbrella**

<p><img src="docs/previews/h3/0782.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0782.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0782.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0782.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a white vase**

<p><img src="docs/previews/h3/0783.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0783.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0783.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0783.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow bicycle**

<p><img src="docs/previews/h3/0787.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0787.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0787.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0787.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow bird**

<p><img src="docs/previews/h3/0788.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0788.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0788.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0788.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow bowl**

<p><img src="docs/previews/h3/0789.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0789.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0789.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0789.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow car**

<p><img src="docs/previews/h3/0790.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0790.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0790.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0790.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow cat**

<p><img src="docs/previews/h3/0791.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0791.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0791.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0791.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow chair**

<p><img src="docs/previews/h3/0792.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0792.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0792.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0792.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow clock**

<p><img src="docs/previews/h3/0793.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0793.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0793.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0793.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow suitcase**

<p><img src="docs/previews/h3/0794.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0794.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0794.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0794.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow umbrella**

<p><img src="docs/previews/h3/0795.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0795.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0795.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0795.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a yellow vase**

<p><img src="docs/previews/h3/0796.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0796.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0796.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0796.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange bicycle**

<p><img src="docs/previews/h3/0824.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0824.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0824.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0824.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange bird**

<p><img src="docs/previews/h3/0825.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0825.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0825.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0825.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange bowl**

<p><img src="docs/previews/h3/0826.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0826.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0826.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0826.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange car**

<p><img src="docs/previews/h3/0827.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0827.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0827.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0827.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange cat**

<p><img src="docs/previews/h3/0828.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0828.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0828.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0828.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange chair**

<p><img src="docs/previews/h3/0829.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0829.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0829.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0829.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange suitcase**

<p><img src="docs/previews/h3/0833.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0833.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0833.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0833.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange umbrella**

<p><img src="docs/previews/h3/0834.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0834.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0834.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0834.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange vase**

<p><img src="docs/previews/h3/0835.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0835.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0835.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0835.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Object class

**a bird** <sub>· VBench both high · no GPT-6.1-Sol clip</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20bird-0.mp4"><img src="docs/previews/h3/0459.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20bird-0.mp4"><img src="docs/previews/astra/0459.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20bird-0.mp4"><img src="docs/previews/opus/0459.webp" width="24%" alt="Opus 5.5"></a></p>

**a boat** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0484.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0484.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0484.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0484.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0508.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0508.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0508.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0508.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20cat-3.mp4"><img src="docs/previews/h3/0519.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20cat-3.mp4"><img src="docs/previews/astra/0519.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20cat-3.mp4"><img src="docs/previews/opus/0519.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20cat-3.mp4"><img src="docs/previews/sol/0519.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

<details><summary><b>Show more object class prompts</b></summary>

**a dog** <sub>· ↻ VBench code↓ H3↑ · no GPT-6.1-Sol clip</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20dog-0.mp4"><img src="docs/previews/h3/0549.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20dog-0.mp4"><img src="docs/previews/astra/0549.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20dog-0.mp4"><img src="docs/previews/opus/0549.webp" width="24%" alt="Opus 5.5"></a></p>

**a hot dog** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0595.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0595.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0595.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0595.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20person-0.mp4"><img src="docs/previews/h3/0635.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20person-0.mp4"><img src="docs/previews/astra/0635.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20person-0.mp4"><img src="docs/previews/opus/0635.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20person-0.mp4"><img src="docs/previews/sol/0635.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a pizza** <sub>· ↻ VBench code↓ H3↑</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20pizza-3.mp4"><img src="docs/previews/h3/0648.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20pizza-3.mp4"><img src="docs/previews/astra/0648.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20pizza-3.mp4"><img src="docs/previews/opus/0648.webp" width="24%" alt="Opus 5.5"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/sol/a%20pizza-3.mp4"><img src="docs/previews/sol/0648.webp" width="24%" alt="GPT-6.1-Sol"></a></p>

**a sports ball** <sub>· ↻ VBench code↓ H3↑ · no GPT-6.1-Sol clip</sub>

<p><a href="https://openraiser.github.io/CodingVBench/gallery/videos/h3/a%20sports%20ball-3.mp4"><img src="docs/previews/h3/0721.webp" width="24%" alt="MiniMax H3"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/astra/a%20sports%20ball-3.mp4"><img src="docs/previews/astra/0721.webp" width="24%" alt="GPT-6 Astra"></a> <a href="https://openraiser.github.io/CodingVBench/gallery/videos/opus/a%20sports%20ball-3.mp4"><img src="docs/previews/opus/0721.webp" width="24%" alt="Opus 5.5"></a></p>

**a tie** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0739.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0739.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0739.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0739.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a zebra** <sub>· VBench both high</sub>

<p><img src="docs/previews/h3/0802.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0802.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0802.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0802.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a backpack**

<p><img src="docs/previews/h3/0424.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0424.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0424.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0424.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a banana**

<p><img src="docs/previews/h3/0428.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0428.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0428.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0428.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a baseball bat**

<p><img src="docs/previews/h3/0431.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0431.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0431.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0431.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a baseball glove**

<p><img src="docs/previews/h3/0434.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0434.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0434.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0434.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bear**

<p><img src="docs/previews/h3/0441.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0441.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0441.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0441.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bed**

<p><img src="docs/previews/h3/0443.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0443.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0443.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0443.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bench**

<p><img src="docs/previews/h3/0445.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0445.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0445.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0445.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bicycle**

<p><img src="docs/previews/h3/0453.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0453.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0453.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0453.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a book**

<p><img src="docs/previews/h3/0486.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0486.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0486.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0486.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bottle**

<p><img src="docs/previews/h3/0489.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0489.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0489.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0489.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bowl**

<p><img src="docs/previews/h3/0492.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0492.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0492.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0492.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bus**

<p><img src="docs/previews/h3/0498.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0498.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0498.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0498.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cake**

<p><img src="docs/previews/h3/0500.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0500.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0500.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0500.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a carrot**

<p><img src="docs/previews/h3/0512.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0512.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0512.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0512.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cell phone**

<p><img src="docs/previews/h3/0521.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0521.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0521.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0521.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a chair**

<p><img src="docs/previews/h3/0524.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0524.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0524.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0524.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a clock**

<p><img src="docs/previews/h3/0527.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0527.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0527.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0527.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a couch**

<p><img src="docs/previews/h3/0530.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0530.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0530.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0530.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cow**

<p><img src="docs/previews/h3/0536.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0536.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0536.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0536.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cup**

<p><img src="docs/previews/h3/0539.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0539.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0539.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0539.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dining table**

<p><img src="docs/previews/h3/0542.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0542.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0542.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0542.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a donut**

<p><img src="docs/previews/h3/0553.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0553.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0553.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0553.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a fire hydrant**

<p><img src="docs/previews/h3/0558.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0558.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0558.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0558.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a fork**

<p><img src="docs/previews/h3/0561.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0561.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0561.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0561.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a frisbee**

<p><img src="docs/previews/h3/0564.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0564.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0564.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0564.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a giraffe**

<p><img src="docs/previews/h3/0570.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0570.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0570.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0570.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a hair drier**

<p><img src="docs/previews/h3/0582.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0582.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0582.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0582.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a handbag**

<p><img src="docs/previews/h3/0584.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0584.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0584.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0584.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse**

<p><img src="docs/previews/h3/0591.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0591.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0591.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0591.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a keyboard**

<p><img src="docs/previews/h3/0597.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0597.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0597.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0597.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a kite**

<p><img src="docs/previews/h3/0601.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0601.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0601.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0601.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a knife**

<p><img src="docs/previews/h3/0604.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0604.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0604.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0604.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a laptop**

<p><img src="docs/previews/h3/0607.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0607.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0607.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0607.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a microwave**

<p><img src="docs/previews/h3/0611.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0611.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0611.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0611.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle**

<p><img src="docs/previews/h3/0620.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0620.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0620.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0620.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a parking meter**

<p><img src="docs/previews/h3/0623.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0623.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0623.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0623.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a potted plant**

<p><img src="docs/previews/h3/0651.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0651.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0651.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0651.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a refrigerator**

<p><img src="docs/previews/h3/0671.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0671.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0671.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0671.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a remote**

<p><img src="docs/previews/h3/0674.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0674.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0674.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0674.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sandwich**

<p><img src="docs/previews/h3/0678.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0678.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0678.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0678.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sheep**

<p><img src="docs/previews/h3/0704.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0704.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0704.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0704.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sink**

<p><img src="docs/previews/h3/0707.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0707.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0707.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0707.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a skateboard**

<p><img src="docs/previews/h3/0711.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0711.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0711.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0711.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a snowboard**

<p><img src="docs/previews/h3/0715.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0715.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0715.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0715.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a spoon**

<p><img src="docs/previews/h3/0718.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0718.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0718.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0718.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a stop sign**

<p><img src="docs/previews/h3/0724.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0724.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0724.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0724.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a suitcase**

<p><img src="docs/previews/h3/0726.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0726.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0726.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0726.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a surfboard**

<p><img src="docs/previews/h3/0730.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0730.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0730.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0730.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a teddy bear**

<p><img src="docs/previews/h3/0734.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0734.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0734.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0734.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a tennis racket**

<p><img src="docs/previews/h3/0737.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0737.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0737.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0737.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toaster**

<p><img src="docs/previews/h3/0743.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0743.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0743.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0743.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toilet**

<p><img src="docs/previews/h3/0747.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0747.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0747.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0747.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toothbrush**

<p><img src="docs/previews/h3/0750.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0750.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0750.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0750.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a traffic light**

<p><img src="docs/previews/h3/0753.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0753.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0753.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0753.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a train**

<p><img src="docs/previews/h3/0759.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0759.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0759.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0759.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck**

<p><img src="docs/previews/h3/0767.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0767.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0767.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0767.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a tv**

<p><img src="docs/previews/h3/0770.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0770.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0770.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0770.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a vase**

<p><img src="docs/previews/h3/0773.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0773.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0773.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0773.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a wine glass**

<p><img src="docs/previews/h3/0786.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0786.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0786.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0786.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an airplane**

<p><img src="docs/previews/h3/0811.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0811.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0811.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0811.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an apple**

<p><img src="docs/previews/h3/0815.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0815.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0815.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0815.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an elephant**

<p><img src="docs/previews/h3/0821.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0821.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0821.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0821.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an orange**

<p><img src="docs/previews/h3/0836.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0836.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0836.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0836.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an oven**

<p><img src="docs/previews/h3/0840.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0840.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0840.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0840.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an umbrella**

<p><img src="docs/previews/h3/0842.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0842.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0842.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0842.webp" width="24%" alt="GPT-6.1-Sol"></p>

**broccoli**

<p><img src="docs/previews/h3/0860.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0860.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0860.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0860.webp" width="24%" alt="GPT-6.1-Sol"></p>

**scissors**

<p><img src="docs/previews/h3/0921.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0921.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0921.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0921.webp" width="24%" alt="GPT-6.1-Sol"></p>

**skis**

<p><img src="docs/previews/h3/0927.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0927.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0927.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0927.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Scene

**alley**

<p><img src="docs/previews/h3/0803.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0803.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0803.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0803.webp" width="24%" alt="GPT-6.1-Sol"></p>

**amusement park**

<p><img src="docs/previews/h3/0804.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0804.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0804.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0804.webp" width="24%" alt="GPT-6.1-Sol"></p>

**aquarium**

<p><img src="docs/previews/h3/0843.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0843.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0843.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0843.webp" width="24%" alt="GPT-6.1-Sol"></p>

**arch**

<p><img src="docs/previews/h3/0844.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0844.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0844.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0844.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more scene prompts</b></summary>

**art gallery**

<p><img src="docs/previews/h3/0845.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0845.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0845.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0845.webp" width="24%" alt="GPT-6.1-Sol"></p>

**bakery shop**

<p><img src="docs/previews/h3/0846.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0846.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0846.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0846.webp" width="24%" alt="GPT-6.1-Sol"></p>

**ballroom**

<p><img src="docs/previews/h3/0847.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0847.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0847.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0847.webp" width="24%" alt="GPT-6.1-Sol"></p>

**bar**

<p><img src="docs/previews/h3/0848.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0848.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0848.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0848.webp" width="24%" alt="GPT-6.1-Sol"></p>

**barn**

<p><img src="docs/previews/h3/0849.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0849.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0849.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0849.webp" width="24%" alt="GPT-6.1-Sol"></p>

**baseball stadium**

<p><img src="docs/previews/h3/0850.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0850.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0850.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0850.webp" width="24%" alt="GPT-6.1-Sol"></p>

**basement**

<p><img src="docs/previews/h3/0851.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0851.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0851.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0851.webp" width="24%" alt="GPT-6.1-Sol"></p>

**bathroom**

<p><img src="docs/previews/h3/0852.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0852.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0852.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0852.webp" width="24%" alt="GPT-6.1-Sol"></p>

**beach**

<p><img src="docs/previews/h3/0853.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0853.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0853.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0853.webp" width="24%" alt="GPT-6.1-Sol"></p>

**bedroom**

<p><img src="docs/previews/h3/0854.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0854.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0854.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0854.webp" width="24%" alt="GPT-6.1-Sol"></p>

**botanical garden**

<p><img src="docs/previews/h3/0855.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0855.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0855.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0855.webp" width="24%" alt="GPT-6.1-Sol"></p>

**bridge**

<p><img src="docs/previews/h3/0856.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0856.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0856.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0856.webp" width="24%" alt="GPT-6.1-Sol"></p>

**cafeteria**

<p><img src="docs/previews/h3/0861.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0861.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0861.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0861.webp" width="24%" alt="GPT-6.1-Sol"></p>

**campsite**

<p><img src="docs/previews/h3/0862.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0862.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0862.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0862.webp" width="24%" alt="GPT-6.1-Sol"></p>

**campus**

<p><img src="docs/previews/h3/0863.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0863.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0863.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0863.webp" width="24%" alt="GPT-6.1-Sol"></p>

**carrousel**

<p><img src="docs/previews/h3/0864.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0864.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0864.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0864.webp" width="24%" alt="GPT-6.1-Sol"></p>

**castle**

<p><img src="docs/previews/h3/0865.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0865.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0865.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0865.webp" width="24%" alt="GPT-6.1-Sol"></p>

**cemetery**

<p><img src="docs/previews/h3/0866.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0866.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0866.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0866.webp" width="24%" alt="GPT-6.1-Sol"></p>

**classroom**

<p><img src="docs/previews/h3/0867.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0867.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0867.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0867.webp" width="24%" alt="GPT-6.1-Sol"></p>

**cliff**

<p><img src="docs/previews/h3/0868.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0868.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0868.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0868.webp" width="24%" alt="GPT-6.1-Sol"></p>

**construction site**

<p><img src="docs/previews/h3/0869.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0869.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0869.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0869.webp" width="24%" alt="GPT-6.1-Sol"></p>

**corridor**

<p><img src="docs/previews/h3/0870.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0870.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0870.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0870.webp" width="24%" alt="GPT-6.1-Sol"></p>

**courtyard**

<p><img src="docs/previews/h3/0871.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0871.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0871.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0871.webp" width="24%" alt="GPT-6.1-Sol"></p>

**crosswalk**

<p><img src="docs/previews/h3/0872.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0872.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0872.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0872.webp" width="24%" alt="GPT-6.1-Sol"></p>

**desert**

<p><img src="docs/previews/h3/0873.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0873.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0873.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0873.webp" width="24%" alt="GPT-6.1-Sol"></p>

**downtown**

<p><img src="docs/previews/h3/0874.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0874.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0874.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0874.webp" width="24%" alt="GPT-6.1-Sol"></p>

**driveway**

<p><img src="docs/previews/h3/0875.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0875.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0875.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0875.webp" width="24%" alt="GPT-6.1-Sol"></p>

**farm**

<p><img src="docs/previews/h3/0876.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0876.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0876.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0876.webp" width="24%" alt="GPT-6.1-Sol"></p>

**food court**

<p><img src="docs/previews/h3/0877.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0877.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0877.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0877.webp" width="24%" alt="GPT-6.1-Sol"></p>

**football field**

<p><img src="docs/previews/h3/0878.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0878.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0878.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0878.webp" width="24%" alt="GPT-6.1-Sol"></p>

**forest road**

<p><img src="docs/previews/h3/0879.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0879.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0879.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0879.webp" width="24%" alt="GPT-6.1-Sol"></p>

**fountain**

<p><img src="docs/previews/h3/0880.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0880.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0880.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0880.webp" width="24%" alt="GPT-6.1-Sol"></p>

**gas station**

<p><img src="docs/previews/h3/0881.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0881.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0881.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0881.webp" width="24%" alt="GPT-6.1-Sol"></p>

**glacier**

<p><img src="docs/previews/h3/0882.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0882.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0882.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0882.webp" width="24%" alt="GPT-6.1-Sol"></p>

**golf course**

<p><img src="docs/previews/h3/0884.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0884.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0884.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0884.webp" width="24%" alt="GPT-6.1-Sol"></p>

**harbor**

<p><img src="docs/previews/h3/0886.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0886.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0886.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0886.webp" width="24%" alt="GPT-6.1-Sol"></p>

**highway**

<p><img src="docs/previews/h3/0887.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0887.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0887.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0887.webp" width="24%" alt="GPT-6.1-Sol"></p>

**hospital**

<p><img src="docs/previews/h3/0888.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0888.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0888.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0888.webp" width="24%" alt="GPT-6.1-Sol"></p>

**house**

<p><img src="docs/previews/h3/0889.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0889.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0889.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0889.webp" width="24%" alt="GPT-6.1-Sol"></p>

**iceberg** <sub>· no Opus 5.5 clip</sub>

<p><img src="docs/previews/h3/0890.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0890.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/sol/0890.webp" width="24%" alt="GPT-6.1-Sol"></p>

**indoor gymnasium**

<p><img src="docs/previews/h3/0892.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0892.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0892.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0892.webp" width="24%" alt="GPT-6.1-Sol"></p>

**indoor library**

<p><img src="docs/previews/h3/0893.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0893.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0893.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0893.webp" width="24%" alt="GPT-6.1-Sol"></p>

**indoor movie theater**

<p><img src="docs/previews/h3/0894.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0894.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0894.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0894.webp" width="24%" alt="GPT-6.1-Sol"></p>

**indoor museum**

<p><img src="docs/previews/h3/0895.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0895.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0895.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0895.webp" width="24%" alt="GPT-6.1-Sol"></p>

**indoor swimming pool**

<p><img src="docs/previews/h3/0896.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0896.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0896.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0896.webp" width="24%" alt="GPT-6.1-Sol"></p>

**industrial area**

<p><img src="docs/previews/h3/0897.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0897.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0897.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0897.webp" width="24%" alt="GPT-6.1-Sol"></p>

**jail cell**

<p><img src="docs/previews/h3/0898.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0898.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0898.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0898.webp" width="24%" alt="GPT-6.1-Sol"></p>

**junkyard**

<p><img src="docs/previews/h3/0899.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0899.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0899.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0899.webp" width="24%" alt="GPT-6.1-Sol"></p>

**kitchen**

<p><img src="docs/previews/h3/0900.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0900.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0900.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0900.webp" width="24%" alt="GPT-6.1-Sol"></p>

**laboratory**

<p><img src="docs/previews/h3/0901.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0901.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0901.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0901.webp" width="24%" alt="GPT-6.1-Sol"></p>

**lighthouse**

<p><img src="docs/previews/h3/0902.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0902.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0902.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0902.webp" width="24%" alt="GPT-6.1-Sol"></p>

**mansion**

<p><img src="docs/previews/h3/0903.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0903.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0903.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0903.webp" width="24%" alt="GPT-6.1-Sol"></p>

**marsh**

<p><img src="docs/previews/h3/0904.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0904.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0904.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0904.webp" width="24%" alt="GPT-6.1-Sol"></p>

**mountain**

<p><img src="docs/previews/h3/0905.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0905.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0905.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0905.webp" width="24%" alt="GPT-6.1-Sol"></p>

**music studio**

<p><img src="docs/previews/h3/0906.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0906.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0906.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0906.webp" width="24%" alt="GPT-6.1-Sol"></p>

**nursery**

<p><img src="docs/previews/h3/0907.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0907.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0907.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0907.webp" width="24%" alt="GPT-6.1-Sol"></p>

**ocean**

<p><img src="docs/previews/h3/0908.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0908.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0908.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0908.webp" width="24%" alt="GPT-6.1-Sol"></p>

**office**

<p><img src="docs/previews/h3/0909.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0909.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0909.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0909.webp" width="24%" alt="GPT-6.1-Sol"></p>

**outdoor track**

<p><img src="docs/previews/h3/0910.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0910.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0910.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0910.webp" width="24%" alt="GPT-6.1-Sol"></p>

**palace**

<p><img src="docs/previews/h3/0911.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0911.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0911.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0911.webp" width="24%" alt="GPT-6.1-Sol"></p>

**parking lot**

<p><img src="docs/previews/h3/0912.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0912.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0912.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0912.webp" width="24%" alt="GPT-6.1-Sol"></p>

**pharmacy**

<p><img src="docs/previews/h3/0913.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0913.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0913.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0913.webp" width="24%" alt="GPT-6.1-Sol"></p>

**phone booth**

<p><img src="docs/previews/h3/0914.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0914.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0914.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0914.webp" width="24%" alt="GPT-6.1-Sol"></p>

**raceway**

<p><img src="docs/previews/h3/0915.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0915.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0915.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0915.webp" width="24%" alt="GPT-6.1-Sol"></p>

**restaurant**

<p><img src="docs/previews/h3/0916.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0916.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0916.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0916.webp" width="24%" alt="GPT-6.1-Sol"></p>

**river**

<p><img src="docs/previews/h3/0917.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0917.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0917.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0917.webp" width="24%" alt="GPT-6.1-Sol"></p>

**science museum**

<p><img src="docs/previews/h3/0918.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0918.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0918.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0918.webp" width="24%" alt="GPT-6.1-Sol"></p>

**shower**

<p><img src="docs/previews/h3/0922.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0922.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0922.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0922.webp" width="24%" alt="GPT-6.1-Sol"></p>

**ski slope**

<p><img src="docs/previews/h3/0923.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0923.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0923.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0923.webp" width="24%" alt="GPT-6.1-Sol"></p>

**sky**

<p><img src="docs/previews/h3/0928.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0928.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0928.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0928.webp" width="24%" alt="GPT-6.1-Sol"></p>

**skyscraper**

<p><img src="docs/previews/h3/0929.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0929.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0929.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0929.webp" width="24%" alt="GPT-6.1-Sol"></p>

**staircase**

<p><img src="docs/previews/h3/0930.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0930.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0930.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0930.webp" width="24%" alt="GPT-6.1-Sol"></p>

**street**

<p><img src="docs/previews/h3/0932.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0932.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0932.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0932.webp" width="24%" alt="GPT-6.1-Sol"></p>

**supermarket**

<p><img src="docs/previews/h3/0933.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0933.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0933.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0933.webp" width="24%" alt="GPT-6.1-Sol"></p>

**tower**

<p><img src="docs/previews/h3/0936.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0936.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0936.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0936.webp" width="24%" alt="GPT-6.1-Sol"></p>

**train railway**

<p><img src="docs/previews/h3/0937.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0937.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0937.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0937.webp" width="24%" alt="GPT-6.1-Sol"></p>

**train station platform**

<p><img src="docs/previews/h3/0938.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0938.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0938.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0938.webp" width="24%" alt="GPT-6.1-Sol"></p>

**underwater coral reef**

<p><img src="docs/previews/h3/0939.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0939.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0939.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0939.webp" width="24%" alt="GPT-6.1-Sol"></p>

**valley**

<p><img src="docs/previews/h3/0940.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0940.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0940.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0940.webp" width="24%" alt="GPT-6.1-Sol"></p>

**volcano**

<p><img src="docs/previews/h3/0941.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0941.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0941.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0941.webp" width="24%" alt="GPT-6.1-Sol"></p>

**waterfall**

<p><img src="docs/previews/h3/0942.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0942.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0942.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0942.webp" width="24%" alt="GPT-6.1-Sol"></p>

**windmill**

<p><img src="docs/previews/h3/0943.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0943.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0943.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0943.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Appearance style

**A beautiful coastal beach in spring, waves lapping on sand by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0002.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0002.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0002.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0002.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, animated style**

<p><img src="docs/previews/h3/0005.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0005.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0005.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0005.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, black and white**

<p><img src="docs/previews/h3/0006.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0006.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0006.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0006.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, in cyberpunk style**

<p><img src="docs/previews/h3/0008.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0008.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0008.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0008.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more appearance style prompts</b></summary>

**A beautiful coastal beach in spring, waves lapping on sand, oil painting**

<p><img src="docs/previews/h3/0010.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0010.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0010.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0010.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, pixel art**

<p><img src="docs/previews/h3/0013.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0013.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0013.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0013.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, surrealism style**

<p><img src="docs/previews/h3/0015.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0015.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0015.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0015.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, Van Gogh style**

<p><img src="docs/previews/h3/0004.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0004.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0004.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0004.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, watercolor painting**

<p><img src="docs/previews/h3/0018.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0018.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0018.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0018.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0023.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0023.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0023.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0023.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, animated style**

<p><img src="docs/previews/h3/0026.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0026.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0026.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0026.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, black and white**

<p><img src="docs/previews/h3/0027.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0027.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0027.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0027.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, in cyberpunk style**

<p><img src="docs/previews/h3/0029.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0029.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0029.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0029.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, oil painting**

<p><img src="docs/previews/h3/0031.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0031.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0031.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0031.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, pixel art**

<p><img src="docs/previews/h3/0034.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0034.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0034.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0034.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, surrealism style**

<p><img src="docs/previews/h3/0036.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0036.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0036.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0036.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, Van Gogh style**

<p><img src="docs/previews/h3/0025.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0025.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0025.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0025.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, watercolor painting**

<p><img src="docs/previews/h3/0039.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0039.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0039.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0039.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0051.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0051.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0051.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0051.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, animated style**

<p><img src="docs/previews/h3/0053.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0053.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0053.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0053.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, black and white**

<p><img src="docs/previews/h3/0054.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0054.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0054.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0054.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, in cyberpunk style**

<p><img src="docs/previews/h3/0056.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0056.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0056.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0056.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, oil painting**

<p><img src="docs/previews/h3/0058.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0058.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0058.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0058.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, pixel art**

<p><img src="docs/previews/h3/0061.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0061.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0061.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0061.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, surrealism style**

<p><img src="docs/previews/h3/0063.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0063.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0063.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0063.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, Van Gogh style**

<p><img src="docs/previews/h3/0052.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0052.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0052.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0052.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, watercolor painting**

<p><img src="docs/previews/h3/0066.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0066.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0066.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0066.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0071.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0071.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0071.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0071.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, animated style**

<p><img src="docs/previews/h3/0073.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0073.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0073.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0073.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, black and white**

<p><img src="docs/previews/h3/0074.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0074.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0074.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0074.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, in cyberpunk style**

<p><img src="docs/previews/h3/0076.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0076.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0076.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0076.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, oil painting**

<p><img src="docs/previews/h3/0078.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0078.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0078.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0078.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, pixel art**

<p><img src="docs/previews/h3/0081.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0081.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0081.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0081.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, surrealism style**

<p><img src="docs/previews/h3/0083.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0083.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0083.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0083.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, Van Gogh style**

<p><img src="docs/previews/h3/0072.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0072.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0072.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0072.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, watercolor painting**

<p><img src="docs/previews/h3/0086.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0086.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0086.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0086.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0102.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0102.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0102.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0102.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, animated style**

<p><img src="docs/previews/h3/0104.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0104.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0104.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0104.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, black and white**

<p><img src="docs/previews/h3/0105.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0105.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0105.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0105.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, in cyberpunk style**

<p><img src="docs/previews/h3/0107.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0107.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0107.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0107.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, oil painting**

<p><img src="docs/previews/h3/0109.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0109.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0109.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0109.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, pixel art**

<p><img src="docs/previews/h3/0112.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0112.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0112.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0112.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, surrealism style**

<p><img src="docs/previews/h3/0114.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0114.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0114.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0114.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, Van Gogh style**

<p><img src="docs/previews/h3/0103.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0103.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0103.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0103.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, watercolor painting**

<p><img src="docs/previews/h3/0117.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0117.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0117.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0117.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0679.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0679.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0679.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0679.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, animated style**

<p><img src="docs/previews/h3/0681.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0681.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0681.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0681.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, black and white**

<p><img src="docs/previews/h3/0682.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0682.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0682.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0682.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, in cyberpunk style**

<p><img src="docs/previews/h3/0684.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0684.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0684.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0684.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, oil painting**

<p><img src="docs/previews/h3/0686.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0686.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0686.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0686.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, pixel art**

<p><img src="docs/previews/h3/0689.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0689.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0689.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0689.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, surrealism style**

<p><img src="docs/previews/h3/0691.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0691.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0691.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0691.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, Van Gogh style**

<p><img src="docs/previews/h3/0680.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0680.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0680.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0680.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, watercolor painting**

<p><img src="docs/previews/h3/0694.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0694.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0694.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0694.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0293.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0293.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0293.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0293.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, animated style**

<p><img src="docs/previews/h3/0295.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0295.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0295.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0295.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, black and white**

<p><img src="docs/previews/h3/0296.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0296.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0296.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0296.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, in cyberpunk style**

<p><img src="docs/previews/h3/0298.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0298.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0298.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0298.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, oil painting**

<p><img src="docs/previews/h3/0300.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0300.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0300.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0300.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, pixel art**

<p><img src="docs/previews/h3/0303.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0303.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0303.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0303.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, surrealism style**

<p><img src="docs/previews/h3/0305.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0305.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0305.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0305.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, Van Gogh style**

<p><img src="docs/previews/h3/0294.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0294.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0294.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0294.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, watercolor painting**

<p><img src="docs/previews/h3/0308.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0308.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0308.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0308.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0326.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0326.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0326.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0326.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, animated style**

<p><img src="docs/previews/h3/0328.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0328.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0328.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0328.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, black and white**

<p><img src="docs/previews/h3/0329.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0329.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0329.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0329.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, in cyberpunk style**

<p><img src="docs/previews/h3/0331.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0331.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0331.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0331.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, oil painting**

<p><img src="docs/previews/h3/0333.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0333.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0333.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0333.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, pixel art**

<p><img src="docs/previews/h3/0336.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0336.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0336.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0336.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, surrealism style**

<p><img src="docs/previews/h3/0338.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0338.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0338.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0338.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, Van Gogh style**

<p><img src="docs/previews/h3/0327.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0327.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0327.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0327.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, watercolor painting**

<p><img src="docs/previews/h3/0341.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0341.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0341.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0341.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0375.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0375.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0375.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0375.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, animated style**

<p><img src="docs/previews/h3/0377.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0377.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0377.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0377.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, black and white**

<p><img src="docs/previews/h3/0378.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0378.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0378.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0378.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, in cyberpunk style**

<p><img src="docs/previews/h3/0380.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0380.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0380.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0380.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, oil painting**

<p><img src="docs/previews/h3/0382.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0382.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0382.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0382.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, pixel art**

<p><img src="docs/previews/h3/0385.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0385.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0385.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0385.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, surrealism style**

<p><img src="docs/previews/h3/0387.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0387.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0387.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0387.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, Van Gogh style**

<p><img src="docs/previews/h3/0376.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0376.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0376.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0376.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, watercolor painting**

<p><img src="docs/previews/h3/0390.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0390.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0390.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0390.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai by Hokusai, in the style of Ukiyo**

<p><img src="docs/previews/h3/0397.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0397.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0397.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0397.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, animated style**

<p><img src="docs/previews/h3/0399.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0399.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0399.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0399.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, black and white**

<p><img src="docs/previews/h3/0400.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0400.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0400.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0400.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, in cyberpunk style**

<p><img src="docs/previews/h3/0402.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0402.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0402.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0402.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, oil painting**

<p><img src="docs/previews/h3/0404.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0404.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0404.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0404.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, pixel art**

<p><img src="docs/previews/h3/0407.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0407.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0407.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0407.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, surrealism style**

<p><img src="docs/previews/h3/0409.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0409.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0409.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0409.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, Van Gogh style**

<p><img src="docs/previews/h3/0398.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0398.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0398.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0398.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, watercolor painting**

<p><img src="docs/previews/h3/0413.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0413.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0413.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0413.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Temporal style

**A beautiful coastal beach in spring, waves lapping on sand, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0007.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0007.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0007.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0007.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, in super slow motion**

<p><img src="docs/previews/h3/0009.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0009.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0009.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0009.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, pan left**

<p><img src="docs/previews/h3/0011.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0011.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0011.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0011.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, pan right**

<p><img src="docs/previews/h3/0012.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0012.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0012.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0012.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more temporal style prompts</b></summary>

**A beautiful coastal beach in spring, waves lapping on sand, racking focus**

<p><img src="docs/previews/h3/0014.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0014.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0014.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0014.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, tilt down**

<p><img src="docs/previews/h3/0016.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0016.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0016.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0016.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, tilt up**

<p><img src="docs/previews/h3/0017.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0017.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0017.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0017.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, with an intense shaking effect**

<p><img src="docs/previews/h3/0019.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0019.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0019.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0019.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, zoom in**

<p><img src="docs/previews/h3/0020.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0020.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0020.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0020.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand, zoom out**

<p><img src="docs/previews/h3/0021.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0021.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0021.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0021.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0028.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0028.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0028.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0028.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, in super slow motion**

<p><img src="docs/previews/h3/0030.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0030.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0030.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0030.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, pan left**

<p><img src="docs/previews/h3/0032.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0032.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0032.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0032.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, pan right**

<p><img src="docs/previews/h3/0033.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0033.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0033.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0033.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, racking focus**

<p><img src="docs/previews/h3/0035.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0035.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0035.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0035.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, tilt down**

<p><img src="docs/previews/h3/0037.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0037.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0037.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0037.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, tilt up**

<p><img src="docs/previews/h3/0038.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0038.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0038.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0038.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, with an intense shaking effect**

<p><img src="docs/previews/h3/0040.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0040.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0040.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0040.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, zoom in**

<p><img src="docs/previews/h3/0041.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0041.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0041.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0041.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background, zoom out**

<p><img src="docs/previews/h3/0042.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0042.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0042.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0042.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0055.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0055.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0055.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0055.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, in super slow motion**

<p><img src="docs/previews/h3/0057.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0057.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0057.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0057.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, pan left**

<p><img src="docs/previews/h3/0059.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0059.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0059.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0059.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, pan right**

<p><img src="docs/previews/h3/0060.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0060.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0060.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0060.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, racking focus**

<p><img src="docs/previews/h3/0062.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0062.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0062.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0062.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, tilt down**

<p><img src="docs/previews/h3/0064.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0064.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0064.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0064.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, tilt up**

<p><img src="docs/previews/h3/0065.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0065.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0065.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0065.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, with an intense shaking effect**

<p><img src="docs/previews/h3/0067.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0067.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0067.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0067.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, zoom in**

<p><img src="docs/previews/h3/0068.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0068.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0068.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0068.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A couple in formal evening wear going home get caught in a heavy downpour with umbrellas, zoom out**

<p><img src="docs/previews/h3/0069.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0069.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0069.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0069.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0075.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0075.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0075.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0075.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, in super slow motion**

<p><img src="docs/previews/h3/0077.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0077.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0077.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0077.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, pan left**

<p><img src="docs/previews/h3/0079.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0079.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0079.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0079.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, pan right**

<p><img src="docs/previews/h3/0080.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0080.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0080.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0080.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, racking focus**

<p><img src="docs/previews/h3/0082.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0082.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0082.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0082.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, tilt down**

<p><img src="docs/previews/h3/0084.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0084.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0084.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0084.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, tilt up**

<p><img src="docs/previews/h3/0085.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0085.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0085.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0085.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, with an intense shaking effect**

<p><img src="docs/previews/h3/0087.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0087.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0087.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0087.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, zoom in**

<p><img src="docs/previews/h3/0088.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0088.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0088.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0088.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset, zoom out**

<p><img src="docs/previews/h3/0089.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0089.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0089.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0089.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0106.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0106.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0106.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0106.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, in super slow motion**

<p><img src="docs/previews/h3/0108.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0108.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0108.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0108.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, pan left**

<p><img src="docs/previews/h3/0110.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0110.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0110.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0110.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, pan right**

<p><img src="docs/previews/h3/0111.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0111.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0111.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0111.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, racking focus**

<p><img src="docs/previews/h3/0113.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0113.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0113.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0113.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, tilt down**

<p><img src="docs/previews/h3/0115.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0115.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0115.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0115.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, tilt up**

<p><img src="docs/previews/h3/0116.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0116.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0116.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0116.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, with an intense shaking effect**

<p><img src="docs/previews/h3/0118.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0118.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0118.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0118.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, zoom in**

<p><img src="docs/previews/h3/0119.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0119.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0119.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0119.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris, zoom out**

<p><img src="docs/previews/h3/0120.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0120.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0120.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0120.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0683.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0683.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0683.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0683.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, in super slow motion**

<p><img src="docs/previews/h3/0685.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0685.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0685.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0685.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, pan left**

<p><img src="docs/previews/h3/0687.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0687.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0687.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0687.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, pan right**

<p><img src="docs/previews/h3/0688.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0688.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0688.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0688.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, racking focus**

<p><img src="docs/previews/h3/0690.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0690.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0690.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0690.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, tilt down**

<p><img src="docs/previews/h3/0692.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0692.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0692.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0692.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, tilt up**

<p><img src="docs/previews/h3/0693.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0693.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0693.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0693.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, with an intense shaking effect**

<p><img src="docs/previews/h3/0695.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0695.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0695.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0695.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, zoom in**

<p><img src="docs/previews/h3/0696.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0696.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0696.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0696.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean, zoom out**

<p><img src="docs/previews/h3/0697.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0697.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0697.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0697.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0297.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0297.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0297.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0297.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, in super slow motion**

<p><img src="docs/previews/h3/0299.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0299.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0299.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0299.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, pan left**

<p><img src="docs/previews/h3/0301.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0301.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0301.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0301.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, pan right**

<p><img src="docs/previews/h3/0302.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0302.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0302.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0302.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, racking focus**

<p><img src="docs/previews/h3/0304.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0304.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0304.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0304.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, tilt down**

<p><img src="docs/previews/h3/0306.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0306.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0306.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0306.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, tilt up**

<p><img src="docs/previews/h3/0307.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0307.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0307.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0307.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, with an intense shaking effect**

<p><img src="docs/previews/h3/0309.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0309.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0309.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0309.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, zoom in**

<p><img src="docs/previews/h3/0310.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0310.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0310.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0310.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space, zoom out**

<p><img src="docs/previews/h3/0311.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0311.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0311.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0311.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0330.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0330.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0330.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0330.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, in super slow motion**

<p><img src="docs/previews/h3/0332.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0332.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0332.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0332.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, pan left**

<p><img src="docs/previews/h3/0334.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0334.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0334.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0334.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, pan right**

<p><img src="docs/previews/h3/0335.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0335.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0335.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0335.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, racking focus**

<p><img src="docs/previews/h3/0337.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0337.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0337.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0337.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, tilt down**

<p><img src="docs/previews/h3/0339.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0339.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0339.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0339.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, tilt up**

<p><img src="docs/previews/h3/0340.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0340.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0340.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0340.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, with an intense shaking effect**

<p><img src="docs/previews/h3/0342.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0342.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0342.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0342.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, zoom in**

<p><img src="docs/previews/h3/0343.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0343.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0343.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0343.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book, zoom out**

<p><img src="docs/previews/h3/0344.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0344.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0344.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0344.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0379.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0379.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0379.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0379.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, in super slow motion**

<p><img src="docs/previews/h3/0381.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0381.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0381.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0381.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, pan left**

<p><img src="docs/previews/h3/0383.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0383.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0383.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0383.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, pan right**

<p><img src="docs/previews/h3/0384.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0384.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0384.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0384.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, racking focus**

<p><img src="docs/previews/h3/0386.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0386.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0386.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0386.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, tilt down**

<p><img src="docs/previews/h3/0388.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0388.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0388.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0388.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, tilt up**

<p><img src="docs/previews/h3/0389.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0389.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0389.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0389.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, with an intense shaking effect**

<p><img src="docs/previews/h3/0391.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0391.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0391.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0391.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, zoom in**

<p><img src="docs/previews/h3/0392.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0392.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0392.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0392.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks, zoom out**

<p><img src="docs/previews/h3/0393.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0393.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0393.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0393.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, featuring a steady and smooth perspective**

<p><img src="docs/previews/h3/0401.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0401.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0401.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0401.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, in super slow motion**

<p><img src="docs/previews/h3/0403.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0403.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0403.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0403.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, pan left**

<p><img src="docs/previews/h3/0405.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0405.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0405.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0405.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, pan right**

<p><img src="docs/previews/h3/0406.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0406.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0406.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0406.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, racking focus**

<p><img src="docs/previews/h3/0408.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0408.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0408.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0408.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, tilt down**

<p><img src="docs/previews/h3/0410.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0410.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0410.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0410.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, tilt up**

<p><img src="docs/previews/h3/0411.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0411.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0411.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0411.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, with an intense shaking effect**

<p><img src="docs/previews/h3/0414.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0414.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0414.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0414.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, zoom in**

<p><img src="docs/previews/h3/0415.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0415.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0415.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0415.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, zoom out**

<p><img src="docs/previews/h3/0416.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0416.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0416.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0416.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Overall consistency

**A 3D model of a 1800s victorian house.**

<p><img src="docs/previews/h3/0000.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0000.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0000.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0000.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A beautiful coastal beach in spring, waves lapping on sand by Vincent van Gogh**

<p><img src="docs/previews/h3/0003.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0003.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0003.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0003.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A bigfoot walking in the snowstorm.**

<p><img src="docs/previews/h3/0022.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0022.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0022.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0022.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background**

<p><img src="docs/previews/h3/0043.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0043.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0043.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0043.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more overall consistency prompts</b></summary>

**A boat sailing leisurely along the Seine River with the Eiffel Tower in background by Vincent van Gogh**

<p><img src="docs/previews/h3/0024.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0024.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0024.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0024.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A car moving slowly on an empty street, rainy evening**

<p><img src="docs/previews/h3/0044.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0044.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0044.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0044.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cat eating food out of a bowl**

<p><img src="docs/previews/h3/0045.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0045.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0045.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0045.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cat wearing sunglasses and working as a lifeguard at a pool.**

<p><img src="docs/previews/h3/0046.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0046.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0046.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0046.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cat wearing sunglasses at a pool**

<p><img src="docs/previews/h3/0047.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0047.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0047.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0047.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A confused panda in calculus class**

<p><img src="docs/previews/h3/0048.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0048.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0048.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0048.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A corgi is playing drum kit.**

<p><img src="docs/previews/h3/0049.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0049.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0049.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0049.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A corgi's head depicted as an explosion of a nebula**

<p><img src="docs/previews/h3/0050.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0050.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0050.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0050.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute fluffy panda eating Chinese food in a restaurant**

<p><img src="docs/previews/h3/0070.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0070.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0070.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0070.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute happy Corgi playing in park, sunset**

<p><img src="docs/previews/h3/0090.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0090.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0090.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0090.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A cute raccoon playing guitar in a boat on the ocean**

<p><img src="docs/previews/h3/0091.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0091.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0091.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0091.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a drone flying over a snowy forest.**

<p><img src="docs/previews/h3/0554.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0554.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0554.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0554.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A drone view of celebration with Christmas tree and fireworks, starry sky - background.**

<p><img src="docs/previews/h3/0092.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0092.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0092.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0092.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A fantasy landscape**

<p><img src="docs/previews/h3/0093.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0093.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0093.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0093.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a fantasy landscape**

<p><img src="docs/previews/h3/0555.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0555.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0555.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0555.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A fat rabbit wearing a purple robe walking through a fantasy landscape.**

<p><img src="docs/previews/h3/0094.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0094.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0094.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0094.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A future where humans have achieved teleportation technology**

<p><img src="docs/previews/h3/0095.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0095.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0095.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0095.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A happy fuzzy panda playing guitar nearby a campfire, snow mountain in the background**

<p><img src="docs/previews/h3/0096.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0096.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0096.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0096.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A jellyfish floating through the ocean, with bioluminescent tentacles**

<p><img src="docs/previews/h3/0097.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0097.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0097.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0097.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A koala bear playing piano in the forest.**

<p><img src="docs/previews/h3/0098.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0098.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0098.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0098.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A lightning striking atop of eiffel tower, dark clouds in the sky**

<p><img src="docs/previews/h3/0099.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0099.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0099.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0099.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A Mars rover moving on Mars**

<p><img src="docs/previews/h3/0001.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0001.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0001.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0001.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A modern art museum, with colorful paintings**

<p><img src="docs/previews/h3/0100.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0100.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0100.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0100.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda cooking in the kitchen**

<p><img src="docs/previews/h3/0101.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0101.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0101.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0101.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda drinking coffee in a cafe in Paris**

<p><img src="docs/previews/h3/0121.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0121.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0121.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0121.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda playing on a swing set**

<p><img src="docs/previews/h3/0122.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0122.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0122.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0122.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A panda standing on a surfboard in the ocean in sunset.**

<p><img src="docs/previews/h3/0123.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0123.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0123.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0123.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A polar bear is playing guitar**

<p><img src="docs/previews/h3/0224.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0224.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0224.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0224.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A raccoon dressed in suit playing the trumpet, stage background**

<p><img src="docs/previews/h3/0225.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0225.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0225.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0225.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A raccoon is playing the electronic guitar.**

<p><img src="docs/previews/h3/0226.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0226.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0226.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0226.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A raccoon that looks like a turtle, digital art.**

<p><img src="docs/previews/h3/0227.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0227.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0227.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0227.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A robot DJ is playing the turntable, in heavy raining futuristic tokyo rooftop cyberpunk night, sci-fi, fantasy**

<p><img src="docs/previews/h3/0228.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0228.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0228.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0228.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a shark is swimming in the ocean.**

<p><img src="docs/previews/h3/0698.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0698.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0698.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0698.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A shark swimming in clear Caribbean ocean**

<p><img src="docs/previews/h3/0229.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0229.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0229.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0229.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A space shuttle launching into orbit, with flames and smoke billowing out from the engines**

<p><img src="docs/previews/h3/0230.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0230.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0230.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0230.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A squirrel eating a burger.**

<p><img src="docs/previews/h3/0231.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0231.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0231.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0231.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A steam train moving on a mountainside**

<p><img src="docs/previews/h3/0232.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0232.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0232.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0232.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A storm trooper vacuuming the beach.**

<p><img src="docs/previews/h3/0233.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0233.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0233.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0233.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A super cool giant robot in Cyberpunk Beijing**

<p><img src="docs/previews/h3/0234.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0234.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0234.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0234.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A super robot protecting city**

<p><img src="docs/previews/h3/0235.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0235.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0235.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0235.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A teddy bear is playing drum kit in NYC Times Square.**

<p><img src="docs/previews/h3/0236.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0236.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0236.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0236.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a teddy bear is swimming in the ocean.**

<p><img src="docs/previews/h3/0732.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0732.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0732.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0732.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A teddy bear washing the dishes**

<p><img src="docs/previews/h3/0237.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0237.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0237.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0237.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tropical beach at sunrise, with palm trees and crystal-clear water in the foreground**

<p><img src="docs/previews/h3/0287.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0287.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0287.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0287.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Aerial panoramic video from a drone of a fantasy land.**

<p><img src="docs/previews/h3/0288.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0288.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0288.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0288.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An animated painting of fluffy white clouds moving in sky.**

<p><img src="docs/previews/h3/0290.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0290.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0290.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0290.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An artist brush painting on a canvas close up.**

<p><img src="docs/previews/h3/0291.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0291.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0291.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0291.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut feeding ducks on a sunny afternoon, reflection from the water.**

<p><img src="docs/previews/h3/0292.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0292.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0292.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0292.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut flying in space.**

<p><img src="docs/previews/h3/0312.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0312.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0312.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0312.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An astronaut is riding a horse in the space in a photorealistic style.**

<p><img src="docs/previews/h3/0313.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0313.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0313.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0313.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An epic tornado attacking above a glowing city at night, the tornado is made of smoke**

<p><img src="docs/previews/h3/0314.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0314.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0314.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0314.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an ice cream is melting on the table.**

<p><img src="docs/previews/h3/0822.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0822.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0822.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0822.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An Iron man is playing the electronic guitar, high electronic guitar.**

<p><img src="docs/previews/h3/0289.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0289.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0289.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0289.webp" width="24%" alt="GPT-6.1-Sol"></p>

**An oil painting of a couple in formal evening wear going home get caught in a heavy downpour with umbrellas**

<p><img src="docs/previews/h3/0315.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0315.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0315.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0315.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Ashtray full of butts on table, smoke flowing on black background, close-up**

<p><img src="docs/previews/h3/0316.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0316.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0316.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0316.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Balloon full of water exploding in extreme slow motion.**

<p><img src="docs/previews/h3/0317.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0317.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0317.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0317.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Busy freeway at night.**

<p><img src="docs/previews/h3/0318.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0318.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0318.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0318.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Campfire at night in a snowy forest with starry sky in the background.**

<p><img src="docs/previews/h3/0319.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0319.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0319.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0319.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Cinematic shot of Van Gogh's selfie, Van Gogh style**

<p><img src="docs/previews/h3/0320.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0320.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0320.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0320.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Close up of grapes on a rotating table.**

<p><img src="docs/previews/h3/0321.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0321.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0321.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0321.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Clown fish swimming through the coral reef**

<p><img src="docs/previews/h3/0322.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0322.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0322.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0322.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Few big purple plums rotating on the turntable. water drops appear on the skin during rotation. isolated on the white background. close-up. macro.**

<p><img src="docs/previews/h3/0323.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0323.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0323.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0323.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Fireworks.**

<p><img src="docs/previews/h3/0324.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0324.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0324.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0324.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Flying through fantasy landscapes.**

<p><img src="docs/previews/h3/0325.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0325.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0325.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0325.webp" width="24%" alt="GPT-6.1-Sol"></p>

**golden fish swimming in the ocean.**

<p><img src="docs/previews/h3/0883.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0883.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0883.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0883.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Gwen Stacy reading a book**

<p><img src="docs/previews/h3/0345.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0345.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0345.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0345.webp" width="24%" alt="GPT-6.1-Sol"></p>

**happy dog wearing a yellow turtleneck, studio, portrait, facing camera, dark background**

<p><img src="docs/previews/h3/0885.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0885.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0885.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0885.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Hyper-realistic spaceship landing on Mars**

<p><img src="docs/previews/h3/0346.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0346.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0346.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0346.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Iron Man flying in the sky**

<p><img src="docs/previews/h3/0368.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0368.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0368.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0368.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Macro slo-mo. Slow motion cropped closeup of roasted coffee beans falling into an empty bowl.**

<p><img src="docs/previews/h3/0369.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0369.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0369.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0369.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Motion colour drop in water, ink swirling in water, colourful ink in water, abstraction fancy dream cloud of ink.**

<p><img src="docs/previews/h3/0370.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0370.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0370.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0370.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Origami dancers in white paper, 3D render, on white background, studio shot, dancing modern dance.**

<p><img src="docs/previews/h3/0371.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0371.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0371.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0371.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Pacific coast, carmel by the sea ocean and waves.**

<p><img src="docs/previews/h3/0372.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0372.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0372.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0372.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Robot dancing in Times Square.**

<p><img src="docs/previews/h3/0373.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0373.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0373.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0373.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Sewing machine, old sewing machine working.**

<p><img src="docs/previews/h3/0374.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0374.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0374.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0374.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Snow rocky mountains peaks canyon. snow blanketed rocky mountains surround and shadow deep canyons. the canyons twist and bend through the high elevated mountain peaks.**

<p><img src="docs/previews/h3/0394.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0394.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0394.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0394.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Splash of turquoise water in extreme slow motion, alpha channel included.**

<p><img src="docs/previews/h3/0395.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0395.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0395.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0395.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Sunset time lapse at the beach with moving clouds and colors in the sky.**

<p><img src="docs/previews/h3/0396.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0396.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0396.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0396.webp" width="24%" alt="GPT-6.1-Sol"></p>

**The bund Shanghai, vibrant color**

<p><img src="docs/previews/h3/0412.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0412.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0412.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0412.webp" width="24%" alt="GPT-6.1-Sol"></p>

**this is how I do makeup in the morning.**

<p><img src="docs/previews/h3/0934.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0934.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0934.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0934.webp" width="24%" alt="GPT-6.1-Sol"></p>

**time lapse of sunrise on mars.**

<p><img src="docs/previews/h3/0935.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0935.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0935.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0935.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Turtle swimming in ocean.**

<p><img src="docs/previews/h3/0417.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0417.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0417.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0417.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Two pandas discussing an academic paper.**

<p><img src="docs/previews/h3/0418.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0418.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0418.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0418.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Vampire makeup face of beautiful girl, red contact lenses.**

<p><img src="docs/previews/h3/0419.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0419.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0419.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0419.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Vincent van Gogh is painting in the room**

<p><img src="docs/previews/h3/0420.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0420.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0420.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0420.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Yellow flowers swing in the wind**

<p><img src="docs/previews/h3/0421.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0421.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0421.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0421.webp" width="24%" alt="GPT-6.1-Sol"></p>

**Yoda playing guitar on the stage**

<p><img src="docs/previews/h3/0422.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0422.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0422.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0422.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Subject consistency

**a bear catching a salmon in its powerful jaws**

<p><img src="docs/previews/h3/0436.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0436.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0436.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0436.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bear climbing a tree**

<p><img src="docs/previews/h3/0437.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0437.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0437.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0437.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bear hunting for prey**

<p><img src="docs/previews/h3/0438.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0438.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0438.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0438.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bear sniffing the air for scents of food**

<p><img src="docs/previews/h3/0440.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0440.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0440.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0440.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more subject consistency prompts</b></summary>

**a bicycle accelerating to gain speed**

<p><img src="docs/previews/h3/0446.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0446.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0446.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0446.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bicycle gliding through a snowy field**

<p><img src="docs/previews/h3/0449.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0449.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0449.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0449.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bicycle leaning against a tree**

<p><img src="docs/previews/h3/0450.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0450.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0450.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0450.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bicycle slowing down to stop**

<p><img src="docs/previews/h3/0452.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0452.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0452.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0452.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bird building a nest from twigs and leaves**

<p><img src="docs/previews/h3/0455.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0455.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0455.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0455.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bird flying over a snowy forest**

<p><img src="docs/previews/h3/0456.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0456.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0456.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0456.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bird soaring gracefully in the sky**

<p><img src="docs/previews/h3/0458.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0458.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0458.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0458.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a boat accelerating to gain speed**

<p><img src="docs/previews/h3/0479.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0479.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0479.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0479.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a boat sailing smoothly on a calm lake**

<p><img src="docs/previews/h3/0482.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0482.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0482.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0482.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a boat slowing down to stop**

<p><img src="docs/previews/h3/0483.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0483.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0483.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0483.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bus accelerating to gain speed**

<p><img src="docs/previews/h3/0493.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0493.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0493.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0493.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bus stuck in traffic during rush hour**

<p><img src="docs/previews/h3/0496.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0496.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0496.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0496.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a bus turning a corner**

<p><img src="docs/previews/h3/0497.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0497.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0497.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0497.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car accelerating to gain speed**

<p><img src="docs/previews/h3/0501.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0501.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0501.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0501.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car slowing down to stop**

<p><img src="docs/previews/h3/0505.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0505.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0505.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0505.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car stuck in traffic during rush hour**

<p><img src="docs/previews/h3/0506.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0506.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0506.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0506.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a car turning a corner**

<p><img src="docs/previews/h3/0507.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0507.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0507.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0507.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat drinking water**

<p><img src="docs/previews/h3/0514.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0514.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0514.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0514.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat grooming itself meticulously with its tongue**

<p><img src="docs/previews/h3/0515.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0515.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0515.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0515.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat playing in park**

<p><img src="docs/previews/h3/0517.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0517.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0517.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0517.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cat running happily**

<p><img src="docs/previews/h3/0518.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0518.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0518.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0518.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cow bending down to drink water from a river**

<p><img src="docs/previews/h3/0532.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0532.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0532.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0532.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cow chewing cud while resting in a tranquil barn**

<p><img src="docs/previews/h3/0533.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0533.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0533.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0533.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a cow running to join a herd of its kind**

<p><img src="docs/previews/h3/0535.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0535.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0535.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0535.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dog drinking water**

<p><img src="docs/previews/h3/0544.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0544.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0544.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0544.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dog enjoying a peaceful walk**

<p><img src="docs/previews/h3/0545.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0545.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0545.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0545.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dog playing in park**

<p><img src="docs/previews/h3/0547.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0547.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0547.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0547.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a dog running happily**

<p><img src="docs/previews/h3/0548.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0548.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0548.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0548.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a giraffe bending down to drink water from a river**

<p><img src="docs/previews/h3/0566.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0566.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0566.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0566.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a giraffe running to join a herd of its kind**

<p><img src="docs/previews/h3/0568.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0568.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0568.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0568.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a giraffe taking a peaceful walk**

<p><img src="docs/previews/h3/0569.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0569.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0569.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0569.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse bending down to drink water from a river**

<p><img src="docs/previews/h3/0586.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0586.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0586.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0586.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse galloping across an open field**

<p><img src="docs/previews/h3/0587.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0587.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0587.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0587.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse running to join a herd of its kind**

<p><img src="docs/previews/h3/0589.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0589.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0589.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0589.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a horse taking a peaceful walk**

<p><img src="docs/previews/h3/0590.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0590.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0590.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0590.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle accelerating to gain speed**

<p><img src="docs/previews/h3/0612.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0612.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0612.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0612.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle cruising along a coastal highway**

<p><img src="docs/previews/h3/0615.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0615.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0615.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0615.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle gliding through a snowy field**

<p><img src="docs/previews/h3/0616.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0616.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0616.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0616.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle slowing down to stop**

<p><img src="docs/previews/h3/0618.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0618.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0618.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0618.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a motorcycle turning a corner**

<p><img src="docs/previews/h3/0619.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0619.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0619.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0619.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person drinking coffee in a cafe**

<p><img src="docs/previews/h3/0628.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0628.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0628.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0628.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person eating a burger**

<p><img src="docs/previews/h3/0629.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0629.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0629.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0629.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person giving a presentation to a room full of colleagues**

<p><img src="docs/previews/h3/0630.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0630.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0630.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0630.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person playing guitar**

<p><img src="docs/previews/h3/0631.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0631.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0631.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0631.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person swimming in ocean**

<p><img src="docs/previews/h3/0632.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0632.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0632.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0632.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person walking in the snowstorm**

<p><img src="docs/previews/h3/0633.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0633.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0633.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0633.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a person washing the dishes**

<p><img src="docs/previews/h3/0634.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0634.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0634.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0634.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sheep bending down to drink water from a river**

<p><img src="docs/previews/h3/0700.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0700.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0700.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0700.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sheep running to join a herd of its kind**

<p><img src="docs/previews/h3/0702.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0702.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0702.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0702.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a sheep taking a peaceful walk**

<p><img src="docs/previews/h3/0703.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0703.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0703.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0703.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a train accelerating to gain speed**

<p><img src="docs/previews/h3/0754.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0754.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0754.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0754.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a train crossing over a tall bridge**

<p><img src="docs/previews/h3/0756.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0756.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0756.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0756.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a train speeding down the tracks**

<p><img src="docs/previews/h3/0758.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0758.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0758.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0758.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck accelerating to gain speed**

<p><img src="docs/previews/h3/0760.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0760.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0760.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0760.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck anchored in a tranquil bay**

<p><img src="docs/previews/h3/0761.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0761.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0761.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0761.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck slowing down to stop**

<p><img src="docs/previews/h3/0764.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0764.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0764.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0764.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck stuck in traffic during rush hour**

<p><img src="docs/previews/h3/0765.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0765.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0765.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0765.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a truck turning a corner**

<p><img src="docs/previews/h3/0766.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0766.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0766.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0766.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a zebra bending down to drink water from a river**

<p><img src="docs/previews/h3/0798.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0798.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0798.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0798.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a zebra running to join a herd of its kind**

<p><img src="docs/previews/h3/0800.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0800.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0800.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0800.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a zebra taking a peaceful walk**

<p><img src="docs/previews/h3/0801.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0801.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0801.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0801.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an airplane accelerating to gain speed**

<p><img src="docs/previews/h3/0805.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0805.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0805.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0805.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an airplane landing smoothly on a runway**

<p><img src="docs/previews/h3/0807.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0807.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0807.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0807.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an airplane soaring through a clear blue sky**

<p><img src="docs/previews/h3/0809.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0809.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0809.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0809.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an airplane taking off**

<p><img src="docs/previews/h3/0810.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0810.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0810.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0810.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an elephant running to join a herd of its kind**

<p><img src="docs/previews/h3/0818.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0818.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0818.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0818.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an elephant spraying itself with water using its trunk to cool down**

<p><img src="docs/previews/h3/0819.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0819.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0819.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0819.webp" width="24%" alt="GPT-6.1-Sol"></p>

**an elephant taking a peaceful walk**

<p><img src="docs/previews/h3/0820.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0820.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0820.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0820.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

---

### Temporal flickering

**a dilapidated phone booth stood as a relic of a bygone era on the sidewalk, frozen in time**

<p><img src="docs/previews/h3/0540.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0540.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0540.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0540.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a laptop, frozen in time**

<p><img src="docs/previews/h3/0606.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0606.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0606.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0606.webp" width="24%" alt="GPT-6.1-Sol"></p>

**a toilet, frozen in time**

<p><img src="docs/previews/h3/0746.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0746.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0746.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0746.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a beautiful wrought-iron bench surrounded by blooming flowers**

<p><img src="docs/previews/h3/0238.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0238.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0238.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0238.webp" width="24%" alt="GPT-6.1-Sol"></p>

<details><summary><b>Show more temporal flickering prompts</b></summary>

**A tranquil tableau of a beautiful, handcrafted ceramic bowl**

<p><img src="docs/previews/h3/0239.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0239.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0239.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0239.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a bed**

<p><img src="docs/previews/h3/0240.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0240.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0240.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0240.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a bench**

<p><img src="docs/previews/h3/0241.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0241.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0241.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0241.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a bowl**

<p><img src="docs/previews/h3/0243.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0243.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0243.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0243.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a bowl on the kitchen counter**

<p><img src="docs/previews/h3/0242.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0242.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0242.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0242.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a bunch of grapes**

<p><img src="docs/previews/h3/0244.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0244.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0244.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0244.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a chair**

<p><img src="docs/previews/h3/0245.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0245.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0245.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0245.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a country estate's library featured elegant wooden shelves**

<p><img src="docs/previews/h3/0246.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0246.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0246.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0246.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a cup**

<p><img src="docs/previews/h3/0247.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0247.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0247.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0247.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a dining table**

<p><img src="docs/previews/h3/0248.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0248.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0248.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0248.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a peaceful orchid garden showcased a variety of delicate blooms**

<p><img src="docs/previews/h3/0249.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0249.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0249.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0249.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a picturesque barn was painted a warm shade of red and nestled in a picturesque meadow**

<p><img src="docs/previews/h3/0250.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0250.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0250.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0250.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a tranquil lakeside cabin nestled among tall pines, its reflection mirrored perfectly in the calm water**

<p><img src="docs/previews/h3/0251.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0251.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0251.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0251.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a vintage rocking chair was placed on the porch**

<p><img src="docs/previews/h3/0252.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0252.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0252.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0252.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of a wooden bench in the park**

<p><img src="docs/previews/h3/0253.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0253.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0253.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0253.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of alley**

<p><img src="docs/previews/h3/0254.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0254.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0254.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0254.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of an antique bowl**

<p><img src="docs/previews/h3/0255.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0255.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0255.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0255.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of an apple**

<p><img src="docs/previews/h3/0256.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0256.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0256.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0256.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of an exquisite mahogany dining table**

<p><img src="docs/previews/h3/0257.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0257.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0257.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0257.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of an ornate Victorian streetlamp standing on a cobblestone street corner, illuminating the empty night**

<p><img src="docs/previews/h3/0258.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0258.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0258.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0258.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of at the edge of the Arabian Desert, the ancient city of Petra beckoned with its enigmatic rock-carved façades**

<p><img src="docs/previews/h3/0259.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0259.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0259.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0259.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of bar**

<p><img src="docs/previews/h3/0260.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0260.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0260.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0260.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of barn**

<p><img src="docs/previews/h3/0261.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0261.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0261.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0261.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of bathroom**

<p><img src="docs/previews/h3/0262.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0262.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0262.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0262.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of bedroom**

<p><img src="docs/previews/h3/0263.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0263.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0263.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0263.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of beneath the shade of a solitary oak tree, an old wooden park bench sat patiently**

<p><img src="docs/previews/h3/0264.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0264.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0264.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0264.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of beside a tranquil pond, a weeping willow tree draped its branches gracefully over the water's surface, creating a serene tableau of reflection and calm**

<p><img src="docs/previews/h3/0265.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0265.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0265.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0265.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of cliff**

<p><img src="docs/previews/h3/0266.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0266.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0266.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0266.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of house**

<p><img src="docs/previews/h3/0267.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0267.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0267.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0267.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the Arizona desert, a massive stone bridge arched across a rugged canyon**

<p><img src="docs/previews/h3/0268.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0268.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0268.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0268.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the corner of the minimalist tea room, a bonsai tree added a touch of nature's beauty to the otherwise simple and elegant space**

<p><img src="docs/previews/h3/0270.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0270.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0270.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0270.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the desolate beauty of the American Southwest, Chaco Canyon's ancient ruins whispered tales of an enigmatic civilization that once thrived amidst the arid landscapes**

<p><img src="docs/previews/h3/0271.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0271.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0271.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0271.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the heart of Plaka, the neoclassical architecture of the old city harmonizes with the ancient ruins**

<p><img src="docs/previews/h3/0272.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0272.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0272.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0272.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the heart of the Utah desert, a massive sandstone arch spanned the horizon**

<p><img src="docs/previews/h3/0273.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0273.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0273.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0273.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the quaint village square, a traditional wrought-iron streetlamp featured delicate filigree patterns and amber-hued glass panels**

<p><img src="docs/previews/h3/0274.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0274.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0274.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0274.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the serene courtyard, a centuries-old stone well stood as a symbol of a bygone era, its mossy stones bearing witness to the passage of time**

<p><img src="docs/previews/h3/0275.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0275.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0275.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0275.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of in the Zen garden, a perfectly raked gravel path led to a serene rock garden**

<p><img src="docs/previews/h3/0269.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0269.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0269.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0269.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of indoor library**

<p><img src="docs/previews/h3/0276.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0276.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0276.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0276.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of kitchen**

<p><img src="docs/previews/h3/0277.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0277.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0277.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0277.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of palace**

<p><img src="docs/previews/h3/0278.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0278.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0278.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0278.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of restaurant**

<p><img src="docs/previews/h3/0279.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0279.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0279.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0279.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of the jail cell was small and dimly lit, with cold, steel bars**

<p><img src="docs/previews/h3/0282.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0282.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0282.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0282.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of the lampposts were adorned with Art Deco motifs, their geometric shapes and frosted glass creating a sense of vintage glamour**

<p><img src="docs/previews/h3/0283.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0283.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0283.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0283.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of the old red barn stood weathered and iconic against the backdrop of the countryside**

<p><img src="docs/previews/h3/0284.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0284.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0284.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0284.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of the Parthenon stands resolute in its classical elegance, a timeless symbol of Athens' cultural legacy**

<p><img src="docs/previews/h3/0280.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0280.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0280.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0280.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of the phone booth was tucked away in a quiet alley**

<p><img src="docs/previews/h3/0285.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0285.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0285.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0285.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of the Stonehenge presented itself as an enigmatic puzzle, each colossal stone meticulously placed against the backdrop of tranquility**

<p><img src="docs/previews/h3/0281.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0281.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0281.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0281.webp" width="24%" alt="GPT-6.1-Sol"></p>

**A tranquil tableau of tower**

<p><img src="docs/previews/h3/0286.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0286.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0286.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0286.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, a park bench with a view of the lake**

<p><img src="docs/previews/h3/0347.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0347.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0347.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0347.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, a pear**

<p><img src="docs/previews/h3/0348.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0348.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0348.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0348.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, a stop sign**

<p><img src="docs/previews/h3/0349.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0349.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0349.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0349.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, a tranquil Japanese tea ceremony room, with tatami mats, a delicate tea set, and a bonsai tree in the corner**

<p><img src="docs/previews/h3/0350.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0350.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0350.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0350.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, a tranquil pond was fringed by weeping cherry trees, their blossoms drifting lazily onto the glassy surface**

<p><img src="docs/previews/h3/0351.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0351.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0351.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0351.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, a vintage gas lantern, adorned with intricate details, gracing a historic cobblestone square**

<p><img src="docs/previews/h3/0352.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0352.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0352.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0352.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, amidst the cobblestone streets, an Art Nouveau lamppost stood tall**

<p><img src="docs/previews/h3/0353.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0353.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0353.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0353.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, amidst the hushed ambiance of the traditional tea room, a meticulously arranged tea set awaited, with porcelain cups, a bamboo whisk**

<p><img src="docs/previews/h3/0354.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0354.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0354.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0354.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, courtyard**

<p><img src="docs/previews/h3/0355.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0355.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0355.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0355.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, gas station**

<p><img src="docs/previews/h3/0356.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0356.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0356.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0356.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, in the heart of the old city, a row of ornate lantern-style streetlamps bathed the narrow alleyway in a warm, welcoming light**

<p><img src="docs/previews/h3/0357.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0357.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0357.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0357.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, in the picturesque square, a Gothic-style lamppost adorned with intricate stone carvings added a touch of medieval charm to the setting**

<p><img src="docs/previews/h3/0358.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0358.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0358.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0358.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, in the vast desert, an oasis nestled among dunes, featuring tall palm trees and an air of serenity**

<p><img src="docs/previews/h3/0359.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0359.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0359.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0359.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, nestled in the Zen garden, a rustic teahouse featured tatami seating and a traditional charcoal brazier**

<p><img src="docs/previews/h3/0360.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0360.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0360.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0360.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, parking lot**

<p><img src="docs/previews/h3/0361.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0361.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0361.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0361.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, phone booth**

<p><img src="docs/previews/h3/0362.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0362.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0362.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0362.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, the ornate Victorian streetlamp stands solemnly, adorned with intricate ironwork and stained glass panels**

<p><img src="docs/previews/h3/0365.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0365.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0365.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0365.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, the Parthenon's majestic Doric columns stand in serene solitude atop the Acropolis, framed by the tranquil Athenian landscape**

<p><img src="docs/previews/h3/0363.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0363.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0363.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0363.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, the Temple of Hephaestus, with its timeless Doric grace, stands stoically against the backdrop of a quiet Athens**

<p><img src="docs/previews/h3/0364.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0364.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0364.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0364.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, within the desolate desert, an oasis unfolded, characterized by the stoic presence of palm trees and a motionless, glassy pool of water**

<p><img src="docs/previews/h3/0366.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0366.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0366.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0366.webp" width="24%" alt="GPT-6.1-Sol"></p>

**In a still frame, within the historic library's reading room, rows of antique leather chairs and mahogany tables offered a serene haven for literary contemplation**

<p><img src="docs/previews/h3/0367.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0367.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0367.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0367.webp" width="24%" alt="GPT-6.1-Sol"></p>

**indoor gymnasium, frozen in time**

<p><img src="docs/previews/h3/0891.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0891.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0891.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0891.webp" width="24%" alt="GPT-6.1-Sol"></p>

**static view on a desert scene with an oasis, palm trees, and a clear, calm pool of water**

<p><img src="docs/previews/h3/0931.webp" width="24%" alt="MiniMax H3"> <img src="docs/previews/astra/0931.webp" width="24%" alt="GPT-6 Astra"> <img src="docs/previews/opus/0931.webp" width="24%" alt="Opus 5.5"> <img src="docs/previews/sol/0931.webp" width="24%" alt="GPT-6.1-Sol"></p>

</details>

## What the labels mean

Prompts from the human-labelled matched set carry the verdict the benchmark is built on, from VBench native scoring of the code route against MiniMax-H3:

| Tag | Meaning |
| --- | --- |
| VBench code↓ H3↑ | VBench scores the code-rendered route **lower** than the H3 clip |
| VBench both high | VBench scores both routes high |
| VBench code↑ H3↓ | VBench scores the code-rendered route **higher** than the H3 clip |
| ↻ | Score-reversal prompt: VBench scores the code route and the H3 clip **differently**; the *Score reversal* filter on the project page |

Untagged prompts come from the broader VBench generation study and have no human labels. A missing route means that model was not generated for that prompt.

## Results

Agreement with three-annotator completion labels on the matched set, and ranking of controlled behavioral violations against their unedited originals:

| Judge | Completion agreement | Code false reject | Pixel failed accepted |
| --- | ---: | ---: | ---: |
| Native modules | 71.6% | 26.1% | 75.0% |
| GPT-6.1-Sol (8 frames) | 92.7% | 1.3% | 37.5% |
| Claude Sonnet 5.5 (8 frames) | **93.9%** | **0%** | 43.8% |

On the 50 controlled behavioral violations, GPT-6.1-Sol ranks the edited clip below its original **50 / 50** across all five violation families; Sonnet ranks **46 / 50**. Native aesthetic rankings also diverge from human visual preference. Full tables ship with the code release.

## Release

| Asset | Status |
| --- | --- |
| Gallery videos (labelled set) | live on the [project page](https://openraiser.github.io/CodingVBench/) |
| Eval code | coming soon |
| 360 matched videos + majority / raw labels | coming soon |
| 60 controlled pairs with scene programs | coming soon |
| Frozen VLM prompts, frame sampling, score→decision rules | coming soon |

## Citation

```bibtex
@article{codingvbench2026,
  title   = {CodingVBench: Rethinking Video Quality Evaluation Beyond Generative Models},
  author  = {Anonymous},
  journal = {arXiv preprint},
  year    = {2026}
}
```

## License

[MIT](LICENSE).
