export class PasswdGenService {
	private generateRandomInterval(max: number, min = 0): number {
		return Math.round(Math.random() * (max - min) + min);
	}

	private generateRandomNumber(): string {
		return this.generateRandomInterval(9).toString();
	}

	private generateRandomLowerCaseLetter(): string {
		// 97 ~ 122
		return String.fromCharCode(this.generateRandomInterval(122, 97));
	}

	private generateRandomUpperCaseLetter(): string {
		// 65 ~ 90
		return String.fromCharCode(this.generateRandomInterval(90, 65));
	}

	private generateRandomSpecialCharacters(): string {
		// 33 ~ 47, 58 ~ 64, 91 ~ 96, 123 ~ 126
		const specials = [
			{ min: 33, max: 47 },
			{ min: 58, max: 64 },
			{ min: 91, max: 96 },
			{ min: 123, max: 126 },
		];

		const randomIndex = this.generateRandomInterval(specials.length - 1);
		const { min, max } = specials[randomIndex];
		return String.fromCharCode(this.generateRandomInterval(max, min));
	}

	public generate(min = 6, max = 0, types = ['L']): string {
		if (!max || max < min) max = 100;

		let charTypes = types;

		let randomSize = this.generateRandomInterval(max, min);

		let passwd = '';

		for (let x = 0; x < randomSize; x++) {
			const charGenerator = {
				L: this.generateRandomLowerCaseLetter(),
				U: this.generateRandomUpperCaseLetter(),
				N: this.generateRandomNumber(),
				S: this.generateRandomSpecialCharacters(),
			};

			const randomType = this.generateRandomInterval(types.length - 1);

			charTypes = charTypes.filter((t: string) => t !== types[randomType]);

			const type =
				randomSize - passwd.length > charTypes.length
					? types[randomType]
					: charTypes.pop();

			passwd += charGenerator[type as keyof typeof charGenerator];
		}

		return passwd;
	}
}
