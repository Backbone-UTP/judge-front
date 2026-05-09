export const challengeLanguages = ['javascript', 'typescript', 'python', 'java', 'cpp'] as const;

export type ChallengeLanguage = (typeof challengeLanguages)[number];

export function isChallengeLanguage(value: string): value is ChallengeLanguage {
  return challengeLanguages.includes(value as ChallengeLanguage);
}

export const challengeLanguageLabels: Record<ChallengeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
};

export const challengeStarterCode: Record<ChallengeLanguage, string> = {
  javascript: `function twoSum(nums, target) {
  const seen = new Map();

  for (let index = 0; index < nums.length; index += 1) {
    const complement = target - nums[index];

    if (seen.has(complement)) {
      return [seen.get(complement), index];
    }

    seen.set(nums[index], index);
  }

  return [];
}`,
  typescript: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let index = 0; index < nums.length; index += 1) {
    const complement = target - nums[index];

    const matchedIndex = seen.get(complement);
    if (matchedIndex !== undefined) {
      return [matchedIndex, index];
    }

    seen.set(nums[index], index);
  }

  return [];
}`,
  python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}

    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]

        seen[value] = index

    return []`,
  java: `import java.util.HashMap;
import java.util.Map;

class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();

    for (int index = 0; index < nums.length; index++) {
      int complement = target - nums[index];

      if (seen.containsKey(complement)) {
        return new int[] {seen.get(complement), index};
      }

      seen.put(nums[index], index);
    }

    return new int[] {};
  }
}`,
  cpp: `#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;

    for (int index = 0; index < static_cast<int>(nums.size()); index++) {
      const int complement = target - nums[index];

      if (seen.contains(complement)) {
        return {seen[complement], index};
      }

      seen[nums[index]] = index;
    }

    return {};
  }
};`,
};
