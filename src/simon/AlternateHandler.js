let timer, shouldFire = true;

const observer = (simon: Simon) => {
  while (timer === undefined && shouldFire) {
    setTimeout(fire, simon.getTime(), simon);
  }
};

const fire = (simon: Simon) => {
  switch (simon.next()) {
    case 'display_step':
      break;

    case 'pause_step':
      break;

    case 'allow_input':
      break;

    case 'false_touch':
      break;

    case 'advance_round':
      break;

    case 'restart_round':
      break;

    default:
      break;
  }

  setTimeout(fire, simon.getTime(), simon);
};

const cancel = () => {
  clearTimeout(timer);
  shouldFire = false;
};
