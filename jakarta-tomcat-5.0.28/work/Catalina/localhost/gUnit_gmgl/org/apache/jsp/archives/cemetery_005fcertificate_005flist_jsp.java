package org.apache.jsp.archives;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class cemetery_005fcertificate_005flist_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static java.util.Vector _jspx_dependants;

  static {
    _jspx_dependants = new java.util.Vector(4);
    _jspx_dependants.add("/archives/../common/head.jsp");
    _jspx_dependants.add("/archives/../common/taglib.jsp");
    _jspx_dependants.add("/WEB-INF/tld/freezer.tld");
    _jspx_dependants.add("/WEB-INF/tld/gTaglib-shjz.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_out_value;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_forEach_varStatus_var_items;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_choose;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_when_test;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_otherwise;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_gOS_shjz_shjzUser_key;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_ft_page_page_action;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_ft_pageInfo_page;

  public java.util.List getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_c_out_value = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_c_forEach_varStatus_var_items = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_c_choose = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_c_when_test = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_c_otherwise = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_gOS_shjz_shjzUser_key = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_ft_page_page_action = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_ft_pageInfo_page = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_c_out_value.release();
    _jspx_tagPool_c_forEach_varStatus_var_items.release();
    _jspx_tagPool_c_choose.release();
    _jspx_tagPool_c_when_test.release();
    _jspx_tagPool_c_otherwise.release();
    _jspx_tagPool_gOS_shjz_shjzUser_key.release();
    _jspx_tagPool_ft_page_page_action.release();
    _jspx_tagPool_ft_pageInfo_page.release();
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    JspFactory _jspxFactory = null;
    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;


    try {
      _jspxFactory = JspFactory.getDefaultFactory();
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n");
      out.write('\n');
      out.write("\n\n\n\n\n");
      out.write("\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n<title>北京公墓管理系统</title>\n<link rel=\"icon\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/favicon.ico\" type=\"image/x-icon\" media=\"screen\" />\n<link rel=\"shortcut icon\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/favicon.ico\" type=\"image/x-icon\" media=\"screen\" />\n<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/jquery-easyui-1.3.2/themes/default/easyui.css\">\n<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/jquery-easyui-1.3.2/themes/icon.css\">\n<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/jquery-easyui-1.3.2/jquery-1.8.0.min.js\"></script>\n<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/jquery-easyui-1.3.2/jquery.easyui.min.js\"></script>\n<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/jquery-easyui-1.3.2/locale/easyui-lang-zh_CN.js\"></script>\n<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/My97DatePicker/WdatePicker.js\"></script>\n<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (PageContext)pageContext, null, false));
      out.write("/jscript/jquery.base64.js\"></script>\n\n<link href=\"../css/style.css\" rel=\"stylesheet\" type=\"text/css\" />\n</head>\n");
      out.write("\n<script type=\"text/javascript\">\n\tfunction reset() {\n\t\t$(\"#cemeteryRegistryCode\").val(\"\");\n\t\t$(\"#cemeteryRegistryCode\").val(\"\");\n\t\t$(\"#name\").val(\"\");\n\t\t$(\"#mobilePhone\").val(\"\");\n\t\t $(\"#cemeteryLocationId\").val(\"\");\n\t\t $(\"#cemeteryLocationAddress\").val(\"\");\n\t}\n\t//进入墓位选择\n\tfunction gotoCemeteryLocation(){\n\t\twindow.open(\"../cemetery/cemetery_location_fast_tree.jsp?select=select\",\"openlocation\",\"width=900px,height=500px,alwaysRaised=no,z-look=yes,resizable=no,location=no,status=no\");\n\t}\n\t\n   function archivesSelect(){\n\t   \n\t\tvar redirect_url =$.base64.encode('cemeteryCertificateController.fj?method=getCemeteryCertificatePageList');\n\t\taction = \"archivesCemeteryRegistryController.fj?method=getArchivesCemeteryRegistrySelectList\";\n\t\taction += \"&redirect_url=\"+redirect_url;\n\t\taction += \"&action_type=certificate\";\n\t   \tlocation.href= action;\n   }\n\t\n\t //选择墓位后回调使用获取墓型信息\n\t   function getCemeteryType(id,locat_id,locat){\n\t\t $(\"#cemeteryLocationId\").val(locat_id);\n\t\t $(\"#cemeteryLocationAddress\").val(locat);\n\t   }\n</script>\n");
      out.write("<body style=\"background-color: transparent\">\n<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" height=\"100%\">\n  <tr>\n    <td width=\"11\" valign=\"top\" class=\"td-bg\"><img src=\"../images/right-1.jpg\" /></td>\n    <td align=\"center\" valign=\"top\" ><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n      <tr>\n        <td height=\"31\" align=\"left\" valign=\"middle\" style=\"background:url(../images/right-3.jpg)\"><img src=\"../images/right-4.jpg\" width=\"9\" height=\"8\" align=\"absmiddle\" /> 当前位置 &gt; 售后管理 &gt; 补正业务登记</td>\n      </tr>\n      <tr>\n        <td bgcolor=\"#FFFFFF\" style=\"font-size:12px;\">&nbsp;</td>\n      </tr>\n    </table>\n    <form action=\"cemeteryCertificateController.fj?method=getCemeteryCertificatePageList\" id=\"queryForm\" method=\"post\">\n\t<table width=\"98%\" cellpadding=\"0\" cellspacing=\"1\" bgcolor=\"#a6c6da\">\n        <tr>\n          <td width=\"15%\" align=\"right\" bgcolor=\"#D4E5F4\">业务编号：</td>\n          <td width=\"35%\" align=\"left\" bgcolor=\"#FFFFFF\">\n          <input name=\"cemeteryRegistryCode\" type=\"text\" id=\"cemeteryRegistryCode\" class=\"input-1\"  value=\"");
      if (_jspx_meth_c_out_0(pageContext))
        return;
      out.write("\"/></td>\n          <td width=\"15%\" height=\"35\" align=\"right\" bgcolor=\"#D4E5F4\">安葬位置：</td>\n          <td width=\"35%\" align=\"left\" bgcolor=\"#FFFFFF\">\n          <input name=\"cemeteryLocationAddress\" id=\"cemeteryLocationAddress\"\n\t\t\t\t\t\t\t\ttype=\"text\" readonly=\"readonly\" class=\"input-1\"\n\t\t\t\t\t\t\t\tvalue=\"");
      if (_jspx_meth_c_out_1(pageContext))
        return;
      if (_jspx_meth_c_out_2(pageContext))
        return;
      if (_jspx_meth_c_out_3(pageContext))
        return;
      out.write("\" />\n\t\t\t\t\t\t\t\t<input name=\"cemeteryLocationId\" id=\"cemeteryLocationId\" type=\"hidden\" \n\t\t\t\t\t\t\t\tvalue=\"");
      if (_jspx_meth_c_out_4(pageContext))
        return;
      out.write("\" /> \n\t\t\t\t\t\t\t\t<input name=\"button\" type=\"button\" class=\"button-z\" value=\"选择\"\n\t\t\t\t\t\t\t\tonclick=\"gotoCemeteryLocation();\" />\n          </td>\n        </tr>\n        <tr>\n          <td width=\"15%\" height=\"35\" align=\"right\" bgcolor=\"#D4E5F4\">承租人：</td>\n          <td width=\"35%\" align=\"left\" bgcolor=\"#FFFFFF\">\n          <input name=\"name\" type=\"text\" id=\"name\" class=\"input-1\"  value=\"");
      if (_jspx_meth_c_out_5(pageContext))
        return;
      out.write("\"/>\n          <td width=\"15%\" align=\"right\" bgcolor=\"#D4E5F4\">电话：</td>\n          <td width=\"35%\" align=\"left\" bgcolor=\"#FFFFFF\">\n          <input name=\"mobilePhone\" type=\"text\" id=\"mobilePhone\" class=\"input-1\"  value=\"");
      if (_jspx_meth_c_out_6(pageContext))
        return;
      out.write("\"/>\n          </td>\n        </tr>\n        <tr bgcolor=\"#FFFFFF\">\n               <td height=\"35\"  colspan=\"4\" align=\"center\"  bgcolor=\"#FFFFFF\" >\n\t\t\t      <input name=\"button\" type=\"submit\" class=\"button-z\" id=\"button\" value=\"查询\" /> \n\t\t\t\t   &nbsp;&nbsp;\n\t\t\t\t  <input name=\"button2\" type=\"reset\" class=\"button-z\" id=\"button2\" value=\"重置\" />\n\t\t\t   </td>\n        </tr>\n      </table>\n      </form>\n\t<table width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n\t\t<tr>\n            <td height=\"40\" align=\"left\">\n\t            <input name=\"button3\" type=\"button\" onclick=\"javascript:archivesSelect();\" class=\"button-z4\" id=\"button3\" value=\"补证登记\" />\n            </td>\n        </tr>\n\t</table>\n\t<table width=\"98%\" cellpadding=\"0\" cellspacing=\"1\" bgcolor=\"#a6c6da\">\n\t\t<tr>\n\t\t\t<td height=\"30\" align=\"center\" bgcolor=\"#D4E5F4\">序号</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">业务编号</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">业务分类</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">承租人</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">身份证号</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">联系电话</td>\n");
      out.write("\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">位置信息</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">补证原因</td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">办理人 </td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">办理日期 </td>\n\t\t\t<td align=\"center\" bgcolor=\"#D4E5F4\">操作</td>\n\t\t</tr>\n\t\t");
      if (_jspx_meth_c_forEach_0(pageContext))
        return;
      out.write("\n\t</table>\n\t<table width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"10\" class=\"word-4\">\n\t\t<tr align=\"right\" >\n\t\t\t<td >\n\t\t\t");
      if (_jspx_meth_ft_page_0(pageContext))
        return;
      out.write(" \n\t\t\t</td >\n\t\t\t<td width=\"120\">");
      if (_jspx_meth_ft_pageInfo_0(pageContext))
        return;
      out.write("</td>\n\t\t</tr>\n\t</table>\n\t<form  action =\"\" id=\"isdelform\" method=\"post\"> </form>\n\t<script type=\"text/javascript\">\n\t\tfunction confirmDelete(id){\n\t\t\tif(confirm(\"确定要删除？\"))\n\t\t\t{\n\t\t\t\tvar url=\"cemeteryCertificateController.fj?method=deleteCemeteryCertificate&id=\"+id ;\n\t\t\t\t$(\"#isdelform\").attr(\"action\",url);\n\t\t\t    $(\"#isdelform\").submit();  \n\t\t\t}\n\t\t }\n\t</script>\n</body>\n</html>\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (pageContext != null) pageContext.handlePageException(t);
      }
    } finally {
      if (_jspxFactory != null) _jspxFactory.releasePageContext(pageContext);
    }
  }

  private boolean _jspx_meth_c_out_0(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_0 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_0.setPageContext(pageContext);
    _jspx_th_c_out_0.setParent(null);
    _jspx_th_c_out_0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${param.cemeteryRegistryCode}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_0 = _jspx_th_c_out_0.doStartTag();
    if (_jspx_th_c_out_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_0);
    return false;
  }

  private boolean _jspx_meth_c_out_1(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_1 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_1.setPageContext(pageContext);
    _jspx_th_c_out_1.setParent(null);
    _jspx_th_c_out_1.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${entity.cemeteryLocation.cemeteryZone.parent.cemeteryZoneName}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_1 = _jspx_th_c_out_1.doStartTag();
    if (_jspx_th_c_out_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_1);
    return false;
  }

  private boolean _jspx_meth_c_out_2(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_2 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_2.setPageContext(pageContext);
    _jspx_th_c_out_2.setParent(null);
    _jspx_th_c_out_2.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${entity.cemeteryLocation.cemeteryZone.cemeteryZoneName}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_2 = _jspx_th_c_out_2.doStartTag();
    if (_jspx_th_c_out_2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_2);
    return false;
  }

  private boolean _jspx_meth_c_out_3(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_3 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_3.setPageContext(pageContext);
    _jspx_th_c_out_3.setParent(null);
    _jspx_th_c_out_3.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${entity.cemeteryLocation.cemeteryLocationCode}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_3 = _jspx_th_c_out_3.doStartTag();
    if (_jspx_th_c_out_3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_3);
    return false;
  }

  private boolean _jspx_meth_c_out_4(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_4 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_4.setPageContext(pageContext);
    _jspx_th_c_out_4.setParent(null);
    _jspx_th_c_out_4.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${entity.cemeteryLocation.id}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_4 = _jspx_th_c_out_4.doStartTag();
    if (_jspx_th_c_out_4.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_4);
    return false;
  }

  private boolean _jspx_meth_c_out_5(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_5 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_5.setPageContext(pageContext);
    _jspx_th_c_out_5.setParent(null);
    _jspx_th_c_out_5.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${param.name}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_5 = _jspx_th_c_out_5.doStartTag();
    if (_jspx_th_c_out_5.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_5);
    return false;
  }

  private boolean _jspx_meth_c_out_6(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_6 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_6.setPageContext(pageContext);
    _jspx_th_c_out_6.setParent(null);
    _jspx_th_c_out_6.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${param.mobilePhone}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_6 = _jspx_th_c_out_6.doStartTag();
    if (_jspx_th_c_out_6.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_6);
    return false;
  }

  private boolean _jspx_meth_c_forEach_0(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:forEach
    org.apache.taglibs.standard.tag.rt.core.ForEachTag _jspx_th_c_forEach_0 = (org.apache.taglibs.standard.tag.rt.core.ForEachTag) _jspx_tagPool_c_forEach_varStatus_var_items.get(org.apache.taglibs.standard.tag.rt.core.ForEachTag.class);
    _jspx_th_c_forEach_0.setPageContext(pageContext);
    _jspx_th_c_forEach_0.setParent(null);
    _jspx_th_c_forEach_0.setVar("en");
    _jspx_th_c_forEach_0.setItems((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${list}", java.lang.Object.class, (PageContext)pageContext, null, false));
    _jspx_th_c_forEach_0.setVarStatus("status");
    int[] _jspx_push_body_count_c_forEach_0 = new int[] { 0 };
    try {
      int _jspx_eval_c_forEach_0 = _jspx_th_c_forEach_0.doStartTag();
      if (_jspx_eval_c_forEach_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write("\n\t\t<tr>\n\t\t\t<td height=\"30\" align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_7(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_8(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_9(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_10(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_11(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_12(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">\n\t\t\t\t");
          if (_jspx_meth_c_out_13(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("\n\t\t\t\t");
          if (_jspx_meth_c_out_14(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("\n\t\t\t\t");
          if (_jspx_meth_c_out_15(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("号\n\t\t\t</td>\n\t\t\t\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">\n\t\t\t\t");
          if (_jspx_meth_c_choose_0(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("\n\t\t\t</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_gOS_shjz_shjzUser_0(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\">");
          if (_jspx_meth_c_out_16(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("</td>\n\t\t\t<td align=\"center\" bgcolor=\"#FFFFFF\" class=\"word-7\">\n\t\t\t<a href=\"cemeteryCertificateController.fj?method=showCemeteryCertificate&id=");
          if (_jspx_meth_c_out_17(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("\">查看</a>&nbsp;&nbsp;\n\t\t\t<a href=\"cemeteryCertificateController.fj?method=editCemeteryCertificate&id=");
          if (_jspx_meth_c_out_18(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write("\">编辑</a>&nbsp;&nbsp;\n\t\t\t<a href=\"#\" onclick=\"confirmDelete(");
          if (_jspx_meth_c_out_19(_jspx_th_c_forEach_0, pageContext, _jspx_push_body_count_c_forEach_0))
            return true;
          out.write(")\">删除</a></td>\n\t\t</tr>\n\t\t");
          int evalDoAfterBody = _jspx_th_c_forEach_0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_forEach_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
        return true;
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_c_forEach_0[0]-- > 0)
        out = pageContext.popBody();
      _jspx_th_c_forEach_0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_c_forEach_0.doFinally();
      _jspx_tagPool_c_forEach_varStatus_var_items.reuse(_jspx_th_c_forEach_0);
    }
    return false;
  }

  private boolean _jspx_meth_c_out_7(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_7 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_7.setPageContext(pageContext);
    _jspx_th_c_out_7.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_7.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${status.count}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_7 = _jspx_th_c_out_7.doStartTag();
    if (_jspx_th_c_out_7.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_7);
    return false;
  }

  private boolean _jspx_meth_c_out_8(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_8 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_8.setPageContext(pageContext);
    _jspx_th_c_out_8.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_8.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.cemeteryRegistryCode}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_8 = _jspx_th_c_out_8.doStartTag();
    if (_jspx_th_c_out_8.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_8);
    return false;
  }

  private boolean _jspx_meth_c_out_9(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_9 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_9.setPageContext(pageContext);
    _jspx_th_c_out_9.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_9.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.cemeteryLocation.cemeteryType.businessData.businessName}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_9 = _jspx_th_c_out_9.doStartTag();
    if (_jspx_th_c_out_9.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_9);
    return false;
  }

  private boolean _jspx_meth_c_out_10(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_10 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_10.setPageContext(pageContext);
    _jspx_th_c_out_10.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_10.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.name}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_10 = _jspx_th_c_out_10.doStartTag();
    if (_jspx_th_c_out_10.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_10);
    return false;
  }

  private boolean _jspx_meth_c_out_11(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_11 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_11.setPageContext(pageContext);
    _jspx_th_c_out_11.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_11.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.cardNum}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_11 = _jspx_th_c_out_11.doStartTag();
    if (_jspx_th_c_out_11.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_11);
    return false;
  }

  private boolean _jspx_meth_c_out_12(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_12 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_12.setPageContext(pageContext);
    _jspx_th_c_out_12.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_12.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.mobilePhone}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_12 = _jspx_th_c_out_12.doStartTag();
    if (_jspx_th_c_out_12.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_12);
    return false;
  }

  private boolean _jspx_meth_c_out_13(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_13 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_13.setPageContext(pageContext);
    _jspx_th_c_out_13.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_13.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.cemeteryLocation.cemeteryZone.parent.cemeteryZoneName}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_13 = _jspx_th_c_out_13.doStartTag();
    if (_jspx_th_c_out_13.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_13);
    return false;
  }

  private boolean _jspx_meth_c_out_14(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_14 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_14.setPageContext(pageContext);
    _jspx_th_c_out_14.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_14.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.cemeteryLocation.cemeteryZone.cemeteryZoneName}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_14 = _jspx_th_c_out_14.doStartTag();
    if (_jspx_th_c_out_14.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_14);
    return false;
  }

  private boolean _jspx_meth_c_out_15(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_15 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_15.setPageContext(pageContext);
    _jspx_th_c_out_15.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_15.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.archivesCemeteryRegistry.cemeteryLocation.cemeteryLocationCode}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_15 = _jspx_th_c_out_15.doStartTag();
    if (_jspx_th_c_out_15.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_15);
    return false;
  }

  private boolean _jspx_meth_c_choose_0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:choose
    org.apache.taglibs.standard.tag.common.core.ChooseTag _jspx_th_c_choose_0 = (org.apache.taglibs.standard.tag.common.core.ChooseTag) _jspx_tagPool_c_choose.get(org.apache.taglibs.standard.tag.common.core.ChooseTag.class);
    _jspx_th_c_choose_0.setPageContext(pageContext);
    _jspx_th_c_choose_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    int _jspx_eval_c_choose_0 = _jspx_th_c_choose_0.doStartTag();
    if (_jspx_eval_c_choose_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\n\t\t\t\t          ");
        if (_jspx_meth_c_when_0(_jspx_th_c_choose_0, pageContext, _jspx_push_body_count_c_forEach_0))
          return true;
        out.write("\n\t\t\t\t          ");
        if (_jspx_meth_c_when_1(_jspx_th_c_choose_0, pageContext, _jspx_push_body_count_c_forEach_0))
          return true;
        out.write("\n\t\t\t\t          ");
        if (_jspx_meth_c_when_2(_jspx_th_c_choose_0, pageContext, _jspx_push_body_count_c_forEach_0))
          return true;
        out.write("\n\t\t\t\t          ");
        if (_jspx_meth_c_when_3(_jspx_th_c_choose_0, pageContext, _jspx_push_body_count_c_forEach_0))
          return true;
        out.write("\n\t\t\t\t          ");
        if (_jspx_meth_c_otherwise_0(_jspx_th_c_choose_0, pageContext, _jspx_push_body_count_c_forEach_0))
          return true;
        out.write("\n\t\t\t\t        ");
        int evalDoAfterBody = _jspx_th_c_choose_0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_choose_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_choose.reuse(_jspx_th_c_choose_0);
    return false;
  }

  private boolean _jspx_meth_c_when_0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_choose_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:when
    org.apache.taglibs.standard.tag.rt.core.WhenTag _jspx_th_c_when_0 = (org.apache.taglibs.standard.tag.rt.core.WhenTag) _jspx_tagPool_c_when_test.get(org.apache.taglibs.standard.tag.rt.core.WhenTag.class);
    _jspx_th_c_when_0.setPageContext(pageContext);
    _jspx_th_c_when_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_choose_0);
    _jspx_th_c_when_0.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.reason=='1'}", java.lang.Boolean.class, (PageContext)pageContext, null, false)).booleanValue());
    int _jspx_eval_c_when_0 = _jspx_th_c_when_0.doStartTag();
    if (_jspx_eval_c_when_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\n\t\t\t\t          \t证件丢失\n\t\t\t\t          ");
        int evalDoAfterBody = _jspx_th_c_when_0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_when_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_when_test.reuse(_jspx_th_c_when_0);
    return false;
  }

  private boolean _jspx_meth_c_when_1(javax.servlet.jsp.tagext.JspTag _jspx_th_c_choose_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:when
    org.apache.taglibs.standard.tag.rt.core.WhenTag _jspx_th_c_when_1 = (org.apache.taglibs.standard.tag.rt.core.WhenTag) _jspx_tagPool_c_when_test.get(org.apache.taglibs.standard.tag.rt.core.WhenTag.class);
    _jspx_th_c_when_1.setPageContext(pageContext);
    _jspx_th_c_when_1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_choose_0);
    _jspx_th_c_when_1.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.reason=='2'}", java.lang.Boolean.class, (PageContext)pageContext, null, false)).booleanValue());
    int _jspx_eval_c_when_1 = _jspx_th_c_when_1.doStartTag();
    if (_jspx_eval_c_when_1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\n\t\t\t\t          \t证件破损\n\t\t\t\t          ");
        int evalDoAfterBody = _jspx_th_c_when_1.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_when_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_when_test.reuse(_jspx_th_c_when_1);
    return false;
  }

  private boolean _jspx_meth_c_when_2(javax.servlet.jsp.tagext.JspTag _jspx_th_c_choose_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:when
    org.apache.taglibs.standard.tag.rt.core.WhenTag _jspx_th_c_when_2 = (org.apache.taglibs.standard.tag.rt.core.WhenTag) _jspx_tagPool_c_when_test.get(org.apache.taglibs.standard.tag.rt.core.WhenTag.class);
    _jspx_th_c_when_2.setPageContext(pageContext);
    _jspx_th_c_when_2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_choose_0);
    _jspx_th_c_when_2.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.reason=='3'}", java.lang.Boolean.class, (PageContext)pageContext, null, false)).booleanValue());
    int _jspx_eval_c_when_2 = _jspx_th_c_when_2.doStartTag();
    if (_jspx_eval_c_when_2 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\n\t\t\t\t          \t信息变更\n\t\t\t\t          ");
        int evalDoAfterBody = _jspx_th_c_when_2.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_when_2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_when_test.reuse(_jspx_th_c_when_2);
    return false;
  }

  private boolean _jspx_meth_c_when_3(javax.servlet.jsp.tagext.JspTag _jspx_th_c_choose_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:when
    org.apache.taglibs.standard.tag.rt.core.WhenTag _jspx_th_c_when_3 = (org.apache.taglibs.standard.tag.rt.core.WhenTag) _jspx_tagPool_c_when_test.get(org.apache.taglibs.standard.tag.rt.core.WhenTag.class);
    _jspx_th_c_when_3.setPageContext(pageContext);
    _jspx_th_c_when_3.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_choose_0);
    _jspx_th_c_when_3.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.reason=='4'}", java.lang.Boolean.class, (PageContext)pageContext, null, false)).booleanValue());
    int _jspx_eval_c_when_3 = _jspx_th_c_when_3.doStartTag();
    if (_jspx_eval_c_when_3 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\n\t\t\t\t          \t其他\n\t\t\t\t          ");
        int evalDoAfterBody = _jspx_th_c_when_3.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_when_3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_when_test.reuse(_jspx_th_c_when_3);
    return false;
  }

  private boolean _jspx_meth_c_otherwise_0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_choose_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:otherwise
    org.apache.taglibs.standard.tag.common.core.OtherwiseTag _jspx_th_c_otherwise_0 = (org.apache.taglibs.standard.tag.common.core.OtherwiseTag) _jspx_tagPool_c_otherwise.get(org.apache.taglibs.standard.tag.common.core.OtherwiseTag.class);
    _jspx_th_c_otherwise_0.setPageContext(pageContext);
    _jspx_th_c_otherwise_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_choose_0);
    int _jspx_eval_c_otherwise_0 = _jspx_th_c_otherwise_0.doStartTag();
    if (_jspx_eval_c_otherwise_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\n\t\t\t\t          \t其他\n\t\t\t\t          ");
        int evalDoAfterBody = _jspx_th_c_otherwise_0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_otherwise_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_otherwise.reuse(_jspx_th_c_otherwise_0);
    return false;
  }

  private boolean _jspx_meth_gOS_shjz_shjzUser_0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  gOS_shjz:shjzUser
    com.topsuntech.gUnit.gEU_bzhhUtil.taglib.BzhhUserTag _jspx_th_gOS_shjz_shjzUser_0 = (com.topsuntech.gUnit.gEU_bzhhUtil.taglib.BzhhUserTag) _jspx_tagPool_gOS_shjz_shjzUser_key.get(com.topsuntech.gUnit.gEU_bzhhUtil.taglib.BzhhUserTag.class);
    _jspx_th_gOS_shjz_shjzUser_0.setPageContext(pageContext);
    _jspx_th_gOS_shjz_shjzUser_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_gOS_shjz_shjzUser_0.setKey((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.createUserId}", java.lang.String.class, (PageContext)pageContext, null, false));
    int _jspx_eval_gOS_shjz_shjzUser_0 = _jspx_th_gOS_shjz_shjzUser_0.doStartTag();
    if (_jspx_th_gOS_shjz_shjzUser_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_gOS_shjz_shjzUser_key.reuse(_jspx_th_gOS_shjz_shjzUser_0);
    return false;
  }

  private boolean _jspx_meth_c_out_16(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_16 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_16.setPageContext(pageContext);
    _jspx_th_c_out_16.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_16.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.createDate}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_16 = _jspx_th_c_out_16.doStartTag();
    if (_jspx_th_c_out_16.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_16);
    return false;
  }

  private boolean _jspx_meth_c_out_17(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_17 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_17.setPageContext(pageContext);
    _jspx_th_c_out_17.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_17.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.id}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_17 = _jspx_th_c_out_17.doStartTag();
    if (_jspx_th_c_out_17.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_17);
    return false;
  }

  private boolean _jspx_meth_c_out_18(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_18 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_18.setPageContext(pageContext);
    _jspx_th_c_out_18.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_18.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.id}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_18 = _jspx_th_c_out_18.doStartTag();
    if (_jspx_th_c_out_18.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_18);
    return false;
  }

  private boolean _jspx_meth_c_out_19(javax.servlet.jsp.tagext.JspTag _jspx_th_c_forEach_0, PageContext pageContext, int[] _jspx_push_body_count_c_forEach_0)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_19 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_19.setPageContext(pageContext);
    _jspx_th_c_out_19.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_forEach_0);
    _jspx_th_c_out_19.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${en.id}", java.lang.Object.class, (PageContext)pageContext, null, false));
    int _jspx_eval_c_out_19 = _jspx_th_c_out_19.doStartTag();
    if (_jspx_th_c_out_19.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_c_out_value.reuse(_jspx_th_c_out_19);
    return false;
  }

  private boolean _jspx_meth_ft_page_0(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  ft:page
    com.topsuntech.gUnit_gmgl.core.tagext.PageTag _jspx_th_ft_page_0 = (com.topsuntech.gUnit_gmgl.core.tagext.PageTag) _jspx_tagPool_ft_page_page_action.get(com.topsuntech.gUnit_gmgl.core.tagext.PageTag.class);
    _jspx_th_ft_page_0.setPageContext(pageContext);
    _jspx_th_ft_page_0.setParent(null);
    _jspx_th_ft_page_0.setAction("cemeteryCertificateController.fj?method=getCemeteryCertificatePageList");
    _jspx_th_ft_page_0.setPage((com.topsuntech.gUnit_gmgl.core.Page) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${page}", com.topsuntech.gUnit_gmgl.core.Page.class, (PageContext)pageContext, null, false));
    int _jspx_eval_ft_page_0 = _jspx_th_ft_page_0.doStartTag();
    if (_jspx_eval_ft_page_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_ft_page_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = pageContext.pushBody();
        _jspx_th_ft_page_0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_ft_page_0.doInitBody();
      }
      do {
        out.write("\n\t\t\t");
        int evalDoAfterBody = _jspx_th_ft_page_0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_ft_page_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE)
        out = pageContext.popBody();
    }
    if (_jspx_th_ft_page_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_ft_page_page_action.reuse(_jspx_th_ft_page_0);
    return false;
  }

  private boolean _jspx_meth_ft_pageInfo_0(PageContext pageContext)
          throws Throwable {
    JspWriter out = pageContext.getOut();
    //  ft:pageInfo
    com.topsuntech.gUnit_gmgl.core.tagext.PageInfoTag _jspx_th_ft_pageInfo_0 = (com.topsuntech.gUnit_gmgl.core.tagext.PageInfoTag) _jspx_tagPool_ft_pageInfo_page.get(com.topsuntech.gUnit_gmgl.core.tagext.PageInfoTag.class);
    _jspx_th_ft_pageInfo_0.setPageContext(pageContext);
    _jspx_th_ft_pageInfo_0.setParent(null);
    _jspx_th_ft_pageInfo_0.setPage((com.topsuntech.gUnit_gmgl.core.Page) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${page}", com.topsuntech.gUnit_gmgl.core.Page.class, (PageContext)pageContext, null, false));
    int _jspx_eval_ft_pageInfo_0 = _jspx_th_ft_pageInfo_0.doStartTag();
    if (_jspx_th_ft_pageInfo_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE)
      return true;
    _jspx_tagPool_ft_pageInfo_page.reuse(_jspx_th_ft_pageInfo_0);
    return false;
  }
}
