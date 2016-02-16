window.uvlens = (function () {
    "use strict";
    
    var api = 'https://api.uvlens.com/api';
    var key = null;
    var minLongitude = 160;
    var maxLongitude = 187;
    var minLatitude = -57;
    var maxLatitude = -27;
    
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
            
            if(xmlhttp.status == 403){
                console.error('ERROR: You have not entered a valid key into uvlens.prepare(YOUR SDK KEY) please get a key from your school or learn how to request one at "github.com/uvlens/edu_sdk"')
            }else if(xmlhtt.status == 404){
                console.error('ERROR: UVLens api server not found, check your internet connection')
            }
            
            return xmlhttp.responseText;
    }
    
    //internal function for checking if user is within an area that works
    function checkLocation(latitude, longitude){
        if(longitude < 0){
            latitude+=360;
        }
        
        if(latitude > maxLatitude || latitude < minLatitude || longitude > maxLongitude || longitude < minLongitude){
            console.error('ERROR: The latitude/longitude you entered is not supported. This error should not occur if you entered a location within New Zealand');
            return false;
        }else{
            return true;
        }
    }
    
    //internal function to more simply check whether we have a key
    function hasKey(){
        if(key == null){
            return false;
            console.error("ERROR: you have not entered a key, please run uvlens.prepare('YOUR SDK KEY') before running any other function")
        }else{
            return true;
        }
    }
                    
    
    
    //create uvlens object which contains the functions, the uvlens part of 'uvlens.getCurrentUV()' or similar
    var uvlens = {
        
        //function which sets the key
        prepare: function (SDKKey) {
            key = SDKKey;
        },
        
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
            
            errorCount += hasKey() ? 0 : 1;
            
            if(errorCount == 0){
                var check = apiGet('/Forecast/ForecastUTC', '?longitude=1&latitude=1&key=' + key);
                if(!check){                   
                    
                        errorCount++;
                        console.error('ERROR: Cannot connect to the uvlens server, check your internet connection');
                    
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
        
        getDailyMessage: function (latitude, longitude) {
            if(!hasKey() || !checkLocation(latitude, longitude)){return null};
            
            var response = apiGet('/Combined', '?longitude=' + longitude + '&latitude=' + latitude + '&skintype=0' + '&key=' + key);
            return JSON.parse(response).DailyMessage;
        },
         
        getCurrentUV: function (latitude, longitude) {
            if(!hasKey() || !checkLocation(latitude, longitude)){return null};
            
            var response = apiGet('/Forecast/ForecastUTC', '?longitude=' + longitude + '&latitude=' + latitude + '&key=' + key);
            return JSON.parse(response).UVNow;
        },
        
        getForecastUV: function (latitude, longitude){
            if(!hasKey() || !checkLocation(latitude, longitude)){return null};
            
            var response = apiGet('/Forecast/ForecastUTC', '?longitude=' + longitude + '&latitude=' + latitude + '&key=' + key);
            
            var time = JSON.parse(response).LocalForecast.uvi;
            var timeShift = (-1)*(new Date().getTimezoneOffset()/60) - 12;
            
            //shift array so that it starts at 0am local time
            if(timeShift > 0){
                for(var i = 0; i < timeShift; i++){
                    time.unshift(0);
                }
            }else{
                for(var i = 0; i > timeShift; i--){
                    time.shift();
                }
            }
            
            
            return time;
        },
        
        getBurnTime: function (latitude, longitude, skintype){
            if(!hasKey() || !checkLocation(latitude, longitude)){return null};
            
            var date = new Date().toJSON();
            var response = apiGet('/Forecast/BurnTime', '?longitude=' + longitude + '&latitude=' + latitude + '&startTime=' + date + '&skintype=' + skintype + '&key=' + key);
            
            if(!checkNZ(latitude, longitude, 'uvlens.getBurnTime')){return null}
            
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