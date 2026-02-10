/**
 * Synapsis Health — Backend
 * Endpoint: POST /api/contact
 * Envía email via SMTP con los datos del formulario.
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting simple (en producción usar express-rate-limit)
const submissions = new Map();
const RATE_LIMIT_MS = 60_000; // 1 por minuto por IP

// ============================================
// CONFIGURAR: Variables de entorno en .env
// ============================================
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=tu-email@gmail.com
// SMTP_PASS=tu-app-password
// CONTACT_TO=contacto@synapsishealth.com

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  try {
    const { nombre, email, organizacion, mensaje } = req.body;

    // Validación
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, email, mensaje)." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    // Rate limit
    const clientIP = req.ip || req.connection.remoteAddress;
    const lastSubmission = submissions.get(clientIP);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return res.status(429).json({ error: "Por favor esperá un momento antes de enviar otro mensaje." });
    }
    submissions.set(clientIP, Date.now());

    // Construir email
    const mailOptions = {
      from: `"Synapsis Health Web" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || "contacto@synapsishealth.com",
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
                <td style="padding: 8px 0; color: #7A7A7A; font-size: 14px; width: 120px; vertical-align: top;">Nombre</td>
                <td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">${escapeHtml(nombre)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7A7A7A; font-size: 14px; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #2D2D2D;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${organizacion ? `
              <tr>
                <td style="padding: 8px 0; color: #7A7A7A; font-size: 14px; vertical-align: top;">Organización</td>
                <td style="padding: 8px 0; color: #2D2D2D; font-size: 14px;">${escapeHtml(organizacion)}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #7A7A7A; font-size: 14px; vertical-align: top;">Mensaje</td>
                <td style="padding: 8px 0; color: #2D2D2D; font-size: 14px; line-height: 1.6;">
                  ${escapeHtml(mensaje).replace(/\n/g, "<br>")}
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`[CONTACT] Mensaje de ${nombre} (${email})`);
    res.json({ success: true, message: "Mensaje enviado correctamente." });

  } catch (error) {
    console.error("[CONTACT] Error:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helpers
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Start
app.listen(PORT, () => {
  console.log(`[Synapsis Health API] Running on port ${PORT}`);
});
