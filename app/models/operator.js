import DS from 'ember-data';
import { computed } from '@ember/object';


export default DS.Model.extend({
  first_name: DS.attr(),
  surname: DS.attr(),
  name:computed('surname',function(){
    if(this.first_name.toLowerCase() == 'undefined'){
      return '';
    }else{
      return this.surname + ' ' + this.first_name;
    }
  }),
});
