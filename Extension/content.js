// content.js
document.addEventListener('mouseover', function (event) {
    let target = event.target;
  
    // Check if the hovered element is a paragraph or header
    if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2') {
      let contentText = target.innerText;
  
      // Simulate a credibility score (you can replace this with an actual API call)
      let score = Math.random() * 100; // Replace with real logic or API call
      score = score.toFixed(2);
  
      // Create a tooltip element
      let tooltip = document.createElement('div');
      tooltip.className = 'credibility-tooltip';
      tooltip.innerText = `Credibility Score: ${score}`;
  
      // Style the tooltip
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'black';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.top = `${event.pageY + 10}px`;
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.zIndex = '1000';
      document.body.appendChild(tooltip);
  
      // Remove tooltip when mouse leaves the element
      target.addEventListener('mouseleave', function () {
        tooltip.remove();
      });
    }
  });
  