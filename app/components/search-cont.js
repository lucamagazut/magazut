import Component from '@ember/component';

export default Component.extend({
  actions:{
    onEnterInput(input){
      document.getElementById(input).click();
    }
  }
});
