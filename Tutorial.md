#Exercises:
These exercises will teach you how to use this SDK to find out how dangerous the UV is at your school now, and over the next few days.
You will also learn how to show and interpret this information in a user friendly way on a web page.
<br>
###_Required Knowledge_
- Basic HTML (Buttons, Text, Images, Scripts)
- Basic Javascript (Functions, Variables)
- Javascript Arrays
- Controlling HTML Elements with Javascript (document.getElementByID())

**Impotant Note:** Your **Latitude** and **Longitude** are numbers which represent your position on the surface of the earth.

<br>
##Getting Started:
####_First you need to set up the files you are going to be working on._

1. Create a new folder to put your work in.
2. Navigate into your new folder
3. Create a new text document.
4. Open the newly created text document, navigate to "file" >> "save as" and save it as 'UVLensTutorial.html'.
5. Repeat step 4 but this time name it 'UVLensTutorial.js'
6. There should be 3 files in your newly created folder. Feel free to delete the 'New Text Document' or keep it for further notes.

![Screenshot of files in folder](http://s13.postimg.org/b9w29po2v/files_in_folder.png)

####_Next you need to download the SDK._

1. [Click here to download the SDK] (https://github.com/uvlens/edu_sdk/raw/master/UVLensSDK.js)	(or go to https://github.com/uvlens/edu_sdk/raw/master/UVLensSDK.js)
2. Move the downloaded file to the folder you created earlier

##_Now we're ready to get coding!_

####_Time to Set up your document_

1. Open the **UVLensTutorial.html** file you created earlier using a text editor (preferably one designed for development eg. Notepad++ or Visual Studio Code)
2. Copy the basic html page structure into your document

	```html
	<!DOCTYPE html>
	<html>
		<head>
			<title>Title of the document</title>
		</head>
	
		<body>
		</body>
	
	</html>
	```
	
3. Add the **script** files you will be using to the document
	Both of these should be added between the `<head>` and `</head>` tags in your **UVLensTutorial.html**
	First add the SDK script: 
	
	```html
	<script type='text/javascript' src='UVLensSDK.js'></script>
	```
	
	Followed by the script file you will be working in later on:
	
	```html
	<script type='text/javascript' src='UVLensTutorial.js'></script>
	```

####_Lets test that the SDK is working_

1. Open **UVLensTutorial.html** in your browser.
2. Open the **developer tools** javascript **console** in your browser (in chrome this is Ctrl + Shift + I), then click on the console button at the top of the opened window.
3. In the console enter **uvlens.prepare(KEY)** entering your UVLens SDK key into the brackets and press enter. This will set up the SDK to use your key (only until you refresh the page though)
	and will also run some tests to make sure everything is working correctly. Any errors when starting the SDK will be displayed in the console.
	![Screenshot of developer console](http://s2.postimg.org/odnnv4l3d/Developer_Console.png)

4. If the SDK starts successfully you can get try getting the current UV near you.
5. Go to this website: [Find my Latitude and Longitude](http://www.mapcoordinates.net/en) and use the **"show location"** bar to find your school. (text link: http://www.mapcoordinates.net/en)
6. Go back to your **UVLensTutorial.html** page and in the developer console enter: 

	```javascript
	uvlens.getCurrentUV(LATITUDE, LONGITUDE)
	``` 
	
	Replace **LATITUDE** and **LONGITUDE** with the values given to you by the website in the previous step (eg. uvlens.getCurrentUV(-36.8523378, 174.7691073)). Then press enter.
	
7. The console should come up with a number which represents the current **UV index** near your school, now lets start creating a **website** to read and display this data.

<br><br><br>

##Exercise 1:
######_In this exercise you will be required to create a simple webpage that will let you click buttons to display various forms of UV data on a website._

01. Right at the start of your **UVLensTutorial.js** file we need to prepare the SDK. Create a funtion called **"prepare"** and add this line inside it:

	```
	uvlens.prepare(SDKKEY);
	```

	Replacing SDKKEY with your key for the UVLens SDK.
	
02. Now in your **UVLensTutorial.html** file add `onload="prepare()"` to the **body** tag this will cause this function to be run immidiately when the page is loaded.
1. Most of the UV functions need to know your **latitude** and **longitude** to work, to specify these values, create 2 **input** tags (`<input>`) in your html file, one for latitude and the other one for longitude.
4. Inside the input tag give one an id equal to **"latitude"** and the other one **"longitude"**. 
5. Create a **button**. This button will get the current UV so change its text to something like "Get Current UV".
6. Inside your button tag include:

	```html
	...onclick = "getCurrentUV()"
	```
	
	so that once the button is clicked. It will run the "getCurrentUV" function that you will now create.


7. In your **UVLensTutorial.js** file create a new function called **"getCurrentUV"**
8. In this function you will need 2 variables **"latitude"** and **"longitude"**
9. Set each of these variables equal to the value of their corresponding `<input>` field by doing something like this:

	```javascript
	latitude = document.getElementByID('latitude').value;
	```
	
10. Now its time to use these values to run the **UVLens SDK**, we are going to start by using:

	```javascript
	var UV = uvlens.getCurrentUV(latitude, longitude)
	```
	
	this will get the **current UV** near you from the UVLens server.
	
	_**Hint**: To check everything is working add `console.log(UV);` to your getCurrentUV function, then click the Get Current UV button, the UV level should be written to the console. 
	If it is not working, check your developer console for errors._

8. To display the current UV on your web page you will need to create an area to show the response you get. To do this simply create a div with its id set to output:
	```html
	<div id='output'>
	```
	 
9. Then in your getCurrentUV() function write the UV level you got earlier to this text box:
	
	```javascript
	document.getElementByID('output').innerHTML = UV;
	```
	
10. Congratulations, you have created a webpage that tells you the current UV for your location.

<Br>

---
<br>

You can repeat almost the same process to get the **UV forecast** for the next four days.

1. Create another **button**, set its text to something like "Get UV Four Day Forecast" and set its `onclick=getForecastUV()`.
2. In your javascript file add another function called "getForecastUV".
3. This function should do pretty much the same thing as the getCurrentUV function only use `UV = uvlens.getForecastUV(latitude, longitude)` instead of `uvlens.getCurrentUV(latitude, longitude)`

<br>

---
<br>

Lastly you will use the SDK to get a **pre-generated message** from our server which gives an **overview** of the day's UV conditions such as the maximum UV level and the times of the day when the UV is dangerous.

1. Create one more **button** and set its text to something relevant
2. In your javascript file add a **"getDailyMessage"** function.
3. Like for the previous functions get the latitude and longitude from your input boxes.
4. Create a second `<div>` element on your html page with its `id=message`.
5. Use `var Message = uvlens.getDailyMessage(latitude, longitude)` to get the message from the SDK.
6. Use the same process as you used for the UV and forecast to write the message to the div you created. (Remember this div has a different id so you will have to change your document.getElementByID)

<br>

---
<br>

####Well Done, you have finished a basic website that will tell you the current UV and the UV forecast, remember to put on sunscreen if the UV is higher than 3!
####However, at the moment the UV is just a number, which doesn't tell us much. And the forecast is a big mess of array information. Move on to exercise 2 to learn how to make your web page user friendly.

<br>

_**Hint**: to make things look nice in your html page add `<br>` tags which stands for break, this will create a space between your html elements and text._

<br>

##Exercise 2:
######_In this exercise you will create a user friendly interface to see current and forecasted UV in a way that makes sense to anyone who looks at it._
OK, to get your UV information to make sense the first thing we need to do is convert the numbers we got from the server to a meaningful UV level.
Lets split the UV into five categories: 

| UV Index range | UV Danger level |
| -------------- | --------------- |
| less than 0.5  |      no UV      |
|   0.5 to 3.0   |       Low       |
|   3.0 to 6.0   |     Moderate    |
|   6.0 to 8.0   |       High      |
|   8.0 to 11.0  |    Very High    |
|  more than 11  |     Extreme     |

1. Create a function in **UVLensTutorial.js** called "getMeaningfulUV", which takes the uv "index" number as an argument
2. Inside this function create an **if** statement with an **else if** for each of the above cases.
3. Inside each if statement return a string containing the UV danger level for that range of indices.

	```javascript
	if(index < 0.5){
		return 'No UV';
	}else if(index >= 0.5 && index <= 3.0){
		return 'Low';
	...
	...
	```
	
	These UV levels indicate how dangerous the UV is. UV starts becoming dangerous around the Moderate level and by the time you get to Extreme UV some people could burn in as little as 10 minutes.

Next lets add this functionality to the the **getCurrentUV** function, this simply means changing the line where you set the output to the UV `document.getElementById("output").innerHTML = UV`.
You just need to write `getMeaningfulUV(UV)` after the equals sign instead of simply `UV`, this way your output will be set to whatever the **getMeaningfulUV** function returns when it is given "UV" (the UV index) as an input.

####_Try it out! your current UV function should write a meaningful output as its response._
---
<br><br><br>
OK now the tricky bit, lets format the **UV forecasts** into a **table** so that you can see what is going on there.

1. Add a `<select>` element with `id="day"` so that you can choose which day you want to see the forecast for.
2. Add four `<options>` elements for today and the next three days to the select like this, these should have values from **0 to 3**:

	```html
	<select id="day">
		<option value="0"> Today </option>
		<option value="1"> Tomorrow </option>
		...
		...
	```

3. Underneath the select element add a `<table>` with `id="uvForecast"`, this table will show your **forecasted UV**.
4. Inside the **table** add:

	```html
	<thead>
		<tr>
			<th> Time </th>
			<th> UV Forecast </th> 
		</tr>
	</thead>
	
	<tbody>
	
	</tbody> 
	```
	so that the table has headings and an empty body.

Now you need to create the javascript that will add the **forecasts** to the table. Lets edit the **getForecastUV** function.

1. Firstly **remove** the line where the output element's innerHTML is set to the UV forecast.
2. Create a new variable `var table` and set it equal to the **"uvForecast"** element we created earlier (the table) using `document.getElementById`.
3. Get the 'value' of the **"day"** select box using: 

	```javascript
	var dayNumber = parseInt(document.getElementById('day').value)`
	```
	
	the **parseInt()** function is built into javascript and will convert the **'value'** of the select box from text to a **number**.
	
4. You can use value to get a **Date** representing the day you want the forecast for like this:

	```javascript
	var day = new Date();
	day.setDate( day.getDate() + dayNumber );
	```
	
	The first line here creates an object containing **today's** date, while the second line changes this date to **today** + the **'value'** selected in the select box.
	So, for example, if you selected tomorrow in the select box its value = 1, therefore dayNumber = 1. So when this code is run the date is set from today (eg. 19th) to today + 1 (eg. 20th).
	Javascript will automatically handle the end of a month (eg. January 31st + 1 becomes February 1st) so you don't have to worry about that.
	
5. Finally the program needs to know the **start** and **end** time, in hours, for which you want the forecast (stating from 00:00 am this morning). These can be set as follows:
	
	```javascript
	var start = 24 * dayNumber;
	var end = start + 24;
	```
	
	So, here the starting point is shifted along 24 hours for each day that you are looking into the future (ie. For today start = 0 (00:00 today), for tomorrow start = 24 (24:00 today = 00:00 tomorrow), etc).
	The end is simply set to 24 hours after the start so that the program is always looking at one entire day at a time.
<br>
	
---
<br>

Now you have all the variables you need to create and fill the **table**. To actually create the table lets use a **for** loop.

1. Create a **for** loop which loops from `var i = start` while `i < end`, incrementing `i` by **1** each time `for(var i = 0; i < end; i++)`.
	(so the program ends up going from i = start (00:00 on the chosen day) to i = end (24:00 on the chosen day) with the loop running once for each hour).
	
2. Inside the for loop we need to add a row to the table on each iteration (each iteration, and so each row, will represent 1 hour). This can be done using the **insertRow** and **insertCell** methods.

	```javascript
	var row = table.insertRow(i - start); 
	var timeCell = row.insertCell(0);
	var uvCell = row.insertCell(1);
	```
	
	OK so line by line this is what is happening:
	
	**First**, a **new row** is added to `table`, this row is added at position `i - start` of the table (**start** needs to be subtracted because otherwise, if you were looking at the second day, 
		the **first** row (first hour) of the second day (which is the 24th hour in total) would be inserted as the **24th** row. Since you are only looking at one day at a time it should actually be the first row in the table). 
	 
	**Second**, a new **cell** (column) is added to the **row** that was just created. This cell is inserted at position **0** meaning it is the left most cell, you will use it as a **label** showing the time for that row's UV.
	
	**Third**, another new **cell** is added, this cell is in position **1** meaning it is to the right of the first cell, the **UV** danger level will be displayed in this cell.
	
3. After those three lines, still working inside the for loop, you will fill the cells with their relevant information.

	```javascript
	timeCell.innerHTML = day.getDay() + " " + day.getDate() + "/" + day.getMonth() + " at " + (i - dayNumber*24) + ":00";
	uvCell.innerHTML = getMeaningfulUV(UV[i]);
	```
	
	The first line here looks long and messy, but really all it is doing is putting together information about the **day** and **time** and **displaying** it in the cell we created for this in the previous step.
	
	The second line gets the **UV forecast** for time `i` (each iteration of the loop will increase this by one), then uses the function we created earlier to make it **meaningful**, and **displays** it in its cell.
	
	_**Note:** UV is the response from the uvlens.getForecastUV function, it is an array which contains hourly forecasts starting from 00:00 this morning. 
	So by saying UV[i] you are telling the computer that you want the i'th element in the array which is forecast i hours ahead of 00:00. So for example when i = 30 it will look at the UV forecast for 6 am tomorrow._
	
4. Try out your **website**, when you click the get UV forecast button it should show a table with **forecasts** for whatever day you choose.

_**Hint:** At the moment you need you need to push the get forecast button every time you choose a different date in the select box. Try adding an onchange= to the select element_

The daily message doesn't need any change to be interpretted. Our server has already put the raw data into a friendly message for you! If you want you could try adding your name to the message or doing something similar
to make it a bit more personalised.

<br>

####You are finished! you have a simple website for looking at live and forecasted UV data. Try making it look better by adding some CSS!
![Screenshot of what it should look like]()

_**Hint:** Sometimes your table will display the wrong dates, this is because most modern browsers cache web pages which can cause them to show the date you first viewed the page instead of the current date.
Try clearing your browsing data, turning on private browsing, or just add these lines directly below your `<head>` tag._
		
```html
<meta http-equiv=”Pragma” content=”no-cache”>
<meta http-equiv=”Expires” content=”-1″>
<meta http-equiv=”CACHE-CONTROL” content=”NO-CACHE”>
```