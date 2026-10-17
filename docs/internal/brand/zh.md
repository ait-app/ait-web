---
title: 品牌与设计
description: Ait 的飞鸟标志、品牌色与日间视觉系统。
lang: zh
slug: brand
group: reference
order: 7
---

Ait 使用向右上方飞行的橙红折纸飞鸟，表达跨端流动、连接与行动。网页、桌面和移动端使用同源图形；辅助文字沿用系统无衬线字体。

## 标志与字标

图形由两个主要折面组成，保持主翼、头部与分叉尾部的关系。横向组合使用飞鸟与路径化的 **AIT** 字标，不依赖设备安装的字体。

产品显示名称为 **Ait**，视觉字标为 **AIT**。不据此更改包名、命令、应用 ID 或 URL。

## 日间品牌色

| 令牌 | 色值 | 用途 |
| --- | --- | --- |
| `brand.primary` | `#EF4B2C` | 主翼与主体折面 |
| `brand.secondary` | `#FF704D` | 朝前的浅色折面 |
| `brand.ink` | `#25282B` | 字标与主要文字 |
| `brand.canvas` | `#FAFAF8` | 暖白展示底色 |
| `brand.surface` | `#FFFFFF` | 白底承载面 |
| `brand.border` | `#D8DADD` | 辅助边框 |

橙红色用于品牌强调，运行、成功与错误等状态仍使用独立的语义样式。文字控件可采用对比度更高的强调文字色，不改变 Logo 的生产色值。

## 留白与使用

标志周围最小净空为图形可见高度的 `0.2` 倍。缩放保持原始比例，不镜像、旋转、更改朝向或裁断图形。

主标使用平面纯色，不添加渐变、发光、立体材质或第三方 Logo。网页 favicon 使用已有的小尺寸光学校正版本。

## 生产资源

当前品牌的唯一可编辑矢量源位于 Ait 仓库的 `apps/mobile/src/branding/ait-mark.json`。生产 SVG 与各端图标从这一数据源统一生成。

本站直接复用正式生产 SVG。完整规则见 [BI 决策](https://github.com/ait-app/ait/blob/main/docs/decisions/branding/adr-051-ait-brand-identity.md)，资产目录见 [品牌资源](https://github.com/ait-app/ait/tree/main/assets/brand)。
