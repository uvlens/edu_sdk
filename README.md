#UVLens
####SDK for schools

Welcome to the UVLens SDK for schools. 

This SDK, or Software Development Kit, is a javascript file which includes a number of functions so that students can easly make use of the UVLens servers to
access a UV data such as live UV measurements, forecasts and burn time estimates. We hope that by teaching students to make use of this data and the sensors distributed to various schools
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

1. Create a new folder for you to work in.
2. Navigate into your new folder
3. Create a new text document.
4. Open the newly created text document and navigate to "file" >> "save as" and name it 'UVLensTutorial.html'.
5. Repeat step 4 but this time name it 'UVLensTutorial.js'
6. Now there should be 3 files in your newly created foldeer. Feel free to delete the 'New Text Document' or keep it for further notes.
[Screenshot of files in folder](http://imgur.com/52ICn3f)

####_Now you need to download the sdk. If you are not viewing this tutorial on Github, [go there now](https://github.com/uvlens/edu_sdk)._

1. On the github page, click on the UVLensSDK.js file
2. On the new page, right click the 'Raw' button and click 'save link as'
	[Screenshots of downloading the file](http://imgur.com/1T1YDSo)
3. Navigate to the folder you created earlier and save as UVLensSDK.js

###_Now we're ready to get coding!_
####_Time to Set up your document_

1. Open the **UVLensTutorial.html** file you created earlier using a text editor (preferably one designed for developement eg. Notepad++ or Visual Studio Code)
2. Copy the basic html page structure into your document
	```html
	<!DOCTYPE html>
	<html>
	<head>
	<title>Title of the document</title>
	</head>
	
	<body>
	The content of the document......
	</body>
	
	</html>
	```
3. Now lets add the script files you will be using to the document
	Both of these should be added between the <head> and </head> tags in your **UVLensTutorial.html**
	First add the SDK script: 
	
	```html
	<script type='text/javascript' src='UVLensSDK.js'></script>
	```
	
	Followed by the script file you will be working in later on:
	
	```html
	<script type='text/javascript' src='UVLensTutorial.js'></script>
	```
	
	Be sure to add these before the body tag (hint: body tag = <body>) 

####_Lets test that the SDK is working_

1. Open **UVLensTutorial.html** in your browser.
2. Open the developer tools javascript console in your browser (in chrome this is Ctrl + Shift + I then click on the console button at the top of the opened window)
3. In the console type in **uvlens.test()** (this will run a few tests to check whether the SDK is working correctly and give you an error message if something isn't working)
[Screenshot of developer console]()
4. If the tests are successful you can try getting the current uv level near you.
5. Go to this website: [Find my Latitude and Longitude](http://www.mapcoordinates.net/en) and using the "show location" bar find your school.
6. Go back to your **UVLensTutorial.html** page and in the developer console enter **uvlens.getCurrentUV(LATIDUDE, LONGITUDE)** where LATITUDE and LONGITUDE are the
	values given to you by the website in the previous step (eg. uvlens.getCurrentUV(-36.8523378, 174.7691073)). Then press enter.
7. The console should come up with a number which represents the current UV index near your school, now lets start creating a website to read and display this data.

##Exercise 1:
######_In this excercise you will be required to create a button in your webpage that returns the current UV level at your current location_

1. Most of the UV functions need to know your latitude and longitude to work, to specify these values, create 2 input tags `<input>` in your html file, one for latitude and the other one for longtude.
4. Inside the input tag give one an id equal to "latitude" and the other one "longtitude". 
5. Now create a button. This button will get the current UV so change its text to something like "Get Current UV".
6. Inside your button tag include:

	```html
	...onclick = "getCurrentUV()"
	```
	
	so that once the button is clicked. It will run your "getCurrentUV" function that you created earlier.
	
7. Now in your created javascript file create a new function called "getCurrentUV"
8. In this function you will need 2 variables "latitude" and "longitude"
9. Set each of these variables equal to the value of their corresponding `<input>` field by doing something like this:

	```javascript
	latitude = document.getElementByID('latitude').value;
	```
	
10. Now its time to use these values to run the UVLens SDK, we are going to start by using `var UV = uvlens.getCurrentUV(latitude, longitude)` which will get the current UV near you from the UVLens server.
	**Hint**: To check everything is working add `console.log(UV);` to your getCurrentUV() function, then click the Get Current UV button, the UV level should be written to your console.
	If it is not working, check your developer console for errors.

8. To display the current UV on your web page you will need to create an area to show the response you get. To do this simply
	create a `<textarea>` element with and give it an id equal to response.
	Then in your getCurrentUV() function you will need to write the UV level you got earlier to this text box:
	
	```javascript
	document.getElementByID('response').value = UV;
	```
	
9. Congratulations, you have now created a webpage that tells you the current UV for your location.

Now you can repeat almost the same process to get the UV forecast for the next four days.
1. Create another button, set its text to something like "Get UV Four Day Forecast" and set its onclick to `getUVForecast()`.
2. In your javascript file add another function called getUVForecast().
3. This function should do pretty much the same thing as the getCurrentUV() function only use `UV = uvlens.getUVForecast(latitude, longitude)` instead of uvlens.getCurrentUV

####Well Done, you have finished a basic website that will tell you the current UV and the UV forecast, remember to put on sunscreen if the UV is higher than 3!
####However, at the moment the UV is just a number, which doesn't tell us much. And the forecast is a big mess of array information. Move on to exercise 2 to learn how to make your web page user friendly.


Hint: to make things look nice in your html page add <br> tags which stands for break, this will create a space between your html elements and text




##Exercise 2:
######_Create a user friendly interface to see uv now and forecasted uv_


##Extra for Experts:
######_Get and show UV Map make a map (This is still under construction)_


#Technical Documentation

This SDK is designed for use by students, it contains functions which allow for easy access
to the UVLens servers to pull a variety of UV related data. To use it simply add it to your html file
as a script. This SDK has no dependencies other than some functions which are included in all major browsers
newer than IE 8.

| Function  | Description |
| ------------- | ------------- |
| test()  | Performs a few tests to check whether the SDK is working properly (eg can connect to server) and writes results to the console  |
| getCurrentUV(latitude, longitude)  | Returns the current UV Index as measured by the nearest sensor to a given latitude/longitude  |
| getUVForecast(latitude, longitude) | Returns an array of hourly UV Indices forecasting the UV level for today and the next three days |
| getBurntime(latitude, longitude) | Returns an estimate for how long it will take a person with a given skin type (search Fitzpatrick Skin Type) to burn at a given latitude/longitude |
| getUVMap() | Returns a colour coded PNG map of UV Levels around the world for the current hour |
| getUVMapForecast() | Returns an array of colour coded PNG maps for UVLevels for 24 hours starting from 6am on the current day |