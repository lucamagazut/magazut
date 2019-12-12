import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  validateForm(){
    return true;
  },

  materials:computed(function(){
    return this.store.peekAll('work-material');
  }),

  contraption_types:computed(function(){
    return this.store.peekAll('contraption-type');
  }),

  machines:computed(function(){
    return this.store.peekAll('machine');
  }),

  actions:{
    createContraption(){
      if(this.validateForm()){
        this.model.save().then((data)=>{
          alert('salvato');
          this.send('refreshAfterSuccess');
        })
        .catch(error=>{
          alert('Qualcosa è andato storto. Controlla i dati e riprova');
        });
      }
    }
  }
});
