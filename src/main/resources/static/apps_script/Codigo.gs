/* Marki · UAP — recibe las evaluaciones y las guarda en esta hoja de cálculo.
   Pega este código en Extensiones > Apps Script de una hoja nueva de Google Sheets.
   Luego: Implementar > Nueva implementación > Aplicación web
          Ejecutar como: Yo · Quién tiene acceso: Cualquier persona          */

var CLAVE = '';              // Opcional. Si escribes una clave aquí, escribe la misma en Marki.
var HOJA = 'Evaluaciones';   // Pestaña de las evaluaciones de negocios.
var HOJAS = { 'Evaluaciones': 1, 'Expertos': 1 };   // Pestañas que Marki puede usar (los expertos van en «Expertos»).

function hoja_(nombre) {
  nombre = HOJAS[nombre] ? nombre : HOJA;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(nombre) || ss.insertSheet(nombre);
}

function texto_(v) {
  if (v === null || v === undefined) return '';
  // Evita que un texto que empieza con = + - @ se lea como fórmula.
  if (typeof v === 'string' && /^[=+\-@]/.test(v)) return "'" + v;
  return v;
}

function salida_(obj, cb) {
  var txt = JSON.stringify(obj);
  cb = String(cb || '').replace(/[^\w$]/g, '');
  if (cb) return ContentService.createTextOutput(cb + '(' + txt + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(txt).setMimeType(ContentService.MimeType.JSON);
}

/* Marki envía aquí cada evaluación terminada y cada experto. Si el id ya existe (registro corregido), reemplaza la fila. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (CLAVE && d.clave !== CLAVE) return salida_({ ok: false, error: 'Clave incorrecta' });
    if (!d.id || !d.fila || !d.cabecera) return salida_({ ok: false, error: 'Datos incompletos' });
    var h = hoja_(d.hoja);
    if (h.getLastRow() === 0) {
      h.appendRow(d.cabecera.concat(['recibido']));
      h.setFrozenRows(1);
      h.getRange(1, 1, 1, d.cabecera.length + 1).setFontWeight('bold').setBackground('#1F3864').setFontColor('#FFFFFF');
    }
    var cab = h.getRange(1, 1, 1, h.getLastColumn()).getValues()[0];
    d.cabecera.forEach(function (c) {           // columnas nuevas de una versión futura de Marki
      if (cab.indexOf(c) < 0) { cab.push(c); h.getRange(1, cab.length).setValue(c); }
    });
    var valor = {};
    d.cabecera.forEach(function (c, i) { valor[c] = d.fila[i]; });
    valor.recibido = new Date();
    var fila = cab.map(function (c) { return texto_(valor[c]); });
    var f = h.getRange('A:A').createTextFinder(String(d.id)).matchEntireCell(true).findNext();
    if (f && f.getRow() > 1) h.getRange(f.getRow(), 1, 1, fila.length).setValues([fila]);
    else h.appendRow(fila);
    return salida_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/* Marki consulta aquí si la conexión funciona (accion=ping) y qué evaluaciones ya llegaron (accion=ids). */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (CLAVE && p.clave !== CLAVE) return salida_({ ok: false, error: 'Clave incorrecta' }, p.callback);
  var h = hoja_(p.hoja), n = Math.max(0, h.getLastRow() - 1);
  var r = { ok: true, filas: n, hoja: SpreadsheetApp.getActiveSpreadsheet().getUrl() };
  if (p.accion === 'ids') r.ids = n ? h.getRange(2, 1, n, 1).getValues().map(function (x) { return String(x[0]); }) : [];
  return salida_(r, p.callback);
}
