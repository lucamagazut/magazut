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
            reject(JSON.parse(xhr.responseText));
          }
        }
      };
      xhr.open(method, url + query, true);
      xhr.setRequestHeader('Accept','application/vnd.api+json');
      xhr.send();
    });
  },

  makeCall(url, queryObj, methodType){
    if(methodType == 'GET'){
      return this.makeGet(url, queryObj, methodType);
    }else{
      return new Promise((resolve, reject) => {
        let query = queryObj;
        let xhr = new XMLHttpRequest();
        let method = methodType || 'POST';
        console.log('ajax method '+ method);

        xhr.onreadystatechange = function() {
          if (this.readyState == 4) {
            if(this.status == 200){
              resolve(JSON.parse(xhr.responseText));
            }else{
              reject(JSON.parse(xhr.responseText));
            }
          }
        };
        let postParams = {data:queryObj};
        xhr.open(method, url, true);

        xhr.setRequestHeader('Accept','application/vnd.api+json');
        xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

        // xhr.send(JSON.stringify(postParams));
        xhr.send(JSON.stringify(queryObj));

      });
    }

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
