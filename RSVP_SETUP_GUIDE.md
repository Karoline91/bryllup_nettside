# RSVP System Setup Guide

A complete guide to setting up your wedding RSVP system with Google Sheets integration.

## 🎯 Overview

This RSVP system provides:
- ✅ Beautiful form that matches your wedding website
- ✅ Direct integration with Google Sheets
- ✅ Automatic data organization and formatting
- ✅ Optional email notifications
- ✅ Mobile-friendly design
- ✅ Norwegian language support

## 📋 What You'll Collect

The RSVP form collects:
- **Basic Info**: Name, email, phone number
- **Attendance**: Yes/No with follow-up questions
- **Guest Count**: Number of people attending
- **Event Parts**: Ceremony only, reception only, or both
- **Dietary Requirements**: Allergies and food preferences
- **Accommodation**: Whether they need hotel recommendations
- **Comments**: Personal messages and questions

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVP Responses" (or similar)
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/1S1ei2PJAH7fCkOCLFGKQet4gzgSFnMcC/edit
   ```
   The ID is: `1S1ei2PJAH7fCkOCLFGKQet4gzgSFnMcC`

### Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the content from `google-apps-script.js`
4. Update the configuration:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Paste your ID here
   const SHEET_NAME = 'RSVP Responses';
   ```

### Step 3: Deploy as Web App

1. In Google Apps Script, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Type"
3. Select **Web app**
4. Configure:
   - **Description**: "Wedding RSVP Handler"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Copy the Web App URL (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### Step 4: Update RSVP Form

1. Open `rsvp.html`
2. Find this line:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your Web App URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

### Step 5: Test the System

1. Open `rsvp.html` in your browser
2. Fill out the form with test data
3. Submit the form
4. Check your Google Sheet - the data should appear automatically!

## 📊 Your Google Sheet Structure

The script automatically creates a sheet with these columns:

| Column | Description |
|--------|-------------|
| Tidspunkt | Submission timestamp |
| Navn | Guest name |
| E-post | Email address |
| Telefon | Phone number |
| Kommer | Yes/No attendance |
| Antall personer | Number of guests |
| Navn på følge | Names of additional guests |
| Deler av bryllup | Which parts they're attending |
| Allergier/matpreferanser | Dietary requirements |
| Overnattingshjelp | Need accommodation help |
| Kommentarer | Additional comments |

**Color coding:**
- 🟢 Green: "Ja" (attending)
- 🔴 Red: "Nei" (not attending)

## 🔧 Advanced Configuration

### Enable Email Notifications

1. In your Google Apps Script, find the `sendNotificationEmail` function
2. Update these settings:
   ```javascript
   const NOTIFICATION_EMAIL = 'your-email@example.com'; // Your email
   const SEND_NOTIFICATIONS = true; // Enable notifications
   ```
3. Save and redeploy

### Get RSVP Statistics

Run the `getRSVPStats()` function in Google Apps Script to get:
- Total responses
- Number attending vs. not attending
- Total guest count
- Response rate

### Test the System

Run the `testRSVP()` function to verify everything works before going live.

## 🌐 Add RSVP to Your Website

Add the RSVP link to your navigation menu in all HTML files:

```html
<nav>
  <a href="index.html">Hjem</a>
  <a href="program.html">Program</a>
  <a href="kart.html">Kart</a>
  <a href="onskeliste.html">Ønskeliste</a>
  <a href="talehjelp.html">Talehjelp</a>
  <a href="sporsmal.html">Spørsmål og svar</a>
  <a href="rsvp.html">RSVP</a> <!-- Add this line -->
</nav>
```

## 🔒 Security & Privacy

- **No API keys required** - Uses Google Apps Script authentication
- **Secure data transmission** - HTTPS encryption
- **Private spreadsheet** - Only you can access the responses
- **No third-party services** - Everything stays within Google's ecosystem

## 📱 Mobile Optimization

The RSVP form is fully responsive and works perfectly on:
- ✅ Desktop computers
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (iPhone, Android)

## 🎨 Customization Options

### Change Colors
Modify the CSS in `rsvp.html`:
```css
.submit-btn {
  background: #bfa77a; /* Change this color */
}
```

### Add/Remove Fields
1. Update the HTML form in `rsvp.html`
2. Update the Google Apps Script headers array
3. Update the `rowData` array to match

### Change Text
All text is in Norwegian and can be easily modified in `rsvp.html`.

## 🚨 Troubleshooting

### "Failed to connect" Error
- ✅ Check that the Web App URL is correct
- ✅ Ensure the Google Apps Script is deployed with "Anyone" access
- ✅ Verify the Spreadsheet ID is correct

### Form Submits but No Data in Sheet
- ✅ Check Google Apps Script execution logs
- ✅ Verify the `SPREADSHEET_ID` matches your actual sheet
- ✅ Ensure the Google Apps Script has permission to edit the sheet

### Email Notifications Not Working
- ✅ Check that `SEND_NOTIFICATIONS` is set to `true`
- ✅ Verify the notification email address is correct
- ✅ Look for errors in the Google Apps Script logs

### Styling Issues
- ✅ Clear browser cache
- ✅ Check that `style.css` is loading properly
- ✅ Verify all CSS classes are correctly applied

## 📈 Managing Responses

### View All Responses
Open your Google Sheet to see all RSVP responses in an organized table.

### Export Data
Use Google Sheets' export features:
- **File** → **Download** → **Excel** (for wedding planning software)
- **File** → **Download** → **PDF** (for printing)

### Filter Responses
Use Google Sheets filters to:
- See only guests who are attending
- Filter by dietary requirements
- Sort by submission date

### Count Guests
The sheet automatically shows:
- Total number of responses
- Total guests attending
- Breakdown by attendance status

## 🎯 Best Practices

### Before Launch
1. ✅ Test with multiple submissions
2. ✅ Check mobile responsiveness
3. ✅ Verify data appears correctly in Google Sheets
4. ✅ Test email notifications (if enabled)
5. ✅ Share with a friend to get feedback

### During RSVP Period
1. ✅ Check responses regularly
2. ✅ Follow up with non-responders
3. ✅ Monitor for technical issues
4. ✅ Back up your Google Sheet periodically

### For Wedding Planning
1. ✅ Use the data for seating arrangements
2. ✅ Share dietary requirements with caterers
3. ✅ Send accommodation info to those who requested it
4. ✅ Create contact lists for wedding updates

## 🆘 Support

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Review Google Apps Script logs** for error messages
3. **Test with sample data** to isolate the problem
4. **Verify all URLs and IDs** are correctly configured

## 📋 Checklist

- [ ] Google Sheet created
- [ ] Spreadsheet ID copied
- [ ] Google Apps Script created
- [ ] Script configured with correct Spreadsheet ID
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL copied
- [ ] RSVP form updated with Web App URL
- [ ] System tested with sample data
- [ ] RSVP link added to website navigation
- [ ] Email notifications configured (optional)
- [ ] Ready to launch! 🎉

---

**Congratulations!** Your RSVP system is now ready to collect wedding responses. Your guests will love the beautiful, easy-to-use form, and you'll love having all responses automatically organized in Google Sheets. 