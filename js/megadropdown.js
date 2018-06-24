$(function(){
    var sub=$('#sub');
    var activeRow;//选中的行
    var activeMenu;//选中的行对应的二级菜单
    var timer;//setTimeout返回的计时器id
    var mouseInSub=false;//当前鼠标是否在子菜单里
    sub.on('mouseenter',function(e){
      mouseInSub=true;
    }).on('mouseleave',function(e){
      mouseInSub=false;
    });
 
    //创建数组，记录
    var mouseTrack=[];//数组跟踪记录鼠标的位置
    var moveHandler=function(e){//鼠标离开菜单时，需要对绑定在document上的mousemove事件解绑,以免影响页面中其他组件，所以将事件监听函数独立出来，方便后续解绑操作
      mouseTrack.push({
        x:e.pageX,
        y:e.pageY
      });
      if(mouseTrack.length>3){
        mouseTrack.shift();
      }
    };
    $('#test')
      .on('mouseenter',function(e){
        //sub.removeClass('none');
 
        $(document).bind('mousemove',moveHandler);//mousemove事件一般绑定在document上
      })
      .on('mouseleave',function(e){
        sub.addClass('none');//鼠标移动到一级菜单时，二级菜单隐藏
 
        if(activeRow){//鼠标离开一级菜单，如果存在激活的行，样式要去掉，并把变量置空
          activeRow.removeClass('active');
          activeRow=null;
        }
        if(activeMenu){
          activeMenu.addClass('none');
          activeMenu=null;
        }
 
        $(document).unbind('mousemove',moveHandler);
      })
      .on('mouseenter','li',function(e){//一级菜单的列表项绑定事件
        sub.removeClass('none');//鼠标移动到一级菜单时，二级菜单显示
        if(!activeRow){//移过去没有激活的一级菜单
          activeRow=$(e.target);
          activeRow.addClass('active');
 
          activeMenu=$('#'+activeRow.data('id'));
          activeMenu.removeClass('none');
          return;
        }
        //debounce:mouseenter频繁触发时，只执行最后一次
        if(timer){
          clearTimeout(timer);
        }
        console.log(mouseTrack)
        var currMousePos=mouseTrack[mouseTrack.length-1];
        var leftCorner=mouseTrack[mouseTrack.length-2];
        var delay=needDelay(sub,leftCorner,currMousePos);//是否需要延迟
        if(delay){//如果在三角形内，需要延迟
          timer=setTimeout(function(){
            if(mouseInSub){
              return;
            }
            activeRow.removeClass('active');
            activeMenu.addClass('none');
 
            activeRow=$(e.target);
            activeRow.addClass('active');
            activeMenu=$('#'+activeRow.data('id'));
            activeMenu.removeClass('none');
            timer=null;//事件触发时，如果计时器并没有执行，就把它清掉，这样能保证事件触发停止时，会执行最后一次，而其他的都会被忽略
          },300);
        }else{
          var prevActiveRow=activeRow;
          var prevActiveMenu=activeMenu;
 
          activeRow=$(e.target);
          activeMenu=$('#'+activeRow.data('id'));
 
          prevActiveRow.removeClass('active');
          prevActiveMenu.addClass('none');//上一次二级菜单隐藏
          activeRow.addClass('active');
          activeMenu.removeClass('none');//上一次二级菜单显示
        }
      });
 
  });