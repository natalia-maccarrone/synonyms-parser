const WordNet = require('node-wordnet');
import { SynonymResponse, WordNetResponse } from '../types';
import Analysis from '../db/models/Analysis';

export interface IParseService {
  parse(text: string): Promise<SynonymResponse[]>;
  getFilteredWords(text: string): string[];
  searchWordNet(word: string): Promise<WordNetResponse[]>;
}

export class ParseService implements IParseService {
  private wordNet: typeof WordNet;
  private wordsToExclude = ['a', 'the', 'and', 'of', 'in', 'be', 'also', 'as'];

  constructor(wordNet: typeof WordNet) {
    this.wordNet = wordNet;
  }

  /**
   *
   * @param word Performs a lookup of a certain word into the Wordnet database
   * @returns The results of the search
   */
  public async searchWordNet(word: string): Promise<WordNetResponse[]> {
    return await this.wordNet.lookupAsync(
      word,
      (results: WordNetResponse[]) => {
        return results;
      }
    );
  }

  /**
   * Receives text and returns an array of words without duplicates and excluded words
   * @param text String of text to turn into an array
   * @returns An filtered array of words
   */
  public getFilteredWords(text: string): string[] {
    const words = text.split(' ');
    const filteredWords = words.filter((word) => {
      return !this.wordsToExclude.includes(word);
    });
    return [...new Set(filteredWords)];
  }

  /**
   * Given some text it returns the synonyms with its count for each word
   * @param text
   * @returns Array of objects with two properties: word and synonyms_found
   */
  public async parse(text: string): Promise<SynonymResponse[]> {
    const words = this.getFilteredWords(text);
    let analysisResult: SynonymResponse[] = [];
    const processedWords: string[] = [];
    for (let currentWord of words) {
      const wordSynonyms: string[] = [];
      if (!processedWords.includes(currentWord)) {
        const wordNetResults = await this.searchWordNet(currentWord);
        wordNetResults.forEach((result) => {
          wordSynonyms.push(...result.synonyms);
        });
        const remainingWords = words.filter((word) => word != currentWord);
        let totalSynonymsFoundInText = 0;
        remainingWords.forEach((remainingWord) => {
          if (wordSynonyms.includes(remainingWord)) {
            processedWords.push(remainingWord);
            totalSynonymsFoundInText++;
          }
        });
        analysisResult.push({
          word: currentWord,
          synonyms_found: totalSynonymsFoundInText
        });
      }
    }
    await Analysis.create({
      text,
      analysis: JSON.stringify(analysisResult)
    });
    return analysisResult;
  }
}
