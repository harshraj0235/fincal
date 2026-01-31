# App signing / certificate fingerprints

Use these when registering the app with Google Play Console, Firebase, or other services that require SHA-256.

## Finance calculator

**SHA-256:**
```
4YTTu+pwdvMyrLaKsf1OwzpFZgg6HOjp6w/hHdTX2Ec
```

Copy the value above (no spaces) when asked for:
- **Google Play Console** → App signing → App signing key certificate → SHA-256
- **Firebase** → Project settings → Your apps → Add fingerprint
- **Google Sign-In / OAuth** → Credentials → Android client → SHA-1 / SHA-256

Do not commit actual keystore files (`.jks`, `.keystore`) or passwords to the repo.
