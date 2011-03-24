<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php echo $html->css('videos');?>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="description" content="おもしろ動画、見られている動画をご紹介"/>
<meta name="keywords" content="動画, ビデオ, video"/>
<meta http-equiv="content-style-type" content="text/css"/>
<meta http-equiv="content-script-type" content="text/javascript"/>
<title>動画アンテナ ver.α <?php if(isset($skanaword)) { e($skanaword);}  ?> </title>
<script type="text/javascript" src="/js/common.js"></script>
</head>
<body>
  <div id="wrapper">
	    <div id="header">
  	        <h1><a href="/videos/">動画アンテナ ver.α</a> <?php if(isset($skanaword)) { e($skanaword);}  ?></h1>
			<p>動画<a href="http://mixi.jp/run_appli.pl?id=3035" target="_blank">能力大学-漢字テスト</a>の復習サイトです。</p>
	    </div>
	    <div id="main">
			<?php echo $content_for_layout; ?>
		</div>
		<div id="footer">
			<p>Powered by <a href="http://www.neet-system.com">ニートシステムドットコム</a></p>
		</div>
    </div>
<script type="text/javascript"><!--
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
//--></script>
<script type="text/javascript"><!--
try {
var pageTracker = _gat._getTracker("UA-2157335-7");
pageTracker._trackPageview();
} catch(err) {}//--></script>
</body>
</html>
