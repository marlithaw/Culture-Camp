(() => {
  const STORAGE_KEY = "matchbook-teacher-culture-dashboard-v1";
  const today = new Date().toISOString().slice(0, 10);

  const clusters = [
    { id: "why", number: 1, title: "Why We Exist", subtitle: "Purpose and impact", days: [1], value: "Safe" },
    { id: "teach", number: 2, title: "Teach the Culture", subtitle: "Model and live beliefs", days: [2, 3], value: "Respectful" },
    { id: "practice", number: 3, title: "Practice the Culture", subtitle: "Daily habits", days: [4, 5, 6], value: "Responsible" },
    { id: "belonging", number: 4, title: "Reinforce Belonging", subtitle: "Community and strength", days: [8, 9], value: "Respectful" },
    { id: "repair", number: 5, title: "Respond and Repair", subtitle: "Care and restoration", days: [7], value: "Responsible" },
    { id: "grow", number: 6, title: "Grow the Culture", subtitle: "Future and leadership", days: [10], value: "Safe" }
  ];

  const campDays = [
    { day: 1, title: "Full-System Launch", cluster: "Why We Exist", value: "Safe", skill: "Readiness", career: "Teacher", focus: "Students experience the full culture system from entry to dismissal.", evidence: "Which routines students can imitate and which collapse first.", resources: ["camp-kit", "teacher-guide", "student-sequence", "first-five"] },
    { day: 2, title: "Listening and Speaking Norms", cluster: "Teach the Culture", value: "Respectful", skill: "Communication", career: "Teacher", focus: "Students respond faster to cues and protect the speaker.", evidence: "Entry, voice levels, transitions, and students needing direct support.", resources: ["teacher-guide", "morning-manual", "speech-frames", "culture-deck"] },
    { day: 3, title: "Body Language and Visible Respect", cluster: "Teach the Culture", value: "Respectful", skill: "Active Listening", career: "Principal", focus: "Students show respect with posture, eyes, and hands.", evidence: "Follow-through on cues and first-response behaviors.", resources: ["teacher-guide", "practice-bank", "morning-minute", "teacher-deck"] },
    { day: 4, title: "Voice Tone and Early Student Roles", cluster: "Practice the Culture", value: "Respectful", skill: "Collaboration", career: "Counselor", focus: "Students use respectful tone and begin carrying small roles.", evidence: "Timing, clean movement, and peer influence on routine strength.", resources: ["role-system", "student-leader", "message-board", "teacher-guide"] },
    { day: 5, title: "Specific Commitments", cluster: "Practice the Culture", value: "Responsible", skill: "Self-Management", career: "Coach", focus: "Students name one visible next step and follow through.", evidence: "Which commitments appear in real classroom action.", resources: ["morning-manual", "participation", "data-tracker", "teacher-guide"] },
    { day: 6, title: "Regulation Tools and Transitions", cluster: "Practice the Culture", value: "Safe", skill: "Regulation", career: "Nurse", focus: "Students choose and use regulation tools before drift grows.", evidence: "Whether students self-correct before adults intervene.", resources: ["teacher-guide", "reset-scripts", "response-pathway", "first-five"] },
    { day: 7, title: "Repair Language and Recovery", cluster: "Respond and Repair", value: "Responsible", skill: "Repair", career: "Mediator", focus: "Students use quick repair language and restart after mistakes.", evidence: "Peer interactions, regulation recovery, and repair attempts.", resources: ["repair-framework", "repair-scripts", "restorative-deck", "teacher-guide"] },
    { day: 8, title: "Student Leadership and Houses", cluster: "Reinforce Belonging", value: "Responsible", skill: "Leadership", career: "Team Lead", focus: "Students carry more of the routine as leaders and house members.", evidence: "Whether identity builds ownership without weakening structure.", resources: ["student-leader", "role-system", "student-sequence", "teacher-guide"] },
    { day: 9, title: "Recognition Through Evidence", cluster: "Reinforce Belonging", value: "Respectful", skill: "Evidence", career: "Reporter", focus: "Students name what peers actually did, not who is popular.", evidence: "Which students can explain why recognition is earned.", resources: ["cypher-guide", "nomination-protocol", "recognition-guide", "family-evidence"] },
    { day: 10, title: "Readiness Review and Launch", cluster: "Grow the Culture", value: "Safe", skill: "Reflection", career: "Project Manager", focus: "Students run more of the day with lighter adult help.", evidence: "Which routines are launch-ready and which need Week 3 reteach.", resources: ["day10", "fidelity", "reteach", "complete-arc"] }
  ];

  const resources = [
    { id: "camp-kit", title: "Session 1 Master Complete Production Build", type: "Final DOCX", cluster: "BOY Culture Build", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Master_Complete_Production_Build.docx", desc: "Final staff-facing production build for Session 1.", tags: ["final draft", "session 1", "staff"] },
    { id: "teacher-guide", title: "Session 1 Facilitator Guide - Revised", type: "Final DOCX", cluster: "BOY Culture Build", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Facilitator_Guide_SURGICAL_REVISED.docx", desc: "Revised facilitator guide for running Session 1.", tags: ["final draft", "facilitator"] },
    { id: "complete-arc", title: "Session 1 Complete Production Index", type: "Final DOCX", cluster: "BOY Culture Build", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Complete_Production_Index.docx", desc: "Index of the final Session 1 production set.", tags: ["index", "final set"] },
    { id: "alignment-map", title: "Session 1 Alignment Map", type: "Final DOCX", cluster: "BOY Culture Build", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/00_START_HERE_Session_1_Alignment_Map.docx", desc: "Start-here alignment map for the finalized Session 1 package.", tags: ["start here", "alignment"] },
    { id: "participant-workbook", title: "Session 1 Participant Workbook", type: "Final DOCX", cluster: "BOY Culture Build", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Participant_Workbook.docx", desc: "Participant workbook for teacher-facing training.", tags: ["workbook", "staff"] },
    { id: "day10", title: "Session 1 Implementation Assignment", type: "Final DOCX", cluster: "BOY Culture Build", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Implementation_Assignment.docx", desc: "Teacher implementation assignment after Session 1.", tags: ["assignment", "implementation"] },
    { id: "fidelity", title: "Session 1 Follow-Up Coaching Look-For", type: "Final DOCX", cluster: "Coaching", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Follow_Up_Coaching_Look_For.docx", desc: "Final coaching look-for connected to Session 1 implementation.", tags: ["coaching", "look-for"] },
    { id: "practice-bank", title: "CAR Responsive Move Quick Guide", type: "Final DOCX", cluster: "Teacher Tools", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_CAR_Responsive_Move_Quick_Guide.docx", desc: "Quick guide for the CAR responsive move.", tags: ["quick guide", "CAR"] },
    { id: "message-board", title: "Day 1 CAR Wall Build Protocol", type: "Final DOCX", cluster: "Teacher Tools", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Day_1_CAR_Wall_Build_Protocol.docx", desc: "Final protocol for building the Day 1 CAR wall.", tags: ["protocol", "wall build"] },
    { id: "station-materials", title: "Session 1 Station Materials and Facilitator Key", type: "Final DOCX", cluster: "Teacher Tools", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_Station_Materials_and_Facilitator_Key.docx", desc: "Station materials with facilitator key for Session 1.", tags: ["stations", "facilitator"] },
    { id: "qr-forms", title: "Session 1 QR Form Templates", type: "Final DOCX", cluster: "Teacher Tools", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/01_Staff-Facing/Session_1_QR_Form_Templates.docx", desc: "Final QR form templates for Session 1 implementation.", tags: ["forms", "QR"] },
    { id: "student-sequence", title: "Safe Respectful Responsible Promise - Student Resources", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_01_Safe_Respectful_Responsible_Promise/s_01_Safe_Respectful_Responsible_Promise_Student_Resources_and_Handouts.docx", desc: "Final student resources and handouts for the culture promise lesson.", tags: ["student", "promise"] },
    { id: "culture-promise-teacher", title: "Safe Respectful Responsible Promise - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_01_Safe_Respectful_Responsible_Promise/s_01_Safe_Respectful_Responsible_Promise_Teacher_Guide.docx", desc: "Final teacher guide for the culture promise lesson.", tags: ["teacher guide", "promise"] },
    { id: "culture-promise-35-plan", title: "Culture Promise Grades 3-5 Lesson Plan", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_01_Safe_Respectful_Responsible_Promise/02_Grades_3-5/s_01_Culture_Promise_3_5_Student_Lesson_Plan_SURGICAL_REVISED.docx", desc: "Final revised Grades 3-5 lesson plan for the culture promise.", tags: ["3-5", "lesson plan"] },
    { id: "culture-promise-35-handout", title: "Culture Promise Grades 3-5 Handout and Visuals", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_01_Safe_Respectful_Responsible_Promise/02_Grades_3-5/s_01_Culture_Promise_3_5_Student_Handout_And_Visuals_SURGICAL_REVISED.docx", desc: "Final revised Grades 3-5 handout and visuals for the culture promise.", tags: ["3-5", "handout"] },
    { id: "speech-frames", title: "Behavior Matrix by Grade Band - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_02_Behavior_Matrix_by_Grade_Band/s_02_Behavior_Matrix_by_Grade_Band_Teacher_Guide.docx", desc: "Final teacher guide for the behavior matrix by grade band lesson.", tags: ["teacher guide", "behavior matrix"] },
    { id: "behavior-matrix-35-plan", title: "Behavior Matrix Grades 3-5 Lesson Plan", type: "Final DOCX", cluster: "Student Lessons", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_02_Behavior_Matrix_by_Grade_Band/02_Grades_3-5/s_02_Behavior_Matrix_3_5_Student_Lesson_Plan_SURGICAL_REVISED.docx", desc: "Final revised Grades 3-5 behavior matrix lesson plan.", tags: ["3-5", "lesson plan"] },
    { id: "first-five", title: "First Five Routine - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_07_First_Five_Routine/s_07_First_Five_Routine_Teacher_Guide.docx", desc: "Final teacher guide for the First Five routine.", tags: ["teacher guide", "First Five"] },
    { id: "first-five-35-plan", title: "First Five Grades 3-5 Lesson Plan", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_07_First_Five_Routine/02_Grades_3-5/s_07_First_Five_3_5_Student_Lesson_Plan_SURGICAL_REVISED.docx", desc: "Final revised Grades 3-5 First Five lesson plan.", tags: ["3-5", "lesson plan"] },
    { id: "first-five-35-handout", title: "First Five Grades 3-5 Handout and Visuals", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_07_First_Five_Routine/02_Grades_3-5/s_07_First_Five_3_5_Student_Handout_And_Visuals_SURGICAL_REVISED.docx", desc: "Final revised Grades 3-5 First Five handout and visuals.", tags: ["3-5", "handout"] },
    { id: "breakfast", title: "Breakfast Holding Routine - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_06_Breakfast_Holding_Routine/s_06_Breakfast_Holding_Routine_Teacher_Guide.docx", desc: "Final teacher guide for breakfast holding routine.", tags: ["teacher guide", "routine"] },
    { id: "hallway", title: "Hallway Travel Routine - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_09_Hallway_Travel_Routine/s_09_Hallway_Travel_Routine_Teacher_Guide.docx", desc: "Final teacher guide for hallway travel routine.", tags: ["teacher guide", "hallway"] },
    { id: "bathroom", title: "Bathroom Routine - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_10_Bathroom_Routine/s_10_Bathroom_Routine_Teacher_Guide.docx", desc: "Final teacher guide for bathroom routine.", tags: ["teacher guide", "bathroom"] },
    { id: "cafeteria", title: "Cafeteria Entry, Meal, Exit - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Respectful", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_11_Cafeteria_Entry_Meal_Exit/s_11_Cafeteria_Entry_Meal_Exit_Teacher_Guide.docx", desc: "Final teacher guide for cafeteria routine.", tags: ["teacher guide", "cafeteria"] },
    { id: "recess", title: "Recess Boundaries and Recall - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_12_Recess_Boundaries_and_Recall/s_12_Recess_Boundaries_and_Recall_Teacher_Guide.docx", desc: "Final teacher guide for recess boundaries and recall.", tags: ["teacher guide", "recess"] },
    { id: "independent-work", title: "Independent Work Norms - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_16_Independent_Work_Norms/s_16_Independent_Work_Norms_Teacher_Guide.docx", desc: "Final teacher guide for independent work norms.", tags: ["teacher guide", "independent work"] },
    { id: "reset-scripts", title: "Regulation Choices - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Safe", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_20_Regulation_Choices/s_20_Regulation_Choices_Teacher_Guide.docx", desc: "Final teacher guide for regulation choices.", tags: ["teacher guide", "regulation"] },
    { id: "repair-scripts", title: "Repair Words - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_21_Repair_Words/s_21_Repair_Words_Teacher_Guide.docx", desc: "Final teacher guide for repair words.", tags: ["teacher guide", "repair"] },
    { id: "reteach", title: "Re-Entry Routine - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_22_Re_Entry_Routine/s_22_Re_Entry_Routine_Teacher_Guide.docx", desc: "Final teacher guide for re-entry routine.", tags: ["teacher guide", "re-entry"] },
    { id: "adult-look-fors", title: "Adult Look-Fors for Students - Teacher Guide", type: "Final DOCX", cluster: "Student Lessons", value: "Responsible", path: "../BOY CULTURE BUILD/Session_01_Culture_Promise_and_The_Meaning_Gap/Presentations_and_Facilitation/02_Student-Facing/s_27_Adult_Look_Fors_For_Students/s_27_Adult_Look_Fors_For_Students_Teacher_Guide.docx", desc: "Final teacher guide for explaining adult look-fors to students.", tags: ["teacher guide", "look-fors"] },
    { id: "morning-manual", title: "Morning Meeting Culture Lab Training Deck", type: "Final HTML", cluster: "Slide Decks", value: "Safe", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Morning_Meeting_Culture_Lab_Training_Deck.html", desc: "Final editable HTML training deck for Morning Meeting Culture Lab.", tags: ["deck", "Morning Meeting"] },
    { id: "morning-minute", title: "Morning Meeting - The Matchbook Way", type: "Final HTML", cluster: "Slide Decks", value: "Safe", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Morning_Meeting_The_Matchbook_Way.html", desc: "Short final all-staff intro deck for Morning Meeting.", tags: ["deck", "all-staff"] },
    { id: "culture-deck", title: "Culture Camp Launch Deck", type: "Final HTML", cluster: "Slide Decks", value: "Safe", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Culture_Camp_Launch_Deck.html", desc: "Final editable HTML deck for launching Culture Camp.", tags: ["deck", "Culture Camp"] },
    { id: "teacher-deck", title: "Teacher Training Deck", type: "Final HTML", cluster: "Slide Decks", value: "Responsible", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Teacher_Training_Deck.html", desc: "Final editable HTML teacher training deck.", tags: ["deck", "teacher"] },
    { id: "role-system", title: "Student Leader Training Deck", type: "Final HTML", cluster: "Slide Decks", value: "Responsible", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Student_Leader_Training_Deck.html", desc: "Final editable HTML student leader training deck.", tags: ["deck", "student leadership"] },
    { id: "data-tracker", title: "App Data Architecture Deck", type: "Final HTML", cluster: "Data", value: "Responsible", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/App_Data_Architecture_Deck.html", desc: "Final editable HTML deck for the app and data architecture.", tags: ["deck", "data"] },
    { id: "response-pathway", title: "Responsive Behavior Plan Training Deck", type: "Final HTML", cluster: "Responsive Behavior", value: "Safe", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Responsive_Behavior_Plan_Training_Deck.html", desc: "Final editable HTML training deck for responsive behavior.", tags: ["deck", "responsive behavior"] },
    { id: "repair-framework", title: "Restorative Repair Training Deck", type: "Final HTML", cluster: "Repair", value: "Responsible", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Restorative_Repair_Training_Deck.html", desc: "Final editable HTML training deck for restorative repair.", tags: ["deck", "repair"] },
    { id: "restorative-deck", title: "Restorative Repair Training Deck", type: "Final HTML", cluster: "Repair", value: "Responsible", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Restorative_Repair_Training_Deck.html", desc: "Final restorative repair deck for teacher and staff reference.", tags: ["deck", "repair"] },
    { id: "cypher-guide", title: "Friday Cypher Training Deck", type: "Final HTML", cluster: "Recognition", value: "Respectful", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Friday_Cypher_Training_Deck.html", desc: "Final editable HTML training deck for Friday Cypher.", tags: ["deck", "recognition"] },
    { id: "nomination-protocol", title: "Friday Cypher Training Deck", type: "Final HTML", cluster: "Recognition", value: "Responsible", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Friday_Cypher_Training_Deck.html", desc: "Final deck section for evidence-based Friday Cypher nomination practice.", tags: ["deck", "nomination"] },
    { id: "recognition-guide", title: "Friday Cypher Training Deck", type: "Final HTML", cluster: "Recognition", value: "Respectful", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Friday_Cypher_Training_Deck.html", desc: "Final deck for recognition through evidence.", tags: ["deck", "recognition"] },
    { id: "family-evidence", title: "Family Connection Wheel Training Deck", type: "Final HTML", cluster: "Family Connection", value: "Respectful", path: "../15_SLIDE_DECK_DRAFTS/Matchbook_Culture_Decks/Family_Connection_Wheel_Training_Deck.html", desc: "Final editable HTML deck for the Family Connection Wheel.", tags: ["deck", "family"] },
    { id: "director-playbook", title: "Director of Culture Playbook", type: "Final PDF", cluster: "Current Playbooks", value: "Responsible", path: "../21_CULTURE_PLAYBOOKS/CURRENT_PLAYBOOKS/Matchbook_Director_Culture_Playbook.pdf", desc: "Current adult culture operating playbook.", tags: ["current", "playbook"] },
    { id: "operations-manual", title: "Campus Culture Operations Manual", type: "Final PDF", cluster: "Current Playbooks", value: "Safe", path: "../21_CULTURE_PLAYBOOKS/CURRENT_PLAYBOOKS/Matchbook Learning — Campus Culture Operations Manual 2026–2027.pdf", desc: "Current campus culture operations manual for 2026-2027.", tags: ["current", "operations"] },
    { id: "restorative-counselor", title: "Restorative and Counselor Playbook", type: "Final PDF", cluster: "Current Playbooks", value: "Respectful", path: "../21_CULTURE_PLAYBOOKS/CURRENT_PLAYBOOKS/Matchbook Learning--Restorative & Counselor.pdf", desc: "Current restorative and counselor operating playbook.", tags: ["current", "restore"] },
    { id: "family-handbook", title: "Parent and Student Handbook", type: "Final HTM", cluster: "Current Playbooks", value: "Safe", path: "../21_CULTURE_PLAYBOOKS/CURRENT_PLAYBOOKS/Matchbook Learning — Parent & Student Handbook 2026–2027 (Print Document) (2).htm", desc: "Current parent and student handbook print document.", tags: ["current", "handbook"] }
  ];

  const practiceMoves = [
    { id: "PM-SAFE-01", name: "Regulate before learning", value: "Safe" },
    { id: "PM-SAFE-02", name: "Enter and start calmly", value: "Safe" },
    { id: "PM-RESP-01", name: "Protect the speaker", value: "Respectful" },
    { id: "PM-RESP-02", name: "Use a respectful sentence frame", value: "Respectful" },
    { id: "PM-OWN-01", name: "Own the next move", value: "Responsible" },
    { id: "PM-OWN-02", name: "Repair and return", value: "Responsible" }
  ];

  const defaultStudents = [
    { Student_ID: "S001", Student_Name: "Aaliyah Johnson", Grade_Band: "3-5", House: "Ember" },
    { Student_ID: "S002", Student_Name: "Ethan Park", Grade_Band: "3-5", House: "Summit" },
    { Student_ID: "S003", Student_Name: "Isabella Martinez", Grade_Band: "3-5", House: "Beacon" },
    { Student_ID: "S004", Student_Name: "Malik Thompson", Grade_Band: "3-5", House: "Ember" },
    { Student_ID: "S005", Student_Name: "Noah Williams", Grade_Band: "3-5", House: "Summit" }
  ];
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  let state = loadState();
  let selectedDay = state.activeDay || 2;
  let selectedResourceId = "camp-kit";
  let activeValueFilter = "all";

  function initialState() {
    return {
      teacher: { Staff_ID: "T_LOCAL", Staff_Name: "Ms. Jordan", Role: "Teacher", Grade: "5th Grade", Section: "Homeroom" },
      activeDay: 2,
      completedDays: [1],
      students: defaultStudents,
      records: [],
      evidence: []
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialState();
      const parsed = JSON.parse(raw);
      return {
        ...initialState(),
        ...parsed,
        teacher: { ...initialState().teacher, ...(parsed.teacher || {}) },
        students: Array.isArray(parsed.students) ? parsed.students : defaultStudents,
        records: Array.isArray(parsed.records) ? parsed.records : [],
        evidence: Array.isArray(parsed.evidence) ? parsed.evidence : [],
        completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [1]
      };
    } catch (error) {
      console.warn("Unable to load dashboard state", error);
      return initialState();
    }
  }

  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function currentDay() { return campDays.find(item => item.day === selectedDay) || campDays[1]; }
  function resourceById(id) { return resources.find(item => item.id === id) || resources[0]; }
  function valueClass(value) { return String(value || "").toLowerCase(); }
  function unique(values) { return Array.from(new Set(values)).sort(); }
  function studentName(id) { return state.students.find(student => student.Student_ID === id)?.Student_Name || id; }

  function navigate(view) {
    qsa(".view").forEach(node => node.classList.remove("active"));
    qsa(".nav-button").forEach(node => node.classList.remove("active"));
    const target = qs(`#view-${view}`);
    if (target) target.classList.add("active");
    qsa(`[data-nav=\"${view}\"]`).forEach(node => {
      if (node.classList.contains("nav-button")) node.classList.add("active");
    });
    window.scrollTo(0, 0);
  }

  function renderAll() {
    qs("#teacher-name-label").textContent = state.teacher.Staff_Name;
    qs("#teacher-grade-label").textContent = state.teacher.Grade;
    renderConstellation();
    renderCamp();
    renderLibrary();
    renderProgress();
    renderCapture();
  }

  function renderConstellation() {
    const map = qs("#cluster-map");
    map.innerHTML = "";
    clusters.forEach(cluster => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `cluster-node cluster-${cluster.number}`;
      button.dataset.cluster = cluster.id;
      button.innerHTML = `<span class="cluster-number">${cluster.number}</span><span><strong>${cluster.title}</strong><small>${cluster.subtitle}</small></span>`;
      map.appendChild(button);
    });
    const day = currentDay();
    qs("#today-title").textContent = `Day ${day.day}: ${day.title}`;
    qs("#today-day-badge").textContent = `Day ${day.day}`;
    qs("#today-skill").textContent = day.skill;
    qs("#today-career").textContent = `Career connection: ${day.career}`;
    qs("#today-values").innerHTML = `<span class="value-pill ${valueClass(day.value)}">${day.value}</span>`;
    renderResourceList(qs("#today-resource-list"), day.resources);
  }

  function renderResourceList(host, ids) {
    host.innerHTML = "";
    ids.map(resourceById).forEach(resource => {
      const link = document.createElement("a");
      link.className = "resource-link";
      link.href = resource.path;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.innerHTML = `<strong>${resource.title}</strong><span>${resource.type}</span>`;
      host.appendChild(link);
    });
  }

  function renderCamp() {
    const completed = new Set(state.completedDays);
    const completedCount = completed.size;
    qs("#camp-completed-count").textContent = completedCount;
    qs("#camp-current-day").textContent = state.activeDay;
    qs("#camp-remaining-count").textContent = Math.max(0, campDays.length - completedCount);
    qs("#camp-progress-fill").style.width = `${Math.round((completedCount / campDays.length) * 100)}%`;
    const dayGrid = qs("#camp-days");
    dayGrid.innerHTML = "";
    campDays.forEach(day => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "day-card";
      if (completed.has(day.day)) card.classList.add("completed");
      if (day.day === state.activeDay) card.classList.add("current");
      card.dataset.day = day.day;
      card.innerHTML = `<small>Day ${day.day} - ${day.cluster}</small><strong>${day.title}</strong><p>${day.focus}</p><span class="value-pill ${valueClass(day.value)}">${day.value}</span>`;
      dayGrid.appendChild(card);
    });
    const day = currentDay();
    qs("#selected-cluster-label").textContent = day.cluster;
    qs("#selected-day-title").textContent = `Day ${day.day}: ${day.title}`;
    qs("#selected-day-badge").textContent = `Day ${day.day}`;
    qs("#selected-day-focus").textContent = day.focus + " Evidence to capture: " + day.evidence;
    qs("#mark-day-complete").textContent = completed.has(day.day) ? "Completed" : "Mark Day Complete";
    renderResourceList(qs("#selected-day-resources"), day.resources);
  }

  function setupFilters() {
    const clusterFilter = qs("#cluster-filter");
    const typeFilter = qs("#type-filter");
    if (clusterFilter.dataset.ready) return;
    unique(resources.map(item => item.cluster)).forEach(cluster => clusterFilter.append(new Option(cluster, cluster)));
    unique(resources.map(item => item.type)).forEach(type => typeFilter.append(new Option(type, type)));
    clusterFilter.dataset.ready = "true";
  }

  function renderLibrary() {
    setupFilters();
    const search = (qs("#resource-search")?.value || "").trim().toLowerCase();
    const cluster = qs("#cluster-filter")?.value || "all";
    const type = qs("#type-filter")?.value || "all";
    const filtered = resources.filter(resource => {
      const text = [resource.title, resource.desc, resource.cluster, resource.type, resource.tags.join(" ")].join(" ").toLowerCase();
      return (!search || text.includes(search)) && (cluster === "all" || resource.cluster === cluster) && (type === "all" || resource.type === type) && (activeValueFilter === "all" || resource.value === activeValueFilter);
    });
    qs("#resource-count").textContent = `${filtered.length} resources`;
    const grid = qs("#resource-grid");
    grid.innerHTML = "";
    const template = qs("#resource-card-template");
    filtered.forEach(resource => {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.resourceId = resource.id;
      const thumb = qs(".resource-thumb", node);
      const docType = resource.type.replace("Final ", "");
      thumb.className = `resource-thumb ${valueClass(resource.value)}`;
      thumb.innerHTML = `<span>${docType}</span><strong>${resource.cluster}</strong><i></i><i></i><i></i>`;
      qs(".resource-meta", node).textContent = `${resource.cluster} / ${resource.type}`;
      qs("h3", node).textContent = resource.title;
      qs(".resource-desc", node).textContent = resource.desc;
      qs(".tag-row", node).innerHTML = `<span class="value-pill ${valueClass(resource.value)}">${resource.value}</span>` + resource.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
      qs(".resource-actions", node).innerHTML = `<a href="${resource.path}" target="_blank" rel="noreferrer">Open</a><button type="button" data-preview="${resource.id}">Preview</button>`;
      grid.appendChild(node);
    });
    if (!filtered.find(item => item.id === selectedResourceId) && filtered[0]) selectedResourceId = filtered[0].id;
    renderResourceDetail();
  }

  function renderResourceDetail() {
    const resource = resourceById(selectedResourceId);
    const detail = qs("#resource-detail");
    const docType = resource.type.replace("Final ", "");
    detail.innerHTML = `<button class="ghost-link" type="button" data-nav="library">Back to library</button><div class="detail-hero ${valueClass(resource.value)}"><span>${docType}</span><strong>${resource.cluster}</strong><i></i><i></i><i></i></div><p class="kicker red">${resource.type}</p><h2>${resource.title}</h2><p>${resource.desc}</p><div class="tag-row"><span class="value-pill ${valueClass(resource.value)}">${resource.value}</span>${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div><a class="primary-action" href="${resource.path}" target="_blank" rel="noreferrer">Open Resource</a><button class="outline-action" type="button" data-route-resource="${resource.id}">Use In Today's Lesson</button>`;
  }
  function renderProgress() {
    const metrics = computeMetrics();
    qs("#today-date-label").textContent = `Local date: ${today}`;
    qs("#metric-cards").innerHTML = [
      metricCard("Lessons", `${metrics.completedLessons} / ${campDays.length}`, `${metrics.lessonPct}% complete`, "L", "#ffe4e4"),
      metricCard("Participation", `${metrics.participationPct}%`, `${metrics.participatingStudents} / ${metrics.totalStudents} latest`, "P", "#e8f1ff"),
      metricCard("Evidence", String(metrics.evidenceCount), "named records", "E", "#e8f6ed"),
      metricCard("Week Status", metrics.status, metrics.statusNote, "W", "#fff2d7")
    ].join("");
    renderClusterProgress();
    renderPillarRings();
    renderTimeline();
    renderRoster();
  }

  function metricCard(label, value, sub, icon, bg) {
    return `<article class="metric-card"><span class="metric-icon" style="background:${bg}">${icon}</span><span><small>${label}</small><strong>${value}</strong><span>${sub}</span></span></article>`;
  }

  function computeMetrics() {
    const latestDate = latestRecordDate();
    const latest = latestDate ? state.records.filter(record => record.Date === latestDate) : [];
    const participating = latest.filter(record => record.Participation).length;
    const completedLessons = new Set(state.completedDays).size;
    return {
      completedLessons,
      lessonPct: Math.round((completedLessons / campDays.length) * 100),
      totalStudents: state.students.length,
      participatingStudents: latest.length ? participating : 0,
      participationPct: latest.length ? Math.round((participating / Math.max(1, latest.length)) * 100) : 0,
      evidenceCount: state.evidence.length,
      status: completedLessons >= state.activeDay - 1 ? "On Track" : "Needs Capture",
      statusNote: latest.length ? `last saved ${latestDate}` : "no snapshot yet"
    };
  }

  function latestRecordDate() { return state.records.map(record => record.Date).sort().pop(); }

  function renderClusterProgress() {
    const host = qs("#cluster-progress-list");
    host.innerHTML = "";
    const completed = new Set(state.completedDays);
    clusters.forEach(cluster => {
      const done = cluster.days.filter(day => completed.has(day)).length;
      const pct = Math.round((done / cluster.days.length) * 100);
      const row = document.createElement("div");
      row.className = "cluster-progress-row";
      row.innerHTML = `<span class="mini-icon">${cluster.number}</span><span><strong>${cluster.title}</strong><small>${done} / ${cluster.days.length} days</small><span class="bar"><span style="width:${pct}%"></span></span></span><strong>${pct}%</strong>`;
      host.appendChild(row);
    });
  }

  function renderPillarRings() {
    const host = qs("#pillar-rings");
    host.innerHTML = "";
    ["Safe", "Respectful", "Responsible"].forEach(value => {
      const valueRecords = state.records.filter(record => record.Value === value);
      const participationPct = valueRecords.length ? Math.round((valueRecords.filter(record => record.Participation).length / valueRecords.length) * 100) : 0;
      const evidenceCount = state.evidence.filter(record => record.Value === value).length;
      const color = value === "Safe" ? "var(--safe)" : value === "Respectful" ? "var(--respectful)" : "var(--responsible)";
      const card = document.createElement("article");
      card.className = "ring-card";
      card.innerHTML = `<div class="ring" style="--ring-color:${color};--ring-deg:${participationPct * 3.6}deg"><div class="ring-inner">${participationPct}%</div></div><strong>${value}</strong><p class="muted">Evidence: ${evidenceCount}</p>`;
      host.appendChild(card);
    });
  }

  function renderTimeline() {
    const completed = new Set(state.completedDays);
    const host = qs("#timeline-table");
    const header = `<div class="timeline-row"><strong>Cluster</strong>${campDays.map(day => `<strong>D${day.day}</strong>`).join("")}</div>`;
    const rows = clusters.map(cluster => {
      const dots = campDays.map(day => {
        const belongs = cluster.days.includes(day.day);
        const className = completed.has(day.day) ? "done" : day.day === state.activeDay ? "current" : "";
        return `<span class="timeline-dot ${belongs ? className : ""}">${belongs ? (completed.has(day.day) ? "ok" : day.day === state.activeDay ? "now" : "") : ""}</span>`;
      }).join("");
      return `<div class="timeline-row"><strong>${cluster.title}</strong>${dots}</div>`;
    }).join("");
    host.innerHTML = header + rows;
  }

  function renderRoster() {
    const host = qs("#roster-list");
    host.innerHTML = "";
    state.students.forEach(student => {
      const evidence = state.evidence.filter(item => item.Student_ID === student.Student_ID).length;
      const row = document.createElement("div");
      row.className = "roster-row";
      row.innerHTML = `<span><strong>${student.Student_Name}</strong><small>${student.Grade_Band} / ${student.House}</small></span><span><small>Lessons</small><strong>${state.completedDays.length} / ${campDays.length}</strong></span><span><small>Evidence</small><strong>${evidence}</strong></span><button class="small-action" data-remove-student="${student.Student_ID}" title="Remove local sample student">x</button>`;
      host.appendChild(row);
    });
  }

  function renderCapture() {
    qs("#capture-date").value = qs("#capture-date").value || today;
    qs("#capture-move").innerHTML = practiceMoves.map(item => `<option value="${item.id}">${item.name}</option>`).join("");
    renderStudentCaptureList();
    qs("#evidence-student").innerHTML = state.students.map(student => `<option value="${student.Student_ID}">${student.Student_Name}</option>`).join("");
  }

  function renderStudentCaptureList() {
    const host = qs("#student-capture-list");
    host.innerHTML = "";
    state.students.forEach(student => {
      const row = document.createElement("label");
      row.className = "student-capture-row";
      row.innerHTML = `<input type="checkbox" data-student-check="${student.Student_ID}"><span>${student.Student_Name}</span><select data-fidelity="${student.Student_ID}"><option value="3">Full</option><option value="2">Partial</option><option value="1">Support</option><option value="">Blank</option></select><select data-commitment="${student.Student_ID}"><option value="3">Specific</option><option value="2">Some</option><option value="1">Vague</option><option value="">Blank</option></select>`;
      host.appendChild(row);
    });
  }

  function saveMeetingSnapshot(event) {
    event.preventDefault();
    const date = qs("#capture-date").value || today;
    const value = qs("#capture-value").value;
    const moveId = qs("#capture-move").value;
    const timestamp = new Date().toISOString();
    state.students.forEach(student => {
      const checked = Boolean(qs(`[data-student-check=\"${student.Student_ID}\"]`)?.checked);
      const fidelityRaw = qs(`[data-fidelity=\"${student.Student_ID}\"]`)?.value || "";
      const commitmentRaw = qs(`[data-commitment=\"${student.Student_ID}\"]`)?.value || "";
      state.records.push({
        Record_ID: `MM-${Date.now()}-${student.Student_ID}`,
        Student_ID: student.Student_ID,
        Teacher_ID: state.teacher.Staff_ID,
        Date: date,
        Value: value,
        Practice_Move_ID: moveId,
        Participation: checked,
        Practice_Fidelity: fidelityRaw === "" ? null : Number(fidelityRaw),
        Commitment_Text: "",
        Commitment_Quality: commitmentRaw === "" ? null : Number(commitmentRaw),
        Follow_Up_Needed: !checked,
        Notes: "",
        Created_Timestamp: timestamp
      });
    });
    saveState();
    renderAll();
    showToast("Meeting snapshot saved locally.");
  }

  function saveEvidence(event) {
    event.preventDefault();
    const description = qs("#evidence-description").value.trim();
    if (!description) { showToast("Add a specific evidence sentence first."); return; }
    const studentId = qs("#evidence-student").value;
    state.evidence.push({
      Evidence_ID: `EV-${Date.now()}`,
      Student_ID: studentId,
      Source: "Morning Meeting",
      Date: qs("#capture-date").value || today,
      Description: description,
      Value: qs("#capture-value").value,
      Practice_Move_ID: qs("#capture-move").value,
      Recognition_Type: qs("#evidence-type").value,
      Staff_ID: state.teacher.Staff_ID,
      Notes: ""
    });
    qs("#evidence-description").value = "";
    saveState();
    renderAll();
    showToast("Evidence added locally.");
  }
  function buildPacket() {
    return {
      Packet_Type: "Matchbook_Teacher_Culture_Dashboard_Local_Export",
      Packet_Version: "2026-07-02",
      Exported_At: new Date().toISOString(),
      Source_App: "TEACHER_CULTURE_DASHBOARD",
      Teacher: state.teacher,
      Students: state.students,
      Lesson_Completion_Records: campDays.map(day => ({
        Teacher_ID: state.teacher.Staff_ID,
        Lesson_ID: `CC-DAY-${String(day.day).padStart(2, "0")}`,
        Lesson_Title: day.title,
        Cluster: day.cluster,
        Value: day.value,
        Completed: state.completedDays.includes(day.day),
        Current: state.activeDay === day.day
      })),
      Morning_Meeting_Records: state.records,
      Student_Evidence_Records: state.evidence,
      Summary_Metrics: computeMetrics(),
      Source_Document_Links: resources.map(({ id, title, type, cluster, value, path }) => ({ Resource_ID: id, Title: title, Type: type, Cluster: cluster, Value: value, Relative_Path: path }))
    };
  }

  function exportJson() {
    downloadFile(`matchbook-teacher-dashboard-export-${today}.json`, "application/json", JSON.stringify(buildPacket(), null, 2));
  }

  function exportCsv() {
    const rows = state.records.map(record => ({
      Record_ID: record.Record_ID,
      Student_ID: record.Student_ID,
      Student_Name: studentName(record.Student_ID),
      Teacher_ID: record.Teacher_ID,
      Date: record.Date,
      Value: record.Value,
      Practice_Move_ID: record.Practice_Move_ID,
      Participation: record.Participation,
      Practice_Fidelity: record.Practice_Fidelity ?? "",
      Commitment_Quality: record.Commitment_Quality ?? "",
      Follow_Up_Needed: record.Follow_Up_Needed,
      Created_Timestamp: record.Created_Timestamp
    }));
    downloadFile(`matchbook-morning-meeting-records-${today}.csv`, "text/csv", toCsv(rows));
  }

  function toCsv(rows) {
    if (!rows.length) return "No records saved yet\n";
    const headers = Object.keys(rows[0]);
    return [headers.join(","), ...rows.map(row => headers.map(header => csvCell(row[header])).join(","))].join("\n");
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function downloadFile(filename, type, content) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function showToast(message) {
    const existing = qs(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  }

  document.addEventListener("click", event => {
    const nav = event.target.closest("[data-nav]");
    if (nav) { navigate(nav.dataset.nav); return; }

    const clusterButton = event.target.closest(".cluster-node");
    if (clusterButton) {
      const cluster = clusters.find(item => item.id === clusterButton.dataset.cluster);
      const resource = resources.find(item => item.value === cluster.value) || resources[0];
      selectedResourceId = resource.id;
      activeValueFilter = cluster.value;
      qsa(".chip-filter").forEach(button => button.classList.toggle("active", button.dataset.valueFilter === activeValueFilter));
      navigate("library");
      renderLibrary();
      return;
    }

    const dayCard = event.target.closest(".day-card");
    if (dayCard) { selectedDay = Number(dayCard.dataset.day); renderCamp(); return; }

    const preview = event.target.closest("[data-preview]");
    if (preview) { selectedResourceId = preview.dataset.preview; renderResourceDetail(); return; }

    const routeResource = event.target.closest("[data-route-resource]");
    if (routeResource) {
      const resource = resourceById(routeResource.dataset.routeResource);
      const relatedDay = campDays.find(day => day.resources.includes(resource.id));
      if (relatedDay) {
        selectedDay = relatedDay.day;
        state.activeDay = relatedDay.day;
        saveState();
        renderAll();
        navigate("camp");
      }
      return;
    }

    const valueFilter = event.target.closest("[data-value-filter]");
    if (valueFilter) {
      activeValueFilter = valueFilter.dataset.valueFilter;
      qsa(".chip-filter").forEach(button => button.classList.toggle("active", button === valueFilter));
      renderLibrary();
      return;
    }

    const removeStudent = event.target.closest("[data-remove-student]");
    if (removeStudent) {
      state.students = state.students.filter(student => student.Student_ID !== removeStudent.dataset.removeStudent);
      saveState();
      renderAll();
    }
  });

  qs("#mark-day-complete").addEventListener("click", () => {
    if (!state.completedDays.includes(selectedDay)) state.completedDays.push(selectedDay);
    state.completedDays.sort((a, b) => a - b);
    state.activeDay = Math.min(campDays.length, Math.max(state.activeDay, selectedDay + 1));
    selectedDay = Math.min(campDays.length, state.activeDay);
    saveState();
    renderAll();
    showToast("Lesson completion saved locally.");
  });

  qs("#set-current-day").addEventListener("click", () => {
    state.activeDay = selectedDay;
    saveState();
    renderAll();
    showToast(`Day ${selectedDay} set as current.`);
  });

  qs("#resource-search").addEventListener("input", renderLibrary);
  qs("#cluster-filter").addEventListener("change", renderLibrary);
  qs("#type-filter").addEventListener("change", renderLibrary);
  qs("#capture-form").addEventListener("submit", saveMeetingSnapshot);
  qs("#evidence-form").addEventListener("submit", saveEvidence);
  qs("#select-all-students").addEventListener("click", () => qsa("[data-student-check]").forEach(input => { input.checked = true; }));
  qs("#clear-all-students").addEventListener("click", () => qsa("[data-student-check]").forEach(input => { input.checked = false; }));
  qs("#export-json").addEventListener("click", exportJson);
  qs("#export-json-top").addEventListener("click", exportJson);
  qs("#export-csv").addEventListener("click", exportCsv);
  qs("#add-student-button").addEventListener("click", () => {
    const name = prompt("Student name");
    if (!name) return;
    const id = `S${String(Date.now()).slice(-6)}`;
    state.students.push({ Student_ID: id, Student_Name: name.trim(), Grade_Band: "3-5", House: "Unassigned" });
    saveState();
    renderAll();
  });

  renderAll();
})();



