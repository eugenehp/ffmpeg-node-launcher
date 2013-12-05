var template = "ffmpeg -i {input} -c:v libx264 -preset fast -pix_fmt yuv420p";
template += " -ar 44100 -f flv '{output}'";
var exec = require('child_process').exec;

(function(){
	for(var i=3;i<13;i++){
//udp input
		var input = "udp://224.1.5."+i+":4000";
//edge server
		var output = "rtmp://localhost:1935/dvr/stream"+i;
		var command = template.replace('{input}',input).replace('{output}',output);

		var c = {command:command};
		go(c);
	}
})();

function go(c){
	c.child = launch(c.command);
	c.child.on('exit',function(data){
		console.log('exited');
		go(c);
	})
}

function launch(command){
	return exec(command,
	function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	}
);
}
