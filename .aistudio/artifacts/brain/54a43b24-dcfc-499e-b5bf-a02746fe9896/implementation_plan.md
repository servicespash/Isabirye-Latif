# Implementation Plan - Google AdSense Monetization Integration (Revised)

Integrate Google AdSense (`ca-pub-6513032451507520`) professionally and unobtrusively to generate sustainable creator income without cluttering or obstructing user workflows.

## Proposed Changes

### 1. AdSense Script & `ads.txt` Configuration
- **`index.html`**: Insert the official AdSense async script tag in `<head>`:
  ```html
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6513032451507520" crossorigin="anonymous"></script>
  ```
- **`public/ads.txt`**: Create/update `public/ads.txt` with:
  ```text
  google.com, pub-6513032451507520, DIRECT, f08c47fec0942fa0
  ```

### 2. Reusable AdSense Component Setup (`src/components/AdSenseBanner.tsx`)
- Build a wrapper component supporting two chosen formats: Standard Responsive Display (for margins/sidebar) and Multiplex Grids (for template showcase bottom re-engagement).
- Ensure the component includes a fallback/placeholder state so it doesn't trigger layout shifts (CLS) while Google's script loads.
- Add `adsbygoogle-no-auto-ads` to critical interactive viewports and simulation canvases to prevent unwanted auto-injections.

### 3. Strategic, Low-Clutter Placements
- **Sidebar (`RepoRail.tsx`)**: Keep a vertical responsive display unit tucked cleanly alongside repository metrics.
- **Template Showcase / Footer (`TemplateBrowser.tsx` & `CymaticFooter.tsx`)**: Implement a Multiplex Grid configuration right at the bottom of the template browser and footer.

### 4. Verification Plan
- **Build & Lint**: Verify build stability using `compile_applet` and `lint_applet`.
- **Endpoint Check**: Confirm that `ads.txt` resolves publicly at `/ads.txt`.
