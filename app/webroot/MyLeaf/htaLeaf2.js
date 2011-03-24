// HTA用スクリプト (2004.11 by IgoMain)

document.write("<script src=../MyLeaf/kifufilter.js></script>"); // フィルター関数群 by島谷さん

var htaWidth  = 686;  // ウインドウ広さ
var htaHeight = 595;  // ウインドウ高さ

window.resizeTo(htaWidth, htaHeight);  // ウインドウサイズ設定
window.moveTo((screen.width - htaWidth) / 2, (screen.height - htaHeight) / 2); // 画面中央に配置

function kifuSave()  // 棋譜保存
{ 
   var Shell = new ActiveXObject("Shell.Application"); 
   var dia = Shell.BrowseForFolder(0, "出力フォルダの指定", "&H11", "C:");

   if(dia) // フォルダ選択ＯＫ
   {
       var path = dia.Items().Item().Path + "\\" + LeafShow.GetKifuName();
       saveFile(path, LeafShow.GetKifuStr());
       window.scroll(0, 0);
       LeafShow.setKifuPath(path);
       LeafShow.setText("[" + path + "] を保存しました。"); // メッセージ表示   
   }   
}

function saveFile(fname, str)  // ファイル保存
{
   var fs = new ActiveXObject("Scripting.FileSystemObject");
   var file = fs.CreateTextFile(fname, true);
   file.WriteLine(str); 
   file.Close();
}

function kifuOpen() // 棋譜を開く
{
   if(DiaOpen.value == "")  // 棋譜無い
   { 
       DiaOpen.click();    // ダイアログ開く    
   }

   if(DiaOpen.value != "")  // ファイル選択ＯＫ
   { 
       var str = openFile(DiaOpen.value); 
       str = SGF2isiba(FF4conv(str));     // 棋譜補正フィルター
       str += "{KifuPath=" + DiaOpen.value + "}"; // 棋譜パス付加
       LeafShow.RecvStr = str;    // データ受信 
       window.scroll(0, 0);
   } 
}

function openFile(fname)  // ファイル読み込み
{ 
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var f = fs.GetFile(fname); 
    var rs = f.OpenAsTextStream();
    var str = ""; 
    while (!rs.AtEndOfStream) { str += rs.ReadLine() + "\n"; }
    rs.close();
    return str;
}

function checkmail(text) // メール送信前チェック
{
    if(!text.match(/\w+@\w+/)) 
    { 
        alert("メールアドレスを確認してください"); 
        return false;
    }
    
    document.Mail.body.value += "\n\n----- { Kifu Begin } -----\n\n" + LeafShow.GetKifuStr() + "\n\n----- { Kifu End } -----";
             
    return true;
}

function Ig1Save() // IG1ファイル保存
{
   var Shell = new ActiveXObject("Shell.Application");
   var dia = Shell.BrowseForFolder(0, "出力フォルダの指定", 1); 

   if(dia) // フォルダ選択ＯＫ
   {
       var path = LeafShow.GetKifuName().replace(/\.\w+/, ".ig1");
       path = dia.Items().Item().Path + "\\" + path;
       saveFile(path, sgf2ig1(LeafShow.GetKifuStr("SGF_CURRENT")));
       window.scroll(0, 0);
       LeafShow.setText("[" + path + "] を保存しました。"); // メッセージ表示   
   }   
}

function sgf2ig1(str)  // SGF -> IG1 変換
{
   var info = "#COMMENT\r\n";   
   if(dat(str, "DT")) { info += DAT; }   
   if(dat(str, "PB")) { info += "黒番　" + DAT; }
   if(dat(str, "PW")) { info += "白番　" + DAT; }
   if(dat(str, "RE")) { info += DAT; } 
   if(dat(str, "GN")) { info += "対局名　" + DAT; }
   if(dat(str, "BR")) { info += "黒番ランク　" + DAT; }
   if(dat(str, "WR")) { info += "白番ランク　" + DAT; }
   if(dat(str, "KM")) { info += "コミ　" + DAT; }
   if(dat(str, "PC")) { info += "対局場所　" + DAT; }
   if(dat(str, "EV")) { info += "大会名　" + DAT; }
   if(dat(str, "RO")) { info += "ラウンド　" + DAT; }
   if(dat(str, "CP")) { info += "出典　" + DAT; } 
   if(dat(str, "GC")) { info += "ゲームコメント　" + DAT; }     
   if(dat(str, "TM")) { info += "持時間　" + DAT; }
   if(dat(str, "US")) { info += "ユーザー名　" + DAT; }  
   if(dat(str, "RU")) { info += DAT; } 
  
   info += "INT ";
   if(dat(str, "SZ")) { info += DAT.replace(/\r\n/, " "); }
   else { info += "19 "; }
   if(dat(str, "HA")) { info += DAT; }
   else { info += "0\r\n"; } 
   info += "MOV\r\n"; 

   var arr = str.split(";");
   var mov = "";     
   for(var g = 2, cnt = 0, limit = arr.length; g < limit; g++) 
   {    
       var s1 = arr[g].charCodeAt(2);
       if(s1 > 104) { s1++; }
       var s2 = 1 * arr[g].charCodeAt(3) - 96;
       if(s2 < 10) { s2 = "0" + s2; }
       mov += " " + String.fromCharCode(s1 - 32) + s2;   
       if(++cnt == 19) { mov += "\r\n"; cnt = 0; }  // １９手で改行     
   }   

   return info + mov + " -0\r\n"; 
}

function dat(kifu, name) // SGF棋譜情報取得
{
   var ind = kifu.indexOf(name += "[");
   if(ind > -1) 
   {
        var str = kifu.substring(ind + name.length);
        if((ind = str.indexOf("]"))> -1)
        {
            return (DAT = str.substring(0, ind) + "\r\n");
        } 
   }
   return false;
}

