import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});


export async function getTransactions() {

  try {

    const sheets = google.sheets({
      version: "v4",
      auth
    });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Transactions!A:I"
    });

    const rows = res.data.values || [];

    // remove header row
    rows.shift();

    return rows.map(row => ({
      id: row[0],
      date: row[1],
      partner: row[2],
      type: row[3],
      name: row[4],
      bank: row[5],
      account: row[6],
      amount: row[7],
      notes: row[8]
    }));

  } catch (error) {

    console.error("GOOGLE SHEETS ERROR:", error);

    return [];

  }

}


export async function addTransaction(data) {

  try {

    const sheets = google.sheets({
      version: "v4",
      auth
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Transactions!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          Date.now(),
          new Date().toISOString().split("T")[0],
          data.partner,
          data.type,
          data.name,
          data.bank,
          data.account,
          data.amount,
          data.notes
        ]]
      }
    });

    return { success: true };

  } catch (error) {

    console.error("GOOGLE SHEETS SAVE ERROR:", error);

    return { success: false };

  }

}