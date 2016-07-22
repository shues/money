function init(){
    init_dat();
    load_source();
    load_nalik();
    load_invest();
    load_report();
}

function init_dat(){
    var naw_dat = new Date();
    show_data(naw_dat);
}

function load_source(){
    var url = "/serv/get_sources.php";
    ajax_f(url,'text',show_source);
}

function show_source(par){
    var spisok = document.getElementById('plus_reason');
    var mass = par.split(';');
    for(var i=0; i< mass.length-1; i++){
        var elem = document.createElement('option');
        var elem_mass = mass[i].split(':');
        elem.value = elem_mass[0];
        elem.textContent = elem_mass[1];
        spisok.appendChild(elem);
    }
}

function load_nalik(){
    var url = "/serv/give_nal.php";
    ajax_f(url,"text",show_nalik);
}

function show_nalik(par){
    document.getElementById('free_nal').textContent = par;
}

function load_invest(){
    var url = "/serv/get_invest.php"
    ajax_f(url,'text',show_invest);
}

function show_invest(par){
    var parent_el = document.getElementById('body');
    var mass_old_elem = document.getElementsByClassName('invest');
    for(var i=mass_old_elem.length; i>2; i--){
        parent_el.removeChild(mass_old_elem[i-1]);
    }
    
    var mass = par.split(';');
    for(var i=0; i<mass.length-1; i++){
        var mass_elem = mass[i].split(':');
        var elem_value = (mass_elem[4]==''?0:parseInt(mass_elem[4]))- (mass_elem[5]==''?0:parseInt(mass_elem[5]));
        if(mass_elem[2] == 0){
            var elem = document.getElementById('invest_short').cloneNode(true);
        }else{
            var elem = document.getElementById('invest_long').cloneNode(true);
            elem.children[6].max = mass_elem[3];
            elem.children[6].value = elem_value;
            elem.children[4].textContent = mass_elem[3];
        }
        elem.id = mass_elem[0];
        elem.children[1].textContent = mass_elem[1]+": ";
        
        elem.children[2].textContent = elem_value;
        //elem.children[4].value = mass_elem[3];
        elem.style.display = "block";
        parent_el.appendChild(elem);
    }
}

function load_report(){
    var url= "/serv/get_report.php";
    ajax_f(url,"text",show_report);
}

function show_report(par){
    var pel = document.getElementById('report_table');
    var mass = par.split(';');
    for(var i=0; i<mass.length-1; i++){
        var mass_el = mass[i].split(':');
        var str = document.getElementById('main_rep_str').cloneNode(true);
        str.children[0].textContent = mass_el[0].substring(8) + '.' + mass_el[0].substring(5,7);
        str.children[1].textContent = mass_el[1];
        str.children[2].textContent = mass_el[2];
        pel.appendChild(str);
    }
}

function plus_data(){
    var naw_dat = document.getElementById('oper_dat').textContent;
    var d_dat = naw_dat.substring(0,2);
    var m_dat = naw_dat.substring(3,5);
    var y_dat = naw_dat.substring(6,10);
    d_dat++;
    m_dat--;
    naw_dat = new Date(y_dat, m_dat, d_dat);
    show_data(naw_dat);
}

function minus_data(){
    var naw_dat = document.getElementById('oper_dat').textContent;
    var d_dat = naw_dat.substring(0,2);
    var m_dat = naw_dat.substring(3,5);
    var y_dat = naw_dat.substring(6,10);
    d_dat--;
    m_dat--;
    naw_dat = new Date(y_dat, m_dat, d_dat);
    show_data(naw_dat);
}

function show_data(dat){
    var d_dat = add_zero(dat.getDate());
    var m_dat = add_zero(dat.getMonth()+1);
    var y_dat = add_zero(dat.getFullYear());
    var str = d_dat + '.' + m_dat + '.' + y_dat;
    document.getElementById('oper_dat').textContent = str;
}
    
function add_zero(par){
    if(par<10){
        par = '0'+par;
    }
    return par;
}

function add_num(){
    var dat = document.getElementById('oper_dat').textContent;
    var year_p = dat.substring(6);
    var month_p = dat.substring(3,5);
    var day_p = dat.substring(0,2);
    dat = year_p + "-" + month_p + "-" + day_p;
    var sum_prih = document.getElementById('sum_prih').value;
    var src_prih = document.getElementById('plus_reason').value;
    var comm = document.getElementById('prih_comment').value;
    var url = "/serv/add_prih.php?sum_prih="+sum_prih+"&src_prih="+src_prih+"&comm="+comm+"&dat="+dat;
    ajax_f(url, 'text', ok_prih);
}

function ok_prih(par){
    if(par=='ok'){
        var sum_prih = document.getElementById('sum_prih').value = '';
        var comm = document.getElementById('prih_comment').value = '';
    }
}

function change_type_invest(){
    var flag = document.getElementById('srok_i');
    if(flag.checked){
        document.getElementById('need_l').style.display = 'block';
    }else{
        document.getElementById('need_l').style.display = 'none';
    }
}

function open_form(){
    document.getElementById('pelena').style.display = "block";
}

function close_form(){
    document.getElementById('name_i').value = '';
    document.getElementById('srok_i').checked = false;
    document.getElementById('need_i').value = '';
    document.getElementById('need_l').style.display = 'none';
    document.getElementById('pelena').style.display = 'none';
}

function save_invest(){
    var inv_name = document.getElementById('name_i').value;
    if(document.getElementById('srok_i').checked){
        var inv_long = 1;
        var inv_merge = document.getElementById('need_i').value;
    }else{
        var inv_long = 0;
        var inv_merge = 0;
    }
    var url = "/serv/add_invest.php?inv_name="+inv_name+"&inv_long="+inv_long+"&inv_merge="+inv_merge;
    ajax_f(url,'text',save_invest_ok);
}

function save_invest_ok(par){
    if(par == 'ok'){
        close_form();
        load_invest();
    }
    else{
        alert('error');
    }
}

function investing(par){
    var dat = document.getElementById('oper_dat').textContent;
    var year_p = dat.substring(6);
    var month_p = dat.substring(3,5);
    var day_p = dat.substring(0,2);
    dat = year_p + "-" + month_p + "-" + day_p;
    var pel = par.parentElement;
    var cash = pel.getElementsByTagName('input')[0].value;
    var url = "/serv/investing.php?id="+pel.id+"&dat="+dat+"&cash="+cash;
    ajax_f(url,"text",investing_ok);
}
           
function investing_ok(par){
    var mass = par.split(':');
    var elem = document.getElementById(mass[0]);
    elem.getElementsByTagName('input')[0].value = '';
    elem.children[2].textContent = (mass[1]==''?0:parseInt(mass[1]))-(mass[2]==''?0:parseInt(mass[2]));
    load_nalik();
}

function resting(par){
    var dat = document.getElementById('oper_dat').textContent;
    var year_p = dat.substring(6);
    var month_p = dat.substring(3,5);
    var day_p = dat.substring(0,2);
    dat = year_p + "-" + month_p + "-" + day_p;
    var pel = par.parentElement;
    var cash = pel.getElementsByTagName('input')[0].value;
    var url = "/serv/resting.php?id="+pel.id+"&dat="+dat+"&cash="+cash;
    ajax_f(url,"text",resting_ok);
}

function resting_ok(par){
    var mass = par.split(':');
    var elem = document.getElementById(mass[0]);
    elem.getElementsByTagName('input')[0].value = '';
    elem.children[2].textContent = (mass[1]==''?0:parseInt(mass[1]))-(mass[2]==''?0:parseInt(mass[2]));
}


function ajax_f(url, rej, outer){
    var xhr = new XMLHttpRequest;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(rej == 'text'){
                var res = xhr.responseText;
            }else{
                var res = xhr.responseXML;
            }
            outer(res);
        }
    }
    xhr.send(null);
}