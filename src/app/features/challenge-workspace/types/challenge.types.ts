export const challengeLanguages = ['javascript', 'python', 'typescript'] as const;

export type ChallengeLanguage = (typeof challengeLanguages)[number];

export function isChallengeLanguage(value: unknown): value is ChallengeLanguage {
	return typeof value === 'string' && (challengeLanguages as readonly string[]).includes(value);
}

export const challengeLanguageLabels: Record<ChallengeLanguage, string> = {
	javascript: 'JavaScript',
	python: 'Python',
	typescript: 'TypeScript',
};

export const challengeStarterCode: Record<ChallengeLanguage, string> = {
	javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
	python: `def two_sum(nums, target):\n    # your code here\n    pass`,
	typescript: `function solve(): void {\n  // your code here\n}`,
};

export interface ChallengeExampleDto {
	input: string;
	output: string;
	explanation?: string;
}

export type ChallengeConstraintDto =
	| { kind: 'text'; text: string }
	| { kind: 'boundedRange'; lower: string; middle: string; upper: string };
