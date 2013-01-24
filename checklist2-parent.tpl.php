<div id = 'main_parent_<?php echo $record->cid?>' alt = '<?php echo $record->cid?>' class = 'main_checklist_parent'>
	<div id = 'parent_<?php echo $record->cid?>' alt = '<?php echo $record->cid?>' class = 'checklist_parent'>
		<br><br><?php echo $record->title;?>
		<span class = 'hidden add_child' >Add Checklist</span> 
		<span class = 'hidden edit_parent' >Edit</span> 
		<span class = 'hidden trash_parent'  >
			<img src = '<?php echo base_path();?>/modules/checklist2/trash.gif' >
		</span>

	</div>

	<div class = 'checklist_add_child_space' id = 'checklist_add_child_space_<?php echo $record->cid;?>'></div>
	<div class = 'checklist_child_list' id = 'checklist_child_list_<?php echo $record->cid;?>'>
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
						<img src = '<?php echo base_path();?>/modules/checklist2/trash.gif' >
					</span>
				</div>
			<?
		endforeach;
		?>
	</div>

</div>