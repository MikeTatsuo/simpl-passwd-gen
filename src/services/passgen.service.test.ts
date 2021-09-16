import { PasswdGenService } from '.';

const passgenService = new PasswdGenService();

const lowerRegExp = new RegExp(/[a-z]/g);
const upperRegExp = new RegExp(/[A-Z]/g);
const numberRegExp = new RegExp(/[0-9]/g);
const specialRegExp = new RegExp(/[!-/,:-@,[-`,{-~]/g);

describe('passgen.service.ts', () => {
	describe('generate', () => {
		test('should generate by default between 6 to 100 characters', () => {
			const characters = passgenService.generate();

			expect(characters.length).toBeGreaterThanOrEqual(6);
			expect(characters.length).toBeLessThanOrEqual(100);
		});

		test('should generate between 2 to 4 characters', () => {
			const characters = passgenService.generate(2, 4);

			expect(characters.length).toBeGreaterThanOrEqual(2);
			expect(characters.length).toBeLessThanOrEqual(4);
		});

		test('should generate 5 characters', () => {
			const characters = passgenService.generate(5, 5);

			expect(characters.length).toEqual(5);
		});

		test('should generate only lower case', () => {
			const lower = passgenService.generate(10, 10);

			expect(lower.length).toEqual(10);
			expect(lower.match(lowerRegExp)?.length).toEqual(10);
		});

		test('should generate only upper case', () => {
			const upper = passgenService.generate(10, 10, ['U']);

			expect(upper.length).toEqual(10);
			expect(upper.match(upperRegExp)?.length).toEqual(10);
		});

		test('should generate only number', () => {
			const n = passgenService.generate(10, 10, ['N']);

			expect(n.length).toEqual(10);
			expect(n.match(numberRegExp)?.length).toEqual(10);
		});

		test('should generate only special chars', () => {
			const special = passgenService.generate(10, 10, ['S']);

			expect(special.length).toEqual(10);
			expect(special.match(specialRegExp)?.length).toEqual(10);
		});

		test('should generate lower case and upper case', () => {
			const lowerAndUpper = passgenService.generate(2, 2, ['L', 'U']);

			expect(lowerAndUpper.length).toEqual(2);
			expect(lowerAndUpper.match(lowerRegExp)?.length).toBeGreaterThan(0);
			expect(lowerAndUpper.match(upperRegExp)?.length).toBeGreaterThan(0);
		});

		test('should generate lower case and number', () => {
			const lowerAndNumber = passgenService.generate(2, 2, ['L', 'N']);

			expect(lowerAndNumber.length).toEqual(2);
			expect(lowerAndNumber.match(lowerRegExp)?.length).toBeGreaterThan(0);
			expect(lowerAndNumber.match(numberRegExp)?.length).toBeGreaterThan(0);
		});

		test('should generate lower case and special characters', () => {
			const lowerAndSpecial = passgenService.generate(2, 2, ['L', 'S']);

			expect(lowerAndSpecial.length).toEqual(2);
			expect(lowerAndSpecial.match(lowerRegExp)?.length).toBeGreaterThan(0);
			expect(lowerAndSpecial.match(specialRegExp)?.length).toBeGreaterThan(0);
		});

		test('should generate upper case and number', () => {
			const upperAndNumber = passgenService.generate(2, 2, ['U', 'N']);

			expect(upperAndNumber.length).toEqual(2);
			expect(upperAndNumber.match(upperRegExp)?.length).toBeGreaterThan(0);
			expect(upperAndNumber.match(numberRegExp)?.length).toBeGreaterThan(0);
		});

		test('should generate upper case and special characters', () => {
			const upperAndSpecial = passgenService.generate(2, 2, ['U', 'S']);

			expect(upperAndSpecial.length).toEqual(2);
			expect(upperAndSpecial.match(upperRegExp)?.length).toBeGreaterThan(0);
			expect(upperAndSpecial.match(specialRegExp)?.length).toBeGreaterThan(0);
		});

		test('should generate number and special characters', () => {
			const numberAndSpecial = passgenService.generate(2, 2, ['N', 'S']);

			expect(numberAndSpecial.length).toEqual(2);
			expect(numberAndSpecial.match(numberRegExp)?.length).toBeGreaterThan(0);
			expect(numberAndSpecial.match(specialRegExp)?.length).toBeGreaterThan(0);
		});

		test('should generate lower case, uppper case and number', () => {
			const lowerUpperAndNumber = passgenService.generate(3, 3, [
				'L',
				'U',
				'N',
			]);

			expect(lowerUpperAndNumber.length).toEqual(3);
			expect(lowerUpperAndNumber.match(lowerRegExp)?.length).toBeGreaterThan(0);
			expect(lowerUpperAndNumber.match(upperRegExp)?.length).toBeGreaterThan(0);
			expect(lowerUpperAndNumber.match(numberRegExp)?.length).toBeGreaterThan(
				0
			);
		});

		test('should generate lower case, uppper case and special characters', () => {
			const lowerUpperAndSpecial = passgenService.generate(3, 3, [
				'L',
				'U',
				'S',
			]);

			expect(lowerUpperAndSpecial.length).toEqual(3);
			expect(lowerUpperAndSpecial.match(lowerRegExp)?.length).toBeGreaterThan(
				0
			);
			expect(lowerUpperAndSpecial.match(upperRegExp)?.length).toBeGreaterThan(
				0
			);
			expect(lowerUpperAndSpecial.match(specialRegExp)?.length).toBeGreaterThan(
				0
			);
		});

		test('should generate lower case, number and special characters', () => {
			const lowerNumberAndSpecial = passgenService.generate(3, 3, [
				'L',
				'N',
				'S',
			]);

			expect(lowerNumberAndSpecial.length).toEqual(3);
			expect(lowerNumberAndSpecial.match(lowerRegExp)?.length).toBeGreaterThan(
				0
			);
			expect(lowerNumberAndSpecial.match(numberRegExp)?.length).toBeGreaterThan(
				0
			);
			expect(
				lowerNumberAndSpecial.match(specialRegExp)?.length
			).toBeGreaterThan(0);
		});

		test('should generate uppper case, number and special characters', () => {
			const upperNumberAndSpecial = passgenService.generate(3, 3, [
				'U',
				'N',
				'S',
			]);

			expect(upperNumberAndSpecial.length).toEqual(3);
			expect(upperNumberAndSpecial.match(upperRegExp)?.length).toBeGreaterThan(
				0
			);
			expect(upperNumberAndSpecial.match(numberRegExp)?.length).toBeGreaterThan(
				0
			);
			expect(
				upperNumberAndSpecial.match(specialRegExp)?.length
			).toBeGreaterThan(0);
		});

		test('should generate all types', () => {
			const allTypes = passgenService.generate(4, 4, ['L', 'U', 'N', 'S']);

			expect(allTypes.length).toEqual(4);
			expect(allTypes.match(lowerRegExp)?.length).toBeGreaterThan(0);
			expect(allTypes.match(upperRegExp)?.length).toBeGreaterThan(0);
			expect(allTypes.match(numberRegExp)?.length).toBeGreaterThan(0);
			expect(allTypes.match(specialRegExp)?.length).toBeGreaterThan(0);
		});
	});
});
