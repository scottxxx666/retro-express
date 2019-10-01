import router from './router';

router.post('/login', async (req, res) => {
  const data = await req.container.userService.login(req.body.openId, 'GOOGLE');
  res.json({ data });
});

export default router;
