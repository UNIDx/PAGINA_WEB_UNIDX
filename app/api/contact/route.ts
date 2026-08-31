import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      nombre, 
      email, 
      telefono, 
      programa, 
      mensaje 
    } = body;

    // Validar campos requeridos
    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Enviar email a informes
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'informes@unidx.edu.pe',
      subject: `Nueva solicitud de información - ${programa || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Nueva Solicitud de Información</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Datos del Interesado:</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
            ${programa ? `<p><strong>Programa de Interés:</strong> ${programa}</p>` : ''}
          </div>
          ${mensaje ? `
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Mensaje:</h3>
              <p style="white-space: pre-wrap;">${mensaje}</p>
            </div>
          ` : ''}
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Fecha de solicitud:</strong> ${new Date().toLocaleString('es-PE', { 
                timeZone: 'America/Lima',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirmación de Solicitud - UNIDX',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #1e40af; margin-bottom: 20px;">¡Gracias por tu interés!</h1>
            
            <div style="background-color: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0;">
              <h2 style="color: #334155; margin-top: 0;">Hola ${nombre},</h2>
              <p style="color: #64748b; line-height: 1.6;">
                Hemos recibido tu solicitud de información sobre nuestros programas académicos. 
                Nuestro equipo de admisiones se pondrá en contacto contigo en las próximas 24 horas.
              </p>
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Mientras tanto, puedes:</h3>
              <ul style="text-align: left; color: #334155;">
                <li>Explorar nuestras carreras en nuestro sitio web</li>
                <li>Seguirnos en redes sociales</li>
                <li>Programar una visita virtual al campus</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                <strong>Universidad UNIDX</strong><br>
                Av. Bolivia 626, Lima 15082<br>
                Teléfono: +51 945 987 048<br>
                Email: informes@unidx.edu.pe
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      message: 'Mensaje enviado exitosamente',
      id: data?.id 
    });

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
