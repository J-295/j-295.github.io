function htmlEncode(txt) {
	return txt
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function gen() {
	const cmdsTxt = document.getElementById("cmds").value;
	const cmdsArr = cmdsTxt.split("\n");
	if (cmdsArr.length < 2 || cmdsArr[0].length === 0 || cmdsArr[1].length === 0) {
		return window.alert("You must input at least two commands!");
	}

	let json = {
		BlockState: {
			Name: "minecraft:redstone_block"
		},
		Passengers: [
			{
				id: "minecraft:armor_stand",
				Health: 0,
				DeathTime: 19,
				Passengers: [
					{
						id: "minecraft:falling_block",
						BlockState: {
							Name: "minecraft:activator_rail"
						},
						Passengers: []
					}
				]
			}
		]
	}

	for (let i = 0; i < cmdsArr.length; i++) {
		if (cmdsArr[i] === "") continue;
		json.Passengers[0].Passengers[0].Passengers.push({
			id: "command_block_minecart",
			Command: cmdsArr[i]
		});
	}

	json.Passengers[0].Passengers[0].Passengers.push(
		{
			id: "command_block_minecart",
			Command: "setblock ~ ~1 ~ command_block{auto:1,Command:\"fill ~ ~ ~ ~ ~-2 ~ air\"}"
		},
		{
			id: "minecraft:command_block_minecart",
			Command: "kill @e[type=command_block_minecart,distance=..1]"
		}
	);

	const cmd = "summon falling_block ~ ~1 ~ " + JSON.stringify(json);
	document.getElementById("outDiv").innerHTML = (cmd.length > 32500 ? `<p style="color: yellow;">The output is too long to be put into a command block!<p/>` : "")
		+ `<textarea wrap="off" onclick="this.select()">${htmlEncode(cmd)}</textarea>`;
}