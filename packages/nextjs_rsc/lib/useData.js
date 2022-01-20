const cache = {};

export default function useData(key, fetcher) {
  if (!cache[key]) {
    cache[key] = {
      promise: undefined,
      data: undefined,
      fn: () => {
        if (cache[key] && cache[key].data) {
          return cache[key].data; 
        }

        if (!cache[key] || (cache[key] && !cache[key].promise)) {
          cache[key].promise = fetcher().then((r) => (cache[key].data = r));
        }

        // This seems to do something magical...
        throw cache[key].promise;
      },
    }
  }

  return cache[key].fn();
}
