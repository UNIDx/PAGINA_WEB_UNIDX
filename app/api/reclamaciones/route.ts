import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      tipoDocumento,
      numeroDocumento,
      nombres,
      apellidos,
      telefono,
      email,
      direccion,
      tipoReclamo,
      detalle,
      pedido,
      fechaIncidente
    } = body;

    // Validar campos requeridos
    if (!nombres || !apellidos || !email || !tipoReclamo || !detalle) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      );
    }

    // Generar número de reclamo único
    const numeroReclamo = `REC-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Enviar email a informes
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'informes@unidx.edu.pe',
      subject: `Nuevo Reclamo - ${numeroReclamo}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">LIBRO DE RECLAMACIONES</h1>
            <h2 style="margin: 10px 0 0 0;">Número: ${numeroReclamo}</h2>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #dc2626; margin-top: 0;">Datos del Reclamante</h3>
              <p><strong>Tipo de Documento:</strong> ${tipoDocumento}</p>
              <p><strong>Número de Documento:</strong> ${numeroDocumento}</p>
              <p><strong>Nombres:</strong> ${nombres}</p>
              <p><strong>Apellidos:</strong> ${apellidos}</p>
              <p><strong>Teléfono:</strong> ${telefono}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Dirección:</strong> ${direccion}</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #3b82f6; margin-top: 0;">Detalle del Reclamo</h3>
              <p><strong>Tipo de Reclamo:</strong> ${tipoReclamo}</p>
              ${fechaIncidente ? `<p><strong>Fecha del Incidente:</strong> ${fechaIncidente}</p>` : ''}
              <p><strong>Detalle:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${detalle}</p>
              <p><strong>Pedido del Consumidor:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${pedido}</p>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #0369a1; font-size: 14px;">
                <strong>Fecha de registro:</strong> ${new Date().toLocaleString('es-PE', { 
                  timeZone: 'America/Lima',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style="margin: 5px 0 0 0; color: #0369a1; font-size: 12px;">
                <strong>IMPORTANTE:</strong> Este reclamo debe ser atendido en un plazo máximo de 30 días calendario.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el reclamo' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Confirmación de Reclamo - ${numeroReclamo}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Reclamo Registrado Exitosamente</h1>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h2 style="color: #059669; margin-top: 0;">Estimado/a ${nombres} ${apellidos},</h2>
              <p>Su reclamo ha sido registrado exitosamente en nuestro Libro de Reclamaciones.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; text-align: center;">
                <p style="margin: 0; font-size: 18px;"><strong>Número de Reclamo:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 24px; color: #059669; font-weight: bold;">${numeroReclamo}</p>
              </div>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #f59e0b; margin-top: 0;">Proceso de Atención</h3>
              <ul style="color: #92400e;">
                <li>Su reclamo será evaluado por nuestro equipo especializado</li>
                <li>Recibirá una respuesta en un plazo máximo de <strong>30 días calendario</strong></li>
                <li>Puede hacer seguimiento con su número de reclamo</li>
                <li>Será contactado/a al correo: ${email}</li>
              </ul>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Información Legal</h3>
              <p style="font-size: 14px; color: #475569;">
                La formulación del reclamo no impide acudir a otras vías de solución de controversias 
                ni es requisito previo para interponer una denuncia ante el INDECOPI.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
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
      message: 'Reclamo enviado exitosamente',
      numeroReclamo,
      id: data?.id 
    });

  } catch (error) {
    console.error('Error in reclamaciones API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
