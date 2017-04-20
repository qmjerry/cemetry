<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/tld/struts-template.tld" prefix="template" %>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib uri="/WEB-INF/tld/gTaglib-gOS.tld" prefix="gOS" %>
<%@ taglib uri="/WEB-INF/tld/topsuntech-tree.tld" prefix="topsuntech" %>
<html>
<head>
<title>Untitled Document</title>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">

<script src="../../../script/action.js" language="JScript"></script>
<script src="../../../script/toolbar-ie5.js" language="JScript"></script>
<link href="../../../script/toolbar-ie5.css" type="text/css" rel="stylesheet">
<xml id="xsl" src="../../../script/toolbar-ie5.xsl"></xml>
<script src="../../../script/ua.js"></script>
<script src="../../../script/function.js"></script>
</head>
<SCRIPT language=JavaScript>
<!--
function CheckAll()
  {
    for (var i=0;i<document.myform.elements.length;i++)
    {
      var e = document.myform.elements[i];
      if (e.name == 'ids')
        e.checked = document.checkall.allbox.checked;
    }
  }
function CheckSelected() {
    var isCheck = false;
    for (var i=0;i<document.myform.elements.length;i++)
    {
      var e = document.myform.elements[i];
      if (e.name == 'ids')
        if (e.checked == true) {
            isCheck = e.checked;
            break;
        }
    }
    return isCheck;
}
function onSubmit() {
	if (CheckSelected()) {
		myform.submit();
	} else {
		window.alert("������ѡ��");
	}
}
//-->
</SCRIPT>
<style>
	.row	{background: white;}
</style>

<!-- Link Tigra Hints script file to your HTML document-->
<script language="JavaScript" src="../../../script/hints.js"></script>
<!-- Link Tigra Hints configuration file to your HTML document-->
<script language="JavaScript" src="../../../script/hints_cfg.js"></script>
<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" scroll="no" onload="f_resize_main_span()" onresize="f_resize_main_span()">
<span id="_main_Span" style="width:100%;overflow:auto">

<table id="_main_table" width="100%" border="0" cellpadding="0" cellspacing="0" class="table_template">
  <tr> 
    <td valign="top"> 
     
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">
      
      
        <tr> 
        <td align="left">
        	��<a href="javascript:onSubmit();">������Ȩ</a>��
        </td>  
      	<td align="right">
          	��<a href="UserextSelect.do?action=accredit">����</a>��
      	</td>
      </tr>
      </table>
      <form action="UserextSelect.do?action=priorityChoose&priosType=all&id=1180" name="myform" method="post">  
      <input type="hidden" name="actionType" value="">
      <input type="hidden" name="prioritys">
      <table width="100%" border="0" cellpadding="1" class="ConfigTable">
        <tr class="td-04"> 
          <td width="3%" height="22">&nbsp;</td>
          <td width="15%" height="22"><font face="����">��������</font></td>
          <td width="10%" height="22"><font face="����">ID</font></td>
          <td width="15%" height="22">����</td>
          <td width="5%" height="22">�Ա�</td>
          <td width="12%" height="22">ְ��</td>
          <td width="10%" height="22">��������</td>
          <td width="15%" height="22">�������</td>
          <td width="15%" height="22">����</td>
        </tr>
	        <% int i = 1; %>
	        <c:forEach var="user" items="${userList}" >
				<% if (i++ % 2 == 1) {%>
	        <tr  >
				<% } else {%>
	        <tr  >
			<% }%>
		  <td height="22" class="td-02" > <input name="ids" type="checkbox" value="<c:out value="${user.id}"/>" ></td>
          <td height="22" class="td-02"><a href="../office_mgm/officeSelect.do?action=detail&id=<c:out value="${user.deptid}"/>"><c:out value="${user.deptname}"/></a></td>
          <td height="22" class="td-02"><a href="../user_mgm/userSelect.do?action=detail&id=<c:out value="${user.id}"/>"><c:out value="${user.loginid}" /></a></td>
          <td height="22" class="td-02"><c:out value="${user.name}" /></td>
          <td height="22" class="td-02"><c:out value="${user.gender}"/></td>
          <td height="22" class="td-02"><c:out value="${user.callname}"/></td>
          <td height="22" class="td-02"><font color="#000000"><fmt:formatDate value="${user.birthday}" pattern="yyyy-MM-dd" /></font></td>          
          <td height="22" class="td-02">
          	<topsuntech:registStatus> 
          		<c:out value="${user.registstatus}"/>
          	</topsuntech:registStatus> 	
          </td>
          
          <td width="18%" height="22" class="td-02">
           
            <a href="javascript:windowWithoutToolbar('../zxt_mgm/UserextSelect.do?action=priorityChoose&id=<c:out value="${user.id}"/>', 300, 500)">            
            <img src="../../../images/config/adduser.gif" width="16" height="16" border="0" onMouseOver="myHint.show(3)" onMouseOut="myHint.hide()"></a> 
            
          </td>
          
        </tr>
        </c:forEach>        
      </table>
      </form>
    </td>
  </tr>
  
  <tr> 
    <td align="left" valign="bottom"> 
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">	      
        <tr>
		  <form name="checkall">
		  <td width="45%" height="16" valign="bottom"> 
          
            <INPUT onclick=CheckAll(); type=checkbox value="Check All" 
            name=allbox>
              <A onclick="allbox.checked=!allbox.checked;" 
            href="javascript:CheckAll();">ѡ�����е��û�</A> 
        
        </td>
		</form> 
        </tr>
      </table></td>
  </tr>
</table>
</span>
</body>
</html>