import flyd from 'flyd';

export default function(inputStream) {
  return flyd.scan((prev) => {
    const now = Date.now();
    return {
      time: now,
      interval: now - prev.time
    };
  }, Date.now(), inputStream);
}
