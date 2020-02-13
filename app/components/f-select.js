import Component from '@ember/component';
import $ from 'jquery';
import { observer } from '@ember/object';


export default Component.extend({

  value:null,
  tagName:'select',

  change(){
    this.set('value',this.getValueSelected());
  },

  watchValue:observer('value',function(){
    this.setSelected();
  }),

  didRender(){
    this._super(...arguments);
    this.setSelected();
  },

  getValueSelected(){
    return $('#'+ this.elementId).children().filter(':selected').attr('value');
  },

  setSelected(){
    // only for init
    var value = this.value;
    const _t = this;
    var $options = $('#'+ this.elementId).children();

    if($options.length){
      if(!$options.filter(`[value=${value}]`)[0].selected){
        $options.removeAttr('selected');
        $options.filter(`[value=${value}]`).attr('selected','selected')[0].selected = true;
      }
    }
  }
});
