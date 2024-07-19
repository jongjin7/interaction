import * as d3 from 'd3';

function init() {
  console.log('init');
  const sandwiches = [
    { name: 'Thesis', price: 7.95, size: 'large' },
    { name: 'Dissertation', price: 8.95, size: 'large' },
    { name: 'Highlander', price: 6.5, size: 'small' },
    { name: 'Just Tuna', price: 6.5, size: 'small' },
    { name: 'So-La', price: 7.95, size: 'large' },
    { name: 'Special', price: 12.5, size: 'small' },
  ];

  const svg = d3.select('body').append('svg').attr('width', 310).attr('height', 60);

  svg
    .selectAll('circle')
    .data(sandwiches)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => i * 50 + 30)
    .attr('cy', 30)
    .attr('r', (d) => {
      if (d.size == 'large') {
        return 20;
      } else {
        return 10;
      }
    })
    .attr('fill', (d) => {
      if (d.price < 7) return 'green';
      else return 'yellow';
    })
    .attr('stroke', 'black');
}

document.addEventListener('DOMContentLoaded', init);
