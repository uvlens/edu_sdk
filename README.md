#UVLens
####SDK for schools

Welcome to the UVLens SDK for schools. 

This SDK, or Software Development Kit, is a javascript file which includes a number of functions so that students can easily make use of the UVLens servers to
access UV data such as live UV measurements, forecasts and burn time estimates. We hope that by teaching students to make use of this data, and the sensors distributed to various schools,
we can help teach students about the dangers of UV and how to better protect themselves.

#Exercises:
These exercises will teach you how to use this SDK to find out how dangerous the UV is at your school now, and over the next few days.
You will also learn how to show this information in a user friendly way on a web page and find out how quickly you could burn in the sun right now.
&nbsp;
###_Required Knowledge_
- Basic HTML (Buttons, Text, Images, Scripts)
- Basic Javascript (Functions, Variables)
- Javascript Arrays
- Controlling HTML Elements with Javascript (document.getElementByID())

##Getting Started:
####_First you need to set up the files you are going to be working on._

1. Create a new folder to put your work in.
2. Navigate into your new folder
3. Create a new text document.
4. Open the newly created text document and navigate to "file" >> "save as" and name it 'UVLensTutorial.html'.
5. Repeat step 4 but this time name it 'UVLensTutorial.js'
6. Now there should be 3 files in your newly created folder. Feel free to delete the 'New Text Document' or keep it for further notes.

![Screenshot of files in folder](http://s13.postimg.org/b9w29po2v/files_in_folder.png)

####_Now you need to download the SDK._

1. [Click here to download the SDK] (https://github.com/uvlens/edu_sdk/raw/master/UVLensSDK.js)	(or go to https://github.com/uvlens/edu_sdk/raw/master/UVLensSDK.js)
2. Move the downloaded file to the folder you created earlier

###_Now we're ready to get coding!_
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
3. Now lets add the script files you will be using to the document
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
2. Open the developer tools javascript console in your browser (in chrome this is Ctrl + Shift + I) then click on the console button at the top of the opened window.
3. In the console type in **uvlens.test()** (this will run a few tests to check whether the SDK is working correctly and give you an error message if something isn't working)

![Screenshot of developer console](http://s2.postimg.org/odnnv4l3d/Developer_Console.png)

4. If the tests are successful you can **try getting the current uv level near you**.
5. Go to this website: [Find my Latitude and Longitude](http://www.mapcoordinates.net/en) and using the "show location" bar find your school.
6. Go back to your **UVLensTutorial.html** page and in the developer console enter **uvlens.getCurrentUV(LATIDUDE,&nbsp;LONGITUDE)** where LATITUDE and LONGITUDE are the
	values given to you by the website in the previous step (eg. uvlens.getCurrentUV(-36.8523378, 174.7691073)). Then press enter.
7. The console should come up with a number which represents the current UV index near your school, now lets start creating a website to read and display this data.

##Exercise 1:
######_In this exercise you will be required to create a simple webpage that will let you click buttons to get raw UV data from our server and display it on the screen._

1. Most of the UV functions need to know your latitude and longitude to work, to specify these values, create 2 input tags `<input>` in your html file, one for latitude and the other one for longitude.
4. Inside the input tag give one an id equal to "latitude" and the other one "longitude". 
5. Now create a button. This button will get the current UV so change its text to something like "Get Current UV".
6. Inside your button tag include:

	```html
	...onclick = "getCurrentUV()"
	```
	
	so that once the button is clicked. It will run the "getCurrentUV" function that you will now create.
	
7. Now in your created javascript file create a new function called "getCurrentUV"
8. In this function you will need 2 variables "latitude" and "longitude"
9. Set each of these variables equal to the value of their corresponding `<input>` field by doing something like this:

	```javascript
	latitude = document.getElementByID('latitude').value;
	```
	
10. Now its time to use these values to **run the UVLens SDK**, we are going to start by using `var UV = uvlens.getCurrentUV(latitude, longitude)` which will **get the current UV** near you from the UVLens server.
	_**Hint**: To check everything is working add `console.log(UV);` to your getCurrentUV function, then click the Get Current UV button, the UV level should be written to the console. 
	If it is not working, check your developer console for errors._

8. To display the current UV on your web page you will need to create an area to **show the response** you get. To do this simply
	create a `<div>` element with and set its `id='response'`. Then in your getCurrentUV() function write the UV level you got earlier to this text box:
	
	```javascript
	document.getElementByID('response').innerHTML = UV;
	```
	
9. Congratulations, you have now created a webpage that tells you the current UV for your location.

Now you can repeat almost the same process to get the UV forecast for the next four days.
1. Create another **button**, set its text to something like "Get UV Four Day Forecast" and set its **onclick** to `getForecastUV()`.
2. In your javascript file add another function called "getForecastUV".
3. This function should do pretty much the same thing as the getCurrentUV function only use `UV = uvlens.getForecastUV(latitude, longitude)` instead of `uvlens.getCurrentUV(latitude, longitude)`

####Well Done, you have finished a basic website that will tell you the current UV and the UV forecast, remember to put on sunscreen if the UV is higher than 3!
####However, at the moment the UV is just a number, which doesn't tell us much. And the forecast is a big mess of array information. Move on to exercise 2 to learn how to make your web page user friendly.


Hint: to make things look nice in your html page add `<br>` tags which stands for break, this will create a space between your html elements and text


##Exercise 2:
######_In this exercise you will create a user friendly interface to see current and forecasted UV in a way that makes sense to anyone who looks at it._
OK, to get our UV information to make sense the first thing we need to do is convert the numbers we got from the server to a meaningful UV level.
For now lets split the UV into five categories: UV Index less than 0.5 means no UV, 0.5 to 3.0 is Low, 3.0 to 6.0 is Moderate, 6.0 to 8.0 is High, 8.0 to 11.0 is Very High and if the UV index is above 11 the UV is Extreme.

1. Create a function in **UVLensTutorial.js** called "getMeaningfulUV", this function will take the index as an argument so it is `function getMeaningfulUV(index)`
2. Inside this function create an **if** statement with an **else if** for each of the above cases.
3. Inside each if statement return a string containing the UV level for that range of indices.

	```javascript
	if(index < 0.5){
		return 'No UV';
	}else if(index >= 0.5 && index <= 3.0){
		return 'Low';
	...
	...
	```
	
	These UV levels indicate how dangerous the UV is. UV starts becoming dangerous around the Moderate level and by the time you get to Extreme UV some people could burn in as little as 10 minutes.

Now lets add this functionality to the our getCurrentUV function, this simply means changing the line where we set the output to the UV `document.getElementById("output").innerHTML = UV`.
We just need to write getMeaningfulUV(UV) to the output instead of simply UV, this way our output will be set to whatever the getMeaningfulUV function returns when it is given "UV" (the UV index) as an input.

####_Try it out! your current UV function should now write a meaningful output to the response text box._

OK now the tricky bit, lets format the UV forecasts into a table so that we can see what is going on there.
1. Add a `<select>` element with `id="day"` so that we can choose which day we want to see the forecast for.
2. Add four `<options>` elements to the select like this:

	```html
	<select id="day">
		<option value="0"> Today </option>
		<option value="1"> Tomorrow </option>
		...
		...
	```

3. Underneath the select element add a `<table>` with `id="uvForecast"`, this table will show our forecasted UV.
4. Inside the table add:

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
	so that our table has headings and an empty body.
<br>
Now we need to create the javascript that will add our forecasts to the table. Lets edit the getForecastUV function.
1. Firstly remove the line where the response element's innerHTML is set to the UV forecast.
2. Create a new variable `var table` and set it equal to the "uvForecast" element we created earlier (the table).
3. Now get the value of the "day" select box using `var dayNumber = parseInt(document.getElementById('day').value)`, the parseInt() function is built into javascript and will convert the 'value' of the select box to a number instead of text.
4. We also need to get a value for the day that we are looking at the forecast for, to do this we can use 

	```javascript
	var day = new Date();
	day.setDate( day.getDate() + dayNumber );
	```
	
	The first line here creates an object containing today's date, while the second line changes this date to today + the value selected in the select box.
	So, for example, if we selected tomorrow in the select box its value = 1, therefore dayNumber = 1. So when this code is run the date is set from today (eg. 19th) to today + 1 (eg. 20th).
	Javascript will automatically handle the end of a month (eg. January 31st + 1 becomes February 1st) so you don't have to worry about that.
	
5. Finally we need to know that start and end time, in hours, for which we want the forecast. These can be set as follows:
	
	```javascript
	var start = 24 * dayNumber;
	var end = start + 24;
	```
	
	So, here the starting point is shifted along 24 hours for each day that we are looking into the future (ie. For today start = 0, for tomorrow start = 24, for the day after start = 48, etc).
	The end is simply set to 24 hours after the start so that we are always looking at one day of time.

Now we have all the variables we need to create our table. To actually create the table we are going to use a for loop.
1. Create a for loop which loops from `i = start` while `i < end`, incrementing `i` by 1 each time.
2. In the for loop we need to add a row to our table on each iteration. This can be done using the insertRow and insertCell methods.

	```javascript
	var row = table.insertRow(i - start); 
	var timeCell = row.insertCell(0);
	var uvCell = row.insertCell(1);
	```
	
	OK so line by line this is what is happening:
	Fist we add a new row to `table`, this row is added at position `i - start` of the table (we need to subtract start because otherwise the first row for the second day would be inserted as row 24, 
	however since we are only looking at one day at a time we would actually want it to be the first row). 
	Second we add a new cell to the row we just created. This cell is inserted at position 0 meaning it is the left most cell, we will use it to label the time for that row's UV.
	Third we add another new cell, this cell is in position 1 meaning it is to the right of the first cell, the UV level will be displayed in this cell.
	
3. After those three lines, still inside the for loop, we will now fill the cells with their relevant information.

	```javascript
	timeCell.innerHTML = day.getDay() + " " + day.getDate() + "/" + day.getMonth() + " at " + (i - dayNumber*24) + ":00";
	uvCell.innerHTML = getMeaningfulUV(UV[i]);
	```
	
	The first line here looks long and messy, but really all it is doing is putting together information about the day and time for each forecast and putting it into the cell we created for this in the last step.
	The second line gets the UV forecast for the current time, uses the function we created earlier to make it meaningful and places it into the cell we created.
	
	**Note:** UV is the response from the uvlens.getForecastUV function, it is an array which contains hourly forecasts starting from 12 am today. 
	So by saying UV[i] we are saying we want the forecast i hours ahead of the current time. So for example when i = 30 we are looking at the forecast for 6 am tomorrow.
	
4. Try out your website, it should show a table with forecasts for whatever day you choose.

_**Hint:** At the moment you need you need to push the get forecast button every time you choose a different date in the select box. Try adding an onchange= to the select element_


####You are finished! you now have a simple website for looking at live and forecasted UV data. Try making it look better using some CSS!

_**Hint:** Sometimes your table will display the wrong date, this is because most modern browsers cache web pages which can cause them to show the date you first viewed the page instead of the current date.
Try clearing your browsing data, turning on private browsing, or just add these lines directly below your `<head>` tag._
		
```html
<meta http-equiv=”Pragma” content=”no-cache”>
<meta http-equiv=”Expires” content=”-1″>
<meta http-equiv=”CACHE-CONTROL” content=”NO-CACHE”>
```


	
##Extra for Experts (coming soon):
######_In this exercise you will create a map which allows you to see UV forecasts around the world for the next four days. (This is still under construction)_


#Technical Documentation

This SDK is designed for use by students, it contains functions which allow for easy access
to the UVLens servers to pull a variety of UV related data. To use it simply add it to your html file
as a script. This SDK has no dependencies other than some functions which are included in all major browsers
newer than IE 8.

| Function  | Description |
| ------------- | ------------- |
| test()  | Performs a few tests to check whether the SDK is working properly (eg can connect to server) and writes results to the console  |
| getCurrentUV(latitude, longitude)  | Returns the current UV Index as measured by the nearest sensor to a given latitude/longitude  |
| getForecastUV(latitude, longitude) | Returns an array of hourly UV Indices forecasting the UV level for the next 96 hours (4 days) starting today at 12:00 am (midday) local time |
| getBurntime(latitude, longitude) | Returns an estimate for how long it will take a person with a given skin type (search Fitzpatrick Skin Type) to burn at a given latitude/longitude |
<!-- | getUVMap() | Returns a colour coded PNG map of UV levels around the world for the current hour |
| getUVMapForecast() | Returns an array of colour coded PNG maps for UV levels for 24 hours starting from 6am on the current day | -->