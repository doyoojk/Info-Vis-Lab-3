// **** Functions to call for scaled values ****

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([1870,2017]).range([60,700]);

var hrScale = d3.scaleLinear()
    .domain([0,75]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale));
    
// **** Your JavaScript code goes here ****
//Loading CSV file
d3.csv('./baseball_hr_leaders.csv').then(data => {
    console.log(data);  // This will log your data to the console
    createScatterplot(data);
})

function createScatterplot(data) {
    const svg = d3.select('svg');

    // Add X-axis label
    svg.append('text')
        .attr('x', '50%')
        .attr('y', '95%')
        .attr('text-anchor', 'middle')
        .text('MLB Season');

    // Add Y-axis label
    svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -svg.attr('height') / 2)
    .attr('y', '5%')  
    .attr('dy', '0.5em')  
    .attr('text-anchor', 'middle')
    .text('Home Runs (HR)');

    // Add title
    svg.append('text')
        .attr('x', '50%')
        .attr('y', '5%')
        .attr('text-anchor', 'middle')
        .text('Top 10 HR Leaders per MLB Season');

    createCircles(data, svg);
}

function createCircles(data, svg) {
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => scaleYear(d.year))
        .attr('cy', d => scaleHomeruns(d.homeruns))
        .attr('r', 2)
        .attr('class', d => (d.rank <= 3 ? 'top-ranked' : d.rank >= 9 ? 'bottom-ranked' : 'middle-ranked'));
}

