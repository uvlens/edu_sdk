#UVLens
####SDK for schools

Welcome to the UVLens SDK for schools. 


#Exercises:

&nbsp;
####_Required Knowledge_
- Basic HTML (Buttons, Text, Images, Scripts)
- Basic Javascript (Functions, Variables)
- Javascript Arrays
- Controlling HTML Elements with Javascript (document.getElementByID())

######_Outline what the SDK does, what SDK means and what UVLens is. (introduction)_


##Getting Started:
######_How to download the things, use the sdk testing page we include or consoleto try some API calls, what the exercises are_

##Exercise 1:
######_Create a web page and script which uses the SDK to pull some data and write to the console (find current UV at your school, find forecast)_

##Exercise 2:
######_Create dial-like interface to see uv now and forecasted uv_

##Exercise 3:
######_Create simplified skin type quiz and work out burn time_

##Exercise 4:
######_Get and show UV Map_


#Technical Documentation

This SDK is designed for use by students, it contains functions which allow for easy access
to the UVLens servers to pull a variety of UV related data. To use it simply add it to your html file
as a script. This SDK has no dependencies other than some functions which are included in all browsers
newer than IE 8.

| Function  | Description |
| ------------- | ------------- |
| test()  | Performs a few tests to check whether the SDK is working properly (eg can connect to server) and writes results to the console  |
| getCurrentUV(latitude, longitude)  | Returns the current UV Index as measured by the nearest sensor to a given latitude/longitude  |
| getUVForecast(latitude, longitude) | Returns an array of hourly UV Indices forecasting the UV level for today and the next three days |
| getBurntime(latitude, longitude) | Returns an estimate for how long it will take a person with a given skin type (search Fitzpatrick Skin Type) to burn at a given latitude/longitude |
| getUVMap() | Returns a colour coded PNG map of UV Levels around the world for the current hour |
| getUVMapForecast() | Returns an array of colour coded PNG maps for UVLevels for 24 hours starting from 6am on the current day |