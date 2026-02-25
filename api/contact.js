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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nombre, email, organizacion, mensaje } = req.body;

    // Validacion
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, email, mensaje)." });
    }

    if (nombre.trim().length < 2) {
      return res.status(400).json({ error: "El nombre debe tener al menos 2 caracteres." });
    }

    if (mensaje.trim().length < 10) {
      return res.status(400).json({ error: "El mensaje debe tener al menos 10 caracteres." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email invalido." });
    }

    // Rate limit por IP
    const clientIP = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
    const lastSubmission = submissions.get(clientIP);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return res.status(429).json({ error: "Por favor espera un momento antes de enviar otro mensaje." });
    }
    submissions.set(clientIP, Date.now());

    // Crear transporter SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const nombreEscapado = escapeHtml(nombre);
    const emailEscapado = escapeHtml(email);
    const orgEscapada = organizacion ? escapeHtml(organizacion) : "";
    const mensajeEscapado = escapeHtml(mensaje).replace(/\n/g, "<br>");

    // 1. Email de notificacion a info@synapsishealth.com.ar
    await transporter.sendMail({
      from: `"Synapsis Health Web" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `[Web] Nuevo mensaje de ${nombre}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2D2D2D; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #FFFFFF; margin: 0; font-weight: 300; letter-spacing: 2px;">
              SYNAPSIS HEALTH
            </h2>
          </div>
          <div style="background: #FFFFFF; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3 style="color: #2D2D2D; font-weight: 400; margin-top: 0;">Nuevo mensaje desde el sitio web</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #7A7A7A; font-size: 14px; width: 120px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">Nombre</td>
                <td style="padding: 12px 0; color: #2D2D2D; font-size: 14px; border-bottom: 1px solid #F0F0F0;">${nombreEscapado}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #7A7A7A; font-size: 14px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">Email</td>
                <td style="padding: 12px 0; color: #2D2D2D; font-size: 14px; border-bottom: 1px solid #F0F0F0;">
                  <a href="mailto:${emailEscapado}" style="color: #2D2D2D; text-decoration: underline;">${emailEscapado}</a>
                </td>
              </tr>
              ${orgEscapada ? `
              <tr>
                <td style="padding: 12px 0; color: #7A7A7A; font-size: 14px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">Organizaci&oacute;n</td>
                <td style="padding: 12px 0; color: #2D2D2D; font-size: 14px; border-bottom: 1px solid #F0F0F0;">${orgEscapada}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 12px 0; color: #7A7A7A; font-size: 14px; vertical-align: top;">Mensaje</td>
                <td style="padding: 12px 0; color: #2D2D2D; font-size: 14px; line-height: 1.6;">${mensajeEscapado}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E0E0E0;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Pod&eacute;s responder directamente a este email para contactar a ${nombreEscapado}.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // 2. Email de confirmacion al usuario
    await transporter.sendMail({
      from: `"Synapsis Health" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Recibimos tu mensaje \u2014 Synapsis Health",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2D2D2D; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #FFFFFF; margin: 0; font-weight: 300; letter-spacing: 2px;">
              SYNAPSIS HEALTH
            </h2>
          </div>
          <div style="background: #FFFFFF; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3 style="color: #2D2D2D; font-weight: 400; margin-top: 0;">
              Hola ${nombreEscapado}, recibimos tu mensaje
            </h3>
            <p style="color: #555; font-size: 15px; line-height: 1.7;">
              Gracias por contactarnos. Nuestro equipo revisar&aacute; tu consulta y te responder&aacute; a la brevedad.
            </p>
            <div style="background: #F8F8F8; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="color: #7A7A7A; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Tu mensaje:</p>
              <p style="color: #2D2D2D; font-size: 14px; line-height: 1.6; margin: 0;">${mensajeEscapado}</p>
            </div>
            <p style="color: #555; font-size: 15px; line-height: 1.7;">
              Si necesit&aacute;s agregar algo, pod&eacute;s responder directamente a este correo.
            </p>
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E0E0E0;">
              <p style="color: #999; font-size: 12px; margin: 0;">Synapsis Health</p>
            </div>
          </div>
        </div>
      `,
      replyTo: process.env.CONTACT_TO,
    });

    console.log(`[CONTACT] Mensaje de ${nombre} (${email})`);
    res.json({ success: true, message: "Mensaje enviado correctamente." });
  } catch (error) {
    console.error("[CONTACT] Error:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
