import ocv from '../index';
const Mainlayout = ocv.opts.ViewsConfig.Mainlayout
const routes = [{
  path: '/',
  component: Mainlayout,
  redirect: '/warning/detail',
  children: [{
    path: '/warning/detail',
    component: () => import(/* webpackChunkName: "warning" */ '@/views/warning/detail')
  }, {
    path: '/warning/report',
    component: () => import(/* webpackChunkName: "warning" */ '@/views/warning/report')
  }]
}]

export default routes
