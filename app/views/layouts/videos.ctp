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
			<p>動画</p>
	    </div>
	    <div id="main">
			<?php echo $content_for_layout; ?>
		</div>
		<div id="footer">
			<p>Powered by <a href="http://www.neet-system.com">ニートシステムドットコム</a></p>
		</div>
    </div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2157335-13']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>
