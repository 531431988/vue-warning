const views = {
  ViewJczl: () => import('./home/index'),
  ViewJcyj: () => import('./warning/index'),
  ViewTjpg: () => import('./physical-overview/index'),
  ViewTjtb: () => import('./physical-fillin/index'),
  ViewCssz: () => import('./setting/index'),
}
export default views