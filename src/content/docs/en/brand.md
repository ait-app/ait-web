---
title: Brand & design
description: Ait’s bird mark, brand colors, and daytime visual system.
lang: en
slug: brand
group: reference
order: 7
---

Ait uses an orange-red folded bird flying toward the upper right. It represents movement across devices, connection, and action. Web, desktop, and mobile share the same mark. Supporting text uses system sans-serif fonts.

## Mark and wordmark

Two principal folds preserve the relationship between the main wing, head, and split tail. The horizontal lockup combines the bird with a path-based **AIT** wordmark, independent of installed fonts.

The product display name is **Ait** and the visual wordmark is **AIT**. This does not rename packages, commands, app IDs, or URLs.

## Daytime brand colors

| Token | Value | Purpose |
| --- | --- | --- |
| `brand.primary` | `#EF4B2C` | Main wing and body fold |
| `brand.secondary` | `#FF704D` | Forward-facing lighter fold |
| `brand.ink` | `#25282B` | Wordmark and primary text |
| `brand.canvas` | `#FAFAF8` | Warm white presentation background |
| `brand.surface` | `#FFFFFF` | White surfaces |
| `brand.border` | `#D8DADD` | Supporting borders |

Orange-red is a brand accent. Running, success, and error states use separate semantic styles. Text controls may use a higher-contrast accent text color without changing the mark’s production colors.

## Space and usage

Leave at least `0.2` times the mark’s visible height around it. Scale proportionally. Do not mirror, rotate, change its direction, or crop its geometry.

Use flat, solid colors for the mark. Do not add gradients, glow, dimensional textures, or third-party logos. Website favicons use the existing optically corrected small-size variant.

## Production assets

The editable vector source is `apps/mobile/src/branding/ait-mark.json` in the Ait repository. Production SVGs and platform icons are generated from this shared data.

This website reuses the official production SVGs. Read the [brand identity decision](https://github.com/ait-app/ait/blob/main/docs/decisions/branding/adr-051-ait-brand-identity.md) and explore the [brand assets](https://github.com/ait-app/ait/tree/main/assets/brand).
