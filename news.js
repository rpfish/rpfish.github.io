
var Storage = window.localStorage;
var  page=0, sum;
var obj1, obj2;
var url1 = "https://rawgit.com/rpfish/rpfish.github.four.io/master/url.json";
var url2 ="https://rawgit.com/rpfish/rpfish.github.four.io/master/comments%20.json";

    


function NextPage()
{

	number+=1;
	if (number>=obj1.photo.length)
		number=0;
	document.getElementById("newsphoto").innerHTML=("<img src='img/"+obj1.photo[number].url+"'>"+"<h2>"+obj1.photo[number].news+"</h2>");
	Storage.number=number;
}

function PreviousPage()
{
	number-=1;
	if (number<0)
		number=obj1.photo.length-1;
	document.getElementById("newsphoto").innerHTML=("<img src='img/"+obj1.photo[number].url+"'>"+"<h2>"+obj1.photo[number].news+"</h2>");
	Storage.number=number;

}


function scroll()
{
	var second=5000;
	setInterval('NextPage()',second);	
}

function showphoto()
{
	document.getElementById("newsphoto").innerHTML=("<img src='img/"+obj1.photo[number].url+"'>"+"<h2>"+obj1.photo[number].news+"</h2>");
	scroll();
}

function NextComPage()
{
	if (page+1>=sum)
	{
		alert("已经是最后一页");
	}
	else
	{
		page+=1;
		showcomments();
	}
}

function PreviousComPage()
{
	if (page<=0)
	{
		alert("已经是第一页");
	}
	else
	{
		page-=1;
		showcomments();
	}

}

function showcomments()
{
   var s="";
   
   sum=(obj2.comments.length)/5;
   for (var i=0; i<5; i++)
	if (i+page*5<obj2.comments.length)
	{
		s+="<li><h2>"+(i+page*5+1)+"楼"+"</h2>"
			   +"<p>"+obj2.comments[i+page*5].name+"</p>"
			   +"<p>&nbsp;&nbsp;"+obj2.comments[i+page*5].statement+"</p>"
			   +"<p>&nbsp;&nbsp;"+obj2.comments[i+page*5].time+"</p>"+"</li>";
	} 
   
   document.getElementById("comments").innerHTML=s;
}

function processData1(data) 
{
	  obj1=data;
	  showphoto();
}

function handler1() 
{
    if (this.readyState == this.DONE) 
    {
      if (this.status == 200) 
	{
        try {
          processData1(JSON.parse(this.responseText));
        } catch(ex) {
          console.log(ex.message);
        }
      }
    }
}

function ajax1() 
{
    var client = new XMLHttpRequest();
    client.onreadystatechange = handler1;
    client.open('GET', url1);
    client.send();
}

function processData2(data) 
{
	  obj2=data;
	  showcomments();
}

function handler2() 
{
    if (this.readyState == this.DONE) 
    {
      if (this.status == 200) 
	{
        try {
          processData2(JSON.parse(this.responseText));
        } catch(ex) {
          console.log(ex.message);
        }
      }
    }
}

function ajax2() 
{
    var client = new XMLHttpRequest();
    client.onreadystatechange = handler2;
    client.open('GET', url2);
    client.send();
}



function showNews()
{
	if (Storage.number==undefined)
		number=0;
	else
		number=parseInt(Storage.number);
	ajax1();
	ajax2();
}