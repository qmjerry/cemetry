<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/tld/struts-template.tld" prefix="template" %>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib uri="/WEB-INF/tld/gTaglib-gOS.tld" prefix="gOS" %>
<%@ taglib uri="/WEB-INF/tld/topsuntech-tree.tld" prefix="topsuntech" %>
<link href="../../css/css.css" rel="stylesheet" type="text/css">

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
		window.alert("请首先选择！");
	}
}

function onSubmit2() {
	if (CheckSelected()) {
		myform.action = "UserextSelect.do?action=priorityChoose&priosType=all&id=1180";
		myform.submit();
	} else {
		window.alert("请首先选择！");
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
<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" scroll="no" onLoad="" onResize="">
<span id="_main_Span" style="width:100%;overflow:auto">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="11" background="../../../images/images_32.jpg"><img src="../../../images/content_left.gif" width="11" height="51"></td>
    <td height="51" background="../../../images/images_32.jpg"><table width="70%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="22" height="16" align="center"><img src="../../../images/d.gif" width="14" height="14"></td>
          <td valign="bottom"> 当前位置：</td>
      </tr>
    </table>
    </td>
  </tr>
  <tr>
    <td background="../../../images/images_481.jpg">&nbsp;</td>
    <td valign="top">
			<table id="_main_table" width="100%" border="0" cellpadding="0" cellspacing="0" class="table_template">
			  <tr> 
				<td valign="top"> 
				 
				  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">
				  
				  
					<tr> 
					  <td height="17">  
						【<a href="../user_mgm/userAdd.do?action=showAdd">创建新用户</a>】
						【<a href="../user_mgm/userSearch.do?action=search">查询用户</a>】
						【<a href="javascript:myform.actionType.value='delete'; onSubmit();">批量删除</a>】
						【<a href="javascript:onSubmit2();">批量授权</a>】
						【<a href="javascript:location.reload();">刷新</a>】
					</td>
					<c:if test='${subtype=="subman"}'>
						<td align="center">
							【<a href="UserextSelect.do?action=accredit">用户授权</a>】
						</td>
					</c:if>
				  </tr>
				  </table>
				  <form action="../user_mgm/userDeleteAll.do?action=deleteAllConfirm" name="myform" method="post">  
				  <input type="hidden" name="actionType" value="">
				  <input type="hidden" name="prioritys">
				 	<TABLE type="grid" border="0"  style="table-layout:fixed;"    name= "listTable" id = "listTable" cellpadding="1" cellspacing="1" bgcolor="a8d1eb"> 								
					<tr class="tr2"> 
					  <td width="3%" class="td-01">&nbsp;</td>
					  <td width="15%" class="td-01"><font face="宋体">所属部门</font></td>
					  <td width="10%" class="td-01"><font face="宋体">ID</font></td>
					  <td width="15%" class="td-01">姓名</td>
					  <td width="5%" class="td-01">性别</td>
					  <td width="12%" class="td-01">职务</td>
					  <td width="10%" class="td-01">出生年月</td>
					  <td width="15%" class="td-01">审批情况</td>
					  <td width="15%" class="td-01">操作</td>
					</tr>
					<% int i = 1; %>
					<c:forEach var="user" items="${userList}" >
						<% if (i++ % 2 == 1) {%>
					<tr   >
						<% } else {%>
					<tr   >
						<% }%>
					  <td height="21"  class="td-02"> <input name="ids" type="checkbox" value="<c:out value="${user.id}"/>" ></td>
					  <td  class="td-02"><a href="../office_mgm/officeSelect.do?action=detail&id=<c:out value="${user.deptid}"/>"><c:out value="${user.deptname}"/></a></td>
					  <td  class="td-02"><a href="../user_mgm/userSelect.do?action=detail&id=<c:out value="${user.id}"/>"><c:out value="${user.loginid}" /></a></td>
					  <td  class="td-02"><c:out value="${user.name}" /></td>
					  <td  class="td-02"><c:out value="${user.gender}"/></td>
					  <td  class="td-02"><c:out value="${user.callname}"/></td>
					  <td  class="td-02"><font color="#000000"><fmt:formatDate value="${user.birthday}" pattern="yyyy-MM-dd" /></font></td>          
					  <td  class="td-02">
						<topsuntech:registStatus> 
							<c:out value="${user.registstatus}"/>
						</topsuntech:registStatus> 	
					  </td>
					  
					  <td width="18%"  class="td-02">
						<a href="../user_mgm/userUpdate.do?action=showUpdate&id=<c:out value="${user.id}"/>">            
						<img src="../../../images/config/zoom_small.gif" width="16" height="16" border="0" onMouseOver="myHint.show(0)" onMouseOut="myHint.hide()"></a>
						<a href="../user_mgm/userClone.do?action=showClone&id=<c:out value="${user.id}"/>">                        
						<img src="../../../images/config/clone.gif" width="16" height="16" border="0" onMouseOver="myHint.show(1)" onMouseOut="myHint.hide()"></a> 
						<a href="../user_mgm/userDelete.do?action=deleteConfirm&id=<c:out value="${user.id}"/>">            
						<img src="../../../images/config/delete.gif" width="16" height="16" border="0" onMouseOver="myHint.show(2)" onMouseOut="myHint.hide()"></a> 
						<a href="javascript:windowWithoutToolbar('UserextSelect.do?action=priorityChoose&id=<c:out value="${user.id}"/>', 300, 500)">            
						<img src="../../../images/config/adduser.gif" width="16" height="16" border="0" onMouseOver="myHint.show(3)" onMouseOut="myHint.hide()"></a> 
						<c:choose>
							<c:when test="${user.registstatus == '0'}">
								<a href="../user_mgm/registCheck.do?action=check&type=alluser&id=<c:out value="${user.id}"/>">审批</a>
							</c:when>
							
							<c:otherwise>
								审批
							</c:otherwise>
						</c:choose>
					  </td>
					  
					</tr>
					</c:forEach>        
				  </table>
				  </form>
				</td>
			  </tr>
			  <tr class="tr2"> 
				<td height="16" align="left">
				<font color="#FF0000">
				帮助：操作共有4项：编辑、克隆、删除、修改权限。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;“修改权限”是为了修改某个用户的细粒度权限。<br>
				</font> 
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
						  <A onClick="allbox.checked=!allbox.checked;" 
						href="javascript:CheckAll();">选中所有的用户</A> 
					
					</td>
					</form> 
					  <td width="55%" valign="bottom">  
					  <%
						String creatorid = request.getParameter("creatorid");		
						String type = request.getParameter("type");
					  %>          
					  <gOS:page name="test" action="UserextSelect.do?action=listUser" pageName="dataPage" pageSizeKey="list">
					  <gOS:param name="creatorid" value="<%=creatorid%>" /> 
					  <gOS:param name="type" value="<%=type%>" /> 
					  </gOS:page>
					  </td>
					</tr>
				  </table></td>
			  </tr>
			</table>
		</td>
     </tr>
</table>
</span>
</body>
</html>
