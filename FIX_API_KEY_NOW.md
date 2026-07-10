# 🚨 URGENT: FIX YOUR GITHUB SECRET!

## ❌ **THE PROBLEM:**

Your GEMINI_API_KEY in GitHub Secrets **STILL HAS QUOTES OR SPACES!**

The error `"unregistered callers"` means Google can't recognize your API key.

---

## ✅ **THE FIX (1 MINUTE):**

### **STEP 1: Delete Old Secret**

1. Go to: **https://github.com/harshraj0235/fincal/settings/secrets/actions**

2. Find **GEMINI_API_KEY**

3. Click the **trash icon** (🗑️) or **"Remove"**

4. Confirm deletion

---

### **STEP 2: Add Clean Secret**

1. Click **"New repository secret"** (green button)

2. **Name:** Type exactly: `GEMINI_API_KEY`

3. **Secret:** Copy and paste EXACTLY this (NO quotes, NO spaces!):
```
AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg
```

4. **BEFORE clicking "Add secret"**, verify:
   - ✅ No quotes at start
   - ✅ No quotes at end
   - ✅ No spaces before AIza
   - ✅ No spaces after ...8eg

5. Click **"Add secret"**

---

### **STEP 3: Also Update Other Keys (Same Way)**

**Delete and re-add UNSPLASH_ACCESS_KEY:**
```
2ouYQQXGrMur63FnX-KA2pZlibTVMzfbgt7Dhe7rRTU
```

**Delete and re-add PEXELS_API_KEY:**
```
P2csPViCRuURkobvGIX8h9RGwP5Ud0ePBZqnq9uBw0WViLPWth4Oh6CR
```

---

## 🧪 **STEP 4: Test Your API Key (Optional)**

### **Test Gemini API Key Directly:**

Open this URL in browser (replace API_KEY with yours):

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg
```

**If working:** You'll see JSON response (or "Method POST required")  
**If broken:** You'll see 403 error

---

## 🚀 **STEP 5: Run Workflow Again**

After updating secrets:

1. **Go to:** https://github.com/harshraj0235/fincal/actions

2. Click **"Auto-Publish News Articles"**

3. Click **"Run workflow"** → **"Run workflow"**

4. **THIS TIME = SUCCESS!** ✅

---

## ✅ **CHECKLIST:**

- [ ] Delete GEMINI_API_KEY from GitHub Secrets
- [ ] Add new GEMINI_API_KEY (no quotes, no spaces)
- [ ] Delete UNSPLASH_ACCESS_KEY  
- [ ] Add new UNSPLASH_ACCESS_KEY (no quotes, no spaces)
- [ ] Delete PEXELS_API_KEY
- [ ] Add new PEXELS_API_KEY (no quotes, no spaces)
- [ ] Run workflow
- [ ] SUCCESS! ✅

---

## 📋 **EXACT KEYS TO COPY (NO MODIFICATIONS!):**

### **GEMINI_API_KEY:**
```
AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg
```

### **UNSPLASH_ACCESS_KEY:**
```
2ouYQQXGrMur63FnX-KA2pZlibTVMzfbgt7Dhe7rRTU
```

### **PEXELS_API_KEY:**
```
P2csPViCRuURkobvGIX8h9RGwP5Ud0ePBZqnq9uBw0WViLPWth4Oh6CR
```

---

## ⚠️ **COMMON MISTAKES:**

### **❌ WRONG:**
```
" AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg"     (has quote + space!)
"AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg"      (has quotes!)
 AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg       (has space before!)
AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg        (has space after!)
```

### **✅ CORRECT:**
```
AIzaSyC-_X3ZWIg0vPDSzrX7pvWVq8KYWl_W8eg
```

NO quotes, NO spaces, NO anything - just the key!

---

## 🎯 **DO THIS NOW:**

**1. Go here:** https://github.com/harshraj0235/fincal/settings/secrets/actions

**2. Delete all 3 secrets** (trash icon)

**3. Add them back** (copy keys from above)

**4. Run workflow:** https://github.com/harshraj0235/fincal/actions

**5. SUCCESS!** ✅

---

**This is the LAST issue - fix secrets and it works!** 🚀

