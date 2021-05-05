<?php

$numberid = basename(__FILE__, ".php");
$id = $numberid.".sh"; 

if (isset($_GET['holdingstart'])) {
$startmin = $_POST['startmin'];
$startsec = $_POST['startsec'];
$inputsec = 60*$startmin + $startsec;
}

$streamno = $_GET['streamno'];
$action = $_GET['action'];
$actnumber = $_GET['actnumber'];
$state = $_GET['state'];

if ($state == "turnon") { #Needed to run on and main/backup etc functions
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh on && sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh $action");echo $output;
} elseif ($action == "volume") {
$vol = $_POST['vol_level'];
$vol_level = 2*$vol;
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$action\" $vol_level");echo $output;
} elseif ($action == "super") {
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$action\" $actnumber");echo $output;
} elseif ($action == "insta") {
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$action\".sh \"$state\" $streamno");echo $output;
} elseif ($action == "instaoff") {
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$action\".sh $streamno");echo $output;
} else { #For outputs
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/\"$streamno\".sh \"$action$actnumber\" $state");echo $output;
}

#### Global Controls - SUPERS ######
if (isset($_GET['allsuper1on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 1 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 1");echo $output;}
if (isset($_GET['allsuper2on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 2 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 2");echo $output;}
if (isset($_GET['allsuper3on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 3 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 3");echo $output;}
if (isset($_GET['allsuper4on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 4 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 4");echo $output;}
if (isset($_GET['allsuper5on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 5 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 5");echo $output;}
if (isset($_GET['allsuper6on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 6 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 6");echo $output;}
if (isset($_GET['allsuper7on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 7 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 7");echo $output;}
if (isset($_GET['allsuper8on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/2.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/3.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/4.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/5.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/6.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/7.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/8.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/9.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/10.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/11.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/12.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/13.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/14.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/15.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/16.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/17.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/18.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/19.sh super 8 & sudo /bin/bash /usr/local/nginx/scripts/20.sh super 8");echo $output;}
if (isset($_GET['allsuperoff'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/1.sh super off & sudo /bin/bash /usr/local/nginx/scripts/2.sh super off & sudo /bin/bash /usr/local/nginx/scripts/3.sh super off & sudo /bin/bash /usr/local/nginx/scripts/4.sh super off & sudo /bin/bash /usr/local/nginx/scripts/5.sh super off & sudo /bin/bash /usr/local/nginx/scripts/6.sh super off & sudo /bin/bash /usr/local/nginx/scripts/7.sh super off & sudo /bin/bash /usr/local/nginx/scripts/8.sh super off & sudo /bin/bash /usr/local/nginx/scripts/9.sh super off & sudo /bin/bash /usr/local/nginx/scripts/10.sh super off & sudo /bin/bash /usr/local/nginx/scripts/11.sh super off & sudo /bin/bash /usr/local/nginx/scripts/12.sh super off & sudo /bin/bash /usr/local/nginx/scripts/13.sh super off & sudo /bin/bash /usr/local/nginx/scripts/14.sh super off & sudo /bin/bash /usr/local/nginx/scripts/15.sh super off & sudo /bin/bash /usr/local/nginx/scripts/16.sh super off & sudo /bin/bash /usr/local/nginx/scripts/17.sh super off & sudo /bin/bash /usr/local/nginx/scripts/18.sh super off & sudo /bin/bash /usr/local/nginx/scripts/19.sh super off & sudo /bin/bash /usr/local/nginx/scripts/20.sh super off");echo $output;}

if (isset($_GET['1dest1on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out1");echo $output;}
if (isset($_GET['1dest2on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out2");echo $output;}
if (isset($_GET['1dest3on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out3");echo $output;}
if (isset($_GET['1dest4on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out4");echo $output;}
if (isset($_GET['1dest5on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out5");echo $output;}
if (isset($_GET['1dest6on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out6");echo $output;}
if (isset($_GET['1dest7on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out7");echo $output;}
if (isset($_GET['1dest8on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out8");echo $output;}
if (isset($_GET['1dest9on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out9");echo $output;}
if (isset($_GET['1dest10on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out10");echo $output;}
if (isset($_GET['1dest98on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out98");echo $output;}

if (isset($_GET['instagramon'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/insta.sh on $numberid");echo $output;}
if (isset($_GET['1dest99on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out99");echo $output;}

if (isset($_GET['1dest1off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out1 off");echo $output;}
if (isset($_GET['1dest2off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out2 off");echo $output;}
if (isset($_GET['1dest3off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out3 off");echo $output;}
if (isset($_GET['1dest4off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out4 off");echo $output;}
if (isset($_GET['1dest5off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out5 off");echo $output;}
if (isset($_GET['1dest6off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out6 off");echo $output;}
if (isset($_GET['1dest7off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out7 off");echo $output;}
if (isset($_GET['1dest8off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out8 off");echo $output;}
if (isset($_GET['1dest9off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out9 off");echo $output;}
if (isset($_GET['1dest10off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out10 off");echo $output;}
if (isset($_GET['1dest98off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out98 off");echo $output;}

if (isset($_GET['instagramoff'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/instaoff.sh $numberid");echo $output;}
if (isset($_GET['1dest99off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id out99 off");echo $output;}

####END OF DESTINATIONS START INPUTS#####

if (isset($_GET['1on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id on");echo $output;}
if (isset($_GET['1main'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id on && sudo /bin/bash /usr/local/nginx/scripts/$id main");echo $output;}
if (isset($_GET['1back'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id on && sudo /bin/bash /usr/local/nginx/scripts/$id back");echo $output;}
if (isset($_GET['1holding'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id on && sudo /bin/bash /usr/local/nginx/scripts/$id holding $inputsec");echo $output;}
if (isset($_GET['1video'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id on && sudo /bin/bash /usr/local/nginx/scripts/$id video $inputsec");echo $output;}
if (isset($_GET['1playlist'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id playlist");echo $output;}
if (isset($_GET['1off'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id off");echo $output;}

####END OF INPUTS START MODS#####

if (isset($_GET['1vol'])) {
$vol = $_POST['vol_level'];
$vol_level = 2*$vol;
$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id volume $vol_level");echo $output;}

if (isset($_GET['1super1on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 1");echo $output;}
if (isset($_GET['1super2on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 2");echo $output;}
if (isset($_GET['1super3on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 3");echo $output;}
if (isset($_GET['1super4on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 4");echo $output;}
if (isset($_GET['1super5on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 5");echo $output;}
if (isset($_GET['1super6on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 6");echo $output;}
if (isset($_GET['1super7on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 7");echo $output;}
if (isset($_GET['1super8on'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super 8");echo $output;}
if (isset($_GET['1superoff'])) {$output = exec("sudo /bin/bash /usr/local/nginx/scripts/$id super off");echo $output;}

?>

