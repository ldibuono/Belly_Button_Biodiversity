// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples)

    // Create a variable that filters the samples for the object with the desired sample number.
  var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log("resultsArray", resultsArray); 
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
    var result = resultsArray[0];
    console.log("result", result);

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata = metadataArray[0];
    var frequency = parseFloat(metadata.frequency)
    console.log(metadata); 

    // 3. Create a variable that holds the washing frequency.
   var washingFrequency = result.washing_frequency;
    // Create the yticks for the bar chart.

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     {
      domain:{ x: [0, 10], y: [0, 10]},
      value: 270,
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
