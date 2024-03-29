<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/tld/struts-template.tld" prefix="template" %>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib uri="/WEB-INF/tld/topsuntech-tree.tld" prefix="topsuntech" %>
<%@ taglib uri="/WEB-INF/tld/gTaglib-gOS.tld" prefix="gOS" %>
<%@page import="com.topsuntech.gOS.user.session.*" %>
<%@page import="com.topsuntech.gOS.user.en.user.*" %>
<html>
<head>
<title>Untitled Document</title>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<gOS:skin />
<script src="../../../script/ua1.js"></script>
<script src="../../../script/functionforcheck.js"></script>
<script>
function onSubmit() {
 	 var IsValid=true; 	

	 if(myform.name.value=="")
	 {	 
	 	document.all("deptnamelbl").innerHTML="<font color=\"ff0000\">请填写区域名称</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("deptnamelbl").innerHTML="";

	if(myform.order.value=="" || !isNumber(myform.order.value) || !checkLength(myform.order.value, 1, 2)){
	 	document.all("orderlbl").innerHTML="<font color=\"ff0000\">请填写2位以内的正确数字</font>";
	 	IsValid=false;
	 }
	 else
	 	document.all("orderlbl").innerHTML="";
	if(!checkLength(myform.description.value, 0, 150)){
		document.all("deslbl").innerHTML="<font color=\"ff0000\">单位描述过长（小于150字符）</font>";
		IsValid=false;
	} else {
		document.all("deslbl").innerHTML="";
	}
		 
	 if(IsValid)	 		
	 myform.submit();
}
</script>
</head>
<%
	User user = UserSession.getUser(request);
	long creatorId = 2;
	String creatorName = "root";
	if (user!=null) {
		creatorId = user.getId().longValue();		
		creatorName = user.getName();
	}
%>
<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0">
<form action="regionAdd.do?action=add" name="myform" method="post">

	<input type="hidden" name="addType" value="add">
	<input type="hidden" name="creatorId" value="<%=creatorId%>">
  <table width="100%" border="0" align="right" cellpadding="0" cellspacing="0" class="table10">
    <tr> 
       
    <td align="right" valign="top" class="td18"> 
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">
        <tr> 
          <td width="0%" height="20">&nbsp; </td>
            <td width="54%" height="20" align="left"> <strong>创建新区域(*为必填项)：<font color="ff0000"><html:errors/></font></strong></td>
          <td width="46%" align="right"><table width="300" border="0" cellpadding="0" cellspacing="0">
              <tr class="td16"> 
                <td width="60" class="td16">&nbsp;</td>
                <td width="60" class="td16">&nbsp;</td>
                <td width="60" class="td16">&nbsp; </td>
                  <td width="60" class="td16">【<a href="javascript:onSubmit();">确定</a>】</td>
					<td width="60" class="td16">【<a href="javascript:history.back()">取消</a>】</td>
              </tr>
            </table></td>
        </tr>
      </table>
      <table width="100%" border="0" class="table5">
        <tr> 
          <td width="46%" height="18">&nbsp;</td>
          <td width="54%" align="right">创建人：<%=creatorName%> 　</td>
        </tr>
      </table>
        <table width="100%" border="0" cellpadding="1" cellspacing="1" class="table_main">
          <tr> 
            <td width="14%" height="22" class="td22">上级区域*：</td>
            <td height="22" colspan="3" class="td23"> <input name="parent" type="text" value="" readonly> 
              <input type="hidden" name="parentid" value=""> <a href="javascript:windowWithoutToolbar('regionSelect.do?action=choose&inputBox=parent', 400, 600)"><img src="../../../images/config/zoom_small.gif" width="13" height="13" border="0"></a> 
              <font color="#0000ff">单击前面的图标选择区域</font> <label id="parentlbl" name="parentlbl"></label> 
            </td>
          </tr>
           <tr height="22" > 
            <td height="22" class="td22">区域编号：</td>
          <td height="22" class="td23"><input name="num" type="text" size="20" width="150" height="18" maxlength="15"> 
          </td>
            <td height="22" class="td22">区域名称*：</td>
          <td height="22" valign="top" class="td23"><input name="name" type="text" size="20" width="150" height="18" maxlength="30">
          <label id="deptnamelbl" name="deptnamelbl"></label>
          </td>
        </tr>
          <tr> 
            <td height="22" class="td22">区域属性：</td>
            <td height="22" class="td23">
            	<input name="attribute" type="text" size="20" width="150" height="18" maxlength="15"> 
			</td>
            <td class="td22">区域级别：</td>
            <td class="td23">
	         <!--   
	            <input name="level" type="text" size="20" width="150" height="18" maxlength="15"> 
	         -->   
	            <select name="level">
	        		<option selected>0</option>
	        		<option>1</option>
	        		<option>2</option>
	        		<option>3</option>
	        		<option>4</option>
	        	</select>
            </td>              
        </tr>
           
          <tr height="22" > 
            <td height="22" class="td22">区域简称：</td>
            <td height="22" class="td23">
              <input name="shortname" type="text" size="20" maxlength="10" width="150" height="18">
            </td>
            <td height="22" class="td22">区域显示顺序*：</td>
          	<td height="22" valign="top" class="td23">
          		<input name="order" type="text" size="20" width="150" height="18" maxlength="30">
        			<label id="orderlbl" name="orderlbl"></label>
          	</td>
          </tr>
          <tr> 
          	<td height="22" bgcolor="#FBF7EC" class="td22">区域描述：<label id="deslbl" name="deslbl"></td>
            <td height="22" colspan="3" class="td23"> 
              <TEXTAREA NAME="description" height = "300" width = "300" ROWS=5 COLS=40&quot; wrap="hard"></TEXTAREA>
          	</td>
          </tr>
        </table>
      
      </td>
  </tr>
</table>
</form>
</body>
</html>
