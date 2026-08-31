import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      tipoOrganizacion,
      nombreOrganizacion,
      nombreContacto,
      cargoContacto,
      email,
      telefono,
      tipoAlianza,
      descripcionPropuesta,
      paisRegion
    } = body;

    // Validar campos requeridos
    if (!nombreOrganizacion || !nombreContacto || !email || !tipoAlianza || !descripcionPropuesta) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      );
    }

    // Generar número de propuesta único
    const numeroPropuesta = `ALI-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Enviar email a informes
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'informes@unidx.edu.pe',
      subject: `Nueva Propuesta de Alianza - ${numeroPropuesta}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7c3aed; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">PROPUESTA DE ALIANZA</h1>
            <h2 style="margin: 10px 0 0 0;">${tipoAlianza}</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Propuesta: ${numeroPropuesta}</p>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
              <h3 style="color: #7c3aed; margin-top: 0;">Información de la Organización</h3>
              <p><strong>Tipo de Organización:</strong> ${tipoOrganizacion}</p>
              <p><strong>Nombre de la Organización:</strong> ${nombreOrganizacion}</p>
              ${paisRegion ? `<p><strong>País/Región:</strong> ${paisRegion}</p>` : ''}
            </div>
            
            <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
              <h3 style="color: #0288d1; margin-top: 0;">Datos de Contacto</h3>
              <p><strong>Nombre del Contacto:</strong> ${nombreContacto}</p>
              ${cargoContacto ? `<p><strong>Cargo:</strong> ${cargoContacto}</p>` : ''}
              <p><strong>Email:</strong> ${email}</p>
              ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
            </div>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h3 style="color: #059669; margin-top: 0;">Propuesta de Alianza</h3>
              <p><strong>Tipo de Alianza:</strong> ${tipoAlianza}</p>
              <p><strong>Descripción de la Propuesta:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${descripcionPropuesta}</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #f59e0b; font-size: 14px;">
                <strong>Fecha de propuesta:</strong> ${new Date().toLocaleString('es-PE', { 
                  timeZone: 'America/Lima',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style="margin: 5px 0 0 0; color: #92400e; font-size: 12px;">
                <strong>IMPORTANTE:</strong> Esta propuesta requiere evaluación por parte del Comité de Alianzas Estratégicas.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar la propuesta' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Confirmación de Propuesta - ${numeroPropuesta}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Propuesta Recibida</h1>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h2 style="color: #059669; margin-top: 0;">Estimado/a ${nombreContacto},</h2>
              <p>Agradecemos su interés en establecer una alianza estratégica con la Universidad UNIDX.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; text-align: center;">
                <p style="margin: 0; font-size: 18px;"><strong>Número de Propuesta:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 24px; color: #059669; font-weight: bold;">${numeroPropuesta}</p>
              </div>
              
              <p>Su propuesta de <strong>${tipoAlianza}</strong> ha sido registrada exitosamente.</p>
            </div>
            
            <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
              <h3 style="color: #0288d1; margin-top: 0;">Proceso de Evaluación</h3>
              <ul style="color: #01579b;">
                <li>Su propuesta será evaluada por nuestro Comité de Alianzas Estratégicas</li>
                <li>El proceso de evaluación puede tomar entre 15 a 30 días hábiles</li>
                <li>Un representante se pondrá en contacto para programar una reunión</li>
                <li>Recibirá actualizaciones en el correo: ${email}</li>
              </ul>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #f59e0b; margin-top: 0;">Información Adicional</h3>
              <p style="color: #92400e;">
                Si necesita enviar documentación adicional o tiene consultas sobre el proceso, 
                puede contactarnos directamente.
              </p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Acerca de nuestras Alianzas</h3>
              <p style="font-size: 14px; color: #475569;">
                En UNIDX valoramos las alianzas estratégicas que fortalecen la formación académica, 
                promueven la investigación y generan oportunidades de desarrollo mutuo. Trabajamos 
                con instituciones nacionales e internacionales comprometidas con la excelencia educativa.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                <strong>Oficina de Alianzas Estratégicas - UNIDX</strong><br>
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
      message: 'Propuesta enviada exitosamente',
      numeroPropuesta,
      id: data?.id 
    });

  } catch (error) {
    console.error('Error in alianzas API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
