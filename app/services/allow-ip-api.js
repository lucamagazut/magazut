import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  ajax: service('ajax'),
  sendPassword(password){

    return this.ajax.makeCall(config.apiHostName + "/allow-ip", {password:password}, "GET");
  },

});
