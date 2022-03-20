"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseService = void 0;
const WordNet = require('node-wordnet');
const Analysis_1 = __importDefault(require("../db/models/Analysis"));
class ParseService {
    constructor(wordNet) {
        this.wordsToExclude = ['a', 'the', 'and', 'of', 'in', 'be', 'also', 'as'];
        this.wordNet = wordNet;
    }
    /**
     *
     * @param word Performs a lookup of a certain word into the Wordnet database
     * @returns The results of the search
     */
    searchWordNet(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wordNet.lookupAsync(word, (results) => {
                return results;
            });
        });
    }
    /**
     * Receives text and returns an array of words without duplicates and excluded words
     * @param text String of text to turn into an array
     * @returns An filtered array of words
     */
    getFilteredWords(text) {
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
    parse(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const words = this.getFilteredWords(text);
            let analysisResult = [];
            const processedWords = [];
            for (let currentWord of words) {
                const wordSynonyms = [];
                if (!processedWords.includes(currentWord)) {
                    const wordNetResults = yield this.searchWordNet(currentWord);
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
            yield Analysis_1.default.create({
                text,
                analysis: JSON.stringify(analysisResult)
            });
            return analysisResult;
        });
    }
}
exports.ParseService = ParseService;
