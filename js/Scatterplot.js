// Scatterplot.js



    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);

            function buildChart(dataset) {
                console.log(dataset);
                // Variable instantiations 
                var width = "600";
                var height = "400";

                // Set up xScale
                
                
                // Set up yScale              
                

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
                   .attr("cy", function(d, i) { return height - (i * 2) - 50; })
                   .attr("r", function(d, i) { return 3; })
                   .attr("fill", "blue");
                   
                
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

