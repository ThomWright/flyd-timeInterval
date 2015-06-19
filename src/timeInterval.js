import flyd from 'flyd';

export default function(inputStream) {
  let lastTime;

  return flyd.stream([inputStream], (outputStream) => {
    lastTime = lastTime || Date.now();

    const input = inputStream();
    const output = Object.assign({
      interval: Date.now() - lastTime
    }, input);

    lastTime = Date.now();

    outputStream(output);
  });
}
