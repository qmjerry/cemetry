<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.topsuntech.gOS.user.session.*" %>
<%@page import="com.topsuntech.gOS.user.en.user.*" %>
<%@page import="com.topsuntech.gOS.user.en.office.Office" %>
<%@page import="com.topsuntech.gOS.config.user.userXuewei.dao.UserXueweiFactory" %>
<%@page import="com.topsuntech.gOS.config.user.userZhicheng.dao.UserZhichengFactory" %>
<%@page import="java.util.Collection" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>北京公墓管理系统</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<%
	User user = UserSession.getUser(request);
	long creatorId = 2;
	String creatorName = "root";
	if (user!=null) {
		creatorId = user.getId().longValue();		
		creatorName = user.getName();
		
	}
	
	Office off = UserSession.getUserDept(request); 	
	long regionId = off.getRegionid();		
%>
<body>
<div class="topdiv word-1">
<div class="topdiv-1">
<div class="topdiv-2">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="1%" height="83">&nbsp;</td>
      <td width="45%">&nbsp;</td>
      <td width="34%">&nbsp;</td>
      <td width="20%">&nbsp;</td>
    </tr>
    <tr>
      <td height="26">&nbsp;</td>
      <td><img src="images/ico-1.jpg" width="13" height="15" align="absmiddle" />&nbsp;[<%=creatorName%>]&nbsp;欢迎您登录</td>
      <td align="right" valign="middle"><img src="images/ico-2.jpg" width="16" height="16" align="absmiddle" /><a href="frame/default.html" target="frame1">首页</a></td>
      <td align="right"><img src="images/ico-2.jpg" width="16" height="16" align="absmiddle" />&nbsp;修改密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/ico-2.jpg" width="16" height="16" align="absmiddle" />&nbsp;退出&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
  </table>
  
</div>
</div>
</div>
</body>
</html>
