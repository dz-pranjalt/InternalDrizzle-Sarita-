import { api, LightningElement, track } from 'lwc';

export default class OwnerParent extends LightningElement {
@api userName;
@api records;
    handleChange(event){
  const name = event.target.value;
  this.userName = name;
  console.log('username ',this.userName )
   const evt = new CustomEvent('search',{
    detail:this.userName
   });
   this.dispatchEvent(evt);
    }
}