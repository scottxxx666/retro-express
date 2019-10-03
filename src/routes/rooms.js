import router from './router';
import asyncWrap from './async-wrap';

router.post('/', asyncWrap(async (req, res) => {
  const data = await req.container.roomService.create(req.auth.data.id);
  res.json({ data });
}));

router.get('/:roomId', asyncWrap(async (req, res) => {
  const data = await req.container.roomService.find(req.params.roomId);
  res.json({ data });
}));

export default router;
