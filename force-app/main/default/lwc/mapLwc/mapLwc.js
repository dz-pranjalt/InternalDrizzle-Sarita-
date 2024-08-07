import { LightningElement,track,wire } from 'lwc';
import getMapAccpunts from '@salesforce/apex/getMapmarkerData.getMapAccpunts';
export default class MapLwc extends LightningElement {

    // mapMarker = [

    //     {
    //         location:{
    //             City:'Dhule',
    //             Country:'India',
    //             PostalCode:'424002',
    //             State:'MH',
    //             Street:'Ambhedhkar statue'
    //         },
    //         value:'location001',
    //         title:'Kundane War Map',
    //         description:'',
    //         icon:'standard:account'
    //     }
    // ];

    //Want to render object of object inside lwc need to decorate variable as track
    @track mapMarkers;
    
    @wire(getMapAccpunts)
    wiredData({ error, data }) {
      if (data) {
        console.log('Data', data);
        data.forEach(x => {
            //TODO : currentItem]]
           
            //Object of obj {{}}
            let mapPbj = {
                location:{
                    City:x.ShippingCity,
                    Country:x.ShippingCountry,
                    PostalCode:x.ShippingPostalCode,
                    State:x.ShippingState,
                    Street:x.ShippingStreet
                },
                value:x.Name,
                title:x.Name,
                description:x.Description,
                icon:'standard:account'
            }
            if(!this.mapMarkers){
                this.mapMarkers = [];
            }
            this.mapMarkers.push(mapPbj); 
            
        });
      } else if (error) {
        console.error('Error:', error);
      }
    }
    handleMarkerSelect(event){
        alert(event.target.selectedMarkerValue)
    }
}