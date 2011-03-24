// HTA�p�X�N���v�g (2004.11 by IgoMain)

document.write("<script src=../MyLeaf/kifufilter.js></script>"); // �t�B���^�[�֐��Q by���J����

var htaWidth  = 686;  // �E�C���h�E�L��
var htaHeight = 595;  // �E�C���h�E����

window.resizeTo(htaWidth, htaHeight);  // �E�C���h�E�T�C�Y�ݒ�
window.moveTo((screen.width - htaWidth) / 2, (screen.height - htaHeight) / 2); // ��ʒ����ɔz�u

function kifuSave()  // �����ۑ�
{ 
   var Shell = new ActiveXObject("Shell.Application"); 
   var dia = Shell.BrowseForFolder(0, "�o�̓t�H���_�̎w��", "&H11", "C:");

   if(dia) // �t�H���_�I���n�j
   {
       var path = dia.Items().Item().Path + "\\" + LeafShow.GetKifuName();
       saveFile(path, LeafShow.GetKifuStr());
       window.scroll(0, 0);
       LeafShow.setKifuPath(path);
       LeafShow.setText("[" + path + "] ��ۑ����܂����B"); // ���b�Z�[�W�\��   
   }   
}

function saveFile(fname, str)  // �t�@�C���ۑ�
{
   var fs = new ActiveXObject("Scripting.FileSystemObject");
   var file = fs.CreateTextFile(fname, true);
   file.WriteLine(str); 
   file.Close();
}

function kifuOpen() // �������J��
{
   if(DiaOpen.value == "")  // ��������
   { 
       DiaOpen.click();    // �_�C�A���O�J��    
   }

   if(DiaOpen.value != "")  // �t�@�C���I���n�j
   { 
       var str = openFile(DiaOpen.value); 
       str = SGF2isiba(FF4conv(str));     // �����␳�t�B���^�[
       str += "{KifuPath=" + DiaOpen.value + "}"; // �����p�X�t��
       LeafShow.RecvStr = str;    // �f�[�^��M 
       window.scroll(0, 0);
   } 
}

function openFile(fname)  // �t�@�C���ǂݍ���
{ 
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var f = fs.GetFile(fname); 
    var rs = f.OpenAsTextStream();
    var str = ""; 
    while (!rs.AtEndOfStream) { str += rs.ReadLine() + "\n"; }
    rs.close();
    return str;
}

function checkmail(text) // ���[�����M�O�`�F�b�N
{
    if(!text.match(/\w+@\w+/)) 
    { 
        alert("���[���A�h���X���m�F���Ă�������"); 
        return false;
    }
    
    document.Mail.body.value += "\n\n----- { Kifu Begin } -----\n\n" + LeafShow.GetKifuStr() + "\n\n----- { Kifu End } -----";
             
    return true;
}

function Ig1Save() // IG1�t�@�C���ۑ�
{
   var Shell = new ActiveXObject("Shell.Application");
   var dia = Shell.BrowseForFolder(0, "�o�̓t�H���_�̎w��", 1); 

   if(dia) // �t�H���_�I���n�j
   {
       var path = LeafShow.GetKifuName().replace(/\.\w+/, ".ig1");
       path = dia.Items().Item().Path + "\\" + path;
       saveFile(path, sgf2ig1(LeafShow.GetKifuStr("SGF_CURRENT")));
       window.scroll(0, 0);
       LeafShow.setText("[" + path + "] ��ۑ����܂����B"); // ���b�Z�[�W�\��   
   }   
}

function sgf2ig1(str)  // SGF -> IG1 �ϊ�
{
   var info = "#COMMENT\r\n";   
   if(dat(str, "DT")) { info += DAT; }   
   if(dat(str, "PB")) { info += "���ԁ@" + DAT; }
   if(dat(str, "PW")) { info += "���ԁ@" + DAT; }
   if(dat(str, "RE")) { info += DAT; } 
   if(dat(str, "GN")) { info += "�΋ǖ��@" + DAT; }
   if(dat(str, "BR")) { info += "���ԃ����N�@" + DAT; }
   if(dat(str, "WR")) { info += "���ԃ����N�@" + DAT; }
   if(dat(str, "KM")) { info += "�R�~�@" + DAT; }
   if(dat(str, "PC")) { info += "�΋Ǐꏊ�@" + DAT; }
   if(dat(str, "EV")) { info += "���@" + DAT; }
   if(dat(str, "RO")) { info += "���E���h�@" + DAT; }
   if(dat(str, "CP")) { info += "�o�T�@" + DAT; } 
   if(dat(str, "GC")) { info += "�Q�[���R�����g�@" + DAT; }     
   if(dat(str, "TM")) { info += "�����ԁ@" + DAT; }
   if(dat(str, "US")) { info += "���[�U�[���@" + DAT; }  
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
       if(++cnt == 19) { mov += "\r\n"; cnt = 0; }  // �P�X��ŉ��s     
   }   

   return info + mov + " -0\r\n"; 
}

function dat(kifu, name) // SGF�������擾
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

