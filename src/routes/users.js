import router from './router';

router.get('/users', (req, res) => {
  res.send('hihi user');
});

export default router;
