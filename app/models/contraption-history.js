import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  transaction_time: DS.attr('data-ita'),
  involved_quantity: DS.attr(),
  contraption_id: DS.attr(),
  transaction_id:DS.attr('Number'),
  transaction_type:computed('transaction_id',function(){
      switch (this.transaction_id) {
        case 0: return 'Errore'
          break;
        case 1: return 'Carico articolo'
          break;
        case 2: return 'Scarico articolo'
          break;
        case 3: return 'Creazione articolo'
          break;
        case 4: return 'Modifica articolo'
          break;
        case 5: return 'Rimozione articolo'
          break;
        case 1: return 'Prestare articolo'
          break;
        case 1: return 'Ritorno articolo'
          break;
        default:return ''

      }
  }),

  employee_id: DS.attr('String'),
  employee_name: DS.attr('String'),
  employee_second_name: DS.attr(),
  employee_complete_name:computed('employee_name',function(){
    if(this.employee_name.toLowerCase() == 'undefined'){
      return 'Operatore computer magazzino';
    }else{
      return this.employee_name + ' ' + this.employee_second_name;
    }
  }),
  contraption_denomination: DS.attr(),
  contraption_id_code: DS.attr()
});
