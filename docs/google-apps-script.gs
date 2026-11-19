/**
 * Агрофорум 2026: тіркеу формасының деректерін Google Sheets-ке жазады.
 *
 * Орнату (5 минут):
 * 1. Google Sheets-те жаңа кесте ашыңыз (мысалы, «Агрофорум 2026 өтінімдері»).
 * 2. Мәзір: Extensions (Кеңейтімдер) > Apps Script. Осы файлдың мәтінін толық қойыңыз, сақтаңыз.
 * 3. Deploy (Жариялау) > New deployment > түрі: Web app.
 *      Execute as: Me (Мен)
 *      Who has access: Anyone (Кез келген адам)
 * 4. Authorize (рұқсат беріңіз), содан кейін шыққан «Web app URL» сілтемесін көшіріңіз.
 * 5. Сілтемені site/js/config.js ішіндегі sheetsUrl өрісіне қойыңыз:
 *      sheetsUrl: "https://script.google.com/macros/s/.../exec"
 * 6. Сайтты қайта жариялаңыз. Форма жіберілгенде жаңа жол «Өтінімдер» парағына қосылады.
 *
 * Скриптті өзгерткенде «Deploy > Manage deployments > Edit > New version» арқылы жаңа нұсқа жариялаңыз.
 */

const SHEET_NAME = 'Өтінімдер';
const HEADERS = ['Мерзімі', 'Аты-жөні', 'Телефон', 'Облыс', 'Сала', 'Пакет', 'Баға', 'Аударма тілі', 'Ғалымдарға сұрақ', 'Сайт тілі', 'Бет'];

// Формула енгізуден қорғау: =, +, -, @ белгісімен басталатын мәтінге апостроф қосады.
function safe(v) {
  const s = v == null ? '' : String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(),
      safe(d.name), safe(d.phone), safe(d.region), safe(d.sector),
      safe(d.package), safe(d.price), safe(d.interpretation), safe(d.question), safe(d.siteLang), safe(d.page)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Браузерден тексеру: Web app URL-ін ашқанда «ok» көрінеді.
function doGet() {
  return ContentService.createTextOutput('Agroforum 2026 form endpoint: ok');
}
