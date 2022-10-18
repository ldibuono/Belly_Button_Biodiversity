function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples)
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log("resultsArray", resultsArray);  
    //  5. Create a variable that holds the first sample in the array.
    var result = resultsArray[0];
    console.log("result", result);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata = metadataArray[0];
    var frequency = parseFloat(metadata.frequency)
    console.log(metadata); 
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var first10Ids = otuIds.slice(0, 10).map(otuIds => `otuIds ${otuIds}`).reverse();
    console.log("first10Ids", first10Ids)
    // var yticks = first10Ids.reverse();

    var first10Values = sampleValues.slice(0, 10).reverse();
    console.log("first10Values", first10Values)
    // var xticks = first10Values.reverse();

    // 8. Create the trace for the bar chart. 
    var barData = {
      x: first10Values,
      y: first10Ids,
      type: 'bar',
      orientation: 'h',
      text: otuLabels.slice(0, 10).reverse()
    };
    var data = [barData];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Belly Button Biodiversity",
      xaxis: {
        title: "Sample Values"
      },
      yaxis: {
        // categoryorder: "array",
        // categoryarray: "first10Ids"
      }
    };

    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", data, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      mode: 'markers',
      text: otuLabels,
      marker: {
        size: sampleValues,
        color: otuIds
      }
   
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: {t:0},
      margin: {t:30}
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Following is for the gauge chart
    // 3. Create a variable that holds the washing frequency.
    var washingFrequency = metadata.wfreq;
    // Create the yticks for the bar chart.

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     {
      domain:{ x: [0, 10], y: [0, 10]},
      value: washingFrequency,
      title: { text: "Washing Frequency"},
      type: "indicator",
      mode: "gauge+number"
     }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width: 600, height: 500, margin: { t: 0, b: 0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });

}
