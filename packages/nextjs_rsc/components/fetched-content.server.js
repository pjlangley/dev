import useData from '../lib/useData';

export default function FetchedContent() {
  const content = useData('content', () => new Promise(async (res) => {
    const response = await fetch('https://reqbin.com/echo/get/json');
    const json = await response.json();
    // Fake a network delay:
    const data = await new Promise((r) => {
      setTimeout(() => r(JSON.stringify(json, null, 2)), 3000);
    });

    return res(data);
  }));

  return (
    <div style={styles}>
      <pre style={{ margin: 0}}>{content}</pre>
    </div>
  );
}

const styles = {
  background: '#ccc',
  padding: '0.25em',
};
