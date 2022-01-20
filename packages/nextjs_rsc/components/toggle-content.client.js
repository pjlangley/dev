import { useState } from 'react';

export default function ToggleContent() {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div>
      <h2>Content header</h2>
      <p>
        And some visible content on load.
      </p>
      <button type="button" onClick={() => setSeeMore(!seeMore)}>
        {seeMore ? 'Hide extra content' : 'Want to see more?'}
      </button>
      {seeMore && (
        <p>Some more content has been revealed!</p>
      )}
    </div>
  );
}
