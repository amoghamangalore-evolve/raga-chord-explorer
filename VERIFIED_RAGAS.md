# Verified 7-Note Ragas for Prototype

## Selection Criteria
- Must have exactly 7 notes in aroha (ascending)
- Must have exactly 7 notes in avaroha (descending)
- Well-known, commonly performed ragas
- Simple, straightforward structure (no vakra/crooked movements)

---

## Hindustani Ragas (5)

### 1. Bilawal
- **Aroha**: Sa Re Ga Ma Pa Dha Ni Sa (8 total including upper Sa)
- **Avaroha**: Sa Ni Dha Pa Ma Ga Re Sa (8 total including lower Sa)
- **PCs**: [0, 2, 4, 5, 7, 9, 11] (7 unique notes)
- **Notes**: All shuddha (S R G m P D N)
- **Western equivalent**: Major scale (Ionian)

### 2. Kafi
- **Aroha**: Sa Re ga Ma Pa Dha ni Sa
- **Avaroha**: Sa ni Dha Pa Ma ga Re Sa
- **PCs**: [0, 2, 3, 5, 7, 9, 10] (7 unique notes)
- **Notes**: Komal Ga, komal Ni (S R g m P D n)
- **Western equivalent**: Dorian mode

### 3. Bhairav
- **Aroha**: Sa re Ga Ma Pa dha Ni Sa
- **Avaroha**: Sa Ni dha Pa Ma Ga re Sa
- **PCs**: [0, 1, 4, 5, 7, 8, 11] (7 unique notes)
- **Notes**: Komal Re, komal Dha (S r G m P d N)
- **Western equivalent**: Bhairav (Phrygian dominant-like)

### 4. Kalyan
- **Aroha**: Sa Re Ga Ma^ Pa Dha Ni Sa
- **Avaroha**: Sa Ni Dha Pa Ma^ Ga Re Sa
- **PCs**: [0, 2, 4, 6, 7, 9, 11] (7 unique notes)
- **Notes**: Tivra Ma (S R G M^ P D N)
- **Western equivalent**: Lydian mode

### 5. Asavari
- **Aroha**: Sa Re ga Ma Pa dha ni Sa
- **Avaroha**: Sa ni dha Pa Ma ga Re Sa
- **PCs**: [0, 2, 3, 5, 7, 8, 10] (7 unique notes)
- **Notes**: Komal Ga, komal Dha, komal Ni (S R g m P d n)
- **Western equivalent**: Natural minor (Aeolian)

---

## Carnatic Ragas (5 Melakarta)

### 1. Shankarabharanam (Melakarta 29)
- **Aroha**: Sa Ri Ga Ma Pa Dha Ni Sa
- **Avaroha**: Sa Ni Dha Pa Ma Ga Ri Sa
- **PCs**: [0, 2, 4, 5, 7, 9, 11] (7 unique notes)
- **Notation**: S R2 G3 M1 P D2 N3
- **Western equivalent**: Major scale (same as Bilawal)

### 2. Kharaharapriya (Melakarta 22)
- **Aroha**: Sa Ri Ga Ma Pa Dha Ni Sa
- **Avaroha**: Sa Ni Dha Pa Ma Ga Ri Sa
- **PCs**: [0, 2, 3, 5, 7, 9, 10] (7 unique notes)
- **Notation**: S R2 G2 M1 P D2 N2
- **Western equivalent**: Dorian mode (same as Kafi)

### 3. Mayamalavagowla (Melakarta 15)
- **Aroha**: Sa Ri Ga Ma Pa Dha Ni Sa
- **Avaroha**: Sa Ni Dha Pa Ma Ga Ri Sa
- **PCs**: [0, 1, 4, 5, 7, 8, 11] (7 unique notes)
- **Notation**: S R1 G3 M1 P D1 N3
- **Western equivalent**: Similar to Bhairav

### 4. Kalyani (Melakarta 65)
- **Aroha**: Sa Ri Ga Ma Pa Dha Ni Sa
- **Avaroha**: Sa Ni Dha Pa Ma Ga Ri Sa
- **PCs**: [0, 2, 4, 6, 7, 9, 11] (7 unique notes)
- **Notation**: S R2 G3 M2 P D2 N3
- **Western equivalent**: Lydian mode (same as Kalyan)

### 5. Natabhairavi (Melakarta 20)
- **Aroha**: Sa Ri Ga Ma Pa Dha Ni Sa
- **Avaroha**: Sa Ni Dha Pa Ma Ga Ri Sa
- **PCs**: [0, 2, 3, 5, 7, 8, 10] (7 unique notes)
- **Notation**: S R2 G2 M1 P D1 N2
- **Western equivalent**: Natural minor (same as Asavari)

---

## Pitch Class Reference
```
0  = Sa
1  = re (komal Re / R1)
2  = Re (shuddha Re / R2)
3  = ga (komal Ga / G2)
4  = Ga (shuddha Ga / G3)
5  = Ma (shuddha Ma / M1)
6  = Ma^ (tivra Ma / M2)
7  = Pa
8  = dha (komal Dha / D1)
9  = Dha (shuddha Dha / D2)
10 = ni (komal Ni / N2)
11 = Ni (shuddha Ni / N3)
```

---

## Implementation Plan
1. Replace all existing ragas in ragas.ts
2. Implement these 10 ragas with verified scales
3. Test each raga for chord generation
4. Verify aroha/avaroha playback

**USER: Please verify these scales are correct before I implement them!**
