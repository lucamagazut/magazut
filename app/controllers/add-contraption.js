import Controller from '@ember/controller';

export default Controller.extend({
  validateForm(){
    return true;
  },

  actions:{
    createContraption(){
      if(this.validateForm()){
        this.model.save().then((data)=>{
          alert('salvato');
          this.send('refreshAfterSuccess');
        })
        .catch(error=>{
          alert('there is a problem, retry');
        });
      }
    }
  }
});
