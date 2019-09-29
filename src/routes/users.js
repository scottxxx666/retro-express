import router from './router';

router.post('/login', (req, res) => {
  const data = req.container.userService.login(req.body.openId, 'GOOGLE');
  res.json({data});
});

export default router;
