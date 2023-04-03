# Password Copier

## Introduction
- OpenVPN for VNG employees requires a TOTP and prefix/postfix to login
- This web app uses authenticator to extract the TOTP and append with the prefix/postfix to create a full password string to Ctrl+V on OpenVPN
- The key and prefix/postfix are stored in local storage, not on any third-party storage

## Installation guide
1. Clone this repo
2. Run ```npm install```
3. Run ```npm start```
4. Go to [localhost:3000](localhost:3000)

## Deploy guide
1. Create app in Firebase
2. Add your GitHub Actions secret: `FIREBASE_SERVICE_ACCOUNT_PASSWORD_GETTER`
3. Commit -> auto deploy
