import routes from '@/config/router.config';
import ocv from '../index';
import store from '../store';
// 在某大佬的OCV“框架”，宇宙无敌NBB的COPY大杂烩“框架”基础上配置下级页面（因为不支持多层级页面权限，只能配置第一级页面，所以需要自己在本地添加新页面，自己写权限）
let ocvRouter = ocv.opts.RouterConfig.install(store);
ocvRouter.addRoutes(routes)
export default ocvRouter
