// constants

// usually if the server uses relational DB we will get status as a number
// then we could implement analog of enum on the frontend part to work with it and raise readability
// of our code

const TASK_STATUS = {
  EXPIRED_DEADLINE: -2, // this one could exist only for frontend
  ALL: -1,
  NEW: 0,
  IN_PROGRESS: 1,
  DONE: 2
};

const TASK_MAX_DESCRIPTION_LENGTH = 2048;
const TASK_MAX_TITLE_LENGTH = 40;

export default {
  TASK_STATUS,
  TASK_MAX_DESCRIPTION_LENGTH,
  TASK_MAX_TITLE_LENGTH
};
