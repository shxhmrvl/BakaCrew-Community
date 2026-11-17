BAKACREW COMMUNITY — FIREBASE RECODE

Files in this package:
- index.html
- styles.css
- app.js
- firebase.js
- config.js

INSTALLATION (GitHub Pages)
1. Download/extract this ZIP.
2. In the existing BakaCrew-Community repository, replace the five files above.
3. Keep your existing bakacrew-logo.png file in the repository root. The page still references it.
4. Do not delete other project assets or workflows.
5. Commit the changes to the branch used by GitHub Pages and wait for deployment.
6. Open the site in a private/incognito tab or clear the site cache before testing.

IMPORTANT FIREBASE NOTES
- Firebase Authentication and Cloud Firestore remain the backend. No Google Sheets or Apps Script community API is used.
- config.js retains the existing Financial Analytics URL. It is not changed by this recode.
- firebase.js retains the existing Firebase project configuration and SDK version.
- Public collection reads are isolated: a Firestore permission issue in one public collection will no longer blank every other public section. The site will identify the collections that failed to load.
- Public profile mirror writes are treated as optional; the authenticated account profile in users/{uid} remains the core profile record.
- Firestore Security Rules were not included in the uploaded files. Therefore the code can be syntax-checked, but sign-in, posting, likes, comments, admin actions and content reads still depend on rules allowing the correct authenticated operations. Do not set Firestore to unrestricted public write access. Send the current Firestore Rules for a matching secure ruleset.
- Firebase Authentication must have the GitHub Pages host (shxhmrvl.github.io) in Authorized domains.

DESIGN
- Corporate premium navy / white / turquoise palette.
- Desktop uses a wide, multi-column layout and horizontal navigation.
- Tablet/mobile use a compact header, drawer navigation, touch-friendly controls and single-column content where appropriate.
