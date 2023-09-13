const cmdsElement = document.getElementById("cmds");
const genBtnTxtElement = document.getElementById("genBtnTxt");

function gen() {
	const cmds = cmdsElement.value
		.split("\n")
		.map(l => l.trim())
		.filter(l => l.length !== 0);
	if (cmds.length === 0) {
		return window.alert("You haven't specified any commands!");
	}

	const cmd = "summon minecraft:falling_block ~ ~1 ~ " + JSON.stringify({
		BlockState: {
			Name: "minecraft:command_block"
		},
		TileEntityData: {
			Command: "summon minecraft:falling_block ~ ~2 ~ " + JSON.stringify({
				BlockState: {
					Name: "minecraft:activator_rail"
				},
				Passengers: [
					...cmds.map((cmd) => {
						return {
							id: "command_block_minecart",
							Command: cmd
						}
					}),
					{
						id: "command_block_minecart",
						Command: `setblock ~ ~1 ~ command_block{auto:1,Command:"fill ~ ~ ~ ~ ~-3 ~ air"}`
					},
					{
						id: "minecraft:command_block_minecart",
						Command: "kill @e[type=command_block_minecart,distance=..1]"
					}
				]
			})
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
							Name: "minecraft:redstone_block"
						}
					}
				]
			}
		]
	});

	navigator.clipboard.writeText(cmd);
	genBtnTxtElement.innerText = "Copied to clipboard!";
	setTimeout(() => {
		genBtnTxtElement.innerText = "Generate"
	}, 1000);
	if (cmd.length > 32500) return window.alert("The command generated is too big to be put in a command block!");
}