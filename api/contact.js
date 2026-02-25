const nodemailer = require("nodemailer");

// Rate limiting en memoria (se reinicia en cold start)
const submissions = new Map();
const RATE_LIMIT_MS = 60_000;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getArgentinaDate() {
  return new Date().toLocaleDateString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildNotificationEmail(nombre, email, telefono, organizacion, mensaje, logoUrl) {
  const nombreEsc = escapeHtml(nombre);
  const emailEsc = escapeHtml(email);
  const telEsc = escapeHtml(telefono);
  const orgEsc = organizacion ? escapeHtml(organizacion) : "";
  const mensajeEsc = escapeHtml(mensaje).replace(/\n/g, "<br>");

  const orgRow = orgEsc
    ? `<tr>
        <td class="data-label" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8C8C8C;text-transform:uppercase;letter-spacing:0.5px;background-color:#FAFAFA;border-bottom:1px solid #F0F0F0;width:130px;vertical-align:top;">Organizaci&oacute;n</td>
        <td class="data-value" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2D2D2D;border-bottom:1px solid #F0F0F0;vertical-align:top;">${orgEsc}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Nuevo mensaje de contacto</title>
  <!--[if mso]>
  <style type="text/css">
    table, td, th { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  </style>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .email-content { padding: 24px 20px !important; }
      .data-label { display: block !important; width: 100% !important; padding-bottom: 4px !important; }
      .data-value { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F2F2F2;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2F2F2;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:600px;width:100%;margin:0 auto;">

          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#2D2D2D" style="background-color:#2D2D2D;padding:28px 32px;">
              <img src="${logoUrl}/assets/icons/logo-light.png" alt="Synapsis Health" width="180" height="110" style="display:block;border:0;width:180px;height:auto;max-width:180px;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td bgcolor="#FFFFFF" class="email-content" style="background-color:#FFFFFF;padding:32px;border-left:1px solid #E5E5E5;border-right:1px solid #E5E5E5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#2D2D2D;padding-bottom:8px;">
                    Nuevo mensaje desde el sitio web
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#8C8C8C;padding-bottom:24px;">
                    Recibido el ${getArgentinaDate()} (hora Argentina)
                  </td>
                </tr>
              </table>

              <!-- Data table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #EBEBEB;">
                <tr>
                  <td class="data-label" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8C8C8C;text-transform:uppercase;letter-spacing:0.5px;background-color:#FAFAFA;border-bottom:1px solid #F0F0F0;width:130px;vertical-align:top;">Nombre</td>
                  <td class="data-value" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2D2D2D;border-bottom:1px solid #F0F0F0;vertical-align:top;font-weight:bold;">${nombreEsc}</td>
                </tr>
                <tr>
                  <td class="data-label" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8C8C8C;text-transform:uppercase;letter-spacing:0.5px;background-color:#FAFAFA;border-bottom:1px solid #F0F0F0;width:130px;vertical-align:top;">Email</td>
                  <td class="data-value" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2D2D2D;border-bottom:1px solid #F0F0F0;vertical-align:top;">
                    <a href="mailto:${emailEsc}" style="color:#2D2D2D;text-decoration:underline;">${emailEsc}</a>
                  </td>
                </tr>
                <tr>
                  <td class="data-label" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8C8C8C;text-transform:uppercase;letter-spacing:0.5px;background-color:#FAFAFA;border-bottom:1px solid #F0F0F0;width:130px;vertical-align:top;">Celular</td>
                  <td class="data-value" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2D2D2D;border-bottom:1px solid #F0F0F0;vertical-align:top;">${telEsc}</td>
                </tr>
                ${orgRow}
                <tr>
                  <td class="data-label" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8C8C8C;text-transform:uppercase;letter-spacing:0.5px;background-color:#FAFAFA;width:130px;vertical-align:top;">Mensaje</td>
                  <td class="data-value" style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2D2D2D;line-height:1.6;vertical-align:top;">${mensajeEsc}</td>
                </tr>
              </table>

              <!-- Reply hint -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-top:24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#999999;line-height:1.5;">
                    Pod&eacute;s responder directamente a este email para contactar a ${nombreEsc}.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#F9F9F9" style="background-color:#F9F9F9;padding:20px 32px;border:1px solid #E5E5E5;border-top:none;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#AAAAAA;line-height:1.5;">
                    Este mensaje fue enviado desde el formulario de contacto de synapsishealth.com.ar
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmail(nombre, mensaje, logoUrl) {
  const nombreEsc = escapeHtml(nombre);
  const mensajeEsc = escapeHtml(mensaje).replace(/\n/g, "<br>");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Recibimos tu mensaje</title>
  <!--[if mso]>
  <style type="text/css">
    table, td, th { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  </style>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .email-content { padding: 28px 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F2F2F2;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2F2F2;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:600px;width:100%;margin:0 auto;">

          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#2D2D2D" style="background-color:#2D2D2D;padding:28px 32px;">
              <img src="${logoUrl}/assets/icons/logo-light.png" alt="Synapsis Health" width="180" height="110" style="display:block;border:0;width:180px;height:auto;max-width:180px;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td bgcolor="#FFFFFF" class="email-content" style="background-color:#FFFFFF;padding:36px 32px;border-left:1px solid #E5E5E5;border-right:1px solid #E5E5E5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#2D2D2D;padding-bottom:16px;">
                    Hola ${nombreEsc},
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#555555;line-height:1.7;padding-bottom:28px;">
                    Gracias por contactarnos. Recibimos tu mensaje y nuestro equipo lo revisar&aacute; a la brevedad. Nos pondremos en contacto con vos lo antes posible.
                  </td>
                </tr>

                <!-- Message copy -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8C8C8C;text-transform:uppercase;letter-spacing:1px;padding-bottom:10px;">
                          Tu mensaje
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#F7F7F7" style="background-color:#F7F7F7;padding:20px;border-left:3px solid #2D2D2D;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444444;line-height:1.7;">
                          ${mensajeEsc}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#555555;line-height:1.7;">
                    Si necesit&aacute;s agregar algo m&aacute;s, pod&eacute;s responder directamente a este correo.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#2D2D2D" style="background-color:#2D2D2D;padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <img src="${logoUrl}/assets/icons/logo-light.png" alt="Synapsis Health" width="120" height="73" style="display:block;border:0;width:120px;height:auto;max-width:120px;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999999;line-height:1.5;">
                    &copy; ${new Date().getFullYear()} Synapsis Health. Todos los derechos reservados.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Transporter SMTP reutilizable (se mantiene entre invocaciones warm)
const smtpPort = parseInt(process.env.SMTP_PORT || "465");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  pool: true,
  maxConnections: 2,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nombre, email, telefono, organizacion, mensaje } = req.body;

    // Validacion
    if (!nombre || !email || !telefono || !mensaje) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, email, celular, mensaje)." });
    }

    if (nombre.trim().length < 2) {
      return res.status(400).json({ error: "El nombre debe tener al menos 2 caracteres." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email invalido." });
    }

    if (telefono.trim().length < 8) {
      return res.status(400).json({ error: "El celular debe tener al menos 8 digitos." });
    }

    if (mensaje.trim().length < 10) {
      return res.status(400).json({ error: "El mensaje debe tener al menos 10 caracteres." });
    }

    // Rate limit por IP
    const clientIP = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
    const lastSubmission = submissions.get(clientIP);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return res.status(429).json({ error: "Por favor espera un momento antes de enviar otro mensaje." });
    }
    submissions.set(clientIP, Date.now());

    const logoUrl = (process.env.SITE_URL || "https://synapsishealth.vercel.app").replace(/\/$/, "");

    // Enviar ambos emails en paralelo
    await Promise.all([
      // 1. Email de notificacion a info@synapsishealth.com.ar
      transporter.sendMail({
        from: `"Synapsis Health Web" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO,
        replyTo: email,
        subject: `[Web] Nuevo mensaje de ${nombre}`,
        html: buildNotificationEmail(nombre, email, telefono, organizacion, mensaje, logoUrl),
      }),
      // 2. Email de confirmacion al usuario
      transporter.sendMail({
        from: `"Synapsis Health" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Recibimos tu mensaje \u2014 Synapsis Health",
        html: buildConfirmationEmail(nombre, mensaje, logoUrl),
        replyTo: process.env.CONTACT_TO,
      }),
    ]);

    console.log(`[CONTACT] Mensaje de ${nombre} (${email} / ${telefono})`);
    res.json({ success: true, message: "Mensaje enviado correctamente." });
  } catch (error) {
    console.error("[CONTACT] Error:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
