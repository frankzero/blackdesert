(function(){


"use strict";

function __grid(render_id){
    this.render_id=render_id;
    this.render_list_id = ff.unique_id(6);
    this.rows=[];
}




__grid.prototype.addRow=function(){
    this.rows.push(new __row);
    this.render();
};




__grid.prototype.removeRow = function(row_id){
    
    for (let i=0,imax=this.rows.length; i < imax; i++) { 
        let row=this.rows[i];
        
        if(row.id === row_id){
            this.rows.splice(i, 1);
        }
    }


    this.render();
};




__grid.prototype.getRow = function(row_id){
    
    for (let i=0,imax=this.rows.length; i < imax; i++) { 
        let row=this.rows[i];
        if(row.id === row_id) return row;
    }

    return false;
};





__grid.prototype.getData=function(){

    let data=[];

    for (let i=0,imax=this.rows.length; i < imax; i++) { 
        let row=this.rows[i];
        data.push(row.data);
    }

    return data;
};





__grid.prototype.autoload = function(){

    if(window.localStorage['data']){
        data = window.localStorage['data'];
        data = JSON.parse(data);
    }
    grid.loadData(data);


};



__grid.prototype.save = function(){

    let data = this.getData();

    console.log('save', data);

    window.localStorage['data'] = JSON.stringify(data, null, 2);

    console.log(JSON.stringify(data, null, 2));


};





__grid.prototype.loadData = function(data){

    this.rows=[];

    for (let i=0,imax=data.length; i < imax; i++) { 
        let d=data[i];
        this.rows.push(new __row(d));
    }


    this.render();
    return;

};






__grid.prototype.update = function(){
    this.updateGrid();
    this.updateList();
};





__grid.prototype.updateGrid=function(){

};




__grid.prototype.updateList=function(){
    let html='';


    html+=this.makeList();


    ff('#'+this.render_list_id).html(html);
};





__grid.prototype.render=function(){
    let html = '';
    let grid = this;

    html='<table class="grid">';
    html+='<tr>';
    html+='<td>物品</td>';
    html+='<td>材料1</td>';
    html+='<td>材料2</td>';
    html+='<td>材料3</td>';
    html+='<td>材料4</td>';
    html+='<td>材料5</td>';
    html+='<td>數量</td>';
    html+='</tr>';

    for (let i=0,imax=this.rows.length; i < imax; i++) { 
        let row=this.rows[i];
        html+=row.toString();
    }

    html +='</table>';

    html +='<div id="'+grid.render_list_id+'">';
    html += this.makeList();
    html += '</div>';



    ff('#'+this.render_id).html(html);

    this.bind();
    
};





__grid.prototype.bind = function(){

    let grid=this;

    let handle=function(e){
        
        let row_id = ff(this).attr('row_id');

        let row = grid.getRow(row_id);
        let field = ff(this).attr('field');
        //console.log(prop);
        row.data[field] = this.value;

        grid.update();
        //console.log(row.data, field, this.value);

    };

    ff('input[role="row_value"]').change(handle);
    ff('input[role="row_value"]').keyup(handle);
};




__grid.prototype.makeList = function(){


    let html = '';
    let list = this.getList();

    


    
    for(let name in list){
        let amount = list[name];
        
        html+='<div class="listitem">';
        html+='<div class="item1">'+name+'</div>';
        html+='<div class="item2">'+amount+'</div>';
        html+='</div>';

    }



    return html;
};



__grid.prototype.getList = function(){
    let map = {};

    for (let i=0,imax=this.rows.length; i < imax; i++) { 
        let row=this.rows[i];
        let data = row.data;

        for( let prop in data){
            if(prop === 'name') continue;
            if(prop === 'amount') continue;

            let amount=1;
            let value = data[prop];


            value=value.replace(/ /g, '');

            if(value==='') continue;


            if(value.indexOf('x') !== -1){
                value = value.split('x');
                amount = value[1]-0;
                value=value[0];
            }

            

            let c = amount * data.amount;


            if(map[value]){
                c = c + map[value];
            }

            map[value] = c;


            //console.log('prop', prop, value, c);

        }
        
    }



    return map;
};




window.__grid=__grid;
}());
