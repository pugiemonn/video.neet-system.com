<p>動画一覧</p>

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

