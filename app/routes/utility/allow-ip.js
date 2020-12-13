import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  allowIpApi: service('allow-ip-api'),


  actions:{
    sendAllowIpPassword(password){
      this.allowIpApi.sendPassword(password).then((resp) => {
        this.send('reloadApp');
      },
        (error) =>{
          this.send('showError', error);
        }
      )
    }
  }
});
