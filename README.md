#UVLens
####SDK for schools

Welcome to the UVLens SDK for schools. 

This SDK, or Software Development Kit, is a javascript file which includes a number of functions so that students can easily make use of the UVLens servers to
access UV data such as live UV measurements, forecasts and burn time estimates. We hope that by teaching students to make use of this data, and the sensors distributed to various schools,
we can help teach students about the dangers of UV and how to better protect themselves.

###Competition
UVLens is running a competition based on using this SDK to create a user-friendly way for your school to interpret and display UV data on their website.
The first step in is completing the tutorial described below which will teach you the basics.
Then you can have a look at the project brief and start thinking about what you want to create.

The tutorial and project both assume you have some basic knowledge of HTML, CSS and Javascript but there are some resources for learning about this in the project brief if you haven't learned these yet. 

##Tutorial:
To begin the tutorial [Click here](https://github.com/uvlens/edu_sdk/blob/master/Tutorial.md) or visit: https://github.com/uvlens/edu_sdk/blob/master/Tutorial.md
This tutorial covers the basics of using the SDK to get and display UV data from our servers, the tutorial is designed to take a few hours and should be completed in a classroom setting,

##Project:
To view the competition brief [Click here](https://github.com/uvlens/edu_sdk/blob/master/Project.md) or visit: https://github.com/uvlens/edu_sdk/blob/master/Project.md
This brief contains details of the project as well as links to material which will help you learn everything you need to know. 
The project is designed to be completed in your own time over the course of a semester, either on your own or in a small group.

#Technical Documentation
| Function  | Description |
| ------------- | ------------- |
| test()  | Performs a few tests to check whether the SDK is working properly (eg can connect to server) and writes results to the console  |
| getCurrentUV(latitude, longitude)  | Returns the current UV Index as measured by the nearest sensor to a given latitude/longitude  |
| getForecastUV(latitude, longitude) | Returns an array of hourly UV Indices forecasting the UV level for the next 96 hours (4 days) starting today at 12:00 am (midday) local time |
| getBurntime(latitude, longitude) | Returns an estimate for how long it will take a person with a given skin type (search Fitzpatrick Skin Type) to burn at a given latitude/longitude |
