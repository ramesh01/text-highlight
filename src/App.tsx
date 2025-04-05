import { useEffect, useRef, useState } from 'react';
import './App.css';
// declare class Highlight extends Set<Range> {}
function App() {
const articleRef = useRef<HTMLElement | null>(null);
const [allTextNodes, setAllTextNodes] = useState<any[]>([]);

useEffect(() => {
  if (articleRef.current) {
    const treeWalker = document.createTreeWalker(
      articleRef.current,
      NodeFilter.SHOW_TEXT
    );

  const allTextNodes = [];
  let currentNode = treeWalker.nextNode();

    while (currentNode) {
      allTextNodes.push(currentNode);
      currentNode = treeWalker.nextNode();
    }
    setAllTextNodes(allTextNodes);
    
  }
}, []);

const handleInputEvent = (e: React.FormEvent<HTMLInputElement>) => {
  const value = (e.target as HTMLInputElement).value;
  if (!(CSS as any).highlights) {
    if (articleRef.current) {
      articleRef.current.textContent = "CSS Custom Highlight API not supported.";
    }
    return;
  }
  (CSS as any).highlights.clear();
  const str = value.trim().toLowerCase();

  if (!str) {
    return;
  }

  const ranges: Range[] = allTextNodes
  .flatMap((el) => {
    const text = el.textContent?.toLowerCase() ?? '';
    const indices: number[] = [];
    let startPos = 0;

    while (startPos < text.length) {
      const index = text.indexOf(str, startPos);
      if (index === -1) break;
      indices.push(index);
      startPos = index + str.length;
    }

    return indices.map((index) => {
      const range = document.createRange();
      range.setStart(el, index);
      range.setEnd(el, index + str.length);
      return range;
    });
  });
  
  // Create a Highlight object for the ranges.
  if (ranges.length > 0) {
    const searchResultsHighlight = new (window as any).Highlight(...ranges);
    (CSS as any).highlights.set("search-results", searchResultsHighlight);
  }
}

  return (
    <div className="App">
      <label>Search within text <input id="query" type="text" onInput={handleInputEvent} /></label>
<article ref={articleRef}>
  <p>
    Maxime debitis hic, delectus perspiciatis laborum molestiae labore,
    deleniti, quam consequatur iure veniam alias voluptas nisi quo. Dolorem
    eaque alias, quo vel quas repudiandae architecto deserunt quidem, sapiente
    laudantium nulla.
  </p>
  <p>
    Maiores odit molestias, necessitatibus doloremque dolor illum reprehenderit
    provident nostrum laboriosam iste, tempore perferendis! Ab porro neque esse
    voluptas libero necessitatibus fugiat, ex, minus atque deserunt veniam
    molestiae tempora? Vitae.
  </p>
  <p>
    Dolorum facilis voluptate eaque eius similique ducimus dignissimos assumenda
    quos architecto. Doloremque deleniti non exercitationem rerum quam alias
    harum, nisi obcaecati corporis temporibus vero sapiente voluptatum est
    quibusdam id ipsa.
  </p>
</article>

    </div>
  );
}

export default App;
