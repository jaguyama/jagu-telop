
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
    
    let fontFamily=telopData.find((d)=>(d.key==key))?telopData.find((d)=>(d.key==key)).fontFamily:"";
    let fontSize=telopData.find((d)=>(d.key==key))?telopData.find((d)=>(d.key==key)).fontSize:"";
    let intro=telopData.find((d)=>(d.key==key))?telopData.find((d)=>(d.key==key)).intro:"";
    let outro=telopData.find((d)=>(d.key==key))?telopData.find((d)=>(d.key==key)).outro:"";

     let telopElm=document.getElementById("telop");
    let telopRenderCSS;
    for(const v of document.styleSheets){
        if(v["title"]=="telopRenderCSS"){
            telopRenderCSS=v;
//            console.log(v);
        }
    } 
    for(const v of telopRenderCSS.cssRules){
        if(v.selectorText==".intro"){
            v.style.setProperty("--intro-name",intro);
        }
        if(v.selectorText==".outro"){
//            v.style.setProperty("--outro-name",intro);
        }
        if(v.selectorText=="#telop"){
            v.style.setProperty("--font-name",fontFamily);
            v.style.setProperty("--font-size",fontSize);
        }
    }

    for(const v of document.styleSheets){
        if(v["title"]=="telopRenderCSS"){
            console.log(v);
        }
    } 

    if(telopElm.textContent!=text){
        let setIntro=function(e){
            let initClass=function(e){
                telopElm.className="";
                telopElm.removeEventListener("animationend",initClass);
            }  
            telopElm.className="intro";
            telopElm.textContent=text;
            telopElm.removeEventListener("animationend",setIntro);
            telopElm.addEventListener("animationend",initClass);
        }
        window.requestAnimationFrame((time)=>{
            window.requestAnimationFrame((time)=>{
                telopElm.className="outro";
                telopElm.addEventListener("animationend",setIntro);
            });
        });
    };
    
}

window.onload=telopInit;
window.onstorage=telopUpdate;
