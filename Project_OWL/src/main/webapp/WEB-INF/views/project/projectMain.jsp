<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- Tell the browser to be responsive to screen width -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<!-- Favicon icon -->
	<link rel="icon" type="image/png" sizes="16x16" href="resources/assets/images/favicon.png">
	<title>OWL</title>
	<jsp:include page="../include/headTag.jsp" />
	<link href="resources/css/project.css" rel="stylesheet">
	
	<!-- DataTable -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.css"/>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.js"></script>
	<script type="text/javascript">
		$(function(){
			//$("#noticeTable").DataTable();
			let oldMenu = $("#projectMenu li:first");
			$("#projectMenu li").on("click", function () {
				console.log("click");
				oldMenu.removeClass("active");
				let oldTab = $(oldMenu.children(".nav-link").attr("href"));
				oldTab.removeClass("active show");
				
				$(this).addClass("active");
				let currentTab = $($(this).children(".nav-link").attr("href"));
				currentTab.addClass("active show");
				oldMenu = $(this);
			});
		})
		
		function setDashBoardData(){
			console.log("in setDashBoardData");
		}

		function setCalendarData(){
			console.log("in setCalendarData");

		}

		function setKanbanData(){
			console.log("in setKanbanData");
			/*  $.ajax({
		        type : "POST",
		        url : "GetKanban.do",
		        data : {projectIdx : ${project.projectIdx}},
		        success : function(data) {
		            console.log("setKanbanData success");
		            $("#kanban").html(data);
		        }, error : function(){
		        	console.log("setKanbanData error");
		        }
		    }); 
			 */
		}

		function setNoticeData(){
			console.log("in setNoticeData");

		   /*  $.ajax({
		        type : "POST",
		        url : "GetNotices.do",
		        data : {projectIdx : ${project.projectIdx}},
		        success : function(data) {
		            console.log("setNoticeData success");
		            console.log(data);
		            $("#notice").html(data);
		        }, error : function(){
		        	console.log("setNoticeData error");
		        }
		    });  */
		}

		function setDriveData(){
			console.log("in setDriveData");
			/*  $.ajax({
			        type : "POST",
			        url : "GetDrive.do",
			        data : {projectIdx : ${project.projectIdx}},
			        success : function(data) {
			            console.log("setDriveData success");
			            $("#drive").html(data);
			        }, error : function(){
			        	console.log("setDriveData error");
			        }
			    });  */
		}
		
		function writeNotice() {
			console.log("writeNotice");
			$('#writeBox').show('slide', { direction: 'right' }, 2000);
		}			
	</script>
</head>

<body>
	<!-- LOADER -->
	<div class="preloader">
		<div class="lds-ripple">
			<div class="lds-pos"></div>
			<div class="lds-pos"></div>
		</div>
	</div>

	<div id="main-wrapper">

		<!-- TOP -->
		<jsp:include page="../include/top.jsp" />

		<!-- SIDE BAR -->
		<jsp:include page="../include/sideBar.jsp" />

		<!-- CONTENT BOX -->
		<div class="page-wrapper" >
			<!-- CONTENT MAIN -->
			<div class="container-fluid" style="background-color: white; margin: 20px">
				<!-- <div class="row">
					<div class="col-md-12">dfgdfgdsfds
					</div>
				</div> -->
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
								<li><a href="#memberEditModal" data-toggle="modal">프로젝트멤버 설정</a></li>
								<li><a href="#labelEditModal" data-toggle="modal">라벨 추가</a></li>
							</ul>
						</div>
					</div>
				</li>
			</div>
		</div>

	</div>
		<div class="tab-content">
		<div class=" tab-pane fade active show" id="dash" role="tabpanel">
			<h1>Dash Board</h1>
			<h1>${project.projectName }</h1>
		</div>
		<div class=" tab-pane fade" id="calendar" role="tabpanel">
			<h1>Calendar</h1>
		</div>
		<div class=" tab-pane fade" id="kanban" role="tabpanel">
			 <jsp:include page="../kanban/kanbanTest.jsp"/> 
			
		</div>
		<div class=" tab-pane fade" id="notice" role="tabpanel">
			<jsp:include page="../notice/notice.jsp" />		
		</div>
		<div class=" tab-pane fade" id="drive" role="tabpanel">
		</div>
	</div>		
			</div>

			<!-- BOTTOM -->
			<jsp:include page="../include/bottom.jsp" />
		</div>
	</div>
	
		<!-- pm의 설정  modal -->
	<jsp:include page="modal/projectMemberEdit.jsp" />
	<jsp:include page="modal/labelEdit.jsp" />
</body>
</body>