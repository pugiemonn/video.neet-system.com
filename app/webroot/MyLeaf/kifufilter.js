 function SGFsplit(SGF){
    var index=0;
    var i=0;
    var j=0;
    Element = new Array;

    prop= SGF.match(/[A-Z]+(\s*\[([^\]]*\\\])*[^\]]*\])+|\(|\)|\;/);
    //property or '(' or ')' or ';'
    while(prop!=null){
       PROP=prop[0]
       i=SGF.indexOf(PROP);
       if(i>0){
          Element[index] = SGF.substr(0,i);
          index++;
          SGF=SGF.substr(i);
       }else if(i==0){
          Element[index] = PROP;
          index++;
          SGF=SGF.substr(i+PROP.length);
       }
       prop= SGF.match(/[A-Z]+(\s*\[([^\]]*\\\])*[^\]]*\])+|\(|\)|\;/);
    }
    if(SGF!=''){
       Element[index]=SGF;
    }
    return(Element);
 }
 
 //---------------------------------------------------------
 function contractMK(inputSGF){
    var i=0;
    var n=0;
    var MK='';
    var outputSGF='';

    SGFelement=SGFsplit(inputSGF);
    n=SGFelement.length;
    for (i=0; i<n; i++){
       if(SGFelement[i].search(/\(|\)|\;/)==0){
          //Node end
          if(MK!=''){
             outputSGF += MK+']';
          }
          MK='';
          outputSGF += SGFelement[i];
       }else if(SGFelement[i].search( /MK\s*\[.*\]$/ )==0){
          if(MK==''){ 
             MK=SGFelement[i].replace(/\]$/,'');
          }else{
             MK+=','+SGFelement[i].replace(/\]$/,'').replace( /MK\s*\[/,'')
          }
       }else{
          outputSGF += SGFelement[i];
       }
    }
    return(outputSGF);
 }
 //---------------------------------------------------------
 function MarkupProp2MK(PROP){
    var i=0;
    var xy='';
    returnTXT=PROP;

    if(PROP.search( /LB\s*\[[a-z]{2}\:[^\]]*\]/ )==0){
       returnTXT='MK[';
       value = PROP.match( /\[[a-z]{2}\:[^\]]*\]/);
       while(value!=null){
          VALUE=value[0];
          i=PROP.indexOf(VALUE);
          xy=VALUE.substr(1,2);
          mark=VALUE.match( /\:[^\]]*\]/)[0];
          mark=mark.substr(1,1);
          if(returnTXT!='MK['){
             returnTXT+= ',';
          }
          returnTXT += mark+xy;
          PROP=PROP.substr(i+VALUE.length);
          value = PROP.match( /\[[a-z]{2}\:[^\]]*\]/);
       }
       returnTXT += ']'
    }if(PROP.search( /(CR|MA|SL|SQ|TR)\s*\[[a-z]{2}\]/ )==0){
       switch (PROP.substr(0,2)) {
          case "CR":
             returnTXT="MK[›";
             break;
          case "MA":
             returnTXT="MK[~";
             break;
          case "SL":
             returnTXT="MK[¡";
             break;
          case "SQ":
             returnTXT="MK[ ";
             break;
          case "TR":
             returnTXT="MK[¢";
             break;
       }
       value = PROP.match( /\[[a-z]{2}\]/);
       while(value!=null){
          VALUE=value[0]
          i=PROP.indexOf(VALUE);
          xy=VALUE.substr(1,2)
          returnTXT += xy;
          PROP=PROP.substr(i+VALUE.length);
          value = PROP.match( /\[[a-z]{2}\]/);
       }
       returnTXT+="]"
    }
    return(returnTXT);
 }
 //---------------------------------------------------------
 function Markup2MK(inputSGF) {
    var i=0;
    var n=0;

    outputSGF="";
    SGFelement=SGFsplit(inputSGF);
    n=SGFelement.length;
    for (i=0; i<n; i++){
       if(SGFelement[i].search(/[A-Z]+(\s*\[([^\]]*\\\])*[^\]]*\])+/) >= 0){
          outputSGF+=MarkupProp2MK(SGFelement[i]);
       }else{
          outputSGF+=SGFelement[i];
       }
    }
    return(outputSGF);
 }
 //---------------------------------------------------------
  function changeOrder(inputSGF) {
    var i=0;
    var n=0;
    var mvProp='';

    SGFelement=SGFsplit(inputSGF);
    n=SGFelement.length;
    for (i=n-1; i>=0; i--){
       if (SGFelement[i]==';'){
          mvProp='';
       }else if(SGFelement[i].search(/(B|W)\s*\[.*\]$/)==0){   
          mvProp=SGFelement[i];
       }else{
          if(mvProp != ''){
             SGFelement[i+1]=SGFelement[i];
             SGFelement[i]  =mvProp;
          }
       }
    }
    outputSGF='';
    for (i=0; i<n; i++){
       outputSGF+=SGFelement[i];
    }
    return(outputSGF);
 }
//---------------------------------------------------------
function fixKGS(str)
{
   if((ind = str.indexOf(";W[")) > -1 &&
      (arr = (s2 = str.substr(0, ind)).match(/;B\[..\]/g)) && arr.length > 1) 
   {      
       s2 = s2.replace(/;B\[..\]/g, "") + "AB";
       for(var g = 0; g < arr.length; g++) { s2 += arr[g].substr(2); }  
       str = s2 + "\n" + str.substr(ind); 
   }

   return str; 
}

//-----------------------------------------------------
function ig12sgf(str)  // IG1 -> SGF •ÏŠ·
{
   while(str.match(/ [\w|\W]+\s+INT/))
   {
       str = str.replace(/ ([\w|\W]+\s+INT)/g, "ss5ss$1"); 
   }
     
   var ano = !str.match(/\n•”Ô@/);  // Šû•ˆî•ñ‰ğÍ•s”\Œ`®
   if(ano) 
   { 
       str = str.replace(/#COMMENT([\w|\W]+)(INT\s+\d+)/, "GC[$1]\n$2");
       str = str.replace(/#comment([\w|\W]+)(INT\s+\d+)/, "GC[$1]\n$2");  
   }

   str = str.replace(/\r\n\r\n|\n\n/g, "\n"); 
   str = str.replace(/(INT\s+\d+)\s[^\d]/, "$1 0\n");
   str = str.replace(/#COMMENT\s+(.+)\s+(•”Ô)/, "DT[$1]\n$2");
   str = str.replace(/(”’”Ô.+\s+)(.+)\s+(‘Î‹Ç–¼)/, "$1RE[$2]\n$3");
   str = str.replace(/(ƒ†[ƒU[–¼.+\s+)(.+)\s+/, "$1RU[$2]\n");
   str = str.replace(/•”Ô@(.+)/, "PB[$1]");
   str = str.replace(/”’”Ô@(.+)/, "PW[$1]");
   str = str.replace(/•”Ôƒ‰ƒ“ƒN@(.+)/, "BR[$1]");
   str = str.replace(/”’”Ôƒ‰ƒ“ƒN@(.+)/, "WR[$1]");
   str = str.replace(/‘Î‹ÇêŠ@(.+)/, "PC[$1]");
   str = str.replace(/‘Î‹Ç–¼@(.+)/, "GN[$1]");
   str = str.replace(/‘å‰ï–¼@(.+)/, "EV[$1]");
   str = str.replace(/ƒ‰ƒEƒ“ƒh@(.+)/, "RO[$1]");
   str = str.replace(/ƒRƒ~@(.+)/, "KM[$1]");
   str = str.replace(/ƒQ[ƒ€ƒRƒƒ“ƒg@(.+)/, "GC[$1]"); 
   str = str.replace(/o“T@(.+)/, "CP[$1]");
   str = str.replace(/ƒ†[ƒU[–¼@(.+)/, "US[$1]");
   str = str.replace(/ŠÔ@(.+)/, "TM[$1]");
   str = str.replace(/INT (\d+) (\d+)/, "SZ[$1]\nHA[$2]");
   str = str.replace(/[\r|\n]\]/g, "]");
 
   var oki = str.charAt(str.indexOf("HA[") + 3) * 1;
   var kuroSaki = oki < 2; //(str.charAt(str.indexOf("HA[") + 3) == '0');   
   var arr = str.split(" ");
   var mov = ""; 
   var limit = arr.length - 1; 

   for(var g = 1; g < limit; g++) 
   { 
       var iro = (kuroSaki == g%2 ? ";B[" : ";W[");
       var suu = arr[g].charCodeAt(0);
       if(suu > 73) { suu --; }
       var pos = String.fromCharCode(suu + 32) +
                 String.fromCharCode(1 * arr[g].substring(1) + 96);
       mov += "\n" + iro + pos + "]"; 
   }
 
   str = str.replace(/\s+MOV[\w|\W]+/, "");
   str = str.replace(/ss5ss/g, " ");
   str = str.replace(/\[\s+/g, "[");
   str = str.replace(/\s+\]/g, "]");
   
   if(ano) { str = str.replace(/HA\[\d+\]\s*/, ""); }

   var okiStr = "";
   if(oki > 1 && oki < 10) // ’uÎ•¶š—ñ
   {
       var table = new Array ("[dp]", "[pd]", "[pp]","[dd]", "[jj]", "[dj]", "[pj]", "[jd]", "[jp]");
       okiStr = "AB" + table[0] + table[1];   // ¶‰º‹÷¯ + ‰Eã‹÷¯
       if(oki > 2) { okiStr += table[2]; }
       if(oki > 3) { okiStr += table[3]; }
       if(oki > 4) // ‚TqˆÈã‚Ì’uÎ
       {
           if(oki % 2) { okiStr += table[4]; } // “VŒ³
           if(oki > 5) { okiStr += table[5] + table[6]; } 
           if(oki > 7) { okiStr += table[7] + table[8]; } 
       }
   }
   
   str = "(;GM[1]FF[1]\n" + str + okiStr + mov + "\n)";
     
   return str;
}

//----------------------------------------------
function gib2sgf(str)  // GIB -> SGF •ÏŠ·
{
   if(!str.match(/\\HS\s/)) { return str; }

   var arr = str.split("\nSTO ");
   str = arr[0]; 
   var oki = str.split("\nINI ")[1].split(" ")[2] * 1; 
   str = str.split("\n\\GS")[0];
      
   str = str.replace(/\\(HS|HE|GS|GE|\[TYPE=\d\\\]|\[SZAUDIO=\d\\\]|\[GAMETOTALNUM=.*?\\\]|\[GAMETAG=.*?\\\])\s+/g, "");
   str = str.replace(/\\\[GAMENAME=(.*?)\\\]/, "GN[$1]");
   str = str.replace(/\\\[GAMEDATE=(.*?)\\\]/, "DT[$1]");
   str = str.replace(/\\\[GAMEPLACE=(.*?)\\\]/, "PC[$1]");
   str = str.replace(/\\\[GAMECONDITION=(.*?)\\\]/, "AN[$1]");
   str = str.replace(/\\\[GAMETIME=(.*?)\s+(.*?)\\\]/, "TM[$1$2]");
   str = str.replace(/\\\[GAMEWHITENAME=(.*?)\\\]/, "PW[$1]");
   str = str.replace(/\\\[GAMEBLACKNAME=(.*?)\\\]/, "PB[$1]");
   str = str.replace(/\\\[GAMERESULT=(.*?)\\\]/, "RE[$1]");
   str = str.replace(/\\\[GAMECOMMENT=(.*?)\\\]/, "GC[$1]");
   if(oki > 0) { str += "HA[" + oki + "]\n"; }  
      
   var kuroSaki = oki < 2, mov = "", okiStr = ""; 
   if(oki > 1 && oki < 10) // ’uÎ
   {
       var table = new Array ("[dp]", "[pd]", "[pp]","[dd]", "[jj]", "[dj]", "[pj]", "[jd]", "[jp]");
       okiStr = "AB" + table[0] + table[1];   // ¶‰º‹÷¯ + ‰Eã‹÷¯
       if(oki > 2) { okiStr += table[2]; }
       if(oki > 3) { okiStr += table[3]; }
       if(oki > 4) // ‚TqˆÈã‚Ì’uÎ
       {
           if(oki % 2) { okiStr += table[4]; } // “VŒ³
           if(oki > 5) { okiStr += table[5] + table[6]; } 
           if(oki > 7) { okiStr += table[7] + table[8]; } 
       }
       okiStr += "\n";
   }
 
   for(var g = 1; g < arr.length; g++) // è‡ 
   { 
       var iro = (kuroSaki == g%2 ? ";B[" : ";W[");
       var tmp = arr[g].split(" ");
       mov += iro  + String.fromCharCode(97 + tmp[3] * 1) + String.fromCharCode(97 + tmp[4] * 1) + "]\n"; 
   }  

   str = "(;GM[1]FF[1]\n" + str + okiStr + mov + ")";
     
   return str;
}

function yahoo2Sgf(ya)    
{  
    ya = ya.replace(/\s+$/g, ""); 
    for(var g = 2; g > 0; g--)
    {
        var a1 = ya.lastIndexOf(".");
        var a2 = ya.lastIndexOf("ƒpƒX");
        
        if(a2 > a1)  
        { 
           var a3 = ya.lastIndexOf("-");
           if(a1 > a3) ya = ya.substr(0, ya.lastIndexOf("\n"));
                  else ya = ya.substr(0, a2);
        }
    }
    ya += "\n";
    var str = "(;GM[1]FF[1]GN[Yahoo! Go]SZ[19]KM[7.5]";
    str += "PB[" + ya.dat("•”Ô: ", "\n") + "]";
    str += "PW[" + ya.dat("”’”Ô: ", "\n") + "]";
    str += "DT[" + ya.dat("‘—M: ", " ") + "]";
    str += "CP[" + ya.dat("‘—MÒ: ", "\n") + "]";
    
    var arr = ya.split("ƒpƒX"); //\r\n"); 
    if(arr.length > 1) // ’u‚«Œé
    {
        str += "HA[" + arr.length + "]\nAB";
        for(var g in arr) { str += "[" + yahooPos(arr[g].dat(". " , " ")) + "]"; } 
        var fir =  arr[arr.length - 1].after("\n");
        ya = fir.after("\n");
        fir = fir.before("\n");   
        var tt = fir.split(" ");
        str += "\n;W[" + yahooPos(tt[tt.length - 1]) + "]"; 
    }    

    arr = ya.dats(". ", "\n");
    for(var g in arr) // ’…è
    {
        var kuro = arr[g].before(" ");
        if(kuro.indexOf("(") > -1) { kuro = kuro.before("("); }
        var siro = arr[g].after(" ");
        if(siro.indexOf("(") > -1) { siro = siro.before("("); }
  
        if(kuro != "") str += "\n;B[" + yahooPos(kuro) + "]";
        if(siro != "") str += "\n;W[" + yahooPos(siro) + "]";
    }
    str += ")";

    return str;  
}

function yahooPos(str)  // YahooÀ•W‚ğSGF‚É•ÏŠ·
{
   var yoko = str.substr(0,1).charCodeAt(0);
   if(yoko > 105) yoko--;
   var tate = 20 - str.after("-") + 96 ;
   return String.fromCharCode(yoko) + String.fromCharCode(tate);
} 

// [StringƒIƒuƒWƒFƒNƒg‚É•t‰Á]
String.prototype.before = function(str) // w’è•¶š—ñ‚æ‚è‘O‚Ì•”•ª‚ğ•Ô‚·
{
   var tmp = this.indexOf(str);
   return (tmp > -1 ? this.substring(0,tmp) : "");
}

String.prototype.after = function(str) // w’è•¶š—ñ‚æ‚èŒã‚Ì•”•ª‚ğ•Ô‚·
{
   var tmp = this.indexOf(str);
   return (tmp > -1 ? this.substring(tmp + str.length) : "");
}

String.prototype.dat = function(head, tail) // ƒ^ƒO’†‚Ìƒf[ƒ^‚ğ•Ô‚·
{
   return this.after(head).before(tail); 
}

String.prototype.dats = function(head, tail) // ƒ^ƒO’†‚Ìƒf[ƒ^(•¡”)‚ğ•Ô‚·
{
   var tmp = this.split(head);
   var arr = new Array();
   for(var g in tmp) { if(g > 0) arr.push(tmp[g].before(tail)); }
   return arr; 
}

//---------------------------------------------------------
 function SGF2isiba(SGF) {

    if(SGF.match(/1\. /)) { return yahoo2Sgf(SGF); }
 
    if(SGF.match(/\\HS\s/)) { return gib2sgf(SGF); }   
    if(SGF.match(/INT\s\d+/)) { return ig12sgf(SGF); }

    if(SGF.indexOf("“ú–{Šû‰@ƒlƒbƒg‘Î‹Ç")==0) SGF = SGF.replace(/\n/g,"___");
    if(SGF.indexOf("Ver=UGF")==0) SGF = SGF.replace(/\n/g,"___");
    if(SGF.indexOf("<igo>") > 0) return SGF;
    if(SGF.indexOf("Crypt=") > 0) return SGF.replace(/\n/g, "___");
    if(SGF.indexOf("(;") < 0) return SGF;
    if(SGF.indexOf("B[") < 3) SGF = "(;" + SGF.substr(7).replace(/;W/, SGF.substr(1,6) + ";W");
 
    SGF = fixKGS(SGF);
    SGF = Markup2MK(SGF);
    SGF = contractMK(SGF);
    SGF = changeOrder(SGF);

    return(SGF);
 }

 //---------------------------------------------------------
function FF4conv(str) // Convert all FF[4] 
{
   if(str.match(/„©/))
   {
      str = str.replace(/> /g, "");
      str = str.replace(/^\s+|\s+$/g, ""); 
      str = str.replace(/\d\d(\r|\n)/g, "$1"); 
      str = str.replace(/\d\d$/, ""); 
      str = str.replace(/\n/g, "___");
      return str;
   }

//str = str.substring(0, str.indexOf("AB[") + 1) + str.substring(str.indexOf("AB[") + 1).replace(/AB\[/g, "["); 

str = str.replace(/(\\)\]/g, "n");
str = str.replace(/\(\s+;/g, "\(;");
str = str.replace(/\\]/g, "]");
str = str.replace(/ƒ\\]/g, "ƒ]");
str = str.replace(/„\\]/g, "„]");
str = str.replace(/‡\\]/g, "‡]");
str = str.replace(/‰\\]/g, "‰]");
str = str.replace(/Š\\]/g, "Š]");
str = str.replace(/‹\\]/g, "‹]");
str = str.replace(/Œ\\]/g, "Œ]");
str = str.replace(/\\]/g, "]");
str = str.replace(/\\]/g, "]");
str = str.replace(/\\]/g, "]");
str = str.replace(/\\]/g, "]");
str = str.replace(/‘\\]/g, "‘]");
str = str.replace(/’\\]/g, "’]");
str = str.replace(/“\\]/g, "“]");
str = str.replace(/”\\]/g, "”]");
str = str.replace(/•\\]/g, "•]");
str = str.replace(/–\\]/g, "–]");
str = str.replace(/—\\]/g, "—]");
str = str.replace(/˜\\]/g, "˜]");
str = str.replace(/™\\]/g, "™]");
str = str.replace(/š\\]/g, "š]");
str = str.replace(/›\\]/g, "›]");
str = str.replace(/œ\\]/g, "œ]");
str = str.replace(/\\]/g, "]");
str = str.replace(/\\]/g, "]");
str = str.replace(/Ÿ\\]/g, "Ÿ]");
str = str.replace(/à\\]/g, "à]");
str = str.replace(/á\\]/g, "á]");
str = str.replace(/â\\]/g, "â]");
str = str.replace(/ã\\]/g, "ã]");
str = str.replace(/ä\\]/g, "ä]");
str = str.replace(/å\\]/g, "å]");
str = str.replace(/æ\\]/g, "æ]");
str = str.replace(/ç\\]/g, "ç]");
str = str.replace(/è\\]/g, "è]");
str = str.replace(/é\\]/g, "é]");
str = str.replace(/ê\\]/g, "ê]");
str = str.replace(/úx\]/g, "úy");
str = str.replace(/ûx\]/g, "ûy");
str = str.replace(/û[\]/g, "E");
str = str.replace(/ú\\]/g, "ú]");
str = str.replace(/û\\]/g, "û]");
str = str.replace(/\\[/g, "[");
str = str.replace(/ƒ\\[/g, "ƒ[");
str = str.replace(/„\\[/g, "„[");
str = str.replace(/‡\\[/g, "‡[");
str = str.replace(/‰\\[/g, "‰[");
str = str.replace(/Š\\[/g, "Š[");
str = str.replace(/‹\\[/g, "‹[");
str = str.replace(/Œ\\[/g, "Œ[");
str = str.replace(/\\[/g, "[");
str = str.replace(/\\[/g, "[");
str = str.replace(/\\[/g, "[");
str = str.replace(/\\[/g, "[");
str = str.replace(/‘\\[/g, "‘[");
str = str.replace(/’\\[/g, "’[");
str = str.replace(/“\\[/g, "“[");
str = str.replace(/”\\[/g, "”[");
str = str.replace(/•\\[/g, "•[");
str = str.replace(/–\\[/g, "–[");
str = str.replace(/—\\[/g, "—[");
str = str.replace(/˜k\[/g, "˜k");
str = str.replace(/™\\[/g, "™[");
str = str.replace(/š\\[/g, "š[");
str = str.replace(/›\\[/g, "›[");
str = str.replace(/œ\\[/g, "œ[");
str = str.replace(/\\[/g, "[");
str = str.replace(/\\[/g, "[");
str = str.replace(/Ÿ\\[/g, "Ÿ[");
str = str.replace(/à\\[/g, "à[");
str = str.replace(/á\\[/g, "á[");
str = str.replace(/â\\[/g, "â[");
str = str.replace(/ã\\[/g, "ã[");
str = str.replace(/ä\\[/g, "ä[");
str = str.replace(/å\\[/g, "å[");
str = str.replace(/æ\\[/g, "æ[");
str = str.replace(/ç\\[/g, "ç[");
str = str.replace(/è\\[/g, "è[");
str = str.replace(/é\\[/g, "é[");
str = str.replace(/ê\\[/g, "ê[");
str = str.replace(/úx\[/g, "úw");
str = str.replace(/ûx\[/g, "ûw");
str = str.replace(/([^(]);(FF|G[CMN]|A[PBW]|RU|SZ|HA|KM|TM|P[BCW]|BR|WR|R[EO]|DT|EV)\[/g, "$1$2\[");
str = str.replace(/;\r\nP([BW])/g, "\r\nP$1");

//SGFˆê”Ê
while((indx = str.indexOf("C[")) > -1)
{
kk = str.substring(indx + 2);

if((s = kk.indexOf("]")) < 0) { break; }

tmp = "ff4ff" + kk.substring(0, s);
tmp = tmp.replace(/\\\r\n/g, "");
tmp = tmp.replace(/([\ƒ\„\‡\‰\Š\‹\Œ\\\\\‘\’\“\”\•\–\—\˜\™\š\›\œ\\\Ÿ\à\á\â\ã\ä\å\æ\ç\è\é\ê\úxûxû[ú\û\])\\/g, "$1");

tmp = tmp.replace(/\n/g, "___"); 
tmp = tmp.replace(/'/g, "f"); 
tmp = tmp.replace(/"/g, 'h');
tmp = tmp.replace(/;/g, 'G');
tmp = tmp.replace(/\\\[/g, "m");
tmp = tmp.replace(/\\\]/g, "n");
tmp = tmp.replace(/\[/g, "m");
tmp = tmp.replace(/\]/g, "n");
tmp = tmp.replace(/\\\\/g, "\\");
tmp = tmp.replace(/\(/g, "i");
tmp = tmp.replace(/\)/g, "j");
tmp = tmp.replace(/\\/g, "");

str = str.substring(0, indx) + tmp + 
str.substring(kk.substring(0, s).length + indx + 2);
}

return str.replace(/ff4ff/g, "C[");
}
//-->
