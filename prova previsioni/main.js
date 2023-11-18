//apikey = EVPUPWJLED7AAULMJBMDVB3GJ
dataUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61034&aggregateHours=24&unitGroup=us&shortColumnNames=false&contentType=json&key=EVPUPWJLED7AAULMJBMDVB3GJ");
var i; 

document.addEventListener("DOMContentLoaded", () => {
    getPrevision();
});

function getPrevision()
{
    fetch(dataUrl)
        .then(response => 
        {
            if(!response.ok)
                throw new Error("Something went wrong");
            else
                return response.json();
        })
        .then((response) => 
        {
            getForecastData(response);
        })
}

function getForecastData(response)
{
    console.log(response);
    console.log(response.locations["Urbino,PU,61034"].currentConditions.temp);
}