# Matchbook Teacher Culture Dashboard

Open `index.html` in a browser to run the teacher-facing dashboard locally. No install step is required.

## What this build does

- Builds the four dashboard areas as live local interface views: Constellation, Culture Camp, Lesson Library, and Class Progress.
- Links resource cards to final DOCX, PDF, and HTML draft artifacts in this Downloads build.
- Uses the finalized 10-day Culture Camp source, not a new 24-day sequence.
- Saves teacher entries in the browser's local storage.
- Exports a master-dashboard-ready JSON packet and a Morning Meeting CSV.

## Data export shape

The JSON export contains:

- `Teacher`
- `Students`
- `Lesson_Completion_Records`
- `Morning_Meeting_Records`
- `Student_Evidence_Records`
- `Summary_Metrics`
- `Source_Document_Links`

The export field names stay aligned to the data architecture, while teacher-facing resource cards point to final draft artifacts rather than markdown source files.

## Important local behavior

This is a local teacher dashboard. It does not sync to a server yet. Teachers export JSON/CSV when they are ready to send data to the master dashboard layer.


