var dataUrl = new URL("http://"), apiCounter=0;
var i; 

document.addEventListener("DOMContentLoaded", () => {
    getPrevisionData();
});

function getPrevision()
{
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Urbino?unitGroup=metric&key=EVPUPWJLED7AAULMJBMDVB3GJ&contentType=json")
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
}