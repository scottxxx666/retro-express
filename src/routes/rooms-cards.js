import router from './router';
import asyncWrap from './async-wrap';

router.get('/:roomId/cards', asyncWrap(async (req, res) => {
  const data = await req.container.cardService.list(req.params.roomId, req.query.stageId);
  res.json(data);
}));

router.post('/rooms/:roomId/cards', asyncWrap(async (req, res) => {
  const data = await req.container.cardService.create(req.params.roomId, req.body.stageId, req.auth.data.id, req.body.content);
  res.json({ data });
}));

export default router;
