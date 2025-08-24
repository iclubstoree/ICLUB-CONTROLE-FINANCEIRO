import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/analises/analises-list',
    label: 'Analises',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiChartLine' in icon ? icon['mdiChartLine' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ANALISES'
  },
  {
    href: '/categorias/categorias-list',
    label: 'Categorias',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTag' in icon ? icon['mdiTag' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CATEGORIAS'
  },
  {
    href: '/centros_de_custo/centros_de_custo-list',
    label: 'Centros de custo',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBriefcase' in icon ? icon['mdiBriefcase' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CENTROS_DE_CUSTO'
  },
  {
    href: '/configuracoes/configuracoes-list',
    label: 'Configuracoes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCogOutline' in icon ? icon['mdiCogOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CONFIGURACOES'
  },
  {
    href: '/dre/dre-list',
    label: 'Dre',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFinance' in icon ? icon['mdiFinance' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DRE'
  },
  {
    href: '/lojas/lojas-list',
    label: 'Lojas',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiStore' in icon ? icon['mdiStore' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_LOJAS'
  },
  {
    href: '/saidas/saidas-list',
    label: 'Saidas',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCash' in icon ? icon['mdiCash' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SAIDAS'
  },
  {
    href: '/tipos/tipos-list',
    label: 'Tipos',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiLabelOutline' in icon ? icon['mdiLabelOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TIPOS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
