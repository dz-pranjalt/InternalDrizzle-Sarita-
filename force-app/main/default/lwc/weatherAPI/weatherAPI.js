import { LightningElement,api } from 'lwc';
import getWeather from '@salesforce/apex/WeatherAPI.getWeather';
export default class WeatherAPI extends LightningElement {
    city;
    condition;
    apiEndpoint;
    imageURL;  
    error; 
handleonchange(event){
    this.cityVal = event.target.value;
}
buttonClick(event){
     const apiKey = '03d825d2c0c6424089281510230608';
        const city = this.cityVal;
         this.apiEndpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
getWeather({city :this.apiEndpoint})
.then((result)=>{
    console.log('result ',JSON.parse(result));
        let parsedData = JSON.parse(result);
            this.imageURL = parsedData.current.condition.icon;
             console.log('imageURL ',this.imageURL);
            this.condition = parsedData.current.condition.text;
})
.catch((error)=>{
 console.log('error ',error.body.message);
 this.error = error.body.message;
})

}
}