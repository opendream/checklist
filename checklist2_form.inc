<?php
	

function checklist2_parent_add_form($form_state,$cid) {
	drupal_add_js('modules/checklist/checklist.js');
    drupal_add_js('modules/checklist/ajax_form.js');
	//$cid_id = ($cid['build_info']['args'][0]);
	$cid = $_POST['cid'];
	$action = $_POST['action'];
	$fx = $_POST['fx'];
	//print($action);

	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			 
			 echo drupal_render(drupal_get_form('checklist2_build_form',$cid,$action));
			 if($fx != 'edit') {
			 	echo '<a id = "btu_add_parent_form">Add</a> <a class = "btu_cancel_each_form" >Cancel</a><br><br>';
			 	exit();
			 }
			 else{
			 	echo '<a id = "btu_add_parent_form_edit"  alt = "'.$action.'">Update</a> <a class = "btu_cancel_each_form_edit"  ">Cancel</a><br><br>';
			 	exit();
			 }
			}
			else {
				return drupal_get_form('checklist_build_form');
			}
	
}
function checklist2_build_form($cid) {
	$args = func_get_args();
	$cid = ($args[1]['input']['cid']);
	$action = $args[1]['input']['action'];
	//print_r($args[1]['input']);
	$fx = $args[1]['input']['fx'];
	if($fx == 'edit') {
		$query = db_select('checklist', 'c');  
        $query->join('checklist_type', 'ct', 'ct.ctid = c.ctid ');  
        $query
            ->fields('c', array('cid', 'title', 'checked' ))  
            ->fields('ct', array('ctid'))  
            ->orderBy('c.cid','DESC')
            ->condition('c.cid'    ,$cid, '=');

        $result_child = $query->execute();
        //print_r($result_child);
        $array_child = array();
        
        foreach($result_child as $record_child) {
            //$array_child[] = $record_child;
            $title = ($record_child->title);
            $checked = ($record_child->checked);
            if($checked == 'Y') {
            	$checked = 1;
            }
            else {
            	$checked = 0;
            }
            $ctid = ($record_child->ctid);

        }  
	}
		
      
	//print_r($args[1]['input']);
	$form['#attributes'] = array('id' => 'checklist_add_form_id');
	if($action == 'edit_child') {
		$form['checked'] = array(
	    	'#type' => 'checkbox',
	    	'#attributes' => array('id' => array('checked')),
	    	'#default_value' => $checked,
	  );

	}
	$form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#attributes' => array('class' => array('checklist_text_input'),'id' => array('title')),
    '#default_value' => $title,

  );
	if($action == 'edit_child') {
		$form['ctid'] = array(
	    	'#type' => 'select',
	    	'#title' => t('check list type'),
	    	'#options' => checklist2_type_option(),
	    	'#attributes' => array('id' => array('ctid')),
	    	'#default_value' => $ctid,
	  );
	}
	//if($fx == 'edit') {
		$form['cid'] = array(
		    '#type' => 'hidden',
		    '#default_value' => $cid,
		    '#attributes' => array('id' => array('cid')),
		  );
	//}
	

	
	return $form;
}

function checklist2_type_option() {
	
	$query = db_select('checklist_type', 'ct');  
	$query
  		->fields('ct', array('ctid', 'title'))  ;
	$result = $query->execute();
	

	$option = array();
	foreach($result as $record) {
		$option[$record->ctid] = $record->title;	
	}
	return $option;
}