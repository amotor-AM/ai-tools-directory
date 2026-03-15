# CSS Loading Issue - Debug Log

**Date:** 2026-03-15  
**Issue:** CSS not loading on GitHub Pages deployment despite file being served correctly  
**Site:** https://amotor-am.github.io/ai-tools-directory/

## Symptoms
- Page loads with HTML content
- No styling applied (appears as raw HTML with default browser styles)
- All Tailwind classes present in HTML but not rendered

## Verified Working
✅ CSS file exists at: `https://amotor-am.github.io/ai-tools-directory/_next/static/css/3a21c4658ae31b93.css`  
✅ CSS file size: 11,123 bytes (matches local build)  
✅ CSS contains all Tailwind classes (`.min-h-screen`, `.flex`, `.bg-white`, etc.)  
✅ MIME type: `text/css; charset=utf-8`  
✅ HTTP status: 200 (file is being served)  
✅ .nojekyll file deployed  
✅ HTML correctly references CSS with full path  

## Configurations Tested

### Attempt 1: basePath with .nojekyll
```javascript
// next.config.js
{
  output: 'export',
  basePath: '/ai-tools-directory',
  images: { unoptimized: true },
  trailingSlash: true,
}
```

**Result:** CSS path in HTML: `/ai-tools-directory/_next/static/css/...` ✅  
**Problem:** CSS file served correctly but NOT applied by browser ❌

### Attempt 2: No basePath
```javascript
// next.config.js  
{
  output: 'export',
  // basePath removed
  images: { unoptimized: true },
  trailingSlash: true,
}
```

**Result:** CSS path in HTML: `/_next/static/css/...` ❌  
**Problem:** CSS file NOT found (404) because it's actually at `/ai-tools-directory/_next/...` ❌

### Attempt 3: basePath + assetPrefix
```javascript
// next.config.js
{
  output: 'export',
  basePath: '/ai-tools-directory',
  assetPrefix: '/ai-tools-directory',
  images: { unoptimized: true },
  trailingSlash: true,
}
```

**Result:** CSS path in HTML: `/ai-tools-directory/_next/static/css/...` ✅  
**Problem:** CSS file served correctly but NOT applied by browser ❌

## Curl Tests

### CSS file accessibility:
```bash
curl -I https://amotor-am.github.io/ai-tools-directory/_next/static/css/3a21c4658ae31b93.css
# HTTP/2 200 
# content-type: text/css; charset=utf-8
# content-length: 11123
```

### .nojekyll file:
```bash
curl -I https://amotor-am.github.io/ai-tools-directory/.nojekyll
# HTTP/2 200
# content-type: application/octet-stream
```

### CSS content verification:
```bash
curl -s https://amotor-am.github.io/ai-tools-directory/_next/static/css/3a21c4658ae31b93.css | head -100
# Contains all Tailwind CSS classes ✅
```

## Browser Tests
- Tested in Chrome via OpenClaw browser automation
- Multiple page loads with fresh tabs
- Hard refreshes attempted
- Screenshots show completely unstyled page

## Possible Causes (Unconfirmed)

### 1. Browser Cache Issue?
- GitHub Pages cache might be serving old version to browsers
- Curl gets fresh version but browsers get cached version?
- **Test:** Wait 15-30 minutes for CDN propagation

### 2. CSP or Security Headers?
- Could be Content Security Policy blocking CSS
- **Test:** Check browser console for CSP errors (couldn't access console via automation)

### 3. Mixed Content?
- Site is HTTPS, CSS is HTTPS, so this seems unlikely
- **Test:** Verify no mixed content warnings in browser

### 4. JavaScript Required for CSS?
- Next.js might require JS to apply CSS in some cases?
- **Test:** Check if CSS is inlined or needs hydration

### 5. GitHub Pages Quirk?
- Some GitHub Pages-specific issue with Next.js static exports?
- **Test:** Deploy same build to Vercel and compare

## Recommended Next Steps

### Immediate Actions:
1. **Manual browser inspection:** Open DevTools, check Network tab, see if CSS request succeeds
2. **Check console:** Look for any error messages
3. **Wait for cache propagation:** GitHub Pages can take 10-15 minutes to fully update CDN

### Alternative Approaches:
1. **Deploy to Vercel:** Eliminate GitHub Pages as variable
2. **Inline critical CSS:** Add critical styles directly in HTML `<head>`
3. **Use CDN Tailwind:** Load Tailwind from CDN as fallback
4. **Try different build config:** Experiment with Next.js export options

### Debug Commands for Manual Testing:
```bash
# Check if CSS loads in browser DevTools:
# 1. Open https://amotor-am.github.io/ai-tools-directory/
# 2. F12 → Network tab → Filter CSS
# 3. Reload page
# 4. Check if CSS file loads (should be green 200 status)
# 5. Click CSS file → Preview tab → Verify content

# If CSS file loads but styles don't apply:
# - Check Console for errors
# - Verify CSS selector specificity
# - Check if JS is disabled
# - Try disabling browser extensions
```

## Files Created/Modified

### package.json
Added `postbuild` script:
```json
"postbuild": "touch out/.nojekyll"
```

### next.config.js (Current State)
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/ai-tools-directory',
  assetPrefix: '/ai-tools-directory',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
}
```

## Time Spent
~30 minutes of debugging  
3 deployment attempts  
Multiple configuration changes  
Issue remains unresolved

## Conclusion
The root cause is NOT:
- Missing .nojekyll file ✅ (verified deployed)
- Wrong CSS path ✅ (path is correct)
- Missing CSS file ✅ (file exists and is served)
- Broken CSS content ✅ (contains all needed classes)

The root cause IS:
- Unknown - possibly browser caching, CSP, or GitHub Pages CDN issue
- Requires manual browser inspection to diagnose further
