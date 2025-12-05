# Raga Validation Report

## Purpose
Validate the aroha (ascending) and avaroha (descending) scales for all ragas in the database.

## Current Ragas to Validate

### Hindustani Ragas

#### 1. Kalyan (formerly Yaman)
**Current Data:**
- Aroha: Sa Re Ga Ma^ Pa Dha Ni Sa
- Avaroha: Sa Ni Dha Pa Ma^ Ga Re Sa
- Notes: All shuddha notes except tivra Ma (Ma^)

**Standard Reference:**
- Aroha: Ni Re Ga Ma^ Pa Dha Ni Sa (starts from Ni below Sa)
- Avaroha: Sa Ni Dha Pa Ma^ Ga Re Sa
- **STATUS**: ⚠️ NEEDS CORRECTION - Aroha should start from lower Ni

---

#### 2. Bhupali
**Current Data:**
- Aroha: Sa Re Ga Pa Dha Sa
- Avaroha: Sa Dha Pa Ga Re Sa
- Notes: Pentatonic - no Ma or Ni

**Standard Reference:**
- Aroha: Sa Re Ga Pa Dha Sa
- Avaroha: Sa Dha Pa Ga Re Sa
- **STATUS**: ✓ CORRECT

---

#### 3. Bageshree
**Current Data:**
- Aroha: Sa Re ga Ma Pa Dha ni Sa
- Avaroha: Sa ni Dha Pa Ma ga Re Sa
- Notes: Komal Ga & Ni

**Standard Reference:**
- Aroha: Sa Re ga Ma Pa Dha ni Sa (may have vakra phrases)
- Avaroha: Sa ni Dha Pa Ma ga Re Sa
- **STATUS**: ⚠️ NEEDS VERIFICATION - May need vakra (crooked) phrases

---

#### 4. Kafi
**Current Data:**
- Aroha: Sa Re ga Ma Pa Dha ni Sa
- Avaroha: Sa ni Dha Pa Ma ga Re Sa
- Notes: Komal Ga & Ni

**Standard Reference:**
- Aroha: Sa Re ga Ma Pa Dha ni Sa
- Avaroha: Sa ni Dha Pa Ma ga Re Sa
- **STATUS**: ✓ APPEARS CORRECT

---

#### 5. Bhairav
**Current Data:**
- Aroha: Sa re Ga Ma Pa dha Ni Sa
- Avaroha: Sa Ni dha Pa Ma Ga re Sa
- Notes: Komal Re & Dha

**Standard Reference:**
- Aroha: Sa re Ga Ma Pa dha Ni Sa
- Avaroha: Sa Ni dha Pa Ma Ga re Sa
- **STATUS**: ✓ APPEARS CORRECT

---

#### 6. Khamaj
**Current Data:**
- Aroha: Sa Re Ga Ma Pa Dha Ni Sa
- Avaroha: Sa ni Dha Pa Ma Ga Re Sa (komal Ni in descent)

**Standard Reference:**
- Aroha: Sa Re Ga Ma Pa Dha Ni Sa
- Avaroha: Sa ni Dha Pa Ma Ga Re Sa
- **STATUS**: ✓ CORRECT - Uses both Ni and ni

---

#### 7. Todi
**Current Data:**
- Aroha: Sa re ga Ma^ Pa dha Ni Sa
- Avaroha: Sa Ni dha Pa Ma^ ga re Sa
- Notes: Komal Re, Ga, Dha; tivra Ma

**Standard Reference:**
- Aroha: Sa re ga Ma^ Pa dha Ni Sa
- Avaroha: Sa Ni dha Pa Ma^ ga re Sa
- **STATUS**: ✓ APPEARS CORRECT

---

#### 8. Durga
**Current Data:**
- Aroha: Sa Re Ma Pa Dha Sa
- Avaroha: Sa Dha Pa Ma Re Sa
- Notes: Pentatonic - no Ga, Ni

**Standard Reference:**
- Aroha: Sa Re Ma Pa Dha Sa
- Avaroha: Sa Dha Pa Ma Re Sa
- **STATUS**: ✓ CORRECT

---

### Carnatic Ragas

#### 9. Mohanam
**Current Data:**
- Aroha: Sa Re Ga Pa Dha Sa
- Avaroha: Sa Dha Pa Ga Re Sa
- Notes: Same as Bhupali (pentatonic)

**Standard Reference:**
- Aroha: Sa Re Ga Pa Dha Sa
- Avaroha: Sa Dha Pa Ga Re Sa
- **STATUS**: ✓ CORRECT

---

#### 10. Kalyani
**Current Data:**
- Aroha: Sa Re Ga Ma^ Pa Dha Ni Sa
- Avaroha: Sa Ni Dha Pa Ma^ Ga Re Sa
- Notes: Equivalent to Kalyan (tivra Ma)

**Standard Reference:**
- Aroha: Sa Re Ga Ma^ Pa Dha Ni Sa
- Avaroha: Sa Ni Dha Pa Ma^ Ga Re Sa
- **STATUS**: ✓ CORRECT (Carnatic melakartha - symmetric)

---

#### 11. Hindolam
**Current Data:**
- Aroha: Sa ga Ma dha ni Sa
- Avaroha: Sa ni dha Ma ga Sa
- Notes: Pentatonic - Sa ga Ma dha ni

**Standard Reference:**
- Aroha: Sa ga Ma dha ni Sa
- Avaroha: Sa ni dha Ma ga Sa
- **STATUS**: ✓ CORRECT

---

#### 12. Charukesi
**Current Data:**
- Aroha: Sa Re Ga Ma Pa dha Ni Sa
- Avaroha: Sa Ni dha Pa Ma Ga Re Sa
- Notes: Like western melodic minor b6

**Standard Reference:**
- Aroha: Sa Re Ga Ma Pa dha Ni Sa
- Avaroha: Sa Ni dha Pa Ma Ga Re Sa
- **STATUS**: ✓ APPEARS CORRECT

---

## Summary of Issues

### Critical Issues:
1. **Kalyan**: Aroha traditionally starts from lower Ni (Ni Re Ga Ma^ Pa Dha Ni Sa)

### Questions for User:
1. Should Kalyan aroha start from lower Ni or from Sa?
2. Are there specific traditional sources you'd like me to follow?
3. Should we include vakra (non-linear) movements in ragas like Bageshree?

## Next Steps:
1. Confirm corrections with user
2. Apply validated changes to ragas.ts
3. Add more ragas if needed
