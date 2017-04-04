import { UIRouter, Category } from 'ui-router-core';


export function routerConfigFn(router: UIRouter) {
    const transitionService = router.transitionService;


    router.trace.enable(Category.TRANSITION);

}