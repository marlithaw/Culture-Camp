import fs from 'node:fs/promises';

const builtRoutine = {
  'Source status': 'Built',
  'Teacher-facing guide': 'Built',
  'Student-facing lesson': 'Partial',
  'Slide sequence': 'Built',
  'Rehearsal card': 'Partial',
  'Coaching look-for': 'Built',
  'Grade-band translation': 'Built',
  'Culture Playbook placement': 'Yes',
};
const partialEmbedded = {
  'Source status': 'Partial',
  'Teacher-facing guide': 'Partial',
  'Student-facing lesson': 'Partial',
  'Slide sequence': 'Need',
  'Rehearsal card': 'Partial',
  'Coaching look-for': 'Partial',
  'Grade-band translation': 'Need',
  'Culture Playbook placement': 'Yes',
};
const quickCards = {
  'Source status': 'Partial',
  'Teacher-facing guide': 'Partial',
  'Student-facing lesson': 'N/A',
  'Slide sequence': 'Need',
  'Rehearsal card': 'Partial',
  'Coaching look-for': 'Partial',
  'Grade-band translation': 'Partial',
  'Culture Playbook placement': 'Yes',
};
const partialDeck = {
  'Source status': 'Partial',
  'Teacher-facing guide': 'Partial',
  'Student-facing lesson': 'N/A',
  'Slide sequence': 'Partial',
  'Rehearsal card': 'Need',
  'Coaching look-for': 'Partial',
  'Grade-band translation': 'Partial',
  'Culture Playbook placement': 'Yes',
};

const cardPatches = {
  'Grade-Band Arrival & First Five': {
    status: 'Built',
    source: '17_SCHOOLWIDE_ROUTINES/Arrival_and_First_Five_Guide.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/Arrival_and_First_Five_Deck.md',
    resources: builtRoutine,
    resourceNeeded: 'Source complete: use the routine guide and authored deck handoff for adult moves, student steps, recognition, reteach, coaching look-fors, and by-grade-band practice.',
    adult: 'Stand at the threshold, model entry and First Five, narrate the expected sequence, recognize visible evidence, and reset the threshold routine if it slips.',
    student: 'Pause, enter calmly, place materials, begin the opening task, and rebuild the entry or First Five when cued.',
    rehearsal: 'Model the threshold entry, run it once, reset to the doorway at the first sloppy move, then rerun until the first five minutes hold.',
    recognition: 'Recognize calm entry, materials ready, Do Now started quickly, and respectful greeting response.',
    reteach: 'Reset to the threshold or first working step, name the exact fix, and rerun the smallest broken segment.',
    coach: 'Look for threshold presence, Do Now visibility, students working within 60 seconds, and low adult narration by minute five.',
  },
  'Grade-Band Hallway Routine': {
    status: 'Built',
    source: '17_SCHOOLWIDE_ROUTINES/Hallway_Transitions_Guide.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/Hallway_Transitions_Deck.md',
    resources: builtRoutine,
    resourceNeeded: 'Source complete: use the hallway guide and authored deck handoff for adult positioning, student line steps, reteach, recognition, and grade-band practice.',
    adult: 'Assemble the line at voice 0, position in the back third, use silent cues first, and reinforce after the line holds the routine.',
    student: 'Travel at voice 0, stay right, hold spacing, keep eyes forward, and ignore passing distractions.',
    rehearsal: 'Practice threshold formation first, travel a short distance, stop at the first drift, rebuild spacing or voice, then continue.',
    recognition: 'Recognize voice 0, clean right-side travel, line spacing, and no engagement with passing groups.',
    reteach: 'Stop the line, reform it, and rebuild the next 20 feet at voice 0 before continuing.',
    coach: 'Look for adult position, back-third line strength, silent cue use, and arrival that is as controlled as departure.',
  },
  'Grade-Band Bathroom Routine': {
    status: 'Partial',
    source: '05_CULTURE_CAMP/Day-by-Day_Teacher_Guide.md; 05_CULTURE_CAMP/Day-by-Day_Student_Practice_Plan.md; 05_CULTURE_CAMP/Culture_Camp_Fidelity_Checklist.md',
    resources: partialEmbedded,
    resourceNeeded: 'Embedded source exists in Culture Camp day-by-day files; still package a standalone bathroom routine overlay or quick card if this card must be independently printable.',
    adult: 'Teach the signal, wait, go, return, and reset sequence; model the return step and run a small-group reset when the routine breaks.',
    student: 'Signal, wait for approval, go, return, reset the place in line or room, and redo the step if sloppy.',
    rehearsal: 'Model the bathroom signal and return sequence, practice once, stop at the first unclear return, and rerun the smallest step.',
    recognition: 'Recognize quiet wait, clean return, and fast reset back into the group routine.',
    reteach: 'Return students to the last clean step, restate signal-wait-go-return-reset, and rerun without adding consequence language first.',
    coach: 'Look for a visible permission signal, controlled wait, clean return, and no public-space drift after re-entry.',
  },
  'Grade-Band Cafeteria Routine': {
    status: 'Built',
    source: '17_SCHOOLWIDE_ROUTINES/Cafeteria_Routines_Guide.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/Cafeteria_Routines_Deck.md',
    resources: builtRoutine,
    resourceNeeded: 'Source complete: use the cafeteria guide and authored deck handoff for entry, meal period, cleanup, dismissal, recognition, and look-fors.',
    adult: 'Set the entry path, supervise table voice, circulate, cue cleanup, and hold table-by-table dismissal.',
    student: 'Enter, sit or move to food path as directed, use table voice, clean the area, sit in dismissal-ready posture, and exit when released.',
    rehearsal: 'Practice entry, voice level, cleanup, and dismissal signal; stop and rerun the table routine if the voice or cleanup breaks.',
    recognition: 'Recognize clean table voice, patient dismissal posture, and responsible cleanup.',
    reteach: 'Freeze the routine, name the step that broke, rebuild the table or line, and rerun before release.',
    coach: 'Look for door handoff, adult circulation, last two-minute voice reset, clean table dismissal, and no doorway clustering.',
  },
  'Grade-Band Recess Routine': {
    status: 'Built',
    source: '17_SCHOOLWIDE_ROUTINES/Recess_and_Playground_Guide.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/Recess_and_Playground_Deck.md',
    resources: builtRoutine,
    resourceNeeded: 'Source complete: use the recess/playground guide and authored deck handoff for boundaries, inclusion, recall, repair, and coaching look-fors.',
    adult: 'Pre-correct boundaries, spread adult supervision, teach inclusion and recall, and reset play before conflict grows.',
    student: 'Use the assigned space, include peers, respond to recall, resolve small issues with practiced language, and re-enter calmly.',
    rehearsal: 'Practice boundary walk, inclusion prompt, recall signal, and re-entry reset before release into play.',
    recognition: 'Recognize inclusive play, safe body control, fast recall response, and calm re-entry.',
    reteach: 'Stop play briefly, return to the boundary or recall point, model the expected move, and restart.',
    coach: 'Look for adult spread, visible inclusion, fast recall, and re-entry that does not carry playground energy into instruction.',
  },
  'Grade-Band Classroom Exit Routine': {
    status: 'Built',
    source: '17_SCHOOLWIDE_ROUTINES/Classroom_Exit_Routine_Guide.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/Classroom_Exit_Deck.md',
    resources: builtRoutine,
    resourceNeeded: 'Source complete: use the classroom exit guide and authored deck handoff for closing phrase, cleanup, line-up, threshold release, recognition, and look-fors.',
    adult: 'Cue exit before the bell, name value evidence, hold the threshold, set hallway voice before release, and award points during the routine.',
    student: 'Pack when cued, clear the workspace, line up at voice 0, wait for release, and cross the threshold in hallway posture.',
    rehearsal: 'Practice the final two-minute sequence from cue to threshold release; rerun the line-up if it breaks.',
    recognition: 'Recognize room reset, voice 0 line formation, waiting for release, and controlled threshold crossing.',
    reteach: 'Hold the class, rebuild the threshold move, and rerun the classroom-to-hallway shift.',
    coach: 'Look for exit starting before the bell, room reset, threshold control, and hallway expectations beginning inside the classroom.',
  },
  'Grade-Band Dismissal Routine': {
    status: 'Partial',
    source: '05_CULTURE_CAMP/Day-by-Day_Teacher_Guide.md; 05_CULTURE_CAMP/Day-by-Day_Student_Practice_Plan.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/Classroom_Exit_Deck.md',
    resources: partialEmbedded,
    resourceNeeded: 'Dismissal source exists inside Culture Camp day-by-day files and classroom exit deck notes; still package a standalone dismissal routine overlay if this card must stand alone.',
    adult: 'Practice line-up and release before dismissal begins, hold the door threshold, correct the line before release, and capture one reteach note for tomorrow.',
    student: 'Line up, wait for release, exit in order, hold posture through the threshold, and reflect on the strongest and weakest routine.',
    rehearsal: 'Practice the dismissal line and release pattern before the actual exit; reset to seats and rerun if the line breaks.',
    recognition: 'Recognize calm bodies, orderly release, threshold control, and final exit that mirrors morning entry.',
    reteach: 'Reset to seats or the line-up point, name the broken step, and rehearse again before final exit.',
    coach: 'Look for dismissal rehearsal before release, controlled doorway, calm final handoff, and no rushed exit through chaos.',
  },
  'Teacher Implementation Packet': {
    status: 'Built',
    source: '03_TEACHER_IMPLEMENTATION/TEACHER_FIELD_PACKET/Assembled_Teacher_Field_Packet.md',
    resources: {...quickCards, 'Source status': 'Built', 'Teacher-facing guide': 'Built', 'Rehearsal card': 'Built'},
    resourceNeeded: 'Packet is built as the portable teacher-facing operating layer; remaining work is separating grade-band quick-card variants if needed.',
  },
  'Quick Cards K-2': {status: 'Partial', source: '03_TEACHER_IMPLEMENTATION/TEACHER_FIELD_PACKET quick cards; 03_TEACHER_IMPLEMENTATION/00_Vision_Brief.md; Teacher_Implementation_Playbook.md; Script_Card_Set.md', resources: quickCards, resourceNeeded: 'Generic quick cards and K-2 guidance exist; package a standalone K-2 quick card if the board needs a separate printable file.'},
  'Quick Cards 3-5': {status: 'Partial', source: '03_TEACHER_IMPLEMENTATION/TEACHER_FIELD_PACKET quick cards; 03_TEACHER_IMPLEMENTATION/00_Vision_Brief.md; Teacher_Implementation_Playbook.md; Script_Card_Set.md', resources: quickCards, resourceNeeded: 'Generic quick cards and 3-5 guidance exist; package a standalone 3-5 quick card if the board needs a separate printable file.'},
  'Quick Cards 6-8': {status: 'Partial', source: '03_TEACHER_IMPLEMENTATION/TEACHER_FIELD_PACKET quick cards; 03_TEACHER_IMPLEMENTATION/00_Vision_Brief.md; Teacher_Implementation_Playbook.md; Script_Card_Set.md', resources: quickCards, resourceNeeded: 'Generic quick cards and 6-8 guidance exist; package a standalone 6-8 quick card if the board needs a separate printable file.'},
  'Grade_Band_Deck_K-2': {status: 'Partial', source: '15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff per-routine and value decks', resources: partialDeck, resourceNeeded: 'Grade-band content exists inside per-routine and value decks; create a standalone K-2 deck only if a separate deck title is required.'},
  'Grade_Band_Deck_3-5': {status: 'Partial', source: '15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff per-routine and value decks', resources: partialDeck, resourceNeeded: 'Grade-band content exists inside per-routine and value decks; create a standalone 3-5 deck only if a separate deck title is required.'},
  'Grade_Band_Deck_6-8': {status: 'Partial', source: '15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff per-routine and value decks', resources: partialDeck, resourceNeeded: 'Grade-band content exists inside per-routine and value decks; create a standalone 6-8 deck only if a separate deck title is required.'},
  'Behavior_Ladder_Training_Deck': {status: 'Partial', source: '18_BEHAVIOR_INTERVENTION_LADDER/Behavior_Intervention_Ladder_Program_Guide.md; Behavior_Intervention_Ladder_Scenario_Bank_by_Band.md; 15_SLIDE_DECK_DRAFTS/Responsive_Behavior_Plan_Training_Deck.md', resources: {...partialDeck, 'Teacher-facing guide': 'Built', 'Coaching look-for': 'Built', 'Grade-band translation': 'Built'}, resourceNeeded: 'Behavior ladder operating source and banded scenario bank are complete; standalone Behavior_Ladder_Training_Deck.md was not found.'},
  'ISS_Detention_Training_Deck': {status: 'Partial', source: '19_ISS_AND_RESTORATIVE_DETENTION/ISS_and_Restorative_Detention_Program_Guide.md; Level_5_and_ISS_by_Grade_Band.md; Level_5_Implementation_Look-Fors.md', resources: {...partialDeck, 'Teacher-facing guide': 'Built', 'Coaching look-for': 'Built', 'Grade-band translation': 'Built'}, resourceNeeded: 'ISS/detention operating source and grade-band guidance are complete; standalone ISS_Detention_Training_Deck.md was not found.'},
  'Tier2_Tier3_Training_Deck': {status: 'Partial', source: '20_TIER2_AND_TIER3_LOCAL_OPERATING_LAYER/Module_04_Overview.md; Tier_2_and_Tier_3_Local_Threshold_Map.md; Tier_2_and_Tier_3_Scenario_Calibration_by_Band.md', resources: {...partialDeck, 'Teacher-facing guide': 'Built', 'Grade-band translation': 'Built'}, resourceNeeded: 'Tier 2/Tier 3 operating source and banded scenario calibration are complete; standalone Tier2_Tier3_Training_Deck.md was not found.'},
};

function applyCardPatch(card, patch) {
  Object.assign(card, {
    ...patch,
    teaches: patch.teaches ?? `Evidence-audited tracker row for ${card.title}.`,
    why: patch.why ?? 'The live board should distinguish built source, embedded source, and standalone packaging gaps.',
    srr: patch.srr ?? card.srr,
    adult: patch.adult ?? card.adult,
    student: patch.student ?? card.student,
    rehearsal: patch.rehearsal ?? card.rehearsal,
    recognition: patch.recognition ?? card.recognition,
    reteach: patch.reteach ?? card.reteach,
    coach: patch.coach ?? card.coach,
  });
}

function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (q) {
      if (ch === '"' && next === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
function csvCell(v) { return '"' + String(v ?? '').replace(/"/g, '""') + '"'; }
function stringifyCSV(rows) { return rows.map(r => r.map(csvCell).join(',')).join('\n') + '\n'; }

const csvUpdates = {
  '01': {source_anchor_examples: '01_START_HERE/Stakeholder_Navigation_Map.md; 15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/_Content_Handoff/00_HANDOFF_MANIFEST.md; 16_CLAUDE_DESIGN_HANDOFF/Bundle_Navigation_Map.md', grade_band_differences: 'MET | Stakeholder_Navigation_Map.md points teachers and coaches to banded source folders; grade-band doctrine is distributed across 03, 06, 17, 18, 19, 20, and the slide handoff manifest.', slide_alignment: 'MET | 00_HANDOFF_MANIFEST.md; Design_Brief_2026-06-01.md; Bundle_Navigation_Map.md', tracker_crosswalk_backlog: 'CLOSED | Navigation evidence verified in Start Here plus design and deck source maps.', main_gap: 'CLOSED 2026-06-04: Navigation coverage verified through Stakeholder_Navigation_Map.md, Bundle_Navigation_Map.md, and the deck handoff manifest; grade-band map coverage is distributed across operating folders.'},
  '02': {source_anchor_examples: '02_LEADERSHIP_ALIGNMENT/90-Day_Leadership_Decision_Map.md; Decision_Log.md; RACI_Cleanup_Sheet.md; Weekly_Leadership_Tactical_Agenda.md', tracker_crosswalk_backlog: 'CLOSED | Leadership live decision coverage verified through decision map, decision log, RACI cleanup, and weekly tactical agenda.', main_gap: 'CLOSED 2026-06-04: Leadership decision checklist function is covered by 90-Day_Leadership_Decision_Map.md, Decision_Log.md, RACI_Cleanup_Sheet.md, and Weekly_Leadership_Tactical_Agenda.md.'},
  '03': {source_anchor_examples: '03_TEACHER_IMPLEMENTATION/TEACHER_FIELD_PACKET/Assembled_Teacher_Field_Packet.md; 00_Vision_Brief.md; Teacher_Implementation_Playbook.md; Script_Card_Set.md', training_facilitation: 'MET | Teacher packet is packaged through TEACHER_FIELD_PACKET/Assembled_Teacher_Field_Packet.md and supported by teacher guidance and practice labs.', grade_band_differences: 'PARTIAL | K-2, 3-5, and 6-8 shifts are named in guidance; generic quick cards exist; standalone banded quick cards were not found.', tracker_crosswalk_backlog: 'PARTIAL | Teacher field packet is complete; separate grade-band quick-card packaging remains live follow-up.', main_gap: 'PARTIAL 2026-06-04: Teacher field packet is packaged and grade-band refinements are present in guidance; standalone K-2, 3-5, and 6-8 quick cards still need packaging.'},
  '06': {source_anchor_examples: '06_MORNING_MEETING_CULTURE_LAB/v.2-morning_meeting_interactive_guide.html; Skeletons/Morning_Meeting_Program_Manual.md; Skeletons/Morning_Meeting_Observation_Tool.md; Skeletons/Morning_Meeting_Grade-Band_Adaptation_Guide.md', operating_artifacts_visible: 'MET | Skeletons include program manual, minute-by-minute guide, message board templates, prompt banks, practice move bank, data tracker, observation tool, and grade-band adaptation guide.', coaching_observation: 'MET | Skeletons/Morning_Meeting_Observation_Tool.md; 13/Morning_Meeting_Walkthrough_Form.md; 13/Rubric_Alignment_Crosswalk.md', grade_band_differences: 'MET | Skeletons/Morning_Meeting_Grade-Band_Adaptation_Guide.md gives K-2, 3-5, and 6-8 adaptations.', tracker_crosswalk_backlog: 'CLOSED | Interactive guide and observation logic have editable markdown counterparts in Skeletons.', main_gap: 'CLOSED 2026-06-04: Morning Meeting logic converted to editable docs through Skeletons program manual, observation tool, data tracker, prompt banks, and grade-band adaptation guide.'},
  '13': {source_anchor_examples: '13/00_Vision_Brief.md; Observation_and_Coaching_Tool.md; Morning_Meeting_Walkthrough_Form.md; Culture_Camp_Fidelity_Tool.md; Rubric_Evidence_Tracker.md', coaching_observation: 'MET | Vision brief separates quick walkthroughs from deeper coaching; observation, walkthrough, fidelity, calibration, coaching, and evidence tracker files define cadence.', data_permissions: 'PARTIAL | 14/Observation_Record_Schema.md and Stakeholder_Permissions_Map.md connect evidence to data/visibility rules.', grade_band_differences: 'N/A | Coaching cadence is organized by tool and use case; grade-band look-fors live in operating folders.', slide_alignment: 'MET | Coaching_Observation_and_Rubric_Alignment_Deck.md and matching HTML deck exist.', tracker_crosswalk_backlog: 'CLOSED | Tool cadence verified from vision brief plus walkthrough, fidelity, coaching, calibration, and evidence tracker files.', main_gap: 'CLOSED 2026-06-04: Coaching tool cadence is specified through the folder vision brief and the observation, walkthrough, fidelity, calibration, coaching, and evidence tracker tools.'},
  '14': {source_anchor_examples: '14/App_Module_Map.md; Backend_Data_Architecture.md; Data_Dictionary.md; Dashboard_Indicator_Map.md; Stakeholder_Permissions_Map.md', operating_artifacts_visible: 'MET | App module map, backend architecture, data dictionary, dashboard map, evidence conversion logic, object schemas, record schemas, and permissions map are present.', data_permissions: 'MET | Backend architecture, dictionary, stakeholder permissions, privacy rules, guardrails, and teacher burden check make app readiness explicit.', tracker_crosswalk_backlog: 'CLOSED | Folder-to-data mapping is covered by module map, backend architecture, dictionary, object schemas, record schemas, and dashboard map.', main_gap: 'CLOSED 2026-06-04: Folder-to-data mapping verified through App_Module_Map.md, Backend_Data_Architecture.md, Data_Dictionary.md, Dashboard_Indicator_Map.md, object schemas, record schemas, and permissions map.'},
  '15': {source_anchor_examples: '15/Matchbook_Culture_Decks/_Content_Handoff/00_HANDOFF_MANIFEST.md; _reference/README_Suite_Index_and_Facilitator_Guide.md; Matchbook_Culture_Decks/index.html', operating_artifacts_visible: 'MET | Matchbook_Culture_Decks has 14 interactive HTML decks; _Content_Handoff has 14 system deck files plus 9 authored per-taught-expectation deck files.', grade_band_differences: 'PARTIAL | Per-routine and value decks include by-grade-band slides; no standalone Grade_Band_Deck_K-2, 3-5, or 6-8 files found.', slide_alignment: 'MET | Handoff manifest maps deck content 1:1 to design files and links back to operating artifacts; suite README documents complete decks with notes/actions/artifacts.', tracker_crosswalk_backlog: 'PARTIAL | Deck suite and per-expectation content are built; standalone specialty decks remain if live board requires those titles.', main_gap: 'PARTIAL 2026-06-04: Deck suite and per-expectation content handoff are built; standalone grade-band, behavior ladder, ISS/detention, and Tier 2/3 specialty deck files still need authoring/design.'},
  '16': {source_anchor_examples: '16/Design_Brief_2026-06-01.md; Bundle_Navigation_Map.md; Slide_Design_Instructions.md; Final_Production_Checklist.md', operating_artifacts_visible: 'MET | Design brief, bundle navigation map, style guide, slide/doc instructions, asset list, link placeholders, and final checklist are present.', slide_alignment: 'MET | Design brief gives source-of-truth order and deck-source map; bundle navigation maps all folders; final checklist holds workflow.', tracker_crosswalk_backlog: 'PARTIAL | Source map and design workflow instructions are present; final designed outputs remain pending.', main_gap: 'PARTIAL 2026-06-04: Design source map and production instructions are present; final design workflow and external deck production remain pending.'},
  '17': {source_anchor_examples: '17/Arrival_and_First_Five_Guide.md; Hallway_Transitions_Guide.md; Classroom_Exit_Routine_Guide.md; Cafeteria_Routines_Guide.md; Recess_and_Playground_Guide.md; 05/Day-by-Day_Teacher_Guide.md', operating_artifacts_visible: 'MET | Schoolwide guide, arrival, in-class, classroom exit, hallway, cafeteria, recess, teaching sequence, and Culture Camp day-by-day teacher guide are present.', adult_moves_named: 'MET | Routine guides and Culture Camp day-by-day guide name adult moves, student steps, reteach moves, recognition hooks, coaching look-fors, and R3/R prompts.', grade_band_differences: 'PARTIAL | Per-routine decks include K-2, 3-5, and 6-8 slides for major routines; bathroom/dismissal are embedded in Culture Camp, not standalone overlays.', slide_alignment: 'MET | Per-routine handoff decks link routines back to operating artifacts; classroom exit content includes dismissal language.', tracker_crosswalk_backlog: 'PARTIAL | Culture Camp tracker rows should show Built where guide plus deck evidence exists and Partial where source is embedded.', main_gap: 'PARTIAL 2026-06-04: Routine overlays are evidenced across schoolwide guides, Culture Camp day-by-day guides, walkthrough look-fors, and per-routine deck handoffs; bathroom/dismissal need standalone overlay packaging.'},
  '18': {source_anchor_examples: '18/Behavior_Intervention_Ladder_Program_Guide.md; Behavior_Intervention_Ladder_Scenario_Bank_by_Band.md; Behavior_Response_Chain_Handoff_Map.md; 15/Responsive_Behavior_Plan_Training_Deck.md', training_facilitation: 'MET | Behavior ladder guide, at-a-glance, adult move guide, banded scenario bank, and responsive behavior deck support adult training.', slide_alignment: 'PARTIAL | Responsive behavior deck covers ladder source content; no standalone Behavior_Ladder_Training_Deck.md found.', tracker_crosswalk_backlog: 'PARTIAL | Operating source and scenario bank complete; standalone Behavior_Ladder_Training_Deck.md remains a named deliverable if required.', main_gap: 'PARTIAL 2026-06-04: Behavior ladder operating source and banded scenario bank are complete; standalone Behavior_Ladder_Training_Deck.md is not present.'},
  '19': {source_anchor_examples: '19/ISS_and_Restorative_Detention_Program_Guide.md; Level_5_and_ISS_by_Grade_Band.md; Level_5_Implementation_Look-Fors.md; 15/Restorative_Repair_Training_Deck.md', training_facilitation: 'PARTIAL | ISS/detention operating sources are complete; no standalone deck file found.', slide_alignment: 'PARTIAL | Restorative repair deck connects adjacent layer; no standalone ISS_Detention_Training_Deck.md found.', tracker_crosswalk_backlog: 'PARTIAL | Operating source complete; standalone ISS_Detention_Training_Deck.md remains named deliverable if required.', main_gap: 'PARTIAL 2026-06-04: ISS/restorative detention operating source and grade-band guidance are complete; standalone ISS_Detention_Training_Deck.md is not present.'},
  '20': {source_anchor_examples: '20/Module_04_Overview.md; Tier_2_and_Tier_3_Local_Threshold_Map.md; Tier_2_and_Tier_3_Scenario_Calibration_by_Band.md; CICO_and_DBRC_Alignment_SOP.md', training_facilitation: 'PARTIAL | Tier 2/3 operating sources and banded calibration are complete; no standalone deck file found.', slide_alignment: 'PARTIAL | App/data and responsive behavior decks connect adjacent logic; no standalone Tier2_Tier3_Training_Deck.md found.', tracker_crosswalk_backlog: 'PARTIAL | Operating source and banded calibration complete; standalone Tier2_Tier3_Training_Deck.md remains named deliverable if required.', main_gap: 'PARTIAL 2026-06-04: Tier 2/Tier 3 local operating source and banded scenario calibration are complete; standalone Tier2_Tier3_Training_Deck.md is not present.'},
};

const sessions = JSON.parse(await fs.readFile('sessions.json', 'utf8'));
const changed = [];
for (const card of sessions.cards) {
  const patch = cardPatches[card.title];
  if (!patch) continue;
  applyCardPatch(card, patch);
  changed.push(card.title);
}
if (changed.length !== Object.keys(cardPatches).length) {
  const found = new Set(changed);
  throw new Error('Missing expected cards: ' + Object.keys(cardPatches).filter(t => !found.has(t)).join(', '));
}
await fs.writeFile('sessions.json', JSON.stringify(sessions, null, 2) + '\n');

const html = await fs.readFile('live_tracker.html', 'utf8');
const embedded = JSON.stringify(sessions).replace(/</g, '\\u003c');
const nextHtml = html.replace(/<script id="data" type="application\/json">[\s\S]*?<\/script>/, `<script id="data" type="application/json">${embedded}</script>`);
if (nextHtml === html) throw new Error('Could not find live tracker data script');
await fs.writeFile('live_tracker.html', nextHtml);

const csvRows = parseCSV(await fs.readFile('matchbook_tracker_data.csv', 'utf8'));
const header = csvRows[0];
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
for (const row of csvRows.slice(1)) {
  const id = row[idx.folder_id];
  const update = csvUpdates[id];
  if (!update) continue;
  for (const [key, val] of Object.entries(update)) row[idx[key]] = val;
}
await fs.writeFile('matchbook_tracker_data.csv', stringifyCSV(csvRows));
console.log(`Evidence sync complete: ${changed.length} cards and ${Object.keys(csvUpdates).length} audit rows updated.`);
