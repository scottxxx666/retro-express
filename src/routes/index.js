import router from './router';
import users from './users';
import rooms from './rooms';

router.use('/users', users);
router.use('/rooms', rooms);

export default router;
