import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route } from 'vue-router';


router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
