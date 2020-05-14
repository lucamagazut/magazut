import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    c_id: {
      refreshModel: true
    }
  },
  beforeModel: function(transition){
    let contraption_id = transition.to.queryParams.c_id;
    this.contraption_id = contraption_id || '';
  },
  model(){
    // return this.store.peekRecord('contraption',this.contraption_id);
    return this.store.findRecord('contraption',this.contraption_id);
  },
  validateForm(){
    return true;
  },
  deactivate(){
    this.currentModel.rollbackAttributes();
  },
  actions:{
    updateContraption(){
      if(this.validateForm()){
        this.controller.get('model').save().then((data)=>{
          // alert('salvato');
          this.transitionTo('search-contraption');
          this.send('showSuccessAlert')
          // this.send('refreshAfterSuccess');
        })
        .catch(error=>{
          this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
        });
      }
    },
    deleteContraption(){
      if(window.confirm('Sei sicuro di eliminare?')){
        this.controller.get('model').destroyRecord().then(data =>{
          this.send('showSuccessAlert')
          this.transitionTo('search-contraption');
        })
        .catch(error=>{
          alert('Qualcosa è andato storto. Controlla i dati e riprova');
        });
      };
    }
  }
});
