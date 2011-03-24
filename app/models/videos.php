<?php
//app/model/task.php

class Video extends AppModel {
	var $name = 'Video';
	var $validate = array (
			'kanji' => array(/*
				'between' => array (				
					'message' => '文字数が多すぎるか少なすぎます。入力した文字を確認してください。',
					'rule' => array('between', 1, 28),
					'last' => true//
					//'rule' => array('minLength',1)
				),*/
				//'alphanumeric' => array (				
					'rule' => 'alphaNumeric',  
					'message' => 'Only alphabets and numbers allowed',
					'last' => true
					//'rule' => array('minLength',1)
				//)
			),
			
			'yomi' => array(
				'message' => '文字数が多すぎるか少なすぎます。入力した文字を確認してください。',
				'rule' => array('between', 1, 28),
				'last' => true//
				//'rule' => array('minLength',1)
			)


/*
		'kanji' => array('between' => array(
						'rule' => array('between' => 2,20)
						)
					),
				   array('message' => array('文字数が多すぎるか少なすぎ'))
					,
		'yomi' => array('between' => array(
						'rule' => array('between' => 2,20)
						)
					),
				   array('message' => array('文字数が多すぎるか少なすぎ'))
*/					
		);

/*
	var $validate = array(
	'kanji' => array('rule' =>array('minLength',1)),
	'body' => array(
	'message' => 'ちゃんといれてね！',//エラーメッセージ
	'rule' => array('minLength',1))
	)*/
	
	//var $uses = array('Task');
}
?>
