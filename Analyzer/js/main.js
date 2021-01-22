$(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
 
 var fileList = [];
 var fileList_video = [];

 var t= $('#table_id').DataTable();
 var d = $('#detected').DataTable();
 var v = $('#table_video').DataTable();

 function renderFileList_video() {	
  var data = []
 
  fileList_video.forEach(element => {
  data.push([element[0].name,element[0].type, 
    Math.round(element[0].size/1024),
  ' <a href="#" onclick="del_video('+fileList_video.indexOf(element)+')" id="delete" style="margin-left : 5px ; margin-right :5px; font-size : 13px ; "> <i class="far fa-trash-alt"></i> </a> <a href="#" onclick="preview('+fileList_video.indexOf(element)+')" id="preview"  data-toggle="modal" data-target="#basicExampleModal" style="margin-left : 5px ; margin-right :5px; font-size : 13px ; "> <i class="far fa-image"></i> </a> <a href="#" id="upload"   style="margin-left : 5px ; margin-right :5px; font-size : 13px ; "> <i class="fas fa-cloud-upload-alt"></i> </a>',
  element[1]
])
v.clear().draw();
  
    data.forEach (data_elemnt => {
      v.row.add( [
        data.indexOf(data_elemnt)+1,
        data_elemnt[4],
        data_elemnt[0],
        data_elemnt[1],
        data_elemnt[2],
        data_elemnt[3]
      ] ).draw( true );
    }) ; 
    
  });
  
}
 
 function renderFileList() {	
  var data = []
 
  fileList.forEach(element => {
  data.push([element[0].name,element[0].type, 
    Math.round(element[0].size/1024),
  ' <a href="#" onclick="del('+fileList.indexOf(element)+')" id="delete" style="margin-left : 5px ; margin-right :5px; font-size : 13px ; "> <i class="far fa-trash-alt"></i> </a> <a href="#" onclick="preview_img('+fileList.indexOf(element)+')" id="preview"  data-toggle="modal" data-target="#basicExampleModal" style="margin-left : 5px ; margin-right :5px; font-size : 13px ; "> <i class="far fa-image"></i> </a> <a href="#" id="upload"   style="margin-left : 5px ; margin-right :5px; font-size : 13px ; "> <i class="fas fa-cloud-upload-alt"></i> </a>',
  element[1]
])
  t.clear().draw();
  
    data.forEach (data_elemnt => {
      t.row.add( [
        data.indexOf(data_elemnt)+1,
        data_elemnt[4],
        data_elemnt[0],
        data_elemnt[1],
        data_elemnt[2],
        data_elemnt[3]
      ] ).draw( true );
    }) ; 
    
  });
  
}

//video upload function 
function video_file () {
  /*var fileCatcher = document.getElementById('file-catcher');*/
  
  var fileInput = document.getElementById('file-input-video');
 
  /* , sendFile*/;
  /*fileCatcher.addEventListener('submit', function (evnt) {
  	evnt.preventDefault();
    fileList.forEach(function (file) {
    	sendFile(file);
    });
  });*/
    
  	for (var i = 0; i < fileInput.files.length; i++) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() ;
      var dateTime = date+'<br>'+time;
      var reader = new FileReader();
      const acceptedImageTypes = ['video/mp4', 'video/webm'];
      if(acceptedImageTypes.includes(fileInput.files[i]['type']) == false )
      {
        document.getElementById('feedback').innerText = 'Please Upload a Valid Video Type'  ;      
        break ;
      }
      else{
        document.getElementById('feedback').innerText = ''        ;
        fileList_video.push([fileInput.files[i],dateTime]);
      }
    
    }
    renderFileList_video();

 
 /* sendFile = function (file) {
  	var formData = new FormData();
    var request = new XMLHttpRequest();
 
    formData.set('file', file);
    request.open("POST", 'https://jsonplaceholder.typicode.com/photos');
    request.send(formData);
  };*/
}

//image upload function 
function image_file () {
	/*var fileCatcher = document.getElementById('file-catcher');*/
  var fileInput_image = document.getElementById('file-input');
  /* , sendFile*/;
  /*fileCatcher.addEventListener('submit', function (evnt) {
  	evnt.preventDefault();
    fileList.forEach(function (file) {
    	sendFile(file);
    });
  });*/
   
 
  	for (var i = 0; i < fileInput_image.files.length; i++) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() ;
      var dateTime = date+'<br>'+time;
      var reader = new FileReader();
      const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if(acceptedImageTypes.includes(fileInput_image.files[i]['type']) == false )
      {
        document.getElementById('feedback').innerText = 'Please Upload a Valid Image Type'  ;      
        break ;
      }
      else{
        document.getElementById('feedback').innerText = ''        ;
        fileList.push([fileInput_image.files[i],dateTime]);
      }
    
    }
    renderFileList();

  }
 /* sendFile = function (file) {
  	var formData = new FormData();
    var request = new XMLHttpRequest();
 
    formData.set('file', file);
    request.open("POST", 'https://jsonplaceholder.typicode.com/photos');
    request.send(formData);
  };*/
 



//preview image 
function preview_img (i) {
  var modal_image = document.getElementById('preview_image');
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    modal_image.src = reader.result;
  }, false);
  if (fileList[i][0]) {
    reader.readAsDataURL(fileList[i][0]);
  }
}
//preview video 
function preview (i) {
  var modal_video = document.getElementById('preview_video');
  
 
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    modal_video.src = reader.result;
  }, false);
  if (fileList_video[i][0]) {
    reader.readAsDataURL(fileList_video[i][0]);
  
 
 
}
}




//delete image 
function del (i) {

fileList.splice(i, 1) ; 
if(fileList.length == 0)
{
  t.clear().draw();
}
else
{
  renderFileList();
}
}

//delete video 
function del_video (i) {

  fileList_video.splice(i, 1) ; 
  if(fileList_video.length == 0)
  {
    v.clear().draw();
  }
  else
  {
    renderFileList_video();
  }
  }

var ctx = document.getElementById('myChart2');
if (ctx != null) 
{


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Orange'],
        datasets: [{
            label: 'Profiles',
            data: [12, 19, 3, 5, 2, 3,1],
            backgroundColor: [
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)'
            ],
            borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1,fill:false
        },
        {
          label: 'Users',
          data: [6, 9, 13, 5, 12, 3],
          backgroundColor: [
              'rgba(14,14,15)',
              'rgba(14,14,15)',
              'rgba(14,14,15)',
              'rgba(14,14,15)',
              'rgba(14,14,15)',
              'rgba(14,14,15)'
          ],
          borderColor: [
              'rgba(255,0 , 0, 1)',
              'rgba(255,0 , 0, 1)',
              'rgba(255,0 , 0, 1)',
              'rgba(255,0 , 0, 1)',
              'rgba(255,0 , 0, 1)',
              'rgba(255,0 , 0, 1)',
              
          ],
          borderWidth: 1,fill:false
      }]
    },
    options: {
      responsive : true
      ,
      title: {
        display: true,
        text: 'Numbers by Region',
        fontColor : '#fff',
        fontStyle	 : 'normal' , 
        fontSize : 18
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

var  station = [15,9,7,15,8,9,16,3,1,24,7,8,19,3,28,7,32,5,17,40,38,22,5,7]
//map function 
var paths = document.querySelectorAll('.map_img path') ;
paths.forEach(function(path)
{
  
  path.addEventListener('click', function(e) {
    clear() ; 
    document.getElementById('text').style.visibility = "visible" ; 
    var value = station[Math.floor(Math.random() * 25)];
    var text = "Region : <span>"+path.attribute[3].value+" </span> <br>Number of station:        <span>"+value+"</span>" ; 
    path.setAttribute("class","active") ; 
    document.getElementById('text').innerHTML=text ; 
  })
}); 

function clear() {
  paths.forEach(function(path)
{
path.removeAttribute('class') ; 
})
}


if (document.getElementById('myChart1') != null) 
{
  var ctx = document.getElementById('myChart1');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Female', 'Male'],
        datasets: [{
            label: '# of Votes',
            data: [12,5],
            backgroundColor: [
                'rgba(14,14,15)',
                'rgba(14,14,15)'
            ],
            borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      
      title: {
        display: true,
        text: 'Users by Gender',
        fontColor : '#fff',
        fontStyle	 : 'normal' , 
        fontSize : 13
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

if (document.getElementById('myChart3') != null) 
{
  var ctx = document.getElementById('myChart3');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Female', 'Male'],
        datasets: [{
            label: '# of Votes',
            data: [12,5],
            backgroundColor: [
                'rgba(14,14,15)',
                'rgba(14,14,15)'
            ],
            borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      
      title: {
        display: true,
        text: 'Profile by Gender',
        fontColor : '#fff',
        fontStyle	 : 'normal' , 
        fontSize : 13
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}
if (document.getElementById('myChart4') != null) 
{
  var ctx = document.getElementById('myChart4');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['18-25', '26-35', '36-45', '46-55', '56-65' , '66-75' , '76-oo'],
        datasets: [{
            label: 'Age',
            data: [12,5,17,5,9,6,3,26],
            backgroundColor: [
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)',
                'rgba(14,14,15)'
            ],
            borderColor: [
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      
      title: {
        display: true,
        text: 'Profile by Age',
        fontColor : '#fff',
        fontStyle	 : 'normal' , 
        fontSize : 13
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}