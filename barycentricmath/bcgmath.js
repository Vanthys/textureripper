
function isInsideTriangle(p,t){
    a = t[0]
    b = t[1]
    c = t[2]
    
    area2 = (a[0]*b[1] - a[0]*c[1] + b[0]*c[1] - b[0]*a[1] + c[0]*a[1] -c[0]*b[1]);
    //area2 = area2 < 0 ? -1*area2 : area2;

    m1 = ((b[0] - p[0])*(c[1]-p[1])-(c[0]-p[0])*(b[1]-p[1]))/area2;
    m2 = ((c[0] - p[0])*(a[1]-p[1])-(a[0]-p[0])*(c[1]-p[1]))/area2;
    m3 = 1-m1-m2;

    return (0 <= m1 && m1 <= 1) && (0 <= m2 && m2 <= 1) && (0 <= m3 && m3 <= 1);

}


console.log(isInsideTriangle([0.1,5 ],[[0,0],[0,5],[5,5]]));