<?php
if(isset($_POST["action"]))
{
    if($_POST["action"] == "fetch")
    {
        $file_data = scandir("file");

        for($i=0; $i < count($file_data); $i++)
        {
            if($file_data[$i] == "index.txt"){
                $temp = $file_data[0];
                $file_data[0] = "index.txt";
                $file_data[$i] = $temp;
            }
            if($file_data[$i] == "readme.txt"){
                $temp = $file_data[1];
                $file_data[1] = "readme.txt";
                $file_data[$i] = $temp;
            }
        }

        foreach($file_data as $file)
        {
            if($file === '.' or $file === '..')
            {
                continue;
            }else{
                if($file == "index.txt" || $file == "readme.txt"){
                    $output .= '<div class="fileList" id=' . $file . ' style="color:rgb(150,0,0)"><img id="fileType" src="icon/txt.png"><p onClick="fileLoad(this);">' . $file . '</p></div>';
                }else{
                    $output .= '<div class="fileList" id=' . $file . '><img id="fileType" src="icon/txt.png"><p onClick="fileLoad(this);">' . $file . '</p><img class="deleteFile" src="icon/x.png"></div>';
                }
            }
        }
        echo $output;
    }


    if($_POST["action"] == "save")
    {
        $fileExists = file_exists('file/' . $_POST["name"]);
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
        if($fileExists == 1){
            echo "overlap";
        }else if($Kbyte_size - $_POST["byte"] > 102400) {
            echo "oversize";
        }else{
            $myfile = fopen('file/' . $_POST["name"], "w");
            fwrite($myfile, $_POST["contents"]);
            fclose($myfile);
            echo "success";
        }
    }


    if($_POST["action"] == "remove")
    {
        unlink('file/' . $_POST["name"]);
        echo "success";
    }
}
?>
