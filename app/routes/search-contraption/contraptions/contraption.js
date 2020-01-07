import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  model(params){
    return this.store.peekRecord('contraption', params.contraption_id);
  },
  actions:{

  }
});
