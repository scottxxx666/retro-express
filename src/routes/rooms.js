import router from './router';

router.post('/', async (req, res) => {
  const data = await req.container.roomService.create(req.auth.data.id);
  res.json({ data });
});

export default router;
