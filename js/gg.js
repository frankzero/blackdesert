
(function(){
"use strict";

let jsonData=[
  {
    "name": "雜技藝人的血液",
    "m1": "狼血x2",
    "m2": "精靈的葉子 x1",
    "m3": "黑暗的粉 x1",
    "m4": "清液體試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "暴君的血液",
    "m1": "巨魔血x2",
    "m2": "修道士的樹枝 x1",
    "m3": "野蠻的痕跡 x1",
    "m4": "純粹的粉試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "金屬溶解劑",
    "m1": "粗糙的石塊 x4",
    "m2": "野蠻的痕跡 x2",
    "m3": "熔化的鐵塊 x3",
    "m4": "清液體試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "合板強化劑",
    "m1": "血紅樹木節 x3",
    "m2": "冷杉樹樹液 x4",
    "m3": "大地的痕跡 x3",
    "m4": "純粹的粉試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "皮油料",
    "m1": "丹楓樹樹液 x3",
    "m2": "飛翔的痕跡 x3",
    "m3": "黑暗的粉 x2",
    "m4": "清液體試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "寶石研磨劑",
    "m1": "祈願的痕跡 x2",
    "m2": "純水x6",
    "m3": "加工煤炭 x4",
    "m4": "純粹的粉試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "清液體試藥",
    "m1": "雜草x1",
    "m2": "黎明草 x1",
    "m3": "純水x1",
    "m4": "食鹽 x1",
    "m5": "",
    "amount": "3"
  },
  {
    "name": "純粹的粉試藥",
    "m1": "雜草x1",
    "m2": "銀灰杜鵑花 x1",
    "m3": "純水x1",
    "m4": "砂糖 x1",
    "m5": "",
    "amount": "3"
  },
  {
    "name": "止血的靈藥",
    "m1": "雲蘑菇 x1",
    "m2": "白蠟樹樹液 x1",
    "m3": "純水x3",
    "m4": "純粹的粉試藥 x1",
    "m5": "",
    "amount": 1
  },
  {
    "name": "海狗的靈藥",
    "m1": "狼血x4",
    "m2": "侏儒蘑菇 x3",
    "m3": "白樺樹樹液 x1",
    "m4": "純水 x5",
    "m5": "",
    "amount": 1
  }
];



function __grid(render_id){
    this.render_id = render_id;
    this.items=[];

    this.load();

    this.render();

}
 



__grid.prototype.add=function(){
    let item = new __item;
    this.items.push(new __item);
    this.render();
};




__grid.prototype.clear=function(){
    this.items=[];
    this.render();
}



__grid.prototype.render=function(){


    let html = '';
    let grid = this;

    html='<table>';

    for (let i=0,imax=this.items.length; i < imax; i++) { 
        let item=this.items[i];
        html+=item.toString();
    }

    html+='</table>';


    let list = this.list();


    html+='<ul>';
    for(let name in list){
        let amount = list[name];
        html+='<li>';
        html+=name + ' x ' +amount;
        html+='</li>';

    }
    html+='</ul>';



    ff('#'+this.render_id).html(html);


    ff('input[role="item_value"]').keyup(function(e){
        
        let item_id = ff(this).attr('item_id');

        let item = grid.getItem(item_id);
        let prop = ff(this).attr('prop');
        //console.log(prop);
        item[prop] = this.value;

    });




};




__grid.prototype.getItem = function(id){
    for (let i=0,imax=this.items.length; i < imax; i++) { 
        let item=this.items[i];
        if(item.id === id) return item;
    }

    return false;
}



__grid.prototype.toData=function(){

    let data=[];

    for (let i=0,imax=this.items.length; i < imax; i++) { 
        let item=this.items[i];
        data.push(item.getData());
    }

    return data;
};



__grid.prototype.getData=function(){

    let data=[];

    for (let i=0,imax=this.items.length; i < imax; i++) { 
        let item=this.items[i];
        data.push(item.getData());
    }

    return JSON.stringify(data, null, 2);
};



__grid.prototype.save=function(){

    let data = this.toData();
    //console.log(data);
    window.localStorage['grid'] = JSON.stringify(data, null, 2);
};




__grid.prototype.list = function(){

    let map = {};

    for (let i=0,imax=this.items.length; i < imax; i++) { 
        let item=this.items[i];
        let data = item.getData();

        for( let prop in data){
            if(prop === 'name') continue;
            if(prop === 'amount') continue;

            let amount=1;
            let value = data[prop];

            if(value==='') continue;


            if(value.indexOf('x') !== -1){
                value = value.split('x');
                amount = value[1]-0;
                value=value[0];
            }

            value=value.replace(/ /g, '');

            let c = amount * data.amount;


            if(map[value]){
                c = c + map[value];
            }

            map[value] = c;


            //console.log('prop', prop, value, c);

        }
        
    }



    return map;
    //console.log(map);
};




__grid.prototype.load = function(){

    //if(!window.localStorage.getItem('grid')) return;

    //let data = window.localStorage.getItem('grid');

    let data = jsonData;

    //data = JSON.parse(data);

    for (let i=0,imax=data.length; i < imax; i++) { 
        let d=data[i];
        this.items.push(new __item(d));
    }
};




function __item(_data){

    let id=ff.unique_id(10);
    let item = this;

    let data={};
    data.name='';
    data.m1 = '';
    data.m2 = '';
    data.m3 = '';
    data.m4 = '';
    data.m5 = '';
    data.amount = 1;
    if( typeof _data!=='undefined' ){
        data = _data;
    }
    


    Object.defineProperty(item, 'name', {
        get : function(){
            return ff('#'+id+'_name').val();
        },

        set : function(value){
            data.name=value;
            ff('#'+id+'_name').val(value);
        }
    });



    Object.defineProperty(item, 'm1', {
        get : function(){
            return ff('#'+id+'_m1').val();
        },

        set : function(value){
            data.m1=value;
            ff('#'+id+'_m1').val(value);
        }
    });


    Object.defineProperty(item, 'm2', {
        get : function(){
            return ff('#'+id+'_m2').val();
        },

        set : function(value){
            data.m2=value;
            ff('#'+id+'_m2').val(value);
        }
    });


    Object.defineProperty(item, 'm3', {
        get : function(){
            return ff('#'+id+'_m3').val();
        },

        set : function(value){
            data.m3=value;
          ff('#'+id+'_m3').val(value);
        }
    });


    Object.defineProperty(item, 'm4', {
        get : function(){
            return ff('#'+id+'_m4').val();
        },

        set : function(value){
            data.m4=value;
            ff('#'+id+'_m4').val(value);
        }
    });



    Object.defineProperty(item, 'm5', {
        get : function(){
            return ff('#'+id+'_m5').val();
        },

        set : function(value){
            data.m5=value;
            ff('#'+id+'_m5').val(value);
        }
    });



    Object.defineProperty(item, 'amount', {
        get : function(){
            return ff('#'+id+'_amount').val();
        },

        set : function(value){
            data.amount=value;
            ff('#'+id+'_amount').val(value);
        }
    });


    this.toString=function(){
        let html='<tr>';

        html+='<td><input role="item_value" item_id="'+id+'" prop="name"   id="'+id+'_name" type="text" value="'+data.name+'" placeholder="名稱"></td>';
        html+='<td><input role="item_value" item_id="'+id+'" prop="m1"     id="'+id+'_m1" type="text" value="'+data.m1+'"></td>';
        html+='<td><input role="item_value" item_id="'+id+'" prop="m2"     id="'+id+'_m2" type="text" value="'+data.m2+'"></td>';
        html+='<td><input role="item_value" item_id="'+id+'" prop="m3"     id="'+id+'_m3" type="text" value="'+data.m3+'"></td>';
        html+='<td><input role="item_value" item_id="'+id+'" prop="m4"     id="'+id+'_m4" type="text" value="'+data.m4+'"></td>';
        html+='<td><input role="item_value" item_id="'+id+'" prop="m5"     id="'+id+'_m5" type="text" value="'+data.m5+'"></td>';
        html+='<td><input role="item_value" item_id="'+id+'" prop="amount" id="'+id+'_amount" type="text" value="'+data.amount+'"></td>';

        html+='</tr>';

        return html;
    };



    this.getData = function(){
        return data;
    };


    this.id=id;
}











window.__grid=__grid;
}());