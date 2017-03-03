(function(){
"use strict";







function __row(data){
    
    this.id = ff.unique_id(6);

    this.data={};
    this.data.name='';
    this.data.m1 = '';
    this.data.m2 = '';
    this.data.m3 = '';
    this.data.m4 = '';
    this.data.m5 = '';
    this.data.amount = 1;


    if(typeof data !== 'undefined'){
        for(let prop in data){
            let value = data[prop];

            this.data[prop] = value;
        }
    }


    this.bind('name');
    this.bind('m1');
    this.bind('m2');
    this.bind('m3');
    this.bind('m4');
    this.bind('m5');
    this.bind('amount');

}




__row.prototype.toString = function(){
    let html='<tr>';

    html+='<td class="name"><input role="row_value"   row_id="'+this.id+'"   field="name"   type="text" value="'+this.data.name+'" placeholder="名稱"></td>';
    html+='<td class="m1"><input role="row_value"   row_id="'+this.id+'"   field="m1"     type="text" value="'+this.data.m1+'"  placeholder="材料1"></td>';
    html+='<td class="m2"><input role="row_value"   row_id="'+this.id+'"   field="m2"     type="text" value="'+this.data.m2+'"  placeholder="材料2"></td>';
    html+='<td class="m3"><input role="row_value"   row_id="'+this.id+'"   field="m3"     type="text" value="'+this.data.m3+'"  placeholder="材料3"></td>';
    html+='<td class="m4"><input role="row_value"   row_id="'+this.id+'"   field="m4"     type="text" value="'+this.data.m4+'"  placeholder="材料4"></td>';
    html+='<td class="m5"><input role="row_value"   row_id="'+this.id+'"   field="m5"     type="text" value="'+this.data.m5+'"  placeholder="材料5"></td>';
    html+='<td class="amount"><input role="row_value"   row_id="'+this.id+'"   field="amount" type="number" min=0  value="'+this.data.amount+'" ></td>';

    html+='</tr>';

    return html;
};




__row.prototype.bind = function(field){

    let row = this;

    Object.defineProperty(this, field, {
        get : function(){
            return row.data[field];
            //return ff('#'+id+'_name').val();
        },

        set : function(value){
            row.data[field]=value;
            console.log('setter', field, value);
            let $el = ff('input[row_id="'+row.id+'"][field="'+field+'"]');
            let domValue = $el.val();
            if(domValue !== value){
                $el.value(value);
            }
        }
    });
}




window.__row=__row;
}());