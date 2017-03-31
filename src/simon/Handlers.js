let timer, sequence, stage = 0, round = 0;
const delay = 1000;

const roundManager = () => {
  console.log('big loop call', round, 'from thread: ', timer);
  if (round < 5) {
    stage = 0;
    round += 1;
    timer = setTimeout(roundManager, delay * 10);
    sequence = setInterval(fire, delay);
  } else {
    console.log('here');
    stage = 0;
    round = 0;
    clearTimeout(timer);
    clearInterval(sequence);
  }
};

const fire = () => {
  if (stage < 5) {
    console.log('flash start');
    setTimeout(
      () => {
        console.log('flash ended');
      },
      900,
    );
    stage += 1;
  } else {
    stage = 0;
    clearInterval(sequence);
  }
};

timer = setTimeout(roundManager, delay * 10);
sequence = setInterval(fire, delay);

setTimeout(
  () => {
    console.log('clearing timer: ', timer);
    try {
      clearTimeout(timer);
    } catch (e) {
      console.log(e);
    }
    console.log('cleared timer: ', timer);
    clearInterval(sequence);
  },
  delay * 2,
);
