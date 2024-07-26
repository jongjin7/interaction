import * as d3 from 'd3';

function init() {
  console.log('init');
  const data = [
    { value: 3, time: new Date('2019-03-22T03:00:00') },
    { value: 1, time: new Date('2019-03-22T03:05:00') },
    { value: 9, time: new Date('2019-03-22T03:10:00') },
    { value: 6, time: new Date('2019-03-22T03:15:00') },
    { value: 2, time: new Date('2019-03-22T03:20:00') },
    { value: 6, time: new Date('2019-03-22T03:25:00') },
  ];
  const scaleFunc1 = d3.scaleLinear().domain([1, 5]).range([1, 10]);
  console.log(scaleFunc1(3)); // 5.5 출력
  console.log(scaleFunc1(5)); // 10 출력

  // scaleLog
  const x = d3.scaleLog().domain([300, 150000]).range([0, 400]).base(10);

  console.log(x(500)); // 32.9
  console.log(x.invert(32.9)); // 500

  // timeScale
  const timeScale = d3
    .scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
    .range([0, 400]);

  console.log(timeScale(new Date(2000, 7, 1))); // 232
  console.log(timeScale.invert(232)); // Tue Aug 01 2000

  // ordinal Scale
  const color = d3
    .scaleOrdinal()
    .domain(['AFRICA', 'N.AMERICA', 'EUROPE', 'S.AMERICA', 'ASIA'])
    //  ⭐️ D3에서 미리 정해놓은 color scheme을 사용해도 좋아요
    // .range(d3.schemeCategory10);
    .range(['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'GREY']);

  console.log(color('ASIA')); // BLUE

  // Band Scale
  const band = d3
    .scaleBand()
    .domain(['AFRICA', 'N.AMERICA', 'EUROPE', 'S.AMERICA', 'ASIA'])
    .range([0, 400])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  console.log(band('ASIA')); // 329
  console.log(band.bandwidth()); // 54
  console.log(band('EDDIE')); // undefined

  // min,max, extent
  const data2 = [
    { grade: 'A', value: 4 },
    { grade: 'B', value: 3 },
    { grade: 'C', value: 2 },
  ];

  const min = d3.min(data2, (d) => d.value);
  console.log('min', min); // 2

  const max = d3.max(data2, (d) => d.value); // 4
  console.log('max', max);
}

document.addEventListener('DOMContentLoaded', init);
