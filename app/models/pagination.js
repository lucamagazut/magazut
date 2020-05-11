import Model from '@ember-data/model';
import DS from 'ember-data';
import { computed } from '@ember/object';

export default Model.extend({
  current_page:DS.attr('number'),
  total_pages:DS.attr('number'),
  item_for_page:DS.attr('number'),
  is_next:computed('current_page','total_pages', function(){
    return this.current_page < this.total_pages;
  }),
  is_prev:computed('current_page','total_pages', function(){
    return this.current_page > 0;
  })
});
