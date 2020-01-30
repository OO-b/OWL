let projectIdx;


let editIdx = 0;


function initKanban(projectIdx){
	this.projectIdx= projectIdx;
	
	$('#editLabelBtn').click(function() {
		if(editIdx == 0)
			return;
		
		$('#labelColor').val("");
		$('#labelName').val("");
			
		$.ajax({
			url : "UpdateLabel.do",
			data : {'labelIdx' : editIdx, 'labelColor' : $('#labelcolor').val(), 'labelName' : $('#labelname').val()},
			success : function(data) {
				
				//console.log('data in' + data);
				$('#'+editIdx+'Label').next().remove();
				$('#'+editIdx+'Label').remove();
				
				addLabel(editIdx, $('#labelcolor').val(), $('#labelname').val());
				
				$('#labelColor').val("");
				$('#labelName').val("");
				editIdx = 0;
				
				$('#'+editIdx+'Label').attr('style', "background-color:#fff");

			}, error : function () {
				console.log('EditLabel error');
			}
		});
	});
	
	$('#backBtn').click(function() {
		editIdx = 0;
		$('#labelcolor').val("");
		$('#labelname').val("");
		
		$('#addLabelBtn').removeClass("hidden");
		$('#editLabelBtn').addClass("hidden");
		$('#backBtn').addClass("hidden");

		$('#colorform').find('.asColorPicker-trigger').find('span').css('background-color', '#000000');
		$('.labelList').find('.edit').removeClass("hidden");

	});
	
	$("#editIssueDetailBtn").click(function() {
		console.log("edit 클릭 됨");
		changeKanbanView("edit");
	});
	

	//검색 후 원래 칸반으로 되돌아가는 버튼 
	$('#searchReturnBtn').click(function() {

		changeKanbanView("returnlist");
	})
	
	
	
	$('#searchSelectBox').change(function () {
		
		var selectMenu = $('#searchSelectBox option:selected').val();

		if(selectMenu == "Label") {
			$('#searchContent').attr('list', 'LabelMenu');
			getLabelList("SearchLabelList", projectIdx);

		}
		
	})

	
	//검색 
	$('#kanbanSearchBtn').click(function(){
		console.log('값이뭘까?');
		console.log($('#searchSelectBox option:selected').val());
		
		if($('#searchContent').val() == "" || $('#searchContent').val() == null) {
			return;
		}
		
		let selectMN = $('#searchSelectBox option:selected').val();
		
		if(selectMN == "Assignee") {
			
			$.ajax ({
				url : "SearchAssignee.do",
				data : {"projectIdx": projectIdx, "searchContent" : $('#searchContent').val()},
				method : "POST",
				success : function(data) {
					$('#searchContent').val("");
					changeKanbanView("search");
					
/*	      let appendhead   =   '<tr>'
	                	   +     '<th class="text-center">Label</th>'
	                	   +     '<th class="text-center">IssueTitle</th>'
	                	   +     '<th class="text-center">Assigned</th>'
	                	   +     '<th class="text-center">Priority</th>'
	                	   +     '<th class="text-center">Due Date</th>'
	                	   +   '</tr>';
				      
	      $('#searchBox').find('thead').append(appendhead);*/
					
	      $.each(data, function(index, element) {
	    	  
				let labelnm = element.labelName == null ? "" : element.labelName;
				let priorityCd = element.priorityCode == null ? "-" : element.priorityCode;
				let dueDt = element.dueDate == null ? "-" : element.dueDate;
				
	    	  var control = "";
	    	  	  control = '<tr><td class="text-center"><label><span class="badgeIcon" style="background-color:'+ element.labelColor+'">' + labelnm + '</span></td>'
				 	      + '<td class="text-center"><a href="#" onclick="setKanbanDetail('+element.issueIdx+');">'+element.issueTitle+'</a></td>'
				          + '<td class="text-center">'+element.assigned+'</td>'
				          + '<td class="text-center">'+priorityCd+'</td>'
				          + '<td class="text-center">'+dueDt+'</td></tr>';
	    	 
	    	  	  $('#searchBox').find('tbody').append(control);
	      });

				}
			})
			
		}else if(selectMN == "Label") {
			console.log('label값 뭐니?????????');

			var contentVal = $('#searchContent').val();
			console.log($('#searchContent').val());
			console.log(contentVal);
			
			var labelidx = $('#LabelMenu option[value='+contentVal+']').attr('data-id');
			console.log($('#LabelMenu option[value='+labelidx+']').attr('data-id'));
			console.log(labelidx);
			
			$.ajax ({
				url : "SearchLabel.do",
				data : {"labelIdx" : labelidx},
				method : "POST",
				success : function(data) {
					console.log('SearchLabel in');
					console.log(data);
					
					$('#searchContent').val("");
					changeKanbanView("search");
					
				      $.each(data, function(index, element) {
				    	  
							let labelnm = element.labelName == null ? "" : element.labelName;
							let priorityCd = element.priorityCode == null ? "-" : element.priorityCode;
							let dueDt = element.dueDate == null ? "-" : element.dueDate;
							
				    	  var control = "";
				    	  	  control = '<tr><td class="text-center"><label><span class="badgeIcon" style="background-color:'+ element.labelColor+'">' + labelnm + '</span></td>'
							 	      + '<td class="text-center"><a href="#" onclick="setKanbanDetail('+element.issueIdx+');">'+element.issueTitle+'</a></td>'
							          + '<td class="text-center">'+element.assigned+'</td>'
							          + '<td class="text-center">'+priorityCd+'</td>'
							          + '<td class="text-center">'+dueDt+'</td></tr>';
				    	 
				    	  	  $('#searchBox').find('tbody').append(control);
				      });
					
					
				},error : function() {
					console.log('SearchLabel error');
				} 
				
			})
			
			
			
		}
		

		

		
		
	});
	
	
}  //initKanban End


function addLabel(lbidx, lbcolor, lbnm) {

   let lablist =  '<div class="row labelList" id="'+lbidx+'Label">'
            +  '<div class="col-lg-8">'
            +  '<span class="badgeIconinList" style="background-color: '+lbcolor+'">'+lbnm+'</span>'
            +  '</div>'
            +  '<div class="col-lg-2">'
            + '<button class="btn-link link-gray edit" onclick="editLabel(' + lbidx +','+"'"+lbcolor+"'"+','+"'"+lbnm+"'"+')";>Edit</button>'
            +  '</div>'
            +  '<div class="col-lg-2">'
            +  '<button class="btn-link link-gray delete" onclick="deleteLabel(' + lbidx +')";>Delete</button>'
            +  '</div></div><hr>';

   $('#labelList').append(lablist);

}

   
function addColumn(obj){
   let column = '<div class="columnSection" id="'+ obj.colIdx +'Column">'
            + '<div class="columnTitle text-center mt-2 dropdown">'
            + '<h4><span>' + obj.colname + '</span>'
            + '<a href="javascript:void(0)" data-toggle="dropdown" id = "dropdownColBtn" aria-haspopup="true" aria-expanded="false" style="float: right">' 
            + '<i class="fas fa-ellipsis-v fa-sm"></i></a>'
            + '<div class="dropdown-menu" aria-labelledby="dropdownColBtn">'
            +            '<ul class="list-style-none">'
            +   '<li class="pl-3"><a href="#editColumnModal" data-toggle="modal" '
            +    'data-updatecol-id="' + obj.colIdx +'" data-upcolname-id ="'+ obj.colname + '"'   
            +   '>Edit Column</a></li>'
            +               '<li class="pl-3"><a href="#" onclick="deleteColumn(' + obj.colIdx +');">Remove Column</a></li>'
            +            '</ul>'
            +         '</div>'
            +      '</h4>'
            +   '</div>'
            +   '<ul class="connectedSortable sortableCol columnBody cursor">'
            +   '</ul>'
            + '</div>';
   
   $('#kanbanIn').append(column);
   
}

function deleteColumn(obj){
   var colIndex = obj;
   Swal.fire({
          title: '정말 삭제하시겠습니까?',
          text: '컬럼 내에 있는 이슈와 파일들이 함께 삭제됩니다.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
           $.ajax({
                 url:"DeleteColumn.do",
                 method:"POST",
                 data:{colIdx: colIndex},
                 success:function(data){
                    $("#"+colIndex+"Column").remove();
                 }
              });   
         }         
     });
}


function addKanbanIssue(colIdx,obj){
	
	//console.log("addKanbanIssue in");
	//console.log("label" + obj.labelIdx);
	//console.log(obj);
	if(obj.labelName == null) 
		obj.labelName = "";
	if(obj.assigned == null) 
		obj.assigned  = "none";
	 let issue = '<li class="issuePiece" id="'+obj.issueIdx+'Issue">'
			+		'<div class="dropdown">'
			+			'<label> <span class="badgeIcon float-left" style="background-color: '+ obj.labelColor+'">' + obj.labelName + '</span>'
			+			'<span class="issueTitle">' + obj.issueTitle + '</span>'
			+			'</label>'
			+			'<a href="javascript:void(0)" data-toggle="dropdown" id="dropdownIssueButton" aria-haspopup="true" aria-expanded="false" style="float: right">' 
			+			'<i class="fas fa-ellipsis-v fa-sm"></i></a>'
			+			'<div class="dropdown-menu" aria-labelledby="dropdownIssueButton">'
			+				'<ul class="list-style-none">'
			+					'<li class="pl-3"><a href="#" onclick="setKanbanDetail('+obj.issueIdx+');" data-toggle="modal">Detail</a></li>'
			+					'<li class="pl-3"><a href="#" onclick="deleteIssue(' + obj.issueIdx +');">Remove Issue</a></li>'
			+				'</ul>'
			+			'</div>'
			+		'</div>'
			+		'<div>'
			+			'<label>'
			+			'<span class="assigneetitle">'
			+			'<i class="fas fa-user-check"></i>&nbsp; Assignee</span> <span class="assignee">' + obj.assigned + '</span>'
			+			'</label>'
			+		'</div>'
			+	'</li>';
	
		$("#"+colIdx+"Column > .columnBody").append(issue);
	}


function deleteIssue(obj){
   var issueIndex = obj;
   console.log("issue : " + issueIndex);
   console.log()
   $.ajax({
            url:"DeleteIssue.do",
            method:"POST",
            data:{issueIdx: issueIndex},
            success:function(data){
               $("#"+issueIndex+"Issue").remove();
            }
         });   
}


function deleteLabel(labelidx) {
   $.ajax ({
      url : "DeleteLabel.do",
      method : "POST",
      data : {'labelIdx' : labelidx},
      success: function(data) {
         console.log("deleteLabel success in");
         
         $("#"+labelidx+"Label").next().remove();
           $("#"+labelidx+"Label").remove();

         
      }, error : function() {
         console.log("deleteLabel error");
            
         }
      })
   }
   
   

function setKanbanDetail(issueIdx){
	
	console.log("in setKanbanDetail     sfdsf");
	
	$.ajax({
			type: "POST",
		    url: "GetIssueDetail.do",
			data : { issueIdx : issueIdx},
			success : function (data) {
				console.log("이슈 디테일 ");
				console.log(data);
				console.log()
				$("#issueIdxNum").val(issueIdx);
				//issueProgress,labelIdx
				//issueContent, issueTitle, issueFileCount, issueFiles, issueActivityCount, issueActivity, issueCommentCount, issueComment
				//$("#closeIssueDetailBtn").attr("onclick","closeIssue("+issueIdx+")");
					if(data.issueProgress == 'OPEN')
						$("#closeIssueDetailBtn").attr("onclick","closeIssue("+issueIdx+")");
					else if (data.issueProgress == 'CLOSED')
						$("#closeIssueDetailBtn").attr("onclick","reOpenIssue("+issueIdx+")");
					
					$("#issueDetailTitle").text(data.issueTitle);
					$("#issueDetailContent").html(data.content);
					
					$("#issueDetailFiles").empty();
					$("#issueDetailFileCount").text("첨부파일 ("+data.files.length+") ");
					$.each(data.files, function(file){
						let path = "/upload/"+ projectIdx +"/file/"+file.fileName;
						console.log(path);
						let control = "<li class='mb-2' style='font-size: 16px'>"
										+ "	<a href='"+path+"' download><i class='far fa-save'></i>&nbsp;&nbsp;<span> "+file.fileName+" ("+file.fileSize+" KB)</span></a>"
										+" </li>";
						$("#issueDetailFiles").append(control);
					});
					
					$("#issueDetailActivity").empty();
					$("#issueDetailActivityCount").text("Activity ("+data.logs.length+") ");
					console.log("-------------------------");
					$.each(data.logs, function(index, log){
						//console.log(log);
						let control = "<li> "		
										+ "	<p style='padding-top: 3px;'>"
										+ "		<b> "+log.creatorName+"</b>"
										+ "		<span> "+log.log+"</span>"
										+ "		<span class='text-muted ml-4'> "+log.logTime+"</span>"
										+ "	</p>"
										+ "</li>";
						
						$("#issueDetailActivity").append(control);
					});
					
					$("#issueDetailComment").empty();
					$("#issueDetailCommentCount").text("Comment ("+data.replies.length+") ");
					$.each(data.replies, function(index, element){
						
						console.log('issue idx 뭐니?');
						
						let creatornm =  element.creator.substring(0,1);
						let control = '<div class="d-flex flex-row comment-row m-0 mb-1" id="'+element.issueRlyIdx+'Reply">'
										+ '	<div class="p-2">'
										+ '		<div class="comment_img">'+creatornm+'</div>'
										+ '	</div>'
										+ '	 <div class="comment-text w-100">'
										+ '		<h6 class="font-medium mb-2">'+element.creator
										+ '		<span class="text-muted float-right">'+element.createDate+'</span></h6>'
										+ '		<div class="mb-1" id="'+element.issueRlyIdx+'recontent">'+element.content+'</div>'
										+ '		<input type="text" class="hidden inputBox" id="'+element.issueRlyIdx+'editContent">'
										+ '		<div class="comment-footer float-right">'
										+ '		<button type="button" class="btn btn-info btn-sm" id="'+element.issueRlyIdx+'reEditBtn" onclick="editReply('+element.issueRlyIdx+', '+element.issueIdx+')">Edit</button>'
										+ '		<button type="button" class="btn btn-secondary btn-sm" id="'+element.issueRlyIdx+'reDeleteBtn" onclick="deleteReply('+element.issueRlyIdx+')">Delete</button>'
										+ '		<button type="button" class="btn btn-info btn-sm hidden" id="'+element.issueRlyIdx+'editChangeBtn">SaveChange</button>'
										+ '		<button type="button" class="btn btn-secondary btn-sm hidden replyCcBtn" id="'+element.issueRlyIdx+'editCancelBtn">Cancel</button>'
										+ '		</div>'
										+ '	</div>'
										+ '</div>';
						$("#issueDetailComment").prepend(control);
					});
					
					$("#issueDetailAssignees").text(data.assigned);
					

					if(data.labelIdx > 0){

						$("#issueDetailLabel").text(data.labelName);
						$("#issueDetailLabel").css("background-color", data.labelColor);					
					}
					else
						$("#issueDetailLabel").text("none");
					
					$("#issueDetailPriority").removeClass();
					$("#issueDetailPriority").text("");
					if(data.priorityCode != null){
						$("#issueDetailPriority").addClass("priorityBadge "+data.priorityCode.toLowerCase());
					} else{
						$("#issueDetailPriority").text("none");
					}
					if(data.dueDate != null)
						$("#issueDetailDueDate").text(data.dueDate);
					else
						$("#issueDetailDueDate").text("none");
					//console.log("이슈 프로그레스");
					//console.log(data.issueProgress);
					if(data.issueProgress == 'CLOSED')
						$("#issueClosedChk").text('Reopen issue');
					else 
						$("#issueClosedChk").text('Close issue');
		},
		error : function(){
			console.log("GetIssueDetail error");
		}
	})

	changeKanbanView("detail");
}


function closeIssue(issueIdx) {
	console.log("여기오니 closeIssue?????????????????????");

	   $.ajax({
           url:"CloseIssue.do",
           method:"POST",
           data:{issueIdx : issueIdx},
           success:function(data){
        	$("#issueClosedChk").text('Reopen issue');
        	setKanbanDetail(issueIdx);
        	setChageView("kanban");
           }
        });  		
}


function reOpenIssue(issueIdx) {
	console.log("여기오니 reOpenIssue?????????????????????");
	$.ajax({
		url:"ReopenIssue.do",
		method:"POST",
		data : {issueIdx : issueIdx},
		success:function(data) {
			console.log('reOpenIssue in');
			console.log(data);
        	$("#issueClosedChk").text('closed issue');
        	//setKanbanDetail(issueIdx);
        	setKanbanDetail(issueIdx);
        	setChageView("kanban");
		},error :function() {
			
			console.log("ReopenIssue error");
		}
		
	})
	
	
}


function changeKanbanView(view){
   if(view == "list"){
   $("#kanbanDetailBox").addClass("hidden");
   $("#kanbanEditBox").addClass("hidden");
   $("#kanbanMainBox").removeClass("hidden");
}else if(view == "detail"){
   $("#kanbanMainBox").addClass("hidden");
   $("#kanbanEditBox").addClass("hidden");
   $("#kanbanDetailBox").removeClass("hidden");
}else if (view == "edit"){
   $("#kanbanMainBox").addClass("hidden");
   $("#kanbanDetailBox").addClass("hidden");	
   $("#kanbanEditBox").removeClass("hidden");
 }else if (view == "search") {
   $('#searchBox').removeClass('hidden');
   $('#searchReturnBtn').removeClass('hidden');		
   $('#kanbanIn').addClass('hidden');
   $('#openIssueBtn').addClass('hidden');
   $('#closeIssueBtn').addClass('hidden');
   $('#-1Column').addClass('hidden');
   $('#-99Column').addClass('hidden'); 
 }else if (view == "returnlist") {
   $('#searchBox').addClass('hidden');
   $('#searchReturnBtn').addClass('hidden');
   $('#kanbanIn').removeClass('hidden');
   $('#-1Column').removeClass('hidden');
   $('#-99Column').removeClass('hidden');
   $('#openIssueBtn').removeClass('hidden');
   $('#closeIssueBtn').removeClass('hidden');	 
 }
   
   
}


function editLabel(idx, color, name) {
	
	console.log('idx뭐니 : ' + idx);
	//$('.labelList').attr('style', "background-color:#fff");
	$('.labelList').find('.edit').removeClass("hidden");

	//$('#labelList').$('#'+idx+'Label').removeAttr('style');
	//editIdx = idx;
	$('#addLabelBtn').addClass("hidden");
	$('#editLabelBtn').removeClass("hidden");
	$('#backBtn').removeClass("hidden");
	
	$('#labelcolor').val(color);
	$('#labelname').val(name);
	$('#colorform').find('.asColorPicker-trigger').find('span').css('background-color', color);

	//$('#'+idx+'Label').attr('style', "background-color:#CBD7E3");
	
	$('#'+idx+'Label').find('.edit').addClass("hidden");
	//css('display', 'none');
	
	};
	
	
	function deleteReply(replyIdx) {
		   $.ajax ({
		      url : "DeleteReply.do",
		      method : "POST",
		      data : {'issuerlyidx' : replyIdx},
		      success: function(data) {
		         console.log("deleteReply success in");
		         
		           $("#"+replyIdx+"Reply").remove();
  
		      }, error : function() {
		         console.log("deleteLabel error"); 
		         }
		      })
		   }	
	
	
	function editReply(issueRlyIdx, issueIdx){
		
		$('#'+issueRlyIdx+'recontent').hide(); //본 댓글
		$('#'+issueRlyIdx+'editContent').removeClass('hidden');// 변경댓글
		$('#'+issueRlyIdx+'reEditBtn').addClass("hidden"); //EDIT 버튼 
		$('#'+issueRlyIdx+'reDeleteBtn').addClass("hidden"); //Delete 버튼 
		$('#'+issueRlyIdx+'editChangeBtn').removeClass('hidden'); //saveChange 버튼
		$('#'+issueRlyIdx+'editCancelBtn').removeClass('hidden'); //cancel 버튼 
		
		let recontent= $('#'+issueRlyIdx+'recontent').text();
		
		$('#'+issueRlyIdx+'editContent').val(recontent);
		
		$('#'+issueRlyIdx+'editChangeBtn').click ( function() {
			
			let changecontent = $('#'+issueRlyIdx+'editContent').val();

			$.ajax({
				url : "EditReply.do",
			    method : "POST",
			    data : {'issueRlyIdx' : issueRlyIdx, 'content' : changecontent},
			    success : function(data) {
			    	setKanbanDetail(issueIdx);
			    	
			    }, error : function() {
			    	console.log('editReply in');
			    }
			})
		})
				
		
			$('.replyCcBtn').click(function() {
					setKanbanDetail(issueIdx);
			});

	}
	

	function getLabelList(flagelement,projectIdx) {
			
		  $.ajax({
				url : 'GetLabelList.do',
				data : {'projectIdx' : projectIdx},
				success : function(data) {
					console.log("Showlabel success");
					console.log(data);
					$('#labelList').empty();
					$('#labelIdx').empty();

					if(flagelement == "ShowLabelList") {
						let lablist = ""; //Make 라벨 부분에서 라벨 목록 보여줄 것 
				
						$.each(data,function(index, obj) {
					
							lablist +=  '<div class="row labelList" id="'+obj.labelIdx+'Label">';
							lablist +=  '<div class="col-lg-8">';
							lablist +=  '<span class="badgeIconinList" style="background-color: '+obj.labelColor+'">'+obj.labelName+'</span>';
							lablist +=  '</div>';
							lablist +=  '<div class="col-lg-2">';
							lablist +=  '<button class="btn-link link-gray edit" onclick="editLabel(' + obj.labelIdx +','+"'"+obj.labelColor+"'"+','+"'"+obj.labelName+"'"+')";>Edit</button>';
							lablist +=  '</div>';
							lablist +=  '<div class="col-lg-2">';
							lablist +=  '<button class="btn-link link-gray delete" onclick="deleteLabel(' + obj.labelIdx +')";>Delete</button>';
							lablist +=  '</div></div><hr>';
					});

							$('#labelList').append(lablist);
						
					}else if(flagelement == "SearchLabelList") {  //Search부분에서 Label List 보여주는 부분 
				
						var labellist = '<datalist id="LabelMenu">';
				
						$.each(data,function(index, obj) {
							//console.log('지금 each문 타니?');
							//console.log(obj)
							//console.log('obj.labelIdx : ' + obj.labelIdx);
							//console.log('obj.labelName : ' +  obj.labelName);
							labellist += '<option value="'+obj.labelName+'" data-id="'+obj.labelIdx+'"></option>';	
				});
						//console.log('labellist뭐니');
						//console.log(labellist);
				 	
						labellist += '</datalist>';

						$('#searchContent').append(labellist);
			}
			
			},error : function() {
					console.log("Showlabel error");
					
			}
		  });
		}
	
	

	
	