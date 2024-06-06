import Pusher from 'pusher-js';

const pusher =  new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: 'ap1',
});

export default pusher;
