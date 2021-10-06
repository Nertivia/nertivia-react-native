import Message from '../../interfaces/Message';
import messageStore from '../../store/messages';

export const onMessage = (data: {message: Message}) => {
  messageStore.addMessage(data.message);
};
