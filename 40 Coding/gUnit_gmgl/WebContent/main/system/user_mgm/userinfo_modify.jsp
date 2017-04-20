<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/tld/struts-template.tld" prefix="template" %>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib uri="http://www.topsuntech.com/jsptags/tree-taglib" prefix="topsuntech" %>
<%@ taglib uri="/WEB-INF/tld/gTaglib-gOS.tld" prefix="gOS" %>
<%@page import="com.topsuntech.gOS.user.session.*" %>
<%@page import="com.topsuntech.gOS.user.en.user.*" %>
<html>
<head>
<title>Untitled Document</title>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<gOS:skin />
<script src="../../../script/ua.js"></script>
<script src="../../../script/functionforcheck.js"></script>
<script src="../../../script/calendar.js"></script>
<script language="JavaScript">
<!--



function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
//-->
function onSubmit() {	 
	myform.actionType.value="normal";
	 var IsValid=true;	 		 
	 
	 if(!checkLength(myform.memo.value, 0, 150)){
		document.all("deslbl").innerHTML="<font color=\"ff0000\">用户描述过长（小于150字符）</font>";
		IsValid=false;
	 }
	 else 
	 document.all("deslbl").innerHTML="";
	 
	 if(myform.name.value=="")
	 {	
	 	document.all("namelbl").innerHTML="<font color=\"ff0000\">请填写姓名</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("namelbl").innerHTML="";
	 if(!isDate(myform.workyear.value))
	 {
	 	document.all("workyearlbl").innerHTML="<font color=\"ff0000\">请填写正确日期</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("workyearlbl").innerHTML="";	
	 if(!isDate(myform.birthdaystr.value))
	 {
	 	document.all("birthlbl").innerHTML="<font color=\"ff0000\">请填写正确日期</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("birthlbl").innerHTML="";
	  if(!isDate(myform.rudangshijian.value))
	 {
	 	document.all("rudanglbl").innerHTML="<font color=\"ff0000\">请填写正确日期</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("rudanglbl").innerHTML="";
	 if(IsValid)	 		
	 myform.submit();
	 
}
function onSubmitP(){
	 myform.actionType.value="password";
	 var IsValid=true;
	 /*if(myform.oldpwd.value.length==0)
	 {
	 	document.all("oldpwdlbl").innerHTML="<font color=\"ff0000\">必须填写旧密码</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("oldpwdlbl").innerHTML="";
	 if(myform.newpwd.value.length<3)
	 {
	 	document.all("pwdlbl").innerHTML="<font color=\"ff0000\">密码长度太短</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("pwdlbl").innerHTML="";*/
	 if(myform.newpwdconfirm.value!=myform.newpwd.value)
	 {
	 	document.all("cfmpwdlbl").innerHTML="<font color=\"ff0000\">密码不一致</font>";
	 	IsValid=false;
	 }
	 else
	 document.all("cfmpwdlbl").innerHTML="";
	 if(IsValid)	 		
	 myform.submit();
}
function onSubmitPrio(){
	var prios=",";
	if(myform.prioritys.value!=""){
		prios=myform.prioritys.value;
	}
	windowWithoutToolbar('userChoose.do?action=actorChoose&prios='+prios,600, 500);	
}
</script>
</head>
<%
	String sDeptId=request.getParameter("sDeptId");
	String backurl="userSelect.do?";
	if(sDeptId==null||sDeptId.length()==0)
	{
	   backurl+="action=list";		   
	   sDeptId="";
	}else{
	   backurl+="action=listByDept&id=";
	   backurl+=sDeptId;
	}
	
%>
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

<table width="102%" border="0" align="right" cellpadding="0" cellspacing="0" class="table10">
  <tr> 
       
    <td valign="top" class="td18"> 
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">
        <tr> 
          <td width="0%" height="20">&nbsp; </td>
          <td width="54%" height="20" align="left"> <strong>修改用户密码(*为必填项1111)<font color="ff0000"><html:errors/></font></strong></td>
          <td width="46%" align="right"><table width="300" border="0" cellpadding="0" cellspacing="0">
              <tr class="td16"> 
                <td width="60" class="td16">&nbsp;</td>
                <td width="60" class="td16">&nbsp;</td>
                <td width="60" class="td16">&nbsp; </td>
                <td width="60" class="td16">【<a href="javascript:onSubmitP();">确定</a>】</td>
                <%String searchstr1 = request.getParameter("search");
                  if(searchstr1!=null&&searchstr1.compareTo("search")==0){                  
                %>
                <td width="60" class="td16">【<a href="javascript:history.back();">取消</a>】</td>
                <%}else{%>
                <td width="60" class="td16">【<a href="<%=backurl%>">取消</a>】</td>
                <%}%>
              </tr>
            </table></td>
        </tr>
      </table>
      <table width="100%" border="0" class="table5">
        <tr> 
          <td height="14"  class="td8">登记人：<c:out value="${user.creatorname}"/> 　维护日期：<fmt:formatDate value="${user.createdate}" pattern="yyyy-MM-dd"/></td>          
        </tr>
      </table>
      <form action="userInfoModify.do?action=modify" name="myform" method="post">
      <input type="hidden" name="id" value="<c:out value="${user.id}"/>">      
      <input type="hidden" name="actionType" value="">
      <input type="hidden" name="sDeptId" value="<%=sDeptId%>">
      <input type="hidden" name="creatorid" value="<%=creatorId%>">
      <input type="hidden" name="creatorname" value="<%=creatorName%>">
        <table width="100%" border="0" align="center" cellpadding="1" cellspacing="1" class="table_main">
          <tr> 
            <td width="45%" height="22" class="td22">旧密码*：</td>
            <td width="55%" height="22" class="td23"> 
              <input name="oldpwd" type="password" maxlength="15">
            <label id="oldpwdlbl" name="oldpwdlbl"></label>            
          </td>
        </tr>
          <tr> 
            <td height="22" class="td22">新密码*：</td>
            <td height="22" class="td23"> 
              <input name="newpwd" type="password" maxlength="15">       
          <label id="pwdlbl" name="pwdlbl"></label>             
          </td>
        </tr>
          <tr> 
            <td height="23" class="td22">新密码确认*：</td>
            <td height="23" class="td23"> 
              <input name="newpwdconfirm" type="password" maxlength="15">
          <label id="cfmpwdlbl" name="cfmpwdlbl"></label>
          </td>
        </tr>
      </table>      
      <br>
      <br>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">
        <tr> 
          <td width="0%" height="20">&nbsp; </td>
          <td width="54%" height="20" align="left"> <strong>修改用户信息(*为必填项)<font color="ff0000"><html:errors/></font></strong></td>
          <td width="46%" align="right"><table width="300" border="0" cellpadding="0" cellspacing="0">
              <tr class="td16"> 
                <td width="60" class="td16">&nbsp;</td>
                <td width="60" class="td16">&nbsp;</td>
                <td width="60" class="td16">&nbsp; </td>
                <td width="60" class="td16">【<a href="javascript:onSubmit();">确定</a>】</td>
                <%String searchstr2 = request.getParameter("search");
                  if(searchstr2!=null&&searchstr2.compareTo("search")==0){                  
                %>
                <td width="60" class="td16">【<a href="javascript:history.back();">取消</a>】</td>
                <%}else{%>
                <td width="60" class="td16">【<a href="<%=backurl%>">取消</a>】</td>
                <%}%>
              </tr>
            </table></td>
        </tr>
      </table>   
      <br>
      <br>          
        <table width="100%" border="0" cellpadding="1" cellspacing="1" class="table_main">          
          <tr> 
            <td height="22" class="td22">姓名*：</td>
            <td height="22" class="td23">
            <input name="name" type="text" size="20" width="150" height="18" value="<c:out value="${user.name}"/>" maxlength="15"><label id="namelbl" name="namelbl"></label></td>
            <td class="td22">性别：</td>
            <td height="22" class="td23"> <topsuntech:genderSelect> <c:out value="${user.gender}"/> 
              </topsuntech:genderSelect> 
            </td>
        </tr>
          <tr height="22" > 
            <td height="22" class="td22">籍贯：</td>
          <td height="22" class="td23"><input name="jiguan" type="text" value="<c:out value="${user.jiguan}"/>" size="20" width="150" height="18" maxlength="50"> 
          </td>
            <td height="22" class="td22">出生地：</td>
          <td height="22" valign="top" class="td23"><input name="birthlocation" type="text" value="<c:out value="${user.birthlocation}"/>" size="20" width="150" height="18" maxlength="50"></td>
        </tr>
          <tr> 
            <td height="22" class="td22">出生年月：</td>
            <td height="22" class="td23"> 
              <script>
          Calendar('birthdaystr','<c:out value="${user.birthday}"/>',1900,2000,null,null,null);
          </script>
          <label id="birthlbl" name="birthlbl"></label>          
          </td>
            <td class="td22">民族：</td>
            <td class="td23"> <topsuntech:nationSelect> <c:out value="${user.nation}"/> 
              </topsuntech:nationSelect> </td>
        </tr>
          <tr> 
            <td height="22" class="td22">学历：</td>
            <td height="22" class="td23"> <topsuntech:xueliSelect> <c:out value="${user.xueli}"/> 
              </topsuntech:xueliSelect> </td>
            <td class="td22">学位：</td>
            <td class="td23"> <topsuntech:xueweiSelect> <c:out value="${user.xuewei}"/> 
              </topsuntech:xueweiSelect> </td>
        </tr>
          <tr> 
            <td height="22" class="td22">所学专业：</td>
            <td height="22" class="td23">
<input name="zhuanye" type="text" value="<c:out value="${user.zhuanye}"/>" size="20" width="150" height="18" maxlength="50"></td>
            <td class="td22">毕业院校及时间：</td>
            <td class="td23">
            <input name="yuanxiao" type="text" value="<c:out value="${user.yuanxiao}"/>" size="20" width="150" height="18" maxlength="50"></td>
        </tr>
          <tr> 
            <td height="22" class="td22">政治面貌：</td>
            <td height="22" class="td23">
            <input name="zhengzhimianmao" type="text" value="党员" size="20" width="150" height="18" maxlength="15"></td>
            <td class="td22">入党/团时间：</td>
            <td class="td23"> 
              <script>
          Calendar('rudangshijian','<c:out value="${user.rudangshijian}"/>',1940,2030,null,null,null);
          </script>
          <label id="rudanglbl" name="rudanglbl"></label>
          </td>
        </tr>
          <tr> 
            <td height="22" class="td22">职称：</td>
            <td height="22" class="td23"> <topsuntech:callnameSelect><c:out value="${user.callname}"/></topsuntech:callnameSelect> 
            </td>
            <td class="td22">职务：</td>
            <td class="td23"> 
              <input name="positionid" value="<c:out value="${user.positionid}"/>" type="text" size="20" width="150" height="18" maxlength="50">
          </td>
        </tr>
          <tr> 
            <td height="22" class="td22">身份证号：</td>
            <td height="22" class="td23">
            <input name="identitynum" type="text" value="<c:out value="${user.identitynum}"/>" size="20" width="150" height="18" maxlength="50"></td>
            <td class="td22">工作证号：</td>
            <td class="td23">
            <input name="worknum" type="text" value="<c:out value="${user.worknum}"/>" size="20" width="150" height="18" maxlength="50"></td>
        </tr>
          <tr> 
            <td height="22" class="td22">家庭居住地址：</td>
            <td height="22" class="td23">
            <input name="address" type="text" value="<c:out value="${user.address}"/>" size="20" width="150" height="18" maxlength="50"></td>
            <td class="td22">住宅电话：</td>
            <td class="td23">
            <input name="homephone" type="text" value="<c:out value="${user.homephone}"/>" size="20" width="150" height="18" maxlength="50"></td>
        </tr>
          <tr> 
            <td height="22" class="td22">办公电话：</td>
            <td height="22" class="td23">
            <input name="officephone" type="text" value="<c:out value="${user.officephone}"/>" size="20" width="150" height="18" maxlength="50"></td>
            <td class="td22">移动电话：</td>
            <td class="td23">
            <input name="mobile" type="text" value="<c:out value="${user.mobile}"/>" size="20" width="150" height="18" maxlength="50"></td>
        </tr>
          
          <tr> 
            <td height="22" class="td22">参加工作时间：</td>
            <td height="22" class="td23">
              <script>
          Calendar('workyear','<c:out value="${user.workyear}"/>',1940,2030,null,null,null);
          </script>
          <label id="workyearlbl" name="workyearlbl"></label>   
            </td>
            <td class="td22">&nbsp;</td>
            <td class="td23">&nbsp;</td>
        </tr>
          <tr> 
            <td height="22" class="td22">备注：
            <label id="deslbl" name="deslbl"></label></td>
            <td height="22" colspan="3" class="td23">
            <TEXTAREA NAME="memo" height = "300" width = "300" ROWS=5 COLS=60 ID="textarea2" wrap="hard"><c:out value="${user.memo}"/></TEXTAREA></td>
        </tr>        
      </table>
      </form>
    </td>
  </tr>
</table>
</body>
</html>
