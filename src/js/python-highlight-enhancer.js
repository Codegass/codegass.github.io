// Python Syntax Highlighting Enhancer
// This script enhances highlight.js by adding custom highlighting for Python package methods

export async function enhancePythonHighlighting(codeElement) {
  try {
    // Load the keyword configuration
    const response = await fetch('/data/python-highlight-keywords.json');
    const config = await response.json();

    // Build a set of all method names to highlight
    const methodsToHighlight = new Set();
    const aliasMap = new Map(); // Map aliases to package names

    Object.values(config).forEach(pkg => {
      // Add package methods
      pkg.methods.forEach(method => methodsToHighlight.add(method));

      // Map aliases (e.g., np -> numpy)
      pkg.aliases.forEach(alias => {
        aliasMap.set(alias, pkg.package);
      });
    });

    // Get the text content
    let html = codeElement.innerHTML;

    // Create a temporary div to parse HTML safely
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Find all text nodes
    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    // Common object identifiers in Python
    const objectIdentifiers = new Set(['self', 'cls', 'obj', 'instance', 'this']);

    // Process each text node
    textNodes.forEach(textNode => {
      const text = textNode.textContent;

      // Pattern to match chained calls: prefix.attr1.attr2.method
      // We'll find all dot-separated chains
      const chainPattern = /(\w+(?:\.\w+)+)/g;
      let match;
      const replacements = [];

      while ((match = chainPattern.exec(text)) !== null) {
        const fullChain = match[1]; // e.g., "np.random.randn" or "self.W2"
        const parts = fullChain.split('.');
        const prefix = parts[0]; // e.g., "np" or "self"

        // Check if we should highlight this chain
        const shouldHighlight = aliasMap.has(prefix) ||
                               objectIdentifiers.has(prefix) ||
                               parts.some(part => methodsToHighlight.has(part));

        if (shouldHighlight) {
          // Build highlighted version with each part after the first highlighted
          let highlighted = prefix;
          for (let i = 1; i < parts.length; i++) {
            highlighted += `.<span class="hljs-custom-method">${parts[i]}</span>`;
          }

          replacements.push({
            index: match.index,
            length: fullChain.length,
            original: fullChain,
            highlighted: highlighted
          });
        }
      }

      // Apply replacements in reverse order to maintain indices
      if (replacements.length > 0) {
        let newText = text;
        replacements.reverse().forEach(replacement => {
          const before = newText.substring(0, replacement.index);
          const after = newText.substring(replacement.index + replacement.length);

          // Use the pre-built highlighted version
          newText = before + replacement.highlighted + after;
        });

        // Replace the text node with new HTML
        const span = document.createElement('span');
        span.innerHTML = newText;
        textNode.parentNode.replaceChild(span, textNode);
      }
    });

    // Update the code element
    codeElement.innerHTML = tempDiv.innerHTML;

  } catch (error) {
    console.error('Error enhancing Python highlighting:', error);
  }
}

// Apply enhancement to all Python code blocks
export function enhanceAllPythonBlocks() {
  const pythonBlocks = document.querySelectorAll('pre code.language-python, pre code.python');
  pythonBlocks.forEach(block => {
    enhancePythonHighlighting(block);
  });
}
