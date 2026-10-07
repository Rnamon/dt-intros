# Dice Throne Intros

התיקייה הזו היא המבנה של ה-repo ב-GitHub. כל קובץ צריך להיות בתיקייה הנכונה ובשם המדויק מהרשימה, אחרת האפליקציה לא תמצא אותו.

## מבנה התיקיות

```
dice-throne-intros/
├── index.html            ← האפליקציה
├── sw.js                 ← מספר הגרסה + עבודה בלי אינטרנט
├── manifest.json         ← שם, אייקון ומסך מלא להתקנה בטלפון
├── icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
├── app-logo.webp        ← הלוגו במסך הבית
├── data/
│   ├── dice-throne-dialogues.json
│   └── dice-throne-generic-lines.json
├── art/                  ← תמונות הגיבורים, 720×783, ‎.webp
├── logos/                ← לוגואים, PNG שקוף
├── bkg/                  ← רקעים למסכי התפריט (בהמשך)
└── _guides/              ← המדריך לאזור הבטוח (לא עולה לאפליקציה)
```

## חוקי שמות

- אותיות קטנות באנגלית בלבד, מקף במקום רווח: `Moon Elf` → `moon-elf`, `Spider-Man` → `spider-man`
- **תמונת גיבור:** `art/<שם>.webp` — למשל `art/moon-elf.webp`
- **תמונת טרנספורמציה:** `art/<שם>-<צורה>.webp` — למשל `art/pale-lady-werewolf.webp`
- **לוגו:** `logos/<שם>.png` — למשל `logos/moon-elf.png`
- גיבור בלי לוגו יציג את השם שלו בכתב, כך שאפשר להעלות בהדרגה.

## מפרט הקבצים

| | גודל | פורמט | הערות |
|---|---|---|---|
| תמונת גיבור | 720×783 בדיוק, בכולן | `.webp` | פנים ופרטים חשובים בתוך האזור הבטוח: x 70–650, y 239–487 (השכבה ב-`_guides`) |
| תמונת טרנספורמציה | 720×783 | `.webp` | אותו אזור בטוח. כדאי שהפנים יהיו בערך באותו מקום כמו בתמונה הרגילה, כדי שההחלפה תיראה חלקה |
| לוגו | קנבס אחיד לכולם, למשל 450×250 | `.png` שקוף | הלוגו ממלא את הקנבס, בלי שוליים שקופים גדולים |

פוטושופ שומר WebP ישירות (Save a Copy → WebP). איכות 85 מספיקה.

## הוספת תמונות ולוגואים

1. ב-GitHub, נכנסים לתיקייה `art` (או `logos`).
2. **Add file → Upload files**, וגוררים את הקבצים. הם נכנסים לתיקייה שאתה נמצא בה.
3. **Commit changes**.

תוך כמה דקות (GitHub צריך עד 10 דקות לפרסם שינוי) התמונה מופיעה באפליקציה. אין צורך להעלות גרסה.

**כדי לא לשבור כלום:**
- השם בדיוק לפי הרשימה למטה. GitHub מבחין בין אותיות גדולות לקטנות: `Monk.webp` לא יימצא, רק `monk.webp`.
- הסיומת באותיות קטנות: `.webp` ולא `.WEBP`.
- להחליף תמונה קיימת: מעלים קובץ באותו שם בדיוק, והוא מחליף את הישן. בטלפון הישנה עוד תוצג פעם אחת, והחדשה תופיע מהפעם שאחריה (או מיד אחרי העלאת גרסה).
- לא נוגעים ב-`index.html`, `sw.js`, `manifest.json` ובתיקייה `data` כשמוסיפים תמונות.
- קובץ עם שם שגוי לא שובר את האפליקציה. הוא פשוט לא יופיע, והגיבור ימשיך להציג ראשי תיבות או את השם בכתב.

## העלאת גרסה חדשה

1. פותחים את `sw.js` ב-GitHub (אייקון העיפרון), ומשנים את השורה `const VERSION = '0.3';` למספר הבא.
2. **Commit changes**, יחד עם הקבצים ששונו (למשל `index.html` חדש).
3. בטלפון: האפליקציה מתעדכנת לבד בפתיחה הבאה, או מיד דרך **Settings → Check for updates**. המספר החדש מופיע תחת **Version**.

## רשימת קבצים

סמן כשהקובץ מוכן. ב-GitHub התיבות האלה לחיצות.

| גיבור | תמונה | לוגו |
|---|---|---|
| **Season 1** | | |
| Barbarian | `art/barbarian.webp` | `logos/barbarian.png` |
| Monk | `art/monk.webp` | `logos/monk.png` |
| Moon Elf | `art/moon-elf.webp` | `logos/moon-elf.png` |
| Ninja | `art/ninja.webp` | `logos/ninja.png` |
| Paladin | `art/paladin.webp` | `logos/paladin.png` |
| Pyromancer | `art/pyromancer.webp` | `logos/pyromancer.png` |
| Shadow Thief | `art/shadow-thief.webp` | `logos/shadow-thief.png` |
| Treant | `art/treant.webp` | `logos/treant.png` |
| **Season 2** | | |
| Artificer | `art/artificer.webp` | `logos/artificer.png` |
| Cursed Pirate | `art/cursed-pirate.webp` | `logos/cursed-pirate.png` |
| ↳ Cursed Pirate: Cursed | `art/cursed-pirate-cursed.webp` | — |
| Gunslinger | `art/gunslinger.webp` | `logos/gunslinger.png` |
| Huntress | `art/huntress.webp` | `logos/huntress.png` |
| Samurai | `art/samurai.webp` | `logos/samurai.png` |
| Seraph | `art/seraph.webp` | `logos/seraph.png` |
| Tactician | `art/tactician.webp` | `logos/tactician.png` |
| Vampire Lord | `art/vampire-lord.webp` | `logos/vampire-lord.png` |
| **Marvel** | | |
| Black Panther | `art/black-panther.webp` | `logos/black-panther.png` |
| Black Widow | `art/black-widow.webp` | `logos/black-widow.png` |
| Captain Marvel | `art/captain-marvel.webp` | `logos/captain-marvel.png` |
| Doctor Strange | `art/doctor-strange.webp` | `logos/doctor-strange.png` |
| Loki | `art/loki.webp` | `logos/loki.png` |
| Spider-Man | `art/spider-man.webp` | `logos/spider-man.png` |
| Scarlet Witch | `art/scarlet-witch.webp` | `logos/scarlet-witch.png` |
| Thor | `art/thor.webp` | `logos/thor.png` |
| **X-Men** | | |
| Cyclops | `art/cyclops.webp` | `logos/cyclops.png` |
| Gambit | `art/gambit.webp` | `logos/gambit.png` |
| Iceman | `art/iceman.webp` | `logos/iceman.png` |
| Jean Grey | `art/jean-grey.webp` | `logos/jean-grey.png` |
| ↳ Jean Grey: Dark Phoenix | `art/jean-grey-phoenix.webp` | — |
| Psylocke | `art/psylocke.webp` | `logos/psylocke.png` |
| Rogue | `art/rogue.webp` | `logos/rogue.png` |
| Storm | `art/storm.webp` | `logos/storm.png` |
| Wolverine | `art/wolverine.webp` | `logos/wolverine.png` |
| **Outcasts** | | |
| Headless Horseman | `art/headless-horseman.webp` | `logos/headless-horseman.png` |
| Necromancer | `art/necromancer.webp` | `logos/necromancer.png` |
| Pale Lady | `art/pale-lady.webp` | `logos/pale-lady.png` |
| ↳ Pale Lady: Werewolf | `art/pale-lady-werewolf.webp` | — |
| Raveness | `art/raveness.webp` | `logos/raveness.png` |
| **Vanguard** | | |
| Druid | `art/druid.webp` | `logos/druid.png` |
| ↳ Druid: Bear Form | `art/druid-bear.webp` | — |
| ↳ Druid: Cat Form | `art/druid-cat.webp` | — |
| Duelist | `art/duelist.webp` | `logos/duelist.png` |
| Forgemaster | `art/forgemaster.webp` | `logos/forgemaster.png` |
| Sun Elf | `art/sun-elf.webp` | `logos/sun-elf.png` |
| **Santa v Krampus** | | |
| Santa | `art/santa.webp` | `logos/santa.png` |
| Krampus | `art/krampus.webp` | `logos/krampus.png` |
| **Singles** | | |
| Alchemist | `art/alchemist.webp` | `logos/alchemist.png` |
| Mystic Brawler | `art/mystic-brawler.webp` | `logos/mystic-brawler.png` |
| Deadpool | `art/deadpool.webp` | `logos/deadpool.png` |

### צ'קליסט

**Season 1**

- [ ] `art/barbarian.webp`
- [ ] `logos/barbarian.png`
- [ ] `art/monk.webp`
- [ ] `logos/monk.png`
- [ ] `art/moon-elf.webp`
- [ ] `logos/moon-elf.png`
- [ ] `art/ninja.webp`
- [ ] `logos/ninja.png`
- [ ] `art/paladin.webp`
- [ ] `logos/paladin.png`
- [ ] `art/pyromancer.webp`
- [ ] `logos/pyromancer.png`
- [ ] `art/shadow-thief.webp`
- [x] `logos/shadow-thief.png`
- [ ] `art/treant.webp`
- [ ] `logos/treant.png`

**Season 2**

- [ ] `art/artificer.webp`
- [ ] `logos/artificer.png`
- [ ] `art/cursed-pirate.webp`
- [ ] `art/cursed-pirate-cursed.webp`
- [ ] `logos/cursed-pirate.png`
- [ ] `art/gunslinger.webp`
- [x] `logos/gunslinger.png`
- [ ] `art/huntress.webp`
- [ ] `logos/huntress.png`
- [ ] `art/samurai.webp`
- [ ] `logos/samurai.png`
- [ ] `art/seraph.webp`
- [ ] `logos/seraph.png`
- [ ] `art/tactician.webp`
- [ ] `logos/tactician.png`
- [ ] `art/vampire-lord.webp`
- [ ] `logos/vampire-lord.png`

**Marvel**

- [ ] `art/black-panther.webp`
- [ ] `logos/black-panther.png`
- [ ] `art/black-widow.webp`
- [ ] `logos/black-widow.png`
- [ ] `art/captain-marvel.webp`
- [ ] `logos/captain-marvel.png`
- [ ] `art/doctor-strange.webp`
- [ ] `logos/doctor-strange.png`
- [ ] `art/loki.webp`
- [ ] `logos/loki.png`
- [ ] `art/spider-man.webp`
- [ ] `logos/spider-man.png`
- [ ] `art/scarlet-witch.webp`
- [ ] `logos/scarlet-witch.png`
- [ ] `art/thor.webp`
- [ ] `logos/thor.png`

**X-Men**

- [ ] `art/cyclops.webp`
- [ ] `logos/cyclops.png`
- [ ] `art/gambit.webp`
- [ ] `logos/gambit.png`
- [ ] `art/iceman.webp`
- [ ] `logos/iceman.png`
- [ ] `art/jean-grey.webp`
- [ ] `art/jean-grey-phoenix.webp`
- [ ] `logos/jean-grey.png`
- [ ] `art/psylocke.webp`
- [ ] `logos/psylocke.png`
- [ ] `art/rogue.webp`
- [ ] `logos/rogue.png`
- [ ] `art/storm.webp`
- [ ] `logos/storm.png`
- [ ] `art/wolverine.webp`
- [ ] `logos/wolverine.png`

**Outcasts**

- [ ] `art/headless-horseman.webp`
- [ ] `logos/headless-horseman.png`
- [ ] `art/necromancer.webp`
- [ ] `logos/necromancer.png`
- [x] `art/pale-lady.webp`
- [x] `art/pale-lady-werewolf.webp`
- [ ] `logos/pale-lady.png`
- [ ] `art/raveness.webp`
- [ ] `logos/raveness.png`

**Vanguard**

- [ ] `art/druid.webp`
- [ ] `art/druid-bear.webp`
- [ ] `art/druid-cat.webp`
- [ ] `logos/druid.png`
- [ ] `art/duelist.webp`
- [ ] `logos/duelist.png`
- [ ] `art/forgemaster.webp`
- [ ] `logos/forgemaster.png`
- [ ] `art/sun-elf.webp`
- [ ] `logos/sun-elf.png`

**Santa v Krampus**

- [ ] `art/santa.webp`
- [ ] `logos/santa.png`
- [ ] `art/krampus.webp`
- [ ] `logos/krampus.png`

**Singles**

- [ ] `art/alchemist.webp`
- [ ] `logos/alchemist.png`
- [ ] `art/mystic-brawler.webp`
- [ ] `logos/mystic-brawler.png`
- [ ] `art/deadpool.webp`
- [ ] `logos/deadpool.png`

## סיכום

- 50 תמונות: 45 גיבורים ועוד 5 טרנספורמציות (Cursed, Dark Phoenix, Werewolf, Bear, Cat)
- 45 לוגואים
- הצורה הראשונה של כל גיבור (human, jean, lady, druid) היא התמונה הרגילה ולא צריכה קובץ נפרד
