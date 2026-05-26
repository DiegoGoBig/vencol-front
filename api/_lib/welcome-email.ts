const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Bienvenido a VENCOL</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }

        @media screen and (max-width: 600px) {
            .container { width: 100% !important; max-width: 100% !important; }
            .padding-mobile { padding: 24px 20px !important; }
            .hero-title { font-size: 26px !important; line-height: 34px !important; }
            .section-title { font-size: 20px !important; line-height: 28px !important; }
            .body-text { font-size: 16px !important; line-height: 26px !important; }
            .cta-button { width: 100% !important; display: block !important; }
            .cta-button a { display: block !important; }
        }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: #f4f6f5; font-family: Arial, Helvetica, sans-serif;">

    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
        Más de 10 años haciendo visible la frescura de los alimentos en Colombia y Latinoamérica.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f5;">
        <tr>
            <td align="center" style="padding: 24px 12px;">

                <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">

                    <tr>
                        <td align="center" style="background-color: #1B5E20; padding: 24px 24px;">
                            <a href="https://www.vencol.com" target="_blank" style="text-decoration: none;">
                                <img src="https://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/03/Logo-Vencol-02.png" width="160" height="auto" alt="VENCOL" style="display: block; border: 0; max-width: 160px; height: auto;">
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 0;">
                            <img src="https://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/05/Frescura-que-se-ve.png" width="600" height="auto" alt="VENCOL — La frescura que se ve, se vende" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0;">
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 32px 40px 8px 40px;">
                            <h1 class="hero-title" style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 28px; line-height: 36px; color: #1B5E20; font-weight: 700;">
                                Bienvenido a VENCOL, {{NOMBRE}} 👋
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 8px 40px 24px 40px;">
                            <p class="section-title" style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 26px; color: #0D47A1; font-weight: 600;">
                                La frescura que se ve, se vende.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 0 40px 16px 40px;">
                            <p class="body-text" style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: #333333;">
                                Nos alegra que estés aquí.
                            </p>
                            <p class="body-text" style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: #333333;">
                                En VENCOL llevamos más de <strong>10 años</strong> haciendo una sola cosa muy bien: <strong style="color: #1B5E20;">convertir la frescura de los alimentos en una evidencia visible para el consumidor.</strong>
                            </p>
                            <p class="body-text" style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: #333333;">
                                Porque la frescura no basta si no se nota. Y si no se nota, no se vende.
                            </p>
                            <p class="body-text" style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: #333333;">
                                Trabajamos con plantas avícolas, cárnicas, piscícolas, lácteas y de frutas y hortalizas en Colombia y Latinoamérica. Representamos marcas líderes mundiales como <strong>Cryovac</strong> y <strong>Novipax</strong>, y acompañamos a nuestros clientes desde la calibración del empaque hasta la optimización de planta.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 8px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td style="border-top: 2px solid #E8F5E9; line-height: 0; font-size: 0;">&nbsp;</td></tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 16px 40px 8px 40px;">
                            <p class="section-title" style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 26px; color: #1B5E20; font-weight: 700;">
                                ¿Qué vas a encontrar en los próximos correos?
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 0 40px 8px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        <span style="display: inline-block; width: 24px; color: #1B5E20; font-weight: 700;">▸</span> Por qué el líquido en la bandeja es tu mayor enemigo (y cómo eliminarlo)
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        <span style="display: inline-block; width: 24px; color: #1B5E20; font-weight: 700;">▸</span> Las señales de que tu empaque actual te está costando dinero
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        <span style="display: inline-block; width: 24px; color: #1B5E20; font-weight: 700;">▸</span> Cómo eligen sus proveedores las grandes cadenas del país
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        <span style="display: inline-block; width: 24px; color: #1B5E20; font-weight: 700;">▸</span> Casos reales de mejora en planta con resultados medibles
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        <span style="display: inline-block; width: 24px; color: #1B5E20; font-weight: 700;">▸</span> Una oferta especial para quienes quieran dar el siguiente paso
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 24px 40px 8px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #E8F0FE; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px 24px; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #0D47A1;">
                                        <strong>Mientras tanto</strong>, te invitamos a conocer nuestras soluciones y descubrir cómo VENCOL puede transformar tu empaque hoy.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" align="center" style="padding: 24px 40px 16px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="cta-button">
                                <tr>
                                    <td align="center" style="background-color: #1B5E20; border-radius: 6px; mso-padding-alt: 0;">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.vencol.com/landing" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="12%" stroke="f" fillcolor="#1B5E20">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;">Ver soluciones en vencol.com</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-- -->
                                        <a href="https://www.vencol.com/landing" target="_blank" style="background-color: #1B5E20; border-radius: 6px; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; line-height: 52px; min-height: 52px; text-align: center; text-decoration: none; padding: 0 32px; -webkit-text-size-adjust: none; mso-hide: all;">Ver soluciones en vencol.com</a>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" align="center" style="padding: 0 40px 24px 40px;">
                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22px; color: #666666; text-align: center;">
                                ¿Prefieres explorar primero? <a href="https://www.vencol.com" target="_blank" style="color: #0D47A1; text-decoration: underline; font-weight: 600;">Visita nuestra página principal →</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td class="padding-mobile" style="padding: 8px 40px 24px 40px;">
                            <p class="body-text" style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: #333333;">
                                Estamos para servirte.
                            </p>
                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #1B5E20; font-weight: 700;">
                                Equipo VENCOL
                            </p>
                            <p style="margin: 4px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22px; color: #666666;">
                                <a href="mailto:info@vencol.com" style="color: #0D47A1; text-decoration: none;">info@vencol.com</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #1B5E20; padding: 24px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 12px;">
                                        <img src="https://cms.gobigagency.co/vencol/wp-content/uploads/sites/3/2026/03/Logo-Vencol-02.png" width="120" height="auto" alt="VENCOL" style="display: block; border: 0; max-width: 120px; height: auto;">
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 20px; color: #C8E6C9; padding-bottom: 8px;">
                                        Hacemos visible la frescura de los alimentos.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 20px; color: #C8E6C9; padding-bottom: 8px;">
                                        <a href="https://www.vencol.com" target="_blank" style="color: #ffffff; text-decoration: none;">www.vencol.com</a>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a href="mailto:info@vencol.com" style="color: #ffffff; text-decoration: none;">info@vencol.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 18px; color: #A5D6A7; padding-top: 12px; border-top: 1px solid #2E7D32;">
                                        Recibes este correo porque te suscribiste en vencol.com.<br>
                                        Si no deseas seguir recibiéndolos, <a href="mailto:info@vencol.com?subject=Baja%20de%20suscripci%C3%B3n" style="color: #ffffff; text-decoration: underline;">date de baja aquí</a>.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 18px; color: #A5D6A7; padding-top: 8px;">
                                        VENCOL S.A.S — Colombia
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildWelcomeEmail(firstName?: string): { subject: string; html: string; text: string } {
  const safeName = (firstName || '').trim();
  const nombre = safeName ? escapeHtml(safeName) : 'amigo';
  const html = WELCOME_EMAIL_TEMPLATE.replace(/\{\{NOMBRE\}\}/g, nombre);

  const subject = safeName
    ? `Bienvenido a VENCOL, ${safeName}`
    : 'Bienvenido a VENCOL';

  const text = [
    `Bienvenido a VENCOL${safeName ? `, ${safeName}` : ''}.`,
    '',
    'La frescura que se ve, se vende.',
    '',
    'En VENCOL llevamos más de 10 años convirtiendo la frescura de los alimentos en una evidencia visible para el consumidor.',
    'Trabajamos con plantas avícolas, cárnicas, piscícolas, lácteas y de frutas y hortalizas en Colombia y Latinoamérica.',
    'Representamos marcas líderes mundiales como Cryovac y Novipax.',
    '',
    'Conoce nuestras soluciones: https://www.vencol.com/landing',
    '',
    'Equipo VENCOL',
    'info@vencol.com',
  ].join('\n');

  return { subject, html, text };
}
