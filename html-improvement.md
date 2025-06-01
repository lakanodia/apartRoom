# HTML Structure Improvement Plan for index.njk

## Current Structure Analysis

The HTML structure of `source/templates/index.njk` is generally well-organized but has several areas for improvement in naming conventions, semantic HTML, and accessibility.

## Identified Issues and Minimal Changes

### 1. CSS Class Naming Issues
**Current Problems:**
- Inconsistent naming conventions (kebab-case vs mixed case)
- Typos in class names
- Non-semantic class names
- Redundant naming patterns

**Specific Issues Found:**
- `backround-section` → should be `background-section` (typo on line 110)
- `backround-div` → should be `background-div` (typo on line 111) 
- `backround-text` → should be `background-text` (typo on line 112)
- `decsription` → should be `description` (typo on line 116)
- `conact-text-div` → should be `contact-text-div` (typo on line 548)
- `conact-text` → should be `contact-text` (typo on line 549)

### 2. HTML Structure Improvements

**Header Section (lines 56-108):**
- `nav-div-left` → could be `navbar-brand-container` for better semantics
- `li-name` → should be `nav-item` to follow Bootstrap conventions

**Hero Section (lines 110-124):**
- Fix typos in class names
- Consider using `<h1>` properly (currently has closing `</h2>` on line 113)

**Services Section (lines 126-190):**
- `services-section` → could be `amenities-section` for better content description
- `services-container` → `amenities-grid`
- `services-div` → `amenity-card`
- `service-icon` → `amenity-icon`
- `service-title` → `amenity-title`
- `service-text` → `amenity-description`

**Room Photos Section (lines 192-228):**
- Structure is good, minor naming improvements:
- `room-main-div` → `photos-container`
- `room-flex-div` → `photos-row`
- `room-div` → `photo-card`

**Sightseeing Section (lines 230-317):**
- Inconsistent numbered div naming (`sightseeing-div-1`, `sightseeing-div-2`, etc.)
- Should use a consistent pattern like `attraction-card`
- Image classes could be simplified from `sightseeing-img-1` to `attraction-image`

**Feedback Section (lines 320-542):**
- Structure is good, follows Bootstrap carousel conventions properly

**Contact/Book Section (lines 544-582):**
- Fix typo in `conact-text-div` and `conact-text`
- Consider renaming to `booking-section` for clarity

**Footer Section (lines 598-656):**
- Structure is good, no major changes needed

### 3. Semantic HTML Improvements

**Minimal changes to improve semantics:**
- Ensure proper heading hierarchy (fix h1/h2 mismatch on line 113)
- Add `role="img"` to decorative icons where appropriate
- Consider adding `aria-label` to social media links for better accessibility

## Recommended Minimal Changes

### Priority 1 - Fix Typos (Zero Breaking Changes) ✅ COMPLETED
1. Fix all typos in class names:
   - `backround-*` → `background-*` ✅ DONE
   - `decsription` → `description` ✅ DONE
   - `conact-*` → `contact-*` ✅ DONE

### Priority 2 - Semantic Improvements ✅ COMPLETED  
1. Fix heading tag mismatch on line 113 (`<h1>` with `</h2>`) ✅ DONE
2. Standardize sightseeing section class names to use consistent pattern ✅ DONE

### Priority 3 - CSS Class Naming (Requires CSS Updates) ✅ COMPLETED
1. Rename services-related classes to amenities-related for better semantics ✅ DONE
2. Simplify numbered class patterns in sightseeing section ✅ DONE  
3. Use more semantic Bootstrap class names where appropriate ✅ DONE

## Implementation Impact

**Low Risk Changes:**
- Typo fixes (Priority 1) - These are safe to implement immediately
- Heading tag fix - Simple HTML correction

**Medium Risk Changes:**
- Semantic improvements requiring CSS updates
- Class name standardization

**Recommendation:**
Start with Priority 1 changes as they improve code quality without breaking functionality. Priority 2 and 3 changes should be coordinated with CSS file updates to maintain styling.