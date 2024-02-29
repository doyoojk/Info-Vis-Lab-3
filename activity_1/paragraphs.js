
// **** Your JavaScript code goes here ****
d3.csv('./baseball_hr_leaders_2017.csv').then(data => {
    console.log(data);  // This will log your data to the console
    createParagraphs(data);
    createTable(data);})

function createParagraphs(data) {
    const div = d3.select('#homerun-leaders');
    div.selectAll('p')
        .data(data)
        .enter()
        .append('p')
        .text(d => `${d.rank}. ${d.name} with ${d.homeruns} home Runs`)
        .style('color', d => (d.rank <= 3 ? 'green' : 'black'));
}

function createTable(data) {
    const tableBody = d3.select('#homerun-table tbody');
    const rows = tableBody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
    
    rows.append('td').text(d => d.rank);
    rows.append('td').text(d => d.name);
    rows.append('td').text(d => d.homeruns);
}
