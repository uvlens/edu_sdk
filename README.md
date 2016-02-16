#UVLens
####SDK for schools

Welcome to the UVLens SDK for schools. 

This SDK, or Software Development Kit, is a javascript file which includes a number of functions so that students can easily make use of the UVLens servers to
access UV data such as live UV measurements, forecasts and burn time estimates. We hope that by teaching students to make use of this data, and the sensors distributed to various schools,
we can help teach students about the dangers of UV and how to better protect themselves.

We recommend viewing this tutorial online at https://github.com/uvlens/edu_sdk as this will ensure you get the latest version as well as allowing you to copy-paste pieces of code and click links.

To get started with the tutorial [click](https://github.com/uvlens/edu_sdk/blob/master/Tutorial.md) here or follow this link: https://github.com/uvlens/edu_sdk/blob/master/Tutorial.md

To find out about the competition we're running simply [click](https://github.com/uvlens/edu_sdk/blob/master/Project.md) here or follow this link: https://github.com/uvlens/edu_sdk/blob/master/Project.md

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
