import flyd from 'flyd';

export default function(inputStream) {
  let lastTime;

  return flyd.stream([inputStream], (outputStream) => {
    lastTime = lastTime || Date.now();

    const output = Date.now() - lastTime;

    lastTime = Date.now();

    outputStream(output);
  });
}
