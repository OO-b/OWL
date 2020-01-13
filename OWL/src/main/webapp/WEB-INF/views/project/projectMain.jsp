<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>프로젝트 대시보드</title>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="resources/images/favicon.png">
    <jsp:include page="../include/headTag.jsp"/>
	<link href="resources/project/css/project.css" rel="stylesheet">
    
    <link href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" rel="stylesheet">
    <script src="//cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript">
	$(function() {
		let oldMenu = $("#projectMenu li:first");
		$("#projectMenu li").on("click", function() {
	       console.log("menu in");
	       oldMenu.removeClass("active");
	       $(this).addClass("active");
	       oldMenu = $(this);
	    });
		
	}); 
	</script>
</head>

<body>

    <div id="main-wrapper">

        <!-- Top -->
        <jsp:include page="../include/top.jsp"/>
       
 		<!-- SideBar -->
        <jsp:include page="../include/sideBar.jsp"/>
         
        <!-- Content -->
        <div class="content-body">
   		<!-- Tab -->
        <div id="tab-menu">
        <div class="row">
			<div class="col-md-11">
        	<div id="tab-btn">
	               <ul id="projectMenu" class="nav nav-tabs" role="tablist" style="border-bottom-width: 0px;">
	                   <li class="nav-item active">
	                   		<a class="nav-link" data-toggle="tab" href="#dash">Dash Board</a>
	                   </li>
	                   <li class="nav-item">
	                   		<a class="nav-link" data-toggle="tab" href="#calendar">Calendar</a>
	                   </li>
	                   <li class="nav-item">
	                   		<a class="nav-link" data-toggle="tab" href="#kanban">Kanban Board</a>
	                   </li>
	                   <li class="nav-item">
	                   		<a class="nav-link" data-toggle="tab" href="#notice">Notice</a>
	                   </li>
	                   <li class="nav-item">
	                   		<a class="nav-link" data-toggle="tab" href="#drive">Drive</a>
	                   </li>
	               </ul>
               </div>
               </div>
               <div class="col-md-1 mt-2 text-center">
				<li class="icons dropdown"><a href="javascript:void(0)" data-toggle="dropdown">
                         <i class="fas fa-user-cog iconSizeBig pt-2"></i>
                  </a>
                     <div class=" dropdown-menu">
                         <div class="dropdown-content-body">
                             <ul>
                                 <li><a href="#memberEditModal" data-toggle="modal">프로젝트멤버  설정</a></li>
                                 <li><a href="#labelEditModal" data-toggle="modal">라벨 추가</a></li>
                             </ul>
                         </div>
                     </div>
                 </li>
					</div>
               </div>
               
           </div>
           <div class="tab-content">
                  <div class=" tab-pane fade show active" id="dash" role="tabpanel">
                   		Dash Board
                  </div>
                   <div class=" tab-pane fade" id="calendar" role="tabpanel">
                       Calendar
                   </div>
                   <div class=" tab-pane fade" id="kanban" role="tabpanel">
                       <jsp:include page="../kanban/kanbanMain_iy_iy.jsp"/>
                   </div>
                   <div class=" tab-pane fade" id="notice" role="tabpanel">
                       <jsp:include page="../notice/notice.jsp"/>
                   </div>
                   <div class=" tab-pane fade" id="drive" role="tabpanel">
                       Drive
                   </div>
               </div>
        </div>
        
        <!-- Bottom -->
		<jsp:include page="../include/bottom.jsp"/>
		
		<!-- pm의 설정  modal -->
	    <jsp:include page="modal/projectMemberEdit.jsp" />
	    <jsp:include page="modal/labelEdit.jsp" />
    </div>

    <!--Scripts-->
    <script src="resources/plugins/common/common.min.js"></script>
    <script src="resources/js/custom.min.js"></script>
    <script src="resources/js/settings.js"></script>
    <script src="resources/js/gleek.js"></script>
    <script src="resources/js/styleSwitcher.js"></script>
</body>
</html>
