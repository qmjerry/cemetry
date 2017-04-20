/*
movetable说明:

一.<table>属性设置
   type="grid"       将表格应用为movetable
   rowover="true"    设置行颜色是否交替
   rownum="数字"      设置表格序号是否显示,数字值为显示在第几列
   tooltip="true"    设置是否在每个单元格上加一个DIV层

二.标题栏<td>属性设置
   sum="1"              设置列是否合计
   pointtype=""            设置金额小数
   colcolor="颜色值"       设置列颜色
   chgcolor="true"         设置列是否显示不同颜色
   dataType=""             设置列数据类型
            "date"         日期
			"int"          数字 
			"money"        货币
			"percent"      百分比
			"string"       字符
   noresize="true"         设置列是否可以拖动

*/

var Main_Tab	= null;
var cur_row 	= null;
var cur_col 	= null;
var cur_cell	= null;
var Org_con  	= "";
var sort_col	= null;
var show_col	= false;
var charMode	= false;
var cur_bgc  	= "#DBEEFF"  //高亮度显示 "#BEC5DE"#003366
var cur_fc	    = "";
var arrow      =null;
//add by zhangzonghua at 20041229
var hasGroup   = false;
var titlerows  = 1;
var canClick   = true;

var _trClickObj = null;
var oCurrentRow = null;
var oCurrentRowNum     = null;
var oCurrentRowHandler = null;
var tb_isRowOver= true; //是否隔行颜色不同
//var tb_RowOverCss="border-bottom-color:#EDF4FA;background-color:#EDF4FA;"//隔行得颜色 #EDF4FA
var tb_RowOverCss = "background-color:#ffffff;color:#000000";//隔行颜色 #EDF4FA
var tb_RowDefaultCss = "background-color:#edf5f9;color:#000000";//默认行颜色 #EDF4FA
var eventRowIndex  = -1;
var	eventCellIndex = -1;
var isDebug = false;
var paddingLeft = 5;
var paddingRight = 5;
var lastColWidth = 1;

function initOneTable(){
  try{	
    var today = new Date();
    window.event.cancelBubble=true;		
    cur_row			= null;
    cur_col			= null;
    cur_cell		= null;
    sort_col		= null;
    tb_isNeedCount  = false
    tb_arrSum       = new Array();
    arrow = document.createElement("SPAN");
    arrow.style.cssText = "PADDING-RIGHT: 0px; MARGIN-TOP: -3px; PADDING-LEFT: 0px; FONT-SIZE: 15px; MARGIN-BOTTOM: 0px; PADDING-BOTTOM: 0px; OVERFLOW: hidden; WIDTH: 12px; COLOR: #ffff00; PADDING-TOP: 0px; FONT-FAMILY: webdings; HEIGHT: 18px";
    var tableList=document.all.tags("TABLE");
    for(var i=0;i<tableList.length;i++){
      if(typeof(tableList[i].type)=="undefined" || tableList[i].type != "grid") continue;
      if(typeof(tableList[i].titlerows)!="undefined"){		
	    titlerows = tableList[i].titlerows;	
	    //alert(titlerows);
      }
      if(typeof(tableList[i].canclick)!="undefined"){		
	    canClick = false;
      }
      var table = tableList[i];
      Main_Tab  = table;
      table.onclick = function f(){clickIt(this)};
      //table.onmousemove   = function f(){oneTableMouseMove(this);};
      //table.onmousedown   = function f(){oneTableMouseDown(this);};
      //table.width = "98%";	
      
      var groupObj = table.getElementsByTagName("COLGROUP");	
      var colGroup = document.createElement("colgroup");
      calLastWidth(listTable)

      var bodyWidth = eval(document.body.clientWidth);
      var tdTotalWidth = 0;
      var tbColCount = table.rows[0].cells.length;

      for(var j=0;j<tbColCount;j++){
	    if(groupObj.length==0){	
	      var col = document.createElement("col");
	      if (table.rows[0].cells[j].width > 0){
	        col.width = table.rows[0].cells[j].width;	
	      }else{	
	        if (table.rows[0].cells[j].innerText.length == 0 && j == 0){
              col.width = 24; //设置首列checkbox宽度
	        }else{
	          if (j == (tbColCount-2) && tdTotalWidth < bodyWidth){
		      			col.width = ""; //当列数过少,并且没有占满窗口时,设置最后一列的宽度为自动
	        	}else{
		      		col.width = table.rows[0].cells[j].innerText.length * 15;
	       		}			
	       		
	     }			
	   }
	   
	    tdTotalWidth = tdTotalWidth + eval(col.width);
	    table.rows[0].cells[j].align='center' //设置中间对齐
	    //table.rows[0].cells[j].width = "";
	    colGroup.appendChild(col);
	  }
			
	 //对数字求和
	  if(table.rows[0].cells[j].sum != null){
	    tb_isNeedCount= true
	  }
	  tb_arrSum[j]=0
	 }
	 if(groupObj.length==0){	
	   table.appendChild(colGroup);
	   table.colGroup = colGroup;
	 }else{
	   hasGroup = true;		
	   table.colGroup = groupObj[0];
	 }
	 //table.rows[0].cells[table.rows[0].cells.length-1].width = '99%' //2005-7-20
	 table.style.tableLayout = "fixed";
	 table.resizeFlag = false;
	 table.oldX = 0;
	 table.resizeIndex = -1;
       }
       if (Main_Tab != null){
	 formartCells(Main_Tab)
	 if (typeof(Main_Tab.tooltip)!="undefined" && Main_Tab.tooltip == "true"){
	   //Main_Tab.onmouseover = function f(){fnOver(this);};
	   //Main_Tab.onmouseout  = function f(){outIt(this);fnOut(this);};
	   //toolTipCells(Main_Tab);
	}
      }
      end = new Date().valueOf() - today
      window.status += "(spend time):" + end+"ms";
	  pageInitMouseEvent();
   }catch(ex){
     if(isDebug)
      alert('initOneTable():30' + ex.description)
   }
   
 }
/**
 * modify by zonghua,zhang at 20051212 
 * 对v3.0列表编辑,在生成页面的时候在每个td中加入一div
 * <div style='display:none'> add you component</div>
 * 在页面刷新时，由于要格式化一些td中的内容，对要那些td
 * 需要对其innerHTML处理
 */
function formartCells(table){
  try{
   var today = new Date();
   //格式化单元格格
   if (typeof(CString)=="undefined") execScript("Function vbTrim(v)\nvbTrim=Trim(CString(v))\nEnd Function\nFunction ChangeType(v)\nChangeType=v\nEnd Function\nFunction CString(n)\nIf IsNull(n) Then CString=\"\" Else CString=CStr(n)\nEnd Function\nFunction CCurrency(n)\nIf IsNull(n) Then CCurrency=0 Else CCurrency=CCur(n)\nEnd Function\nFunction IsDateTime(d)\nIsDateTime = IsDate(d)\nEnd Function\nFunction CDateTime(d)\nif IsDate(d) then CDateTime = CDate(d)\nEnd Function\nFunction FormatDate2(d, f)\nIf IsDate(d) Then FormatDate2 = FormatDateTime(d,f) Else FormatDate2 = \"\"\nEnd Function\nFunction FormatNumeric(n, p1)\nFormatNumeric=FormatNumber(n, p1, -1)\nEnd Function\nFunction FormatMoney(n, p1)\nFormatMoney = FormatCurrency(n, p1, -1)\nEnd Function\nFunction FormatPercentString(n, p1)\nFormatPercentString = FormatPercent(n, p1, 0,0,0)\nEnd Function", "VBScript");//softzyd
   var tb_sumCount =0		
   for(var kk = 0;kk<table.tBodies.length;kk++){
     tbody = table.tBodies[kk]			
    // 设置交换行变化的颜色
    for(var i=0; i<tbody.rows.length; i++){     
      var row = tbody.rows[i];
      if((i+1)%2==0 && (tb_isRowOver|| table.rowover=='true')){
        row.style.cssText +=";"+tb_RowOverCss;
      }else{
	    row.style.cssText +=";"+tb_RowDefaultCss;
      }				
      row.oBgc = row.currentStyle.backgroundColor;				
      row.oFc  = row.currentStyle.color;	
    }
    //2005-12-7
    // 格式化单元格	
    for (var j=0; j<table.rows[0].cells.length; j++ ){	
      var cellSet = table.rows[0].cells[j];
      if (typeof(cellSet) == 'undefined'){
	     continue;
      }
      if (cellSet.chgcolor !=null || cellSet.colcolor != null ||
          cellSet.sum != null || cellSet.dataType != null || 
          cellSet.pointtype != null || cellSet.percentType != null){
	     for (var i=0;i<tbody.rows.length;i++){
	       cell = tbody.rows[i].cells[j];
	        if (typeof(cell) == 'undefined'){
	          continue;
	        }
           //设置特定单元格颜色
	       if(cellSet.colcolor != null){	
	         cell.style.cssText +=";border-bottom-color: #ffffff;background-color: "+table.rows[0].cells[j].colcolor+";"							
	        //得到单元格当前样式
	         cell.oBgc = cell.currentStyle.backgroundColor;				
	         cell.oFc  = cell.currentStyle.color;	
	       }
	       if (cellSet.chgcolor !=null){
	        //得到单元格当前样式				
	          cell.oFc  = cell.currentStyle.color;	
            }
	        //对数字求和
            if(cellSet.sum != null && cell.innerText != ''){
	          var value = cell.innerText
	          value = checkFloat(value) ? parseFloat(value):0
              tb_arrSum[j] +=value

            }
	      //格式化日期

	     //格式化数字

		  //取出隐藏的DIV
          var tHtml = "";
	      if(cell.childNodes[0].tagName=="DIV"){
            var tHtml = cell.children[0].outerHTML;
          }

	     if(cellSet.dataType != null && cell.innerText != ''&& cellSet.dataType == "DATE"){
	       var ftype = table.rows[0].cells[j].dateType ==null?2:table.rows[0].cells[j].dateType
	       cell.innerText =formatDate2(cell.innerText,ftype)
           cell.innerHTML = tHtml+cell.innerText;
	       continue;
         }      
		   // 格式化%
	  if(cellSet.percent != null && cellSet.percent =='1' && cell.innerText != ''){	
	     cell.style.cssText = cell.style.cssText + ";text-align: right;"
	     var ftype = table.rows[0].cells[j].percentType ==null?2:table.rows[0].cells[j].percentType
	     if(cell.innerText!=''){
	       cell.innerText = FormatPercentString(cell.innerText,ftype)
	       cell.innerHTML = tHtml+cell.innerText;
	     }else{
	       cell.innerText =''
	     }
         continue;
	  }
	    if(cellSet.dataType != null && cellSet.dataType == "NUMBER" && cell.innerText != '' && ! isNaN(parseInt(cell.innerText))){
	     /* if (cellSet.pointtype != "int")
	       cell.style.cssText=cell.style.cssText + ";text-align: right;"
	      if(table.rows[0].cells[j].pointtype =='money'||table.rows[0].cells[j].pointtype =='price'){
	        cell.innerText = FormatNumeric(cell.innerText, getPointNum(table.rows[0].cells[j].pointtype))
	      }else if(table.rows[0].cells[j].pointtype == "quantity"){								
	        cell.innerText = commafy(ContDec2(cell.innerText,table.rows[0].cells[j].pointtype))
	      }*/
		 cell.style.cssText=cell.style.cssText + ";text-align: right;"
		/* 小数位格式化 */
        if(cellSet.pointtype != null) {
		    cell.innerText = ContDec3(cell.innerText,table.rows[0].cells[j].pointtype);
		}
		/* 千分位显示 */
        if(cellSet.micro != null && cellSet.micro == '1'){
		    cell.innerText = commafy(cell.innerText,'1');
		}
	    cell.innerHTML = tHtml+cell.innerText;
		continue;
	   }
        }
        }
      }
   }
  // 求和函数
  if(tb_isNeedCount){
   var tfoot = table.tFoot != null?table.tFoot:table.createTFoot()
   otr = tfoot.insertRow(0)
   for(var i=0;i< table.rows[0].cells.length;i++){
     otd = otr.insertCell(-1);
     otd.height = "20px";
     if( i==1 ){
       otd.style.cssText="font-size:10.0pt;font-weight: bold;text-align: center;"
       otd.innerText='合计';
     }
     //输出求和后的数字  
     if(table.rows[0].cells[i].sum =='1' && table.rows[0].cells[i].dataType == "NUMBER"){
       otd.style.cssText =otd.style.cssText+";text-align: right;"
       if(table.rows[0].cells[i].micro == '1'){	
	     if(tb_arrSum[i] != 0){
	        otd.innerText = commafy(tb_arrSum[i],'1');
		 }
	     else
	        otd.innerText=''
       }else{					
	     otd.innerText = commafy(ContDec3(tb_arrSum[i],table.rows[0].cells[i].pointtype))
       }
		 
     }
    //设置列背景颜色 
    if(table.rows[0].cells[i].colcolor != null){	
      otd.style.cssText +=";border: #CCCCCC;background-color: "+table.rows[0].cells[i].colcolor+";"
    }
   }
  }
  //处理tFoot元素
  /*if(table.tFoot){
    for(var ii=0;ii<table.tFoot.rows.length;ii++){	
      var k = 0
      var row = table.tFoot.rows[ii]
      for(var j=0;j<row.cells.length;j++){ 
        var colspan = row.cells[j].getAttribute('colspan')	
	if(j == row.cells.length-1){
	  colspan = 0
	}
	k += parseInt(colspan)				
	if(k > table.rows[0].cells.length) break; 	
          var colum = table.rows[0].cells[k-1]
	  var pointtype = colum.getAttribute('pointtype')				
	  var cell = row.cells[j]
	  if(pointtype != null && cell.innerText !='' && j != 1){				
	    //格式化数字 	将0格式化为空				
	    cell.style.cssText="color: #0000FF;font-weight: bold;text-align: right;"
	    if(pointtype =='money'|| pointtype =='price'){
	      if(cell.innerText!='')
	        cell.innerText = FormatNumeric(cell.innerText,getPointNum(pointtype))
              }else{
	        cell.innerText =cell.innerText==0?'':cell.innerText = commafy(ContDec2(cell.innerText,pointtype))
	      }
             //设置列背景颜色 
	      if(colum.colcolor != null){	
	        cell.style.cssText +=";border: #CCCCCC;background-color: "+colum.colcolor+";"
	      }	
	   }								
	   row.cells[j].oBgc = row.cells[j].currentStyle.backgroundColor;				
	   row.cells[j].oFc  = row.cells[j].currentStyle.color;	
	 }
       }
     }*/
     end = new Date().valueOf() - today
     window.status += "(formartCells spend time):" + end+"ms";
   }catch(e){
     if(isDebug)
       alert('formartCells() :'+e.description)	
   }
 }


 function oneTableMouseMove(obj){
   try{	 
    var _theobj = event.srcElement;
    var td	= get_Element(_theobj,"td");		
    if(typeof(td)=="undefined")return;

    if(titlerows==1){
      while(td.tagName!="TD") td = td.parentElement;
      var tr = td.parentElement;
			
      if(event.offsetX>td.clientWidth-5){
	event.srcElement.style.cursor = "col-resize";
	obj.resizeFlag = true				
      }else if(event.button==1&&obj.resizeFlag==true){
	event.srcElement.style.cursor = "col-resize";
      }else{
	event.srcElement.style.cursor = "";
	if(tr.rowIndex == 0){
	  event.srcElement.style.cursor = "hand";		
	}
	if(obj.rows[0].cells[td.cellIndex].dragable){
	}				
	obj.resizeFlag=false;
      }
      if(tr.rowIndex != 0){
      }
      if(obj.rows[0].cells[td.cellIndex].noresize && 
         obj.rows[0].cells[td.cellIndex].noresize=="true" && tr.rowIndex == 0){
         event.srcElement.style.cursor = "hand";
         obj.resizeFlag = false;				
      }
      eventRowIndex  = tr.rowIndex
      eventCellIndex =	td.cellIndex
      if(event.button==1 && obj.resizeFlag==true){				
	    if(obj.resizeIndex == -1){
          obj.resizeIndex=obj.resizeIndex<td.cellIndex?td.cellIndex:obj.resizeIndex
        }					
        var width = window.event.clientX - obj.rows[0].cells[obj.resizeIndex].getBoundingClientRect().left			
        obj.colGroup.children[obj.resizeIndex].width = width<2?2:width;
		
        dw = parseInt(window.document.body.offsetWidth)
        var lastCol = obj.colGroup.children[obj.rows[0].cells.length-1]
        if(dw - parseInt(obj.offsetWidth) >0){					
          lastCol.width = parseInt(lastCol.width) + (dw - parseInt(obj.offsetWidth))
        }else{						
          var divF = document.all.divF
          if(divF==null)divF=window
          if((parseInt(divF.scrollWidth)- parseInt(divF.scrollLeft)) == dw){
            scrollbarSize = parseInt(divF.scrollWidth)-parseInt(divF.clientWidth)
          }
        }				
        obj.oldX = event.x;
      }
    }
    var the_obj = td;
    var mask    =  getParentTable(the_obj);
  }catch(e){ 
    if(isDebug)
      alert("oneTableMouseMove() 114:"+e.discription)
  }
}	

function oneTableMouseDown(obj){
  try{
    var _theobj = event.srcElement;	
    var td	= get_Element(_theobj,"td");		
    if(typeof(td)=="undefined")return;
	   while(td.tagName!="TD") td = td.parentElement;
	   if((event.offsetX>td.clientWidth-5)&&(event.button==1)){
	     obj.oldX = event.x;
	     obj.resizeIndex = td.cellIndex;
	     obj.resizeFlag=true;
	   }else{
	
	   }
	}catch(e){
		if(isDebug)
			alert('oneTableMouseDown() 240:'+e.description)
	}
}

function clickIt(obj){
  try{
    event.cancelBubble=true;
    var the_obj = event.srcElement;
    var i = 0 ,j = 0;    
    if(the_obj.tagName.toLowerCase() != "table" && the_obj.tagName.toLowerCase() != "tbody" && the_obj.tagName.toLowerCase() != "tr"){
        var the_td	= get_Element(the_obj,"td");
        
        if(the_td==null) return;
       // alert(the_td.outerHTML.match('INPUT'));
        if(the_td.outerHTML.match('INPUT')!=null) return ;
        
        if(the_td.outerHTML.match('操')!=null) return ;
        
        var the_tr	= the_td.parentElement;
        var the_table	= get_Element(the_td,"table");
        var i = 0;
	    clear_color();
	    cur_row = the_tr.rowIndex;
	    cur_col = the_td.cellIndex;
	    data_col = getTdCellIndex(the_tr, the_td);   //重新数据列中占用格子数
	    if((cur_row != titlerows - 1)&& typeof(the_tr.cells) != "undefined"){            
            if (cur_row > titlerows - 1){
                the_tr.style.backgroundColor = cur_bgc;
        		for(i=0;i<the_tr.cells.length-1;i++){
        		    with(the_tr.cells[i]){
                        if (typeof(oBgc) != 'undefined'){
                            style.backgroundColor=cur_bgc;						
                        }
        			    style.color=cur_fc;
        			    //设置超链接的高亮度
        			    aGroup = the_table.getElementsByTagName("A");
                		if (aGroup.length > 0){
                		   aGroup[0].oFc=aGroup[0].style.color;
                		   aGroup[0].style.color=cur_fc;
        		        }
        			}
                }            
        	    //设置当第一次单击后侧取消后面再击的事件
        	    if (oCurrentRowNum != cur_row){
                    if (oCurrentRowHandler != null){
                        oCurrentRow.onclick =  oCurrentRowHandler;
                    }
                    oCurrentRow = the_tr;
                    oCurrentRowNum = cur_row;
                    oCurrentRowHandler = oCurrentRow.onclick;
                    oCurrentRow.onclick =  "function() { return false; }";
        	    }
    	    }
		 }else{
            if(canClick){                
     		    the_td.mode = !the_td.mode;	
    		    arrow.innerHTML	= the_td.mode?"5":"6";
    		    obj.rows[cur_row].cells[cur_col].insertBefore(arrow);
    		    if(setIsSort(Main_Tab,cur_col)){
    			    if (oCurrentRowHandler != null){
    				  oCurrentRow.onclick =  oCurrentRowHandler;
    			    }    			    
                    sort_tab(Main_Tab,cur_col,data_col,the_td.mode);
                    sort_col=data_col;
		        }
		    }
        }
    }
	}catch(e){
      if(isDebug)
		alert('clickIt() 316:'+e.description)	
	}
 }
 
function getTdCellIndex(the_tr, the_td){
    if (the_tr == null || the_td == null){
        return -1;
    }
    
    var index = -1;
    for (i = 0; i < the_tr.cells.length; i++){
        var oTd = the_tr.cells[i];
        index += parseInt(oTd.colSpan);
        if (oTd == the_td){
            break;
        }
    }
    return index;
}
function clear_color(){
  try{
	the_table=Main_Tab;
 	if(cur_row!=null && cur_row>0){
	  with(the_table.rows[cur_row]){
	    if (typeof(oBgc) != 'undefined'){
		  style.backgroundColor=oBgc;  //设置行的背景
		 }
	  }
	  for(r=0;r<the_table.rows[cur_row].cells.length;r++){
		 with(the_table.rows[cur_row].cells[r]){
		 //恢复单元格北景
		 if (typeof(oBgc) != 'undefined'){
		   style.backgroundColor=oBgc; 
		 }
		 //恢复单元格字体色
		 if (typeof(oFc) != 'undefined'){
			style.color=oFc;
		 }else{
			style.color=the_table.rows[cur_row].oFc;
		 }
		  //清除超链接的高亮度
		 aGroupClear =the_table.getElementsByTagName("A");
		  if (aGroupClear.length > 0){
			aGroupClear[0].style.color=aGroupClear[0].oFc;
		  }
		}
	  }
	}
   }catch(e){
      if(isDebug)
		alert('clear_color() 557:'+e.description)
   }	 
}
// 得到数据类型2005-7-29
function getDataType(the_table,cellIndex){
  var cell = the_table.rows[0].cells[cellIndex]
  return cell.pointtype?cell.pointtype:(cell.dataType?cell.dataType:'string')
}
 
function read_def(the_table){
  try{
    var dateType  =''
	for(var i=1;i<the_table.rows.length;i++){		
	  for(var j=0;j<the_table.rows[i].cells.length;j++){			
	    with(the_table.rows[i]){	
		 cells[j].oBgc = cells[j].currentStyle.backgroundColor;				
		 cells[j].oFc  = cells[j].currentStyle.color;		
	   }		
	 }
   }
  }catch(e){
     if(isDebug)
	   alert('read_def() 591:'+e.description) 
  }  
}
 function get_Pos(the_obj){
  try{
	the_top = the_obj.offsetTop - document.body.scrollTop; 
	the_left = the_obj.offsetLeft - document.body.scrollLeft; 
	while(the_obj=the_obj.offsetParent){ 
	  the_top += the_obj.offsetTop; 
	  the_left += the_obj.offsetLeft; 
	}
	this.top = the_top; 
	this.left = the_left; 
  }catch(e){
    if(isDebug)
	  alert('get_Pos() 615:'+e.description)  
  }
}


function get_Element(the_ele,the_tag){
  try{
	the_tag = the_tag.toLowerCase();
	if(the_ele.tagName.toLowerCase()==the_tag)return the_ele;
	while(the_ele=the_ele.offsetParent){
	  if(the_ele.tagName.toLowerCase()==the_tag)return the_ele;
	}
	return(null);
  }catch(e){
    if(isDebug)
	  alert('get_Element() 629:'+e.description)
	return(null);
 }
}


function getParentTable(selObj){
  try{
    var obj =selObj
    if (typeof(obj)=="undefined") return "false" ;
    for (;;){
      obj =obj.parentElement ;
      if (obj.tagName =="TABLE") {
        if(obj.type=="undefined"||obj.type!="grid"){
          return false;
        }else if(obj.type=="grid"){
           if(obj.rows.length>2){
	         return "true" ;
	    }else{
	        return "false";
	    }
      }            
    }
    if (obj.tagName =="BODY") {
      return "false" ;
    }
  }
 return "false" ;
  }catch(e){
      	if(isDebug)
			alert('getParentTable() 641:'+e.description)   
  } 
}

function outIt(obj){
  try{
   }catch(e){
     if(isDebug)
	   alert('outIt() 666:'+e.description)  
  }  
}
var qswhU2GB=["D2BB","B6A1","8140","C6DF","8141","8142","8143","CDF2","D5C9","C8FD","C9CF","CFC2","D8A2","B2BB","D3EB","8144","D8A4","B3F3","8145","D7A8","C7D2","D8A7","CAC0","8146","C7F0","B1FB","D2B5","B4D4","B6AB","CBBF","D8A9","8147","8148","8149","B6AA","814A","C1BD","D1CF","814B","C9A5","D8AD","814C","B8F6","D1BE","E3DC","D6D0","814D","814E","B7E1","814F","B4AE","8150","C1D9","8151","D8BC","8152","CDE8","B5A4","CEAA","D6F7","8153","C0F6","BED9","D8AF","8154","8155","8156","C4CB","8157","BEC3","8158","D8B1","C3B4","D2E5","8159","D6AE","CEDA","D5A7","BAF5","B7A6","C0D6","815A","C6B9","C5D2","C7C7","815B","B9D4","815C","B3CB","D2D2","815D","815E","D8BF","BEC5","C6F2","D2B2","CFB0","CFE7","815F","8160","8161","8162","CAE9","8163","8164","D8C0","8165","8166","8167","8168","8169","816A","C2F2","C2D2","816B","C8E9","816C","816D","816E","816F","8170","8171","8172","8173","8174","8175","C7AC","8176","8177","8178","8179","817A","817B","817C","C1CB","817D","D3E8","D5F9","817E","CAC2","B6FE","D8A1","D3DA","BFF7","8180","D4C6","BBA5","D8C1","CEE5","BEAE","8181","8182","D8A8","8183","D1C7","D0A9","8184","8185","8186","D8BD","D9EF","CDF6","BFBA","8187","BDBB","BAA5","D2E0","B2FA","BAE0","C4B6","8188","CFED","BEA9","CDA4","C1C1","8189","818A","818B","C7D7","D9F1","818C","D9F4","818D","818E","818F","8190","C8CB","D8E9","8191","8192","8193","D2DA","CAB2","C8CA","D8EC","D8EA","D8C6","BDF6","C6CD","B3F0","8194","D8EB","BDF1","BDE9","8195","C8D4","B4D3","8196","8197","C2D8","8198","B2D6","D7D0","CACB","CBFB","D5CC","B8B6","CFC9","8199","819A","819B","D9DA","D8F0","C7AA","819C","D8EE","819D","B4FA","C1EE","D2D4","819E","819F","D8ED","81A0","D2C7","D8EF","C3C7","81A1","81A2","81A3","D1F6","81A4","D6D9","D8F2","81A5","D8F5","BCFE","BCDB","81A6","81A7","81A8","C8CE","81A9","B7DD","81AA","B7C2","81AB","C6F3","81AC","81AD","81AE","81AF","81B0","81B1","81B2","D8F8","D2C1","81B3","81B4","CEE9","BCBF","B7FC","B7A5","D0DD","81B5","81B6","81B7","81B8","81B9","D6DA","D3C5","BBEF","BBE1","D8F1","81BA","81BB","C9A1","CEB0","B4AB","81BC","D8F3","81BD","C9CB","D8F6","C2D7","D8F7","81BE","81BF","CEB1","D8F9","81C0","81C1","81C2","B2AE","B9C0","81C3","D9A3","81C4","B0E9","81C5","C1E6","81C6","C9EC","81C7","CBC5","81C8","CBC6","D9A4","81C9","81CA","81CB","81CC","81CD","B5E8","81CE","81CF","B5AB","81D0","81D1","81D2","81D3","81D4","81D5","CEBB","B5CD","D7A1","D7F4","D3D3","81D6","CCE5","81D7","BACE","81D8","D9A2","D9DC","D3E0","D8FD","B7F0","D7F7","D8FE","D8FA","D9A1","C4E3","81D9","81DA","D3B6","D8F4","D9DD","81DB","D8FB","81DC","C5E5","81DD","81DE","C0D0","81DF","81E0","D1F0","B0DB","81E1","81E2","BCD1","D9A6","81E3","D9A5","81E4","81E5","81E6","81E7","D9AC","D9AE","81E8","D9AB","CAB9","81E9","81EA","81EB","D9A9","D6B6","81EC","81ED","81EE","B3DE","D9A8","81EF","C0FD","81F0","CACC","81F1","D9AA","81F2","D9A7","81F3","81F4","D9B0","81F5","81F6","B6B1","81F7","81F8","81F9","B9A9","81FA","D2C0","81FB","81FC","CFC0","81FD","81FE","C2C2","8240","BDC4","D5EC","B2E0","C7C8","BFEB","D9AD","8241","D9AF","8242","CEEA","BAEE","8243","8244","8245","8246","8247","C7D6","8248","8249","824A","824B","824C","824D","824E","824F","8250","B1E3","8251","8252","8253","B4D9","B6ED","D9B4","8254","8255","8256","8257","BFA1","8258","8259","825A","D9DE","C7CE","C0FE","D9B8","825B","825C","825D","825E","825F","CBD7","B7FD","8260","D9B5","8261","D9B7","B1A3","D3E1","D9B9","8262","D0C5","8263","D9B6","8264","8265","D9B1","8266","D9B2","C1A9","D9B3","8267","8268","BCF3","D0DE","B8A9","8269","BEE3","826A","D9BD","826B","826C","826D","826E","D9BA","826F","B0B3","8270","8271","8272","D9C2","8273","8274","8275","8276","8277","8278","8279","827A","827B","827C","827D","827E","8280","D9C4","B1B6","8281","D9BF","8282","8283","B5B9","8284","BEF3","8285","8286","8287","CCC8","BAF2","D2D0","8288","D9C3","8289","828A","BDE8","828B","B3AB","828C","828D","828E","D9C5","BEEB","828F","D9C6","D9BB","C4DF","8290","D9BE","D9C1","D9C0","8291","8292","8293","8294","8295","8296","8297","8298","8299","829A","829B","D5AE","829C","D6B5","829D","C7E3","829E","829F","82A0","82A1","D9C8","82A2","82A3","82A4","BCD9","D9CA","82A5","82A6","82A7","D9BC","82A8","D9CB","C6AB","82A9","82AA","82AB","82AC","82AD","D9C9","82AE","82AF","82B0","82B1","D7F6","82B2","CDA3","82B3","82B4","82B5","82B6","82B7","82B8","82B9","82BA","BDA1","82BB","82BC","82BD","82BE","82BF","82C0","D9CC","82C1","82C2","82C3","82C4","82C5","82C6","82C7","82C8","82C9","C5BC","CDB5","82CA","82CB","82CC","D9CD","82CD","82CE","D9C7","B3A5","BFFE","82CF","82D0","82D1","82D2","B8B5","82D3","82D4","C0FC","82D5","82D6","82D7","82D8","B0F8","82D9","82DA","82DB","82DC","82DD","82DE","82DF","82E0","82E1","82E2","82E3","82E4","82E5","82E6","82E7","82E8","82E9","82EA","82EB","82EC","82ED","B4F6","82EE","D9CE","82EF","D9CF","B4A2","D9D0","82F0","82F1","B4DF","82F2","82F3","82F4","82F5","82F6","B0C1","82F7","82F8","82F9","82FA","82FB","82FC","82FD","D9D1","C9B5","82FE","8340","8341","8342","8343","8344","8345","8346","8347","8348","8349","834A","834B","834C","834D","834E","834F","8350","8351","CFF1","8352","8353","8354","8355","8356","8357","D9D2","8358","8359","835A","C1C5","835B","835C","835D","835E","835F","8360","8361","8362","8363","8364","8365","D9D6","C9AE","8366","8367","8368","8369","D9D5","D9D4","D9D7","836A","836B","836C","836D","CBDB","836E","BDA9","836F","8370","8371","8372","8373","C6A7","8374","8375","8376","8377","8378","8379","837A","837B","837C","837D","D9D3","D9D8","837E","8380","8381","D9D9","8382","8383","8384","8385","8386","8387","C8E5","8388","8389","838A","838B","838C","838D","838E","838F","8390","8391","8392","8393","8394","8395","C0DC","8396","8397","8398","8399","839A","839B","839C","839D","839E","839F","83A0","83A1","83A2","83A3","83A4","83A5","83A6","83A7","83A8","83A9","83AA","83AB","83AC","83AD","83AE","83AF","83B0","83B1","83B2","B6F9","D8A3","D4CA","83B3","D4AA","D0D6","B3E4","D5D7","83B4","CFC8","B9E2","83B5","BFCB","83B6","C3E2","83B7","83B8","83B9","B6D2","83BA","83BB","CDC3","D9EE","D9F0","83BC","83BD","83BE","B5B3","83BF","B6B5","83C0","83C1","83C2","83C3","83C4","BEA4","83C5","83C6","C8EB","83C7","83C8","C8AB","83C9","83CA","B0CB","B9AB","C1F9","D9E2","83CB","C0BC","B9B2","83CC","B9D8","D0CB","B1F8","C6E4","BEDF","B5E4","D7C8","83CD","D1F8","BCE6","CADE","83CE","83CF","BCBD","D9E6","D8E7","83D0","83D1","C4DA","83D2","83D3","B8D4","C8BD","83D4","83D5","B2E1","D4D9","83D6","83D7","83D8","83D9","C3B0","83DA","83DB","C3E1","DAA2","C8DF","83DC","D0B4","83DD","BEFC","C5A9","83DE","83DF","83E0","B9DA","83E1","DAA3","83E2","D4A9","DAA4","83E3","83E4","83E5","83E6","83E7","D9FB","B6AC","83E8","83E9","B7EB","B1F9","D9FC","B3E5","BEF6","83EA","BFF6","D2B1","C0E4","83EB","83EC","83ED","B6B3","D9FE","D9FD","83EE","83EF","BEBB","83F0","83F1","83F2","C6E0","83F3","D7BC","DAA1","83F4","C1B9","83F5","B5F2","C1E8","83F6","83F7","BCF5","83F8","B4D5","83F9","83FA","83FB","83FC","83FD","83FE","8440","8441","8442","C1DD","8443","C4FD","8444","8445","BCB8","B7B2","8446","8447","B7EF","8448","8449","844A","844B","844C","844D","D9EC","844E","C6BE","844F","BFAD","BBCB","8450","8451","B5CA","8452","DBC9","D0D7","8453","CDB9","B0BC","B3F6","BBF7","DBCA","BAAF","8454","D4E4","B5B6","B5F3","D8D6","C8D0","8455","8456","B7D6","C7D0","D8D7","8457","BFAF","8458","8459","DBBB","D8D8","845A","845B","D0CC","BBAE","845C","845D","845E","EBBE","C1D0","C1F5","D4F2","B8D5","B4B4","845F","B3F5","8460","8461","C9BE","8462","8463","8464","C5D0","8465","8466","8467","C5D9","C0FB","8468","B1F0","8469","D8D9","B9CE","846A","B5BD","846B","846C","D8DA","846D","846E","D6C6","CBA2","C8AF","C9B2","B4CC","BFCC","846F","B9F4","8470","D8DB","D8DC","B6E7","BCC1","CCEA","8471","8472","8473","8474","8475","8476","CFF7","8477","D8DD","C7B0","8478","8479","B9D0","BDA3","847A","847B","CCDE","847C","C6CA","847D","847E","8480","8481","8482","D8E0","8483","D8DE","8484","8485","D8DF","8486","8487","8488","B0FE","8489","BEE7","848A","CAA3","BCF4","848B","848C","848D","848E","B8B1","848F","8490","B8EE","8491","8492","8493","8494","8495","8496","8497","8498","8499","849A","D8E2","849B","BDCB","849C","D8E4","D8E3","849D","849E","849F","84A0","84A1","C5FC","84A2","84A3","84A4","84A5","84A6","84A7","84A8","D8E5","84A9","84AA","D8E6","84AB","84AC","84AD","84AE","84AF","84B0","84B1","C1A6","84B2","C8B0","B0EC","B9A6","BCD3","CEF1","DBBD","C1D3","84B3","84B4","84B5","84B6","B6AF","D6FA","C5AC","BDD9","DBBE","DBBF","84B7","84B8","84B9","C0F8","BEA2","C0CD","84BA","84BB","84BC","84BD","84BE","84BF","84C0","84C1","84C2","84C3","DBC0","CAC6","84C4","84C5","84C6","B2AA","84C7","84C8","84C9","D3C2","84CA","C3E3","84CB","D1AB","84CC","84CD","84CE","84CF","DBC2","84D0","C0D5","84D1","84D2","84D3","DBC3","84D4","BFB1","84D5","84D6","84D7","84D8","84D9","84DA","C4BC","84DB","84DC","84DD","84DE","C7DA","84DF","84E0","84E1","84E2","84E3","84E4","84E5","84E6","84E7","84E8","84E9","DBC4","84EA","84EB","84EC","84ED","84EE","84EF","84F0","84F1","D9E8","C9D7","84F2","84F3","84F4","B9B4","CEF0","D4C8","84F5","84F6","84F7","84F8","B0FC","B4D2","84F9","D0D9","84FA","84FB","84FC","84FD","D9E9","84FE","DECB","D9EB","8540","8541","8542","8543","D8B0","BBAF","B1B1","8544","B3D7","D8CE","8545","8546","D4D1","8547","8548","BDB3","BFEF","8549","CFBB","854A","854B","D8D0","854C","854D","854E","B7CB","854F","8550","8551","D8D1","8552","8553","8554","8555","8556","8557","8558","8559","855A","855B","C6A5","C7F8","D2BD","855C","855D","D8D2","C4E4","855E","CAAE","855F","C7A7","8560","D8A6","8561","C9FD","CEE7","BBDC","B0EB","8562","8563","8564","BBAA","D0AD","8565","B1B0","D7E4","D7BF","8566","B5A5","C2F4","C4CF","8567","8568","B2A9","8569","B2B7","856A","B1E5","DFB2","D5BC","BFA8","C2AC","D8D5","C2B1","856B","D8D4","CED4","856C","DAE0","856D","CEC0","856E","856F","D8B4","C3AE","D3A1","CEA3","8570","BCB4","C8B4","C2D1","8571","BEED","D0B6","8572","DAE1","8573","8574","8575","8576","C7E4","8577","8578","B3A7","8579","B6F2","CCFC","C0FA","857A","857B","C0F7","857C","D1B9","D1E1","D8C7","857D","857E","8580","8581","8582","8583","8584","B2DE","8585","8586","C0E5","8587","BAF1","8588","8589","D8C8","858A","D4AD","858B","858C","CFE1","D8C9","858D","D8CA","CFC3","858E","B3F8","BEC7","858F","8590","8591","8592","D8CB","8593","8594","8595","8596","8597","8598","8599","DBCC","859A","859B","859C","859D","C8A5","859E","859F","85A0","CFD8","85A1","C8FE","B2CE","85A2","85A3","85A4","85A5","85A6","D3D6","B2E6","BCB0","D3D1","CBAB","B7B4","85A7","85A8","85A9","B7A2","85AA","85AB","CAE5","85AC","C8A1","CADC","B1E4","D0F0","85AD","C5D1","85AE","85AF","85B0","DBC5","B5FE","85B1","85B2","BFDA","B9C5","BEE4","C1ED","85B3","DFB6","DFB5","D6BB","BDD0","D5D9","B0C8","B6A3","BFC9","CCA8","DFB3","CAB7","D3D2","85B4","D8CF","D2B6","BAC5","CBBE","CCBE","85B5","DFB7","B5F0","DFB4","85B6","85B7","85B8","D3F5","85B9","B3D4","B8F7","85BA","DFBA","85BB","BACF","BCAA","B5F5","85BC","CDAC","C3FB","BAF3","C0F4","CDC2","CFF2","DFB8","CFC5","85BD","C2C0","DFB9","C2F0","85BE","85BF","85C0","BEFD","85C1","C1DF","CDCC","D2F7","B7CD","DFC1","85C2","DFC4","85C3","85C4","B7F1","B0C9","B6D6","B7D4","85C5","BAAC","CCFD","BFD4","CBB1","C6F4","85C6","D6A8","DFC5","85C7","CEE2","B3B3","85C8","85C9","CEFC","B4B5","85CA","CEC7","BAF0","85CB","CEE1","85CC","D1BD","85CD","85CE","DFC0","85CF","85D0","B4F4","85D1","B3CA","85D2","B8E6","DFBB","85D3","85D4","85D5","85D6","C4C5","85D7","DFBC","DFBD","DFBE","C5BB","DFBF","DFC2","D4B1","DFC3","85D8","C7BA","CED8","85D9","85DA","85DB","85DC","85DD","C4D8","85DE","DFCA","85DF","DFCF","85E0","D6DC","85E1","85E2","85E3","85E4","85E5","85E6","85E7","85E8","DFC9","DFDA","CEB6","85E9","BAC7","DFCE","DFC8","C5DE","85EA","85EB","C9EB","BAF4","C3FC","85EC","85ED","BED7","85EE","DFC6","85EF","DFCD","85F0","C5D8","85F1","85F2","85F3","85F4","D5A6","BACD","85F5","BECC","D3BD","B8C0","85F6","D6E4","85F7","DFC7","B9BE","BFA7","85F8","85F9","C1FC","DFCB","DFCC","85FA","DFD0","85FB","85FC","85FD","85FE","8640","DFDB","DFE5","8641","DFD7","DFD6","D7C9","DFE3","DFE4","E5EB","D2A7","DFD2","8642","BFA9","8643","D4DB","8644","BFC8","DFD4","8645","8646","8647","CFCC","8648","8649","DFDD","864A","D1CA","864B","DFDE","B0A7","C6B7","DFD3","864C","BAE5","864D","B6DF","CDDB","B9FE","D4D5","864E","864F","DFDF","CFEC","B0A5","DFE7","DFD1","D1C6","DFD5","DFD8","DFD9","DFDC","8650","BBA9","8651","DFE0","DFE1","8652","DFE2","DFE6","DFE8","D3B4","8653","8654","8655","8656","8657","B8E7","C5B6","DFEA","C9DA","C1A8","C4C4","8658","8659","BFDE","CFF8","865A","865B","865C","D5DC","DFEE","865D","865E","865F","8660","8661","8662","B2B8","8663","BADF","DFEC","8664","DBC1","8665","D1E4","8666","8667","8668","8669","CBF4","B4BD","866A","B0A6","866B","866C","866D","866E","866F","DFF1","CCC6","DFF2","8670","8671","DFED","8672","8673","8674","8675","8676","8677","DFE9","8678","8679","867A","867B","DFEB","867C","DFEF","DFF0","BBBD","867D","867E","DFF3","8680","8681","DFF4","8682","BBA3","8683","CADB","CEA8","E0A7","B3AA","8684","E0A6","8685","8686","8687","E0A1","8688","8689","868A","868B","DFFE","868C","CDD9","DFFC","868D","DFFA","868E","BFD0","D7C4","868F","C9CC","8690","8691","DFF8","B0A1","8692","8693","8694","8695","8696","DFFD","8697","8698","8699","869A","DFFB","E0A2","869B","869C","869D","869E","869F","E0A8","86A0","86A1","86A2","86A3","B7C8","86A4","86A5","C6A1","C9B6","C0B2","DFF5","86A6","86A7","C5BE","86A8","D8C4","DFF9","C4F6","86A9","86AA","86AB","86AC","86AD","86AE","E0A3","E0A4","E0A5","D0A5","86AF","86B0","E0B4","CCE4","86B1","E0B1","86B2","BFA6","E0AF","CEB9","E0AB","C9C6","86B3","86B4","C0AE","E0AE","BAED","BAB0","E0A9","86B5","86B6","86B7","DFF6","86B8","E0B3","86B9","86BA","E0B8","86BB","86BC","86BD","B4AD","E0B9","86BE","86BF","CFB2","BAC8","86C0","E0B0","86C1","86C2","86C3","86C4","86C5","86C6","86C7","D0FA","86C8","86C9","86CA","86CB","86CC","86CD","86CE","86CF","86D0","E0AC","86D1","D4FB","86D2","DFF7","86D3","C5E7","86D4","E0AD","86D5","D3F7","86D6","E0B6","E0B7","86D7","86D8","86D9","86DA","86DB","E0C4","D0E1","86DC","86DD","86DE","E0BC","86DF","86E0","E0C9","E0CA","86E1","86E2","86E3","E0BE","E0AA","C9A4","E0C1","86E4","E0B2","86E5","86E6","86E7","86E8","86E9","CAC8","E0C3","86EA","E0B5","86EB","CECB","86EC","CBC3","E0CD","E0C6","E0C2","86ED","E0CB","86EE","E0BA","E0BF","E0C0","86EF","86F0","E0C5","86F1","86F2","E0C7","E0C8","86F3","E0CC","86F4","E0BB","86F5","86F6","86F7","86F8","86F9","CBD4","E0D5","86FA","E0D6","E0D2","86FB","86FC","86FD","86FE","8740","8741","E0D0","BCCE","8742","8743","E0D1","8744","B8C2","D8C5","8745","8746","8747","8748","8749","874A","874B","874C","D0EA","874D","874E","C2EF","874F","8750","E0CF","E0BD","8751","8752","8753","E0D4","E0D3","8754","8755","E0D7","8756","8757","8758","8759","E0DC","E0D8","875A","875B","875C","D6F6","B3B0","875D","D7EC","875E","CBBB","875F","8760","E0DA","8761","CEFB","8762","8763","8764","BAD9","8765","8766","8767","8768","8769","876A","876B","876C","876D","876E","876F","8770","E0E1","E0DD","D2AD","8771","8772","8773","8774","8775","E0E2","8776","8777","E0DB","E0D9","E0DF","8778","8779","E0E0","877A","877B","877C","877D","877E","E0DE","8780","E0E4","8781","8782","8783","C6F7","D8AC","D4EB","E0E6","CAC9","8784","8785","8786","8787","E0E5","8788","8789","878A","878B","B8C1","878C","878D","878E","878F","E0E7","E0E8","8790","8791","8792","8793","8794","8795","8796","8797","E0E9","E0E3","8798","8799","879A","879B","879C","879D","879E","BABF","CCE7","879F","87A0","87A1","E0EA","87A2","87A3","87A4","87A5","87A6","87A7","87A8","87A9","87AA","87AB","87AC","87AD","87AE","87AF","87B0","CFF9","87B1","87B2","87B3","87B4","87B5","87B6","87B7","87B8","87B9","87BA","87BB","E0EB","87BC","87BD","87BE","87BF","87C0","87C1","87C2","C8C2","87C3","87C4","87C5","87C6","BDC0","87C7","87C8","87C9","87CA","87CB","87CC","87CD","87CE","87CF","87D0","87D1","87D2","87D3","C4D2","87D4","87D5","87D6","87D7","87D8","87D9","87DA","87DB","87DC","E0EC","87DD","87DE","E0ED","87DF","87E0","C7F4","CBC4","87E1","E0EE","BBD8","D8B6","D2F2","E0EF","CDC5","87E2","B6DA","87E3","87E4","87E5","87E6","87E7","87E8","E0F1","87E9","D4B0","87EA","87EB","C0A7","B4D1","87EC","87ED","CEA7","E0F0","87EE","87EF","87F0","E0F2","B9CC","87F1","87F2","B9FA","CDBC","E0F3","87F3","87F4","87F5","C6D4","E0F4","87F6","D4B2","87F7","C8A6","E0F6","E0F5","87F8","87F9","87FA","87FB","87FC","87FD","87FE","8840","8841","8842","8843","8844","8845","8846","8847","8848","8849","E0F7","884A","884B","CDC1","884C","884D","884E","CAA5","884F","8850","8851","8852","D4DA","DBD7","DBD9","8853","DBD8","B9E7","DBDC","DBDD","B5D8","8854","8855","DBDA","8856","8857","8858","8859","885A","DBDB","B3A1","DBDF","885B","885C","BBF8","885D","D6B7","885E","DBE0","885F","8860","8861","8862","BEF9","8863","8864","B7BB","8865","DBD0","CCAE","BFB2","BBB5","D7F8","BFD3","8866","8867","8868","8869","886A","BFE9","886B","886C","BCE1","CCB3","DBDE","B0D3","CEEB","B7D8","D7B9","C6C2","886D","886E","C0A4","886F","CCB9","8870","DBE7","DBE1","C6BA","DBE3","8871","DBE8","8872","C5F7","8873","8874","8875","DBEA","8876","8877","DBE9","BFC0","8878","8879","887A","DBE6","DBE5","887B","887C","887D","887E","8880","B4B9","C0AC","C2A2","DBE2","DBE4","8881","8882","8883","8884","D0CD","DBED","8885","8886","8887","8888","8889","C0DD","DBF2","888A","888B","888C","888D","888E","888F","8890","B6E2","8891","8892","8893","8894","DBF3","DBD2","B9B8","D4AB","DBEC","8895","BFD1","DBF0","8896","DBD1","8897","B5E6","8898","DBEB","BFE5","8899","889A","889B","DBEE","889C","DBF1","889D","889E","889F","DBF9","88A0","88A1","88A2","88A3","88A4","88A5","88A6","88A7","88A8","B9A1","B0A3","88A9","88AA","88AB","88AC","88AD","88AE","88AF","C2F1","88B0","88B1","B3C7","DBEF","88B2","88B3","DBF8","88B4","C6D2","DBF4","88B5","88B6","DBF5","DBF7","DBF6","88B7","88B8","DBFE","88B9","D3F2","B2BA","88BA","88BB","88BC","DBFD","88BD","88BE","88BF","88C0","88C1","88C2","88C3","88C4","DCA4","88C5","DBFB","88C6","88C7","88C8","88C9","DBFA","88CA","88CB","88CC","DBFC","C5E0","BBF9","88CD","88CE","DCA3","88CF","88D0","DCA5","88D1","CCC3","88D2","88D3","88D4","B6D1","DDC0","88D5","88D6","88D7","DCA1","88D8","DCA2","88D9","88DA","88DB","C7B5","88DC","88DD","88DE","B6E9","88DF","88E0","88E1","DCA7","88E2","88E3","88E4","88E5","DCA6","88E6","DCA9","B1A4","88E7","88E8","B5CC","88E9","88EA","88EB","88EC","88ED","BFB0","88EE","88EF","88F0","88F1","88F2","D1DF","88F3","88F4","88F5","88F6","B6C2","88F7","88F8","88F9","88FA","88FB","88FC","88FD","88FE","8940","8941","8942","8943","8944","8945","DCA8","8946","8947","8948","8949","894A","894B","894C","CBFA","EBF3","894D","894E","894F","CBDC","8950","8951","CBFE","8952","8953","8954","CCC1","8955","8956","8957","8958","8959","C8FB","895A","895B","895C","895D","895E","895F","DCAA","8960","8961","8962","8963","8964","CCEE","DCAB","8965","8966","8967","8968","8969","896A","896B","896C","896D","896E","896F","8970","8971","8972","8973","8974","8975","DBD3","8976","DCAF","DCAC","8977","BEB3","8978","CAFB","8979","897A","897B","DCAD","897C","897D","897E","8980","8981","8982","8983","8984","C9CA","C4B9","8985","8986","8987","8988","8989","C7BD","DCAE","898A","898B","898C","D4F6","D0E6","898D","898E","898F","8990","8991","8992","8993","8994","C4AB","B6D5","8995","8996","8997","8998","8999","899A","899B","899C","899D","899E","899F","89A0","89A1","89A2","89A3","89A4","89A5","89A6","DBD4","89A7","89A8","89A9","89AA","B1DA","89AB","89AC","89AD","DBD5","89AE","89AF","89B0","89B1","89B2","89B3","89B4","89B5","89B6","89B7","89B8","DBD6","89B9","89BA","89BB","BABE","89BC","89BD","89BE","89BF","89C0","89C1","89C2","89C3","89C4","89C5","89C6","89C7","89C8","89C9","C8C0","89CA","89CB","89CC","89CD","89CE","89CF","CABF","C8C9","89D0","D7B3","89D1","C9F9","89D2","89D3","BFC7","89D4","89D5","BAF8","89D6","89D7","D2BC","89D8","89D9","89DA","89DB","89DC","89DD","89DE","89DF","E2BA","89E0","B4A6","89E1","89E2","B1B8","89E3","89E4","89E5","89E6","89E7","B8B4","89E8","CFC4","89E9","89EA","89EB","89EC","D9E7","CFA6","CDE2","89ED","89EE","D9ED","B6E0","89EF","D2B9","89F0","89F1","B9BB","89F2","89F3","89F4","89F5","E2B9","E2B7","89F6","B4F3","89F7","CCEC","CCAB","B7F2","89F8","D8B2","D1EB","BABB","89F9","CAA7","89FA","89FB","CDB7","89FC","89FD","D2C4","BFE4","BCD0","B6E1","89FE","DEC5","8A40","8A41","8A42","8A43","DEC6","DBBC","8A44","D1D9","8A45","8A46","C6E6","C4CE","B7EE","8A47","B7DC","8A48","8A49","BFFC","D7E0","8A4A","C6F5","8A4B","8A4C","B1BC","DEC8","BDB1","CCD7","DECA","8A4D","DEC9","8A4E","8A4F","8A50","8A51","8A52","B5EC","8A53","C9DD","8A54","8A55","B0C2","8A56","8A57","8A58","8A59","8A5A","8A5B","8A5C","8A5D","8A5E","8A5F","8A60","8A61","8A62","C5AE","C5AB","8A63","C4CC","8A64","BCE9","CBFD","8A65","8A66","8A67","BAC3","8A68","8A69","8A6A","E5F9","C8E7","E5FA","CDFD","8A6B","D7B1","B8BE","C2E8","8A6C","C8D1","8A6D","8A6E","E5FB","8A6F","8A70","8A71","8A72","B6CA","BCCB","8A73","8A74","D1FD","E6A1","8A75","C3EE","8A76","8A77","8A78","8A79","E6A4","8A7A","8A7B","8A7C","8A7D","E5FE","E6A5","CDD7","8A7E","8A80","B7C1","E5FC","E5FD","E6A3","8A81","8A82","C4DD","E6A8","8A83","8A84","E6A7","8A85","8A86","8A87","8A88","8A89","8A8A","C3C3","8A8B","C6DE","8A8C","8A8D","E6AA","8A8E","8A8F","8A90","8A91","8A92","8A93","8A94","C4B7","8A95","8A96","8A97","E6A2","CABC","8A98","8A99","8A9A","8A9B","BDE3","B9C3","E6A6","D0D5","CEAF","8A9C","8A9D","E6A9","E6B0","8A9E","D2A6","8A9F","BDAA","E6AD","8AA0","8AA1","8AA2","8AA3","8AA4","E6AF","8AA5","C0D1","8AA6","8AA7","D2CC","8AA8","8AA9","8AAA","BCA7","8AAB","8AAC","8AAD","8AAE","8AAF","8AB0","8AB1","8AB2","8AB3","8AB4","8AB5","8AB6","E6B1","8AB7","D2F6","8AB8","8AB9","8ABA","D7CB","8ABB","CDFE","8ABC","CDDE","C2A6","E6AB","E6AC","BDBF","E6AE","E6B3","8ABD","8ABE","E6B2","8ABF","8AC0","8AC1","8AC2","E6B6","8AC3","E6B8","8AC4","8AC5","8AC6","8AC7","C4EF","8AC8","8AC9","8ACA","C4C8","8ACB","8ACC","BEEA","C9EF","8ACD","8ACE","E6B7","8ACF","B6F0","8AD0","8AD1","8AD2","C3E4","8AD3","8AD4","8AD5","8AD6","8AD7","8AD8","8AD9","D3E9","E6B4","8ADA","E6B5","8ADB","C8A2","8ADC","8ADD","8ADE","8ADF","8AE0","E6BD","8AE1","8AE2","8AE3","E6B9","8AE4","8AE5","8AE6","8AE7","8AE8","C6C5","8AE9","8AEA","CDF1","E6BB","8AEB","8AEC","8AED","8AEE","8AEF","8AF0","8AF1","8AF2","8AF3","8AF4","E6BC","8AF5","8AF6","8AF7","8AF8","BBE9","8AF9","8AFA","8AFB","8AFC","8AFD","8AFE","8B40","E6BE","8B41","8B42","8B43","8B44","E6BA","8B45","8B46","C0B7","8B47","8B48","8B49","8B4A","8B4B","8B4C","8B4D","8B4E","8B4F","D3A4","E6BF","C9F4","E6C3","8B50","8B51","E6C4","8B52","8B53","8B54","8B55","D0F6","8B56","8B57","8B58","8B59","8B5A","8B5B","8B5C","8B5D","8B5E","8B5F","8B60","8B61","8B62","8B63","8B64","8B65","8B66","8B67","C3BD","8B68","8B69","8B6A","8B6B","8B6C","8B6D","8B6E","C3C4","E6C2","8B6F","8B70","8B71","8B72","8B73","8B74","8B75","8B76","8B77","8B78","8B79","8B7A","8B7B","8B7C","E6C1","8B7D","8B7E","8B80","8B81","8B82","8B83","8B84","E6C7","CFB1","8B85","EBF4","8B86","8B87","E6CA","8B88","8B89","8B8A","8B8B","8B8C","E6C5","8B8D","8B8E","BCDE","C9A9","8B8F","8B90","8B91","8B92","8B93","8B94","BCB5","8B95","8B96","CFD3","8B97","8B98","8B99","8B9A","8B9B","E6C8","8B9C","E6C9","8B9D","E6CE","8B9E","E6D0","8B9F","8BA0","8BA1","E6D1","8BA2","8BA3","8BA4","E6CB","B5D5","8BA5","E6CC","8BA6","8BA7","E6CF","8BA8","8BA9","C4DB","8BAA","E6C6","8BAB","8BAC","8BAD","8BAE","8BAF","E6CD","8BB0","8BB1","8BB2","8BB3","8BB4","8BB5","8BB6","8BB7","8BB8","8BB9","8BBA","8BBB","8BBC","8BBD","8BBE","8BBF","8BC0","8BC1","8BC2","8BC3","8BC4","8BC5","8BC6","E6D2","8BC7","8BC8","8BC9","8BCA","8BCB","8BCC","8BCD","8BCE","8BCF","8BD0","8BD1","8BD2","E6D4","E6D3","8BD3","8BD4","8BD5","8BD6","8BD7","8BD8","8BD9","8BDA","8BDB","8BDC","8BDD","8BDE","8BDF","8BE0","8BE1","8BE2","8BE3","8BE4","8BE5","8BE6","8BE7","8BE8","8BE9","8BEA","8BEB","8BEC","E6D5","8BED","D9F8","8BEE","8BEF","E6D6","8BF0","8BF1","8BF2","8BF3","8BF4","8BF5","8BF6","8BF7","E6D7","8BF8","8BF9","8BFA","8BFB","8BFC","8BFD","8BFE","8C40","8C41","8C42","8C43","8C44","8C45","8C46","8C47","D7D3","E6DD","8C48","E6DE","BFD7","D4D0","8C49","D7D6","B4E6","CBEF","E6DA","D8C3","D7CE","D0A2","8C4A","C3CF","8C4B","8C4C","E6DF","BCBE","B9C2","E6DB","D1A7","8C4D","8C4E","BAA2","C2CF","8C4F","D8AB","8C50","8C51","8C52","CAEB","E5EE","8C53","E6DC","8C54","B7F5","8C55","8C56","8C57","8C58","C8E6","8C59","8C5A","C4F5","8C5B","8C5C","E5B2","C4FE","8C5D","CBFC","E5B3","D5AC","8C5E","D3EE","CAD8","B0B2","8C5F","CBCE","CDEA","8C60","8C61","BAEA","8C62","8C63","8C64","E5B5","8C65","E5B4","8C66","D7DA","B9D9","D6E6","B6A8","CDF0","D2CB","B1A6","CAB5","8C67","B3E8","C9F3","BFCD","D0FB","CAD2","E5B6","BBC2","8C68","8C69","8C6A","CFDC","B9AC","8C6B","8C6C","8C6D","8C6E","D4D7","8C6F","8C70","BAA6","D1E7","CFFC","BCD2","8C71","E5B7","C8DD","8C72","8C73","8C74","BFED","B1F6","CBDE","8C75","8C76","BCC5","8C77","BCC4","D2FA","C3DC","BFDC","8C78","8C79","8C7A","8C7B","B8BB","8C7C","8C7D","8C7E","C3C2","8C80","BAAE","D4A2","8C81","8C82","8C83","8C84","8C85","8C86","8C87","8C88","8C89","C7DE","C4AF","B2EC","8C8A","B9D1","8C8B","8C8C","E5BB","C1C8","8C8D","8C8E","D5AF","8C8F","8C90","8C91","8C92","8C93","E5BC","8C94","E5BE","8C95","8C96","8C97","8C98","8C99","8C9A","8C9B","B4E7","B6D4","CBC2","D1B0","B5BC","8C9C","8C9D","CAD9","8C9E","B7E2","8C9F","8CA0","C9E4","8CA1","BDAB","8CA2","8CA3","CEBE","D7F0","8CA4","8CA5","8CA6","8CA7","D0A1","8CA8","C9D9","8CA9","8CAA","B6FB","E6D8","BCE2","8CAB","B3BE","8CAC","C9D0","8CAD","E6D9","B3A2","8CAE","8CAF","8CB0","8CB1","DECC","8CB2","D3C8","DECD","8CB3","D2A2","8CB4","8CB5","8CB6","8CB7","DECE","8CB8","8CB9","8CBA","8CBB","BECD","8CBC","8CBD","DECF","8CBE","8CBF","8CC0","CAAC","D2FC","B3DF","E5EA","C4E1","BEA1","CEB2","C4F2","BED6","C6A8","B2E3","8CC1","8CC2","BED3","8CC3","8CC4","C7FC","CCEB","BDEC","CEDD","8CC5","8CC6","CABA","C6C1","E5EC","D0BC","8CC7","8CC8","8CC9","D5B9","8CCA","8CCB","8CCC","E5ED","8CCD","8CCE","8CCF","8CD0","CAF4","8CD1","CDC0","C2C5","8CD2","E5EF","8CD3","C2C4","E5F0","8CD4","8CD5","8CD6","8CD7","8CD8","8CD9","8CDA","E5F8","CDCD","8CDB","C9BD","8CDC","8CDD","8CDE","8CDF","8CE0","8CE1","8CE2","D2D9","E1A8","8CE3","8CE4","8CE5","8CE6","D3EC","8CE7","CBEA","C6F1","8CE8","8CE9","8CEA","8CEB","8CEC","E1AC","8CED","8CEE","8CEF","E1A7","E1A9","8CF0","8CF1","E1AA","E1AF","8CF2","8CF3","B2ED","8CF4","E1AB","B8DA","E1AD","E1AE","E1B0","B5BA","E1B1","8CF5","8CF6","8CF7","8CF8","8CF9","E1B3","E1B8","8CFA","8CFB","8CFC","8CFD","8CFE","D1D2","8D40","E1B6","E1B5","C1EB","8D41","8D42","8D43","E1B7","8D44","D4C0","8D45","E1B2","8D46","E1BA","B0B6","8D47","8D48","8D49","8D4A","E1B4","8D4B","BFF9","8D4C","E1B9","8D4D","8D4E","E1BB","8D4F","8D50","8D51","8D52","8D53","8D54","E1BE","8D55","8D56","8D57","8D58","8D59","8D5A","E1BC","8D5B","8D5C","8D5D","8D5E","8D5F","8D60","D6C5","8D61","8D62","8D63","8D64","8D65","8D66","8D67","CFBF","8D68","8D69","E1BD","E1BF","C2CD","8D6A","B6EB","8D6B","D3F8","8D6C","8D6D","C7CD","8D6E","8D6F","B7E5","8D70","8D71","8D72","8D73","8D74","8D75","8D76","8D77","8D78","8D79","BEFE","8D7A","8D7B","8D7C","8D7D","8D7E","8D80","E1C0","E1C1","8D81","8D82","E1C7","B3E7","8D83","8D84","8D85","8D86","8D87","8D88","C6E9","8D89","8D8A","8D8B","8D8C","8D8D","B4DE","8D8E","D1C2","8D8F","8D90","8D91","8D92","E1C8","8D93","8D94","E1C6","8D95","8D96","8D97","8D98","8D99","E1C5","8D9A","E1C3","E1C2","8D9B","B1C0","8D9C","8D9D","8D9E","D5B8","E1C4","8D9F","8DA0","8DA1","8DA2","8DA3","E1CB","8DA4","8DA5","8DA6","8DA7","8DA8","8DA9","8DAA","8DAB","E1CC","E1CA","8DAC","8DAD","8DAE","8DAF","8DB0","8DB1","8DB2","8DB3","EFFA","8DB4","8DB5","E1D3","E1D2","C7B6","8DB6","8DB7","8DB8","8DB9","8DBA","8DBB","8DBC","8DBD","8DBE","8DBF","8DC0","E1C9","8DC1","8DC2","E1CE","8DC3","E1D0","8DC4","8DC5","8DC6","8DC7","8DC8","8DC9","8DCA","8DCB","8DCC","8DCD","8DCE","E1D4","8DCF","E1D1","E1CD","8DD0","8DD1","E1CF","8DD2","8DD3","8DD4","8DD5","E1D5","8DD6","8DD7","8DD8","8DD9","8DDA","8DDB","8DDC","8DDD","8DDE","8DDF","8DE0","8DE1","8DE2","E1D6","8DE3","8DE4","8DE5","8DE6","8DE7","8DE8","8DE9","8DEA","8DEB","8DEC","8DED","8DEE","8DEF","8DF0","8DF1","8DF2","8DF3","8DF4","8DF5","8DF6","8DF7","8DF8","E1D7","8DF9","8DFA","8DFB","E1D8","8DFC","8DFD","8DFE","8E40","8E41","8E42","8E43","8E44","8E45","8E46","8E47","8E48","8E49","8E4A","8E4B","8E4C","8E4D","8E4E","8E4F","8E50","8E51","8E52","8E53","8E54","8E55","E1DA","8E56","8E57","8E58","8E59","8E5A","8E5B","8E5C","8E5D","8E5E","8E5F","8E60","8E61","8E62","E1DB","8E63","8E64","8E65","8E66","8E67","8E68","8E69","CEA1","8E6A","8E6B","8E6C","8E6D","8E6E","8E6F","8E70","8E71","8E72","8E73","8E74","8E75","8E76","E7DD","8E77","B4A8","D6DD","8E78","8E79","D1B2","B3B2","8E7A","8E7B","B9A4","D7F3","C7C9","BEDE","B9AE","8E7C","CED7","8E7D","8E7E","B2EE","DBCF","8E80","BCBA","D2D1","CBC8","B0CD","8E81","8E82","CFEF","8E83","8E84","8E85","8E86","8E87","D9E3","BDED","8E88","8E89","B1D2","CAD0","B2BC","8E8A","CBA7","B7AB","8E8B","CAA6","8E8C","8E8D","8E8E","CFA3","8E8F","8E90","E0F8","D5CA","E0FB","8E91","8E92","E0FA","C5C1","CCFB","8E93","C1B1","E0F9","D6E3","B2AF","D6C4","B5DB","8E94","8E95","8E96","8E97","8E98","8E99","8E9A","8E9B","B4F8","D6A1","8E9C","8E9D","8E9E","8E9F","8EA0","CFAF","B0EF","8EA1","8EA2","E0FC","8EA3","8EA4","8EA5","8EA6","8EA7","E1A1","B3A3","8EA8","8EA9","E0FD","E0FE","C3B1","8EAA","8EAB","8EAC","8EAD","C3DD","8EAE","E1A2","B7F9","8EAF","8EB0","8EB1","8EB2","8EB3","8EB4","BBCF","8EB5","8EB6","8EB7","8EB8","8EB9","8EBA","8EBB","E1A3","C4BB","8EBC","8EBD","8EBE","8EBF","8EC0","E1A4","8EC1","8EC2","E1A5","8EC3","8EC4","E1A6","B4B1","8EC5","8EC6","8EC7","8EC8","8EC9","8ECA","8ECB","8ECC","8ECD","8ECE","8ECF","8ED0","8ED1","8ED2","8ED3","B8C9","C6BD","C4EA","8ED4","B2A2","8ED5","D0D2","8ED6","E7DB","BBC3","D3D7","D3C4","8ED7","B9E3","E2CF","8ED8","8ED9","8EDA","D7AF","8EDB","C7EC","B1D3","8EDC","8EDD","B4B2","E2D1","8EDE","8EDF","8EE0","D0F2","C2AE","E2D0","8EE1","BFE2","D3A6","B5D7","E2D2","B5EA","8EE2","C3ED","B8FD","8EE3","B8AE","8EE4","C5D3","B7CF","E2D4","8EE5","8EE6","8EE7","8EE8","E2D3","B6C8","D7F9","8EE9","8EEA","8EEB","8EEC","8EED","CDA5","8EEE","8EEF","8EF0","8EF1","8EF2","E2D8","8EF3","E2D6","CAFC","BFB5","D3B9","E2D5","8EF4","8EF5","8EF6","8EF7","E2D7","8EF8","8EF9","8EFA","8EFB","8EFC","8EFD","8EFE","8F40","8F41","8F42","C1AE","C0C8","8F43","8F44","8F45","8F46","8F47","8F48","E2DB","E2DA","C0AA","8F49","8F4A","C1CE","8F4B","8F4C","8F4D","8F4E","E2DC","8F4F","8F50","8F51","8F52","8F53","8F54","8F55","8F56","8F57","8F58","8F59","8F5A","E2DD","8F5B","E2DE","8F5C","8F5D","8F5E","8F5F","8F60","8F61","8F62","8F63","8F64","DBC8","8F65","D1D3","CDA2","8F66","8F67","BDA8","8F68","8F69","8F6A","DEC3","D8A5","BFAA","DBCD","D2EC","C6FA","C5AA","8F6B","8F6C","8F6D","DEC4","8F6E","B1D7","DFAE","8F6F","8F70","8F71","CABD","8F72","DFB1","8F73","B9AD","8F74","D2FD","8F75","B8A5","BAEB","8F76","8F77","B3DA","8F78","8F79","8F7A","B5DC","D5C5","8F7B","8F7C","8F7D","8F7E","C3D6","CFD2","BBA1","8F80","E5F3","E5F2","8F81","8F82","E5F4","8F83","CDE4","8F84","C8F5","8F85","8F86","8F87","8F88","8F89","8F8A","8F8B","B5AF","C7BF","8F8C","E5F6","8F8D","8F8E","8F8F","ECB0","8F90","8F91","8F92","8F93","8F94","8F95","8F96","8F97","8F98","8F99","8F9A","8F9B","8F9C","8F9D","8F9E","E5E6","8F9F","B9E9","B5B1","8FA0","C2BC","E5E8","E5E7","E5E9","8FA1","8FA2","8FA3","8FA4","D2CD","8FA5","8FA6","8FA7","E1EA","D0CE","8FA8","CDAE","8FA9","D1E5","8FAA","8FAB","B2CA","B1EB","8FAC","B1F2","C5ED","8FAD","8FAE","D5C3","D3B0","8FAF","E1DC","8FB0","8FB1","8FB2","E1DD","8FB3","D2DB","8FB4","B3B9","B1CB","8FB5","8FB6","8FB7","CDF9","D5F7","E1DE","8FB8","BEB6","B4FD","8FB9","E1DF","BADC","E1E0","BBB2","C2C9","E1E1","8FBA","8FBB","8FBC","D0EC","8FBD","CDBD","8FBE","8FBF","E1E2","8FC0","B5C3","C5C7","E1E3","8FC1","8FC2","E1E4","8FC3","8FC4","8FC5","8FC6","D3F9","8FC7","8FC8","8FC9","8FCA","8FCB","8FCC","E1E5","8FCD","D1AD","8FCE","8FCF","E1E6","CEA2","8FD0","8FD1","8FD2","8FD3","8FD4","8FD5","E1E7","8FD6","B5C2","8FD7","8FD8","8FD9","8FDA","E1E8","BBD5","8FDB","8FDC","8FDD","8FDE","8FDF","D0C4","E2E0","B1D8","D2E4","8FE0","8FE1","E2E1","8FE2","8FE3","BCC9","C8CC","8FE4","E2E3","ECFE","ECFD","DFAF","8FE5","8FE6","8FE7","E2E2","D6BE","CDFC","C3A6","8FE8","8FE9","8FEA","E3C3","8FEB","8FEC","D6D2","E2E7","8FED","8FEE","E2E8","8FEF","8FF0","D3C7","8FF1","8FF2","E2EC","BFEC","8FF3","E2ED","E2E5","8FF4","8FF5","B3C0","8FF6","8FF7","8FF8","C4EE","8FF9","8FFA","E2EE","8FFB","8FFC","D0C3","8FFD","BAF6","E2E9","B7DE","BBB3","CCAC","CBCB","E2E4","E2E6","E2EA","E2EB","8FFE","9040","9041","E2F7","9042","9043","E2F4","D4F5","E2F3","9044","9045","C5AD","9046","D5FA","C5C2","B2C0","9047","9048","E2EF","9049","E2F2","C1AF","CBBC","904A","904B","B5A1","E2F9","904C","904D","904E","BCB1","E2F1","D0D4","D4B9","E2F5","B9D6","E2F6","904F","9050","9051","C7D3","9052","9053","9054","9055","9056","E2F0","9057","9058","9059","905A","905B","D7DC","EDA1","905C","905D","E2F8","905E","EDA5","E2FE","CAD1","905F","9060","9061","9062","9063","9064","9065","C1B5","9066","BBD0","9067","9068","BFD6","9069","BAE3","906A","906B","CBA1","906C","906D","906E","EDA6","EDA3","906F","9070","EDA2","9071","9072","9073","9074","BBD6","EDA7","D0F4","9075","9076","EDA4","BADE","B6F7","E3A1","B6B2","CCF1","B9A7","9077","CFA2","C7A1","9078","9079","BFD2","907A","907B","B6F1","907C","E2FA","E2FB","E2FD","E2FC","C4D5","E3A2","907D","D3C1","907E","9080","9081","E3A7","C7C4","9082","9083","9084","9085","CFA4","9086","9087","E3A9","BAB7","9088","9089","908A","908B","E3A8","908C","BBDA","908D","E3A3","908E","908F","9090","E3A4","E3AA","9091","E3A6","9092","CEF2","D3C6","9093","9094","BBBC","9095","9096","D4C3","9097","C4FA","9098","9099","EDA8","D0FC","E3A5","909A","C3F5","909B","E3AD","B1AF","909C","E3B2","909D","909E","909F","BCC2","90A0","90A1","E3AC","B5BF","90A2","90A3","90A4","90A5","90A6","90A7","90A8","90A9","C7E9","E3B0","90AA","90AB","90AC","BEAA","CDEF","90AD","90AE","90AF","90B0","90B1","BBF3","90B2","90B3","90B4","CCE8","90B5","90B6","E3AF","90B7","E3B1","90B8","CFA7","E3AE","90B9","CEA9","BBDD","90BA","90BB","90BC","90BD","90BE","B5EB","BEE5","B2D2","B3CD","90BF","B1B9","E3AB","B2D1","B5AC","B9DF","B6E8","90C0","90C1","CFEB","E3B7","90C2","BBCC","90C3","90C4","C8C7","D0CA","90C5","90C6","90C7","90C8","90C9","E3B8","B3EE","90CA","90CB","90CC","90CD","EDA9","90CE","D3FA","D3E4","90CF","90D0","90D1","EDAA","E3B9","D2E2","90D2","90D3","90D4","90D5","90D6","E3B5","90D7","90D8","90D9","90DA","D3DE","90DB","90DC","90DD","90DE","B8D0","E3B3","90DF","90E0","E3B6","B7DF","90E1","E3B4","C0A2","90E2","90E3","90E4","E3BA","90E5","90E6","90E7","90E8","90E9","90EA","90EB","90EC","90ED","90EE","90EF","90F0","90F1","90F2","90F3","90F4","90F5","90F6","90F7","D4B8","90F8","90F9","90FA","90FB","90FC","90FD","90FE","9140","B4C8","9141","E3BB","9142","BBC5","9143","C9F7","9144","9145","C9E5","9146","9147","9148","C4BD","9149","914A","914B","914C","914D","914E","914F","EDAB","9150","9151","9152","9153","C2FD","9154","9155","9156","9157","BBDB","BFAE","9158","9159","915A","915B","915C","915D","915E","CEBF","915F","9160","9161","9162","E3BC","9163","BFB6","9164","9165","9166","9167","9168","9169","916A","916B","916C","916D","916E","916F","9170","9171","9172","9173","9174","9175","9176","B1EF","9177","9178","D4F7","9179","917A","917B","917C","917D","E3BE","917E","9180","9181","9182","9183","9184","9185","9186","EDAD","9187","9188","9189","918A","918B","918C","918D","918E","918F","E3BF","BAA9","EDAC","9190","9191","E3BD","9192","9193","9194","9195","9196","9197","9198","9199","919A","919B","E3C0","919C","919D","919E","919F","91A0","91A1","BAB6","91A2","91A3","91A4","B6AE","91A5","91A6","91A7","91A8","91A9","D0B8","91AA","B0C3","EDAE","91AB","91AC","91AD","91AE","91AF","EDAF","C0C1","91B0","E3C1","91B1","91B2","91B3","91B4","91B5","91B6","91B7","91B8","91B9","91BA","91BB","91BC","91BD","91BE","91BF","91C0","91C1","C5B3","91C2","91C3","91C4","91C5","91C6","91C7","91C8","91C9","91CA","91CB","91CC","91CD","91CE","91CF","E3C2","91D0","91D1","91D2","91D3","91D4","91D5","91D6","91D7","91D8","DCB2","91D9","91DA","91DB","91DC","91DD","91DE","EDB0","91DF","B8EA","91E0","CEEC","EAA7","D0E7","CAF9","C8D6","CFB7","B3C9","CED2","BDE4","91E1","91E2","E3DE","BBF2","EAA8","D5BD","91E3","C6DD","EAA9","91E4","91E5","91E6","EAAA","91E7","EAAC","EAAB","91E8","EAAE","EAAD","91E9","91EA","91EB","91EC","BDD8","91ED","EAAF","91EE","C2BE","91EF","91F0","91F1","91F2","B4C1","B4F7","91F3","91F4","BBA7","91F5","91F6","91F7","91F8","91F9","ECE6","ECE5","B7BF","CBF9","B1E2","91FA","ECE7","91FB","91FC","91FD","C9C8","ECE8","ECE9","91FE","CAD6","DED0","B2C5","D4FA","9240","9241","C6CB","B0C7","B4F2","C8D3","9242","9243","9244","CDD0","9245","9246","BFB8","9247","9248","9249","924A","924B","924C","924D","BFDB","924E","924F","C7A4","D6B4","9250","C0A9","DED1","C9A8","D1EF","C5A4","B0E7","B3B6","C8C5","9251","9252","B0E2","9253","9254","B7F6","9255","9256","C5FA","9257","9258","B6F3","9259","D5D2","B3D0","BCBC","925A","925B","925C","B3AD","925D","925E","925F","9260","BEF1","B0D1","9261","9262","9263","9264","9265","9266","D2D6","CAE3","D7A5","9267","CDB6","B6B6","BFB9","D5DB","9268","B8A7","C5D7","9269","926A","926B","DED2","BFD9","C2D5","C7C0","926C","BBA4","B1A8","926D","926E","C5EA","926F","9270","C5FB","CCA7","9271","9272","9273","9274","B1A7","9275","9276","9277","B5D6","9278","9279","927A","C4A8","927B","DED3","D1BA","B3E9","927C","C3F2","927D","927E","B7F7","9280","D6F4","B5A3","B2F0","C4B4","C4E9","C0AD","DED4","9281","B0E8","C5C4","C1E0","9282","B9D5","9283","BEDC","CDD8","B0CE","9284","CDCF","DED6","BED0","D7BE","DED5","D5D0","B0DD","9285","9286","C4E2","9287","9288","C2A3","BCF0","9289","D3B5","C0B9","C5A1","B2A6","D4F1","928A","928B","C0A8","CAC3","DED7","D5FC","928C","B9B0","928D","C8AD","CBA9","928E","DED9","BFBD","928F","9290","9291","9292","C6B4","D7A7","CAB0","C4C3","9293","B3D6","B9D2","9294","9295","9296","9297","D6B8","EAFC","B0B4","9298","9299","929A","929B","BFE6","929C","929D","CCF4","929E","929F","92A0","92A1","CDDA","92A2","92A3","92A4","D6BF","C2CE","92A5","CECE","CCA2","D0AE","C4D3","B5B2","DED8","D5F5","BCB7","BBD3","92A6","92A7","B0A4","92A8","C5B2","B4EC","92A9","92AA","92AB","D5F1","92AC","92AD","EAFD","92AE","92AF","92B0","92B1","92B2","92B3","DEDA","CDA6","92B4","92B5","CDEC","92B6","92B7","92B8","92B9","CEE6","DEDC","92BA","CDB1","C0A6","92BB","92BC","D7BD","92BD","DEDB","B0C6","BAB4","C9D3","C4F3","BEE8","92BE","92BF","92C0","92C1","B2B6","92C2","92C3","92C4","92C5","92C6","92C7","92C8","92C9","C0CC","CBF0","92CA","BCF1","BBBB","B5B7","92CB","92CC","92CD","C5F5","92CE","DEE6","92CF","92D0","92D1","DEE3","BEDD","92D2","92D3","DEDF","92D4","92D5","92D6","92D7","B4B7","BDDD","92D8","92D9","DEE0","C4ED","92DA","92DB","92DC","92DD","CFC6","92DE","B5E0","92DF","92E0","92E1","92E2","B6DE","CADA","B5F4","DEE5","92E3","D5C6","92E4","DEE1","CCCD","C6FE","92E5","C5C5","92E6","92E7","92E8","D2B4","92E9","BEF2","92EA","92EB","92EC","92ED","92EE","92EF","92F0","C2D3","92F1","CCBD","B3B8","92F2","BDD3","92F3","BFD8","CDC6","D1DA","B4EB","92F4","DEE4","DEDD","DEE7","92F5","EAFE","92F6","92F7","C2B0","DEE2","92F8","92F9","D6C0","B5A7","92FA","B2F4","92FB","DEE8","92FC","DEF2","92FD","92FE","9340","9341","9342","DEED","9343","DEF1","9344","9345","C8E0","9346","9347","9348","D7E1","DEEF","C3E8","CCE1","9349","B2E5","934A","934B","934C","D2BE","934D","934E","934F","9350","9351","9352","9353","DEEE","9354","DEEB","CED5","9355","B4A7","9356","9357","9358","9359","935A","BFAB","BEBE","935B","935C","BDD2","935D","935E","935F","9360","DEE9","9361","D4AE","9362","DEDE","9363","DEEA","9364","9365","9366","9367","C0BF","9368","DEEC","B2F3","B8E9","C2A7","9369","936A","BDC1","936B","936C","936D","936E","936F","DEF5","DEF8","9370","9371","B2AB","B4A4","9372","9373","B4EA","C9A6","9374","9375","9376","9377","9378","9379","DEF6","CBD1","937A","B8E3","937B","DEF7","DEFA","937C","937D","937E","9380","DEF9","9381","9382","9383","CCC2","9384","B0E1","B4EE","9385","9386","9387","9388","9389","938A","E5BA","938B","938C","938D","938E","938F","D0AF","9390","9391","B2EB","9392","EBA1","9393","DEF4","9394","9395","C9E3","DEF3","B0DA","D2A1","B1F7","9396","CCAF","9397","9398","9399","939A","939B","939C","939D","DEF0","939E","CBA4","939F","93A0","93A1","D5AA","93A2","93A3","93A4","93A5","93A6","DEFB","93A7","93A8","93A9","93AA","93AB","93AC","93AD","93AE","B4DD","93AF","C4A6","93B0","93B1","93B2","DEFD","93B3","93B4","93B5","93B6","93B7","93B8","93B9","93BA","93BB","93BC","C3FE","C4A1","DFA1","93BD","93BE","93BF","93C0","93C1","93C2","93C3","C1CC","93C4","DEFC","BEEF","93C5","C6B2","93C6","93C7","93C8","93C9","93CA","93CB","93CC","93CD","93CE","B3C5","C8F6","93CF","93D0","CBBA","DEFE","93D1","93D2","DFA4","93D3","93D4","93D5","93D6","D7B2","93D7","93D8","93D9","93DA","93DB","B3B7","93DC","93DD","93DE","93DF","C1C3","93E0","93E1","C7CB","B2A5","B4E9","93E2","D7AB","93E3","93E4","93E5","93E6","C4EC","93E7","DFA2","DFA3","93E8","DFA5","93E9","BAB3","93EA","93EB","93EC","DFA6","93ED","C0DE","93EE","93EF","C9C3","93F0","93F1","93F2","93F3","93F4","93F5","93F6","B2D9","C7E6","93F7","DFA7","93F8","C7DC","93F9","93FA","93FB","93FC","DFA8","EBA2","93FD","93FE","9440","9441","9442","CBD3","9443","9444","9445","DFAA","9446","DFA9","9447","B2C1","9448","9449","944A","944B","944C","944D","944E","944F","9450","9451","9452","9453","9454","9455","9456","9457","9458","9459","945A","945B","945C","945D","945E","945F","9460","C5CA","9461","9462","9463","9464","9465","9466","9467","9468","DFAB","9469","946A","946B","946C","946D","946E","946F","9470","D4DC","9471","9472","9473","9474","9475","C8C1","9476","9477","9478","9479","947A","947B","947C","947D","947E","9480","9481","9482","DFAC","9483","9484","9485","9486","9487","BEF0","9488","9489","DFAD","D6A7","948A","948B","948C","948D","EAB7","EBB6","CAD5","948E","D8FC","B8C4","948F","B9A5","9490","9491","B7C5","D5FE","9492","9493","9494","9495","9496","B9CA","9497","9498","D0A7","F4CD","9499","949A","B5D0","949B","949C","C3F4","949D","BEC8","949E","949F","94A0","EBB7","B0BD","94A1","94A2","BDCC","94A3","C1B2","94A4","B1D6","B3A8","94A5","94A6","94A7","B8D2","C9A2","94A8","94A9","B6D8","94AA","94AB","94AC","94AD","EBB8","BEB4","94AE","94AF","94B0","CAFD","94B1","C7C3","94B2","D5FB","94B3","94B4","B7F3","94B5","94B6","94B7","94B8","94B9","94BA","94BB","94BC","94BD","94BE","94BF","94C0","94C1","94C2","94C3","CEC4","94C4","94C5","94C6","D5AB","B1F3","94C7","94C8","94C9","ECB3","B0DF","94CA","ECB5","94CB","94CC","94CD","B6B7","94CE","C1CF","94CF","F5FA","D0B1","94D0","94D1","D5E5","94D2","CED3","94D3","94D4","BDEF","B3E2","94D5","B8AB","94D6","D5B6","94D7","EDBD","94D8","B6CF","94D9","CBB9","D0C2","94DA","94DB","94DC","94DD","94DE","94DF","94E0","94E1","B7BD","94E2","94E3","ECB6","CAA9","94E4","94E5","94E6","C5D4","94E7","ECB9","ECB8","C2C3","ECB7","94E8","94E9","94EA","94EB","D0FD","ECBA","94EC","ECBB","D7E5","94ED","94EE","ECBC","94EF","94F0","94F1","ECBD","C6EC","94F2","94F3","94F4","94F5","94F6","94F7","94F8","94F9","CEDE","94FA","BCC8","94FB","94FC","C8D5","B5A9","BEC9","D6BC","D4E7","94FD","94FE","D1AE","D0F1","EAB8","EAB9","EABA","BAB5","9540","9541","9542","9543","CAB1","BFF5","9544","9545","CDFA","9546","9547","9548","9549","954A","EAC0","954B","B0BA","EABE","954C","954D","C0A5","954E","954F","9550","EABB","9551","B2FD","9552","C3F7","BBE8","9553","9554","9555","D2D7","CEF4","EABF","9556","9557","9558","EABC","9559","955A","955B","EAC3","955C","D0C7","D3B3","955D","955E","955F","9560","B4BA","9561","C3C1","D7F2","9562","9563","9564","9565","D5D1","9566","CAC7","9567","EAC5","9568","9569","EAC4","EAC7","EAC6","956A","956B","956C","956D","956E","D6E7","956F","CFD4","9570","9571","EACB","9572","BBCE","9573","9574","9575","9576","9577","9578","9579","BDFA","C9CE","957A","957B","EACC","957C","957D","C9B9","CFFE","EACA","D4CE","EACD","EACF","957E","9580","CDED","9581","9582","9583","9584","EAC9","9585","EACE","9586","9587","CEEE","9588","BBDE","9589","B3BF","958A","958B","958C","958D","958E","C6D5","BEB0","CEFA","958F","9590","9591","C7E7","9592","BEA7","EAD0","9593","9594","D6C7","9595","9596","9597","C1C0","9598","9599","959A","D4DD","959B","EAD1","959C","959D","CFBE","959E","959F","95A0","95A1","EAD2","95A2","95A3","95A4","95A5","CAEE","95A6","95A7","95A8","95A9","C5AF","B0B5","95AA","95AB","95AC","95AD","95AE","EAD4","95AF","95B0","95B1","95B2","95B3","95B4","95B5","95B6","95B7","EAD3","F4DF","95B8","95B9","95BA","95BB","95BC","C4BA","95BD","95BE","95BF","95C0","95C1","B1A9","95C2","95C3","95C4","95C5","E5DF","95C6","95C7","95C8","95C9","EAD5","95CA","95CB","95CC","95CD","95CE","95CF","95D0","95D1","95D2","95D3","95D4","95D5","95D6","95D7","95D8","95D9","95DA","95DB","95DC","95DD","95DE","95DF","95E0","95E1","95E2","95E3","CAEF","95E4","EAD6","EAD7","C6D8","95E5","95E6","95E7","95E8","95E9","95EA","95EB","95EC","EAD8","95ED","95EE","EAD9","95EF","95F0","95F1","95F2","95F3","95F4","D4BB","95F5","C7FA","D2B7","B8FC","95F6","95F7","EAC2","95F8","B2DC","95F9","95FA","C2FC","95FB","D4F8","CCE6","D7EE","95FC","95FD","95FE","9640","9641","9642","9643","D4C2","D3D0","EBC3","C5F3","9644","B7FE","9645","9646","EBD4","9647","9648","9649","CBB7","EBDE","964A","C0CA","964B","964C","964D","CDFB","964E","B3AF","964F","C6DA","9650","9651","9652","9653","9654","9655","EBFC","9656","C4BE","9657","CEB4","C4A9","B1BE","D4FD","9658","CAF5","9659","D6EC","965A","965B","C6D3","B6E4","965C","965D","965E","965F","BBFA","9660","9661","D0E0","9662","9663","C9B1","9664","D4D3","C8A8","9665","9666","B8CB","9667","E8BE","C9BC","9668","9669","E8BB","966A","C0EE","D0D3","B2C4","B4E5","966B","E8BC","966C","966D","D5C8","966E","966F","9670","9671","9672","B6C5","9673","E8BD","CAF8","B8DC","CCF5","9674","9675","9676","C0B4","9677","9678","D1EE","E8BF","E8C2","9679","967A","BABC","967B","B1AD","BDDC","967C","EABD","E8C3","967D","E8C6","967E","E8CB","9680","9681","9682","9683","E8CC","9684","CBC9","B0E5","9685","BCAB","9686","9687","B9B9","9688","9689","E8C1","968A","CDF7","968B","E8CA","968C","968D","968E","968F","CEF6","9690","9691","9692","9693","D5ED","9694","C1D6","E8C4","9695","C3B6","9696","B9FB","D6A6","E8C8","9697","9698","9699","CAE0","D4E6","969A","E8C0","969B","E8C5","E8C7","969C","C7B9","B7E3","969D","E8C9","969E","BFDD","E8D2","969F","96A0","E8D7","96A1","E8D5","BCDC","BCCF","E8DB","96A2","96A3","96A4","96A5","96A6","96A7","96A8","96A9","E8DE","96AA","E8DA","B1FA","96AB","96AC","96AD","96AE","96AF","96B0","96B1","96B2","96B3","96B4","B0D8","C4B3","B8CC","C6E2","C8BE","C8E1","96B5","96B6","96B7","E8CF","E8D4","E8D6","96B8","B9F1","E8D8","D7F5","96B9","C4FB","96BA","E8DC","96BB","96BC","B2E9","96BD","96BE","96BF","E8D1","96C0","96C1","BCED","96C2","96C3","BFC2","E8CD","D6F9","96C4","C1F8","B2F1","96C5","96C6","96C7","96C8","96C9","96CA","96CB","96CC","E8DF","96CD","CAC1","E8D9","96CE","96CF","96D0","96D1","D5A4","96D2","B1EA","D5BB","E8CE","E8D0","B6B0","E8D3","96D3","E8DD","C0B8","96D4","CAF7","96D5","CBA8","96D6","96D7","C6DC","C0F5","96D8","96D9","96DA","96DB","96DC","E8E9","96DD","96DE","96DF","D0A3","96E0","96E1","96E2","96E3","96E4","96E5","96E6","E8F2","D6EA","96E7","96E8","96E9","96EA","96EB","96EC","96ED","E8E0","E8E1","96EE","96EF","96F0","D1F9","BACB","B8F9","96F1","96F2","B8F1","D4D4","E8EF","96F3","E8EE","E8EC","B9F0","CCD2","E8E6","CEA6","BFF2","96F4","B0B8","E8F1","E8F0","96F5","D7C0","96F6","E8E4","96F7","CDA9","C9A3","96F8","BBB8","BDDB","E8EA","96F9","96FA","96FB","96FC","96FD","96FE","9740","9741","9742","9743","E8E2","E8E3","E8E5","B5B5","E8E7","C7C5","E8EB","E8ED","BDB0","D7AE","9744","E8F8","9745","9746","9747","9748","9749","974A","974B","974C","E8F5","974D","CDB0","E8F6","974E","974F","9750","9751","9752","9753","9754","9755","9756","C1BA","9757","E8E8","9758","C3B7","B0F0","9759","975A","975B","975C","975D","975E","975F","9760","E8F4","9761","9762","9763","E8F7","9764","9765","9766","B9A3","9767","9768","9769","976A","976B","976C","976D","976E","976F","9770","C9D2","9771","9772","9773","C3CE","CEE0","C0E6","9774","9775","9776","9777","CBF3","9778","CCDD","D0B5","9779","977A","CAE1","977B","E8F3","977C","977D","977E","9780","9781","9782","9783","9784","9785","9786","BCEC","9787","E8F9","9788","9789","978A","978B","978C","978D","C3DE","978E","C6E5","978F","B9F7","9790","9791","9792","9793","B0F4","9794","9795","D7D8","9796","9797","BCAC","9798","C5EF","9799","979A","979B","979C","979D","CCC4","979E","979F","E9A6","97A0","97A1","97A2","97A3","97A4","97A5","97A6","97A7","97A8","97A9","C9AD","97AA","E9A2","C0E2","97AB","97AC","97AD","BFC3","97AE","97AF","97B0","E8FE","B9D7","97B1","E8FB","97B2","97B3","97B4","97B5","E9A4","97B6","97B7","97B8","D2CE","97B9","97BA","97BB","97BC","97BD","E9A3","97BE","D6B2","D7B5","97BF","E9A7","97C0","BDB7","97C1","97C2","97C3","97C4","97C5","97C6","97C7","97C8","97C9","97CA","97CB","97CC","E8FC","E8FD","97CD","97CE","97CF","E9A1","97D0","97D1","97D2","97D3","97D4","97D5","97D6","97D7","CDD6","97D8","97D9","D2AC","97DA","97DB","97DC","E9B2","97DD","97DE","97DF","97E0","E9A9","97E1","97E2","97E3","B4AA","97E4","B4BB","97E5","97E6","E9AB","97E7","97E8","97E9","97EA","97EB","97EC","97ED","97EE","97EF","97F0","97F1","97F2","97F3","97F4","97F5","97F6","97F7","D0A8","97F8","97F9","E9A5","97FA","97FB","B3FE","97FC","97FD","E9AC","C0E3","97FE","E9AA","9840","9841","E9B9","9842","9843","E9B8","9844","9845","9846","9847","E9AE","9848","9849","E8FA","984A","984B","E9A8","984C","984D","984E","984F","9850","BFAC","E9B1","E9BA","9851","9852","C2A5","9853","9854","9855","E9AF","9856","B8C5","9857","E9AD","9858","D3DC","E9B4","E9B5","E9B7","9859","985A","985B","E9C7","985C","985D","985E","985F","9860","9861","C0C6","E9C5","9862","9863","E9B0","9864","9865","E9BB","B0F1","9866","9867","9868","9869","986A","986B","986C","986D","986E","986F","E9BC","D5A5","9870","9871","E9BE","9872","E9BF","9873","9874","9875","E9C1","9876","9877","C1F1","9878","9879","C8B6","987A","987B","987C","E9BD","987D","987E","9880","9881","9882","E9C2","9883","9884","9885","9886","9887","9888","9889","988A","E9C3","988B","E9B3","988C","E9B6","988D","BBB1","988E","988F","9890","E9C0","9891","9892","9893","9894","9895","9896","BCF7","9897","9898","9899","E9C4","E9C6","989A","989B","989C","989D","989E","989F","98A0","98A1","98A2","98A3","98A4","98A5","E9CA","98A6","98A7","98A8","98A9","E9CE","98AA","98AB","98AC","98AD","98AE","98AF","98B0","98B1","98B2","98B3","B2DB","98B4","E9C8","98B5","98B6","98B7","98B8","98B9","98BA","98BB","98BC","98BD","98BE","B7AE","98BF","98C0","98C1","98C2","98C3","98C4","98C5","98C6","98C7","98C8","98C9","98CA","E9CB","E9CC","98CB","98CC","98CD","98CE","98CF","98D0","D5C1","98D1","C4A3","98D2","98D3","98D4","98D5","98D6","98D7","E9D8","98D8","BAE1","98D9","98DA","98DB","98DC","E9C9","98DD","D3A3","98DE","98DF","98E0","E9D4","98E1","98E2","98E3","98E4","98E5","98E6","98E7","E9D7","E9D0","98E8","98E9","98EA","98EB","98EC","E9CF","98ED","98EE","C7C1","98EF","98F0","98F1","98F2","98F3","98F4","98F5","98F6","E9D2","98F7","98F8","98F9","98FA","98FB","98FC","98FD","E9D9","B3C8","98FE","E9D3","9940","9941","9942","9943","9944","CFF0","9945","9946","9947","E9CD","9948","9949","994A","994B","994C","994D","994E","994F","9950","9951","9952","B3F7","9953","9954","9955","9956","9957","9958","9959","E9D6","995A","995B","E9DA","995C","995D","995E","CCB4","995F","9960","9961","CFAD","9962","9963","9964","9965","9966","9967","9968","9969","996A","E9D5","996B","E9DC","E9DB","996C","996D","996E","996F","9970","E9DE","9971","9972","9973","9974","9975","9976","9977","9978","E9D1","9979","997A","997B","997C","997D","997E","9980","9981","E9DD","9982","E9DF","C3CA","9983","9984","9985","9986","9987","9988","9989","998A","998B","998C","998D","998E","998F","9990","9991","9992","9993","9994","9995","9996","9997","9998","9999","999A","999B","999C","999D","999E","999F","99A0","99A1","99A2","99A3","99A4","99A5","99A6","99A7","99A8","99A9","99AA","99AB","99AC","99AD","99AE","99AF","99B0","99B1","99B2","99B3","99B4","99B5","99B6","99B7","99B8","99B9","99BA","99BB","99BC","99BD","99BE","99BF","99C0","99C1","99C2","99C3","99C4","99C5","99C6","99C7","99C8","99C9","99CA","99CB","99CC","99CD","99CE","99CF","99D0","99D1","99D2","99D3","99D4","99D5","99D6","99D7","99D8","99D9","99DA","99DB","99DC","99DD","99DE","99DF","99E0","99E1","99E2","99E3","99E4","99E5","99E6","99E7","99E8","99E9","99EA","99EB","99EC","99ED","99EE","99EF","99F0","99F1","99F2","99F3","99F4","99F5","C7B7","B4CE","BBB6","D0C0","ECA3","99F6","99F7","C5B7","99F8","99F9","99FA","99FB","99FC","99FD","99FE","9A40","9A41","9A42","D3FB","9A43","9A44","9A45","9A46","ECA4","9A47","ECA5","C6DB","9A48","9A49","9A4A","BFEE","9A4B","9A4C","9A4D","9A4E","ECA6","9A4F","9A50","ECA7","D0AA","9A51","C7B8","9A52","9A53","B8E8","9A54","9A55","9A56","9A57","9A58","9A59","9A5A","9A5B","9A5C","9A5D","9A5E","9A5F","ECA8","9A60","9A61","9A62","9A63","9A64","9A65","9A66","9A67","D6B9","D5FD","B4CB","B2BD","CEE4","C6E7","9A68","9A69","CDE1","9A6A","9A6B","9A6C","9A6D","9A6E","9A6F","9A70","9A71","9A72","9A73","9A74","9A75","9A76","9A77","B4F5","9A78","CBC0","BCDF","9A79","9A7A","9A7B","9A7C","E9E2","E9E3","D1EA","E9E5","9A7D","B4F9","E9E4","9A7E","D1B3","CAE2","B2D0","9A80","E9E8","9A81","9A82","9A83","9A84","E9E6","E9E7","9A85","9A86","D6B3","9A87","9A88","9A89","E9E9","E9EA","9A8A","9A8B","9A8C","9A8D","9A8E","E9EB","9A8F","9A90","9A91","9A92","9A93","9A94","9A95","9A96","E9EC","9A97","9A98","9A99","9A9A","9A9B","9A9C","9A9D","9A9E","ECAF","C5B9","B6CE","9A9F","D2F3","9AA0","9AA1","9AA2","9AA3","9AA4","9AA5","9AA6","B5EE","9AA7","BBD9","ECB1","9AA8","9AA9","D2E3","9AAA","9AAB","9AAC","9AAD","9AAE","CEE3","9AAF","C4B8","9AB0","C3BF","9AB1","9AB2","B6BE","D8B9","B1C8","B1CF","B1D1","C5FE","9AB3","B1D0","9AB4","C3AB","9AB5","9AB6","9AB7","9AB8","9AB9","D5B1","9ABA","9ABB","9ABC","9ABD","9ABE","9ABF","9AC0","9AC1","EBA4","BAC1","9AC2","9AC3","9AC4","CCBA","9AC5","9AC6","9AC7","EBA5","9AC8","EBA7","9AC9","9ACA","9ACB","EBA8","9ACC","9ACD","9ACE","EBA6","9ACF","9AD0","9AD1","9AD2","9AD3","9AD4","9AD5","EBA9","EBAB","EBAA","9AD6","9AD7","9AD8","9AD9","9ADA","EBAC","9ADB","CACF","D8B5","C3F1","9ADC","C3A5","C6F8","EBAD","C4CA","9ADD","EBAE","EBAF","EBB0","B7D5","9ADE","9ADF","9AE0","B7FA","9AE1","EBB1","C7E2","9AE2","EBB3","9AE3","BAA4","D1F5","B0B1","EBB2","EBB4","9AE4","9AE5","9AE6","B5AA","C2C8","C7E8","9AE7","EBB5","9AE8","CBAE","E3DF","9AE9","9AEA","D3C0","9AEB","9AEC","9AED","9AEE","D9DB","9AEF","9AF0","CDA1","D6AD","C7F3","9AF1","9AF2","9AF3","D9E0","BBE3","9AF4","BABA","E3E2","9AF5","9AF6","9AF7","9AF8","9AF9","CFAB","9AFA","9AFB","9AFC","E3E0","C9C7","9AFD","BAB9","9AFE","9B40","9B41","D1B4","E3E1","C8EA","B9AF","BDAD","B3D8","CEDB","9B42","9B43","CCC0","9B44","9B45","9B46","E3E8","E3E9","CDF4","9B47","9B48","9B49","9B4A","9B4B","CCAD","9B4C","BCB3","9B4D","E3EA","9B4E","E3EB","9B4F","9B50","D0DA","9B51","9B52","9B53","C6FB","B7DA","9B54","9B55","C7DF","D2CA","CED6","9B56","E3E4","E3EC","9B57","C9F2","B3C1","9B58","9B59","E3E7","9B5A","9B5B","C6E3","E3E5","9B5C","9B5D","EDB3","E3E6","9B5E","9B5F","9B60","9B61","C9B3","9B62","C5E6","9B63","9B64","9B65","B9B5","9B66","C3BB","9B67","E3E3","C5BD","C1A4","C2D9","B2D7","9B68","E3ED","BBA6","C4AD","9B69","E3F0","BEDA","9B6A","9B6B","E3FB","E3F5","BAD3","9B6C","9B6D","9B6E","9B6F","B7D0","D3CD","9B70","D6CE","D5D3","B9C1","D5B4","D1D8","9B71","9B72","9B73","9B74","D0B9","C7F6","9B75","9B76","9B77","C8AA","B2B4","9B78","C3DA","9B79","9B7A","9B7B","E3EE","9B7C","9B7D","E3FC","E3EF","B7A8","E3F7","E3F4","9B7E","9B80","9B81","B7BA","9B82","9B83","C5A2","9B84","E3F6","C5DD","B2A8","C6FC","9B85","C4E0","9B86","9B87","D7A2","9B88","C0E1","E3F9","9B89","9B8A","E3FA","E3FD","CCA9","E3F3","9B8B","D3BE","9B8C","B1C3","EDB4","E3F1","E3F2","9B8D","E3F8","D0BA","C6C3","D4F3","E3FE","9B8E","9B8F","BDE0","9B90","9B91","E4A7","9B92","9B93","E4A6","9B94","9B95","9B96","D1F3","E4A3","9B97","E4A9","9B98","9B99","9B9A","C8F7","9B9B","9B9C","9B9D","9B9E","CFB4","9B9F","E4A8","E4AE","C2E5","9BA0","9BA1","B6B4","9BA2","9BA3","9BA4","9BA5","9BA6","9BA7","BDF2","9BA8","E4A2","9BA9","9BAA","BAE9","E4AA","9BAB","9BAC","E4AC","9BAD","9BAE","B6FD","D6DE","E4B2","9BAF","E4AD","9BB0","9BB1","9BB2","E4A1","9BB3","BBEE","CDDD","C7A2","C5C9","9BB4","9BB5","C1F7","9BB6","E4A4","9BB7","C7B3","BDAC","BDBD","E4A5","9BB8","D7C7","B2E2","9BB9","E4AB","BCC3","E4AF","9BBA","BBEB","E4B0","C5A8","E4B1","9BBB","9BBC","9BBD","9BBE","D5E3","BFA3","9BBF","E4BA","9BC0","E4B7","9BC1","E4BB","9BC2","9BC3","E4BD","9BC4","9BC5","C6D6","9BC6","9BC7","BAC6","C0CB","9BC8","9BC9","9BCA","B8A1","E4B4","9BCB","9BCC","9BCD","9BCE","D4A1","9BCF","9BD0","BAA3","BDFE","9BD1","9BD2","9BD3","E4BC","9BD4","9BD5","9BD6","9BD7","9BD8","CDBF","9BD9","9BDA","C4F9","9BDB","9BDC","CFFB","C9E6","9BDD","9BDE","D3BF","9BDF","CFD1","9BE0","9BE1","E4B3","9BE2","E4B8","E4B9","CCE9","9BE3","9BE4","9BE5","9BE6","9BE7","CCCE","9BE8","C0D4","E4B5","C1B0","E4B6","CED0","9BE9","BBC1","B5D3","9BEA","C8F3","BDA7","D5C7","C9AC","B8A2","E4CA","9BEB","9BEC","E4CC","D1C4","9BED","9BEE","D2BA","9BEF","9BF0","BAAD","9BF1","9BF2","BAD4","9BF3","9BF4","9BF5","9BF6","9BF7","9BF8","E4C3","B5ED","9BF9","9BFA","9BFB","D7CD","E4C0","CFFD","E4BF","9BFC","9BFD","9BFE","C1DC","CCCA","9C40","9C41","9C42","9C43","CAE7","9C44","9C45","9C46","9C47","C4D7","9C48","CCD4","E4C8","9C49","9C4A","9C4B","E4C7","E4C1","9C4C","E4C4","B5AD","9C4D","9C4E","D3D9","9C4F","E4C6","9C50","9C51","9C52","9C53","D2F9","B4E3","9C54","BBB4","9C55","9C56","C9EE","9C57","B4BE","9C58","9C59","9C5A","BBEC","9C5B","D1CD","9C5C","CCED","EDB5","9C5D","9C5E","9C5F","9C60","9C61","9C62","9C63","9C64","C7E5","9C65","9C66","9C67","9C68","D4A8","9C69","E4CB","D7D5","E4C2","9C6A","BDA5","E4C5","9C6B","9C6C","D3E6","9C6D","E4C9","C9F8","9C6E","9C6F","E4BE","9C70","9C71","D3E5","9C72","9C73","C7FE","B6C9","9C74","D4FC","B2B3","E4D7","9C75","9C76","9C77","CEC2","9C78","E4CD","9C79","CEBC","9C7A","B8DB","9C7B","9C7C","E4D6","9C7D","BFCA","9C7E","9C80","9C81","D3CE","9C82","C3EC","9C83","9C84","9C85","9C86","9C87","9C88","9C89","9C8A","C5C8","E4D8","9C8B","9C8C","9C8D","9C8E","9C8F","9C90","9C91","9C92","CDC4","E4CF","9C93","9C94","9C95","9C96","E4D4","E4D5","9C97","BAFE","9C98","CFE6","9C99","9C9A","D5BF","9C9B","9C9C","9C9D","E4D2","9C9E","9C9F","9CA0","9CA1","9CA2","9CA3","9CA4","9CA5","9CA6","9CA7","9CA8","E4D0","9CA9","9CAA","E4CE","9CAB","9CAC","9CAD","9CAE","9CAF","9CB0","9CB1","9CB2","9CB3","9CB4","9CB5","9CB6","9CB7","9CB8","9CB9","CDE5","CAAA","9CBA","9CBB","9CBC","C0A3","9CBD","BDA6","E4D3","9CBE","9CBF","B8C8","9CC0","9CC1","9CC2","9CC3","9CC4","E4E7","D4B4","9CC5","9CC6","9CC7","9CC8","9CC9","9CCA","9CCB","E4DB","9CCC","9CCD","9CCE","C1EF","9CCF","9CD0","E4E9","9CD1","9CD2","D2E7","9CD3","9CD4","E4DF","9CD5","E4E0","9CD6","9CD7","CFAA","9CD8","9CD9","9CDA","9CDB","CBDD","9CDC","E4DA","E4D1","9CDD","E4E5","9CDE","C8DC","E4E3","9CDF","9CE0","C4E7","E4E2","9CE1","E4E1","9CE2","9CE3","9CE4","B3FC","E4E8","9CE5","9CE6","9CE7","9CE8","B5E1","9CE9","9CEA","9CEB","D7CC","9CEC","9CED","9CEE","E4E6","9CEF","BBAC","9CF0","D7D2","CCCF","EBF8","9CF1","E4E4","9CF2","9CF3","B9F6","9CF4","9CF5","9CF6","D6CD","E4D9","E4DC","C2FA","E4DE","9CF7","C2CB","C0C4","C2D0","9CF8","B1F5","CCB2","9CF9","9CFA","9CFB","9CFC","9CFD","9CFE","9D40","9D41","9D42","9D43","B5CE","9D44","9D45","9D46","9D47","E4EF","9D48","9D49","9D4A","9D4B","9D4C","9D4D","9D4E","9D4F","C6AF","9D50","9D51","9D52","C6E1","9D53","9D54","E4F5","9D55","9D56","9D57","9D58","9D59","C2A9","9D5A","9D5B","9D5C","C0EC","D1DD","E4EE","9D5D","9D5E","9D5F","9D60","9D61","9D62","9D63","9D64","9D65","9D66","C4AE","9D67","9D68","9D69","E4ED","9D6A","9D6B","9D6C","9D6D","E4F6","E4F4","C2FE","9D6E","E4DD","9D6F","E4F0","9D70","CAFE","9D71","D5C4","9D72","9D73","E4F1","9D74","9D75","9D76","9D77","9D78","9D79","9D7A","D1FA","9D7B","9D7C","9D7D","9D7E","9D80","9D81","9D82","E4EB","E4EC","9D83","9D84","9D85","E4F2","9D86","CEAB","9D87","9D88","9D89","9D8A","9D8B","9D8C","9D8D","9D8E","9D8F","9D90","C5CB","9D91","9D92","9D93","C7B1","9D94","C2BA","9D95","9D96","9D97","E4EA","9D98","9D99","9D9A","C1CA","9D9B","9D9C","9D9D","9D9E","9D9F","9DA0","CCB6","B3B1","9DA1","9DA2","9DA3","E4FB","9DA4","E4F3","9DA5","9DA6","9DA7","E4FA","9DA8","E4FD","9DA9","E4FC","9DAA","9DAB","9DAC","9DAD","9DAE","9DAF","9DB0","B3CE","9DB1","9DB2","9DB3","B3BA","E4F7","9DB4","9DB5","E4F9","E4F8","C5EC","9DB6","9DB7","9DB8","9DB9","9DBA","9DBB","9DBC","9DBD","9DBE","9DBF","9DC0","9DC1","9DC2","C0BD","9DC3","9DC4","9DC5","9DC6","D4E8","9DC7","9DC8","9DC9","9DCA","9DCB","E5A2","9DCC","9DCD","9DCE","9DCF","9DD0","9DD1","9DD2","9DD3","9DD4","9DD5","9DD6","B0C4","9DD7","9DD8","E5A4","9DD9","9DDA","E5A3","9DDB","9DDC","9DDD","9DDE","9DDF","9DE0","BCA4","9DE1","E5A5","9DE2","9DE3","9DE4","9DE5","9DE6","9DE7","E5A1","9DE8","9DE9","9DEA","9DEB","9DEC","9DED","9DEE","E4FE","B1F4","9DEF","9DF0","9DF1","9DF2","9DF3","9DF4","9DF5","9DF6","9DF7","9DF8","9DF9","E5A8","9DFA","E5A9","E5A6","9DFB","9DFC","9DFD","9DFE","9E40","9E41","9E42","9E43","9E44","9E45","9E46","9E47","E5A7","E5AA","9E48","9E49","9E4A","9E4B","9E4C","9E4D","9E4E","9E4F","9E50","9E51","9E52","9E53","9E54","9E55","9E56","9E57","9E58","9E59","9E5A","9E5B","9E5C","9E5D","9E5E","9E5F","9E60","9E61","9E62","9E63","9E64","9E65","9E66","9E67","9E68","C6D9","9E69","9E6A","9E6B","9E6C","9E6D","9E6E","9E6F","9E70","E5AB","E5AD","9E71","9E72","9E73","9E74","9E75","9E76","9E77","E5AC","9E78","9E79","9E7A","9E7B","9E7C","9E7D","9E7E","9E80","9E81","9E82","9E83","9E84","9E85","9E86","9E87","9E88","9E89","E5AF","9E8A","9E8B","9E8C","E5AE","9E8D","9E8E","9E8F","9E90","9E91","9E92","9E93","9E94","9E95","9E96","9E97","9E98","9E99","9E9A","9E9B","9E9C","9E9D","9E9E","B9E0","9E9F","9EA0","E5B0","9EA1","9EA2","9EA3","9EA4","9EA5","9EA6","9EA7","9EA8","9EA9","9EAA","9EAB","9EAC","9EAD","9EAE","E5B1","9EAF","9EB0","9EB1","9EB2","9EB3","9EB4","9EB5","9EB6","9EB7","9EB8","9EB9","9EBA","BBF0","ECE1","C3F0","9EBB","B5C6","BBD2","9EBC","9EBD","9EBE","9EBF","C1E9","D4EE","9EC0","BEC4","9EC1","9EC2","9EC3","D7C6","9EC4","D4D6","B2D3","ECBE","9EC5","9EC6","9EC7","9EC8","EAC1","9EC9","9ECA","9ECB","C2AF","B4B6","9ECC","9ECD","9ECE","D1D7","9ECF","9ED0","9ED1","B3B4","9ED2","C8B2","BFBB","ECC0","9ED3","9ED4","D6CB","9ED5","9ED6","ECBF","ECC1","9ED7","9ED8","9ED9","9EDA","9EDB","9EDC","9EDD","9EDE","9EDF","9EE0","9EE1","9EE2","9EE3","ECC5","BEE6","CCBF","C5DA","BEBC","9EE4","ECC6","9EE5","B1FE","9EE6","9EE7","9EE8","ECC4","D5A8","B5E3","9EE9","ECC2","C1B6","B3E3","9EEA","9EEB","ECC3","CBB8","C0C3","CCFE","9EEC","9EED","9EEE","9EEF","C1D2","9EF0","ECC8","9EF1","9EF2","9EF3","9EF4","9EF5","9EF6","9EF7","9EF8","9EF9","9EFA","9EFB","9EFC","9EFD","BAE6","C0D3","9EFE","D6F2","9F40","9F41","9F42","D1CC","9F43","9F44","9F45","9F46","BFBE","9F47","B7B3","C9D5","ECC7","BBE2","9F48","CCCC","BDFD","C8C8","9F49","CFA9","9F4A","9F4B","9F4C","9F4D","9F4E","9F4F","9F50","CDE9","9F51","C5EB","9F52","9F53","9F54","B7E9","9F55","9F56","9F57","9F58","9F59","9F5A","9F5B","9F5C","9F5D","9F5E","9F5F","D1C9","BAB8","9F60","9F61","9F62","9F63","9F64","ECC9","9F65","9F66","ECCA","9F67","BBC0","ECCB","9F68","ECE2","B1BA","B7D9","9F69","9F6A","9F6B","9F6C","9F6D","9F6E","9F6F","9F70","9F71","9F72","9F73","BDB9","9F74","9F75","9F76","9F77","9F78","9F79","9F7A","9F7B","ECCC","D1E6","ECCD","9F7C","9F7D","9F7E","9F80","C8BB","9F81","9F82","9F83","9F84","9F85","9F86","9F87","9F88","9F89","9F8A","9F8B","9F8C","9F8D","9F8E","ECD1","9F8F","9F90","9F91","9F92","ECD3","9F93","BBCD","9F94","BCE5","9F95","9F96","9F97","9F98","9F99","9F9A","9F9B","9F9C","9F9D","9F9E","9F9F","9FA0","9FA1","ECCF","9FA2","C9B7","9FA3","9FA4","9FA5","9FA6","9FA7","C3BA","9FA8","ECE3","D5D5","ECD0","9FA9","9FAA","9FAB","9FAC","9FAD","D6F3","9FAE","9FAF","9FB0","ECD2","ECCE","9FB1","9FB2","9FB3","9FB4","ECD4","9FB5","ECD5","9FB6","9FB7","C9BF","9FB8","9FB9","9FBA","9FBB","9FBC","9FBD","CFA8","9FBE","9FBF","9FC0","9FC1","9FC2","D0DC","9FC3","9FC4","9FC5","9FC6","D1AC","9FC7","9FC8","9FC9","9FCA","C8DB","9FCB","9FCC","9FCD","ECD6","CEF5","9FCE","9FCF","9FD0","9FD1","9FD2","CAEC","ECDA","9FD3","9FD4","9FD5","9FD6","9FD7","9FD8","9FD9","ECD9","9FDA","9FDB","9FDC","B0BE","9FDD","9FDE","9FDF","9FE0","9FE1","9FE2","ECD7","9FE3","ECD8","9FE4","9FE5","9FE6","ECE4","9FE7","9FE8","9FE9","9FEA","9FEB","9FEC","9FED","9FEE","9FEF","C8BC","9FF0","9FF1","9FF2","9FF3","9FF4","9FF5","9FF6","9FF7","9FF8","9FF9","C1C7","9FFA","9FFB","9FFC","9FFD","9FFE","ECDC","D1E0","A040","A041","A042","A043","A044","A045","A046","A047","A048","A049","ECDB","A04A","A04B","A04C","A04D","D4EF","A04E","ECDD","A04F","A050","A051","A052","A053","A054","DBC6","A055","A056","A057","A058","A059","A05A","A05B","A05C","A05D","A05E","ECDE","A05F","A060","A061","A062","A063","A064","A065","A066","A067","A068","A069","A06A","B1AC","A06B","A06C","A06D","A06E","A06F","A070","A071","A072","A073","A074","A075","A076","A077","A078","A079","A07A","A07B","A07C","A07D","A07E","A080","A081","ECDF","A082","A083","A084","A085","A086","A087","A088","A089","A08A","A08B","ECE0","A08C","D7A6","A08D","C5C0","A08E","A08F","A090","EBBC","B0AE","A091","A092","A093","BEF4","B8B8","D2AF","B0D6","B5F9","A094","D8B3","A095","CBAC","A096","E3DD","A097","A098","A099","A09A","A09B","A09C","A09D","C6AC","B0E6","A09E","A09F","A0A0","C5C6","EBB9","A0A1","A0A2","A0A3","A0A4","EBBA","A0A5","A0A6","A0A7","EBBB","A0A8","A0A9","D1C0","A0AA","C5A3","A0AB","EAF2","A0AC","C4B2","A0AD","C4B5","C0CE","A0AE","A0AF","A0B0","EAF3","C4C1","A0B1","CEEF","A0B2","A0B3","A0B4","A0B5","EAF0","EAF4","A0B6","A0B7","C9FC","A0B8","A0B9","C7A3","A0BA","A0BB","A0BC","CCD8","CEFE","A0BD","A0BE","A0BF","EAF5","EAF6","CFAC","C0E7","A0C0","A0C1","EAF7","A0C2","A0C3","A0C4","A0C5","A0C6","B6BF","EAF8","A0C7","EAF9","A0C8","EAFA","A0C9","A0CA","EAFB","A0CB","A0CC","A0CD","A0CE","A0CF","A0D0","A0D1","A0D2","A0D3","A0D4","A0D5","A0D6","EAF1","A0D7","A0D8","A0D9","A0DA","A0DB","A0DC","A0DD","A0DE","A0DF","A0E0","A0E1","A0E2","C8AE","E1EB","A0E3","B7B8","E1EC","A0E4","A0E5","A0E6","E1ED","A0E7","D7B4","E1EE","E1EF","D3CC","A0E8","A0E9","A0EA","A0EB","A0EC","A0ED","A0EE","E1F1","BFF1","E1F0","B5D2","A0EF","A0F0","A0F1","B1B7","A0F2","A0F3","A0F4","A0F5","E1F3","E1F2","A0F6","BAFC","A0F7","E1F4","A0F8","A0F9","A0FA","A0FB","B9B7","A0FC","BED1","A0FD","A0FE","AA40","AA41","C4FC","AA42","BADD","BDC6","AA43","AA44","AA45","AA46","AA47","AA48","E1F5","E1F7","AA49","AA4A","B6C0","CFC1","CAA8","E1F6","D5F8","D3FC","E1F8","E1FC","E1F9","AA4B","AA4C","E1FA","C0EA","AA4D","E1FE","E2A1","C0C7","AA4E","AA4F","AA50","AA51","E1FB","AA52","E1FD","AA53","AA54","AA55","AA56","AA57","AA58","E2A5","AA59","AA5A","AA5B","C1D4","AA5C","AA5D","AA5E","AA5F","E2A3","AA60","E2A8","B2FE","E2A2","AA61","AA62","AA63","C3CD","B2C2","E2A7","E2A6","AA64","AA65","E2A4","E2A9","AA66","AA67","E2AB","AA68","AA69","AA6A","D0C9","D6ED","C3A8","E2AC","AA6B","CFD7","AA6C","AA6D","E2AE","AA6E","AA6F","BAEF","AA70","AA71","E9E0","E2AD","E2AA","AA72","AA73","AA74","AA75","BBAB","D4B3","AA76","AA77","AA78","AA79","AA7A","AA7B","AA7C","AA7D","AA7E","AA80","AA81","AA82","AA83","E2B0","AA84","AA85","E2AF","AA86","E9E1","AA87","AA88","AA89","AA8A","E2B1","AA8B","AA8C","AA8D","AA8E","AA8F","AA90","AA91","AA92","E2B2","AA93","AA94","AA95","AA96","AA97","AA98","AA99","AA9A","AA9B","AA9C","AA9D","E2B3","CCA1","AA9E","E2B4","AA9F","AAA0","AB40","AB41","AB42","AB43","AB44","AB45","AB46","AB47","AB48","AB49","AB4A","AB4B","E2B5","AB4C","AB4D","AB4E","AB4F","AB50","D0FE","AB51","AB52","C2CA","AB53","D3F1","AB54","CDF5","AB55","AB56","E7E0","AB57","AB58","E7E1","AB59","AB5A","AB5B","AB5C","BEC1","AB5D","AB5E","AB5F","AB60","C2EA","AB61","AB62","AB63","E7E4","AB64","AB65","E7E3","AB66","AB67","AB68","AB69","AB6A","AB6B","CDE6","AB6C","C3B5","AB6D","AB6E","E7E2","BBB7","CFD6","AB6F","C1E1","E7E9","AB70","AB71","AB72","E7E8","AB73","AB74","E7F4","B2A3","AB75","AB76","AB77","AB78","E7EA","AB79","E7E6","AB7A","AB7B","AB7C","AB7D","AB7E","E7EC","E7EB","C9BA","AB80","AB81","D5E4","AB82","E7E5","B7A9","E7E7","AB83","AB84","AB85","AB86","AB87","AB88","AB89","E7EE","AB8A","AB8B","AB8C","AB8D","E7F3","AB8E","D6E9","AB8F","AB90","AB91","AB92","E7ED","AB93","E7F2","AB94","E7F1","AB95","AB96","AB97","B0E0","AB98","AB99","AB9A","AB9B","E7F5","AB9C","AB9D","AB9E","AB9F","ABA0","AC40","AC41","AC42","AC43","AC44","AC45","AC46","AC47","AC48","AC49","AC4A","C7F2","AC4B","C0C5","C0ED","AC4C","AC4D","C1F0","E7F0","AC4E","AC4F","AC50","AC51","E7F6","CBF6","AC52","AC53","AC54","AC55","AC56","AC57","AC58","AC59","AC5A","E8A2","E8A1","AC5B","AC5C","AC5D","AC5E","AC5F","AC60","D7C1","AC61","AC62","E7FA","E7F9","AC63","E7FB","AC64","E7F7","AC65","E7FE","AC66","E7FD","AC67","E7FC","AC68","AC69","C1D5","C7D9","C5FD","C5C3","AC6A","AC6B","AC6C","AC6D","AC6E","C7ED","AC6F","AC70","AC71","AC72","E8A3","AC73","AC74","AC75","AC76","AC77","AC78","AC79","AC7A","AC7B","AC7C","AC7D","AC7E","AC80","AC81","AC82","AC83","AC84","AC85","AC86","E8A6","AC87","E8A5","AC88","E8A7","BAF7","E7F8","E8A4","AC89","C8F0","C9AA","AC8A","AC8B","AC8C","AC8D","AC8E","AC8F","AC90","AC91","AC92","AC93","AC94","AC95","AC96","E8A9","AC97","AC98","B9E5","AC99","AC9A","AC9B","AC9C","AC9D","D1FE","E8A8","AC9E","AC9F","ACA0","AD40","AD41","AD42","E8AA","AD43","E8AD","E8AE","AD44","C1A7","AD45","AD46","AD47","E8AF","AD48","AD49","AD4A","E8B0","AD4B","AD4C","E8AC","AD4D","E8B4","AD4E","AD4F","AD50","AD51","AD52","AD53","AD54","AD55","AD56","AD57","AD58","E8AB","AD59","E8B1","AD5A","AD5B","AD5C","AD5D","AD5E","AD5F","AD60","AD61","E8B5","E8B2","E8B3","AD62","AD63","AD64","AD65","AD66","AD67","AD68","AD69","AD6A","AD6B","AD6C","AD6D","AD6E","AD6F","AD70","AD71","E8B7","AD72","AD73","AD74","AD75","AD76","AD77","AD78","AD79","AD7A","AD7B","AD7C","AD7D","AD7E","AD80","AD81","AD82","AD83","AD84","AD85","AD86","AD87","AD88","AD89","E8B6","AD8A","AD8B","AD8C","AD8D","AD8E","AD8F","AD90","AD91","AD92","B9CF","AD93","F0AC","AD94","F0AD","AD95","C6B0","B0EA","C8BF","AD96","CDDF","AD97","AD98","AD99","AD9A","AD9B","AD9C","AD9D","CECD","EAB1","AD9E","AD9F","ADA0","AE40","EAB2","AE41","C6BF","B4C9","AE42","AE43","AE44","AE45","AE46","AE47","AE48","EAB3","AE49","AE4A","AE4B","AE4C","D5E7","AE4D","AE4E","AE4F","AE50","AE51","AE52","AE53","AE54","DDF9","AE55","EAB4","AE56","EAB5","AE57","EAB6","AE58","AE59","AE5A","AE5B","B8CA","DFB0","C9F5","AE5C","CCF0","AE5D","AE5E","C9FA","AE5F","AE60","AE61","AE62","AE63","C9FB","AE64","AE65","D3C3","CBA6","AE66","B8A6","F0AE","B1C2","AE67","E5B8","CCEF","D3C9","BCD7","C9EA","AE68","B5E7","AE69","C4D0","B5E9","AE6A","EEAE","BBAD","AE6B","AE6C","E7DE","AE6D","EEAF","AE6E","AE6F","AE70","AE71","B3A9","AE72","AE73","EEB2","AE74","AE75","EEB1","BDE7","AE76","EEB0","CEB7","AE77","AE78","AE79","AE7A","C5CF","AE7B","AE7C","AE7D","AE7E","C1F4","DBCE","EEB3","D0F3","AE80","AE81","AE82","AE83","AE84","AE85","AE86","AE87","C2D4","C6E8","AE88","AE89","AE8A","B7AC","AE8B","AE8C","AE8D","AE8E","AE8F","AE90","AE91","EEB4","AE92","B3EB","AE93","AE94","AE95","BBFB","EEB5","AE96","AE97","AE98","AE99","AE9A","E7DC","AE9B","AE9C","AE9D","EEB6","AE9E","AE9F","BDAE","AEA0","AF40","AF41","AF42","F1E2","AF43","AF44","AF45","CAE8","AF46","D2C9","F0DA","AF47","F0DB","AF48","F0DC","C1C6","AF49","B8ED","BECE","AF4A","AF4B","F0DE","AF4C","C5B1","F0DD","D1F1","AF4D","F0E0","B0CC","BDEA","AF4E","AF4F","AF50","AF51","AF52","D2DF","F0DF","AF53","B4AF","B7E8","F0E6","F0E5","C6A3","F0E1","F0E2","B4C3","AF54","AF55","F0E3","D5EE","AF56","AF57","CCDB","BED2","BCB2","AF58","AF59","AF5A","F0E8","F0E7","F0E4","B2A1","AF5B","D6A2","D3B8","BEB7","C8AC","AF5C","AF5D","F0EA","AF5E","AF5F","AF60","AF61","D1F7","AF62","D6CC","BADB","F0E9","AF63","B6BB","AF64","AF65","CDB4","AF66","AF67","C6A6","AF68","AF69","AF6A","C1A1","F0EB","F0EE","AF6B","F0ED","F0F0","F0EC","AF6C","BBBE","F0EF","AF6D","AF6E","AF6F","AF70","CCB5","F0F2","AF71","AF72","B3D5","AF73","AF74","AF75","AF76","B1D4","AF77","AF78","F0F3","AF79","AF7A","F0F4","F0F6","B4E1","AF7B","F0F1","AF7C","F0F7","AF7D","AF7E","AF80","AF81","F0FA","AF82","F0F8","AF83","AF84","AF85","F0F5","AF86","AF87","AF88","AF89","F0FD","AF8A","F0F9","F0FC","F0FE","AF8B","F1A1","AF8C","AF8D","AF8E","CEC1","F1A4","AF8F","F1A3","AF90","C1F6","F0FB","CADD","AF91","AF92","B4F1","B1F1","CCB1","AF93","F1A6","AF94","AF95","F1A7","AF96","AF97","F1AC","D5CE","F1A9","AF98","AF99","C8B3","AF9A","AF9B","AF9C","F1A2","AF9D","F1AB","F1A8","F1A5","AF9E","AF9F","F1AA","AFA0","B040","B041","B042","B043","B044","B045","B046","B0A9","F1AD","B047","B048","B049","B04A","B04B","B04C","F1AF","B04D","F1B1","B04E","B04F","B050","B051","B052","F1B0","B053","F1AE","B054","B055","B056","B057","D1A2","B058","B059","B05A","B05B","B05C","B05D","B05E","F1B2","B05F","B060","B061","F1B3","B062","B063","B064","B065","B066","B067","B068","B069","B9EF","B06A","B06B","B5C7","B06C","B0D7","B0D9","B06D","B06E","B06F","D4ED","B070","B5C4","B071","BDD4","BBCA","F0A7","B072","B073","B8DE","B074","B075","F0A8","B076","B077","B0A8","B078","F0A9","B079","B07A","CDEE","B07B","B07C","F0AA","B07D","B07E","B080","B081","B082","B083","B084","B085","B086","B087","F0AB","B088","B089","B08A","B08B","B08C","B08D","B08E","B08F","B090","C6A4","B091","B092","D6E5","F1E4","B093","F1E5","B094","B095","B096","B097","B098","B099","B09A","B09B","B09C","B09D","C3F3","B09E","B09F","D3DB","B0A0","B140","D6D1","C5E8","B141","D3AF","B142","D2E6","B143","B144","EEC1","B0BB","D5B5","D1CE","BCE0","BAD0","B145","BFF8","B146","B8C7","B5C1","C5CC","B147","B148","CAA2","B149","B14A","B14B","C3CB","B14C","B14D","B14E","B14F","B150","EEC2","B151","B152","B153","B154","B155","B156","B157","B158","C4BF","B6A2","B159","EDEC","C3A4","B15A","D6B1","B15B","B15C","B15D","CFE0","EDEF","B15E","B15F","C5CE","B160","B6DC","B161","B162","CAA1","B163","B164","EDED","B165","B166","EDF0","EDF1","C3BC","B167","BFB4","B168","EDEE","B169","B16A","B16B","B16C","B16D","B16E","B16F","B170","B171","B172","B173","EDF4","EDF2","B174","B175","B176","B177","D5E6","C3DF","B178","EDF3","B179","B17A","B17B","EDF6","B17C","D5A3","D1A3","B17D","B17E","B180","EDF5","B181","C3D0","B182","B183","B184","B185","B186","EDF7","BFF4","BEEC","EDF8","B187","CCF7","B188","D1DB","B189","B18A","B18B","D7C5","D5F6","B18C","EDFC","B18D","B18E","B18F","EDFB","B190","B191","B192","B193","B194","B195","B196","B197","EDF9","EDFA","B198","B199","B19A","B19B","B19C","B19D","B19E","B19F","EDFD","BEA6","B1A0","B240","B241","B242","B243","CBAF","EEA1","B6BD","B244","EEA2","C4C0","B245","EDFE","B246","B247","BDDE","B2C7","B248","B249","B24A","B24B","B24C","B24D","B24E","B24F","B250","B251","B252","B253","B6C3","B254","B255","B256","EEA5","D8BA","EEA3","EEA6","B257","B258","B259","C3E9","B3F2","B25A","B25B","B25C","B25D","B25E","B25F","EEA7","EEA4","CFB9","B260","B261","EEA8","C2F7","B262","B263","B264","B265","B266","B267","B268","B269","B26A","B26B","B26C","B26D","EEA9","EEAA","B26E","DEAB","B26F","B270","C6B3","B271","C7C6","B272","D6F5","B5C9","B273","CBB2","B274","B275","B276","EEAB","B277","B278","CDAB","B279","EEAC","B27A","B27B","B27C","B27D","B27E","D5B0","B280","EEAD","B281","F6C4","B282","B283","B284","B285","B286","B287","B288","B289","B28A","B28B","B28C","B28D","B28E","DBC7","B28F","B290","B291","B292","B293","B294","B295","B296","B297","B4A3","B298","B299","B29A","C3AC","F1E6","B29B","B29C","B29D","B29E","B29F","CAB8","D2D3","B2A0","D6AA","B340","EFF2","B341","BED8","B342","BDC3","EFF3","B6CC","B0AB","B343","B344","B345","B346","CAAF","B347","B348","EDB6","B349","EDB7","B34A","B34B","B34C","B34D","CEF9","B7AF","BFF3","EDB8","C2EB","C9B0","B34E","B34F","B350","B351","B352","B353","EDB9","B354","B355","C6F6","BFB3","B356","B357","B358","EDBC","C5F8","B359","D1D0","B35A","D7A9","EDBA","EDBB","B35B","D1E2","B35C","EDBF","EDC0","B35D","EDC4","B35E","B35F","B360","EDC8","B361","EDC6","EDCE","D5E8","B362","EDC9","B363","B364","EDC7","EDBE","B365","B366","C5E9","B367","B368","B369","C6C6","B36A","B36B","C9E9","D4D2","EDC1","EDC2","EDC3","EDC5","B36C","C0F9","B36D","B4A1","B36E","B36F","B370","B371","B9E8","B372","EDD0","B373","B374","B375","B376","EDD1","B377","EDCA","B378","EDCF","B379","CEF8","B37A","B37B","CBB6","EDCC","EDCD","B37C","B37D","B37E","B380","B381","CFF5","B382","B383","B384","B385","B386","B387","B388","B389","B38A","B38B","B38C","B38D","EDD2","C1F2","D3B2","EDCB","C8B7","B38E","B38F","B390","B391","B392","B393","B394","B395","BCEF","B396","B397","B398","B399","C5F0","B39A","B39B","B39C","B39D","B39E","B39F","B3A0","B440","B441","B442","EDD6","B443","B5EF","B444","B445","C2B5","B0AD","CBE9","B446","B447","B1AE","B448","EDD4","B449","B44A","B44B","CDEB","B5E2","B44C","EDD5","EDD3","EDD7","B44D","B44E","B5FA","B44F","EDD8","B450","EDD9","B451","EDDC","B452","B1CC","B453","B454","B455","B456","B457","B458","B459","B45A","C5F6","BCEE","EDDA","CCBC","B2EA","B45B","B45C","B45D","B45E","EDDB","B45F","B460","B461","B462","C4EB","B463","B464","B4C5","B465","B466","B467","B0F5","B468","B469","B46A","EDDF","C0DA","B4E8","B46B","B46C","B46D","B46E","C5CD","B46F","B470","B471","EDDD","BFC4","B472","B473","B474","EDDE","B475","B476","B477","B478","B479","B47A","B47B","B47C","B47D","B47E","B480","B481","B482","B483","C4A5","B484","B485","B486","EDE0","B487","B488","B489","B48A","B48B","EDE1","B48C","EDE3","B48D","B48E","C1D7","B48F","B490","BBC7","B491","B492","B493","B494","B495","B496","BDB8","B497","B498","B499","EDE2","B49A","B49B","B49C","B49D","B49E","B49F","B4A0","B540","B541","B542","B543","B544","B545","EDE4","B546","B547","B548","B549","B54A","B54B","B54C","B54D","B54E","B54F","EDE6","B550","B551","B552","B553","B554","EDE5","B555","B556","B557","B558","B559","B55A","B55B","B55C","B55D","B55E","B55F","B560","B561","B562","B563","EDE7","B564","B565","B566","B567","B568","CABE","ECEA","C0F1","B569","C9E7","B56A","ECEB","C6EE","B56B","B56C","B56D","B56E","ECEC","B56F","C6ED","ECED","B570","B571","B572","B573","B574","B575","B576","B577","B578","ECF0","B579","B57A","D7E6","ECF3","B57B","B57C","ECF1","ECEE","ECEF","D7A3","C9F1","CBEE","ECF4","B57D","ECF2","B57E","B580","CFE9","B581","ECF6","C6B1","B582","B583","B584","B585","BCC0","B586","ECF5","B587","B588","B589","B58A","B58B","B58C","B58D","B5BB","BBF6","B58E","ECF7","B58F","B590","B591","B592","B593","D9F7","BDFB","B594","B595","C2BB","ECF8","B596","B597","B598","B599","ECF9","B59A","B59B","B59C","B59D","B8A3","B59E","B59F","B5A0","B640","B641","B642","B643","B644","B645","B646","ECFA","B647","B648","B649","B64A","B64B","B64C","B64D","B64E","B64F","B650","B651","B652","ECFB","B653","B654","B655","B656","B657","B658","B659","B65A","B65B","B65C","B65D","ECFC","B65E","B65F","B660","B661","B662","D3ED","D8AE","C0EB","B663","C7DD","BACC","B664","D0E3","CBBD","B665","CDBA","B666","B667","B8D1","B668","B669","B1FC","B66A","C7EF","B66B","D6D6","B66C","B66D","B66E","BFC6","C3EB","B66F","B670","EFF5","B671","B672","C3D8","B673","B674","B675","B676","B677","B678","D7E2","B679","B67A","B67B","EFF7","B3D3","B67C","C7D8","D1ED","B67D","D6C8","B67E","EFF8","B680","EFF6","B681","BBFD","B3C6","B682","B683","B684","B685","B686","B687","B688","BDD5","B689","B68A","D2C6","B68B","BBE0","B68C","B68D","CFA1","B68E","EFFC","EFFB","B68F","B690","EFF9","B691","B692","B693","B694","B3CC","B695","C9D4","CBB0","B696","B697","B698","B699","B69A","EFFE","B69B","B69C","B0DE","B69D","B69E","D6C9","B69F","B6A0","B740","EFFD","B741","B3ED","B742","B743","F6D5","B744","B745","B746","B747","B748","B749","B74A","B74B","B74C","B74D","B74E","B74F","B750","B751","B752","CEC8","B753","B754","B755","F0A2","B756","F0A1","B757","B5BE","BCDA","BBFC","B758","B8E5","B759","B75A","B75B","B75C","B75D","B75E","C4C2","B75F","B760","B761","B762","B763","B764","B765","B766","B767","B768","F0A3","B769","B76A","B76B","B76C","B76D","CBEB","B76E","B76F","B770","B771","B772","B773","B774","B775","B776","B777","B778","B779","B77A","B77B","B77C","B77D","B77E","B780","B781","B782","B783","B784","B785","B786","F0A6","B787","B788","B789","D1A8","B78A","BEBF","C7EE","F1B6","F1B7","BFD5","B78B","B78C","B78D","B78E","B4A9","F1B8","CDBB","B78F","C7D4","D5AD","B790","F1B9","B791","F1BA","B792","B793","B794","B795","C7CF","B796","B797","B798","D2A4","D6CF","B799","B79A","F1BB","BDD1","B4B0","BEBD","B79B","B79C","B79D","B4DC","CED1","B79E","BFDF","F1BD","B79F","B7A0","B840","B841","BFFA","F1BC","B842","F1BF","B843","B844","B845","F1BE","F1C0","B846","B847","B848","B849","B84A","F1C1","B84B","B84C","B84D","B84E","B84F","B850","B851","B852","B853","B854","B855","C1FE","B856","B857","B858","B859","B85A","B85B","B85C","B85D","B85E","B85F","B860","C1A2","B861","B862","B863","B864","B865","B866","B867","B868","B869","B86A","CAFA","B86B","B86C","D5BE","B86D","B86E","B86F","B870","BEBA","BEB9","D5C2","B871","B872","BFA2","B873","CDAF","F1B5","B874","B875","B876","B877","B878","B879","BDDF","B87A","B6CB","B87B","B87C","B87D","B87E","B880","B881","B882","B883","B884","D6F1","F3C3","B885","B886","F3C4","B887","B8CD","B888","B889","B88A","F3C6","F3C7","B88B","B0CA","B88C","F3C5","B88D","F3C9","CBF1","B88E","B88F","B890","F3CB","B891","D0A6","B892","B893","B1CA","F3C8","B894","B895","B896","F3CF","B897","B5D1","B898","B899","F3D7","B89A","F3D2","B89B","B89C","B89D","F3D4","F3D3","B7FB","B89E","B1BF","B89F","F3CE","F3CA","B5DA","B8A0","F3D0","B940","B941","F3D1","B942","F3D5","B943","B944","B945","B946","F3CD","B947","BCE3","B948","C1FD","B949","F3D6","B94A","B94B","B94C","B94D","B94E","B94F","F3DA","B950","F3CC","B951","B5C8","B952","BDEE","F3DC","B953","B954","B7A4","BFF0","D6FE","CDB2","B955","B4F0","B956","B2DF","B957","F3D8","B958","F3D9","C9B8","B959","F3DD","B95A","B95B","F3DE","B95C","F3E1","B95D","B95E","B95F","B960","B961","B962","B963","B964","B965","B966","B967","F3DF","B968","B969","F3E3","F3E2","B96A","B96B","F3DB","B96C","BFEA","B96D","B3EF","B96E","F3E0","B96F","B970","C7A9","B971","BCF2","B972","B973","B974","B975","F3EB","B976","B977","B978","B979","B97A","B97B","B97C","B9BF","B97D","B97E","F3E4","B980","B981","B982","B2AD","BBFE","B983","CBE3","B984","B985","B986","B987","F3ED","F3E9","B988","B989","B98A","B9DC","F3EE","B98B","B98C","B98D","F3E5","F3E6","F3EA","C2E1","F3EC","F3EF","F3E8","BCFD","B98E","B98F","B990","CFE4","B991","B992","F3F0","B993","B994","B995","F3E7","B996","B997","B998","B999","B99A","B99B","B99C","B99D","F3F2","B99E","B99F","B9A0","BA40","D7AD","C6AA","BA41","BA42","BA43","BA44","F3F3","BA45","BA46","BA47","BA48","F3F1","BA49","C2A8","BA4A","BA4B","BA4C","BA4D","BA4E","B8DD","F3F5","BA4F","BA50","F3F4","BA51","BA52","BA53","B4DB","BA54","BA55","BA56","F3F6","F3F7","BA57","BA58","BA59","F3F8","BA5A","BA5B","BA5C","C0BA","BA5D","BA5E","C0E9","BA5F","BA60","BA61","BA62","BA63","C5F1","BA64","BA65","BA66","BA67","F3FB","BA68","F3FA","BA69","BA6A","BA6B","BA6C","BA6D","BA6E","BA6F","BA70","B4D8","BA71","BA72","BA73","F3FE","F3F9","BA74","BA75","F3FC","BA76","BA77","BA78","BA79","BA7A","BA7B","F3FD","BA7C","BA7D","BA7E","BA80","BA81","BA82","BA83","BA84","F4A1","BA85","BA86","BA87","BA88","BA89","BA8A","F4A3","BBC9","BA8B","BA8C","F4A2","BA8D","BA8E","BA8F","BA90","BA91","BA92","BA93","BA94","BA95","BA96","BA97","BA98","BA99","F4A4","BA9A","BA9B","BA9C","BA9D","BA9E","BA9F","B2BE","F4A6","F4A5","BAA0","BB40","BB41","BB42","BB43","BB44","BB45","BB46","BB47","BB48","BB49","BCAE","BB4A","BB4B","BB4C","BB4D","BB4E","BB4F","BB50","BB51","BB52","BB53","BB54","BB55","BB56","BB57","BB58","BB59","BB5A","BB5B","BB5C","BB5D","BB5E","BB5F","BB60","BB61","BB62","BB63","BB64","BB65","BB66","BB67","BB68","BB69","BB6A","BB6B","BB6C","BB6D","BB6E","C3D7","D9E1","BB6F","BB70","BB71","BB72","BB73","BB74","C0E0","F4CC","D7D1","BB75","BB76","BB77","BB78","BB79","BB7A","BB7B","BB7C","BB7D","BB7E","BB80","B7DB","BB81","BB82","BB83","BB84","BB85","BB86","BB87","F4CE","C1A3","BB88","BB89","C6C9","BB8A","B4D6","D5B3","BB8B","BB8C","BB8D","F4D0","F4CF","F4D1","CBDA","BB8E","BB8F","F4D2","BB90","D4C1","D6E0","BB91","BB92","BB93","BB94","B7E0","BB95","BB96","BB97","C1B8","BB98","BB99","C1BB","F4D3","BEAC","BB9A","BB9B","BB9C","BB9D","BB9E","B4E2","BB9F","BBA0","F4D4","F4D5","BEAB","BC40","BC41","F4D6","BC42","BC43","BC44","F4DB","BC45","F4D7","F4DA","BC46","BAFD","BC47","F4D8","F4D9","BC48","BC49","BC4A","BC4B","BC4C","BC4D","BC4E","B8E2","CCC7","F4DC","BC4F","B2DA","BC50","BC51","C3D3","BC52","BC53","D4E3","BFB7","BC54","BC55","BC56","BC57","BC58","BC59","BC5A","F4DD","BC5B","BC5C","BC5D","BC5E","BC5F","BC60","C5B4","BC61","BC62","BC63","BC64","BC65","BC66","BC67","BC68","F4E9","BC69","BC6A","CFB5","BC6B","BC6C","BC6D","BC6E","BC6F","BC70","BC71","BC72","BC73","BC74","BC75","BC76","BC77","BC78","CEC9","BC79","BC7A","BC7B","BC7C","BC7D","BC7E","BC80","BC81","BC82","BC83","BC84","BC85","BC86","BC87","BC88","BC89","BC8A","BC8B","BC8C","BC8D","BC8E","CBD8","BC8F","CBF7","BC90","BC91","BC92","BC93","BDF4","BC94","BC95","BC96","D7CF","BC97","BC98","BC99","C0DB","BC9A","BC9B","BC9C","BC9D","BC9E","BC9F","BCA0","BD40","BD41","BD42","BD43","BD44","BD45","BD46","BD47","BD48","BD49","BD4A","BD4B","BD4C","BD4D","BD4E","BD4F","BD50","BD51","BD52","BD53","BD54","BD55","BD56","BD57","BD58","BD59","BD5A","BD5B","BD5C","BD5D","BD5E","BD5F","BD60","BD61","BD62","BD63","BD64","BD65","BD66","BD67","BD68","BD69","BD6A","BD6B","BD6C","BD6D","BD6E","BD6F","BD70","BD71","BD72","BD73","BD74","BD75","BD76","D0F5","BD77","BD78","BD79","BD7A","BD7B","BD7C","BD7D","BD7E","F4EA","BD80","BD81","BD82","BD83","BD84","BD85","BD86","BD87","BD88","BD89","BD8A","BD8B","BD8C","BD8D","BD8E","BD8F","BD90","BD91","BD92","BD93","BD94","BD95","BD96","BD97","BD98","BD99","BD9A","BD9B","BD9C","BD9D","BD9E","BD9F","BDA0","BE40","BE41","BE42","BE43","BE44","BE45","BE46","BE47","BE48","BE49","BE4A","BE4B","BE4C","F4EB","BE4D","BE4E","BE4F","BE50","BE51","BE52","BE53","F4EC","BE54","BE55","BE56","BE57","BE58","BE59","BE5A","BE5B","BE5C","BE5D","BE5E","BE5F","BE60","BE61","BE62","BE63","BE64","BE65","BE66","BE67","BE68","BE69","BE6A","BE6B","BE6C","BE6D","BE6E","BE6F","BE70","BE71","BE72","BE73","BE74","BE75","BE76","BE77","BE78","BE79","BE7A","BE7B","BE7C","BE7D","BE7E","BE80","BE81","BE82","BE83","BE84","BE85","BE86","BE87","BE88","BE89","BE8A","BE8B","BE8C","BE8D","BE8E","BE8F","BE90","BE91","BE92","BE93","BE94","BE95","BE96","BE97","BE98","BE99","BE9A","BE9B","BE9C","BE9D","BE9E","BE9F","BEA0","BF40","BF41","BF42","BF43","BF44","BF45","BF46","BF47","BF48","BF49","BF4A","BF4B","BF4C","BF4D","BF4E","BF4F","BF50","BF51","BF52","BF53","BF54","BF55","BF56","BF57","BF58","BF59","BF5A","BF5B","BF5C","BF5D","BF5E","BF5F","BF60","BF61","BF62","BF63","BF64","BF65","BF66","BF67","BF68","BF69","BF6A","BF6B","BF6C","BF6D","BF6E","BF6F","BF70","BF71","BF72","BF73","BF74","BF75","BF76","BF77","BF78","BF79","BF7A","BF7B","BF7C","BF7D","BF7E","BF80","F7E3","BF81","BF82","BF83","BF84","BF85","B7B1","BF86","BF87","BF88","BF89","BF8A","F4ED","BF8B","BF8C","BF8D","BF8E","BF8F","BF90","BF91","BF92","BF93","BF94","BF95","BF96","BF97","BF98","BF99","BF9A","BF9B","BF9C","BF9D","BF9E","BF9F","BFA0","C040","C041","C042","C043","C044","C045","C046","C047","C048","C049","C04A","C04B","C04C","C04D","C04E","C04F","C050","C051","C052","C053","C054","C055","C056","C057","C058","C059","C05A","C05B","C05C","C05D","C05E","C05F","C060","C061","C062","C063","D7EB","C064","C065","C066","C067","C068","C069","C06A","C06B","C06C","C06D","C06E","C06F","C070","C071","C072","C073","C074","C075","C076","C077","C078","C079","C07A","C07B","F4EE","C07C","C07D","C07E","E6F9","BEC0","E6FA","BAEC","E6FB","CFCB","E6FC","D4BC","BCB6","E6FD","E6FE","BCCD","C8D2","CEB3","E7A1","C080","B4BF","E7A2","C9B4","B8D9","C4C9","C081","D7DD","C2DA","B7D7","D6BD","CEC6","B7C4","C082","C083","C5A6","E7A3","CFDF","E7A4","E7A5","E7A6","C1B7","D7E9","C9F0","CFB8","D6AF","D6D5","E7A7","B0ED","E7A8","E7A9","C9DC","D2EF","BEAD","E7AA","B0F3","C8DE","BDE1","E7AB","C8C6","C084","E7AC","BBE6","B8F8","D1A4","E7AD","C2E7","BEF8","BDCA","CDB3","E7AE","E7AF","BEEE","D0E5","C085","CBE7","CCD0","BCCC","E7B0","BCA8","D0F7","E7B1","C086","D0F8","E7B2","E7B3","B4C2","E7B4","E7B5","C9FE","CEAC","C3E0","E7B7","B1C1","B3F1","C087","E7B8","E7B9","D7DB","D5C0","E7BA","C2CC","D7BA","E7BB","E7BC","E7BD","BCEA","C3E5","C0C2","E7BE","E7BF","BCA9","C088","E7C0","E7C1","E7B6","B6D0","E7C2","C089","E7C3","E7C4","BBBA","B5DE","C2C6","B1E0","E7C5","D4B5","E7C6","B8BF","E7C8","E7C7","B7EC","C08A","E7C9","B2F8","E7CA","E7CB","E7CC","E7CD","E7CE","E7CF","E7D0","D3A7","CBF5","E7D1","E7D2","E7D3","E7D4","C9C9","E7D5","E7D6","E7D7","E7D8","E7D9","BDC9","E7DA","F3BE","C08B","B8D7","C08C","C8B1","C08D","C08E","C08F","C090","C091","C092","C093","F3BF","C094","F3C0","F3C1","C095","C096","C097","C098","C099","C09A","C09B","C09C","C09D","C09E","B9DE","CDF8","C09F","C0A0","D8E8","BAB1","C140","C2DE","EEB7","C141","B7A3","C142","C143","C144","C145","EEB9","C146","EEB8","B0D5","C147","C148","C149","C14A","C14B","EEBB","D5D6","D7EF","C14C","C14D","C14E","D6C3","C14F","C150","EEBD","CAF0","C151","EEBC","C152","C153","C154","C155","EEBE","C156","C157","C158","C159","EEC0","C15A","C15B","EEBF","C15C","C15D","C15E","C15F","C160","C161","C162","C163","D1F2","C164","C7BC","C165","C3C0","C166","C167","C168","C169","C16A","B8E1","C16B","C16C","C16D","C16E","C16F","C1E7","C170","C171","F4C6","D0DF","F4C7","C172","CFDB","C173","C174","C8BA","C175","C176","F4C8","C177","C178","C179","C17A","C17B","C17C","C17D","F4C9","F4CA","C17E","F4CB","C180","C181","C182","C183","C184","D9FA","B8FE","C185","C186","E5F1","D3F0","C187","F4E0","C188","CECC","C189","C18A","C18B","B3E1","C18C","C18D","C18E","C18F","F1B4","C190","D2EE","C191","F4E1","C192","C193","C194","C195","C196","CFE8","F4E2","C197","C198","C7CC","C199","C19A","C19B","C19C","C19D","C19E","B5D4","B4E4","F4E4","C19F","C1A0","C240","F4E3","F4E5","C241","C242","F4E6","C243","C244","C245","C246","F4E7","C247","BAB2","B0BF","C248","F4E8","C249","C24A","C24B","C24C","C24D","C24E","C24F","B7AD","D2ED","C250","C251","C252","D2AB","C0CF","C253","BFBC","EBA3","D5DF","EAC8","C254","C255","C256","C257","F1F3","B6F8","CBA3","C258","C259","C4CD","C25A","F1E7","C25B","F1E8","B8FB","F1E9","BAC4","D4C5","B0D2","C25C","C25D","F1EA","C25E","C25F","C260","F1EB","C261","F1EC","C262","C263","F1ED","F1EE","F1EF","F1F1","F1F0","C5D5","C264","C265","C266","C267","C268","C269","F1F2","C26A","B6FA","C26B","F1F4","D2AE","DEC7","CBCA","C26C","C26D","B3DC","C26E","B5A2","C26F","B9A2","C270","C271","C4F4","F1F5","C272","C273","F1F6","C274","C275","C276","C1C4","C1FB","D6B0","F1F7","C277","C278","C279","C27A","F1F8","C27B","C1AA","C27C","C27D","C27E","C6B8","C280","BEDB","C281","C282","C283","C284","C285","C286","C287","C288","C289","C28A","C28B","C28C","C28D","C28E","F1F9","B4CF","C28F","C290","C291","C292","C293","C294","F1FA","C295","C296","C297","C298","C299","C29A","C29B","C29C","C29D","C29E","C29F","C2A0","C340","EDB2","EDB1","C341","C342","CBE0","D2DE","C343","CBC1","D5D8","C344","C8E2","C345","C0DF","BCA1","C346","C347","C348","C349","C34A","C34B","EBC1","C34C","C34D","D0A4","C34E","D6E2","C34F","B6C7","B8D8","EBC0","B8CE","C350","EBBF","B3A6","B9C9","D6AB","C351","B7F4","B7CA","C352","C353","C354","BCE7","B7BE","EBC6","C355","EBC7","B0B9","BFCF","C356","EBC5","D3FD","C357","EBC8","C358","C359","EBC9","C35A","C35B","B7CE","C35C","EBC2","EBC4","C9F6","D6D7","D5CD","D0B2","EBCF","CEB8","EBD0","C35D","B5A8","C35E","C35F","C360","C361","C362","B1B3","EBD2","CCA5","C363","C364","C365","C366","C367","C368","C369","C5D6","EBD3","C36A","EBD1","C5DF","EBCE","CAA4","EBD5","B0FB","C36B","C36C","BAFA","C36D","C36E","D8B7","F1E3","C36F","EBCA","EBCB","EBCC","EBCD","EBD6","E6C0","EBD9","C370","BFE8","D2C8","EBD7","EBDC","B8EC","EBD8","C371","BDBA","C372","D0D8","C373","B0B7","C374","EBDD","C4DC","C375","C376","C377","C378","D6AC","C379","C37A","C37B","B4E0","C37C","C37D","C2F6","BCB9","C37E","C380","EBDA","EBDB","D4E0","C6EA","C4D4","EBDF","C5A7","D9F5","C381","B2B1","C382","EBE4","C383","BDC5","C384","C385","C386","EBE2","C387","C388","C389","C38A","C38B","C38C","C38D","C38E","C38F","C390","C391","C392","C393","EBE3","C394","C395","B8AC","C396","CDD1","EBE5","C397","C398","C399","EBE1","C39A","C1B3","C39B","C39C","C39D","C39E","C39F","C6A2","C3A0","C440","C441","C442","C443","C444","C445","CCF3","C446","EBE6","C447","C0B0","D2B8","EBE7","C448","C449","C44A","B8AF","B8AD","C44B","EBE8","C7BB","CDF3","C44C","C44D","C44E","EBEA","EBEB","C44F","C450","C451","C452","C453","EBED","C454","C455","C456","C457","D0C8","C458","EBF2","C459","EBEE","C45A","C45B","C45C","EBF1","C8F9","C45D","D1FC","EBEC","C45E","C45F","EBE9","C460","C461","C462","C463","B8B9","CFD9","C4E5","EBEF","EBF0","CCDA","CDC8","B0F2","C464","EBF6","C465","C466","C467","C468","C469","EBF5","C46A","B2B2","C46B","C46C","C46D","C46E","B8E0","C46F","EBF7","C470","C471","C472","C473","C474","C475","B1EC","C476","C477","CCC5","C4A4","CFA5","C478","C479","C47A","C47B","C47C","EBF9","C47D","C47E","ECA2","C480","C5F2","C481","EBFA","C482","C483","C484","C485","C486","C487","C488","C489","C9C5","C48A","C48B","C48C","C48D","C48E","C48F","E2DF","EBFE","C490","C491","C492","C493","CDCE","ECA1","B1DB","D3B7","C494","C495","D2DC","C496","C497","C498","EBFD","C499","EBFB","C49A","C49B","C49C","C49D","C49E","C49F","C4A0","C540","C541","C542","C543","C544","C545","C546","C547","C548","C549","C54A","C54B","C54C","C54D","C54E","B3BC","C54F","C550","C551","EAB0","C552","C553","D7D4","C554","F4AB","B3F4","C555","C556","C557","C558","C559","D6C1","D6C2","C55A","C55B","C55C","C55D","C55E","C55F","D5E9","BECA","C560","F4A7","C561","D2A8","F4A8","F4A9","C562","F4AA","BECB","D3DF","C563","C564","C565","C566","C567","C9E0","C9E1","C568","C569","F3C2","C56A","CAE6","C56B","CCF2","C56C","C56D","C56E","C56F","C570","C571","E2B6","CBB4","C572","CEE8","D6DB","C573","F4AD","F4AE","F4AF","C574","C575","C576","C577","F4B2","C578","BABD","F4B3","B0E3","F4B0","C579","F4B1","BDA2","B2D5","C57A","F4B6","F4B7","B6E6","B2B0","CFCF","F4B4","B4AC","C57B","F4B5","C57C","C57D","F4B8","C57E","C580","C581","C582","C583","F4B9","C584","C585","CDA7","C586","F4BA","C587","F4BB","C588","C589","C58A","F4BC","C58B","C58C","C58D","C58E","C58F","C590","C591","C592","CBD2","C593","F4BD","C594","C595","C596","C597","F4BE","C598","C599","C59A","C59B","C59C","C59D","C59E","C59F","F4BF","C5A0","C640","C641","C642","C643","F4DE","C1BC","BCE8","C644","C9AB","D1DE","E5F5","C645","C646","C647","C648","DCB3","D2D5","C649","C64A","DCB4","B0AC","DCB5","C64B","C64C","BDDA","C64D","DCB9","C64E","C64F","C650","D8C2","C651","DCB7","D3F3","C652","C9D6","DCBA","DCB6","C653","DCBB","C3A2","C654","C655","C656","C657","DCBC","DCC5","DCBD","C658","C659","CEDF","D6A5","C65A","DCCF","C65B","DCCD","C65C","C65D","DCD2","BDE6","C2AB","C65E","DCB8","DCCB","DCCE","DCBE","B7D2","B0C5","DCC7","D0BE","DCC1","BBA8","C65F","B7BC","DCCC","C660","C661","DCC6","DCBF","C7DB","C662","C663","C664","D1BF","DCC0","C665","C666","DCCA","C667","C668","DCD0","C669","C66A","CEAD","DCC2","C66B","DCC3","DCC8","DCC9","B2D4","DCD1","CBD5","C66C","D4B7","DCDB","DCDF","CCA6","DCE6","C66D","C3E7","DCDC","C66E","C66F","BFC1","DCD9","C670","B0FA","B9B6","DCE5","DCD3","C671","DCC4","DCD6","C8F4","BFE0","C672","C673","C674","C675","C9BB","C676","C677","C678","B1BD","C679","D3A2","C67A","C67B","DCDA","C67C","C67D","DCD5","C67E","C6BB","C680","DCDE","C681","C682","C683","C684","C685","D7C2","C3AF","B7B6","C7D1","C3A9","DCE2","DCD8","DCEB","DCD4","C686","C687","DCDD","C688","BEA5","DCD7","C689","DCE0","C68A","C68B","DCE3","DCE4","C68C","DCF8","C68D","C68E","DCE1","DDA2","DCE7","C68F","C690","C691","C692","C693","C694","C695","C696","C697","C698","BCEB","B4C4","C699","C69A","C3A3","B2E7","DCFA","C69B","DCF2","C69C","DCEF","C69D","DCFC","DCEE","D2F0","B2E8","C69E","C8D7","C8E3","DCFB","C69F","DCED","C6A0","C740","C741","DCF7","C742","C743","DCF5","C744","C745","BEA3","DCF4","C746","B2DD","C747","C748","C749","C74A","C74B","DCF3","BCF6","DCE8","BBC4","C74C","C0F3","C74D","C74E","C74F","C750","C751","BCD4","DCE9","DCEA","C752","DCF1","DCF6","DCF9","B5B4","C753","C8D9","BBE7","DCFE","DCFD","D3AB","DDA1","DDA3","DDA5","D2F1","DDA4","DDA6","DDA7","D2A9","C754","C755","C756","C757","C758","C759","C75A","BAC9","DDA9","C75B","C75C","DDB6","DDB1","DDB4","C75D","C75E","C75F","C760","C761","C762","C763","DDB0","C6CE","C764","C765","C0F2","C766","C767","C768","C769","C9AF","C76A","C76B","C76C","DCEC","DDAE","C76D","C76E","C76F","C770","DDB7","C771","C772","DCF0","DDAF","C773","DDB8","C774","DDAC","C775","C776","C777","C778","C779","C77A","C77B","DDB9","DDB3","DDAD","C4AA","C77C","C77D","C77E","C780","DDA8","C0B3","C1AB","DDAA","DDAB","C781","DDB2","BBF1","DDB5","D3A8","DDBA","C782","DDBB","C3A7","C783","C784","DDD2","DDBC","C785","C786","C787","DDD1","C788","B9BD","C789","C78A","BED5","C78B","BEFA","C78C","C78D","BACA","C78E","C78F","C790","C791","DDCA","C792","DDC5","C793","DDBF","C794","C795","C796","B2CB","DDC3","C797","DDCB","B2A4","DDD5","C798","C799","C79A","DDBE","C79B","C79C","C79D","C6D0","DDD0","C79E","C79F","C7A0","C840","C841","DDD4","C1E2","B7C6","C842","C843","C844","C845","C846","DDCE","DDCF","C847","C848","C849","DDC4","C84A","C84B","C84C","DDBD","C84D","DDCD","CCD1","C84E","DDC9","C84F","C850","C851","C852","DDC2","C3C8","C6BC","CEAE","DDCC","C853","DDC8","C854","C855","C856","C857","C858","C859","DDC1","C85A","C85B","C85C","DDC6","C2DC","C85D","C85E","C85F","C860","C861","C862","D3A9","D3AA","DDD3","CFF4","C8F8","C863","C864","C865","C866","C867","C868","C869","C86A","DDE6","C86B","C86C","C86D","C86E","C86F","C870","DDC7","C871","C872","C873","DDE0","C2E4","C874","C875","C876","C877","C878","C879","C87A","C87B","DDE1","C87C","C87D","C87E","C880","C881","C882","C883","C884","C885","C886","DDD7","C887","C888","C889","C88A","C88B","D6F8","C88C","DDD9","DDD8","B8F0","DDD6","C88D","C88E","C88F","C890","C6CF","C891","B6AD","C892","C893","C894","C895","C896","DDE2","C897","BAF9","D4E1","DDE7","C898","C899","C89A","B4D0","C89B","DDDA","C89C","BFFB","DDE3","C89D","DDDF","C89E","DDDD","C89F","C8A0","C940","C941","C942","C943","C944","B5D9","C945","C946","C947","C948","DDDB","DDDC","DDDE","C949","BDAF","DDE4","C94A","DDE5","C94B","C94C","C94D","C94E","C94F","C950","C951","C952","DDF5","C953","C3C9","C954","C955","CBE2","C956","C957","C958","C959","DDF2","C95A","C95B","C95C","C95D","C95E","C95F","C960","C961","C962","C963","C964","C965","C966","D8E1","C967","C968","C6D1","C969","DDF4","C96A","C96B","C96C","D5F4","DDF3","DDF0","C96D","C96E","DDEC","C96F","DDEF","C970","DDE8","C971","C972","D0EE","C973","C974","C975","C976","C8D8","DDEE","C977","C978","DDE9","C979","C97A","DDEA","CBF2","C97B","DDED","C97C","C97D","B1CD","C97E","C980","C981","C982","C983","C984","C0B6","C985","BCBB","DDF1","C986","C987","DDF7","C988","DDF6","DDEB","C989","C98A","C98B","C98C","C98D","C5EE","C98E","C98F","C990","DDFB","C991","C992","C993","C994","C995","C996","C997","C998","C999","C99A","C99B","DEA4","C99C","C99D","DEA3","C99E","C99F","C9A0","CA40","CA41","CA42","CA43","CA44","CA45","CA46","CA47","CA48","DDF8","CA49","CA4A","CA4B","CA4C","C3EF","CA4D","C2FB","CA4E","CA4F","CA50","D5E1","CA51","CA52","CEB5","CA53","CA54","CA55","CA56","DDFD","CA57","B2CC","CA58","CA59","CA5A","CA5B","CA5C","CA5D","CA5E","CA5F","CA60","C4E8","CADF","CA61","CA62","CA63","CA64","CA65","CA66","CA67","CA68","CA69","CA6A","C7BE","DDFA","DDFC","DDFE","DEA2","B0AA","B1CE","CA6B","CA6C","CA6D","CA6E","CA6F","DEAC","CA70","CA71","CA72","CA73","DEA6","BDB6","C8EF","CA74","CA75","CA76","CA77","CA78","CA79","CA7A","CA7B","CA7C","CA7D","CA7E","DEA1","CA80","CA81","DEA5","CA82","CA83","CA84","CA85","DEA9","CA86","CA87","CA88","CA89","CA8A","DEA8","CA8B","CA8C","CA8D","DEA7","CA8E","CA8F","CA90","CA91","CA92","CA93","CA94","CA95","CA96","DEAD","CA97","D4CC","CA98","CA99","CA9A","CA9B","DEB3","DEAA","DEAE","CA9C","CA9D","C0D9","CA9E","CA9F","CAA0","CB40","CB41","B1A1","DEB6","CB42","DEB1","CB43","CB44","CB45","CB46","CB47","CB48","CB49","DEB2","CB4A","CB4B","CB4C","CB4D","CB4E","CB4F","CB50","CB51","CB52","CB53","CB54","D1A6","DEB5","CB55","CB56","CB57","CB58","CB59","CB5A","CB5B","DEAF","CB5C","CB5D","CB5E","DEB0","CB5F","D0BD","CB60","CB61","CB62","DEB4","CAED","DEB9","CB63","CB64","CB65","CB66","CB67","CB68","DEB8","CB69","DEB7","CB6A","CB6B","CB6C","CB6D","CB6E","CB6F","CB70","DEBB","CB71","CB72","CB73","CB74","CB75","CB76","CB77","BDE5","CB78","CB79","CB7A","CB7B","CB7C","B2D8","C3EA","CB7D","CB7E","DEBA","CB80","C5BA","CB81","CB82","CB83","CB84","CB85","CB86","DEBC","CB87","CB88","CB89","CB8A","CB8B","CB8C","CB8D","CCD9","CB8E","CB8F","CB90","CB91","B7AA","CB92","CB93","CB94","CB95","CB96","CB97","CB98","CB99","CB9A","CB9B","CB9C","CB9D","CB9E","CB9F","CBA0","CC40","CC41","D4E5","CC42","CC43","CC44","DEBD","CC45","CC46","CC47","CC48","CC49","DEBF","CC4A","CC4B","CC4C","CC4D","CC4E","CC4F","CC50","CC51","CC52","CC53","CC54","C4A2","CC55","CC56","CC57","CC58","DEC1","CC59","CC5A","CC5B","CC5C","CC5D","CC5E","CC5F","CC60","CC61","CC62","CC63","CC64","CC65","CC66","CC67","CC68","DEBE","CC69","DEC0","CC6A","CC6B","CC6C","CC6D","CC6E","CC6F","CC70","CC71","CC72","CC73","CC74","CC75","CC76","CC77","D5BA","CC78","CC79","CC7A","DEC2","CC7B","CC7C","CC7D","CC7E","CC80","CC81","CC82","CC83","CC84","CC85","CC86","CC87","CC88","CC89","CC8A","CC8B","F2AE","BBA2","C2B2","C5B0","C2C7","CC8C","CC8D","F2AF","CC8E","CC8F","CC90","CC91","CC92","D0E9","CC93","CC94","CC95","D3DD","CC96","CC97","CC98","EBBD","CC99","CC9A","CC9B","CC9C","CC9D","CC9E","CC9F","CCA0","B3E6","F2B0","CD40","F2B1","CD41","CD42","CAAD","CD43","CD44","CD45","CD46","CD47","CD48","CD49","BAE7","F2B3","F2B5","F2B4","CBE4","CFBA","F2B2","CAB4","D2CF","C2EC","CD4A","CD4B","CD4C","CD4D","CD4E","CD4F","CD50","CEC3","F2B8","B0F6","F2B7","CD51","CD52","CD53","CD54","CD55","F2BE","CD56","B2CF","CD57","CD58","CD59","CD5A","CD5B","CD5C","D1C1","F2BA","CD5D","CD5E","CD5F","CD60","CD61","F2BC","D4E9","CD62","CD63","F2BB","F2B6","F2BF","F2BD","CD64","F2B9","CD65","CD66","F2C7","F2C4","F2C6","CD67","CD68","F2CA","F2C2","F2C0","CD69","CD6A","CD6B","F2C5","CD6C","CD6D","CD6E","CD6F","CD70","D6FB","CD71","CD72","CD73","F2C1","CD74","C7F9","C9DF","CD75","F2C8","B9C6","B5B0","CD76","CD77","F2C3","F2C9","F2D0","F2D6","CD78","CD79","BBD7","CD7A","CD7B","CD7C","F2D5","CDDC","CD7D","D6EB","CD7E","CD80","F2D2","F2D4","CD81","CD82","CD83","CD84","B8F2","CD85","CD86","CD87","CD88","F2CB","CD89","CD8A","CD8B","F2CE","C2F9","CD8C","D5DD","F2CC","F2CD","F2CF","F2D3","CD8D","CD8E","CD8F","F2D9","D3BC","CD90","CD91","CD92","CD93","B6EA","CD94","CAF1","CD95","B7E4","F2D7","CD96","CD97","CD98","F2D8","F2DA","F2DD","F2DB","CD99","CD9A","F2DC","CD9B","CD9C","CD9D","CD9E","D1D1","F2D1","CD9F","CDC9","CDA0","CECF","D6A9","CE40","F2E3","CE41","C3DB","CE42","F2E0","CE43","CE44","C0AF","F2EC","F2DE","CE45","F2E1","CE46","CE47","CE48","F2E8","CE49","CE4A","CE4B","CE4C","F2E2","CE4D","CE4E","F2E7","CE4F","CE50","F2E6","CE51","CE52","F2E9","CE53","CE54","CE55","F2DF","CE56","CE57","F2E4","F2EA","CE58","CE59","CE5A","CE5B","CE5C","CE5D","CE5E","D3AC","F2E5","B2F5","CE5F","CE60","F2F2","CE61","D0AB","CE62","CE63","CE64","CE65","F2F5","CE66","CE67","CE68","BBC8","CE69","F2F9","CE6A","CE6B","CE6C","CE6D","CE6E","CE6F","F2F0","CE70","CE71","F2F6","F2F8","F2FA","CE72","CE73","CE74","CE75","CE76","CE77","CE78","CE79","F2F3","CE7A","F2F1","CE7B","CE7C","CE7D","BAFB","CE7E","B5FB","CE80","CE81","CE82","CE83","F2EF","F2F7","F2ED","F2EE","CE84","CE85","CE86","F2EB","F3A6","CE87","F3A3","CE88","CE89","F3A2","CE8A","CE8B","F2F4","CE8C","C8DA","CE8D","CE8E","CE8F","CE90","CE91","F2FB","CE92","CE93","CE94","F3A5","CE95","CE96","CE97","CE98","CE99","CE9A","CE9B","C3F8","CE9C","CE9D","CE9E","CE9F","CEA0","CF40","CF41","CF42","F2FD","CF43","CF44","F3A7","F3A9","F3A4","CF45","F2FC","CF46","CF47","CF48","F3AB","CF49","F3AA","CF4A","CF4B","CF4C","CF4D","C2DD","CF4E","CF4F","F3AE","CF50","CF51","F3B0","CF52","CF53","CF54","CF55","CF56","F3A1","CF57","CF58","CF59","F3B1","F3AC","CF5A","CF5B","CF5C","CF5D","CF5E","F3AF","F2FE","F3AD","CF5F","CF60","CF61","CF62","CF63","CF64","CF65","F3B2","CF66","CF67","CF68","CF69","F3B4","CF6A","CF6B","CF6C","CF6D","F3A8","CF6E","CF6F","CF70","CF71","F3B3","CF72","CF73","CF74","F3B5","CF75","CF76","CF77","CF78","CF79","CF7A","CF7B","CF7C","CF7D","CF7E","D0B7","CF80","CF81","CF82","CF83","F3B8","CF84","CF85","CF86","CF87","D9F9","CF88","CF89","CF8A","CF8B","CF8C","CF8D","F3B9","CF8E","CF8F","CF90","CF91","CF92","CF93","CF94","CF95","F3B7","CF96","C8E4","F3B6","CF97","CF98","CF99","CF9A","F3BA","CF9B","CF9C","CF9D","CF9E","CF9F","F3BB","B4C0","CFA0","D040","D041","D042","D043","D044","D045","D046","D047","D048","D049","D04A","D04B","D04C","D04D","EEC3","D04E","D04F","D050","D051","D052","D053","F3BC","D054","D055","F3BD","D056","D057","D058","D1AA","D059","D05A","D05B","F4AC","D0C6","D05C","D05D","D05E","D05F","D060","D061","D0D0","D1DC","D062","D063","D064","D065","D066","D067","CFCE","D068","D069","BDD6","D06A","D1C3","D06B","D06C","D06D","D06E","D06F","D070","D071","BAE2","E1E9","D2C2","F1C2","B2B9","D072","D073","B1ED","F1C3","D074","C9C0","B3C4","D075","D9F2","D076","CBA5","D077","F1C4","D078","D079","D07A","D07B","D6D4","D07C","D07D","D07E","D080","D081","F1C5","F4C0","F1C6","D082","D4AC","F1C7","D083","B0C0","F4C1","D084","D085","F4C2","D086","D087","B4FC","D088","C5DB","D089","D08A","D08B","D08C","CCBB","D08D","D08E","D08F","D0E4","D090","D091","D092","D093","D094","CDE0","D095","D096","D097","D098","D099","F1C8","D09A","D9F3","D09B","D09C","D09D","D09E","D09F","D0A0","B1BB","D140","CFAE","D141","D142","D143","B8A4","D144","D145","D146","D147","D148","F1CA","D149","D14A","D14B","D14C","F1CB","D14D","D14E","D14F","D150","B2C3","C1D1","D151","D152","D7B0","F1C9","D153","D154","F1CC","D155","D156","D157","D158","F1CE","D159","D15A","D15B","D9F6","D15C","D2E1","D4A3","D15D","D15E","F4C3","C8B9","D15F","D160","D161","D162","D163","F4C4","D164","D165","F1CD","F1CF","BFE3","F1D0","D166","D167","F1D4","D168","D169","D16A","D16B","D16C","D16D","D16E","F1D6","F1D1","D16F","C9D1","C5E1","D170","D171","D172","C2E3","B9FC","D173","D174","F1D3","D175","F1D5","D176","D177","D178","B9D3","D179","D17A","D17B","D17C","D17D","D17E","D180","F1DB","D181","D182","D183","D184","D185","BAD6","D186","B0FD","F1D9","D187","D188","D189","D18A","D18B","F1D8","F1D2","F1DA","D18C","D18D","D18E","D18F","D190","F1D7","D191","D192","D193","C8EC","D194","D195","D196","D197","CDCA","F1DD","D198","D199","D19A","D19B","E5BD","D19C","D19D","D19E","F1DC","D19F","F1DE","D1A0","D240","D241","D242","D243","D244","D245","D246","D247","D248","F1DF","D249","D24A","CFE5","D24B","D24C","D24D","D24E","D24F","D250","D251","D252","D253","D254","D255","D256","D257","D258","D259","D25A","D25B","D25C","D25D","D25E","D25F","D260","D261","D262","D263","F4C5","BDF3","D264","D265","D266","D267","D268","D269","F1E0","D26A","D26B","D26C","D26D","D26E","D26F","D270","D271","D272","D273","D274","D275","D276","D277","D278","D279","D27A","D27B","D27C","D27D","F1E1","D27E","D280","D281","CEF7","D282","D2AA","D283","F1FB","D284","D285","B8B2","D286","D287","D288","D289","D28A","D28B","D28C","D28D","D28E","D28F","D290","D291","D292","D293","D294","D295","D296","D297","D298","D299","D29A","D29B","D29C","D29D","D29E","D29F","D2A0","D340","D341","D342","D343","D344","D345","D346","D347","D348","D349","D34A","D34B","D34C","D34D","D34E","D34F","D350","D351","D352","D353","D354","D355","D356","D357","D358","D359","D35A","D35B","D35C","D35D","D35E","BCFB","B9DB","D35F","B9E6","C3D9","CAD3","EAE8","C0C0","BEF5","EAE9","EAEA","EAEB","D360","EAEC","EAED","EAEE","EAEF","BDC7","D361","D362","D363","F5FB","D364","D365","D366","F5FD","D367","F5FE","D368","F5FC","D369","D36A","D36B","D36C","BDE2","D36D","F6A1","B4A5","D36E","D36F","D370","D371","F6A2","D372","D373","D374","F6A3","D375","D376","D377","ECB2","D378","D379","D37A","D37B","D37C","D37D","D37E","D380","D381","D382","D383","D384","D1D4","D385","D386","D387","D388","D389","D38A","D9EA","D38B","D38C","D38D","D38E","D38F","D390","D391","D392","D393","D394","D395","D396","D397","D398","D399","D39A","D39B","D39C","D39D","D39E","D39F","D3A0","D440","D441","D442","D443","D444","D445","D446","D447","D448","D449","D44A","D44B","D44C","D44D","D44E","D44F","D450","D451","D452","D453","D454","D455","D456","D457","D458","D459","D45A","D45B","D45C","D45D","D45E","D45F","F6A4","D460","D461","D462","D463","D464","D465","D466","D467","D468","EEBA","D469","D46A","D46B","D46C","D46D","D46E","D46F","D470","D471","D472","D473","D474","D475","D476","D477","D478","D479","D47A","D47B","D47C","D47D","D47E","D480","D481","D482","D483","D484","D485","D486","D487","D488","D489","D48A","D48B","D48C","D48D","D48E","D48F","D490","D491","D492","D493","D494","D495","D496","D497","D498","D499","D5B2","D49A","D49B","D49C","D49D","D49E","D49F","D4A0","D540","D541","D542","D543","D544","D545","D546","D547","D3FE","CCDC","D548","D549","D54A","D54B","D54C","D54D","D54E","D54F","CAC4","D550","D551","D552","D553","D554","D555","D556","D557","D558","D559","D55A","D55B","D55C","D55D","D55E","D55F","D560","D561","D562","D563","D564","D565","D566","D567","D568","D569","D56A","D56B","D56C","D56D","D56E","D56F","D570","D571","D572","D573","D574","D575","D576","D577","D578","D579","D57A","D57B","D57C","D57D","D57E","D580","D581","D582","D583","D584","D585","D586","D587","D588","D589","D58A","D58B","D58C","D58D","D58E","D58F","D590","D591","D592","D593","D594","D595","D596","D597","D598","D599","D59A","D59B","D59C","D59D","D59E","D59F","D5A0","D640","D641","D642","D643","D644","D645","D646","D647","D648","D649","D64A","D64B","D64C","D64D","D64E","D64F","D650","D651","D652","D653","D654","D655","D656","D657","D658","D659","D65A","D65B","D65C","D65D","D65E","D65F","D660","D661","D662","E5C0","D663","D664","D665","D666","D667","D668","D669","D66A","D66B","D66C","D66D","D66E","D66F","D670","D671","D672","D673","D674","D675","D676","D677","D678","D679","D67A","D67B","D67C","D67D","D67E","D680","D681","F6A5","D682","D683","D684","D685","D686","D687","D688","D689","D68A","D68B","D68C","D68D","D68E","D68F","D690","D691","D692","D693","D694","D695","D696","D697","D698","D699","D69A","D69B","D69C","D69D","D69E","D69F","D6A0","D740","D741","D742","D743","D744","D745","D746","D747","D748","D749","D74A","D74B","D74C","D74D","D74E","D74F","D750","D751","D752","D753","D754","D755","D756","D757","D758","D759","D75A","D75B","D75C","D75D","D75E","D75F","BEAF","D760","D761","D762","D763","D764","C6A9","D765","D766","D767","D768","D769","D76A","D76B","D76C","D76D","D76E","D76F","D770","D771","D772","D773","D774","D775","D776","D777","D778","D779","D77A","D77B","D77C","D77D","D77E","D780","D781","D782","D783","D784","D785","D786","D787","D788","D789","D78A","D78B","D78C","D78D","D78E","D78F","D790","D791","D792","D793","D794","D795","D796","D797","D798","DAA5","BCC6","B6A9","B8BC","C8CF","BCA5","DAA6","DAA7","CCD6","C8C3","DAA8","C6FD","D799","D1B5","D2E9","D1B6","BCC7","D79A","BDB2","BBE4","DAA9","DAAA","D1C8","DAAB","D0ED","B6EF","C2DB","D79B","CBCF","B7ED","C9E8","B7C3","BEF7","D6A4","DAAC","DAAD","C6C0","D7E7","CAB6","D79C","D5A9","CBDF","D5EF","DAAE","D6DF","B4CA","DAB0","DAAF","D79D","D2EB","DAB1","DAB2","DAB3","CAD4","DAB4","CAAB","DAB5","DAB6","B3CF","D6EF","DAB7","BBB0","B5AE","DAB8","DAB9","B9EE","D1AF","D2E8","DABA","B8C3","CFEA","B2EF","DABB","DABC","D79E","BDEB","CEDC","D3EF","DABD","CEF3","DABE","D3D5","BBE5","DABF","CBB5","CBD0","DAC0","C7EB","D6EE","DAC1","C5B5","B6C1","DAC2","B7CC","BFCE","DAC3","DAC4","CBAD","DAC5","B5F7","DAC6","C1C2","D7BB","DAC7","CCB8","D79F","D2EA","C4B1","DAC8","B5FD","BBD1","DAC9","D0B3","DACA","DACB","CEBD","DACC","DACD","DACE","B2F7","DAD1","DACF","D1E8","DAD0","C3D5","DAD2","D7A0","DAD3","DAD4","DAD5","D0BB","D2A5","B0F9","DAD6","C7AB","DAD7","BDF7","C3A1","DAD8","DAD9","C3FD","CCB7","DADA","DADB","C0BE","C6D7","DADC","DADD","C7B4","DADE","DADF","B9C8","D840","D841","D842","D843","D844","D845","D846","D847","D848","BBED","D849","D84A","D84B","D84C","B6B9","F4F8","D84D","F4F9","D84E","D84F","CDE3","D850","D851","D852","D853","D854","D855","D856","D857","F5B9","D858","D859","D85A","D85B","EBE0","D85C","D85D","D85E","D85F","D860","D861","CFF3","BBBF","D862","D863","D864","D865","D866","D867","D868","BAC0","D4A5","D869","D86A","D86B","D86C","D86D","D86E","D86F","E1D9","D870","D871","D872","D873","F5F4","B1AA","B2F2","D874","D875","D876","D877","D878","D879","D87A","F5F5","D87B","D87C","F5F7","D87D","D87E","D880","BAD1","F5F6","D881","C3B2","D882","D883","D884","D885","D886","D887","D888","F5F9","D889","D88A","D88B","F5F8","D88C","D88D","D88E","D88F","D890","D891","D892","D893","D894","D895","D896","D897","D898","D899","D89A","D89B","D89C","D89D","D89E","D89F","D8A0","D940","D941","D942","D943","D944","D945","D946","D947","D948","D949","D94A","D94B","D94C","D94D","D94E","D94F","D950","D951","D952","D953","D954","D955","D956","D957","D958","D959","D95A","D95B","D95C","D95D","D95E","D95F","D960","D961","D962","D963","D964","D965","D966","D967","D968","D969","D96A","D96B","D96C","D96D","D96E","D96F","D970","D971","D972","D973","D974","D975","D976","D977","D978","D979","D97A","D97B","D97C","D97D","D97E","D980","D981","D982","D983","D984","D985","D986","D987","D988","D989","D98A","D98B","D98C","D98D","D98E","D98F","D990","D991","D992","D993","D994","D995","D996","D997","D998","D999","D99A","D99B","D99C","D99D","D99E","D99F","D9A0","DA40","DA41","DA42","DA43","DA44","DA45","DA46","DA47","DA48","DA49","DA4A","DA4B","DA4C","DA4D","DA4E","B1B4","D5EA","B8BA","DA4F","B9B1","B2C6","D4F0","CFCD","B0DC","D5CB","BBF5","D6CA","B7B7","CCB0","C6B6","B1E1","B9BA","D6FC","B9E1","B7A1","BCFA","EADA","EADB","CCF9","B9F3","EADC","B4FB","C3B3","B7D1","BAD8","EADD","D4F4","EADE","BCD6","BBDF","EADF","C1DE","C2B8","D4DF","D7CA","EAE0","EAE1","EAE4","EAE2","EAE3","C9DE","B8B3","B6C4","EAE5","CAEA","C9CD","B4CD","DA50","DA51","E2D9","C5E2","EAE6","C0B5","DA52","D7B8","EAE7","D7AC","C8FC","D8D3","D8CD","D4DE","DA53","D4F9","C9C4","D3AE","B8D3","B3E0","DA54","C9E2","F4F6","DA55","DA56","DA57","BAD5","DA58","F4F7","DA59","DA5A","D7DF","DA5B","DA5C","F4F1","B8B0","D5D4","B8CF","C6F0","DA5D","DA5E","DA5F","DA60","DA61","DA62","DA63","DA64","DA65","B3C3","DA66","DA67","F4F2","B3AC","DA68","DA69","DA6A","DA6B","D4BD","C7F7","DA6C","DA6D","DA6E","DA6F","DA70","F4F4","DA71","DA72","F4F3","DA73","DA74","DA75","DA76","DA77","DA78","DA79","DA7A","DA7B","DA7C","CCCB","DA7D","DA7E","DA80","C8A4","DA81","DA82","DA83","DA84","DA85","DA86","DA87","DA88","DA89","DA8A","DA8B","DA8C","DA8D","F4F5","DA8E","D7E3","C5BF","F5C0","DA8F","DA90","F5BB","DA91","F5C3","DA92","F5C2","DA93","D6BA","F5C1","DA94","DA95","DA96","D4BE","F5C4","DA97","F5CC","DA98","DA99","DA9A","DA9B","B0CF","B5F8","DA9C","F5C9","F5CA","DA9D","C5DC","DA9E","DA9F","DAA0","DB40","F5C5","F5C6","DB41","DB42","F5C7","F5CB","DB43","BEE0","F5C8","B8FA","DB44","DB45","DB46","F5D0","F5D3","DB47","DB48","DB49","BFE7","DB4A","B9F2","F5BC","F5CD","DB4B","DB4C","C2B7","DB4D","DB4E","DB4F","CCF8","DB50","BCF9","DB51","F5CE","F5CF","F5D1","B6E5","F5D2","DB52","F5D5","DB53","DB54","DB55","DB56","DB57","DB58","DB59","F5BD","DB5A","DB5B","DB5C","F5D4","D3BB","DB5D","B3EC","DB5E","DB5F","CCA4","DB60","DB61","DB62","DB63","F5D6","DB64","DB65","DB66","DB67","DB68","DB69","DB6A","DB6B","F5D7","BEE1","F5D8","DB6C","DB6D","CCDF","F5DB","DB6E","DB6F","DB70","DB71","DB72","B2C8","D7D9","DB73","F5D9","DB74","F5DA","F5DC","DB75","F5E2","DB76","DB77","DB78","F5E0","DB79","DB7A","DB7B","F5DF","F5DD","DB7C","DB7D","F5E1","DB7E","DB80","F5DE","F5E4","F5E5","DB81","CCE3","DB82","DB83","E5BF","B5B8","F5E3","F5E8","CCA3","DB84","DB85","DB86","DB87","DB88","F5E6","F5E7","DB89","DB8A","DB8B","DB8C","DB8D","DB8E","F5BE","DB8F","DB90","DB91","DB92","DB93","DB94","DB95","DB96","DB97","DB98","DB99","DB9A","B1C4","DB9B","DB9C","F5BF","DB9D","DB9E","B5C5","B2E4","DB9F","F5EC","F5E9","DBA0","B6D7","DC40","F5ED","DC41","F5EA","DC42","DC43","DC44","DC45","DC46","F5EB","DC47","DC48","B4DA","DC49","D4EA","DC4A","DC4B","DC4C","F5EE","DC4D","B3F9","DC4E","DC4F","DC50","DC51","DC52","DC53","DC54","F5EF","F5F1","DC55","DC56","DC57","F5F0","DC58","DC59","DC5A","DC5B","DC5C","DC5D","DC5E","F5F2","DC5F","F5F3","DC60","DC61","DC62","DC63","DC64","DC65","DC66","DC67","DC68","DC69","DC6A","DC6B","C9ED","B9AA","DC6C","DC6D","C7FB","DC6E","DC6F","B6E3","DC70","DC71","DC72","DC73","DC74","DC75","DC76","CCC9","DC77","DC78","DC79","DC7A","DC7B","DC7C","DC7D","DC7E","DC80","DC81","DC82","DC83","DC84","DC85","DC86","DC87","DC88","DC89","DC8A","EAA6","DC8B","DC8C","DC8D","DC8E","DC8F","DC90","DC91","DC92","DC93","DC94","DC95","DC96","DC97","DC98","DC99","DC9A","DC9B","DC9C","DC9D","DC9E","DC9F","DCA0","DD40","DD41","DD42","DD43","DD44","DD45","DD46","DD47","DD48","DD49","DD4A","DD4B","DD4C","DD4D","DD4E","DD4F","DD50","DD51","DD52","DD53","DD54","DD55","DD56","DD57","DD58","DD59","DD5A","DD5B","DD5C","DD5D","DD5E","DD5F","DD60","DD61","DD62","DD63","DD64","DD65","DD66","DD67","DD68","DD69","DD6A","DD6B","DD6C","DD6D","DD6E","DD6F","DD70","DD71","DD72","DD73","DD74","DD75","DD76","DD77","DD78","DD79","DD7A","DD7B","DD7C","DD7D","DD7E","DD80","DD81","DD82","DD83","DD84","DD85","DD86","DD87","DD88","DD89","DD8A","DD8B","DD8C","DD8D","DD8E","DD8F","DD90","DD91","DD92","DD93","DD94","DD95","DD96","DD97","DD98","DD99","DD9A","DD9B","DD9C","DD9D","DD9E","DD9F","DDA0","DE40","DE41","DE42","DE43","DE44","DE45","DE46","DE47","DE48","DE49","DE4A","DE4B","DE4C","DE4D","DE4E","DE4F","DE50","DE51","DE52","DE53","DE54","DE55","DE56","DE57","DE58","DE59","DE5A","DE5B","DE5C","DE5D","DE5E","DE5F","DE60","B3B5","D4FE","B9EC","D0F9","DE61","E9ED","D7AA","E9EE","C2D6","C8ED","BAE4","E9EF","E9F0","E9F1","D6E1","E9F2","E9F3","E9F5","E9F4","E9F6","E9F7","C7E1","E9F8","D4D8","E9F9","BDCE","DE62","E9FA","E9FB","BDCF","E9FC","B8A8","C1BE","E9FD","B1B2","BBD4","B9F5","E9FE","DE63","EAA1","EAA2","EAA3","B7F8","BCAD","DE64","CAE4","E0CE","D4AF","CFBD","D5B7","EAA4","D5DE","EAA5","D0C1","B9BC","DE65","B4C7","B1D9","DE66","DE67","DE68","C0B1","DE69","DE6A","DE6B","DE6C","B1E6","B1E7","DE6D","B1E8","DE6E","DE6F","DE70","DE71","B3BD","C8E8","DE72","DE73","DE74","DE75","E5C1","DE76","DE77","B1DF","DE78","DE79","DE7A","C1C9","B4EF","DE7B","DE7C","C7A8","D3D8","DE7D","C6F9","D1B8","DE7E","B9FD","C2F5","DE80","DE81","DE82","DE83","DE84","D3AD","DE85","D4CB","BDFC","DE86","E5C2","B7B5","E5C3","DE87","DE88","BBB9","D5E2","DE89","BDF8","D4B6","CEA5","C1AC","B3D9","DE8A","DE8B","CCF6","DE8C","E5C6","E5C4","E5C8","DE8D","E5CA","E5C7","B5CF","C6C8","DE8E","B5FC","E5C5","DE8F","CAF6","DE90","DE91","E5C9","DE92","DE93","DE94","C3D4","B1C5","BCA3","DE95","DE96","DE97","D7B7","DE98","DE99","CDCB","CBCD","CACA","CCD3","E5CC","E5CB","C4E6","DE9A","DE9B","D1A1","D1B7","E5CD","DE9C","E5D0","DE9D","CDB8","D6F0","E5CF","B5DD","DE9E","CDBE","DE9F","E5D1","B6BA","DEA0","DF40","CDA8","B9E4","DF41","CAC5","B3D1","CBD9","D4EC","E5D2","B7EA","DF42","DF43","DF44","E5CE","DF45","DF46","DF47","DF48","DF49","DF4A","E5D5","B4FE","E5D6","DF4B","DF4C","DF4D","DF4E","DF4F","E5D3","E5D4","DF50","D2DD","DF51","DF52","C2DF","B1C6","DF53","D3E2","DF54","DF55","B6DD","CBEC","DF56","E5D7","DF57","DF58","D3F6","DF59","DF5A","DF5B","DF5C","DF5D","B1E9","DF5E","B6F4","E5DA","E5D8","E5D9","B5C0","DF5F","DF60","DF61","D2C5","E5DC","DF62","DF63","E5DE","DF64","DF65","DF66","DF67","DF68","DF69","E5DD","C7B2","DF6A","D2A3","DF6B","DF6C","E5DB","DF6D","DF6E","DF6F","DF70","D4E2","D5DA","DF71","DF72","DF73","DF74","DF75","E5E0","D7F1","DF76","DF77","DF78","DF79","DF7A","DF7B","DF7C","E5E1","DF7D","B1DC","D1FB","DF7E","E5E2","E5E4","DF80","DF81","DF82","DF83","E5E3","DF84","DF85","E5E5","DF86","DF87","DF88","DF89","DF8A","D2D8","DF8B","B5CB","DF8C","E7DF","DF8D","DAF5","DF8E","DAF8","DF8F","DAF6","DF90","DAF7","DF91","DF92","DF93","DAFA","D0CF","C4C7","DF94","DF95","B0EE","DF96","DF97","DF98","D0B0","DF99","DAF9","DF9A","D3CA","BAAA","DBA2","C7F1","DF9B","DAFC","DAFB","C9DB","DAFD","DF9C","DBA1","D7DE","DAFE","C1DA","DF9D","DF9E","DBA5","DF9F","DFA0","D3F4","E040","E041","DBA7","DBA4","E042","DBA8","E043","E044","BDBC","E045","E046","E047","C0C9","DBA3","DBA6","D6A3","E048","DBA9","E049","E04A","E04B","DBAD","E04C","E04D","E04E","DBAE","DBAC","BAC2","E04F","E050","E051","BFA4","DBAB","E052","E053","E054","DBAA","D4C7","B2BF","E055","E056","DBAF","E057","B9F9","E058","DBB0","E059","E05A","E05B","E05C","B3BB","E05D","E05E","E05F","B5A6","E060","E061","E062","E063","B6BC","DBB1","E064","E065","E066","B6F5","E067","DBB2","E068","E069","E06A","E06B","E06C","E06D","E06E","E06F","E070","E071","E072","E073","E074","E075","E076","E077","E078","E079","E07A","E07B","B1C9","E07C","E07D","E07E","E080","DBB4","E081","E082","E083","DBB3","DBB5","E084","E085","E086","E087","E088","E089","E08A","E08B","E08C","E08D","E08E","DBB7","E08F","DBB6","E090","E091","E092","E093","E094","E095","E096","DBB8","E097","E098","E099","E09A","E09B","E09C","E09D","E09E","E09F","DBB9","E0A0","E140","DBBA","E141","E142","D3CF","F4FA","C7F5","D7C3","C5E4","F4FC","F4FD","F4FB","E143","BEC6","E144","E145","E146","E147","D0EF","E148","E149","B7D3","E14A","E14B","D4CD","CCAA","E14C","E14D","F5A2","F5A1","BAA8","F4FE","CBD6","E14E","E14F","E150","F5A4","C0D2","E151","B3EA","E152","CDAA","F5A5","F5A3","BDB4","F5A8","E153","F5A9","BDCD","C3B8","BFE1","CBE1","F5AA","E154","E155","E156","F5A6","F5A7","C4F0","E157","E158","E159","E15A","E15B","F5AC","E15C","B4BC","E15D","D7ED","E15E","B4D7","F5AB","F5AE","E15F","E160","F5AD","F5AF","D0D1","E161","E162","E163","E164","E165","E166","E167","C3D1","C8A9","E168","E169","E16A","E16B","E16C","E16D","F5B0","F5B1","E16E","E16F","E170","E171","E172","E173","F5B2","E174","E175","F5B3","F5B4","F5B5","E176","E177","E178","E179","F5B7","F5B6","E17A","E17B","E17C","E17D","F5B8","E17E","E180","E181","E182","E183","E184","E185","E186","E187","E188","E189","E18A","B2C9","E18B","D3D4","CACD","E18C","C0EF","D6D8","D2B0","C1BF","E18D","BDF0","E18E","E18F","E190","E191","E192","E193","E194","E195","E196","E197","B8AA","E198","E199","E19A","E19B","E19C","E19D","E19E","E19F","E1A0","E240","E241","E242","E243","E244","E245","E246","E247","E248","E249","E24A","E24B","E24C","E24D","E24E","E24F","E250","E251","E252","E253","E254","E255","E256","E257","E258","E259","E25A","E25B","E25C","E25D","E25E","E25F","E260","E261","E262","E263","E264","E265","E266","E267","E268","E269","E26A","E26B","E26C","E26D","E26E","E26F","E270","E271","E272","E273","E274","E275","E276","E277","E278","E279","E27A","E27B","E27C","E27D","E27E","E280","E281","E282","E283","E284","E285","E286","E287","E288","E289","E28A","E28B","E28C","E28D","E28E","E28F","E290","E291","E292","E293","E294","E295","E296","E297","E298","E299","E29A","E29B","E29C","E29D","E29E","E29F","E2A0","E340","E341","E342","E343","E344","E345","E346","E347","E348","E349","E34A","E34B","E34C","E34D","E34E","E34F","E350","E351","E352","E353","E354","E355","E356","E357","E358","E359","E35A","E35B","E35C","E35D","E35E","E35F","E360","E361","E362","E363","E364","E365","E366","E367","E368","E369","E36A","E36B","E36C","E36D","BCF8","E36E","E36F","E370","E371","E372","E373","E374","E375","E376","E377","E378","E379","E37A","E37B","E37C","E37D","E37E","E380","E381","E382","E383","E384","E385","E386","E387","F6C6","E388","E389","E38A","E38B","E38C","E38D","E38E","E38F","E390","E391","E392","E393","E394","E395","E396","E397","E398","E399","E39A","E39B","E39C","E39D","E39E","E39F","E3A0","E440","E441","E442","E443","E444","E445","F6C7","E446","E447","E448","E449","E44A","E44B","E44C","E44D","E44E","E44F","E450","E451","E452","E453","E454","E455","E456","E457","E458","E459","E45A","E45B","E45C","E45D","E45E","F6C8","E45F","E460","E461","E462","E463","E464","E465","E466","E467","E468","E469","E46A","E46B","E46C","E46D","E46E","E46F","E470","E471","E472","E473","E474","E475","E476","E477","E478","E479","E47A","E47B","E47C","E47D","E47E","E480","E481","E482","E483","E484","E485","E486","E487","E488","E489","E48A","E48B","E48C","E48D","E48E","E48F","E490","E491","E492","E493","E494","E495","E496","E497","E498","E499","E49A","E49B","E49C","E49D","E49E","E49F","E4A0","E540","E541","E542","E543","E544","E545","E546","E547","E548","E549","E54A","E54B","E54C","E54D","E54E","E54F","E550","E551","E552","E553","E554","E555","E556","E557","E558","E559","E55A","E55B","E55C","E55D","E55E","E55F","E560","E561","E562","E563","E564","E565","E566","E567","E568","E569","E56A","E56B","E56C","E56D","E56E","E56F","E570","E571","E572","E573","F6C9","E574","E575","E576","E577","E578","E579","E57A","E57B","E57C","E57D","E57E","E580","E581","E582","E583","E584","E585","E586","E587","E588","E589","E58A","E58B","E58C","E58D","E58E","E58F","E590","E591","E592","E593","E594","E595","E596","E597","E598","E599","E59A","E59B","E59C","E59D","E59E","E59F","F6CA","E5A0","E640","E641","E642","E643","E644","E645","E646","E647","E648","E649","E64A","E64B","E64C","E64D","E64E","E64F","E650","E651","E652","E653","E654","E655","E656","E657","E658","E659","E65A","E65B","E65C","E65D","E65E","E65F","E660","E661","E662","F6CC","E663","E664","E665","E666","E667","E668","E669","E66A","E66B","E66C","E66D","E66E","E66F","E670","E671","E672","E673","E674","E675","E676","E677","E678","E679","E67A","E67B","E67C","E67D","E67E","E680","E681","E682","E683","E684","E685","E686","E687","E688","E689","E68A","E68B","E68C","E68D","E68E","E68F","E690","E691","E692","E693","E694","E695","E696","E697","E698","E699","E69A","E69B","E69C","E69D","F6CB","E69E","E69F","E6A0","E740","E741","E742","E743","E744","E745","E746","E747","F7E9","E748","E749","E74A","E74B","E74C","E74D","E74E","E74F","E750","E751","E752","E753","E754","E755","E756","E757","E758","E759","E75A","E75B","E75C","E75D","E75E","E75F","E760","E761","E762","E763","E764","E765","E766","E767","E768","E769","E76A","E76B","E76C","E76D","E76E","E76F","E770","E771","E772","E773","E774","E775","E776","E777","E778","E779","E77A","E77B","E77C","E77D","E77E","E780","E781","E782","E783","E784","E785","E786","E787","E788","E789","E78A","E78B","E78C","E78D","E78E","E78F","E790","E791","E792","E793","E794","E795","E796","E797","E798","E799","E79A","E79B","E79C","E79D","E79E","E79F","E7A0","E840","E841","E842","E843","E844","E845","E846","E847","E848","E849","E84A","E84B","E84C","E84D","E84E","F6CD","E84F","E850","E851","E852","E853","E854","E855","E856","E857","E858","E859","E85A","E85B","E85C","E85D","E85E","E85F","E860","E861","E862","E863","E864","E865","E866","E867","E868","E869","E86A","E86B","E86C","E86D","E86E","E86F","E870","E871","E872","E873","E874","E875","E876","E877","E878","E879","E87A","F6CE","E87B","E87C","E87D","E87E","E880","E881","E882","E883","E884","E885","E886","E887","E888","E889","E88A","E88B","E88C","E88D","E88E","E88F","E890","E891","E892","E893","E894","EEC4","EEC5","EEC6","D5EB","B6A4","EEC8","EEC7","EEC9","EECA","C7A5","EECB","EECC","E895","B7B0","B5F6","EECD","EECF","E896","EECE","E897","B8C6","EED0","EED1","EED2","B6DB","B3AE","D6D3","C4C6","B1B5","B8D6","EED3","EED4","D4BF","C7D5","BEFB","CED9","B9B3","EED6","EED5","EED8","EED7","C5A5","EED9","EEDA","C7AE","EEDB","C7AF","EEDC","B2A7","EEDD","EEDE","EEDF","EEE0","EEE1","D7EA","EEE2","EEE3","BCD8","EEE4","D3CB","CCFA","B2AC","C1E5","EEE5","C7A6","C3AD","E898","EEE6","EEE7","EEE8","EEE9","EEEA","EEEB","EEEC","E899","EEED","EEEE","EEEF","E89A","E89B","EEF0","EEF1","EEF2","EEF4","EEF3","E89C","EEF5","CDAD","C2C1","EEF6","EEF7","EEF8","D5A1","EEF9","CFB3","EEFA","EEFB","E89D","EEFC","EEFD","EFA1","EEFE","EFA2","B8F5","C3FA","EFA3","EFA4","BDC2","D2BF","B2F9","EFA5","EFA6","EFA7","D2F8","EFA8","D6FD","EFA9","C6CC","E89E","EFAA","EFAB","C1B4","EFAC","CFFA","CBF8","EFAE","EFAD","B3FA","B9F8","EFAF","EFB0","D0E2","EFB1","EFB2","B7E6","D0BF","EFB3","EFB4","EFB5","C8F1","CCE0","EFB6","EFB7","EFB8","EFB9","EFBA","D5E0","EFBB","B4ED","C3AA","EFBC","E89F","EFBD","EFBE","EFBF","E8A0","CEFD","EFC0","C2E0","B4B8","D7B6","BDF5","E940","CFC7","EFC3","EFC1","EFC2","EFC4","B6A7","BCFC","BEE2","C3CC","EFC5","EFC6","E941","EFC7","EFCF","EFC8","EFC9","EFCA","C7C2","EFF1","B6CD","EFCB","E942","EFCC","EFCD","B6C6","C3BE","EFCE","E943","EFD0","EFD1","EFD2","D5F2","E944","EFD3","C4F7","E945","EFD4","C4F8","EFD5","EFD6","B8E4","B0F7","EFD7","EFD8","EFD9","E946","EFDA","EFDB","EFDC","EFDD","E947","EFDE","BEB5","EFE1","EFDF","EFE0","E948","EFE2","EFE3","C1CD","EFE4","EFE5","EFE6","EFE7","EFE8","EFE9","EFEA","EFEB","EFEC","C0D8","E949","EFED","C1AD","EFEE","EFEF","EFF0","E94A","E94B","CFE2","E94C","E94D","E94E","E94F","E950","E951","E952","E953","B3A4","E954","E955","E956","E957","E958","E959","E95A","E95B","E95C","E95D","E95E","E95F","E960","E961","E962","E963","E964","E965","E966","E967","E968","E969","E96A","E96B","E96C","E96D","E96E","E96F","E970","E971","E972","E973","E974","E975","E976","E977","E978","E979","E97A","E97B","E97C","E97D","E97E","E980","E981","E982","E983","E984","E985","E986","E987","E988","E989","E98A","E98B","E98C","E98D","E98E","E98F","E990","E991","E992","E993","E994","E995","E996","E997","E998","E999","E99A","E99B","E99C","E99D","E99E","E99F","E9A0","EA40","EA41","EA42","EA43","EA44","EA45","EA46","EA47","EA48","EA49","EA4A","EA4B","EA4C","EA4D","EA4E","EA4F","EA50","EA51","EA52","EA53","EA54","EA55","EA56","EA57","EA58","EA59","EA5A","EA5B","C3C5","E3C5","C9C1","E3C6","EA5C","B1D5","CECA","B4B3","C8F2","E3C7","CFD0","E3C8","BCE4","E3C9","E3CA","C3C6","D5A2","C4D6","B9EB","CEC5","E3CB","C3F6","E3CC","EA5D","B7A7","B8F3","BAD2","E3CD","E3CE","D4C4","E3CF","EA5E","E3D0","D1CB","E3D1","E3D2","E3D3","E3D4","D1D6","E3D5","B2FB","C0BB","E3D6","EA5F","C0AB","E3D7","E3D8","E3D9","EA60","E3DA","E3DB","EA61","B8B7","DAE2","EA62","B6D3","EA63","DAE4","DAE3","EA64","EA65","EA66","EA67","EA68","EA69","EA6A","DAE6","EA6B","EA6C","EA6D","C8EE","EA6E","EA6F","DAE5","B7C0","D1F4","D2F5","D5F3","BDD7","EA70","EA71","EA72","EA73","D7E8","DAE8","DAE7","EA74","B0A2","CDD3","EA75","DAE9","EA76","B8BD","BCCA","C2BD","C2A4","B3C2","DAEA","EA77","C2AA","C4B0","BDB5","EA78","EA79","CFDE","EA7A","EA7B","EA7C","DAEB","C9C2","EA7D","EA7E","EA80","EA81","EA82","B1DD","EA83","EA84","EA85","DAEC","EA86","B6B8","D4BA","EA87","B3FD","EA88","EA89","DAED","D4C9","CFD5","C5E3","EA8A","DAEE","EA8B","EA8C","EA8D","EA8E","EA8F","DAEF","EA90","DAF0","C1EA","CCD5","CFDD","EA91","EA92","EA93","EA94","EA95","EA96","EA97","EA98","EA99","EA9A","EA9B","EA9C","EA9D","D3E7","C2A1","EA9E","DAF1","EA9F","EAA0","CBE5","EB40","DAF2","EB41","CBE6","D2FE","EB42","EB43","EB44","B8F4","EB45","EB46","DAF3","B0AF","CFB6","EB47","EB48","D5CF","EB49","EB4A","EB4B","EB4C","EB4D","EB4E","EB4F","EB50","EB51","EB52","CBED","EB53","EB54","EB55","EB56","EB57","EB58","EB59","EB5A","DAF4","EB5B","EB5C","E3C4","EB5D","EB5E","C1A5","EB5F","EB60","F6BF","EB61","EB62","F6C0","F6C1","C4D1","EB63","C8B8","D1E3","EB64","EB65","D0DB","D1C5","BCAF","B9CD","EB66","EFF4","EB67","EB68","B4C6","D3BA","F6C2","B3FB","EB69","EB6A","F6C3","EB6B","EB6C","B5F1","EB6D","EB6E","EB6F","EB70","EB71","EB72","EB73","EB74","EB75","EB76","F6C5","EB77","EB78","EB79","EB7A","EB7B","EB7C","EB7D","D3EA","F6A7","D1A9","EB7E","EB80","EB81","EB82","F6A9","EB83","EB84","EB85","F6A8","EB86","EB87","C1E3","C0D7","EB88","B1A2","EB89","EB8A","EB8B","EB8C","CEED","EB8D","D0E8","F6AB","EB8E","EB8F","CFF6","EB90","F6AA","D5F0","F6AC","C3B9","EB91","EB92","EB93","BBF4","F6AE","F6AD","EB94","EB95","EB96","C4DE","EB97","EB98","C1D8","EB99","EB9A","EB9B","EB9C","EB9D","CBAA","EB9E","CFBC","EB9F","EBA0","EC40","EC41","EC42","EC43","EC44","EC45","EC46","EC47","EC48","F6AF","EC49","EC4A","F6B0","EC4B","EC4C","F6B1","EC4D","C2B6","EC4E","EC4F","EC50","EC51","EC52","B0D4","C5F9","EC53","EC54","EC55","EC56","F6B2","EC57","EC58","EC59","EC5A","EC5B","EC5C","EC5D","EC5E","EC5F","EC60","EC61","EC62","EC63","EC64","EC65","EC66","EC67","EC68","EC69","C7E0","F6A6","EC6A","EC6B","BEB8","EC6C","EC6D","BEB2","EC6E","B5E5","EC6F","EC70","B7C7","EC71","BFBF","C3D2","C3E6","EC72","EC73","D8CC","EC74","EC75","EC76","B8EF","EC77","EC78","EC79","EC7A","EC7B","EC7C","EC7D","EC7E","EC80","BDF9","D1A5","EC81","B0D0","EC82","EC83","EC84","EC85","EC86","F7B0","EC87","EC88","EC89","EC8A","EC8B","EC8C","EC8D","EC8E","F7B1","EC8F","EC90","EC91","EC92","EC93","D0AC","EC94","B0B0","EC95","EC96","EC97","F7B2","F7B3","EC98","F7B4","EC99","EC9A","EC9B","C7CA","EC9C","EC9D","EC9E","EC9F","ECA0","ED40","ED41","BECF","ED42","ED43","F7B7","ED44","ED45","ED46","ED47","ED48","ED49","ED4A","F7B6","ED4B","B1DE","ED4C","F7B5","ED4D","ED4E","F7B8","ED4F","F7B9","ED50","ED51","ED52","ED53","ED54","ED55","ED56","ED57","ED58","ED59","ED5A","ED5B","ED5C","ED5D","ED5E","ED5F","ED60","ED61","ED62","ED63","ED64","ED65","ED66","ED67","ED68","ED69","ED6A","ED6B","ED6C","ED6D","ED6E","ED6F","ED70","ED71","ED72","ED73","ED74","ED75","ED76","ED77","ED78","ED79","ED7A","ED7B","ED7C","ED7D","ED7E","ED80","ED81","CEA4","C8CD","ED82","BAAB","E8B8","E8B9","E8BA","BEC2","ED83","ED84","ED85","ED86","ED87","D2F4","ED88","D4CF","C9D8","ED89","ED8A","ED8B","ED8C","ED8D","ED8E","ED8F","ED90","ED91","ED92","ED93","ED94","ED95","ED96","ED97","ED98","ED99","ED9A","ED9B","ED9C","ED9D","ED9E","ED9F","EDA0","EE40","EE41","EE42","EE43","EE44","EE45","EE46","EE47","EE48","EE49","EE4A","EE4B","EE4C","EE4D","EE4E","EE4F","EE50","EE51","EE52","EE53","EE54","EE55","EE56","EE57","EE58","EE59","EE5A","EE5B","EE5C","EE5D","EE5E","EE5F","EE60","EE61","EE62","EE63","EE64","EE65","EE66","EE67","EE68","EE69","EE6A","EE6B","EE6C","EE6D","EE6E","EE6F","EE70","EE71","EE72","EE73","EE74","EE75","EE76","EE77","EE78","EE79","EE7A","EE7B","EE7C","EE7D","EE7E","EE80","EE81","EE82","EE83","EE84","EE85","EE86","EE87","EE88","EE89","EE8A","EE8B","EE8C","EE8D","EE8E","EE8F","EE90","EE91","EE92","EE93","EE94","EE95","EE96","EE97","EE98","EE99","EE9A","EE9B","EE9C","EE9D","EE9E","EE9F","EEA0","EF40","EF41","EF42","EF43","EF44","EF45","D2B3","B6A5","C7EA","F1FC","CFEE","CBB3","D0EB","E7EF","CDE7","B9CB","B6D9","F1FD","B0E4","CBCC","F1FE","D4A4","C2AD","C1EC","C6C4","BEB1","F2A1","BCD5","EF46","F2A2","F2A3","EF47","F2A4","D2C3","C6B5","EF48","CDC7","F2A5","EF49","D3B1","BFC5","CCE2","EF4A","F2A6","F2A7","D1D5","B6EE","F2A8","F2A9","B5DF","F2AA","F2AB","EF4B","B2FC","F2AC","F2AD","C8A7","EF4C","EF4D","EF4E","EF4F","EF50","EF51","EF52","EF53","EF54","EF55","EF56","EF57","EF58","EF59","EF5A","EF5B","EF5C","EF5D","EF5E","EF5F","EF60","EF61","EF62","EF63","EF64","EF65","EF66","EF67","EF68","EF69","EF6A","EF6B","EF6C","EF6D","EF6E","EF6F","EF70","EF71","B7E7","EF72","EF73","ECA9","ECAA","ECAB","EF74","ECAC","EF75","EF76","C6AE","ECAD","ECAE","EF77","EF78","EF79","B7C9","CAB3","EF7A","EF7B","EF7C","EF7D","EF7E","EF80","EF81","E2B8","F7CF","EF82","EF83","EF84","EF85","EF86","EF87","EF88","EF89","EF8A","EF8B","EF8C","EF8D","EF8E","EF8F","EF90","EF91","EF92","EF93","EF94","EF95","EF96","EF97","EF98","EF99","EF9A","EF9B","EF9C","EF9D","EF9E","EF9F","EFA0","F040","F041","F042","F043","F044","F7D0","F045","F046","B2CD","F047","F048","F049","F04A","F04B","F04C","F04D","F04E","F04F","F050","F051","F052","F053","F054","F055","F056","F057","F058","F059","F05A","F05B","F05C","F05D","F05E","F05F","F060","F061","F062","F063","F7D1","F064","F065","F066","F067","F068","F069","F06A","F06B","F06C","F06D","F06E","F06F","F070","F071","F072","F073","F074","F075","F076","F077","F078","F079","F07A","F07B","F07C","F07D","F07E","F080","F081","F082","F083","F084","F085","F086","F087","F088","F089","F7D3","F7D2","F08A","F08B","F08C","F08D","F08E","F08F","F090","F091","F092","F093","F094","F095","F096","E2BB","F097","BCA2","F098","E2BC","E2BD","E2BE","E2BF","E2C0","E2C1","B7B9","D2FB","BDA4","CACE","B1A5","CBC7","F099","E2C2","B6FC","C8C4","E2C3","F09A","F09B","BDC8","F09C","B1FD","E2C4","F09D","B6F6","E2C5","C4D9","F09E","F09F","E2C6","CFDA","B9DD","E2C7","C0A1","F0A0","E2C8","B2F6","F140","E2C9","F141","C1F3","E2CA","E2CB","C2F8","E2CC","E2CD","E2CE","CAD7","D8B8","D9E5","CFE3","F142","F143","F144","F145","F146","F147","F148","F149","F14A","F14B","F14C","F0A5","F14D","F14E","DCB0","F14F","F150","F151","F152","F153","F154","F155","F156","F157","F158","F159","F15A","F15B","F15C","F15D","F15E","F15F","F160","F161","F162","F163","F164","F165","F166","F167","F168","F169","F16A","F16B","F16C","F16D","F16E","F16F","F170","F171","F172","F173","F174","F175","F176","F177","F178","F179","F17A","F17B","F17C","F17D","F17E","F180","F181","F182","F183","F184","F185","F186","F187","F188","F189","F18A","F18B","F18C","F18D","F18E","F18F","F190","F191","F192","F193","F194","F195","F196","F197","F198","F199","F19A","F19B","F19C","F19D","F19E","F19F","F1A0","F240","F241","F242","F243","F244","F245","F246","F247","F248","F249","F24A","F24B","F24C","F24D","F24E","F24F","F250","F251","F252","F253","F254","F255","F256","F257","F258","F259","F25A","F25B","F25C","F25D","F25E","F25F","F260","F261","F262","F263","F264","F265","F266","F267","F268","F269","F26A","F26B","F26C","F26D","F26E","F26F","F270","F271","F272","F273","F274","F275","F276","F277","F278","F279","F27A","F27B","F27C","F27D","F27E","F280","F281","F282","F283","F284","F285","F286","F287","F288","F289","F28A","F28B","F28C","F28D","F28E","F28F","F290","F291","F292","F293","F294","F295","F296","F297","F298","F299","F29A","F29B","F29C","F29D","F29E","F29F","F2A0","F340","F341","F342","F343","F344","F345","F346","F347","F348","F349","F34A","F34B","F34C","F34D","F34E","F34F","F350","F351","C2ED","D4A6","CDD4","D1B1","B3DB","C7FD","F352","B2B5","C2BF","E6E0","CABB","E6E1","E6E2","BED4","E6E3","D7A4","CDD5","E6E5","BCDD","E6E4","E6E6","E6E7","C2EE","F353","BDBE","E6E8","C2E6","BAA7","E6E9","F354","E6EA","B3D2","D1E9","F355","F356","BFA5","E6EB","C6EF","E6EC","E6ED","F357","F358","E6EE","C6AD","E6EF","F359","C9A7","E6F0","E6F1","E6F2","E5B9","E6F3","E6F4","C2E2","E6F5","E6F6","D6E8","E6F7","F35A","E6F8","B9C7","F35B","F35C","F35D","F35E","F35F","F360","F361","F7BB","F7BA","F362","F363","F364","F365","F7BE","F7BC","BAA1","F366","F7BF","F367","F7C0","F368","F369","F36A","F7C2","F7C1","F7C4","F36B","F36C","F7C3","F36D","F36E","F36F","F370","F371","F7C5","F7C6","F372","F373","F374","F375","F7C7","F376","CBE8","F377","F378","F379","F37A","B8DF","F37B","F37C","F37D","F37E","F380","F381","F7D4","F382","F7D5","F383","F384","F385","F386","F7D6","F387","F388","F389","F38A","F7D8","F38B","F7DA","F38C","F7D7","F38D","F38E","F38F","F390","F391","F392","F393","F394","F395","F7DB","F396","F7D9","F397","F398","F399","F39A","F39B","F39C","F39D","D7D7","F39E","F39F","F3A0","F440","F7DC","F441","F442","F443","F444","F445","F446","F7DD","F447","F448","F449","F7DE","F44A","F44B","F44C","F44D","F44E","F44F","F450","F451","F452","F453","F454","F7DF","F455","F456","F457","F7E0","F458","F459","F45A","F45B","F45C","F45D","F45E","F45F","F460","F461","F462","DBCB","F463","F464","D8AA","F465","F466","F467","F468","F469","F46A","F46B","F46C","E5F7","B9ED","F46D","F46E","F46F","F470","BFFD","BBEA","F7C9","C6C7","F7C8","F471","F7CA","F7CC","F7CB","F472","F473","F474","F7CD","F475","CEBA","F476","F7CE","F477","F478","C4A7","F479","F47A","F47B","F47C","F47D","F47E","F480","F481","F482","F483","F484","F485","F486","F487","F488","F489","F48A","F48B","F48C","F48D","F48E","F48F","F490","F491","F492","F493","F494","F495","F496","F497","F498","F499","F49A","F49B","F49C","F49D","F49E","F49F","F4A0","F540","F541","F542","F543","F544","F545","F546","F547","F548","F549","F54A","F54B","F54C","F54D","F54E","F54F","F550","F551","F552","F553","F554","F555","F556","F557","F558","F559","F55A","F55B","F55C","F55D","F55E","F55F","F560","F561","F562","F563","F564","F565","F566","F567","F568","F569","F56A","F56B","F56C","F56D","F56E","F56F","F570","F571","F572","F573","F574","F575","F576","F577","F578","F579","F57A","F57B","F57C","F57D","F57E","F580","F581","F582","F583","F584","F585","F586","F587","F588","F589","F58A","F58B","F58C","F58D","F58E","F58F","F590","F591","F592","F593","F594","F595","F596","F597","F598","F599","F59A","F59B","F59C","F59D","F59E","F59F","F5A0","F640","F641","F642","F643","F644","F645","F646","F647","F648","F649","F64A","F64B","F64C","F64D","F64E","F64F","F650","F651","F652","F653","F654","F655","F656","F657","F658","F659","F65A","F65B","F65C","F65D","F65E","F65F","F660","F661","F662","F663","F664","F665","F666","F667","F668","F669","F66A","F66B","F66C","F66D","F66E","F66F","F670","F671","F672","F673","F674","F675","F676","F677","F678","F679","F67A","F67B","F67C","F67D","F67E","F680","F681","F682","F683","F684","F685","F686","F687","F688","F689","F68A","F68B","F68C","F68D","F68E","F68F","F690","F691","F692","F693","F694","F695","F696","F697","F698","F699","F69A","F69B","F69C","F69D","F69E","F69F","F6A0","F740","F741","F742","F743","F744","F745","F746","F747","F748","F749","F74A","F74B","F74C","F74D","F74E","F74F","F750","F751","F752","F753","F754","F755","F756","F757","F758","F759","F75A","F75B","F75C","F75D","F75E","F75F","F760","F761","F762","F763","F764","F765","F766","F767","F768","F769","F76A","F76B","F76C","F76D","F76E","F76F","F770","F771","F772","F773","F774","F775","F776","F777","F778","F779","F77A","F77B","F77C","F77D","F77E","F780","D3E3","F781","F782","F6CF","F783","C2B3","F6D0","F784","F785","F6D1","F6D2","F6D3","F6D4","F786","F787","F6D6","F788","B1AB","F6D7","F789","F6D8","F6D9","F6DA","F78A","F6DB","F6DC","F78B","F78C","F78D","F78E","F6DD","F6DE","CFCA","F78F","F6DF","F6E0","F6E1","F6E2","F6E3","F6E4","C0F0","F6E5","F6E6","F6E7","F6E8","F6E9","F790","F6EA","F791","F6EB","F6EC","F792","F6ED","F6EE","F6EF","F6F0","F6F1","F6F2","F6F3","F6F4","BEA8","F793","F6F5","F6F6","F6F7","F6F8","F794","F795","F796","F797","F798","C8FA","F6F9","F6FA","F6FB","F6FC","F799","F79A","F6FD","F6FE","F7A1","F7A2","F7A3","F7A4","F7A5","F79B","F79C","F7A6","F7A7","F7A8","B1EE","F7A9","F7AA","F7AB","F79D","F79E","F7AC","F7AD","C1DB","F7AE","F79F","F7A0","F7AF","F840","F841","F842","F843","F844","F845","F846","F847","F848","F849","F84A","F84B","F84C","F84D","F84E","F84F","F850","F851","F852","F853","F854","F855","F856","F857","F858","F859","F85A","F85B","F85C","F85D","F85E","F85F","F860","F861","F862","F863","F864","F865","F866","F867","F868","F869","F86A","F86B","F86C","F86D","F86E","F86F","F870","F871","F872","F873","F874","F875","F876","F877","F878","F879","F87A","F87B","F87C","F87D","F87E","F880","F881","F882","F883","F884","F885","F886","F887","F888","F889","F88A","F88B","F88C","F88D","F88E","F88F","F890","F891","F892","F893","F894","F895","F896","F897","F898","F899","F89A","F89B","F89C","F89D","F89E","F89F","F8A0","F940","F941","F942","F943","F944","F945","F946","F947","F948","F949","F94A","F94B","F94C","F94D","F94E","F94F","F950","F951","F952","F953","F954","F955","F956","F957","F958","F959","F95A","F95B","F95C","F95D","F95E","F95F","F960","F961","F962","F963","F964","F965","F966","F967","F968","F969","F96A","F96B","F96C","F96D","F96E","F96F","F970","F971","F972","F973","F974","F975","F976","F977","F978","F979","F97A","F97B","F97C","F97D","F97E","F980","F981","F982","F983","F984","F985","F986","F987","F988","F989","F98A","F98B","F98C","F98D","F98E","F98F","F990","F991","F992","F993","F994","F995","F996","F997","F998","F999","F99A","F99B","F99C","F99D","F99E","F99F","F9A0","FA40","FA41","FA42","FA43","FA44","FA45","FA46","FA47","FA48","FA49","FA4A","FA4B","FA4C","FA4D","FA4E","FA4F","FA50","FA51","FA52","FA53","FA54","FA55","FA56","FA57","FA58","FA59","FA5A","FA5B","FA5C","FA5D","FA5E","FA5F","FA60","FA61","FA62","FA63","FA64","FA65","FA66","FA67","FA68","FA69","FA6A","FA6B","FA6C","FA6D","FA6E","FA6F","FA70","FA71","FA72","FA73","FA74","FA75","FA76","FA77","FA78","FA79","FA7A","FA7B","FA7C","FA7D","FA7E","FA80","FA81","FA82","FA83","FA84","FA85","FA86","FA87","FA88","FA89","FA8A","FA8B","FA8C","FA8D","FA8E","FA8F","FA90","FA91","FA92","FA93","FA94","FA95","FA96","FA97","FA98","FA99","FA9A","FA9B","FA9C","FA9D","FA9E","FA9F","FAA0","FB40","FB41","FB42","FB43","FB44","FB45","FB46","FB47","FB48","FB49","FB4A","FB4B","FB4C","FB4D","FB4E","FB4F","FB50","FB51","FB52","FB53","FB54","FB55","FB56","FB57","FB58","FB59","FB5A","FB5B","C4F1","F0AF","BCA6","F0B0","C3F9","FB5C","C5B8","D1BB","FB5D","F0B1","F0B2","F0B3","F0B4","F0B5","D1BC","FB5E","D1EC","FB5F","F0B7","F0B6","D4A7","FB60","CDD2","F0B8","F0BA","F0B9","F0BB","F0BC","FB61","FB62","B8EB","F0BD","BAE8","FB63","F0BE","F0BF","BEE9","F0C0","B6EC","F0C1","F0C2","F0C3","F0C4","C8B5","F0C5","F0C6","FB64","F0C7","C5F4","FB65","F0C8","FB66","FB67","FB68","F0C9","FB69","F0CA","F7BD","FB6A","F0CB","F0CC","F0CD","FB6B","F0CE","FB6C","FB6D","FB6E","FB6F","F0CF","BAD7","FB70","F0D0","F0D1","F0D2","F0D3","F0D4","F0D5","F0D6","F0D8","FB71","FB72","D3A5","F0D7","FB73","F0D9","FB74","FB75","FB76","FB77","FB78","FB79","FB7A","FB7B","FB7C","FB7D","F5BA","C2B9","FB7E","FB80","F7E4","FB81","FB82","FB83","FB84","F7E5","F7E6","FB85","FB86","F7E7","FB87","FB88","FB89","FB8A","FB8B","FB8C","F7E8","C2B4","FB8D","FB8E","FB8F","FB90","FB91","FB92","FB93","FB94","FB95","F7EA","FB96","F7EB","FB97","FB98","FB99","FB9A","FB9B","FB9C","C2F3","FB9D","FB9E","FB9F","FBA0","FC40","FC41","FC42","FC43","FC44","FC45","FC46","FC47","FC48","F4F0","FC49","FC4A","FC4B","F4EF","FC4C","FC4D","C2E9","FC4E","F7E1","F7E2","FC4F","FC50","FC51","FC52","FC53","BBC6","FC54","FC55","FC56","FC57","D9E4","FC58","FC59","FC5A","CAF2","C0E8","F0A4","FC5B","BADA","FC5C","FC5D","C7AD","FC5E","FC5F","FC60","C4AC","FC61","FC62","F7EC","F7ED","F7EE","FC63","F7F0","F7EF","FC64","F7F1","FC65","FC66","F7F4","FC67","F7F3","FC68","F7F2","F7F5","FC69","FC6A","FC6B","FC6C","F7F6","FC6D","FC6E","FC6F","FC70","FC71","FC72","FC73","FC74","FC75","EDE9","FC76","EDEA","EDEB","FC77","F6BC","FC78","FC79","FC7A","FC7B","FC7C","FC7D","FC7E","FC80","FC81","FC82","FC83","FC84","F6BD","FC85","F6BE","B6A6","FC86","D8BE","FC87","FC88","B9C4","FC89","FC8A","FC8B","D8BB","FC8C","DCB1","FC8D","FC8E","FC8F","FC90","FC91","FC92","CAF3","FC93","F7F7","FC94","FC95","FC96","FC97","FC98","FC99","FC9A","FC9B","FC9C","F7F8","FC9D","FC9E","F7F9","FC9F","FCA0","FD40","FD41","FD42","FD43","FD44","F7FB","FD45","F7FA","FD46","B1C7","FD47","F7FC","F7FD","FD48","FD49","FD4A","FD4B","FD4C","F7FE","FD4D","FD4E","FD4F","FD50","FD51","FD52","FD53","FD54","FD55","FD56","FD57","C6EB","ECB4","FD58","FD59","FD5A","FD5B","FD5C","FD5D","FD5E","FD5F","FD60","FD61","FD62","FD63","FD64","FD65","FD66","FD67","FD68","FD69","FD6A","FD6B","FD6C","FD6D","FD6E","FD6F","FD70","FD71","FD72","FD73","FD74","FD75","FD76","FD77","FD78","FD79","FD7A","FD7B","FD7C","FD7D","FD7E","FD80","FD81","FD82","FD83","FD84","FD85","B3DD","F6B3","FD86","FD87","F6B4","C1E4","F6B5","F6B6","F6B7","F6B8","F6B9","F6BA","C8A3","F6BB","FD88","FD89","FD8A","FD8B","FD8C","FD8D","FD8E","FD8F","FD90","FD91","FD92","FD93","C1FA","B9A8","EDE8","FD94","FD95","FD96","B9EA","D9DF","FD97","FD98","FD99","FD9A","FD9B"];
var qswhSpell=["a",45217,"ai",45219,"an",45232,"ang",45241,"ao",45244,"ba",45253,"bai",45271,"ban",45279,"bang",45294,"bao",45306,"bei",45485,"ben",45500,"beng",45504,"bi",45510,"bian",45534,"biao",45546,"bie",45550,"bin",45554,"bing",45560,"bo",45731,"bu",45752,"ca",45761,"cai",45762,"can",45773,"cang",45780,"cao",45785,"ce",45790,"ceng",45795,"cha",45797,"chai",45808,"chan",45811,"chang",45821,"chao",45996,"che",46005,"chen",46011,"cheng",46021,"chi",46036,"chong",46052,"chou",46057,"chu",46069,"chuai",46247,"chuan",46248,"chuang",46255,"chui",46261,"chun",46266,"chuo",46273,"ci",46275,"cong",46287,"cou",46293,"cu",46294,"cuan",46298,"cui",46301,"cun",46309,"cuo",46312,"da",46318,"dai",46324,"dan",46498,"dang",46513,"dao",46518,"de",46530,"deng",46533,"di",46540,"dian",46559,"diao",46575,"die",46584,"ding",46753,"diu",46762,"dong",46763,"dou",46773,"du",46780,"duan",46795,"dui",46801,"dun",46805,"duo",46814,"e",46826,"en",46839,"er",46840,"fa",47010,"fan",47018,"fang",47035,"fei",47046,"fen",47058,"feng",47073,"fo",47088,"fou",47089,"fu",47090,"ga",47297,"gai",47299,"gan",47305,"gang",47316,"gao",47325,"ge",47335,"gei",47352,"gen",47353,"geng",47355,"gong",47524,"gou",47539,"gu",47548,"gua",47566,"guai",47572,"guan",47575,"guang",47586,"gui",47589,"gun",47605,"guo",47608,"ha",47614,"hai",47777,"han",47784,"hang",47803,"hao",47806,"he",47815,"hei",47833,"hen",47835,"heng",47839,"hong",47844,"hou",47853,"hu",47860,"hua",48040,"huai",48049,"huan",48054,"huang",48068,"hui",48082,"hun",48103,"huo",48109,"ji",48119,"jia",48334,"jian",48351,"jiang",48553,"jiao",48566,"jie",48594,"jin",48621,"jing",48803,"jiong",48828,"jiu",48830,"ju",48847,"juan",48872,"jue",48879,"jun",48889,"ka",49062,"kai",49066,"kan",49071,"kang",49077,"kao",49084,"ke",49088,"ken",49103,"keng",49107,"kong",49109,"kou",49113,"ku",49117,"kua",49124,"kuai",49129,"kuan",49133,"kuang",49135,"kui",49143,"kun",49316,"kuo",49320,"la",49324,"lai",49331,"lan",49334,"lang",49349,"lao",49356,"le",49365,"lei",49367,"leng",49378,"li",49381,"lia",49577,"lian",49578,"liang",49592,"liao",49603,"lie",49616,"lin",49621,"ling",49633,"liu",49647,"long",49658,"lou",49829,"lu",49835,"lv",49855,"luan",49869,"lue",49875,"lun",49877,"luo",49884,"ma",49896,"mai",49905,"man",49911,"mang",50082,"mao",50088,"me",50100,"mei",50101,"men",50117,"meng",50120,"mi",50128,"mian",50142,"miao",50151,"mie",50159,"min",50161,"ming",50167,"miu",50173,"mo",50174,"mou",50353,"mu",50356,"na",50371,"nai",50378,"nan",50383,"nang",50386,"nao",50387,"ne",50392,"nei",50393,"nen",50395,"neng",50396,"ni",50397,"nian",50408,"niang",50415,"niao",50417,"nie",50419,"nin",50426,"ning",50427,"niu",50595,"nong",50599,"nu",50603,"nv",50606,"nuan",50607,"nue",50608,"nuo",50610,"o",50614,"ou",50615,"pa",50622,"pai",50628,"pan",50634,"pang",50642,"pao",50647,"pei",50654,"pen",50663,"peng",50665,"pi",50679,"pian",50858,"piao",50862,"pie",50866,"pin",50868,"ping",50873,"po",50882,"pu",50891,"qi",50906,"qia",50942,"qian",51107,"qiang",51129,"qiao",51137,"qie",51152,"qin",51157,"qing",51168,"qiong",51181,"qiu",51183,"qu",51191,"quan",51366,"que",51377,"qun",51385,"ran",51387,"rang",51391,"rao",51396,"re",51399,"ren",51401,"reng",51411,"ri",51413,"rong",51414,"rou",51424,"ru",51427,"ruan",51437,"rui",51439,"run",51442,"ruo",51444,"sa",51446,"sai",51449,"san",51453,"sang",51619,"sao",51622,"se",51626,"sen",51629,"seng",51630,"sha",51631,"shai",51640,"shan",51642,"shang",51658,"shao",51666,"she",51677,"shen",51689,"sheng",51705,"shi",51878,"shou",51925,"shu",51935,"shua",52130,"shuai",52132,"shuan",52136,"shuang",52138,"shui",52141,"shun",52145,"shuo",52149,"si",52153,"song",52169,"sou",52177,"su",52180,"suan",52193,"sui",52196,"sun",52207,"suo",52210,"ta",52218,"tai",52389,"tan",52398,"tang",52416,"tao",52429,"te",52440,"teng",52441,"ti",52445,"tian",52460,"tiao",52468,"tie",52473,"ting",52476,"tong",52648,"tou",52661,"tu",52665,"tuan",52676,"tui",52678,"tun",52684,"tuo",52687,"wa",52698,"wai",52705,"wan",52707,"wang",52724,"wei",52734,"wen",52929,"weng",52939,"wo",52942,"wu",52951,"xi",52980,"xia",53177,"xian",53190,"xiang",53216,"xiao",53236,"xie",53416,"xin",53437,"xing",53447,"xiong",53462,"xiu",53469,"xu",53478,"xuan",53497,"xue",53669,"xun",53675,"ya",53689,"yan",53705,"yang",53738,"yao",53755,"ye",53932,"yi",53947,"yin",54000,"ying",54178,"yo",54196,"yong",54197,"you",54212,"yu",54233,"yuan",54439,"yue",54459,"yun",54469,"za",54481,"zai",54484,"zan",54491,"zang",54495,"zao",54498,"ze",54512,"zei",54516,"zen",54517,"zeng",54518,"zha",54522,"zhai",54698,"zhan",54704,"zhang",54721,"zhao",54736,"zhe",54746,"zhen",54756,"zheng",54772,"zhi",54949,"zhong",54992,"zhou",55003,"zhu",55017,"zhua",55205,"zhuai",55207,"zhuan",55208,"zhuang",55214,"zhui",55221,"zhun",55227,"zhuo",55229,"zi",55240,"zong",55255,"zou",55262,"zu",55266,"zuan",55274,"zui",55276,"zun",55280,"zuo",55282];

function getSpell(str,sp){
	var i,c,t,ret="";
	if(sp==null)sp="";
	for(i=0;i<str.length;i++){
		if(str.charCodeAt(i)>=0x4e00){
			c=parseInt(qswhU2GB[str.charCodeAt(i)-0x4e00],16);
			if(c<55290){
				for(t=qswhSpell.length-1;t>0;t=t-2)if(qswhSpell[t]<=c)break;
				if(t>0)ret+=qswhSpell[t-1]+sp;
			}
		}
	}
	return ret.substr(0,ret.length-sp.length);
}

function judge_CN(char1,char2,mode){
  try{
	for(var n=0;n<(char1.length>char2.length?char1.length:char2.length);n++){
		var a = getSpell(char1.charAt(n)) 
		var b = getSpell(char2.charAt(n))
		if( a != b ){
			if(mode) return( a > b?1:-1);
			else	 return(a < b?1:-1);
			break;
		}
	}
	return(0);
  }catch(e){
      	if(isDebug)
			alert('judge_CN() 763:'+e.description)
  }
}

function setIsSort(the_tab,cur_col){
  try{
	   return true  //2005-7-21
	   var issort = true;   
	   for(i=1;i<the_tab.rows.length;i++){		
		 if(the_tab.rows[i].cells[cur_col]==null){		
		   issort=false;	
		   break;		
		}  
	  }   
	  return issort;	
  }catch(e){
      	if(isDebug)
			alert('setIsSort() 541:'+e.description)
  }  
}

function getCurrentRow()
{
	return oCurrentRow
}

// ======== format cells
function  commafy(num){  
   num  =  num+"";  
   var  re=/(-?\d+)(\d{3})/  
   while(re.test(num)){  
		num=num.replace(re,"$1,$2")  
   }

   pos = num.indexOf(".")	
   if(pos>0){
	 str = num.split(".")
	 tt = str[1].split(",").join("")
	 num = str[0]+'.'+tt
   }
   return  num;  
} 
// ======== format cells
/* modified by jyhuang         */
/* 加入是否千分位显示标志 micro*/
function  commafy(num,micro){  
   num  =  num+"";  
   if("1" == micro){
       var  re=/(-?\d+)(\d{3})/  
       while(re.test(num)){  
	       num=num.replace(re,"$1,$2")  
	   }
   }
   pos = num.indexOf(".")	
   if(pos>0){
	 str = num.split(".")
	 tt = str[1].split(",").join("")
	 num = str[0]+'.'+tt
   }
   return  num;  
} 
function getPointNum(sPointNum){
	var iPointNum=0
	try{
		return 6;
		if(sPointNum =='quantity')
			iPointNum = parseInt(getDIG_QUANTITY())		
		if(sPointNum =='price')
			iPointNum = parseInt(getDIG_PRICE())
		if(sPointNum =='money')
			iPointNum = parseInt(getDIG_MONEY())
	}catch(e){
		alert(e.message)
		iPointNum = 6
	}
	return parseInt(iPointNum)
}
function ContDec2(sValue,sPointNum){
	if(sValue =='') return ''
    tt = sValue
	tt = tt+""
	if(tt.indexOf(",")!=-1){
		sValue = tt.split(",").join("")
	}
	var dblValue=parseFloat(sValue)
	if (isNaN(dblValue)) return sValue
	var iPointNum=0
	iPointNum = getPointNum(sPointNum)
	
	if (isNaN(iPointNum)) iPointNum=0
	if (iPointNum>9) iPointNum=9
	if (iPointNum<0) iPointNum=0
	var dbl1=Math.round(dblValue*Math.pow(10,iPointNum))/Math.pow(10,iPointNum)
	var s1=dbl1+""
	var num0=0
	if(s1.indexOf(".")==-1){
		num0=iPointNum
	}
	else {
		var num1=s1.length-s1.indexOf(".")-1
		
		if(num1<iPointNum )
			num0=iPointNum-num1
	}
	if (num0>0) {
		var s2="000000000000000"
		if(num0==iPointNum)
			s1=s1+"."+s2.substring(0,num0)
		else
			s1=s1+s2.substring(0,num0)
	}	
	
	return s1
}
/* added by jyhuang           */
/* 直接输入小数位数 sPointNum */
function ContDec3(sValue,sPointNum){
	if(sValue =='') return ''
    tt = sValue
	tt = tt+""
	if(tt.indexOf(",")!=-1){
		sValue = tt.split(",").join("")
	}
	var dblValue=parseFloat(sValue)
	if (isNaN(dblValue)) return sValue
	var iPointNum=0

	iPointNum = sPointNum
	
	if (isNaN(iPointNum)) iPointNum=0
	if (iPointNum>9) iPointNum=9
	if (iPointNum<0) iPointNum=0
	var dbl1=Math.round(dblValue*Math.pow(10,iPointNum))/Math.pow(10,iPointNum)
	var s1=dbl1+""
	var num0=0
	if(s1.indexOf(".")==-1){
		num0=iPointNum
	}
	else {
		var num1=s1.length-s1.indexOf(".")-1
		
		if(num1<iPointNum )
			num0=iPointNum-num1
	}
	if (num0>0) {
		var s2="000000000000000"
		if(num0==iPointNum)
			s1=s1+"."+s2.substring(0,num0)
		else
			s1=s1+s2.substring(0,num0)
	}	
	
	return s1
}
// ========= tip 显示数据表格  ====
function fnOver(obj)
{	
	//if(dragStart)return;	
	var oEl = event.srcElement;
	if(oEl.className == "Alt"){
		Title(oEl);		
	}	
}

function fnOut()
{
	var oEl = event.srcElement;
	if(oEl.className == "tb_tooltip"){
		Title(oEl);
	}

}

function Title(obj)
{	
	var _td = obj.parentElement;
	if(_td.scrollWidth>_td.clientWidth) 
		obj.className=obj.className=="Alt"?"tb_tooltip":"Alt";
}

function toolTipCells(table){
	try{
	for(var kk = 0;kk<table.tBodies.length;kk++){
		tbody = table.tBodies[kk]
		for(var i=0;i<tbody.rows.length;i++){
			var row = tbody.rows[i]
			for(var j=0;j<row.cells.length;j++){
				cell = row.cells[j]	
				var _text = cell.innerHTML;
				cell.innerHTML = "";
				_div = window.document.createElement("DIV");
				_div.innerHTML = _text;
				_div.className = "Alt";
				_div.title = _div.innerText;
				cell.appendChild(_div);
			}
		}
	}
	}catch(e){
		if(isDebug)
			alert('toolTipCells() 857:'+e.description)
	}
}

function trim(str)
{

        var i = 0;
        var len = str.length;
        if ( str == "" ) return( str );
        j = len -1;
        flagbegin = true;
        flagend = true;
        while (( flagbegin == true) && (i< len))
        {
           if ( str.charAt(i) == " " )
                {
                  i=i+1;
                  flagbegin=true;
                }
                else
                {
                        flagbegin=false;
                }
        }

        while  ((flagend== true) && (j>=0))
        {
            if (str.charAt(j)==" ")
                {
                        j=j-1;
                        flagend=true;
                }
                else
                {
                        flagend=false;
                }
        }

        if ( i > j ) return ("");

        trimstr = str.substring(i,j+1);
        return trimstr;
}


//=============== sort 支持
function sort_tab(the_tab,col,data_col,mode){	
  try{
    if(the_tab.tBodies ==null || the_tab.tBodies.length ==0)return
	var tab_arr = new Array();
	var i;
	var oCol = the_tab.rows[titlerows - 1].cells[col]	
	var dateType = oCol.pointtype?oCol.pointtype:(oCol.dataType?oCol.dataType:'string')
	var start=new Date;	
	for(var k=0;k<the_tab.tBodies.length;k++){
	  tbody = the_tab.tBodies[k]
	  for(i=0;i<tbody.rows.length;i++){
		if (typeof(tbody.rows[i].cells[data_col]) == "undefined"){
			return;
		}
		value = tbody.rows[i].cells[data_col].innerText.toLowerCase();
		if(value!=null)
			value = trim(value);
		switch (dateType) { // 排序数据类型预处理
		  case "string" :
			break;
		  case "date" :
			value = value.split("-").join("/")
			value = new Date(value)
			break;
		  case "percent" :		    
			if(value.substr(value.length - 1, 1)=='%'){ // percent
			    value = value.substr(0,value.length-1);
			}
			break;
		  case "quantity" :
		  case "price" :
		  case "money" :
			if(value.charCodeAt(0)>=19968){            // 去掉第一个中文货币符号
			  value = value.substr(1,value.length)							
			}
			if(value.charCodeAt(0) == '$'){            // $
			  value = value.substr(1,value.length)							
			}
			value = value.split(",").join("")
			break;
		   }
		   tab_arr.push(new Array(value,tbody.rows[i]));
		  }
		}
	   tab_arr = sortTable(tab_arr,dateType,mode) // table 排序

	   if(the_tab.tBodies.length){
		  firstTbody = the_tab.tBodies[0]	
		  for(i=0;i<tab_arr.length;i++){			   				
		    firstTbody.appendChild(tab_arr[i][1]);						
		  }
		}
		window.status = " (Time spent: " + (new Date - start) + "ms)";
		for(var kk = 0;kk<the_tab.tBodies.length;kk++){ // reover
		  tbody = the_tab.tBodies[kk];
		  for(var i=0;i<tbody.rows.length;i++){
		    var row = tbody.rows[i];
			if((i+1)%2==0 && (tb_isRowOver|| table.rowover=='true')){
			  row.style.cssText +=";"+tb_RowOverCss;
			}else{
			  row.style.cssText +=";"+tb_RowDefaultCss;
			}
            row.oBgc = row.currentStyle.backgroundColor;				
			row.oFc  = row.currentStyle.color;	
		  }
	   }		
	}catch(e){ 
	   if(isDebug)
		alert('sort_tab() 991:'+e.description)
	}
}

function sortTable(arry,dateType,mode) {
    switch (dateType) {
        case "string" :
            arry.sort(sortByString(mode));
            break;
        case "date" :
            arry.sort(sortByDate(mode));
            break;
		case "percent" :
        case "quantity" :
        case "int" :
			arry.sort(sortByNumber(mode));
		    break;
        case "price" :
        case "money" :
			arry.sort(sortByNumber(mode));
            break;
		default:
			arry.sort(sortByString(mode));
			break;
    }
    return arry
}
//按照数字排序列
function sortByNumber(mode){
	return function (arr1, arr2){	
		var flag;
		var a,b;
		a = arr1[0];
		b = arr2[0];
		if(/^(\+|-)?\d+($|\.\d+$)/.test(a) && /^(\+|-)?\d+($|\.\d+$)/.test(b)){
			a=eval(a);
			b=eval(b);
			flag=mode?(a>b?1:(a<b?-1:0)):(a<b?1:(a>b?-1:0));
		}else{
			flag = 0
		}
		return flag;
	};
}
function sortByDate(mode){
	return function (arr1, arr2){
		var flag;
		var a,b;
		a = arr1[0];
		b = arr2[0];
		flag=mode?(a>b?1:(a<b?-1:0)):(a<b?1:(a>b?-1:0));
		return flag;
	};
}
function sortByString(mode){
	return function (arr1, arr2){
		var flag;
		var a,b;
		a = arr1[0];
		b = arr2[0];
		a=a.toString();
		b=b.toString();
		if(a.charCodeAt(0)>=19968 && b.charCodeAt(0)>=19968){
			flag = judge_CN(a,b,mode);	
		}else{
			flag=mode?(a>b?1:(a<b?-1:0)):(a<b?1:(a>b?-1:0));
		}
		return flag;
	};
}


function calLastWidth(listTable){
      var len = listTable.childNodes(0).childNodes.length;
	  var aLen = 0;
	  var lLen = 0;
	  for(var i=0 ;i<len;i++){
		 if(i!=(len-1)){
		   aLen +=listTable.childNodes(0).childNodes[i].style.pixelWidth;
		 }else{
		   //lLen = listTable.childNodes(0).childNodes[i].style.pixelWidth-aLen-lastColWidth-paddingLeft-paddingRight;
		   lLen = listTable.childNodes(0).childNodes[i].style.pixelWidth-aLen;
		  	//listTable.childNodes(0).childNodes[i].style.width = 100;
		 }
	     
	  }

}