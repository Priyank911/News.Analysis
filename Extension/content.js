document.addEventListener('mouseover', function (event) {
    let target = event.target;
  
    if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2') {
      let contentText = target.innerText;
      
      let score = Math.random() * 100; 
      score = score.toFixed(2);
  
      let tooltip = document.createElement('div');
      tooltip.className = 'credibility-tooltip';
      tooltip.innerText = `Credibility Score: ${score}`;

      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'black';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.top = `${event.pageY + 10}px`;
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.zIndex = '1000';
      document.body.appendChild(tooltip);
      target.addEventListener('mouseleave', function () {
        tooltip.remove();
      });
    }
  });
  