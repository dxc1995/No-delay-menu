 //二进制的正负表示是在最高位，1表示负，0表示正，抑或运算是仅当对应的2位有一位为1时才返回1,反过来如果抑或运算返回的结果是0（正），则一定是2个1，或者2个0.反之，则是一个0，一个1
  function sameSign(a,b){
    return (a^b)>=0;
  }
  //向量的定义
  function vector(a,b){
    return {
      x:b.x-a.x,//终点的坐标减去起点的坐标
      y:b.y-a.y
    }
  }
  //向量叉乘公式
  function vectorProduct(v1,v2){
    return v1.x*v2.y-v2.x*v1.y
  }
  //叉乘判断方法
  function isPointInTrangle(p,a,b,c){//p：鼠标当前点的坐标，a:鼠标上一次的坐标，b,c：二级菜单上下边缘坐标
    var pa=vector(p,a);
    var pb=vector(p,b);
    var pc=vector(p,c);
 
    var t1=vectorProduct(pa,pb);
    var t2=vectorProduct(pb,pc);
    var t3=vectorProduct(pc,pa);
 
    return sameSign(t1,t2)&&sameSign(t2,t3);
  }
 
  function needDelay(elem,leftCorner,currMousePos){//用offset方法获取上下边缘
    var offset=elem.offset();
 
    var topLeft={
      x:offset.left,
      y:offset.top
    };
 
    var bottomLeft={
      x:offset.left,
      y:offset.top+elem.height()
    };
    return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft)
  }