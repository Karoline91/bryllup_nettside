/**
 * Google Apps Script for RSVP Form Handler
 * This script receives RSVP form submissions and saves them to a Google Sheet
 */

// Configuration - Update these settings
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Sheets ID
const SHEET_NAME = 'RSVP Responses'; // Name of the sheet tab

/**
 * Handle POST requests from the RSVP form
 */
function doPost(e) {
  try {
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data for debugging
    console.log('Received RSVP data:', data);
    
    // Save to Google Sheets
    const result = saveToSheet(data);
    
    // Send email notification (optional)
    sendNotificationEmail(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'RSVP saved successfully',
        'timestamp': new Date()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing RSVP:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - used for testing
 */
function doGet(e) {
  return ContentService
    .createTextOutput('RSVP Handler is running! Use POST to submit RSVPs.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Save RSVP data to Google Sheets
 */
function saveToSheet(data) {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Add headers
      const headers = [
        'Tidspunkt',
        'Navn', 
        'E-post',
        'Telefon',
        'Kommer',
        'Antall personer',
        'Navn på følge',
        'Deler av bryllup',
        'Allergier/matpreferanser',
        'Overnattingshjelp',
        'Kommentarer'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#bfa77a');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      
      // Set column widths
      sheet.setColumnWidth(1, 150); // Tidspunkt
      sheet.setColumnWidth(2, 200); // Navn
      sheet.setColumnWidth(3, 200); // E-post
      sheet.setColumnWidth(4, 120); // Telefon
      sheet.setColumnWidth(5, 80);  // Kommer
      sheet.setColumnWidth(6, 120); // Antall personer
      sheet.setColumnWidth(7, 200); // Navn på følge
      sheet.setColumnWidth(8, 150); // Deler av bryllup
      sheet.setColumnWidth(9, 250); // Allergier
      sheet.setColumnWidth(10, 120); // Overnattingshjelp
      sheet.setColumnWidth(11, 300); // Kommentarer
    }
    
    // Prepare the row data
    const rowData = [
      data.tidspunkt || new Date().toLocaleString('no-NO'),
      data.navn || '',
      data.epost || '',
      data.telefon || '',
      data.kommer || '',
      data.antallPersoner || '',
      data.navnPaFolge || '',
      data.delerAvBryllup || '',
      data.allergier || '',
      data.overnattingshjelp || '',
      data.kommentarer || ''
    ];
    
    // Find the next empty row
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;
    
    // Insert the data
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Apply conditional formatting for better readability
    if (data.kommer === 'ja') {
      sheet.getRange(nextRow, 5).setBackground('#d4edda'); // Light green for "ja"
    } else if (data.kommer === 'nei') {
      sheet.getRange(nextRow, 5).setBackground('#f8d7da'); // Light red for "nei"
    }
    
    console.log('RSVP saved to sheet successfully');
    return { success: true, row: nextRow };
    
  } catch (error) {
    console.error('Error saving to sheet:', error);
    throw new Error('Failed to save RSVP to sheet: ' + error.toString());
  }
}

/**
 * Send email notification when RSVP is received (optional)
 */
function sendNotificationEmail(data) {
  try {
    // Configuration - update these email settings
    const NOTIFICATION_EMAIL = 'your-email@example.com'; // Replace with your email
    const SEND_NOTIFICATIONS = false; // Set to true to enable email notifications
    
    if (!SEND_NOTIFICATIONS) {
      return;
    }
    
    const subject = `Ny RSVP mottatt fra ${data.navn}`;
    
    let body = `En ny RSVP er mottatt på bryllupssiden!\n\n`;
    body += `Navn: ${data.navn}\n`;
    body += `E-post: ${data.epost}\n`;
    body += `Telefon: ${data.telefon || 'Ikke oppgitt'}\n`;
    body += `Kommer: ${data.kommer}\n`;
    
    if (data.kommer === 'ja') {
      body += `Antall personer: ${data.antallPersoner}\n`;
      body += `Navn på følge: ${data.navnPaFolge || 'Ingen følge'}\n`;
      body += `Deler av bryllup: ${data.delerAvBryllup}\n`;
      body += `Allergier/matpreferanser: ${data.allergier || 'Ingen'}\n`;
      body += `Overnattingshjelp: ${data.overnattingshjelp}\n`;
    }
    
    if (data.kommentarer) {
      body += `\nKommentarer: ${data.kommentarer}\n`;
    }
    
    body += `\nTidspunkt: ${data.tidspunkt}\n`;
    body += `\nSjekk Google Sheets for fullstendig oversikt.`;
    
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    console.log('Notification email sent');
    
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw error here - we don't want email issues to break RSVP saving
  }
}

/**
 * Test function - run this to verify everything works
 */
function testRSVP() {
  const testData = {
    tidspunkt: new Date().toLocaleString('no-NO'),
    navn: 'Test Person',
    epost: 'test@example.com',
    telefon: '12345678',
    kommer: 'ja',
    antallPersoner: '2',
    navnPaFolge: 'Test Følgesvenn',
    delerAvBryllup: 'begge',
    allergier: 'Ingen allergier',
    overnattingshjelp: 'nei',
    kommentarer: 'Dette er en test RSVP'
  };
  
  try {
    const result = saveToSheet(testData);
    console.log('Test RSVP saved successfully:', result);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

/**
 * Get RSVP statistics - useful for wedding planning
 */
function getRSVPStats() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return { error: 'No RSVP sheet found' };
    }
    
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return { 
        totalResponses: 0,
        attending: 0,
        notAttending: 0,
        totalGuests: 0
      };
    }
    
    // Get all data (excluding header row)
    const data = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
    
    let attending = 0;
    let notAttending = 0;
    let totalGuests = 0;
    
    data.forEach(row => {
      const kommer = row[4]; // "Kommer" column
      const antallPersoner = row[5]; // "Antall personer" column
      
      if (kommer === 'ja') {
        attending++;
        const guests = parseInt(antallPersoner) || 1;
        totalGuests += guests;
      } else if (kommer === 'nei') {
        notAttending++;
      }
    });
    
    return {
      totalResponses: attending + notAttending,
      attending: attending,
      notAttending: notAttending,
      totalGuests: totalGuests,
      responseRate: Math.round(((attending + notAttending) / (attending + notAttending)) * 100)
    };
    
  } catch (error) {
    console.error('Error getting RSVP stats:', error);
    return { error: error.toString() };
  }
} 