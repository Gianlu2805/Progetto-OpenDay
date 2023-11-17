var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var main = document.querySelector("#test");
var currentResponse;
var temperature_data = [], humidity_data = [];
var tempIndex = 0, humIndex = 0;
var currentDate = new Date(), dataDay;
var lastWeek, week;
var date = [];

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
    .then((response) => 
    {
        writeDayData(response);
        writeWeekData(response);
    })
    .catch(console.warn);
}

function writeDayData(response)
{
    console.log(response);

    tempIndex=0;
    humIndex=0;

    do
    {
        currentResponse = response.pop();
        dataDay = currentResponse["data_ora"].slice(8, 10);
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
    }while(dataDay === currentDate.getDate());
}

function writeWeekData(response)
{
    tempIndex = 0;
    humIndex = 0;
    
    week = response[response.length-1]["data_ora"].slice(0,10);
    copyWeek = week;

    date[0] = week.slice(0, 4);
    week = copyWeek;
    date[1] = week.slice(5, 7);
    week = copyWeek;
    date[2] = week.slice(8,10);

    lastWeek = new Date(date[0],date[1]-1,date[2]-8);

    do
    {
        currentResponse = response.pop();
        week = currentResponse["data_ora"].slice(0, 10);
        copyWeek = week;

        date[0] = week.slice(0, 4);
        week = copyWeek;
        date[1] = week.slice(5, 7);
        week = copyWeek;
        date[2] = week.slice(8, 10);

        week = new Date(date[0],date[1]-1,date[2]);

        if (currentResponse["tipo"] === "UMIDITA") {
            humidity_data[humIndex] = currentResponse["valore"];
            humIndex++;
        }
        else if (currentResponse["tipo"] === "TEMPERATURA") {
            temperature_data[tempIndex] = currentResponse["valore"];
            tempIndex++;
        }
    }while(week.toDateString() != lastWeek.toDateString());
}
