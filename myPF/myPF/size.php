<?php
$tatal_size = 0;
$Kbyte_size = 0;
$file_data = scandir('file');
foreach($file_data as $file)
{
    if($file === '.' OR $file === '..')
    {
        continue;
    }else{
        $path = 'file/' . $file;
        $total_size = $total_size + filesize($path);
    }
}
$Kbyte_size = number_format($total_size / 1024, 3);
echo $Kbyte_size;
?>