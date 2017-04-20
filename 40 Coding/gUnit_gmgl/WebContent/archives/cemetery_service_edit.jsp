<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ include file="../common/head.jsp"%>
 <script type="text/javascript">
 function doCheck(){
		var item=$.trim($("#item").val());
		if(item=='-1'){
			alert('请选择服务事项');
			return;
		}
		var begindate=$.trim($("#begindate").val());
		var enddate=$.trim($("#enddate").val());
		if(begindate.length<=0 || enddate.length<=0){
			alert('请填写服务周期');
			return;
		}
	 var price=$.trim($("#price").val());
		var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
		if(!patrn.exec(price)){
			alert("补证费用只能为货币");
			return;
		}
		//具体描述
		var contents=$.trim($("#contents").val());
		if(contents.length>200){
			alert("具体描述最大字符长度为200！");
			return;
		}
		var remark=$.trim($("#remark").val());
		if(remark.length>200){
			alert("备注最大字符长度为200！");
			return;
		}
		 
	 $("#saveForm").submit();
 }
 function doBack(){
	 $("#saveForm").attr("action","cemeteryServiceController.fj?method=getCemeteryServicePageList");
	 $("#saveForm").submit();
 }
 </script>

<body style="background-color: transparent">

<table width="100%" border="0" cellspacing="0" cellpadding="0"
       height="100%">
    <tr>
        <td width="11" valign="top" class="td-bg"><img
                src="../images/right-1.jpg"/></td>
			<td align="center" valign="top">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="31" align="left" valign="middle"
							style="background: url(../images/right-3.jpg)"><img
							src="../images/right-4.jpg" width="9" height="8"
							align="absmiddle" /> 当前位置 &gt; 售后管理 &gt; 事项登记</td>
					</tr>
					<tr>
						<td bgcolor="#FFFFFF" style="font-size: 12px;">&nbsp;</td>
					</tr>
				</table> <!-- Begin 收费清单  -->
				<table width="98%" border="0" align="center" cellpadding="0"
					cellspacing="0">
					<tr>
						<td width="92%" bgcolor="#EBF4FA">
							<table width="200" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="20" align="right"><img
										src="../images/tab-01.jpg" width="8" height="27" /></td>
									<td width="99" align="center" class="tab-img-01">登记信息</td>
									<td width="81" align="left" valign="bottom"><img
										src="../images/tab-03.jpg" />
									</td>
								</tr>
							</table></td>

					</tr>
				</table>
				<table width="98%" border="0" cellspacing="0" cellpadding="3">

					<tr>
						<td bgcolor="#C4DEEE">
							<form id="saveForm" action="cemeteryServiceController.fj?method=saveCemeteryService" method="post">
							<input type='hidden' id="id" name="id" value="<c:out value='${entity.id}'/>" />
							<input type='hidden' id="registryId" name="registryId" value="<c:out value='${registryId}'/>" />
								<table id="baseInfo" width="100%" cellpadding="0"
									cellspacing="1" bgcolor="#a6c6da">

									<tr>
										<td width="12%" height="35" align="right" bgcolor="#D4E5F4">服务事项：</td>
										<td width="38%" align="left" bgcolor="#FFFFFF">  
										   <ft:select name="item" type="fwsx"  selected="${entity.item}" style="width:190px"></ft:select>
										   <span class="word-7">*</span></td>
										<td width="12%" height="35" align="right" bgcolor="#D4E5F4">服务周期：</td>
										<td width="38%" align="left" bgcolor="#FFFFFF"><input
											name="begindate" type="text" id="begindate" class="Wdate"
											onfocus="WdatePicker()" 
											value="<fmt:formatDate value='${entity.begindate}' pattern="yyyy-MM-dd" />"
											/>至<input name="enddate" type="text"
											id="enddate" class="Wdate" onfocus="WdatePicker()" 
											value="<fmt:formatDate value='${entity.enddate}' pattern="yyyy-MM-dd" />" />
											<span class="word-7">*</span></td>
									</tr>
									<tr>
										<td height="35" align="right" bgcolor="#D4E5F4">服务费用：</td>
										<td align="left" colspan="3" bgcolor="#FFFFFF"><input
											name="price" type="text" id="price" class="input-1"
											value="<c:out value='${entity.price}'/>" />（元）<span class="word-7">*</span></td>
									</tr>
									<tr>
										<td height="35" align="right" bgcolor="#D4E5F4">具体描述：</td>
										<td align="left" colspan="3" bgcolor="#FFFFFF"><textarea
												rows="2" name="contents" id="contents" cols="88"><c:out value='${entity.contents}'/></textarea>
										</td>
									</tr>
									<tr>
										<td height="35" align="right" bgcolor="#D4E5F4">备注：</td>
										<td align="left" colspan="3" bgcolor="#FFFFFF"><textarea
												name="remark" id=remark rows="2" cols="88"><c:out value='${entity.remark}'/></textarea>
										</td>
									</tr>
									<tr>
										<td height="35" align="right" bgcolor="#D4E5F4">办理人：</td>
										<td align="left" bgcolor="#FFFFFF"><gOS_shjz:shjzUser key="${entity.createUserId}"/></td>
										<td align="right" bgcolor="#D4E5F4">办理日期：</td>
										<td align="left" bgcolor="#FFFFFF"><fmt:formatDate value='${entity.createDate}' pattern="yyyy-MM-dd"/></td>
									</tr>
								</table>
								<!-- End 业务信息域  -->
						</td>
					</tr>
				</table> <!-- Begin 叶面操作域  -->
				<table width="98%" cellpadding="0" cellspacing="0">
					<tr>
						<td height="30" align="right"><input name="button"
							type="button" onclick="doCheck()" class="button-z2" id="button2" value="保存" /></td>
						<td height="60" width="10">&nbsp;</td>
						<td height="30" align="left"><input name="button"
							type="button" class="button-z2" id="button1" value="返回" onclick="doBack();" /></td>

					</tr>
				</table> <!-- End 叶面操作域  -->
				</form></td>
		</tr>
            </table>


</body>
</html>
