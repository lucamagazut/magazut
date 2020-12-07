import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../../config/environment';


export default Route.extend({
  ajax: service('ajax'),

  actions:{
    onSandMailButtonClick(email, subject, text){
      this.ajax.makeCall(config.apiHostName + "/send-mail", {email:email, subject:subject, text:text}, 'POST')
      .then(()=>{
        this.send('showSuccessAlert');
      })
      .catch((error)=>{
        this.send('showError',error.errors[0].detail);
      });
    }
  }
});
