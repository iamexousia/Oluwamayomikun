# A little something

A responsive static website. No framework, build step, external font requests, or package installation is required. All fonts (subset WOFF2) and the generated hero image are included locally.

## Personalize

Edit `personalize.js` to add your names, memories, date idea and sign-off. Optional `whatsappNumber` accepts your international number using digits only. When set, the reply buttons open a prefilled WhatsApp message for her to send. Otherwise, the page offers to copy her reply. Responses are not stored, sent automatically, or reported to you.

## Vercel

Import this directory as the project root. Select the **Other** framework preset, leave the build command empty and use the root (`.`) as the output directory. Alternatively, run the Vercel CLI from this folder. There are no environment variables or secrets.

The page asks search engines not to index it, but this does not restrict who can open a deployed link. Replace the bracketed personal placeholders before sharing.

## Files

- `index.html`: content and layout
- `style.css`: responsive design and reduced-motion support
- `script.js`: independent relationship/date response flows and clipboard fallback
- `personalize.js`: editable personal details
- `assets/`: self-hosted fonts and generated envelope photograph (WebP with JPEG fallback)
- `vercel.json`: hosting settings

Typography: Cormorant Garamond, Manrope and Caveat from Google Fonts under the SIL Open Font License. Licenses included in assets/fonts. Hero photograph generated with OpenAI image generation for this project.
