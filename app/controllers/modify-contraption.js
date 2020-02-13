import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams:['c_id'],
  c_id:null,

  materials:computed(function(){
    return this.store.peekAll('work-material');
  }),

  contraptionTypes:computed(function(){
    return this.store.peekAll('contraption-type');
  }),

  machines:computed(function(){
    return this.store.peekAll('machine');
  })
});
