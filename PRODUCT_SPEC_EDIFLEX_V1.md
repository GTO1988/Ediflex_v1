# EDIFLEX — Product Specification V1

## Objetivo de producto

EDIFLEX es una plataforma de gestión condominal responsive, diseñada mobile-first para residentes, administradores y Super Admins. El frontend se construirá con React, Vite y TypeScript; Momen proveerá posteriormente autenticación, PostgreSQL, permisos, action flows y GraphQL.

El objetivo es centralizar la comunicación, la liquidación automática de gastos comunes, consulta de cuentas, pagos registrados, reservas, documentos y lecturas de agua por edificio, con una experiencia clara en móvil, tableta y web.

## Arquitectura de información

- **Público:** Splash → Login.
- **Residente:** Inicio, Pagos, Reservas, Anuncios, Documentos y Perfil.
- **Administrador:** Inicio, Pagos, Reservas, Comunicaciones, Documentos, Lecturas de agua y Gestión del edificio.
- **Super Admin:** Inicio, Edificios, Administradores y Configuración de plataforma.
- En escritorio se usará una barra lateral persistente; en móvil, navegación inferior con las acciones prioritarias y un menú adicional.
- El cambio de edificio y apartamento estará disponible cuando el usuario tenga acceso a más de uno.

## Viaje del residente

1. Abre EDIFLEX, visualiza Splash e inicia sesión.
2. Selecciona el edificio y apartamento activo, si corresponde.
3. Consulta su dashboard: saldo pendiente, próximo vencimiento, reservas próximas, anuncios y consumo de agua.
4. Revisa su estado de cuenta, incluida la liquidación mensual calculada según el porcentaje de participación de su propiedad, y el historial de pagos.
5. Registra un pago de mantenimiento y adjunta un comprobante.
6. Reserva un área común o consulta el estado de una solicitud pendiente.
7. Lee anuncios y descarga documentos/reglamentos.
8. Consulta sus lecturas y consumo de agua por periodo.

## Viaje del administrador

1. Inicia sesión y selecciona uno de los edificios asignados.
2. Consulta métricas operativas: pagos pendientes, comprobantes por validar, reservas pendientes, anuncios y lecturas por registrar.
3. Registra los gastos del mes, revisa la liquidación automática por apartamento y la publica. EDIFLEX distribuye el total según el porcentaje de participación de cada propiedad; después valida o rechaza comprobantes de pago.
4. Configura áreas comunes y gestiona reservas inmediatas o sujetas a aprobación.
5. Publica anuncios y documentos para residentes.
6. Registra lecturas de medidores de agua por apartamento y consulta su historial.
7. Gestiona apartamentos, residentes, administradores asignados y configuraciones del edificio.

## Viaje del Super Admin

1. Inicia sesión y consulta el resumen global de administradoras y edificios.
2. Crea, edita, activa o suspende edificios y asigna administradores.
3. Consulta métricas consolidadas de pagos, reservas, residentes y actividad.
4. Configura parámetros globales de la plataforma.
5. Accede a información operativa para soporte en modo de solo lectura, sin alterar registros del edificio.

## Lista de pantallas

| Pantalla | Rol | Propósito principal |
|---|---|---|
| Splash | Todos | Carga inicial, marca y restauración de sesión. |
| Login | Todos | Acceso, recuperación de contraseña y cuentas demo durante la fase frontend. |
| Resident Dashboard | Residente | Resumen de saldo, pagos, reservas, anuncios y agua. |
| Account Statement | Residente | Liquidación mensual, gastos publicados, porcentaje de participación, pagos aplicados, saldo y detalle por periodo. |
| Payment History | Residente | Historial y estado de pagos/comprobantes enviados. |
| Maintenance Payment | Residente | Registro de pago y carga simulada de comprobante. |
| Common Area Reservations | Residente / Administrador | Calendario, disponibilidad, creación y seguimiento de reservas. |
| Announcements | Residente / Administrador | Consulta de comunicados y detalle de anuncios. |
| Documents & Regulations | Residente / Administrador | Biblioteca de documentos, reglamentos y descargas. |
| Administrator Dashboard | Administrador | Indicadores operativos y accesos rápidos por edificio. |
| Payment Management | Administrador | Registro de gastos mensuales, revisión/publicación de liquidaciones automáticas, filtros y validación de comprobantes. |
| Reservation Management | Administrador | Configuración de áreas, aprobación/rechazo y agenda de reservas. |
| Announcement Management | Administrador | Creación, edición, programación y publicación de anuncios. |
| Document Management | Administrador | Carga, categorización, publicación y archivo de documentos. |
| Water Meter Readings | Administrador | Registro de lecturas, historial y cálculo de consumo. |
| Super Admin Dashboard | Super Admin | Métricas globales, estado de edificios y actividad de plataforma. |
| Building Management | Administrador / Super Admin | Gestión de edificios, apartamentos, residentes, medidores, áreas y asignaciones. |

## Entidades principales

- **Building:** identificador, nombre, dirección, estado, administradores asignados, áreas comunes y apartamentos.
- **Apartment:** edificio, código/número, residentes asociados, propietario, porcentaje de participación, saldo actual y medidor de agua.
- **User:** perfil, datos personales, rol, edificios y apartamentos autorizados.
- **Monthly Expense:** edificio, periodo, concepto, importe, fecha de registro y estado.
- **Monthly Settlement:** edificio, periodo, total de gastos, estado de borrador/publicado y detalle de importes por apartamento.
- **Payment:** apartamento, liquidación asociada, monto, fecha, concepto, estado y movimientos relacionados.
- **Receipt:** pago asociado, archivo, fecha de carga, estado de validación y comentario administrativo.
- **Common Area:** edificio, nombre, capacidad, horarios, reglas y modalidad de reserva inmediata o aprobación.
- **Reservation:** área, apartamento/residente, fecha y hora, estado, motivo de rechazo y trazabilidad.
- **Announcement:** edificio, título, contenido, prioridad, fecha de publicación y adjuntos.
- **Document:** edificio, categoría, título, descripción, archivo, visibilidad y fecha de publicación.
- **Water Meter Reading:** apartamento, periodo, lectura anterior, lectura actual, consumo calculado, fecha y administrador registrante.

Para cada liquidación, EDIFLEX calculará el importe de un apartamento como `total de gastos mensuales × porcentaje de participación`. Solo se podrá publicar una liquidación si los porcentajes de participación de los apartamentos activos del edificio suman 100 %. El frontend definirá estas entidades y sus contratos TypeScript. Más adelante, los adaptadores de datos se reemplazarán por consultas, mutaciones y action flows GraphQL de Momen sin cambiar las pantallas ni los componentes de dominio.

## Permisos esperados

| Capacidad | Residente | Administrador | Super Admin |
|---|---:|---:|---:|
| Consultar datos de su apartamento y edificio | Sí | Sí | Solo lectura para soporte |
| Registrar comprobante de pago | Sí | No | No |
| Registrar gastos, generar liquidaciones y validar pagos | No | Sí, en edificios asignados | No |
| Crear o aprobar reservas | Solicitar | Sí, en edificios asignados | No |
| Publicar anuncios y documentos | No | Sí, en edificios asignados | No |
| Registrar lecturas de agua | No | Sí, en edificios asignados | No |
| Gestionar residentes y apartamentos | No | Sí, en edificios asignados | Sí, entre edificios |
| Gestionar edificios y administradores | No | Solo asignaciones permitidas | Sí |
| Configurar plataforma | No | No | Sí |

## Componentes y experiencia responsive

- Componentes reutilizables: `AppShell`, navegación, selector de contexto, tarjetas KPI, tablas responsivas, filtros, formularios, calendario, carga de archivos, modales de confirmación, badges de estado, listas vacías y centro de notificaciones.
- En móvil, las tablas se transformarán en tarjetas; las acciones principales se mantendrán visibles; los formularios usarán una columna y los filtros se abrirán en paneles compactos.
- Todas las pantallas incluirán carga, vacío, error, éxito, validación de formularios y confirmación de acciones sensibles.
- La interfaz mantendrá tokens CSS propios para color, tipografía, espaciado, radios, sombras, estados y breakpoints; no dependerá de plugins ni de una biblioteca UI externa.

## Límites de V1

No incluye IA, chat, QR, control de accesos, banca, pasarela de pago, visitantes, paquetes, facturación fiscal, email, WhatsApp ni notificaciones push reales. Sí incluye el registro de gastos comunes y su distribución automática por porcentaje de participación. La fase actual no conectará a Momen ni a ningún backend; se usará información semilla editable durante la sesión.
