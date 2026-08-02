import { useEffect, useMemo, useState, type ReactNode } from 'react'
import './styles.css'

type Role = 'resident' | 'admin' | 'super'
type Route = { path: string; label: string; icon: string; group: string; roles: Role[] }

const routes: Route[] = [
  { path: '/resident', label: 'Dashboard', icon: 'home', group: 'Residente', roles: ['resident'] },
  { path: '/resident/account', label: 'Estado de cuenta', icon: 'account_balance_wallet', group: 'Residente', roles: ['resident'] },
  { path: '/resident/payments', label: 'Historial de pagos', icon: 'receipt_long', group: 'Residente', roles: ['resident'] },
  { path: '/resident/payment/new', label: 'Pago de mantenimiento', icon: 'payments', group: 'Residente', roles: ['resident'] },
  { path: '/resident/reservations', label: 'Reservar área', icon: 'event_available', group: 'Residente', roles: ['resident'] },
  { path: '/resident/announcements', label: 'Comunicados', icon: 'campaign', group: 'Comunidad', roles: ['resident'] },
  { path: '/resident/documents', label: 'Documentos', icon: 'folder_open', group: 'Comunidad', roles: ['resident'] },
  { path: '/admin', label: 'Dashboard admin', icon: 'space_dashboard', group: 'Administrador', roles: ['admin'] },
  { path: '/admin/payments', label: 'Gestión de pagos', icon: 'fact_check', group: 'Administrador', roles: ['admin'] },
  { path: '/admin/reservations', label: 'Gestión de reservas', icon: 'event_note', group: 'Administrador', roles: ['admin'] },
  { path: '/admin/announcements', label: 'Gestión comunicados', icon: 'edit_notifications', group: 'Administrador', roles: ['admin'] },
  { path: '/admin/documents', label: 'Gestión documentos', icon: 'drive_folder_upload', group: 'Administrador', roles: ['admin'] },
  { path: '/admin/water', label: 'Consumo de agua', icon: 'water_drop', group: 'Administrador', roles: ['admin'] },
  { path: '/super-admin', label: 'Dashboard superadmin', icon: 'admin_panel_settings', group: 'Superadmin', roles: ['super'] },
  { path: '/super-admin/buildings', label: 'Gestión de edificios', icon: 'domain', group: 'Superadmin', roles: ['super'] },
]

const money = ['Mantenimiento julio', 'Cuota extraordinaria', 'Fondo de reserva']
const payments = ['Transferencia validada', 'Yape pendiente', 'Pago observado']
const docs = ['Reglamento interno.pdf', 'Acta de asamblea.pdf', 'Manual de convivencia.pdf']
const announcements = ['Mantenimiento de ascensores', 'Asamblea general anual', 'Corte temporal de agua']

function getPath() { return window.location.hash.replace(/^#/, '') || '/splash' }
function useHashRoute() { const [path, setPath] = useState(getPath); useEffect(() => { const on = () => setPath(getPath()); addEventListener('hashchange', on); return () => removeEventListener('hashchange', on) }, []); return path }

export default function App() {
  const path = useHashRoute()
  if (path === '/splash') return <Splash />
  if (path === '/login') return <Login />
  return <Shell path={path}><Page path={path} /></Shell>
}

function Shell({ children, path }: { children: ReactNode; path: string }) {
  const role: Role = path.startsWith('/admin') ? 'admin' : path.startsWith('/super') ? 'super' : 'resident'
  const visible = routes.filter(r => r.roles.includes(role) || (role === 'admin' && r.roles.includes('resident')))
  const groups = [...new Set(visible.map(r => r.group))]
  const active = routes.find(r => r.path === path) ?? routes[0]
  return <div className="app-shell">
    <aside className="sidebar">
      <Brand />
      <BuildingCard />
      <nav className="side-nav">{groups.map(g => <div key={g}><p className="nav-heading">{g}</p>{visible.filter(r => r.group === g).map(r => <NavLink key={r.path} route={r} path={path} />)}</div>)}</nav>
      <UserCard />
    </aside>
    <main className="main">
      <header className="topbar"><Brand compact /><div className="breadcrumb"><span>Residencial Aurora</span><span>/</span><b>{active.label}</b></div><div className="top-actions"><button className="icon-btn material-symbols-outlined">notifications</button><div className="avatar">JP</div></div></header>
      <section className="content">{children}</section>
    </main>
    <nav className="bottom-nav">{visible.slice(0,5).map(r => <NavLink key={r.path} route={r} path={path} mobile />)}</nav>
  </div>
}

function Brand({ compact=false }: { compact?: boolean }) { return <a href="#/resident" className={`brand ${compact ? 'compact' : ''}`}><span className="logo-mark">E</span><span><b>EDIFLEX</b>{!compact && <small>Smart Management Suite</small>}</span></a> }
function BuildingCard() { return <div className="building-card"><span className="material-symbols-outlined">domain</span><div><b>Residencial Aurora</b><small>Torre Norte · Depto 402</small></div></div> }
function UserCard() { return <div className="user-card"><div className="avatar">JP</div><div><b>Juan Pérez</b><small>Residente</small></div><a href="#/login" className="material-symbols-outlined">logout</a></div> }
function NavLink({ route, path, mobile=false }: { route: Route; path: string; mobile?: boolean }) { return <a href={`#${route.path}`} className={`nav-link ${path === route.path ? 'active' : ''} ${mobile ? 'mobile' : ''}`}><span className="material-symbols-outlined">{route.icon}</span><em>{route.label}</em></a> }

function Page({ path }: { path: string }) {
  const page = useMemo(() => ({
    '/resident': <ResidentDashboard />, '/resident/account': <Account />, '/resident/payments': <ListPage title="Historial de pagos" eyebrow="Finanzas" icon="receipt_long" items={payments} action="Descargar comprobante" />, '/resident/payment/new': <PaymentNew />, '/resident/reservations': <Reservations />, '/resident/announcements': <ListPage title="Comunicados" eyebrow="Comunidad" icon="campaign" items={announcements} action="Leer más" />, '/resident/documents': <ListPage title="Documentos y Reglamento" eyebrow="Biblioteca" icon="folder_open" items={docs} action="Ver documento" />, '/admin': <AdminDashboard />, '/admin/payments': <Management title="Gestión de pagos" metric="8 pagos por validar" icon="fact_check" />, '/admin/reservations': <Management title="Gestión de reservas" metric="3 solicitudes pendientes" icon="event_note" />, '/admin/announcements': <Management title="Gestión de comunicados" metric="12 publicados" icon="edit_notifications" />, '/admin/documents': <Management title="Gestión de documentos" metric="24 archivos activos" icon="drive_folder_upload" />, '/admin/water': <Water />, '/super-admin': <SuperDashboard />, '/super-admin/buildings': <Buildings />,
  }[path]), [path])
  return page ?? <ListPage title="Pantalla no encontrada" eyebrow="404" icon="error" items={['Ruta no disponible']} action="Volver" />
}

function Splash() { return <main className="auth splash"><div className="orb" /><Brand /><h1>Gestión residencial moderna para comunidades conectadas.</h1><p>Pagos, reservas, comunicados y documentos con una experiencia SaaS mobile first.</p><a className="btn primary" href="#/login">Comenzar</a></main> }
function Login() { return <main className="auth"><Brand /><section className="auth-card"><h1>Inicia sesión</h1><p>Bienvenido a Ediflex Building Management</p><label>Correo electrónico<input placeholder="ejemplo@correo.com" /></label><label>Contraseña<input placeholder="••••••••" type="password" /></label><a className="btn primary" href="#/resident">Ingresar</a><button className="btn soft">Solicitar acceso a mi edificio</button></section></main> }
function Heading({ eyebrow, title, cta }: { eyebrow: string; title: string; cta?: string }) { return <div className="heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div>{cta && <button className="btn primary">{cta}</button>}</div> }
function KPI({ label, value, icon, tone='blue' }: { label: string; value: string; icon: string; tone?: string }) { return <article className={`kpi ${tone}`}><span className="material-symbols-outlined">{icon}</span><small>{label}</small><b>{value}</b></article> }
function ResidentDashboard() { return <><Heading eyebrow="Hola, Juan Pérez" title="Dashboard del Residente" cta="Pagar ahora" /><section className="hero"><div><small>Saldo pendiente</small><b>$150.00</b><span>Octubre publicada · vence en 6 días</span></div><a href="#/resident/payment/new" className="btn light">Pagar mantenimiento</a></section><div className="grid kpis"><KPI label="Próxima reserva" value="Gimnasio 18:00" icon="event_available"/><KPI label="Comunicados nuevos" value="3" icon="campaign" tone="green"/><KPI label="Consumo de agua" value="12.4 m³" icon="water_drop" tone="purple"/></div><DashboardLists /></> }
function AdminDashboard() { return <><Heading eyebrow="Operación" title="Dashboard del Administrador" cta="Registrar gasto" /><div className="grid kpis"><KPI label="Pagos por validar" value="8" icon="fact_check"/><KPI label="Reservas pendientes" value="3" icon="event_note" tone="green"/><KPI label="Lecturas completadas" value="24/32" icon="water_drop" tone="purple"/></div><DashboardLists admin /></> }
function SuperDashboard() { return <><Heading eyebrow="Plataforma" title="Dashboard del Superadministrador" cta="Nuevo edificio" /><div className="grid kpis"><KPI label="Edificios activos" value="18" icon="domain"/><KPI label="Unidades" value="642" icon="apartment" tone="green"/><KPI label="Administradores" value="26" icon="group" tone="purple"/></div><Buildings /></> }
function DashboardLists({admin=false}:{admin?:boolean}) { return <div className="two-col"><ListPage embedded title={admin?'Tareas pendientes':'Actividad reciente'} eyebrow="" icon="task_alt" items={admin?['Validar comprobantes','Aprobar reserva de terraza','Completar lecturas de agua']:['Liquidación publicada','Reserva confirmada','Nuevo comunicado']} action="Revisar"/><section className="panel"><h2>Comunicado destacado</h2><p>Mantenimiento de elevadores programado para el lunes. La estructura visual queda lista para conectar datos reales.</p><a className="text-link" href="#/resident/announcements">Ver comunicados →</a></section></div> }
function Account() { return <><Heading eyebrow="Finanzas" title="Estado de Cuenta" cta="Descargar PDF"/><section className="hero compact-hero"><div><small>Total a pagar</small><b>$150.00</b><span>Mantenimiento, agua y fondo de reserva</span></div></section><ListPage embedded title="Detalle de cargos" eyebrow="" icon="request_quote" items={money} action="Ver detalle" /></> }
function PaymentNew() { return <><Heading eyebrow="Finanzas" title="Pago de Mantenimiento"/><section className="panel form"><h2>Registrar comprobante</h2><label>Monto<input placeholder="$150.00"/></label><label>Fecha<input placeholder="02/08/2026"/></label><label>Comprobante<div className="dropzone">Subir archivo</div></label><button className="btn primary">Enviar para validación</button></section></> }
function Reservations() { return <><Heading eyebrow="Comunidad" title="Reserva de Áreas Comunes" cta="Nueva reserva"/><div className="grid cards">{['Gimnasio','Terraza','Salón social'].map(x=><article className="panel area" key={x}><span className="material-symbols-outlined">event_available</span><h2>{x}</h2><p>Disponible esta semana</p><button className="btn soft">Reservar</button></article>)}</div></> }
function Management(p:{title:string;metric:string;icon:string}) { return <><Heading eyebrow="Administración" title={p.title} cta="Crear"/><div className="grid kpis"><KPI label="Resumen" value={p.metric} icon={p.icon}/><KPI label="Este mes" value="94%" icon="monitoring" tone="green"/></div><ListPage embedded title="Bandeja de gestión" eyebrow="" icon={p.icon} items={['Solicitud #1048','Solicitud #1049','Solicitud #1050']} action="Gestionar"/></> }
function Water() { return <><Heading eyebrow="Operación" title="Registro de Consumo de Agua" cta="Guardar lecturas"/><section className="panel table"><h2>Lecturas del mes</h2>{['Depto 401','Depto 402','Depto 403'].map((x,i)=><div className="row" key={x}><span>{x}</span><b>{12+i}.4 m³</b><button className="btn soft">Editar</button></div>)}</section></> }
function Buildings() { return <><Heading eyebrow="Superadmin" title="Gestión de Edificios" cta="Agregar edificio"/><div className="grid cards">{['Residencial Aurora','Vista Mar','Parque Central'].map(x=><article className="panel area" key={x}><span className="material-symbols-outlined">domain</span><h2>{x}</h2><p>Administrador asignado · plan activo</p><button className="btn soft">Administrar</button></article>)}</div></> }
function ListPage({ title, eyebrow, icon, items, action, embedded=false }: { title:string; eyebrow:string; icon:string; items:string[]; action:string; embedded?:boolean }) { return <>{!embedded && <Heading eyebrow={eyebrow} title={title}/>}<section className="panel list"><h2>{title}</h2>{items.map((item,i)=><div className="row" key={item}><span className="material-symbols-outlined">{icon}</span><div><b>{item}</b><small>{i+1} de agosto · Residencial Aurora</small></div><a className="text-link">{action}</a></div>)}</section></> }
