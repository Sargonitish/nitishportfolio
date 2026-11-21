# 🛠️ How to Update Your 3D Neo-Brutalism Portfolio

Welcome! This guide is written specifically for you so that you can easily update your portfolio—add projects, change your bio, update your photo or resume, tweak colors, test on your phone, and publish your latest work—even if you're just getting started.

Every file in the codebase also contains clear landmark comments like:
```ts
/* ==========================================================================
   EDIT HERE: ...
   ========================================================================== */
```
You can search (`Ctrl + F` or `Cmd + F`) for `EDIT HERE` in your code editor at any time to jump directly to any editable section!

---

## 📁 1. Project Structure

Here is a map of the most important files and folders:

```
nitish-3d-neobrutalism-portfolio/
├── public/                     # Static files (images, PDF, logos, shots)
│   ├── me-cut.webp             # Your standing portrait cutout (transparent WebP)
│   ├── nitish-resume.pdf       # Your downloadable resume / CV
│   ├── logos/                  # Logos for colleges, hackathons, companies
│   ├── shots/                  # Screenshots / previews of your projects
│   └── certs/                  # Certificate images for the 3D stack
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root HTML layout, SEO meta tags, title & favicon
│   │   ├── page.tsx            # Main page entry point
│   │   └── studio.css          # Design system: colors, borders, shadows, responsive CSS
│   └── studio/
│       ├── data.ts             # ⭐ THE MAIN DATA FILE (bio, projects, experience, certs)
│       ├── Hero.tsx            # Hero section (title, portrait, terminal HUD, CTA buttons)
│       ├── NeoScene3D.tsx      # Three.js 3D floating geometrical shapes
│       ├── Chrome.tsx          # Navigation bar, mobile hamburger menu & drawer
│       ├── Sections.tsx        # About, Work, Process, Experience, Skills, FAQ, Footer
│       └── Chat.tsx            # Easter egg interactive terminal / AI prompt assistant
├── HOW_TO_UPDATE.md            # This update guide!
├── package.json                # Project dependencies & scripts
└── next.config.ts              # Next.js build configuration
```

---

## 👤 2. How to Change Personal Info, Bio & Links

Open **`src/studio/data.ts`**. Right at the very top (look for `/* EDIT HERE: PERSONAL INFO */`), you'll find:

```ts
export const me = {
  name: "Nitish S",
  handle: "sargonitish",
  email: "nitiships14@gmail.com",
  phone: "6369393673",
  location: "Chennai, India",
  call: "mailto:nitiships14@gmail.com",
  resume: "/nitish-resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Sargonitish" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nitish-ping-perfect" },
    { label: "Portfolio", href: "http://nitishportfolio.xo.je/" },
  ],
};
```

### Changing Your Profile Photo:
1. Save your transparent cutout image as a WebP file.
2. Put it in `public/` and name it `me-cut.webp` (or name it `my-new-photo.webp`).
3. If you used a new filename, open `src/studio/Hero.tsx` and change `src="/me-cut.webp"` to your new file name.

### Changing Your Resume:
1. Place your new PDF in the `public/` folder, for example `public/my-resume.pdf`.
2. In `src/studio/data.ts`, update:
   ```ts
   resume: "/my-resume.pdf",
   ```
3. In `src/studio/Hero.tsx`, update the download button:
   ```tsx
   <a href="/my-resume.pdf" download className="neo-btn neo-btn-green">
   ```

### Changing the Hero Terminal Bio & Focus:
Open **`src/studio/Hero.tsx`** and look for `/* EDIT HERE: Dedicated Interactive Terminal HUD Deck */`:
- Line ~132: edit `Nitish S.` or your subtitle.
- Line ~142: edit your `current_focus` tags (e.g. `AI-Driven Education`, `IoT Devices`, etc.).

---

## 🚀 3. How to Add, Edit, or Remove a Project

All project cards live in **`src/studio/data.ts`** under `export const projects: Project[] = [ ... ];`.

### Copy-Paste Template to Add a New Project:

Copy the block below, paste it into the `projects` list in `src/studio/data.ts`, and fill in your details:

```ts
{
  name: "My Awesome Project",
  logo: "/logos/vit-logo.png",            // Logo inside public/logos/
  cat: "Full-Stack Web App",              // Category badge
  group: "Web apps",                      // Filter tab: "Websites" | "Web apps" | "AI" | "Software" | "Open source"
  tint: "#ffd2b8",                        // Pastel card hover background tint
  desc: "A brief 1-2 sentence description explaining what you built, the problem it solves, and the impact.",
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"], // Tech stack pills
  live: "https://myproject.com",          // (Optional) Live URL. Remove or comment out if none
  code: "https://github.com/Sargonitish/repo", // (Optional) GitHub repo URL
  shot: "/shots/bsprep.webp",             // Preview screenshot inside public/shots/
},
```

### Tips for Project Images:
- Place preview screenshots in `public/shots/` (WebP format recommended for ultra-fast loading).
- Place icons/logos in `public/logos/`.

---

## 🎨 4. How to Customize Colors, Fonts & the 3D Scene

### Colors & Shadows:
Open **`src/app/studio.css`**. At the top (lines 25–45), you will find the 3D Neo-Brutalism design tokens:

```css
:root {
  --neo-bg: #f5f4ef;       /* Cream background with subtle dot grid */
  --neo-black: #0d0d0d;    /* Deep charcoal black for borders & text */
  --neo-yellow: #ffea00;   /* Electric Neon Yellow */
  --neo-pink: #ff3399;     /* Hot Cyber Pink */
  --neo-cyan: #00e5ff;     /* Vivid Cyber Cyan */
  --neo-green: #00e676;    /* Vibrant Lime Green */
  --neo-purple: #b266ff;   /* Electric Purple */
  --neo-orange: #ff5400;   /* Radiant Neo Orange */

  --neo-border: 3.5px solid var(--neo-black);
  --neo-shadow: 7px 7px 0px var(--neo-black);
}
```
Change any hex color code, and the entire website will automatically update its theme!

### 3D Floating Shapes Scene:
Open **`src/studio/NeoScene3D.tsx`**.
Look for the section marked `/* EDIT HERE: Shape placements & colors */`:
- You can change shape geometries (`THREE.TorusGeometry`, `THREE.BoxGeometry`, `THREE.DodecahedronGeometry`, `THREE.OctahedronGeometry`, etc.).
- You can change their colors (e.g. `0xffea00` for yellow, `0xff3399` for pink, `0x00e5ff` for cyan).
- You can adjust their `[x, y, z]` coordinates or add new ones.

---

## 📱 5. Testing on Different Screen Sizes

Your site is built to be responsive across every screen:
- **Small phones** (320px – 480px)
- **Large phones** (480px – 768px)
- **Tablets** (768px – 1024px)
- **Laptops & Desktops** (1024px – 1440px)
- **Ultra-Wide screens** (2560px+)

### In Chrome / Edge DevTools:
1. Open your browser and navigate to `http://localhost:3000`.
2. Press `F12` (or right-click anywhere and choose **Inspect**).
3. Press `Ctrl + Shift + M` (`Cmd + Shift + M` on Mac) to toggle the **Device Toolbar**.
4. Test with these presets:
   - **iPhone SE / Small Android**: `360 x 640`
   - **iPhone 14 / Pixel 7**: `390 x 844`
   - **iPad Mini / Tablet**: `768 x 1024`
   - **Laptop**: `1366 x 768`
   - **Desktop**: `1920 x 1080`
5. Test both **Portrait** and **Landscape** modes using the rotate button in the toolbar.
6. Verify there is zero horizontal scrollbar (`overflow-x: clip` ensures this).

### Testing on Your Real Phone:
1. Make sure your phone and laptop are on the same Wi-Fi network.
2. In your terminal, run `npm run dev -- -H 0.0.0.0`.
3. Check your laptop's local IP address (run `ipconfig` on Windows or `ifconfig` on Mac/Linux, look for IPv4 e.g. `192.168.1.5`).
4. On your phone's browser, visit `http://192.168.1.5:3000`.

---

## 💻 6. How to Run Locally & Publish Updates

### Running Locally:
```bash
# 1. Open terminal in the project directory:
cd c:\Users\nitis\Downloads\nitish-3d-neobrutalism-portfolio

# 2. Start the local development server:
npm run dev

# 3. Open in your browser:
# http://localhost:3000
```

### Checking for Errors (Building):
Before publishing, always test the production build to ensure there are no broken links or syntax errors:
```bash
npm run build
```

### Publishing Updates to GitHub & Vercel / Netlify:
```bash
# 1. Stage all your changes:
git add .

# 2. Commit with a message:
git commit -m "Update projects and responsive styling"

# 3. Push to your main branch:
git push origin main
```
If your repository is connected to Vercel, Netlify, or GitHub Pages, it will automatically deploy within 60 seconds!

---

## ❓ 7. Common Problems & Quick Fixes

| Problem | Cause | How to Fix |
| :--- | :--- | :--- |
| **Changes aren't showing up in the browser** | Browser cached old files | Press `Ctrl + F5` (or `Cmd + Shift + R`) to force a hard refresh. |
| **`npm run dev` fails with "port in use"** | Another process is using port 3000 | Run `npm run dev -- -p 3001` to start on port 3001. |
| **Image is broken or doesn't appear** | File path or spelling is wrong | Check that the image is inside `public/`. In code, paths start with `/` (e.g. `/shots/myimage.webp`, not `/public/shots/myimage.webp`). |
| **New project doesn't show under a filter** | `group` property doesn't match filter | Make sure `group` is one of: `"AI"`, `"Software"`, `"Web apps"`, or `"Websites"`. |
| **Horizontal scrollbar appears on phone** | An unconstrained image or text element | Make sure you use `clamp()` for large font sizes or wrap elements in `max-w-full`. |
| **Terminal / command gives PowerShell quote error** | Windows PowerShell escaping | Run commands using `cmd.exe /c "..."` or standard command prompt. |

---

*Enjoy building and showcasing your work! If you ever want to tweak the design further, simply search for `EDIT HERE` in your project.*
