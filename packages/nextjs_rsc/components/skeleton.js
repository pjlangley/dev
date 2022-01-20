export default function Skeleton() {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <div className='item-skeleton' />
    </div>
  );
}

const styles = `
  .item-skeleton {
    margin: 5px 0;
    overflow: hidden;
  }
  .item-skeleton:before, .item-skeleton:after {
    content: '';
    display: block;
    width: 350px;
    max-width: 100%;
    height: 16px;
    background: #eee;
    margin: 6px 0 2px;
    background-image: linear-gradient(270deg, #ccc, #eee, #eee, #ccc);
    background-size: 400% 100%;
    animation: highlight-rotating 8s ease infinite;
  }
  .item-skeleton:after {
    width: 250px;
    height: 10px;
    margin: 5px 0;
  }
  @keyframes highlight-rotating {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;
