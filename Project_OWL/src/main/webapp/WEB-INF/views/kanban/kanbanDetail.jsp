<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
.comment_img {
background-color: #326295;
width:50px; 
height: 50px; 
line-height: 50px;
border-radius:50%;
text-align: center;
font-weight: 900;
font-size: 16px;
color: #f8f9fa;
}
</style>
<script>

</script>
<div class="container-fluid mt-2" style="padding: 25px;">
	<div class="row">
		<div class="col-8">
		<div class="card">
			<div class="card-title mb-0">
				<div class="ml-3"><h2>Drive Development</h2></div>
			</div>
		<hr class="mt-1"> 
			<div class="card-body mt-0 mb-0" style="border: 1px solid; border-color:#e9e9e9;">
			<!-- style="border: 1px solid; border-color:#e9e9e9;" -->
				<p>Task </p>
				<p>- 드라이브 디폴트 폴더 생성</p>
				<p>- 계층형 구조 </p>
				<p>- 휴지통 기능</p>
			</div>
			<!-- <hr class="mt-1">  -->
			<div class="card-footer mb-0" style="border-left:1px solid;border-right:1px solid;border-bottom:1px solid;border-color:#e9e9e9;padding-bottom:6px;padding-top:10px;" >
			<i class="fas fa-download mr-2 mb-2"></i>
			<a href="#" class="p-1 m-1">owl_테이블 쿼리.txt</a>
			<a href="#" class="p-1 m-1">owl_발표자료.ppt</a>
			</div>
		<!-- 	<div class="card-footer" style="padding:6px;border: 1px solid; border-color:#e9e9e9;"><a href="#"><i class="fas fa-download  mr-2"></i>owl_발표자료.ppt</a></div> -->
			<!-- <hr class="mt-1">  -->
			<div class="card-body mt-0 mb-0 pt-3">
			<h5><i class="fas fa-bars mr-2 mb-2"></i>Activity</h5>
              <div class="d-md-flex align-items-center">
              
				<ul class="timeline w-100">
				<li>
					<p> Crystal opened this issue 1/11</p>
				</li>
				<li>
					<p>1/12 edited </p>
				</li>
				<li>
					<p>1/14 edited</p>
				</li>
				<li>
					<p>1/16 moved this issue from 'to do' to 'done'</p>
				</li>
			</ul>
             <!-- 끝 -->
             </div>
          </div>
          <div class="card-body mt-0" style="border: 1px solid; border-color:#e9e9e9; border-radius: 0.25rem;background-color:#e9e9e9;">
         	<h5><i class="fas fa-comments mr-2 mb-2"></i>Comments</h5>
            <div class="comment-widgets scrollable">
                 <div class="d-flex flex-row comment-row m-0">
                   <div class="p-2"><div class="comment_img">C</div></div>
                    <div class="comment-text w-100">
                        <h6 class="font-medium mb-1">Cindy <span class="text-muted float-right">Jan 18, 2020</span></h6>
                        <div class="mb-1 d-block"><span >화이팅</span></div>
                        <div class="comment-footer">
                            <button type="button" class="btn btn-info btn-sm">Edit</button>
                            <button type="button" class="btn btn-secondary btn-sm">Delete</button>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row comment-row m-0">
                   <div class="p-2"><div class="comment_img">C</div></div>
                    <div class="comment-text w-100">
                        <h6 class="font-medium mb-1">Colin<span class="text-muted float-right">Jan 16, 2020</span></h6>
                        <div class="mb-1 d-block"><span >파이어베이스 알아?</span></div>
                        <div class="comment-footer">
                            <button type="button" class="btn btn-info btn-sm">Edit</button>
                            <button type="button" class="btn btn-secondary btn-sm">Delete</button>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        <div class="card-body mt-0 p-0">
        	<jsp:include page="./Reply.jsp"/>
          		 	<!-- <textarea class="form-control bg-light w-100" rows="10" cols="10" placeholder="Leave a comment" name="" id="issueReply"></textarea> -->
          			<button class="btn btn-secondary mt-1 mr-1">comment</button>
          			<button class="btn btn-secondary mt-1 ml-1"><i class="fas fa-at"></i></button>
          </div>
			<!--  카드 끝  -->
		</div>
		</div>
		<div class="col-4">
		<div class="form-group">
		<div class="row">
			<div class="col-4">Assignees
			</div>	
			<div class="col-8">
				Chloe
			</div>
		
		</div>
			</div>
			<hr>
		<div class="form-group">
			<div class="row">
			<div class="col-4">Label</div>	
			<div class="col-8" >
				<div style="background-color: #F4D452;padding:2px; padding-left:5px;">Dev</div>
			</div>									
		</div>
			</div>
			<hr>
		<div class="form-group">
			<div class="row">
			<div class="col-4">Priority</div>	
			<div class="col-8">
				<span class="badge badge-pill badge-danger font-14">High</span>
			</div>									
		</div>
			</div>
			<hr>
		<div class="form-group">
			<div class="row">
			<div class="col-4">Due Date</div>	
			<div class="col-8"><i class="fas fa-calendar mr-1"></i>
				     2020/01/20                        
            </div>	
		</div>
		</div>
			<hr>
		<div class="form-group">
			<div class="row">
				  <button class="btn w-100"><i class="fas fa-check mr-2 text-danger"></i>Close issue</button>                    
			</div>
		</div>
	</div>
</div>
<div class="text-center"><button class="btn btn-primary mr-1">목록</button>
<button class="btn btn-primary ml-1">수정</button>
</div>
</div>