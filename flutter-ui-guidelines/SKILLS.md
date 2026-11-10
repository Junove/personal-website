# Skills shortlist for Flutter UI

Found through web search only. I couldn't open skills.sh or tessl.io (hosts blocked in this session), so I have no verified install counts or ratings, and I haven't read the skills' source. Check the rankings on skills.sh before installing. Nothing has been installed.

| Skill | Source | Why |
|---|---|---|
| Official Flutter skills (layout, architecture, widget previews, widget tests) | [flutter/skills](https://github.com/flutter/skills) | Official. Relevant: `flutter-build-responsive-layout`, `flutter-fix-layout-issues`, `flutter-apply-architecture-best-practices`, `flutter-add-widget-preview`, `flutter-add-widget-test`. Setup is described at docs.flutter.dev/ai/get-started. |
| `flutter-ui-design`, `flutter-ui-patterns` | [thiennc-tesoglobal/flutter-skills](https://tessl.io/registry/thiennc-tesoglobal/flutter-skills/0.10.0/files/skills/flutter-ui-design/SKILL.md) | Visual design (Material theming, typography, responsive) plus the widget patterns to implement it. |
| `flutter-widgets` | [hoangnguyen0403/agent-skills-standard](https://www.skills.sh/hoangnguyen0403/agent-skills-standard/flutter-widgets) | Widget-level hygiene: stateless by default, small const widgets, `ListView.builder`. |

## Vercel skills: not installed

The two relevant Vercel skills (`vercel-labs/agent-skills`) are not UI-agnostic:
- `react-best-practices` is React/Next.js performance rules.
- `web-design-guidelines` reviews HTML/CSS/ARIA against Vercel's Web Interface Guidelines.

Neither applies to Flutter widgets, so I skipped them as you specified. Some of the principles carry over and are reflected in `AGENTS.md` (accessibility, tap targets, contrast, avoiding work during render).
