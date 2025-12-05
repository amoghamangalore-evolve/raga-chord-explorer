# Validation Checklist for Code Changes

## Mandatory Steps Before Claiming "Done"

### 1. Code Search & Impact Analysis
- [ ] Search for ALL usages of modified component/function
- [ ] Check if any usage overrides default parameters
- [ ] Identify all files that import the changed code
- [ ] Review all call sites to ensure compatibility

### 2. Compilation Check
- [ ] Run `npm run build` or check dev server for errors
- [ ] Verify no TypeScript errors
- [ ] Check for runtime errors in browser console

### 3. Functional Verification
- [ ] Test the feature manually in the browser
- [ ] Verify the change actually works as described
- [ ] Check edge cases and different scenarios
- [ ] Test on different screen sizes if UI change

### 4. Automated Testing
- [ ] Run `npm test` to verify unit tests pass
- [ ] Add new tests for new functionality
- [ ] Update existing tests if behavior changed
- [ ] Check test coverage for critical paths

### 5. Integration Testing
- [ ] Test feature in context of the whole application
- [ ] Verify no regressions in related features
- [ ] Check that user flow is not broken

### 6. Documentation
- [ ] Update relevant documentation
- [ ] Add code comments for complex logic
- [ ] Update TEST_STATUS.md if test changes made

## Example: Changing Keyboard Octave

### What I Did Wrong ❌
1. Changed default parameter in VirtualKeyboard component
2. Claimed it was done without checking
3. Didn't search for usages
4. Didn't verify in browser

### What I Should Have Done ✅
1. **Search**: `grep -r "VirtualKeyboard" **/*.tsx`
2. **Found**: ScaleExplorer.tsx explicitly passes `startOctave={1}`
3. **Fixed**: Changed the actual usage, not just the default
4. **Verify**: Open browser, play a note, confirm it sounds higher
5. **Test**: Check if any tests need updating
6. **Document**: Update this file with findings

## Verification Commands

```bash
# Check for compilation errors
npm run build

# Run all tests
npm test

# Search for component usages
grep -r "ComponentName" components/**/*.tsx app/**/*.tsx

# Check browser console
# Open http://localhost:3000 and check DevTools console

# Verify specific feature
# Manual testing in browser with specific steps
```

## Commit Message Template

```
[Feature/Fix]: Brief description

Changes:
- What was changed
- Why it was changed

Verification:
- ✅ Searched for all usages
- ✅ Tested in browser
- ✅ Tests passing (X/Y)
- ✅ No console errors

Impact:
- Files affected: [list]
- Breaking changes: [yes/no]
```

## Current Validation Status

### Latest Change: Play Button with Keyboard Animation (FIXED OCTAVE + STABILITY BUGS)
- **Change**: Added play button above virtual keyboard to play selected raga's aroha + visual keyboard animation
- **Files Modified**:
  - [ScaleExplorer.tsx](components/panels/ScaleExplorer.tsx) - Added playRagaScale function, play button UI, activeNote state, and cancel logic
  - [VirtualKeyboard.tsx](components/panels/VirtualKeyboard.tsx) - Added activeNote prop and yellow highlight styling
- **Verification Results**:
  - [x] Code search completed - ScaleExplorer used in page.tsx:35 (no props, no impact)
  - [x] Added useState, useEffect, useAudioStore imports
  - [x] Implemented playRagaScale async function with sequential note playback
  - [x] Added play button UI above Virtual Keyboard header
  - [x] **BUG FOUND BY USER #1**: Sa and Sa' played same pitch (octave not advancing)
  - [x] **BUG FIXED #1**: Added octave offset calculation (Math.floor(ragaPC / 12))
  - [x] **BUG FOUND BY USER #2**: Scale playback not stable when changing raga/Sa
  - [x] **BUG FIXED #2**: Added cancel token to stop previous playback
  - [x] **BUG FIXED #3**: Added useEffect to cancel on raga/Sa change
  - [x] **BUG FIXED #4**: Captured Sa value at playback start to avoid stale closure
  - [x] **FEATURE ADDED BY USER**: Keyboard animation showing which notes are playing
  - [x] Added activeNote state tracking in ScaleExplorer
  - [x] Pass activeNote prop to VirtualKeyboard component
  - [x] Implemented visual feedback with yellow highlighting and scale-95 effect
  - [x] Dev server compiling successfully (✓ Compiled in 102ms)
  - [ ] **MANUAL TEST NEEDED**: User must verify Sa' now plays higher than Sa
  - [ ] **MANUAL TEST NEEDED**: User must verify keyboard keys light up yellow while playing
  - [ ] **MANUAL TEST NEEDED**: User must verify playback cancels when changing raga or Sa
  - [ ] **MANUAL TEST NEEDED**: User must verify scale always starts from root note (Sa)
- **Implementation Details**:
  - Uses octave 4 (same as virtual keyboard)
  - Note duration: 0.6s, delay between notes: 400ms
  - Converts aroha PCs to absolute PCs using Sa
  - **Octave handling**: `octaveOffset = Math.floor(ragaPC / 12)` to handle PC 12+ (Sa', Re', etc.)
  - Example: PC=0 -> octave 4, PC=12 -> octave 5
  - Button disabled while playing
  - Visual feedback: "▶ Playing..." vs "▶ Play Scale"
  - **Keyboard animation**: Yellow gradient background, ring-4 ring-yellow-400, scale-95 during playback
  - White keys: from-yellow-300 to yellow-100 when in scale, from-yellow-200 to yellow-100 when out of scale
  - Black keys: from-yellow-500 to yellow-700 when in scale, from-yellow-600 to yellow-700 when out of scale
  - **Playback stability**:
    - Cancel token pattern to stop previous playback when starting new one
    - useEffect hook cancels playback when raga or Sa changes
    - Captured Sa value at start to prevent stale closure bugs
    - Check for cancellation in the playback loop before each note
- **Bug Fix Details**:
  - **Problem**: `(12 + sa) % 12 = sa`, so Sa (PC 0) and Sa' (PC 12) played same pitch
  - **Solution**: Extract octave from PC first (`Math.floor(ragaPC / 12)`), then apply Sa offset
  - **Code**: `octave = baseOctave + Math.floor(ragaPC / 12)`, `pc = (ragaPC % 12 + sa) % 12`
- **Tests**: 19/29 passing (metronome tests have unrelated failures)
- **Known Issues**: App has runtime errors (Metronome, useUIStore, Timer, MetronomePanel) - unrelated to this change

### Previous Change: Virtual Keyboard Octave
- **Change**: Modified startOctave from 1 to 4
- **Files Modified**:
  - [VirtualKeyboard.tsx](components/panels/VirtualKeyboard.tsx:15) - Changed default parameter
  - [ScaleExplorer.tsx](components/panels/ScaleExplorer.tsx:107) - Updated actual usage
- **Verification Results**:
  - [x] Code search completed - found override in ScaleExplorer.tsx
  - [x] Fixed actual usage, not just default
  - [x] Dev server compiling successfully (GET / 200)
  - [ ] **MANUAL TEST NEEDED**: User must verify in browser that notes sound higher
  - [x] Created VALIDATION_CHECKLIST.md for future changes

### Process Improvements Made
1. ✅ Created VALIDATION_CHECKLIST.md - mandatory checklist for all changes
2. ✅ Using TodoWrite tool to track validation tasks
3. ✅ Documented search process for finding component usages
4. ✅ Admitted mistake and fixed properly

### Next Steps
- User needs to manually test the keyboard at http://localhost:3000
- Notes should now be in C4-C6 range (higher/lead sound)
- If not working, I will debug further
