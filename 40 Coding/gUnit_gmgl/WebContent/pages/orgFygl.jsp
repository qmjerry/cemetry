<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../jscript/jquery-easyui-1.3.2/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../jscript/jquery-easyui-1.3.2/themes/icon.css">
<script type="text/javascript" src="../jscript/jquery-easyui-1.3.2/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="../jscript/jquery-easyui-1.3.2/jquery.easyui.min.js"></script>
<title>Insert title here</title>
</head>
<body style="background-color:transparent">
<table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">
  <tr>
    <td width="11" valign="top" class="td-bg"><img src="../images/right-1.jpg" /></td>
    <td align="center" valign="top" ><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="31" align="left" valign="middle" style="background:url(../images/right-3.jpg)"><img src="../images/right-4.jpg" width="9" height="8" align="absmiddle" /> 当前位置 &gt; 费用管理 &gt; 费用明细管理</td>
      </tr>
      <tr>
        <td bgcolor="#FFFFFF" style="font-size:12px;">&nbsp;</td>
      </tr>
    </table>
    
						 <div class="easyui-layout" style="width:100%;height:450px;">
						     <div data-options="region:'west',title:'费用分类管理',split:true" style="width:200px;">
									<ul id="lefttree"></ul>
						   </div>   
					      <div id="mainPanle" region="center"  style="padding:10px 0 10px 10px;" >
					        <table width="98%" border="0" cellspacing="0" cellpadding="0">
					          <tr>
          <td height="40" align="left"><input name="button" type="submit" class="button-z" id="button" value="新建" /></td>
        </tr>
    </table>     
<table width="98%" cellpadding="0"cellspacing="1" bgcolor="#a6c6da">

        <tr>
          <td height="30" align="center" bgcolor="#D4E5F4">序号</td>
          <td align="center" bgcolor="#D4E5F4">费用明细</td>
          <td align="center" bgcolor="#D4E5F4">明细编码</td>
          <td align="center" bgcolor="#D4E5F4">排序</td>
          <td align="center" bgcolor="#D4E5F4">是否有效</td>
          <td align="center" bgcolor="#D4E5F4">备注</td>
          <td align="center" bgcolor="#D4E5F4">操作</td>
        </tr>
        <tr>
          <td height="30" align="center" bgcolor="#FFFFFF">1</td>
          <td align="center" bgcolor="#FFFFFF">管理费</td>
          <td align="center" bgcolor="#FFFFFF">19911</td>
          <td align="center" bgcolor="#FFFFFF">1</td>
          <td align="center" bgcolor="#FFFFFF">是</td>
          <td align="center" bgcolor="#FFFFFF">&nbsp;</td>
          <td align="center" bgcolor="#FFFFFF"class="word-7"><a href="bzzjbz-mod.html">编辑</a>&nbsp;&nbsp;<a href="#">删除</a> </td>
        </tr>
        <tr>
          <td height="30" align="center" bgcolor="#FFFFFF">2</td>
          <td align="center" bgcolor="#FFFFFF">出车费 </td>
          <td align="center" bgcolor="#FFFFFF">19912</td>
          <td align="center" bgcolor="#FFFFFF">2</td>
          <td align="center" bgcolor="#FFFFFF">是</td>
          <td align="center" bgcolor="#FFFFFF">灵车负责运送逝者</td>
          <td align="center" bgcolor="#FFFFFF"class="word-7"><a href="bzzjbz-mod.html">编辑</a>&nbsp;&nbsp;<a href="#">删除</a> </td>
        </tr>
        <tr>
          <td height="30" align="center" bgcolor="#FFFFFF">3</td>
          <td align="center" bgcolor="#FFFFFF">看护费</td>
          <td align="center" bgcolor="#FFFFFF">19913</td>
          <td align="center" bgcolor="#FFFFFF">3</td>
          <td align="center" bgcolor="#FFFFFF">是</td>
          <td align="center" bgcolor="#FFFFFF">负责替家属打扫灵位</td>
          <td align="center" bgcolor="#FFFFFF"class="word-7"><a href="bzzjbz-mod.html">编辑</a>&nbsp;&nbsp;<a href="#">删除</a> </td>
        </tr>
      </table>      
                            
                              </div>
					
	  </div></td>
  </tr>
</table>



<script type="text/javascript">
	$(function(){
		  $('#lefttree').tree({
		    url:'data/tree_data_fyflgl.json',
		    animate:true,
			onSelect: function(node){
				  $('#p').panel('close');
			}
			
		  });
		
  });

</script>

</body>
</html>