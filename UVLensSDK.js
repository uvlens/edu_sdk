window.uvlens = (function () {
    "use strict";
    
    var api = 'https://api.uvlens.com/api/Forecast';
    var key = 'edusdk';
    
    //this function is used internally by the sdk to send a get request to the server
    function apiGet(target, parameterString, onCompletion){
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
            }
            
            if(errorCount == 0){
                var check = apiGet('/ForecastUTC', '?longitude=1&latitude=1&key=' + key);
                if(!check){
                    errorCount++;
                    console.error('ERROR: Cannot connect to the uvlens server, check your internet connection')
                }else if(!JSON || !JSON.parse(check).StartTime){
                    errorCount++;
                    console.error('ERROR: Invalid response from server: \n' + check);
                }
            }
            
            if(errorCount > 0){
                alert('ERROR: Issues were found while testing the sdk, ' + errorCount + ' errors occured, check console for details');
            }else{
                console.log('uvlens sdk test passed');
            }

        }, 
        
        //this function 
        getCurrentUV: function (latitude, longitude){
            console.log('getting current uv level');
            var response = apiGet('/ForecastUTC', '?longitude=' + longitude + '&latitude=' + latitude + '&key=' + key);
            return JSON.parse(response).UVNow;
        },
        
        getForecastUV: function (latitude, longitude){
            console.log('getting four day forecast');
            var response = apiGet('/ForecastUTC', '?longitude=' + longitude + '&latitude=' + latitude + '&key=' + key);
            return JSON.parse(response).LocalForecast.uvi;
        },
        
        getBurnTime: function (latitude, longitude, skintype){
            console.log('getting burn time');
            var date = new Date().toJSON();
            var response = apiGet('/BurnTime', '?longitude=' + longitude + '&latitude=' + latitude + '&startTime=' + date + '&skintype=' + skintype + '&key=' + key);
            return JSON.parse(response).BurnTimeMinutes;
        }//,
        
        /*getUVMap: function (){
            console.log('getting current uv map');
            var response = JSON.parse(apiGet('/PNGs', '?key=' + key));
            
            var date = new Date(); date.setMinutes(0); date.setMinutes(0);
            var dateWithoutZone = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0 , 0)
            var jDate = dateWithoutZone.toJSON();
            jDate = jDate.substr(0, jDate.length - 5);
            
            for(var i = 0 ; i < response.length; i++){
                if(jDate == response[i].ForecastTime){
                    return response[i].URL;
                }  
            }
            
            console.log('ERROR: failed to get UV Map for current time, try running uvlens.test()');
            return null;
        },
        
        getUVMapForecast: function(){
            console.log('getting current uv map');
            var response = JSON.parse(apiGet('/PNGs', '?key=' + key));
            
            var date = new Date(); date.setMinutes(0); date.setMinutes(0);
            var dateWithoutZone = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0 , 0)
            var jDate = dateWithoutZone.toJSON();
            jDate = jDate.substr(0, jDate.length - 5);
            
            var maps = [];
            
            var j = 0;
            for(var i = 0 ; i < response.length; i++){
                if(jDate.substr(0, 11) == response[i].ForecastTime.substr(0, 11)){
                    maps[j] = {map: response[i].URL, date: response[i].ForecastTime};
                    j++;
                }  
            }
            
            if(maps.length > 0){
                return maps;
            }
            
            console.log('ERROR: failed to get UV Map for current time, try running uvlens.test()');
            return null;
        }*/
    };
     
    return uvlens;
}());