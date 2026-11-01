# Kinetic CSS Project Instructions

## 🌐 Deployment & Verification Workflow
- **Pre-Push Verification:** Always compile the site and run a local Python HTTP server on the compiled output directory before pushing changes to GitHub Pages:
  ```bash
  mkdir -p _site/css
  cp -R site/. _site/
  cp -R css/. _site/css/
  cp themes.json _site/themes.json
  [ -d assets ] && cp -R assets _site/assets
  python3 -m http.server 15555 --directory _site
  ```
- This guarantees that path resolution, asset links, and theme fetching match exactly what GitHub Pages will serve.
