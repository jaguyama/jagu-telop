
const LOCAL_STRAGE_KEY="jaguyama-telop"
function getUrlQueries() {
    var queryStr = window.location.search.slice(1);  // 文頭?を除外
    queries = {};
    // クエリがない場合は空のオブジェクトを返す
    if (!queryStr) {
        return queries;
    }

    // クエリ文字列を & で分割して処理
    queryStr.split('&').forEach(function(queryStr) {
        // = で分割してkey,valueをオブジェクトに格納
        var queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });

    return queries;
}


function  telopInit(e){
    const queries=getUrlQueries();
    let telopData=JSON.parse(localStorage.getItem(LOCAL_STRAGE_KEY));
    let key=queries["key"];
    
    let text=telopData.find((d)=>(d.key==key))?telopData.find((d)=>(d.key==key)).text:`key"${queries["key"]}"を確認してください`;
    document.getElementById("telop").textContent=text;
}

function  telopUpdate(e){
    const queries=getUrlQueries();
    let telopData=JSON.parse(localStorage.getItem(LOCAL_STRAGE_KEY));
    let key=queries["key"];
    
    let text=telopData.find((d)=>(d.key==key))?telopData.find((d)=>(d.key==key)).text:`key"${queries["key"]}"を確認してください`;
    let telop=document.getElementById("telop");




    if(telop.textContent!=text){
        let setIntro=function(e){
            let initClass=function(e){
                telop.className="";
                telop.removeEventListener("animationend",initClass);
            }  
            telop.className="intro";
            telop.textContent=text;
            telop.removeEventListener("animationend",setIntro);
            telop.addEventListener("animationend",initClass);
        }
        window.requestAnimationFrame((time)=>{
            window.requestAnimationFrame((time)=>{
                telop.className="outro";
                telop.addEventListener("animationend",setIntro);
            });
        });
    };
    
}

window.onload=telopInit;
window.onstorage=telopUpdate;
