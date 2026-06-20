function evaluateFunction(expr,x){
return math.evaluate(expr,{x:x});
}

function forward(expr,x,h){
return (
evaluateFunction(expr,x+h)
-
evaluateFunction(expr,x)
)/h;
}

function backward(expr,x,h){
return (
evaluateFunction(expr,x)
-
evaluateFunction(expr,x-h)
)/h;
}

function central(expr,x,h){
return (
evaluateFunction(expr,x+h)
-
evaluateFunction(expr,x-h)
)/(2*h);
}

function divided(expr,x,h){
return (
evaluateFunction(expr,x+h)
-
evaluateFunction(expr,x)
)/h;
}

function calculate(){

let expr=document.getElementById("function").value;

let x=parseFloat(
document.getElementById("xvalue").value
);

let h=parseFloat(
document.getElementById("hvalue").value
);

let method=
document.getElementById("method").value;

let result=0;

if(method==="forward")
result=forward(expr,x,h);

if(method==="backward")
result=backward(expr,x,h);

if(method==="central")
result=central(expr,x,h);

if(method==="divided")
result=divided(expr,x,h);

const derivative=
math.derivative(expr,"x");

const exact=
derivative.evaluate({x:x});

const error=
Math.abs(exact-result);

document.getElementById(
"derivativeCard"
).innerHTML=result.toFixed(6);

document.getElementById(
"exactCard"
).innerHTML=exact.toFixed(6);

document.getElementById(
"errorCard"
).innerHTML=error.toFixed(6);

document.getElementById(
"methodCard"
).innerHTML=method;

drawFunctionGraph(expr,x);

drawErrorGraph(expr,x,exact);

createComparison(expr,x,h,exact);
}
/* ---------- FUNCTION GRAPH ---------- */

function drawFunctionGraph(expr, x){

    let xs = [];
    let ys = [];

    for(let i=x-5;i<=x+5;i+=0.1){

        xs.push(i);

        ys.push(
            evaluateFunction(expr,i)
        );
    }

    Plotly.newPlot(
        "functionGraph",
        [{
            x: xs,
            y: ys,
            mode: "lines",
            name: "Function"
        }],
        {
            paper_bgcolor:"#1E293B",
            plot_bgcolor:"#1E293B",
            font:{color:"white"},
            title:"Function Visualization"
        }
    );
}


/* ---------- ERROR GRAPH ---------- */

function drawErrorGraph(expr,x,exact){

    let hValues =
    [1,0.5,0.1,0.01,0.001];

    let errors=[];

    hValues.forEach(h=>{

        let approx=
        central(expr,x,h);

        errors.push(
            Math.abs(exact-approx)
        );

    });

    Plotly.newPlot(
        "errorGraph",
        [{
            x:hValues,
            y:errors,
            mode:"lines+markers"
        }],
        {
            paper_bgcolor:"#1E293B",
            plot_bgcolor:"#1E293B",
            font:{color:"white"},
            title:"Error vs Step Size"
        }
    );
}


/* ---------- COMPARISON TABLE ---------- */

function createComparison(
expr,
x,
h,
exact
){

    let f=
    forward(expr,x,h);

    let b=
    backward(expr,x,h);

    let c=
    central(expr,x,h);

    let d=
    divided(expr,x,h);

    document.getElementById(
    "comparisonBody"
    ).innerHTML=`

<tr>
<td>Forward</td>
<td>${f.toFixed(6)}</td>
<td>${Math.abs(exact-f).toFixed(6)}</td>
</tr>

<tr>
<td>Backward</td>
<td>${b.toFixed(6)}</td>
<td>${Math.abs(exact-b).toFixed(6)}</td>
</tr>

<tr>
<td>Central</td>
<td>${c.toFixed(6)}</td>
<td>${Math.abs(exact-c).toFixed(6)}</td>
</tr>

<tr>
<td>Divided</td>
<td>${d.toFixed(6)}</td>
<td>${Math.abs(exact-d).toFixed(6)}</td>
</tr>

`;
}