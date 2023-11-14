var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var main = document.querySelector("#test");
var currentDate = new Date();
var temperature_data = [];
var humidity_data = [];
var endWhile = false;
var currentResponse;
var dataDay;
var tempIndex = 0;
var humIndex = 0;
var lastWeek = new Date();
var week;
var copyResponse;

document.addEventListener("DOMContentLoaded", () => {
    getData();
})

function getData(ev)
{
    fetch(dataUrl)
    .then(response =>
    {
        if(!response.ok)
            throw new Error("Something went wrong");
        return response.json();
    })
        .then(writeDayData)
        .catch(console.warn);
}

function writeDayData(response)
{
    copyResponse = response;
    console.log(response);
    console.log("Giorno");
    tempIndex=0;
    humIndex=0;

    while(endWhile===false)
    {
        currentResponse = response.pop();
        dataDay = currentResponse["data_ora"].slice(8, 10);

        if(dataDay === currentDate.getDate())
        {
            if(currentResponse["tipo"] === "UMIDITA")
            {    
                humidity_data[humIndex] = currentResponse["valore"]; 
                humIndex++;
            }
            else if(currentResponse["tipo"] === "TEMPERATURA")
            {
                temperature_data[tempIndex] = currentResponse["valore"];
                tempIndex++;
            }
        }
        else
            endWhile=true;
    }

    //for(let i=0; i<humidity_data.length; i++)
        //main.innerHTML += "<h4>" + humidity_data[i] + "</h4>";
    writeWeekData(copyResponse);
}

function writeWeekData(response)
{
    tempIndex = 0;
    humIndex = 0;

    console.log(response);
    console.log("Settimana");

    currentResponse = response.pop();
    week = currentResponse["data_ora"].slice(0,10);
    lastWeek.setDate(week.getDate() - 7);

    main.innerHTML += "<h4>" + week + "</h4>";
    main.innerHTML += "<h4>" + lastWeek + "</h4>"

    while(endWhile===false)
    {
        if(week === lastWeek)
            return;
        else
            endWhile=true;
    }
}
