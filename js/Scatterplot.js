// Scatterplot.js



    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);

            function buildChart(dataset) {
                // Variable instantiations 
                var width = "600";
                var height = "400";
                var padding = "40";
                console.log(dataset);
                // Set up xScale
                var xScale = d3.scaleLinear()
                                     .domain()
                                     .range();
                
                // Set up yScale              
                var yScale = d3.scaleLinear()
                                     .domain([0, 34])
                                     .range(0, height);

                // Append svg to #chartDiv div
                var svg = d3.select("#chartDiv")
                            .append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("class", "chartBackground");

                // Append all circles to svg
                svg.selectAll("circles")
                   .data(dataset)
                   .enter()
                   .append("circle")
                   .attr("cx", function(d, i) { return (i * 10) + 50; })
                   .attr("cy", function(d, i) { return 34 - d.Place + 100; })
                   .attr("r", function(d, i) { return 3; })
                   .attr("fill", "blue")
                   .append("title")
                   // Figure out how to format this nicely with all the info in it
                   .text(function(d) { return d.Name + ": " + d.Nationality })
                   .attr("x", function(d) { return 0; })
                   .attr("y", function(d) { return 50; })
                   .attr("font-size", "12px")
                   .attr("fill", "black")
                   
                
                // Append x axis label
                

                // Append y axis label
                
                
                // Append x axis
                
                
                // Append y axis
                
            }
            buildChart(json);
        }
        else {
            // Handle error if xhr request fails
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

