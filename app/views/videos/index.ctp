<p>復習したい漢字と読みを入力してください。</p>
<?php
echo $form->create('Kanjitest');
echo $form->input('kanji', array('label' => array('text' => '漢字')));
echo $form->input('yomi', array('label' => array('text' => '読み')));
echo $form->end('追加する');
?>
<div id="main-list">
	<!-- ナビゲーション -->
	<?php e($this->element('navi-video'));?>
    <div id="table-box">
		<?php 
			e("<p class=\"text-right\">");
			/*e($paginator->numbers(
					array (
					'separator' => '&nbsp;|&nbsp;',
					'modulus' => 6
					)
				)
			);*/
			e("</p>");
		?>
		<table cellspacing="0" cellpadding="0">
			<tr>
				<th class="kanji">漢字　<span><a href="javascript:void(0);" onclick="change_color('kanji', 0);return false;">非表示</a></span></th>
				<th class="yomi">読み　<span><a href="javascript:void(0)" onclick="change_color('yomi', 0);">非表示</a></span></th>
				<th class="imi">意味</th>
			</tr>
			<?php foreach ($kanjitests as $list): ?>
			<tr>
				<td class="kanji">
					<span>
						<?php e(h($list['Kanjitest']['kanji'])); ?>
					</span>
				</td>
				<td class="yomi">
					<span>
						<?php e(h($list['Kanjitest']['yomi'])); ?>
					</span>
				</td>
				<td class="imi"><?php echo $html->link('weblio', 'http://www.weblio.jp/content/'.urlencode($list['Kanjitest']['kanji']).'', array('target' => '_blank')); ?>、<?php echo $html->link('google', 'http://www.google.co.jp/search?hl=ja&q='.urlencode($list['Kanjitest']['kanji']).'+'.urlencode("意味").'&btnG=%E6%A4%9C%E7%B4%A2&lr=&aq=f&oq=', array('target' => '_blank')); ?>、<?php echo $html->link('関連', 'http://pakuri.neet-system.com/category/related/tag/'.urlencode($list['Kanjitest']['kanji']).'', array('target' => '_blank')); ?></td>
			</tr>
			<?php endforeach;?>
			
		</table>
		<?php 
			e("<p class=\"text-right\">");
			/*e($paginator->numbers(
					array (
					'separator' => '&nbsp;|&nbsp;',
					'modulus' => 6
					)
				)
			);*/
			e("</p>");
		?>
	</div>
</div>

