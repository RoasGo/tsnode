import { Router } from 'express';

import defaultRoute from './default/default.route';

const router: Router = Router();

router.use('/default', defaultRoute);

export default router;
