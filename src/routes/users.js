import router from './router';
import asyncWrap from './async-wrap';

router.post('/login', asyncWrap(async (req, res) => {
  const data = await req.container.userService.login('GOOGLE', req.body.openId);
  res.json({ data });
}));

export default router;
