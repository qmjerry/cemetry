<%@ page contentType="text/html; charset=GBK" %>

<%@ taglib uri="/WEB-INF/tld/gTaglib-gOS.tld" prefix="gOS" %>
<%@ taglib uri="http://www.topsuntech.com/jsptags/newtree-taglib" prefix="newtree" %>

<html>
<head>
<gOS:skin />

<script src="../../../script/ua.js"></script>
<!-- Infrastructure code for the tree -->
<script src="../../../script/ftiens4.js"></script>

<script>
// Decide if the names are links or just the icons
USETEXTLINKS = 1  //replace 0 with 1 for hyperlinks

// Decide if the tree is to start all open or just showing the root folders
STARTALLOPEN = 1 //replace 0 with 1 to show the whole tree

HIGHLIGHT = 1
USEFRAMES = 0
USEICONS = 0

<newtree:regionTree type="checkbox"/>

function onSubmit() {    
	var queryStr = generateQueryString();	
	if (queryStr==',') {
		window.alert("必须首先选择区域！");
	} else {
		document.myform.choosed.value=queryStr;
		myform.submit();
	}
}



</script>

</head>

<body topmargin="16" marginheight="16">
<form action="regionDeleteAll.do?action=deleteAllConfirm" name="myform" method="post">
	<input name="choosed" type="hidden" value="">

  <table width="90%" height="85%"  border="0" align="right" cellpadding="0" cellspacing="0" class="table10">
    <tr>
    <td valign="top" class="td18">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table7">
        <tr>
 	  <td>
 	  	【<a href="regionAdd.do?action=showAdd">创建新区域</a>】
 	  	【<a href="javascript:onSubmit();">批量删除</a>】
		【<a href="javascript:location.reload();">刷新</a>】
        【<a href="regionMove.do?action=showMove">移动区域</a>】
        【<a href="javascript:expandTree(foldersTree);">展开</a>】
        【<a href="javascript:collapseTree(1);">收缩</a>】</td>
	  </td>
        </tr>
      </table>
      <br> <TABLE border=5 align="left" borderColor=EECCB4 borderlight="green">
        <TBODY>
          <TR>
            <TD align=middle><FONT
      size=2 face="Arial, Helvetica, sans-serif">区域列表</FONT></TD>
          </TR>
          <TR>
            <TD height="95" align=center>
              <!-- By making any changes to this code you are violating your user agreement.
     Corporate users or any others that want to remove the link should check
	 the online FAQ for instructions on how to obtain a version without the link -->
              <!-- Removing this link will make the script stop from working -->

              <div style="position:absolute; top:0; left:0; ">
                <table border=0>
                  <tr>
                    <td><font size=-2> <a style="font-size:7pt;text-decoration:none;color:silver" href="http://www.treemenu.net/" target=_blank></a></font>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- Build the browser's objects and display default view of the
     tree. -->
              <script>initializeDocument()</script> <noscript>
              A tree for site navigation will open here if you enable JavaScript
              in your browser. </noscript> </TD>
          </TR>
        </TBODY>
      </TABLE>
    </td>
  </tr>
  <tr>
    <td height="55" align="left" valign="top" class="td2">
    <font color="#FF0000">
        帮助：支持区域的无限级创建，后面的5个功能：编辑区域、创建子区域、移动区域、删除区域。<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;移动区域是为了支持区域结构的调整，方便于今后进行区域重组。<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区域编号才是区域的唯一标识，区域名称可能会重复。<br>
    </font>
    </td>
  </tr>
</table>
</form>
</body>
</html>
