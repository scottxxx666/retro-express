import router from './router';
import asyncWrap from './async-wrap';

router.post('/login', asyncWrap(async (req, res) => {
  const data = await req.container.userService.login(req.body.openId, 'GOOGLE');
  res.json({ data });
}));

export default router;
