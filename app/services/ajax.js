import Service from '@ember/service';

export default Service.extend({
  makeGet(url, queryObj, methodType){
    return new Promise((resolve, reject) => {
      let query = this.serialize(queryObj);
      let xhr = new XMLHttpRequest();
      let method = methodType || 'GET';
      console.log('ajax method '+ method);

      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          if(this.status == 200){
            resolve(JSON.parse(xhr.responseText));
          }else{
            reject(xhr.statusText);
          }
        }
      };
      xhr.open(method, url + query, true);
      xhr.setRequestHeader('Accept','application/vnd.api+json');
      xhr.send();
    });
  },

  serialize(obj){
    let query = '?';
    let ele;
    let separator = '';

    for(ele in obj){
      query += separator + ele + '=' + obj[ele];
      separator = '&';
    }
    return query;
  },
});
