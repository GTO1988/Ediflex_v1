import { useEffect, useState, type ReactNode } from 'react'

type Route = {
  path: string
  label: string
  icon: string
  group: 'Principal' | 'Gestión'
}

const routes: Route[] = [
  { path: '/resident', label: 'Inicio', icon: '⌂', group: 'Principal' },
  { path: '/resident/account', label: 'Estado de cuenta', icon: '$', group: 'Principal' },
  { path: '/resident/payments', label: 'Historial de pagos', icon: '↗', group: 'Principal' },
  { path: '/resident/payment/new', label: 'Registrar pago', icon: '+', group: 'Principal' },
  { path: '/resident/reservations', label: 'Reservas', icon: '◷', group: 'Principal' },
  { path: '/resident/announcements', label: 'Comunicados', icon: '✦', group: 'Principal' },
  { path: '/resident/documents', label: 'Documentos', icon: '▤', group: 'Principal' },
  { path: '/admin', label: 'Panel administrador', icon: '▦', group: 'Gestión' },
  { path: '/admin/payments', label: 'Pagos', icon: '$', group: 'Gestión' },
  { path: '/admin/reservations', label: 'Gestionar reservas', icon: '◷', group: 'Gestión' },
  { path: '/admin/announcements', label: 'Gestionar comunicados', icon: '✦', group: 'Gestión' },
  { path: '/admin/documents', label: 'Gestionar documentos', icon: '▤', group: 'Gestión' },
  { path: '/admin/water', label: 'Lecturas de agua', icon: '♧', group: 'Gestión' },
  { path: '/admin/buildings', label: 'Edificios', icon: '⌂', group: 'Gestión' },
  { path: '/super-admin', label: 'Super Admin', icon: '◈', group: 'Gestión' },
]

const screenNames: Record<string, { eyebrow: string; title: string; description: string }> = {
  '/resident/account': { eyebrow: 'Finanzas', title: 'Estado de cuenta', description: 'Consulta tu liquidación mensual y movimientos.' },
  '/resident/payments': { eyebrow: 'Finanzas', title: 'Historial de pagos', description: 'Revisa los pagos y comprobantes asociados a tu departamento.' },
  '/resident/payment/new': { eyebrow: 'Finanzas', title: 'Registrar pago', description: 'Envía el comprobante de tu pago de mantenimiento.' },
  '/resident/reservations': { eyebrow: 'Comunidad', title: 'Reservas', description: 'Encuentra un área común disponible para tu próxima actividad.' },
  '/resident/announcements': { eyebrow: 'Comunidad', title: 'Comunicados', description: 'Mantente al día con las novedades de tu edificio.' },
  '/resident/documents': { eyebrow: 'Biblioteca', title: 'Documentos y reglamentos', description: 'Accede a la información importante de tu comunidad.' },
  '/admin': { eyebrow: 'Operación', title: 'Panel administrador', description: 'Una vista rápida de lo que necesita atención hoy.' },
  '/admin/payments': { eyebrow: 'Operación', title: 'Gestión de pagos', description: 'Revisa liquidaciones y comprobantes de tu edificio.' },
  '/admin/reservations': { eyebrow: 'Operación', title: 'Gestión de reservas', description: 'Administra áreas comunes y solicitudes pendientes.' },
  '/admin/announcements': { eyebrow: 'Comunicación', title: 'Gestión de comunicados', description: 'Publica información relevante para los residentes.' },
  '/admin/documents': { eyebrow: 'Biblioteca', title: 'Gestión de documentos', description: 'Organiza reglamentos y documentos del edificio.' },
  '/admin/water': { eyebrow: 'Operación', title: 'Lecturas de agua', description: 'Registra y revisa el consumo de cada departamento.' },
  '/admin/buildings': { eyebrow: 'Configuración', title: 'Gestión de edificios', description: 'Organiza edificios, departamentos y responsables.' },
  '/super-admin': { eyebrow: 'Plataforma', title: 'Super Admin', description: 'Supervisa el estado general de Ediflex.' },
}

function useHashRoute() {
  const getPath = () => window.location.hash.replace(/^#/, '') || '/resident'
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const handleHashChange = () => setPath(getPath())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return path
}

function App() {
  const path = useHashRoute()
  const isResident = path.startsWith('/resident') || path === '/'
  const isDashboard = path === '/' || path === '/resident' || path === '/admin'
  const activeRoute = routes.find((route) => route.path === path) ?? routes[0]
  const screen = path === '/' || path === '/resident' ? null : screenNames[path]

  return (
    <AppShell activePath={path} activeRoute={activeRoute}>
      {isDashboard ? (
        isResident ? <ResidentDashboard /> : <AdminDashboard />
      ) : screen ? (
        <ScreenPage {...screen} />
      ) : (
        <NotFound />
      )}
    </AppShell>
  )
}

function AppShell({ children, activePath, activeRoute }: { children: ReactNode; activePath: string; activeRoute: Route }) {
  const mainRoutes = routes.filter((route) => route.group === 'Principal')
  const managementRoutes = routes.filter((route) => route.group === 'Gestión')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#/resident" aria-label="Ir al inicio de Ediflex">
          <span className="brand-mark">e</span>
          <span>ediflex</span>
        </a>
        <div className="sidebar-context">
          <span className="overline">Edificio activo</span>
          <strong>Residencial Aurora</strong>
          <span className="muted">Torre A · Depto. 304</span>
        </div>
        <nav aria-label="Navegación principal">
          <span className="nav-heading">Principal</span>
          {mainRoutes.map((route) => <NavLink key={route.path} route={route} activePath={activePath} />)}
          <span className="nav-heading nav-heading-spaced">Gestión</span>
          {managementRoutes.map((route) => <NavLink key={route.path} route={route} activePath={activePath} />)}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar avatar-small">AR</div>
          <div><strong>Alex Rivera</strong><span className="muted">Residente</span></div>
          <button className="icon-button" aria-label="Abrir menú de usuario">•••</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">e</span> ediflex</div>
          <div className="breadcrumb"><span>Edificio Aurora</span><span className="breadcrumb-separator">/</span><strong>{activeRoute.label}</strong></div>
          <div className="topbar-actions"><button className="notification-button" aria-label="Notificaciones">♢<span className="notification-dot" /></button><div className="avatar">AR</div></div>
        </header>
        <div className="content-container">{children}</div>
      </main>

      <nav className="bottom-nav" aria-label="Navegación móvil">
        {mainRoutes.slice(0, 5).map((route) => <NavLink key={route.path} route={route} activePath={activePath} mobile />)}
      </nav>
    </div>
  )
}

function NavLink({ route, activePath, mobile = false }: { route: Route; activePath: string; mobile?: boolean }) {
  const active = activePath === route.path || (route.path === '/resident' && activePath === '/')
  return <a className={`nav-link ${active ? 'active' : ''} ${mobile ? 'mobile-link' : ''}`} href={`#${route.path}`}><span className="nav-icon">{route.icon}</span><span>{route.label}</span></a>
}

function ResidentDashboard() {
  return <>
    <div className="page-heading"><div><span className="eyebrow">Martes, 12 de marzo</span><h1>Buenos días, Alex <span className="wave">✦</span></h1><p>Todo lo importante de tu hogar, en un solo lugar.</p></div><button className="button button-primary" onClick={() => { window.location.hash = '/resident/reservations' }}>Nueva reserva <span>+</span></button></div>
    <section className="hero-card"><div><span className="hero-label">Liquidación de marzo</span><strong className="hero-amount">S/ 248.50</strong><span className="hero-meta">Vence el 31 de marzo · Depto. 304</span><a href="#/resident/account" className="hero-link">Ver estado de cuenta <span>→</span></a></div><div className="hero-illustration" aria-hidden="true"><span>✦</span><span>○</span><span>⌂</span></div></section>
    <section className="stats-grid"><StatCard label="Saldo pendiente" value="S/ 248.50" hint="Vence en 19 días" tone="teal" icon="$" /><StatCard label="Próxima reserva" value="Sábado, 16" hint="Terraza · 4:00 PM" tone="lilac" icon="◷" /><StatCard label="Consumo de agua" value="12.4 m³" hint="8% menos que febrero" tone="peach" icon="♧" /></section>
    <div className="dashboard-columns"><section className="panel"><PanelHeader title="Actividad reciente" action="Ver todo" href="#/resident/account" /><ActivityItem icon="$" title="Liquidación de marzo" meta="Generada el 01 de marzo" amount="S/ 248.50" status="Pendiente" /><ActivityItem icon="◷" title="Reserva confirmada" meta="Terraza · 16 de marzo" amount="" status="Confirmada" /><ActivityItem icon="✦" title="Nuevo comunicado" meta="Mantenimiento de ascensores" amount="" status="Nuevo" /></section><section className="panel announcement-panel"><PanelHeader title="Del edificio" action="Ver comunicados" href="#/resident/announcements" /><span className="announcement-date">12 MAR 2024</span><h3>Mantenimiento de ascensores</h3><p>El mantenimiento preventivo se realizará este jueves entre las 10:00 y 14:00 horas.</p><a className="text-link" href="#/resident/announcements">Leer comunicado <span>→</span></a></section></div>
  </>
}

function AdminDashboard() {
  return <><div className="page-heading"><div><span className="eyebrow">Panel de administración</span><h1>Hola, administrador <span className="wave">✦</span></h1><p>Esto es lo que requiere tu atención en Residencial Aurora.</p></div><button className="button button-primary">Registrar gasto <span>+</span></button></div><section className="stats-grid"><StatCard label="Por validar" value="8 pagos" hint="S/ 1,860.00 pendientes" tone="teal" icon="$" /><StatCard label="Reservas pendientes" value="3 solicitudes" hint="Requieren aprobación" tone="lilac" icon="◷" /><StatCard label="Lecturas del mes" value="24 / 32" hint="75% completado" tone="peach" icon="♧" /></section><div className="dashboard-columns"><section className="panel"><PanelHeader title="Tareas pendientes" action="Ver gestión" href="#/admin/payments" /><ActivityItem icon="$" title="Comprobantes por validar" meta="8 residentes esperan revisión" amount="" status="Revisar" /><ActivityItem icon="◷" title="Solicitudes de reserva" meta="Salón social y terraza" amount="" status="Revisar" /><ActivityItem icon="♧" title="Lecturas pendientes" meta="8 departamentos sin registrar" amount="" status="Revisar" /></section><section className="panel announcement-panel"><span className="announcement-date">ESTE MES</span><h3>Estado del edificio</h3><p>La ocupación está al 94% y todos los documentos obligatorios están publicados.</p><a className="text-link" href="#/admin/buildings">Gestionar edificio <span>→</span></a></section></div></>
}

function ScreenPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <><div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><button className="button button-secondary">Filtros <span>⌄</span></button></div><section className="panel placeholder-panel"><div className="placeholder-icon">✦</div><h2>Estamos preparando este espacio</h2><p>La estructura de Ediflex ya está lista. Este módulo se conectará a la información real en una siguiente fase.</p><a href="#/resident" className="text-link">Volver al inicio <span>→</span></a></section></>
}

function NotFound() { return <section className="panel placeholder-panel"><div className="placeholder-icon">?</div><h2>Página no encontrada</h2><p>La ruta que buscas no existe en este starter.</p><a href="#/resident" className="text-link">Volver al inicio <span>→</span></a></section> }

function StatCard({ label, value, hint, tone, icon }: { label: string; value: string; hint: string; tone: string; icon: string }) { return <article className={`stat-card ${tone}`}><div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><strong>{value}</strong><small>{hint}</small></article> }
function PanelHeader({ title, action, href }: { title: string; action: string; href: string }) { return <div className="panel-header"><h2>{title}</h2><a href={href} className="text-link">{action} <span>→</span></a></div> }
function ActivityItem({ icon, title, meta, amount, status }: { icon: string; title: string; meta: string; amount: string; status: string }) { return <div className="activity-item"><span className="activity-icon">{icon}</span><div className="activity-copy"><strong>{title}</strong><span>{meta}</span></div>{amount && <strong className="activity-amount">{amount}</strong>}<span className="status-pill">{status}</span></div> }

export default App
