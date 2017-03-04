// Scatterplot.js

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);

            function buildChart(dataset) {

                // Instantiate variables
                var svgWidth = 700;
                var svgHeight = 500;
                var chartPadding = 40;
                var dataset = json

                // Add seconds behind best time property to each JSON object
                dataset.forEach(function(finish) {
                    finish.Behind = finish.Seconds - 2210;
                });

                // Set up scales
                var xScale = d3.scaleLinear()
                               .domain([0, d3.max(dataset, function(d) { return d.Behind + 20; })])
                               .range([svgWidth - chartPadding, chartPadding]);
                
                var yScale = d3.scaleLinear()
                               .domain([1, d3.max(dataset, function(d) { return d.Place + 1; })])
                               .range([chartPadding, svgHeight - chartPadding]);


                // Set up xAxis
                var xAxis = d3.axisBottom(xScale);

                // Set up yAxis
                var yAxis = d3.axisLeft(yScale);
                

                // Create svg and append to DOM
                var svg = d3.select('#chartDiv')
                            .append('svg')
                            .attr('width', svgWidth)
                            .attr('height', svgHeight)
                            .attr('class', 'chartBackground')

                // Setup tooltip div
                var tooltip = d3.select('body')
                                .append('div')
                                .attr('class', 'tooltipStyles')

                // Add circles to the svg
                svg.selectAll('circle')
                   .data(dataset)
                   .enter()
                   .append('circle')
                   .attr('cx', function(d, i) { return xScale(d.Behind); })
                   .attr('cy', function(d) { return yScale(d.Place); })
                   .attr('r', 5)
                   .attr('class', function(d) {
                       if (d.Doping) {
                           return 'isDoper'
                       } else {
                           return 'isNotDoper'
                       }
                   })
                   .on('mouseover', function(d) {
                       tooltip.transition().style('display', 'block')
                       tooltip.html(d.Name + ', ' + d.Nationality + '<br>Year: ' + d.Year + '   Time: ' + d.Time + '<br>' + d.Doping)
                              .style('left', '350px')
                              .style('top', '500px')
                              .style('z-index', 2)
                    })
                    .on('mouseout', function(d) { 
                        tooltip.transition().style('display', 'none')
                    })
                
                // Append legend circles/text to svg
                svg.append('circle')
                   .attr('class', 'isDoper')
                   .attr('cx', '500px')
                   .attr('cy', '300px')
                   .attr('r', 5)
                
                svg.append('text')
                   .attr('x', '510px')
                   .attr('y', '305px')
                   .attr('class', 'legendText')
                   .text('Riders with doping allegations')
                
                svg.append('circle')
                   .attr('class', 'isNotDoper')
                   .attr('cx', '500px')
                   .attr('cy', '320px')
                   .attr('r', 5)
                
                svg.append('text')
                   .attr('x', '510px')
                   .attr('y', '325px')
                   .attr('class', 'legendText')
                   .text('No doping allegations')
                
                // Append x axis label
                svg.append('text')
                   .attr('class', 'label')
                   .attr('text-anchor', 'end')
                   .attr('x', svgWidth - chartPadding)
                   .attr('y', svgHeight - 6)
                   .text('Seconds Behind Best Time')

                // Append y axis label
                svg.append('text')
                   .attr('class', 'label')
                   .attr('text-anchor', 'end')
                   .attr('x', -40)
                   .attr('y', chartPadding + 5)
                   .attr('dy', '.75em')
                   .attr('transform', 'rotate(-90)')
                   .text('Ranking');

                //Append x axis to svg
                svg.append('g')
                   .attr('transform', 'translate(0,' + (svgHeight - chartPadding) + ')')
                   .call(xAxis);

                // Append y axis to svg
                svg.append('g')
                   .attr('transform', 'translate(' + chartPadding + ', 0)')
                   .call(yAxis);
            }
            buildChart(json);
        }
        else {
            // Handle error if xhr request fails
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

