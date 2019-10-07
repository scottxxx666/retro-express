import router from './router';
import users from './users';
import rooms from './rooms';
import cards from './rooms-cards';

router.use('/users', users);
router.use('/rooms', rooms);
router.use('/rooms', cards);

export default router;
