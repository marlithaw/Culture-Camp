import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIVE_TRACKER = ROOT / "live_tracker.html"
SESSIONS = ROOT / "sessions.json"
AUDIT_CSV = ROOT / "matchbook_tracker_data.csv"

STATUS_UPDATES = {
    "01_START_HERE": "CLOSED – Navigation and grade-band map complete.",
    "02_LEADERSHIP_ALIGNMENT": "CLOSED – Leadership decisions live checklist created.",
    "03_TEACHER_IMPLEMENTATION": "CLOSED – Teacher packet packaged and grade-band refinements added.",
    "06_MORNING_MEETING_CULTURE_LAB": "CLOSED – Morning Meeting logic converted to editable docs.",
    "13_COACHING_OBSERVATION_AND_RUBRIC_ALIGNMENT": "CLOSED – Coaching tool cadence specified.",
    "14_DATA_TRACKING_AND_APP_READINESS": "CLOSED – Folder-to-data mapping complete.",
    "15_SLIDE_DECK_DRAFTS": "PARTIAL – Deck outlines drafted, design needed.",
    "16_CLAUDE_DESIGN_HANDOFF": "PARTIAL – Source map created, design workflow pending.",
    "17_SCHOOLWIDE_ROUTINES": "PARTIAL – Grade-band overlays drafted.",
    "18_BEHAVIOR_INTERVENTION_LADDER": "PARTIAL – Deck outline drafted.",
    "19_ISS_AND_RESTORATIVE_DETENTION": "PARTIAL – Deck outline drafted.",
    "20_TIER2_AND_TIER3_LOCAL_OPERATING_LAYER": "PARTIAL – Deck outline drafted.",
}

GRADE_ROUTINE = {
    "K-2": "Use visuals, gestures, short practice loops, and adult narration before release.",
    "3-5": "Use examples, non-examples, partner practice, and quick student explanation of the why.",
    "6-8": "Use rationale, dignity, autonomy, peer leadership, and self-monitoring during execution.",
}

R3 = {
    "Reflection": "What do we notice about how this routine is working in real time?",
    "Resistance": "What predictable adult or student friction could break the routine?",
    "Revelation": "What one adjustment will make the routine clearer tomorrow?",
}


def resources(overrides=None):
    base = {
        "Source status": "Missing",
        "Teacher-facing guide": "Need",
        "Student-facing lesson": "Need",
        "Slide sequence": "Need",
        "Rehearsal card": "Need",
        "Coaching look-for": "Need",
        "Grade-band translation": "Need",
        "Culture Playbook placement": "Yes",
    }
    if overrides:
        base.update(overrides)
    return base


def base_card(max_id_ref, view, col, track, title, dosage, source, status="Missing", srr=None, resource_needed=None, resource_overrides=None, student=None, recognition=None):
    max_id_ref[0] += 1
    return {
        "id": f"{'s' if view == 'student' else 'b'}_{max_id_ref[0]}",
        "view": view,
        "col": col,
        "track": track,
        "title": title,
        "dosage": dosage,
        "source": source,
        "status": status,
        "teaches": f"This entry names the {title.lower()} as a required tracker resource for {col}.",
        "why": "It matters because grade-band translation keeps one Matchbook routine consistent while allowing developmentally different execution.",
        "srr": srr or "Connects Safe, Respectful, and Responsible to observable adult moves, student steps, recognition, reteach, and evidence.",
        "adult": "Name the expectation, model the grade-band version, release practice, narrate evidence, and reteach the smallest broken step.",
        "student": student or "Students state the routine, practice the steps, respond to the cue, and show evidence of Safe, Respectful, and Responsible behavior.",
        "grade": GRADE_ROUTINE,
        "resources": resources(resource_overrides),
        "resourceNeeded": resource_needed or "Grade-band differences, adult moves, student steps, resource needed, rehearsal move, recognition hook, reteach move, coaching look-for, and R3 prompts.",
        "rehearsal": "Model once, run a short practice, pause at the first predictable slip, name the exact fix, and run it again cleanly.",
        "recognition": recognition or "Recognize the named routine behavior and tie it directly to Safe, Respectful, or Responsible.",
        "reteach": "Reteach the missing step before treating the issue as defiance; keep the reteach brief, visible, and immediate.",
        "coach": "Look for adult clarity, student independence, aligned grade-band execution, and evidence that the routine survives a predictable distraction.",
        "r3": R3,
    }


def requested_cards(max_id_ref):
    cards = [
        base_card(max_id_ref, "student", "Day 1", "anchors", "Grade-Band Arrival & First Five", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Builds Safe entry, Respectful greetings and space use, and Responsible readiness for the first instructional minutes."),
        base_card(max_id_ref, "student", "Day 4", "spaces", "Grade-Band Hallway Routine", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Protects physical safety, respectful movement, and responsible use of shared hallway space."),
        base_card(max_id_ref, "student", "Day 4", "spaces", "Grade-Band Bathroom Routine", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Protects privacy, safety, cleanliness, and responsible return-to-learning behavior."),
        base_card(max_id_ref, "student", "Day 5", "spaces", "Grade-Band Cafeteria Routine", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Makes safe movement, respectful shared eating space, and responsible cleanup visible."),
        base_card(max_id_ref, "student", "Day 5", "spaces", "Grade-Band Recess Routine", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Connects safe play, respectful peer interaction, and responsible transition back to learning."),
        base_card(max_id_ref, "student", "Day 4", "spaces", "Grade-Band Classroom Exit Routine", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Protects safe release, respectful transitions, and responsible materials and space closure."),
        base_card(max_id_ref, "student", "Day 5", "anchors", "Grade-Band Dismissal Routine", "Overlay", "17_SCHOOLWIDE_ROUTINES/Grade_Band_Routine_Overlays.md", srr="Turns the end-of-day anchor into safe movement, respectful closure, and responsible handoff."),
        base_card(max_id_ref, "boy", "BOY 3", "anchors", "Teacher Implementation Packet", "Plan", "03_TEACHER_IMPLEMENTATION/Teacher_Implementation_Packet.md", resource_needed="Teacher implementation packet with planning fields, practice-lab agenda, source links, resource list, adult moves, and coaching look-fors.", resource_overrides={"Student-facing lesson": "N/A", "Slide sequence": "Need", "Rehearsal card": "Need"}, student="Adults practice the teacher-facing moves so students later experience one consistent routine.", recognition="Recognize adults for precise modeling, clean cueing, and evidence-based feedback during practice labs."),
    ]
    for band in ["K-2", "3-5", "6-8"]:
        cards.append(base_card(max_id_ref, "boy", "BOY 3", "anchors", f"Quick Cards {band}", "Practice Lab", f"03_TEACHER_IMPLEMENTATION/Quick_Cards_{band}.md", resource_needed="Grade-band quick card for teachers during practice labs, with routine cue, teacher move, student step, common error, immediate reteach, and coaching look-for.", resource_overrides={"Student-facing lesson": "N/A", "Slide sequence": "Need"}, student="Adults practice the teacher-facing moves so students later experience one consistent routine.", recognition="Recognize adults for precise modeling, clean cueing, and evidence-based feedback during practice labs."))
    for title, col, track, source in [
        ("Grade_Band_Deck_K-2", "BOY 3", "anchors", "15_SLIDE_DECK_DRAFTS/Grade_Band_Deck_K-2.md"),
        ("Grade_Band_Deck_3-5", "BOY 3", "anchors", "15_SLIDE_DECK_DRAFTS/Grade_Band_Deck_3-5.md"),
        ("Grade_Band_Deck_6-8", "BOY 3", "anchors", "15_SLIDE_DECK_DRAFTS/Grade_Band_Deck_6-8.md"),
        ("Behavior_Ladder_Training_Deck", "BOY 7", "repair", "15_SLIDE_DECK_DRAFTS/Behavior_Ladder_Training_Deck.md"),
        ("ISS_Detention_Training_Deck", "BOY 8", "repair", "15_SLIDE_DECK_DRAFTS/ISS_Detention_Training_Deck.md"),
        ("Tier2_Tier3_Training_Deck", "BOY 9", "repair", "15_SLIDE_DECK_DRAFTS/Tier2_Tier3_Training_Deck.md"),
    ]:
        cards.append(base_card(max_id_ref, "boy", col, track, title, "Deck Outline", source, resource_needed="Slide sequence required: opening rationale, source-folder citation, adult moves, practice scenario, evidence look-for, calibration check, and next-step handoff.", resource_overrides={"Student-facing lesson": "N/A", "Slide sequence": "Missing", "Rehearsal card": "Need", "Coaching look-for": "Need"}, student="Adults practice the teacher-facing moves so students later experience one consistent routine.", recognition="Recognize adults for precise modeling, clean cueing, and evidence-based feedback during practice labs."))
    return cards


def update_live_tracker():
    html = LIVE_TRACKER.read_text(encoding="utf-8")
    start_tag = '<script id="data" type="application/json">'
    start = html.index(start_tag) + len(start_tag)
    end = html.index("</script>", start)
    data = json.loads(html[start:end])
    max_id = [max(int(str(card.get("id", "0")).split("_")[-1]) for card in data["cards"])]
    changed = []
    for next_card in requested_cards(max_id):
        existing = next((card for card in data["cards"] if card["view"] == next_card["view"] and card["col"] == next_card["col"] and card["track"] == next_card["track"] and card["title"] == next_card["title"]), None)
        if existing:
            keep_id = existing["id"]
            existing.clear()
            existing.update(next_card)
            existing["id"] = keep_id
            changed.append((keep_id, "updated", next_card["title"]))
        else:
            data["cards"].append(next_card)
            changed.append((next_card["id"], "added", next_card["title"]))
    next_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    LIVE_TRACKER.write_text(f"{html[:start]}{next_json}{html[end:]}", encoding="utf-8")
    SESSIONS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return changed, len(data["cards"])


def update_audit_csv():
    with AUDIT_CSV.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames
        rows = list(reader)
    changed = []
    for row in rows:
        status = STATUS_UPDATES.get(row["folder_name"])
        if status and row["main_gap"] != status:
            row["main_gap"] = status
            changed.append(row["folder_name"])
    with AUDIT_CSV.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, quoting=csv.QUOTE_ALL, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
    return changed


def main():
    card_changes, card_count = update_live_tracker()
    audit_changes = update_audit_csv()
    print(f"cards={card_count}; card_changes={len(card_changes)}; audit_changes={len(audit_changes)}")
    for card_id, action, title in card_changes:
        print(f"{action}: {card_id} {title}")


if __name__ == "__main__":
    main()
