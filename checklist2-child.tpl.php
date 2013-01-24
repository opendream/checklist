<?php 
		foreach($array_child as $record):
			?>
				<div class = 'checklist_child' alt = '<?php echo $record->cid;?>' id = 'child_<?php echo $record->cid;?>'>
					<br><input type = 'checkbox' class = 'checklist_checkbox'  <?php if($record->checked == 'Y'):echo 'checked';endif;?>>
					<span <?php if($record->ctid == 2): echo 'class = "checklist_function" '; else: echo ' class = "checklist_none_function" '; endif;?>>
						<?php echo $record->title;?>
					</span>
					<span class = 'hidden edit_child'  >Edit</span> 
					<span class = 'hidden trash_child'   >
						<img src = '<?php echo base_path();?>/modules/checklist/trash.gif' >
					</span>
				</div>
			<?
		endforeach;
		?>