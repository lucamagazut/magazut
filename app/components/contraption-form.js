import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  selectedMaterial:0,
  selectedMachine:0,
  selectedContraptionTypes:0,
  actions:{
    updateSelectedMaterial(value){
      this.set('selectedMaterial', value);
    },
    updateSelectedMachine(value){
      this.set('selectedMachine', value);
    },
    updateSelectedContraptionTypes(value){
      this.set('selectedContraptionTypes', value);
    },
    createContraption(){
      this.createContraption();
    }
  }
});
