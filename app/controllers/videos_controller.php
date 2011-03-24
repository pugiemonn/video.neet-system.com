<?php
class VideosController extends AppController {
	var $uses = array('Video');	

	//一覧ページの表示
/*    var $paginate = array(
       # 'conditions' => array('Kanjitest.yomi REGEXP ' => '^あ|^い|^う|^え|^お|^か|^き|^く|^け|^こ|^が|^ぎ|^ぐ|^げ|^ご|^さ|^し|^す|^せ|^そ|^ざ|^じ|^ず|^ぜ|^ぞ|^た|^ち|^つ|^て|^と|^だ|^ぢ|^づ|^で|^ど|^な|^に|^ぬ|^ね|^の|^は|^ひ|^ふ|^へ|^ほ|^ば|^び|^ぶ|^べ|^ぼ|^ぱ|^ぴ|^ぷ|^ぺ|^ぽ|^ま|^み|^む|^め|^も|^や|^よ|^ゆ|^ら|^り|^る|^れ|^ろ|^わ|^を|^ん'),
		'limit' => 30,
        'order' => array(
            'Kanjitest.yomi' => 'asc'
        )
    );
*/
	private static $sqlkana = array(
//								"^(.*)",
								"^あ|^い|^う|^え|^お|^か|^き|^く|^け|^こ|^が|^ぎ|^ぐ|^げ|^ご|^さ|^し|^す|^せ|^そ|^ざ|^じ|^ず|^ぜ|^ぞ|^た|^ち|^つ|^て|^と|^だ|^ぢ|^づ|^で|^ど|^な|^に|^ぬ|^ね|^の|^は|^ひ|^ふ|^へ|^ほ|^ば|^び|^ぶ|^べ|^ぼ|^ぱ|^ぴ|^ぷ|^ぺ|^ぽ|^ま|^み|^む|^め|^も|^や|^よ|^ゆ|^ら|^り|^る|^れ|^ろ|^わ|^を|^ん",
								"^あ|^い|^う|^え|^お",
								"^か|^き|^く|^け|^こ|^が|^ぎ|^ぐ|^げ|^ご",
								"^さ|^し|^す|^せ|^そ|^ざ|^じ|^ず|^ぜ|^ぞ",
								"^た|^ち|^つ|^て|^と|^だ|^ぢ|^づ|^で|^ど",
								"^な|^に|^ぬ|^ね|^の",
								"^は|^ひ|^ふ|^へ|^ほ|^ば|^び|^ぶ|^べ|^ぼ|^ぱ|^ぴ|^ぷ|^ぺ|^ぽ",
								"^ま|^み|^む|^め|^も",
								"^や|^よ|^ゆ",
								"^ら|^り|^る|^れ|^ろ",
								"^わ|^を|^ん");

	private static $skanaword = array(
								"全て",
								"あ行",
								"か行",
								"さ行",
								"た行",
								"な行",
								"は行",
								"ま行",
								"や行",
								"ら行",
								"わ行");

	private static $selected = array(
								"0" => "",
								"1" => "",
								"2" => "",
								"3" => "",
								"4" => "",
								"5" => "",
								"6" => "",
								"7" => "",
								"8" => "",
								"9" => "",
								"10" => "");



	function index()
	{

		//DB接続する条件を指定
		$conditions = array(
			'fields' => array('id', 'kanji' , 'yomi'),
			'order' => array('yomi ASC'),
			'group' => null,
			'limit' => 5,
			'page'=> null,
			'callbacks' =>true
			);
		$pages = 0;
			
/*		$data = $this->paginate('Kanjitest');
		//viewへ渡す変数をセット
//		$this->set('kanjitests', $this->Kanjitest->find('all', $conditions));
		$this->set('kanjitests', $data);
		$this->set('skanaword', self::$skanaword[$pages]);
		$this->set('skanalist', self::$skanaword);
		$this->set('pages', $pages);
*/
		$this->layout = "videos";
	}	
	//データ追加ページ
	function add()
	{
		if (!empty($this->data)) 
		{
			//データを保存する
			if ($this->Kanjitest->save($this->data))
			{
				echo "hoge";
				exit;
				$this->flash('投稿が完了しました。能力大学-漢字テスト復習リストの漢字一覧に戻ります。','/kanjitests');
			}
		}
		$this->layout = "kanjitests";
	}
//	$this->pageTitle = "みつかりません";


	//データソートページ
	function skana($pages=0)
	{
		//ナビゲーションのスタイル表示用
		$selected = self::$selected;

		$pages = intval($pages);
		
/*		
		$selected = array_merge($selected, array("".$pages."" => "selected"));
//		echo self::$sqlkana[$pages];
		print_r(array("".$pages."" => "selected"));
		print_r($selected);
		exit;
*/
		$options = array(
			'conditions' => array('Kanjitest.yomi REGEXP ' => ''.self::$sqlkana[$pages].''),
			'limit' => 30,
			'order' => array(
				'Kanjitest.yomi' => 'asc'
			)
		);


		$this->paginate = $options;
		$data = $this->paginate();
//		$this->set(compact('data'));
		$this->set('kanjitests', $data);
		$this->set('skanaword', self::$skanaword[$pages]);
		$this->set('skanalist', self::$skanaword);
		$this->set('pages', $pages);
		/*
		$data = $this->paginate('Kanjitest');
		//viewへ渡す変数をセット
		$this->set('kanjitests', $data);
		*/
		$this->layout = "kanjitests";
	}
}

?>

