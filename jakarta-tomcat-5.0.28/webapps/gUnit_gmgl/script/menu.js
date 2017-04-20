
var mmenus    = new Array();
var misShow   = new Boolean(); 
misShow=false;
var misdown   = new Boolean();
misdown=false;
var mnumberofsub=0;
var musestatus=false;
var mpopTimer = 0;
mmenucolor='#89CB10';mfontcolor='MenuText';mmenuoutcolor='#ADEF34';mmenuincolor='#B5E74E';mmenuoutbordercolor='#ECFA3A';mmenuinbordercolor='#5A2614';mmidoutcolor='#A9DA1D';mmidincolor='#799310';mmenuovercolor='#004080';mitemedge='0';msubedge='1';mmenuunitwidth=66;mmenuitemwidth=140;mmenuheight=25;mmenuwidth='100%';mmenuadjust=0;mmenuadjustV=0;mfonts='font-family: 宋体; font-size: 9pt; color: MenuText; ';mcursor='hand';
var swipeSteps = 4;
var swipemsec = 25;
var swipeArray = new Array();
function swipe(el, dir, steps, msec) {
	if (steps == null) steps = swipeSteps;
	if (msec == null) msec = swipemsec;
	if (el.swipeIndex == null)
		el.swipeIndex = swipeArray.length;
	if (el.swipeTimer != null)
		window.clearTimeout(el.swipeTimer);
	swipeArray[el.swipeIndex] = el;
	el.style.clip = "rect(-99999, 99999, 99999, -99999)";
	if (el.swipeCounter == null || el.swipeCounter == 0) {
		el.orgLeft  = el.offsetLeft;
		el.orgTop  = el.offsetTop;
		el.orgWidth = el.offsetWidth;
		el.orgHeight  = el.offsetHeight;
	}
	el.swipeCounter = steps;
	el.style.clip = "rect(0,0,0,0)";
	window.setTimeout("repeat(" + dir + "," + el.swipeIndex + "," + steps + "," + msec + ")", msec);
}
function repeat(dir, index, steps, msec) {
	el = swipeArray[index];
	var left   = el.orgLeft;
	var top    = el.orgTop;
	var width  = el.orgWidth;
	var height = el.orgHeight;
	if (el.swipeCounter == 0) {
		el.style.clip = "rect(-99999, 99999, 99999, -99999)";
		return;
	}
	else {
		el.swipeCounter--;
		el.style.visibility = "visible";
		switch (dir) {
			case 2:
				el.style.clip = "rect(" + height*el.swipeCounter/steps + "," + width + "," + height + "," + 0 + ")";
				el.style.top  = top - height*el.swipeCounter/steps;
				break;
			case 8:
				el.style.clip = "rect(" + 0 + "," + width + "," + height*(steps-el.swipeCounter)/steps + "," + 0 + ")";
				el.style.top  = top + height*el.swipeCounter/steps;
				break;
			case 6:
				el.style.clip = "rect(" + 0 + "," + width + "," + height + "," + width*(el.swipeCounter)/steps + ")";
				el.style.left  = left - width*el.swipeCounter/steps;
				break;
			case 4:
				el.style.clip = "rect(" + 0 + "," + width*(swipeSteps - el.swipeCounter)/steps + "," + height + "," + 0 + ")";
				el.style.left  = left + width*el.swipeCounter/steps;
				break;
		}
		
		el.swipeTimer = window.setTimeout("repeat(" + dir + "," + index + "," + steps + "," + msec + ")", msec);
	}
}
var mtmpleft="";
var mtmptop="";
function hideSwipe(el) {
	window.clearTimeout(el.swipeTimer);
	el.style.visibility = "hidden";
	el.style.clip = "rect(-99999, 99999, 99999, -99999)";
	el.swipeCounter = 0;
	if(mtmpleft!="")el.style.left = mtmpleft;
	if(mtmptop!="")el.style.top = mtmptop;
}

function stoperror(){
return true;
}
window.onerror=stoperror;
function mpopOut() {
mpopTimer = setTimeout('mallhide()', 500);
}
function getReal(el, type, value) {
	temp = el;
	while ((temp != null) && (temp.tagName != "BODY")) {
		if (eval("temp." + type) == value) {
			el = temp;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}


function mMenuRegister(menu) 
{
  mmenus[mmenus.length] = menu
  return (mmenus.length - 1)
}

function mMenuItem(caption,command,target,isline,statustxt,level,img,sizex,sizey,pos){
	this.items = new Array();
	this.caption=caption;
	this.command=command;
	this.target=target;
	this.isline=isline;
	this.statustxt=statustxt;
	if(level!=null){mnumberofsub++;
	this.hasc=mnumberofsub;}
	this.level=level;
	this.img=img;
	this.sizex=sizex;
	this.sizey=sizey;
	this.pos=pos;
}

function mMenu(caption,command,target,img,sizex,sizey,pos){
	this.items = new Array();
	this.caption=caption;
	this.command=command;
	this.target=target;
	this.img=img;
	this.sizex=sizex;
	this.sizey=sizey;
	this.pos=pos;
	this.id=mMenuRegister(this);
}
function mMenuAddItem(item)
{
  this.items[this.items.length] = item
  item.parent = this.id;
  this.children=true;
}

mMenu.prototype.addItem = mMenuAddItem;
mMenuItem.prototype.addsubItem = mMenuAddItem;

function mtoout(src){

src.style.borderLeftColor=mmenuoutbordercolor;
src.style.borderRightColor=mmenuinbordercolor;
src.style.borderTopColor=mmenuoutbordercolor;
src.style.borderBottomColor=mmenuinbordercolor;
src.style.backgroundColor=mmenuoutcolor;
src.style.color=mmenuovercolor;
}
function mtoin(src){

src.style.borderLeftColor=mmenuinbordercolor;
src.style.borderRightColor=mmenuoutbordercolor;
src.style.borderTopColor=mmenuinbordercolor;
src.style.borderBottomColor=mmenuoutbordercolor;
src.style.backgroundColor=mmenuincolor;
src.style.color=mmenuovercolor;
}
function mnochange(src){
src.style.borderLeftColor=mmenucolor;
src.style.borderRightColor=mmenucolor;
src.style.borderTopColor=mmenucolor;
src.style.borderBottomColor=mmenucolor;
src.style.backgroundColor='';
src.style.color=mfontcolor;

}
function mallhide(){
	for(var nummenu=0;nummenu<mmenus.length;nummenu++){
		var themenu=document.all['mMenu'+nummenu]
		var themenudiv=document.all['mmenudiv'+nummenu]
                mnochange(themenu);
                mmenuhide(themenudiv);
                }
        for(nummenu=1;nummenu<=mnumberofsub;nummenu++){  
        	var thesub=document.all['msubmenudiv'+nummenu]      
        	msubmenuhide(thesub);
        	mnochange(document.all['mp'+nummenu]);
        	document.all["mitem"+nummenu].style.color=mfontcolor;
        	}
}
function mmenuhide(menuid){
menuid.style.filter='Alpha(Opacity=100)';
hideSwipe(menuid);
misShow=false;
}
function msubmenuhide(menuid){
menuid.style.filter='Alpha(Opacity=100)';
menuid.style.visibility='hidden';
}
function mmenushow(menuid,pid){
menuid.style.filter='Alpha(Opacity=80)';
menuid.style.left=mposflag.offsetLeft+pid.offsetLeft+mmenuadjust;menuid.style.top=mposflag.offsetTop+mmenutable.offsetHeight+mmenuadjustV;
if(mmenuitemwidth+parseInt(menuid.style.left)>document.body.clientWidth+document.body.scrollLeft)
menuid.style.left=document.body.clientWidth+document.body.scrollLeft-mmenuitemwidth;
mtmpleft=menuid.style.left;mtmptop=menuid.style.top;swipe(menuid,2,4);
misShow=true;
}
function mshowsubmenu(menuid,pid,rid){
menuid.style.filter='Alpha(Opacity=80)';
menuid.style.left=pid.offsetWidth+rid.offsetLeft;
menuid.style.top=pid.offsetTop+rid.offsetTop-3;
if(mmenuitemwidth+parseInt(menuid.style.left)>document.body.clientWidth+document.body.scrollLeft)
menuid.style.left=document.body.clientWidth+document.body.scrollLeft-mmenuitemwidth;
menuid.style.visibility='visible';
}
function mmenu_over(menuid,x){
toel = getReal(window.event.toElement, "className", "coolButton");
fromel = getReal(window.event.fromElement, "className", "coolButton");
if (toel == fromel) return;
if(x<0){
  misShow = false;
  mallhide();
  mtoout(eval("mMenu"+x));
}else{

  mallhide();
  mtoin(eval("mMenu"+x));
  mmenushow(menuid,eval("mMenu"+x));

}
clearTimeout(mpopTimer);
}
function mmenu_out(x){
toel = getReal(window.event.toElement, "className", "coolButton");
fromel = getReal(window.event.fromElement, "className", "coolButton");
if (toel == fromel) return;
if (misShow){
mtoin(eval("mMenu"+x));
}else{
mnochange(eval("mMenu"+x));
}
mpopOut()
}
function mmenu_down(menuid,x){
  if(misShow){
  mmenuhide(menuid);
  mtoout(eval("mMenu"+x));
  }
  else{
  mtoin(eval("mMenu"+x));
  mmenushow(menuid,eval("mMenu"+x));
  misdown=true;
  }
}
function mmenu_up(){
  misdown=false;
}
function mmenuitem_over(menuid,item,x,j,i){
toel = getReal(window.event.toElement, "className", "coolButton");
fromel = getReal(window.event.fromElement, "className", "coolButton");
if (toel == fromel) return;
srcel = getReal(window.event.srcElement, "className", "coolButton");
        for(nummenu=1;nummenu<=mnumberofsub;nummenu++){  
        	var thesub=document.all['msubmenudiv'+nummenu] 
        	if(!(menuid==thesub||menuid.style.tag>=thesub.style.tag)){
        	msubmenuhide(thesub);
        	mnochange(document.all['mp'+nummenu]);
        	document.all["mitem"+nummenu].style.color=mfontcolor;
        	}
        }
if(item)document.all["mitem"+item].style.color=mmenuovercolor;
if(misdown||item){
	mtoin(srcel);
}
else{
	mtoout(srcel);
}
if(x==-1)mthestatus=eval("msub"+j).items[i].statustxt;
if(j==-1)mthestatus=mmenus[x].items[i].statustxt;
if(mthestatus!=""){
	musestatus=true;
	window.status=mthestatus;
}
clearTimeout(mpopTimer);
}
function mmenuitem_out(hassub){
toel = getReal(window.event.toElement, "className", "coolButton");
fromel = getReal(window.event.fromElement, "className", "coolButton");
if (toel == fromel) return;
srcel = getReal(window.event.srcElement, "className", "coolButton");
if(!hassub)mnochange(srcel);
if(musestatus)window.status="";
mpopOut()
}
function mmenuitem_down(){
srcel = getReal(window.event.srcElement, "className", "coolButton");
mtoin(srcel)
misdown=true;
}
function mmenuitem_up(){
srcel = getReal(window.event.srcElement, "className", "coolButton");
mtoout(srcel)
misdown=false;
}
function mexec3(j,i){
var cmd;
if(eval("msub"+j).items[i].target=="blank"){
  cmd = "window.open('"+eval("msub"+j).items[i].command+"')";
}else{
  cmd = eval("msub"+j).items[i].target+".location=\""+eval("msub"+j).items[i].command+"\"";
}
eval(cmd);
}
function mexec2(x){
var cmd;
if(mmenus[x].target=="blank"){
  cmd = "window.open('"+mmenus[x].command+"')";
}else{
  cmd = mmenus[x].target+".location=\""+mmenus[x].command+"\"";
}
eval(cmd);
}
function mexec(x,i){
var cmd;
if(mmenus[x].items[i].target=="blank"){
  cmd = "window.open('"+mmenus[x].items[i].command+"')";
}else{
  cmd = mmenus[x].items[i].target+".location=\""+mmenus[x].items[i].command+"\"";
}
eval(cmd);
}
function mbody_click(){

if (misShow){
	srcel = getReal(window.event.srcElement, "className", "coolButton");
	for(var x=0;x<=mmenus.length;x++){
		if(srcel.id=="mMenu"+x)
		return;
	}
	for(x=1;x<=mnumberofsub;x++){
		if(srcel.id=="mp"+x)
		return;
	}
	mallhide();
}
}
document.onclick=mbody_click;

function mwritetodocument(){
      var mwb=1;
                     var stringx='<div id="mposflag" style="position:absolute;"></div><table  id=mmenutable border=0 cellpadding=3 cellspacing=2 width='+mmenuwidth+' height='+mmenuheight+' bgcolor='+mmenucolor+
                     ' onselectstart="event.returnValue=false"'+
                     ' style="filter:Alpha(Opacity=80);cursor:'+mcursor+';'+mfonts+
                     ' border-left: '+mwb+'px solid '+mmenuoutbordercolor+';'+
                     ' border-right: '+mwb+'px solid '+mmenuinbordercolor+'; '+
                     'border-top: '+mwb+'px solid '+mmenuoutbordercolor+'; '+
                     'border-bottom: '+mwb+'px solid '+mmenuinbordercolor+'; padding:0px"><tr>'
                     for(var x=0;x<mmenus.length;x++){
                     	var thismenu=mmenus[x];
                     	var imgsize="";
                     	if(thismenu.sizex!="0"||thismenu.sizey!="0")imgsize=" width="+thismenu.sizex+" height="+thismenu.sizey;
                     	var ifspace="";
                     	if(thismenu.caption!="")ifspace="&nbsp;";
                     	stringx += "<td nowrap class=coolButton id=mMenu"+x+" style='border: "+mitemedge+"px solid "+mmenucolor+
                     	"' width="+mmenuunitwidth+"px onmouseover=mmenu_over(mmenudiv"+x+
                     	","+x+") onmouseout=mmenu_out("+x+
                     	") onmousedown=mmenu_down(mmenudiv"+x+","+x+")";
                     	      if(thismenu.command!=""){
                     	          stringx += " onmouseup=mmenu_up();mexec2("+x+");";
                     	      }else{
                     	      	  stringx += " onmouseup=mmenu_up()";
                     	      }
                     	      if(thismenu.pos=="0"){
                     	          stringx += " align=center><img align=absmiddle src='"+thismenu.img+"'"+imgsize+">"+ifspace+thismenu.caption+"</td>";	
                     	      }else if(thismenu.pos=="1"){
                     	          stringx += " align=center>"+thismenu.caption+ifspace+"<img align=absmiddle src='"+thismenu.img+"'"+imgsize+"></td>";	
                     	      }else if(thismenu.pos=="2"){
                     	          stringx += " align=center background='"+thismenu.img+"'>&nbsp;"+thismenu.caption+"&nbsp;</td>";	
                     	      }else{
                     	          stringx += " align=center>&nbsp;"+thismenu.caption+"&nbsp;</td>";
                     	      }
                     	stringx += "";
                     }
                     stringx+="<td width=*>&nbsp;</td></tr></table>";
                     
                     
                     for(var x=0;x<mmenus.length;x++){
                     	thismenu=mmenus[x];
                        if(x<0){
                        stringx+='<div id=mmenudiv'+x+' style="visiable:none"></div>';
                        }else{
                        stringx+='<div id=mmenudiv'+x+
                        ' style="filter:Alpha(Opacity=80);cursor:'+mcursor+';position:absolute;'+
                        'width:'+mmenuitemwidth+'px; z-index:'+(x+100);
                        if(mmenuinbordercolor!=mmenuoutbordercolor&&msubedge=="0"){
                        stringx+=';border-left: 1px solid '+mmidoutcolor+
                        ';border-top: 1px solid '+mmidoutcolor;}
                        stringx+=';border-right: 1px solid '+mmenuinbordercolor+
                        ';border-bottom: 1px solid '+mmenuinbordercolor+';visibility:hidden" onselectstart="event.returnValue=false">\n'+
                     	'<table  width="100%" border="0" height="100%" align="center" cellpadding="0" cellspacing="2" '+
                     	'style="'+mfonts+' border-left: 1px solid '+mmenuoutbordercolor;
                     	if(mmenuinbordercolor!=mmenuoutbordercolor&&msubedge=="0"){
                     	stringx+=';border-right: 1px solid '+mmidincolor+
                     	';border-bottom: 1px solid '+mmidincolor;}
                     	stringx+=';border-top: 1px solid '+mmenuoutbordercolor+
                     	';padding: 4px" bgcolor='+mmenucolor+'>\n'
                     	for(var i=0;i<thismenu.items.length;i++){
                     		var thismenuitem=thismenu.items[i];
                     		var imgsize="";
                     	        if(thismenuitem.sizex!="0"||thismenuitem.sizey!="0")imgsize=" width="+thismenuitem.sizex+" height="+thismenuitem.sizey;
                     	        var ifspace="";
                     	        if(thismenu.caption!="")ifspace="&nbsp;";
                     		if(thismenuitem.hasc!=null){
                     		stringx += "<tr><td id=mp"+thismenuitem.hasc+" class=coolButton style='border: "+mitemedge+"px solid "+mmenucolor+
                     		"' width=100% onmouseout=mmenuitem_out(true) onmouseover=\"mmenuitem_over(mmenudiv"+x+
                     		",'"+thismenuitem.hasc+"',"+x+",-1,"+i+");mshowsubmenu(msubmenudiv"+thismenuitem.hasc+",mp"+thismenuitem.hasc+",mmenudiv"+x+");\""+
                     		"><table id=mitem"+thismenuitem.hasc+" cellspacing='0' cellpadding='0' border='0' width='100%' style='"+mfonts+"'><tr><td ";
                     		  if(thismenuitem.pos=="0"){
                     	            stringx += "><img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+">"+ifspace+thismenuitem.caption+"</td><td";	
                     	          }else if(thismenuitem.pos=="1"){
                     	            stringx += ">"+thismenuitem.caption+ifspace+"<img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+"></td><td";
                     	          }else if(thismenuitem.pos=="2"){
                     	            stringx += "background='"+thismenuitem.img+"'>"+thismenuitem.caption+"</td><td background='"+thismenuitem.img+"'";	
                     	          }else{
                     	            stringx += ">"+thismenuitem.caption+"</td><td";
                     	          }
                     		  stringx += " align=right width='1'><font face='Webdings' style='font-size: 6pt'>4</font></td></tr></table></td></tr>\n";                     		
                     		}else if(!thismenuitem.isline){
                     		stringx += "<tr><td class=coolButton style='border: "+mitemedge+"px solid "+mmenucolor+
                     		"' width=100% height=15px onmouseover=\"mmenuitem_over(mmenudiv"+x+
                     		",false,"+x+",-1,"+i+");\" onmouseout=mmenuitem_out() onmousedown=mmenuitem_down() onmouseup=";
 				stringx += "mmenuitem_up();mexec("+x+","+i+"); ";
 				  if(thismenuitem.pos=="0"){
                     	            stringx += "><img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+">"+ifspace+thismenuitem.caption+"</td></tr>";	
                     	          }else if(thismenuitem.pos=="1"){
                     	            stringx += ">"+thismenuitem.caption+ifspace+"<img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+"></td></tr>";	
                     	          }else if(thismenuitem.pos=="2"){
                     	            stringx += "background='"+thismenuitem.img+"'>"+thismenuitem.caption+"</td></tr>";	
                     	          }else{
                     	            stringx += ">"+thismenuitem.caption+"</td></tr>";
                     	          }
 				}else{
                     		stringx+='<tr><td height="1" background="/images/hr.gif" onmousemove="clearTimeout(mpopTimer);"><img height="1" width="1" src="none.gif" border="0"></td></tr>\n';
                     		}
                     	}stringx+='</table>\n</div>'
                     	}                     	
                }
                
for(var j=1;j<=mnumberofsub;j++){     
thisitem=eval("msub"+j);
stringx+='<div id=msubmenudiv'+j+
                        ' style="filter:Alpha(Opacity=80);tag:'+thisitem.level+';cursor:'+mcursor+';position:absolute;'+
                        'width:'+mmenuitemwidth+'px; z-index:'+(j+200);
                        if(mmenuinbordercolor!=mmenuoutbordercolor&&msubedge=="0"){
                        stringx+=';border-left: 1px solid '+mmidoutcolor+
                        ';border-top: 1px solid '+mmidoutcolor;}
                        stringx+=';border-right: 1px solid '+mmenuinbordercolor+
                        ';border-bottom: 1px solid '+mmenuinbordercolor+';visibility:hidden" onselectstart="event.returnValue=false">\n'+
                     	'<table  width="100%" border="0" height="100%" align="center" cellpadding="0" cellspacing="2" '+
                     	'style="'+mfonts+' border-left: 1px solid '+mmenuoutbordercolor;
                     	if(mmenuinbordercolor!=mmenuoutbordercolor&&msubedge=="0"){
                     	stringx+=';border-right: 1px solid '+mmidincolor+
                     	';border-bottom: 1px solid '+mmidincolor;}
                     	stringx+=';border-top: 1px solid '+mmenuoutbordercolor+
                     	';padding: 4px" bgcolor='+mmenucolor+'>\n'
                     	for(var i=0;i<thisitem.items.length;i++){
                     		var thismenuitem=thisitem.items[i];
                     		var imgsize="";
                     	        if(thismenuitem.sizex!="0"||thismenuitem.sizey!="0")imgsize=" width="+thismenuitem.sizex+" height="+thismenuitem.sizey;
                     	        var ifspace="";
                     	        if(thismenu.caption!="")ifspace="&nbsp;";
                     		if(thismenuitem.hasc!=null){
                     		stringx += "<tr><td id=mp"+thismenuitem.hasc+" class=coolButton style='border: "+mitemedge+"px solid "+mmenucolor+
                     		"' width=100% onmouseout=mmenuitem_out(true) onmouseover=\"mmenuitem_over(msubmenudiv"+j+
                     		",'"+thismenuitem.hasc+"',-1,"+j+","+i+");mshowsubmenu(msubmenudiv"+thismenuitem.hasc+",mp"+thismenuitem.hasc+",msubmenudiv"+j+");\""+
                     		"><table id=mitem"+thismenuitem.hasc+" cellspacing='0' cellpadding='0' border='0' width='100%' style='"+mfonts+"'><tr><td ";
                     		  if(thismenuitem.pos=="0"){
                     	            stringx += "><img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+">"+ifspace+thismenuitem.caption+"</td><td";	
                     	          }else if(thismenuitem.pos=="1"){
                     	            stringx += ">"+thismenuitem.caption+ifspace+"<img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+"></td><td";
                     	          }else if(thismenuitem.pos=="2"){
                     	            stringx += "background='"+thismenuitem.img+"'>"+thismenuitem.caption+"</td><td background='"+thismenuitem.img+"'";	
                     	          }else{
                     	            stringx += ">"+thismenuitem.caption+"</td><td";
                     	          }
                     		  stringx += " align=right width='1'><font face='Webdings' style='font-size: 6pt'>4</font></td></tr></table></td></tr>\n";                     		
                     		}else if(!thismenuitem.isline){
                     		stringx += "<tr><td class=coolButton style='border: "+mitemedge+"px solid "+mmenucolor+
                     		"' width=100% height=15px onmouseover=\"mmenuitem_over(msubmenudiv"+j+
                     		",false,-1,"+j+","+i+");\" onmouseout=mmenuitem_out() onmousedown=mmenuitem_down() onmouseup=";
                     		stringx += "mmenuitem_up();mexec3("+j+","+i+"); ";
 				if(thismenuitem.pos=="0"){
                     	            stringx += "><img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+">"+ifspace+thismenuitem.caption+"</td></tr>";	
                     	          }else if(thismenuitem.pos=="1"){
                     	            stringx += ">"+thismenuitem.caption+ifspace+"<img align=absmiddle src='"+thismenuitem.img+"'"+imgsize+"></td></tr>";	
                     	          }else if(thismenuitem.pos=="2"){
                     	            stringx += "background='"+thismenuitem.img+"'>"+thismenuitem.caption+"</td></tr>";	
                     	          }else{
                     	            stringx += ">"+thismenuitem.caption+"</td></tr>";
                     	          }
                     	        }else{
                     		stringx+='<tr><td height="1" background="/images/hr.gif" onmousemove="clearTimeout(mpopTimer);"><img height="1" width="1" src="none.gif" border="0"></td></tr>\n';
                     		}
                     	}
stringx+='</table>\n</div>'
}
       document.write("<div align='center' id='JsMenuCSS'>"+stringx+"</div>");
}


mpmenu1=new mMenu('网站首页','/','self','','','','');
mpmenu1.addItem(new mMenuItem('&nbsp;用户注册','/register.asp','self',false,'用户注册',null,'','','',''));
mpmenu1.addItem(new mMenuItem('&nbsp;用户登录','/login.asp','self',false,'用户登录',null,'','','',''));
mpmenu1.addItem(new mMenuItem('&nbsp;用户退出','/login.asp?action=logout','self',false,'用户退出',null,'','','',''));
mpmenu1.addItem(new mMenuItem('&nbsp;资料修改','/bbs/MYMODIFY.ASP','self',false,'',null,'','','',''));
mpmenu2=new mMenu('软件下载','/SoftDown/','self','','','','');
mpmenu2.addItem(new mMenuItem('&nbsp;系统程序','/softdown/index.asp?CateID=1','self',false,'系统程序',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;网络工具','/softdown/index.asp?CateID=2','self',false,'网络工具',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;媒体工具','/softdown/index.asp?CateID=3','self',false,'媒体工具',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;图文处理','/softdown/index.asp?CateID=4','self',false,'图文处理',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;桌面工具','/softdown/index.asp?CateID=5','self',false,'桌面工具',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;程序代码','/softdown/index.asp?CateID=6','self',false,'程序代码',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;游戏娱乐','/softdown/index.asp?CateID=7','self',false,'游戏娱乐',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;其他工具','/softdown/index.asp?CateID=8','self',false,'其他工具',null,'','','',''));
mpmenu2.addItem(new mMenuItem('&nbsp;特别栏目','/softdown/index.asp?CateID=9','self',false,'特别栏目',null,'','','',''));
mpmenu2.addItem(new mMenuItem(null,null,null,true));
mpmenu2.addItem(new mMenuItem('&nbsp;下载排行','/SoftDown/Index.asp?order=AllHits&updown=desc','self',false,'软件下载排行榜',null,'','','',''));
mpmenu3=new mMenu('软件学院','/SoftSchool/','self','','','','');
mpmenu3.addItem(new mMenuItem('&nbsp;软件瞭望','/SoftSchool/Index.Asp?CateID=1','self',false,'软件瞭望',null,'','','',''));
mpmenu3.addItem(new mMenuItem('&nbsp;精文荟萃','/SoftSchool/Index.Asp?CateID=2','self',false,'精文荟萃',null,'','','',''));
mpmenu3.addItem(new mMenuItem('&nbsp;操作系统','/SoftSchool/Index.Asp?CateID=3','self',false,'操作系统',null,'','','',''));
mpmenu3.addItem(new mMenuItem('&nbsp;网络软件','/SoftSchool/Index.Asp?CateID=4','self',false,'网络软件',null,'','','',''));
mpmenu3.addItem(new mMenuItem('&nbsp;工具软件','/SoftSchool/Index.Asp?CateID=5','self',false,'工具软件',null,'','','',''));
mpmenu3.addItem(new mMenuItem('&nbsp;办公软件','/SoftSchool/Index.Asp?CateID=6','self',false,'办公软件',null,'','','',''));
mpmenu3.addItem(new mMenuItem('&nbsp;认证考试','/SoftSchool/Index.Asp?CateID=7','self',false,'认证考试',null,'','','',''));
mpmenu3.addItem(new mMenuItem(null,null,null,true));
mpmenu3.addItem(new mMenuItem('&nbsp;阅读排行','/SoftSchool/Index.asp?order=hits&updown=desc','self',false,'文章阅读排行榜',null,'','','',''));
mpmenu4=new mMenu('Web&nbsp;开发','/Develop/','self','','','','');
mpmenu4.addItem(new mMenuItem('&nbsp;网页设计','/Develop/Index.Asp?CateID=1','self',false,'网页设计',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;.Net专栏','/Develop/Index.Asp?CateID=10','self',false,'.Net专栏',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;ASP&nbsp;学院','/Develop/Index.Asp?CateID=2','self',false,'ASP 学院',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;JSP&nbsp;学院','/Develop/Index.Asp?CateID=3','self',false,'JSP 学院',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;PHP&nbsp;学院','/Develop/Index.Asp?CateID=4','self',false,'PHP 学院',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;CGI&nbsp;学院','/Develop/Index.Asp?CateID=5','self',false,'CGI 学院',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;SQL&nbsp;学院','/Develop/Index.Asp?CateID=6','self',false,'SQL 学院',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;XML&nbsp;学院','/Develop/Index.Asp?CateID=7','self',false,'XML 学院',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;Script','/Develop/Index.Asp?CateID=8','self',false,'Script',null,'','','',''));
mpmenu4.addItem(new mMenuItem('&nbsp;Web服务器','/Develop/Index.Asp?CateID=9','self',false,'Web服务器',null,'','','',''));
mpmenu4.addItem(new mMenuItem(null,null,null,true));
mpmenu4.addItem(new mMenuItem('&nbsp;阅读排行','/Develop/Index.asp?order=hits&updown=desc','self',false,'文章阅读排行榜',null,'','','',''));
mpmenu5=new mMenu('教育论文','/Lunwen/','self','','','','');
mpmenu5.addItem(new mMenuItem('&nbsp;学科教学','/Lunwen/Index.Asp?CateID=1','self',false,'学科教学',null,'','','',''));
mpmenu5.addItem(new mMenuItem('&nbsp;教学管理','/Lunwen/Index.Asp?CateID=2','self',false,'教学管理',null,'','','',''));
mpmenu5.addItem(new mMenuItem('&nbsp;探索研究','/Lunwen/Index.Asp?CateID=3','self',false,'探索研究',null,'','','',''));
mpmenu5.addItem(new mMenuItem('&nbsp;名校名师','/Lunwen/Index.Asp?CateID=4','self',false,'名校名师',null,'','','',''));
mpmenu5.addItem(new mMenuItem(null,null,null,true));
mpmenu5.addItem(new mMenuItem('&nbsp;阅读排行','/Lunwen/Index.asp?order=hits&updown=desc','self',false,'文章阅读排行榜',null,'','','',''));
mpmenu6=new mMenu('精彩论坛','/bbs/','self','','','','');
msub1=new mMenuItem('&nbsp;≡日常事务≡','','self',false,'','1','','','','');
msub1.addsubItem(new mMenuItem('&nbsp;站务论坛','/bbs/list.asp?boardid=1','self',false,'关于本站的日常或其他事务的讨论区',null,'','','',''));
msub1.addsubItem(new mMenuItem('&nbsp;FTP和会员服务区','/bbs/list.asp?boardid=2','self',false,'本站FTP的使用以及会员们讨论论坛建设的好地方',null,'','','',''));
msub1.addsubItem(new mMenuItem('&nbsp;需求与补档','/bbs/list.asp?boardid=17','self',false,'大家需要什么都在这里发贴，其他版面不允许发布此类帖子，违者删贴。',null,'','','',''));
mpmenu6.addItem(msub1);
mpmenu6.addItem(new mMenuItem(null,null,null,true));
msub2=new mMenuItem('&nbsp;≡软件交流≡','','self',false,'','1','','','','');
msub2.addsubItem(new mMenuItem('&nbsp;软件讨论中心','/bbs/list.asp?boardid=3','self',false,'这里是软件交流天地，我要最新的软件，我要最好的注册...',null,'','','',''));
msub2.addsubItem(new mMenuItem('&nbsp;操作系统论坛','/bbs/list.asp?boardid=4','self',false,'各种操作系统的最新消息、使用心得体会交流。',null,'','','',''));
msub2.addsubItem(new mMenuItem('&nbsp;影音无极限','/bbs/list.asp?boardid=5','self',false,'这里提供最新最清晰的DivX 这里发布最劲最High的音乐 想把握最新的娱乐动态？尽在动感！',null,'','','',''));
msub2.addsubItem(new mMenuItem('&nbsp;游民家园','/bbs/list.asp?boardid=6','self',false,'游民家园',null,'','','',''));
mpmenu6.addItem(msub2);
mpmenu6.addItem(new mMenuItem(null,null,null,true));
msub3=new mMenuItem('&nbsp;≡技术交流≡','','self',false,'','1','','','','');
msub3.addsubItem(new mMenuItem('&nbsp;菜鸟天堂','/bbs/list.asp?boardid=7','self',false,'讨论网络技术，关注网络安全。网络的加油站。',null,'','','',''));
msub3.addsubItem(new mMenuItem('&nbsp;网络技术和安全','/bbs/list.asp?boardid=8','self',false,'讨论网络技术，关注网络安全。网络的加油站。',null,'','','',''));
msub3.addsubItem(new mMenuItem('&nbsp;编程爱好者论坛','/bbs/list.asp?boardid=9','self',false,'各种编程语言、多媒体知识的交流园地',null,'','','',''));
msub3.addsubItem(new mMenuItem('&nbsp;硬件讨论区','/bbs/list.asp?boardid=10','self',false,'讨论有关计算机硬件的论坛。',null,'','','',''));
msub3.addsubItem(new mMenuItem('&nbsp;新硬件大看台','/bbs/list.asp?boardid=15','self',false,'，新，精——只介绍讨论最新最酷的硬件产品',null,'','','',''));
mpmenu6.addItem(msub3);
mpmenu6.addItem(new mMenuItem(null,null,null,true));
msub4=new mMenuItem('&nbsp;≡网友空间≡','','self',false,'','1','','','','');
msub4.addsubItem(new mMenuItem('&nbsp;情感驿站','/bbs/list.asp?boardid=11','self',false,'男孩、女孩，爱情、友情，人类永恒的话题。',null,'','','',''));
msub4.addsubItem(new mMenuItem('&nbsp;搞笑论坛','/bbs/list.asp?boardid=12','self',false,'专门张贴笑话和小小说的经典对白，搞笑图片，你也可以进来和我们一起参与哦。',null,'','','',''));
msub4.addsubItem(new mMenuItem('&nbsp;贴图专区','/bbs/list.asp?boardid=13','self',false,'精彩的图片贴在这里，好笑的，漂亮的,令人回味的....',null,'','','',''));
msub4.addsubItem(new mMenuItem('&nbsp;超级灌水','/bbs/list.asp?boardid=14','self',false,'超级灌水',null,'','','',''));
mpmenu6.addItem(msub4);
mpmenu6.addItem(new mMenuItem(null,null,null,true));
mpmenu6.addItem(new mMenuItem('&nbsp;短消息','/bbs/usersms.asp','self',false,'用户短消息',null,'','','',''));
mpmenu6.addItem(new mMenuItem('&nbsp;收藏夹','/bbs/favlist.asp','self',false,'',null,'','','',''));
mpmenu6.addItem(new mMenuItem('&nbsp;论坛搜索','/bbs/query.asp?boardid=1','self',false,'论坛搜索',null,'','','',''));
mpmenu6.addItem(new mMenuItem('&nbsp;论坛帮助','/bbs/help.asp','blank',false,'论坛帮助',null,'','','',''));
mpmenu6.addItem(new mMenuItem('&nbsp;修改资料','/bbs/MYMODIFY.ASP','self',false,'修改资料',null,'','','',''));
mpmenu6.addItem(new mMenuItem(null,null,null,true));
mpmenu6.addItem(new mMenuItem('&nbsp;FTP&nbsp;联盟','/Club/ftp/','self',false,'FTP 联盟',null,'','','',''));
mpmenu7=new mMenu('动感社区','','self','','','','');
mpmenu7.addItem(new mMenuItem('&nbsp;社区银行','/club/bank/Index.asp','self',false,'e 时代银行',null,'','','',''));
mpmenu7.addItem(new mMenuItem('&nbsp;社区赛马','/club/saima/horse.asp','self',false,'赛马',null,'','','',''));
mpmenu7.addItem(new mMenuItem('&nbsp;社区排行榜','/iBest/UserBest.asp','self',false,'社区排行榜',null,'','','',''));
mpmenu8=new mMenu('知识问答','/iiTest/','self','','','','');
mpmenu8.addItem(new mMenuItem('&nbsp;历史知识','/iiTest/Index.Asp?CateID=1','self',false,'历史知识',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;电脑知识','/iiTest/Index.Asp?CateID=2','self',false,'电脑知识',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;文学知识','/iiTest/Index.Asp?CateID=3','self',false,'文学知识',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;游戏知识','/iiTest/Index.Asp?CateID=4','self',false,'游戏知识',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;动漫知识','/iiTest/Index.Asp?CateID=5','self',false,'动漫知识',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;天文地理','/iiTest/Index.Asp?CateID=6','self',false,'天文地理',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;乐趣英语','/iiTest/Index.Asp?CateID=7','self',false,'乐趣英语',null,'','','',''));
mpmenu8.addItem(new mMenuItem('&nbsp;体育知识','/iiTest/Index.Asp?CateID=8','self',false,'体育知识',null,'','','',''));
mpmenu9=new mMenu('站点服务','','self','','','','');
mpmenu9.addItem(new mMenuItem('&nbsp;免费邮箱','/WebMail/','self',false,'',null,'','','',''));
mpmenu9.addItem(new mMenuItem('&nbsp;免费留言簿','/GuestBook/','self',false,'',null,'','','',''));
mpmenu10=new mMenu('软件超市','','self','','','','');
mpmenu10.addItem(new mMenuItem('&nbsp;互联网工具','/SoftMarket/Index.Asp?CateID=1','self',false,'互联网工具',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;常用工具','/SoftMarket/Index.Asp?CateID=2','self',false,'常用工具',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;办公与家庭','/SoftMarket/Index.Asp?CateID=3','self',false,'办公与家庭',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;系统工具','/SoftMarket/Index.Asp?CateID=4','self',false,'系统工具',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;多媒体软件','/SoftMarket/Index.Asp?CateID=5','self',false,'多媒体软件',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;设计与制作','/SoftMarket/Index.Asp?CateID=6','self',false,'设计与制作',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;游戏与娱乐','/SoftMarket/Index.Asp?CateID=7','self',false,'游戏与娱乐',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;行业软件','/SoftMarket/Index.Asp?CateID=8','self',false,'行业软件',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;编程与开发','/SoftMarket/Index.Asp?CateID=9','self',false,'编程与开发',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;桌面风采','/SoftMarket/Index.Asp?CateID=10','self',false,'桌面风采',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;硬件驱动','/SoftMarket/Index.Asp?CateID=11','self',false,'硬件驱动',null,'','','',''));
mpmenu10.addItem(new mMenuItem('&nbsp;其它软件','/SoftMarket/Index.Asp?CateID=12','self',false,'其它软件',null,'','','',''));
mpmenu10.addItem(new mMenuItem(null,null,null,true));
mpmenu10.addItem(new mMenuItem('&nbsp;帮助(？)','/SoftMarket/faq.asp','self',false,'系统帮助',null,'','','',''));

mwritetodocument();
