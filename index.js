let is_dev = location.hostname === "localhost" || location.hostname === "127.0.0.1";

function onLoaded(){
    document.getElementById("check_btn").addEventListener("click", async function () {
        
        const is_en = document.getElementById("is_en").checked;

        let regex = document.getElementById("regex").value;
        let text = document.getElementById("string").value;

        regex = await transformLogicRegexToJSRegex(regex);
        let re = new RegExp(regex, 'g');
        log(re)

        let result = text.match(re);
        log(result)

        let answer = is_en ? result ? "Match found" : "Match not found" : result ? "Regulärer Ausdruck passt" : "Passt nicht";

        document.getElementById("result").innerHTML = answer;

    });

    document.getElementById("is_dev").addEventListener("click", function () {
        is_dev = document.getElementById("is_dev").checked;
        console.log("is_dev: " + is_dev)
    });
}

function log(msg){
    if(is_dev){
        console.log(msg);
    }
}

function transformLogicRegexToJSRegex(logicalRegex){
    // or: a|b
    // concat: ab
    // repeat: a*
    // brackets: (a)
    // once or never: a?
    // once or more: a+
    // kleene star: a*
    // exactly n times: a{n}
    // at least n times: a{n,}
    // at least n but not more than m times: a{n,m}
    log(logicalRegex)
    let regex = logicalRegex.replace(/\[/g, '\[')
                            .replace(/\]/g, '\]')
                            .replace(/\^/g, '\^')
    regex = "^" + regex + "$"
    log(regex)
    return regex;


}


