# 🔐 Fix Gmail Authentication - Step by Step

## ❌ Current Error

```
The SMTP server requires a secure connection or the client was not authenticated.
```

This means Gmail is blocking the login attempt for security reasons.

---

## ✅ Solution 1: Enable Less Secure App Access (Quick & Easy)

### Step-by-Step:

1. **Open this link in your browser:**
   ```
   https://myaccount.google.com/lesssecureapps
   ```

2. **Sign in with moneycalx9@gmail.com**

3. **Turn ON "Allow less secure apps"**
   - Toggle the switch to **ON** (blue)
   - You'll see: "Allow apps that use less secure sign in"

4. **Wait 5-10 minutes** for changes to take effect

5. **Run the email script again:**
   ```powershell
   .\Send-Email.ps1
   ```

6. **Check harshraj0235@gmail.com inbox!** 📧

---

## ✅ Solution 2: Use App Password (More Secure - Recommended)

### Step-by-Step:

1. **Enable 2-Factor Authentication first:**
   - Visit: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup (uses phone number)

2. **Generate App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Select App: **Mail**
   - Select Device: **Other (Custom name)**
   - Enter name: **MoneyCal Email System**
   - Click **Generate**

3. **Copy the 16-character password**
   ```
   Example: abcd efgh ijkl mnop
   ```

4. **Update Send-Email.ps1:**
   - Open file in editor
   - Find line: `$senderPassword = "Mahima123#@"`
   - Replace with: `$senderPassword = "abcd efgh ijkl mnop"`
   - Remove spaces from app password

5. **Save and run:**
   ```powershell
   .\Send-Email.ps1
   ```

---

## 🚀 Quick Test (After Fixing Auth)

```powershell
cd "C:\Users\Anand\Downloads\main fincal\fincal\email-automation"
.\Send-Email.ps1
```

**Expected Output:**
```
✅ EMAIL SENT SUCCESSFULLY!
📧 Email sent to: harshraj0235@gmail.com
```

---

## 🎯 Which Solution to Choose?

| Feature | Less Secure Apps | App Password |
|---------|------------------|--------------|
| **Setup Time** | 2 minutes | 5 minutes |
| **Security** | Less secure | More secure ✅ |
| **Google Recommended** | No | Yes ✅ |
| **Future Proof** | May be removed | Stable ✅ |

**Recommendation:** Use **App Password** for production

---

## 📧 After Authentication is Fixed

### Send Test Email:
```powershell
.\Send-Email.ps1
```

### Send to Custom Email:
```powershell
.\Send-Email.ps1 -ToEmail "anyemail@gmail.com" -ToName "Any Name"
```

### Add Multiple Subscribers:
Edit `subscribers.json` and add more emails

---

## 🆘 Still Having Issues?

### Check these:

1. **Correct email address?**
   - moneycalx9@gmail.com

2. **Correct password?**
   - Mahima123#@
   - Or App Password if using that method

3. **Internet connection?**
   - Check if you can access gmail.com

4. **Gmail account active?**
   - Try logging in manually

5. **2FA enabled?**
   - If yes, MUST use App Password

---

## 🎉 Once Fixed

The email will be sent with:
- **Subject:** 🌟 [Content Title] | MoneyCal
- **To:** harshraj0235@gmail.com
- **From:** MoneyCal Financial Companion <moneycalx9@gmail.com>
- **Content:** Beautiful HTML email with random content

**Check inbox (and spam folder) within 30 seconds!**

---

## 💡 Quick Links

- **Enable Less Secure Apps:** https://myaccount.google.com/lesssecureapps
- **Generate App Password:** https://myaccount.google.com/apppasswords
- **Gmail Security Settings:** https://myaccount.google.com/security
- **Account Help:** https://support.google.com/mail

---

**Choose ONE solution above and follow the steps!** ✨

