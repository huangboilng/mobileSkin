
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;


/**
 * ����ˢ�� ���Զ���ʵ�ִ˷�����
 * myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·���
 */
var p=2;
function pullDownActionhl () {
	
		$.ajax({
             type: "get",
             async: false,
             url: "http://www.57lehuo.com/index.php?a=index&m=api&method=itemsSearchGet&keyword=����ȹ&p="+p+"",
             dataType: "jsonp",
             jsonp: "callback",
             jsonpCallback:"itemsSearchGet",
             success: function(json){	
				 var content='';
                  $.each( json['result'], function(i, n){					  	
				  	var url=n.url!='undefined'?n.url:'';
					var bimg=n.bimg!='undefined'?n.bimg:'';
					var title=n.title!='undefined'?n.title:'';
				    content = content + "<li>";
				    content = content + "<a target=\"_blank\" href=\"http://s.click.taobao.com/t?e=zGU34CA7K%2BPkqB05%2Bm7rfGGjlY60oHcc7bkKOQiRddrNEyGLx31dnc6%2Fz%2BaQS2UNDUWpebTcEEjBuk1W5odmLS8%3D&pid=mm_30949159_0_0\">";
					content = content + "<img src=\""+bimg+"_100x100.jpg\" />";
					content = content + "<h2>";
					content = content + "����ȹ";
					content = content + "</h2>";
					content = content + "<p>";
					content = content + title;
					content = content + "</p>";				
					content = content + "</a>";
					content = content + "</li>";
				});				
				$("#thelist").prepend(content).listview('refresh');
				
             },
             error: function(){
             }
         });		
		p++;	
		
		myScroll.refresh();
}


/**
 * ����ˢ�� ���Զ���ʵ�ִ˷�����
 * myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·���
 */
function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var i;
		for (i=0; i<3; i++) {
			$("#thelist").prepend("<li>������ҳ����" + (++generatedCount) +"</li>");
		}
		
		myScroll.refresh();		//���ݼ�����ɺ󣬵��ý�����·���   Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * ������ҳ ���Զ���ʵ�ִ˷�����
 * myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·���
 */
function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var i;

		for (i=0; i<3; i++) {
			$("#thelist").append("<li>������ҳ����" + (++generatedCount) +"</li>");
		}
		
		myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·��� Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * ��ʼ��iScroll�ؼ�
 */
function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar', /* ��Ҫ��ʽ */
		useTransition: false, /* �����Բ�֪���⣬���˴�true��Ϊfalse */
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '����ˢ��...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '�������ظ���...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '���ֿ�ʼ����...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '����ˢ��...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '���ֿ�ʼ����...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '�������ظ���...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '������...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '������...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//��ʼ����iScroll�ؼ� 
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false); 