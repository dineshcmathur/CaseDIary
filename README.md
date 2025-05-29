# Firebase Form App

## Setup

1. Clone the repo.
2. Run `npm install` in root, `functions/`, and `frontend/`.
3. Login & select your Firebase project:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add
   ```
4. Add your Firebase config to `frontend/src/firebase.js`.
5. Deploy everything:
   ```bash
   firebase deploy
   ```
