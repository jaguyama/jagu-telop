function generateTelopHTML(telopText){
    return `
    <div id="telop">
        ${telopText}
    </div>
    `;
}

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
    let placeholder=document.getElementById("place-holder");
    let telopRenderCSS;

    function setNewTelop(){
        for(const v of document.styleSheets){
            if(v["title"]=="telopRenderCSS"){
                telopRenderCSS=v;
            }
        } 
        for(const v of telopRenderCSS.cssRules){
            if(v.selectorText==".intro"){
                v.style.setProperty("--intro-name",intro);
            }
            if(v.selectorText==".outro"){
                v.style.setProperty("--outro-name",outro);
            }
            if(v.selectorText=="#telop"){
                v.style.setProperty("--font-name",fontFamily);
                v.style.setProperty("--font-size",fontSize);
            }
        }
        placeholder.insertAdjacentHTML("afterbegin",generateTelopHTML(text));
        telopElm=document.getElementById("telop");
    }

    let initClass=function(e){
        telopElm.className="";
        telopElm.removeEventListener("animationend",initClass);
    }

    let initTelop=function(e){
        setNewTelop();
        telopElm.className="intro";
        telopElm.addEventListener("animationend",initClass);
    }

    let refreshTelop=function(e){
        telopElm.remove();
        initTelop();
    }

    let setOutro=function(e){
        telopElm.className="outro";
        telopElm.addEventListener("animationend",refreshTelop);
    }

    if(!telopElm){
        initTelop()
    }else if(telopElm.textContent!=text){
        window.requestAnimationFrame(()=>{
            window.requestAnimationFrame(setOutro);
        });
    };
    
}

window.onload=telopUpdate;
window.onstorage=telopUpdate;
