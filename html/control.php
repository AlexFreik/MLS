<?php

$STREAM_NUM = $_ENV['STREAM_NUM'];
$OUT_NUM = $_ENV['OUT_NUM'];

$streamno = $_GET['streamno'];
$action = $_GET['action'];
$actnumber = $_GET['actnumber'];
$state = $_GET['state'];

if ($action == "video") { # Get variables for starting holding screen
    $startmin = $_POST['startmin'];
    $startsec = $_POST['startsec'];
    $inputsec = 60 * $startmin + $startsec;
    $video_no = $_POST['video_no'];
    $output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh on && sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$video_no\" $inputsec");
    echo $output;
} elseif ($state == "turnon") { # Needed to run on and main/backup etc functions
    $output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh on && sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh $action");
    echo $output;
} elseif ($action == "volume") {
    $vol = $_POST['vol_level'];
    $vol_level = 2 * $vol;
    $output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$action\" $vol_level");
    echo $output;
} elseif ($action == "super") {
    $output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$action\" $actnumber");
    echo $output;
} elseif (isset($action)) { # For outputs
    $output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$action$actnumber\" $state");
    echo $output;
}

if (isset($_GET['batch-input-control'])) {
    $rawPostData = file_get_contents("php://input");
    $data = json_decode($rawPostData, true);

    $inputType = $data['inputType'];
    $streams = $data['streams'];
    $state = $data['state'];
    $output = "";
    foreach ($streams as $streamId) {
        $scriptPath = "/usr/local/nginx/scripts/$streamId.sh";
        if ($state == "on") {
            $cmd = "sudo /bin/bash $scriptPath on && sudo /bin/bash $scriptPath $inputType";
            if ($inputType == "video" || $inputType == "holding") {
                $cmd .= " 0";
            }
        } else {
            $cmd = "sudo /bin/bash $scriptPath off";
        }
        $output .= exec($cmd) . "<br>";
    }
    echo $output;
}

#### Global Controls - SUPERS ######
for ($j = 1; $j <= $OUT_NUM; $j++) {
    if (isset($_GET["allsuper{$j}on"])) {
        for ($i = 1; $i <= 8; $i++) {
            $output = exec("sudo /bin/bash /usr/local/nginx/scripts/{$i}.sh super {$j}");
            echo $output;
        }
    }
}

if (isset($_GET['allsuperoff'])) {
    for ($i = 1; $i <= 8; $i++) {
        $output = exec("sudo /bin/bash /usr/local/nginx/scripts/{$i}.sh super off");
        echo $output;
    }
}

?>
