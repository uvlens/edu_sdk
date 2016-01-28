window.uvlens = (function () {
    "use strict";
    
    var api = 'https://api.uvlens.com/api/Forecast';
    var key = 'edusdk';
    
    //this function is used internally by the sdk to send a get request to the server
    function apiGet(target, parameterString){
            var xmlhttp;
            
            if(!parameterString){ '?key=' + key };
            
            try{     
                          
                xmlhttp = new XMLHttpRequest();
                
                xmlhttp.open("GET", api+target+parameterString, false);
                xmlhttp.setRequestHeader("Accept", "application/json; charset=utf-8");
                xmlhttp.setRequestHeader("Accept-Datetime", "Fri, 15 Feb 2013 00:00:00 GMT");
                xmlhttp.setRequestHeader("Authorization", "edusdk");
                xmlhttp.send();
                
            }catch(error){          
                console.error('ERROR: server request failed, try running uvlens.test():\n' + error);
                return(null);    
            }  
            
            return xmlhttp.responseText;
    }
    
    
    //create uvlens object which contains the functions, the uvlens part of 'uvlens.getCurrentUV()' or similar
    var uvlens = {
        
        //function which can be used to test whether things are working in the sdk
        test: function () {
            var errorCount = 0;
            if(!window.XMLHttpRequest){
                errorCount++;
                console.error('ERROR: Your browser does not support XMLHttpRequest which is used by this sdk, please upgrade to any browser newer than IE7 to use this sdk');
            }
            
            if(!JSON){
                errorCount++;
                console.error('ERROR: Your browser does not support JSON encoding/decoding (requires IE8+, chrome 3+, firefox 3.1+, safari 4+ or any other modern browser)');
            }else{
                
            }
            
            if(errorCount == 0){
                var check = apiGet('');
                if(check){
                    errorCount++;
                    console.error('ERROR: Cannot connect to the uvlens server, check your internet connection')
                }else if(JSON || JSON.parse(check).StartTime || JSON.parse(check).StartTime < new Date(2000,1,1)){
                    errorCount++;
                    console.error('ERROR: Invalid response from server: \n' + check);
                }
            }
            
            if(errorCount > 0){
                alert('ERROR: Testing sdk failed, ' + errorCount + ' errors occured, check console for reasons');
            }else{
                console.log('uvlens sdk test passed');
            }
        }, 
        
        //this function 
        getCurrentUV: function (latitude, longitude){
            console.log('getting current uv level');
            var response = apiGet('/ForecastUTC', '?longitude=' + latitude + '&latitude=' + longitude + '&key=' + key);
            return JSON.parse(response).UVNow;
        },
        
        getForecast: function (latitude, longitude){
            console.log('getting four day forecast');
            var response = apiGet('/ForecastUTC', '?longitude=' + longitude + '&latitude=' + latitude + '&key=' + key);
            return JSON.parse(response).LocalForecast.uvi;
        },
        
        getBurnTime: function (latitude, longitude, skintype){
            console.log('getting burn time');
            var date = new Date().toJSON();
            var response = apiGet('/BurnTime', '?longitude=' + longitude + '&latitude=' + latitude + '&startTime=' + date + '&skintype=' + skintype + '&key=' + key);
            return JSON.parse(response).BurnTimeMinutes;
        },
        
        getUVMap: function (){
            console.log('getting current uv map');
            var response = apiGet('/PNGs', '?key=' + key);
            var date = new Date().toJSON();
            console.log(response);
            return JSON.parse(response).URL;
        },
        
        getUVMapForecast: function(){
            console.log('getting forecast uv map');
            var response = apiGet('/PNGs', '?key=' + key);
            console.log(response);
            return JSON.parse(response).URL;
        }
    };
     
    return uvlens;
}());