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
      carrera,
      informacionInteres,
      fechaPreferida,
      horarioPreferido,
      acompanantes
    } = body;

    // Validar campos requeridos
    if (!nombre || !email || !carrera) {
      return NextResponse.json(
        { error: 'Nombre, email y carrera son requeridos' },
        { status: 400 }
      );
    }

    // Generar número de solicitud único
    const numeroSolicitud = `CAR-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Determinar el color según la carrera
    const carreraInfo = {
      'enfermeria': {
        nombre: 'Licenciatura en Enfermería',
        color: '#3b82f6'
      },
      'farmacia-bioquimica': {
        nombre: 'Químico Farmacéutico Biólogo',
        color: '#059669'
      }
    };

    const info = carreraInfo[carrera as keyof typeof carreraInfo] || {
      nombre: carrera,
      color: '#6366f1'
    };

    // Enviar email solo a informes
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'informes@unidx.edu.pe',
      subject: `Nueva Solicitud de Información - ${info.nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${info.color}; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">SOLICITUD DE INFORMACIÓN</h1>
            <h2 style="margin: 10px 0 0 0;">${info.nombre}</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Solicitud: ${numeroSolicitud}</p>
          </div>
          <div style="padding: 20px;">
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${info.color};">
              <h3 style="color: ${info.color}; margin-top: 0;">Datos del Interesado</h3>
              <p><strong>Nombre:</strong> ${nombre}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
              <p><strong>Carrera de Interés:</strong> ${info.nombre}</p>
              ${informacionInteres ? `<p><strong>Información de Interés:</strong> ${informacionInteres}</p>` : ''}
            </div>
            ${fechaPreferida || horarioPreferido || acompanantes ? `
              <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <h3 style="color: #f59e0b; margin-top: 0;">Información Adicional</h3>
                ${fechaPreferida ? `<p><strong>Fecha Preferida para Visita:</strong> ${fechaPreferida}</p>` : ''}
                ${horarioPreferido ? `<p><strong>Horario Preferido:</strong> ${horarioPreferido}</p>` : ''}
                ${acompanantes ? `<p><strong>Número de Acompañantes:</strong> ${acompanantes}</p>` : ''}
              </div>
            ` : ''}
            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #0369a1; font-size: 14px;">
                <strong>Fecha de solicitud:</strong> ${new Date().toLocaleString('es-PE', { 
                  timeZone: 'America/Lima',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style="margin: 5px 0 0 0; color: #0369a1; font-size: 12px;">
                <strong>COORDINACIÓN:</strong> Esta solicitud debe ser atendida por la coordinación de ${info.nombre}.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar la solicitud' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Confirmación - Información sobre ${info.nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">¡Gracias por tu Interés!</h1>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h2 style="color: #059669; margin-top: 0;">Estimado/a ${nombre},</h2>
              <p>Hemos recibido tu solicitud de información sobre <strong>${info.nombre}</strong>.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; text-align: center;">
                <p style="margin: 0; font-size: 18px;"><strong>Número de Solicitud:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 24px; color: #059669; font-weight: bold;">${numeroSolicitud}</p>
              </div>
            </div>
            
            <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
              <h3 style="color: #0288d1; margin-top: 0;">Próximos Pasos</h3>
              <ul style="color: #01579b;">
                <li>Un coordinador académico se pondrá en contacto contigo en las próximas 24 horas</li>
                <li>Recibirás información detallada sobre el plan de estudios</li>
                <li>Te contactaremos al teléfono: ${telefono || 'número proporcionado'}</li>
                <li>También recibirás información por email: ${email}</li>
                ${fechaPreferida ? '<li>Se coordinará la visita para la fecha solicitada</li>' : ''}
              </ul>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #f59e0b; margin-top: 0;">Mientras Tanto</h3>
              <p style="color: #92400e;">Puedes:</p>
              <ul style="color: #92400e;">
                <li>Visitar nuestro campus virtualmente</li>
                <li>Descargar nuestro brochure informativo</li>
                <li>Seguirnos en redes sociales</li>
                <li>Explorar nuestros laboratorios y facilidades online</li>
              </ul>
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
      message: 'Solicitud enviada exitosamente',
      numeroSolicitud,
      carrera: info.nombre,
      id: data?.id 
    });

  } catch (error) {
    console.error('Error in carreras API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
