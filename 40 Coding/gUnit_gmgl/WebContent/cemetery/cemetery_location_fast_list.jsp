<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ include file="../common/head.jsp"%>
<script>
function selectCemeteryLocation(id,locat_id,locat){
	parent.opener.getCemeteryType(id,locat_id,locat);
	parent.close();
}
</script>
<body style="background-color: transparent">
	<table width="98%" > 
		<tr> <td>
			<c:forEach  var="en" items="${list}" varStatus="status">
	          	<div style="width:140px;height:110px;float:left;text-align:center;padding-top:30px; border:#000 1px dashed;
				 <c:if test="${en.status == 1}">background:#FF0;</c:if>	
				 <c:if test="${en.status == 2}">background:#FFF;</c:if>	
				 <c:if test="${en.status == 3}">background:#F0F;</c:if>	
				 <c:if test="${en.status == 4}">background:#6F0;</c:if>	
				 <c:if test="${en.status == 5}">background:#BFC;</c:if>	
				 <c:if test="${en.status == 6}">background:#CCC;</c:if>
				 <c:if test="${en.status == 7}">background:#FC0;</c:if>
				 " 
				 <c:if test="${param.select == 'select' && en.status == 2}">onclick="selectCemeteryLocation('<c:out value='${en.cemeteryType.id}'/>','<c:out value='${en.id}'/>','<c:out value='${en.cemeteryZone.parent.cemeteryZoneName}'/><c:out value='${en.cemeteryZone.cemeteryZoneName}'/><c:out value='${en.cemeteryLocationCode}'/>号');"</c:if>
	          	>
		          	<c:out value='${en.cemeteryType.cemeteryTypeName}'/><br />
		                <c:choose>
				          <c:when test="${en.cemeteryType.cave=='1'}">单穴</c:when>
				          <c:when test="${en.cemeteryType.cave=='2'}">双穴</c:when>
				          <c:when test="${en.cemeteryType.cave=='3'}">多穴</c:when>
						</c:choose><br />
					售价<c:out value='${en.cemeteryType.totalPrice}'/><br />
					<c:out value='${en.cemeteryLocationCode}'/>号<br />
				</div>
			</c:forEach>
		</td></tr>
	</table>
	</div>
<!-- 	图例  -->
	<table border="0" cellpadding="0"cellspacing="0"  >
        <tr>
          <td height="50" align="center" valign="middle">
              <label  style="display:inline-block;width:60px;height:20px;background-color:#FF0;border-style:double;">开发</label>
              <label  style="display:inline-block;width:60px;height:20px;background-color:#FFF;border-style:double;">空闲</label>
              <label  style="display:inline-block;width:60px;height:20px;background-color:#F0F;border-style:double;">锁定</label>
              <label  style="display:inline-block;width:60px;height:20px;background-color:#6F0;border-style:double;">保留</label>
              <label  style="display:inline-block;width:60px;height:20px;background-color:#BFC;border-style:double;">预定</label>
              <label  style="display:inline-block;width:60px;height:20px;background-color:#CCC;border-style:double;">占用</label>
              <label  style="display:inline-block;width:60px;height:20px;background-color:#FC0;border-style:double;">迁出</label>
          </td>
        </tr>
      </table>
      <p> </p>
<!-- 	图例   -->
	
	<c:if test="${param.pid > 0}" >
		<table width="98%" border="0" cellspacing="0" cellpadding="10" class="word-4">
			<tr align="right" >
				<td >
				<ft:page action="cemeteryLocationController.fj?method=getCemeteryLocationFastListByPID" page="${page}">
						<input type="hidden" id="pid" name="pid" value="<c:out value='${param.pid}'/>" /> 
						<input type="hidden" id="select" name="select" value="<c:out value='${param.select}'/>" /> 
				</ft:page> 
				</td >
				<td width="120"><ft:pageInfo page="${page}"/></td>
			</tr>
		</table>
	</c:if>	
</body>
</html>
